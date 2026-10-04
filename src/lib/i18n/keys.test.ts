import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";
import { en } from "./packs/en";

/* Guards the failure that shipped once already: a component calls t() with a
   key nobody ever added to the English pack, so every language renders the
   raw key — a Tamil reader sees the literal text "pause.sub" on screen.

   English is the end of the fallback chain (pack -> en -> key), so a key
   present here can never surface raw. A key absent here always will. That
   makes this the only pack worth asserting against.

   The other ten packs are deliberately partial and fall back to English;
   their coverage is reported by coverage() and surfaced in the picker as
   "(beta)", so it is not asserted here. */

function sourceFiles(dir: string, out: string[] = []): string[] {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (!/i18n|fonts|node_modules/.test(full)) sourceFiles(full, out);
    } else if (/\.tsx?$/.test(entry.name) && !/\.test\./.test(entry.name)) {
      out.push(full);
    }
  }
  return out;
}

/* Only literal keys can be checked. t(someVariable) is invisible here and is
   rare enough in the app that a lint rule would cost more than it saves. */
function literalKeysUsed(): Map<string, string> {
  const used = new Map<string, string>();
  for (const file of sourceFiles("src")) {
    const source = fs.readFileSync(file, "utf8");
    for (const match of source.matchAll(/\bt\(\s*["'`]([a-zA-Z0-9_.]+)["'`]/g)) {
      if (!used.has(match[1])) used.set(match[1], file);
    }
  }
  return used;
}

describe("translation keys", () => {
  it("every key the app asks for exists in the English pack", () => {
    const missing = [...literalKeysUsed()]
      .filter(([key]) => !(key in en.strings))
      .map(([key, file]) => `${key}  (used in ${file})`);

    expect(
      missing,
      `These keys would render as raw text in every language:\n${missing.join("\n")}`,
    ).toEqual([]);
  });

  it("finds a meaningful number of keys, so the scan cannot silently break", () => {
    /* If a refactor changes how t() is called, the regex above could quietly
       match nothing and the test above would pass while checking nothing. */
    expect(literalKeysUsed().size).toBeGreaterThan(300);
  });
});
