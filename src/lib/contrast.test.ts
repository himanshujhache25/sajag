import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";

/* Every text colour must clear 4.5:1 on the surfaces it is used on,
   and 7:1 in the high-contrast set. Section 5.1 of docs/SPEC.md.
   The tokens live in their own file now; this test reads it directly so a
   stray hex in a screen can never quietly change the answer. */

const css = readFileSync(
  new URL("../app/styles/tokens.css", import.meta.url),
  "utf8",
);

function block(selector: string): Record<string, string> {
  const start = css.indexOf(selector);
  if (start === -1) throw new Error(`missing block ${selector}`);
  const open = css.indexOf("{", start);
  const close = css.indexOf("}", open);
  const out: Record<string, string> = {};
  for (const line of css.slice(open + 1, close).split("\n")) {
    /* Hex literals and one-level aliases such as `--ink-2: var(--ink);`. */
    const m = line.match(/--([\w-]+):\s*(#[0-9a-fA-F]{6}|var\(--[\w-]+\));/);
    if (m) out[m[1]] = m[2];
  }
  return out;
}

function channel(v: number) {
  const s = v / 255;
  return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
}

function luminance(hex: string) {
  const n = parseInt(hex.slice(1), 16);
  return (
    0.2126 * channel((n >> 16) & 255) +
    0.7152 * channel((n >> 8) & 255) +
    0.0722 * channel(n & 255)
  );
}

export function contrast(a: string, b: string) {
  const [x, y] = [luminance(a), luminance(b)].sort((p, q) => q - p);
  return (x + 0.05) / (y + 0.05);
}

/* Text that must be readable, and the three surfaces it lands on. */
const textTokens = ["ink", "ink-2", "ink-3", "danger", "caution", "ok", "action"];
const surfaces = ["page", "panel", "sunken"];

/* The high-contrast set aliases one token to another (`--ink-2: var(--ink)`),
   so flatten those before measuring. */
function resolve(tokens: Record<string, string>) {
  const out: Record<string, string> = { ...tokens };
  for (let pass = 0; pass < 4; pass++) {
    for (const [k, v] of Object.entries(out)) {
      const m = v.match(/^var\(--([\w-]+)\)$/);
      if (m && out[m[1]]) out[k] = out[m[1]];
    }
  }
  return out;
}

function check(name: string, raw: Record<string, string>, minimum: number) {
  const tokens = resolve(raw);
  for (const surface of surfaces) {
    for (const text of textTokens) {
      const ratio = contrast(tokens[text], tokens[surface]);
      expect(
        Number(ratio.toFixed(2)),
        `${name}: ${text} on ${surface}`,
      ).toBeGreaterThanOrEqual(minimum);
    }
  }
}

describe("colour contrast", () => {
  const light = block(":root {");
  const dark = { ...light, ...block(':root[data-theme="dark"] {') };
  const high = block(':root[data-contrast="high"] {');
  const highLight = { ...light, ...high };
  const highDark = {
    ...dark,
    ...high,
    ...block(':root[data-theme="dark"][data-contrast="high"] {'),
  };

  it("light theme reaches 4.5:1", () => check("light", light, 4.5));
  it("dark theme reaches 4.5:1", () => check("dark", dark, 4.5));
  it("high contrast light reaches 7:1", () => check("high", highLight, 7));
  it("high contrast dark reaches 7:1", () => check("high dark", highDark, 7));
});
