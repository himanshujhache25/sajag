import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

/* The engine runs in a Web Worker on a 2 GB phone and in plain Node in the
   eval script. It may not reach for the DOM, for Node APIs or for anything in
   the app layer. This test reads the source, not the bundle, so a stray
   import fails fast. */

const ENGINE_DIR = join(process.cwd(), "src/lib/engine");

function sourceFiles(dir: string): string[] {
  const out: string[] = [];
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) {
      out.push(...sourceFiles(path));
      continue;
    }
    if (!name.endsWith(".ts")) continue;
    if (name.endsWith(".test.ts")) continue;
    /* worker.ts is the boundary where the engine meets the browser. It is
       the one file allowed to speak to a host, and it holds no rules. */
    if (name === "worker.ts") continue;
    out.push(path);
  }
  return out;
}

const FILES = sourceFiles(ENGINE_DIR);

const FORBIDDEN_MODULES = [
  /from\s+["']node:/,
  /from\s+["'](fs|path|crypto|os|child_process|http|https|worker_threads)["']/,
  /from\s+["']react/,
  /from\s+["']next/,
  /from\s+["']@\/components\//,
  /from\s+["']@\/app\//,
  /require\(/,
];

const FORBIDDEN_GLOBALS = [
  /\bdocument\./,
  /\bwindow\./,
  /\blocalStorage\b/,
  /\bsessionStorage\b/,
  /\bindexedDB\b/,
  /\bnavigator\./,
  /\bprocess\.(env|cwd|argv)/,
  /\bfetch\(/,
  /\bXMLHttpRequest\b/,
  /\bconsole\.log\b/,
];

describe("engine purity", () => {
  it("has source files to check", () => {
    expect(FILES.length).toBeGreaterThan(5);
  });

  for (const file of FILES) {
    const relative = file.slice(file.indexOf("src/"));
    const source = readFileSync(file, "utf8");

    it(`${relative} imports nothing from the DOM, Node or the app`, () => {
      for (const pattern of FORBIDDEN_MODULES) {
        expect(pattern.test(source), `${relative} matches ${pattern}`).toBe(false);
      }
    });

    it(`${relative} touches no host global`, () => {
      for (const pattern of FORBIDDEN_GLOBALS) {
        expect(pattern.test(source), `${relative} matches ${pattern}`).toBe(false);
      }
    });
  }

  it("keeps its own data imports to JSON and TypeScript", () => {
    for (const file of FILES) {
      const source = readFileSync(file, "utf8");
      const dataImports = source.match(/from\s+["']@\/data\/[^"']+["']/g) ?? [];
      for (const line of dataImports) {
        expect(line).toMatch(/\.json["']$|[a-z-]+["']$/);
      }
    }
  });
});
