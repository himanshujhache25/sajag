// The filter applies to us too.
//
// It would be a strange kind of discipline that forbids a model from saying
// "this is safe" while our own Hindi copy says it on a heading. This test
// walks every language pack and every concept card through the same scanner
// the model output goes through, and fails the build on a match.
//
// When this test fails, the fix is almost always to rewrite the line. On the
// rare occasion the phrase genuinely belongs — because we are quoting a scam
// so a person can recognise it — put it in quotation marks, which is what
// the scanner already skips, and which is also better writing.

import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { assertNoAdvice } from "./filter";

const ROOT = join(process.cwd(), "src");

function filesUnder(dir: string, out: string[] = []): string[] {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) filesUnder(path, out);
    else if (entry.name.endsWith(".ts") && !entry.name.endsWith(".test.ts")) {
      out.push(path);
    }
  }
  return out;
}

/** Pull out the string literals, so we scan the copy and not the code. A
 *  variable called `shouldBuyRef` is not a promise to anybody. */
function stringsIn(source: string): string[] {
  const out: string[] = [];
  const re = /"((?:[^"\\]|\\.)*)"|'((?:[^'\\]|\\.)*)'|`((?:[^`\\$]|\\.)*)`/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(source))) {
    const value = m[1] ?? m[2] ?? m[3] ?? "";
    if (value.length > 3) out.push(value);
  }
  return out;
}

const targets = [
  ...filesUnder(join(ROOT, "content")),
  ...filesUnder(join(ROOT, "lib", "i18n", "packs")),
];

describe("our own copy obeys the output filter", () => {
  it("has something to scan", () => {
    expect(targets.length).toBeGreaterThan(10);
  });

  for (const file of targets) {
    const short = file.slice(ROOT.length + 1);
    it(short, () => {
      const offenders: string[] = [];
      for (const line of stringsIn(readFileSync(file, "utf8"))) {
        const v = assertNoAdvice(line);
        if (!v.ok && v.reason !== "empty") {
          offenders.push(`[${v.reason}] ${line}`);
        }
      }
      expect(offenders).toEqual([]);
    });
  }
});
