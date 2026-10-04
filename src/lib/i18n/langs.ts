/* ============================================================================
   The twelve languages Sajag speaks.

   Order is the order the picker shows. English first because it is the one
   script every phone can already render, then Hindi (the default), then the
   rest. Each entry carries four things:

     native   what the language calls itself, shown in the picker and chip
     english  the Latin name, shown small under it, for someone setting up a
              parent's phone in a script they cannot read
     dir      writing direction; Urdu is the one right-to-left language here
     locale   a BCP-47 tag for speech, dates and numbers

   Nothing else in the app is allowed to hard-code a language list.
   ========================================================================== */

export const LANGS = [
  "en",
  "hi",
  "mr",
  "gu",
  "ta",
  "bn",
  "te",
  "kn",
  "ml",
  "or",
  "pa",
  "ur",
] as const;

export type Lang = (typeof LANGS)[number];

export type LangDir = "ltr" | "rtl";

export type LangScript =
  | "latin"
  | "devanagari"
  | "gujarati"
  | "tamil"
  | "bengali"
  | "telugu"
  | "kannada"
  | "malayalam"
  | "odia"
  | "gurmukhi"
  | "arabic";

export type LangInfo = {
  native: string;
  english: string;
  dir: LangDir;
  locale: string;
  /* Used only to pick a font stack in styles/i18n.css. */
  script: LangScript;
};

export const LANG_INFO: Record<Lang, LangInfo> = {
  en: { native: "English", english: "English", dir: "ltr", locale: "en-IN", script: "latin" },
  hi: { native: "हिंदी", english: "Hindi", dir: "ltr", locale: "hi-IN", script: "devanagari" },
  mr: { native: "मराठी", english: "Marathi", dir: "ltr", locale: "mr-IN", script: "devanagari" },
  gu: { native: "ગુજરાતી", english: "Gujarati", dir: "ltr", locale: "gu-IN", script: "gujarati" },
  ta: { native: "தமிழ்", english: "Tamil", dir: "ltr", locale: "ta-IN", script: "tamil" },
  bn: { native: "বাংলা", english: "Bengali", dir: "ltr", locale: "bn-IN", script: "bengali" },
  te: { native: "తెలుగు", english: "Telugu", dir: "ltr", locale: "te-IN", script: "telugu" },
  kn: { native: "ಕನ್ನಡ", english: "Kannada", dir: "ltr", locale: "kn-IN", script: "kannada" },
  ml: { native: "മലയാളം", english: "Malayalam", dir: "ltr", locale: "ml-IN", script: "malayalam" },
  or: { native: "ଓଡ଼ିଆ", english: "Odia", dir: "ltr", locale: "or-IN", script: "odia" },
  pa: { native: "ਪੰਜਾਬੀ", english: "Punjabi", dir: "ltr", locale: "pa-IN", script: "gurmukhi" },
  ur: { native: "اردو", english: "Urdu", dir: "rtl", locale: "ur-IN", script: "arabic" },
};

/* Kept as plain maps because they are read in a dozen places. */
export const LANG_NAMES: Record<Lang, string> = Object.fromEntries(
  LANGS.map((l) => [l, LANG_INFO[l].native]),
) as Record<Lang, string>;

export const LANG_NAMES_EN: Record<Lang, string> = Object.fromEntries(
  LANGS.map((l) => [l, LANG_INFO[l].english]),
) as Record<Lang, string>;

export type Pack = {
  lang: Lang;
  /* True while the translation is machine-assisted and has not been read by
     a speaker. The picker shows "(beta)" for these; nothing is hidden. */
  needsReview: boolean;
  strings: Record<string, string>;
};

export function isLang(value: string | null | undefined): value is Lang {
  return !!value && (LANGS as readonly string[]).includes(value);
}

export function dirOf(lang: Lang): LangDir {
  return LANG_INFO[lang].dir;
}

export function localeOf(lang: Lang): string {
  return LANG_INFO[lang].locale;
}

export function scriptOf(lang: Lang): LangScript {
  return LANG_INFO[lang].script;
}

/* "hi-IN", "hi", "en-GB" → a Lang we have, or null. Used once, on the very
   first visit, to guess before the person has chosen. */
export function matchLang(tag: string | null | undefined): Lang | null {
  if (!tag) return null;
  const base = tag.toLowerCase().split(/[-_]/)[0];
  return isLang(base) ? base : null;
}
