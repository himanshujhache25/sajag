import { describe, expect, test } from "vitest";
import { LANGS } from "./langs";
import { coverage, getPack } from ".";
import { enSignals } from "./packs/en-signals";

/* The verdict pack is the copy a person actually reads when the app has
   something to say about a message: signal titles, why it matters, what
   cannot be checked, and the claims. It is the tier worth translating
   first, and the tier where a missing key is most visible.

   These tests do not judge translation quality — a machine cannot. They
   only hold the shape: every language carries the verdict keys, and none
   of them silently drops below the coverage it has already reached. */

const VERDICT_KEYS = Object.keys(enSignals);

describe("verdict copy", () => {
  test("every language carries the whole verdict pack", () => {
    const gaps: string[] = [];
    for (const lang of LANGS) {
      const strings = getPack(lang).strings;
      const missing = VERDICT_KEYS.filter((k) => !(k in strings));
      if (missing.length > 0) {
        gaps.push(`${lang} is missing ${missing.length}: ${missing.slice(0, 3).join(", ")}`);
      }
    }
    expect(gaps).toEqual([]);
  });

  test("no verdict string is left in English outside the English pack", () => {
    /* A pack that spreads enSignals in by mistake, or a half-finished
       translation, shows up here: the string would be byte-identical to
       English. Proper nouns are the honest exception. */
    const EXPECTED_SHARED = new Set<string>();
    const leaks: string[] = [];
    for (const lang of LANGS) {
      if (lang === "en") continue;
      const strings = getPack(lang).strings;
      for (const key of VERDICT_KEYS) {
        const mine = strings[key];
        if (mine !== undefined && mine === enSignals[key] && !EXPECTED_SHARED.has(key)) {
          leaks.push(`${lang}/${key}`);
        }
      }
    }
    expect(leaks).toEqual([]);
  });
});

describe("coverage floor", () => {
  /* Measured after the verdict packs landed. These are floors, not targets:
     raising a pack is always fine, quietly losing ground is not. */
  const FLOOR: Record<string, number> = {
    en: 1,
    hi: 1,
    mr: 0.28,
    gu: 0.28,
    ta: 0.28,
    bn: 0.28,
    te: 0.28,
    kn: 0.28,
    ml: 0.28,
    or: 0.28,
    pa: 0.28,
    ur: 0.28,
  };

  for (const lang of LANGS) {
    test(`${lang} holds its coverage`, () => {
      expect(coverage(lang)).toBeGreaterThanOrEqual(FLOOR[lang]);
    });
  }
});
