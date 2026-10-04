import { en } from "./packs/en";
import { hi } from "./packs/hi";
import { mr } from "./packs/mr";
import { gu } from "./packs/gu";
import { ta } from "./packs/ta";
import { bn } from "./packs/bn";
import { te } from "./packs/te";
import { kn } from "./packs/kn";
import { ml } from "./packs/ml";
import { or } from "./packs/or";
import { pa } from "./packs/pa";
import { ur } from "./packs/ur";
import { LANGS, type Lang, type Pack } from "./langs";

/* Twelve packs. `hi` and `en` are complete and human-written; the other ten
   cover the screens a person actually walks through (home, tabs, check,
   verdict stamps, settings) and fall through to English for the long-form
   copy that has not been translated yet. A missing key is never a blank and
   never a raw key: `t()` tries the pack, then English, then the key itself.

   Falling back to English rather than Hindi is deliberate. A Tamil reader
   who meets an untranslated line is more likely to read English than
   Devanagari, and the mixed-script page makes the gap visible instead of
   hiding it. The picker marks these packs "(beta)" for the same reason. */
const packs: Record<Lang, Pack> = {
  en,
  hi,
  mr,
  gu,
  ta,
  bn,
  te,
  kn,
  ml,
  or,
  pa,
  ur,
};

export function getPack(lang: Lang): Pack {
  return packs[lang] ?? en;
}

export function hasPack(lang: Lang): boolean {
  return packs[lang] !== undefined;
}

/* True when the pack exists but has not been read by a native speaker.
   The picker shows "(beta)" for these; nothing is hidden from the person. */
export function needsReview(lang: Lang): boolean {
  return getPack(lang).needsReview;
}

/* How much of the interface this language actually carries, 0 to 1. Used by
   the pack tests to stop a pack rotting silently as English grows. */
export function coverage(lang: Lang): number {
  const total = Object.keys(en.strings).length;
  if (total === 0) return 1;
  return Math.min(1, Object.keys(getPack(lang).strings).length / total);
}

export function t(
  lang: Lang,
  key: string,
  vars?: Record<string, string | number>,
): string {
  const pack = getPack(lang);
  const raw = pack.strings[key] ?? en.strings[key] ?? key;
  if (!vars) return raw;
  return raw.replace(/\{(\w+)\}/g, (whole, name: string) =>
    name in vars ? String(vars[name]) : whole,
  );
}

export function translator(lang: Lang) {
  return (key: string, vars?: Record<string, string | number>) =>
    t(lang, key, vars);
}

export { en, hi, mr, gu, ta, bn, te, kn, ml, or, pa, ur };
export const ALL_PACKS: Pack[] = LANGS.map((l) => packs[l]);
export type { Lang, Pack };
