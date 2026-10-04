import type { EngineLang, Normalised, Script, Sentence } from "./types";
import { LEET_TARGETS } from "./lexicon/leet-targets";

/* Pure. Same text in, same object out. No DOM, no Node. */

const ZERO_WIDTH = /[\u200B-\u200D\uFEFF]/g;

const DIGIT_BLOCKS: [number, string][] = [
  [0x0966, "devanagari"],
  [0x09e6, "bengali"],
  [0x0ae6, "gujarati"],
  [0x0be6, "tamil"],
  [0x0c66, "telugu"],
];

const HINDI_FUNCTION_WORDS = [
  "hai",
  "hain",
  "ka",
  "ki",
  "ke",
  "me",
  "mein",
  "aap",
  "hum",
  "sir",
  "jaldi",
  "paisa",
  "nahi",
  "nahin",
  "kar",
  "karein",
  "kare",
  "hi",
  "bhi",
  "koi",
  "apna",
  "mera",
  "aaj",
  "abhi",
  "bhejo",
  "batao",
  "lekar",
  "wala",
  "kaise",
  "kyun",
];

const WARNING_FRAMES = [
  "beware of",
  "beware",
  "scam alert",
  "fraud alert",
  "do not trust",
  "don't trust",
  "warning:",
  "सावधान",
  "सतर्क रहें",
  "सतर्क",
  "ठगों से बचें",
  "धोखेबाज़ों से बचें",
  "चेतावनी",
];

export type NormaliseResult = Normalised & { numbers: number[] };

type Build = { out: string; map: number[] };

function push(build: Build, text: string, sourceIndex: number) {
  for (const ch of text) {
    build.out += ch;
    build.map.push(sourceIndex);
  }
}

function detectScripts(text: string): Script[] {
  const found = new Set<Script>();
  for (const ch of text) {
    const code = ch.codePointAt(0) ?? 0;
    if ((code >= 0x41 && code <= 0x5a) || (code >= 0x61 && code <= 0x7a)) {
      found.add("latin");
    } else if (code >= 0x0900 && code <= 0x097f) found.add("devanagari");
    else if (code >= 0x0980 && code <= 0x09ff) found.add("bengali");
    else if (code >= 0x0a80 && code <= 0x0aff) found.add("gujarati");
    else if (code >= 0x0b80 && code <= 0x0bff) found.add("tamil");
    else if (code >= 0x0c00 && code <= 0x0c7f) found.add("telugu");
  }
  return [...found];
}

function foldDigit(ch: string): string | null {
  const code = ch.codePointAt(0) ?? 0;
  for (const [base] of DIGIT_BLOCKS) {
    if (code >= base && code <= base + 9) return String(code - base);
  }
  return null;
}

const LEET: Record<string, string> = {
  "0": "o",
  "1": "i",
  "3": "e",
  "4": "a",
  "5": "s",
  "7": "t",
  "@": "a",
  $: "s",
};

/* Folds leetspeak inside a token, but keeps the folded form only when it
   matches something we actually look for. "DEMOcode123" must stay as it is. */
function foldLeet(token: string): string {
  if (!/[a-z]/.test(token)) return token;
  if (!/[01345 7@$]/.test(token)) return token;
  const folded = token.replace(/[01345 7@$]/g, (c) => LEET[c] ?? c);
  return LEET_TARGETS.has(folded) ? folded : token;
}

/* "suuuuure" is obfuscation; "420000" is money. Only letters are squeezed. */
function squeezeRuns(text: string): string {
  return text.replace(/(\p{L})\1{2,}/gu, "$1$1");
}

const LAKH = /(\d+(?:\.\d+)?)\s*(lakh|lakhs|lac|लाख)/giu;
const CRORE = /(\d+(?:\.\d+)?)\s*(crore|crores|cr|करोड़|करोड)/giu;
const GROUPED = /\d{1,3}(?:,\d{2})*(?:,\d{3})(?:\.\d+)?|\d+(?:\.\d+)?/g;

function readNumbers(text: string): number[] {
  const found: number[] = [];
  const seen = new Set<string>();
  for (const m of text.matchAll(LAKH)) {
    found.push(Number(m[1]) * 100000);
    seen.add(m[0]);
  }
  for (const m of text.matchAll(CRORE)) {
    found.push(Number(m[1]) * 10000000);
    seen.add(m[0]);
  }
  const rest = text.replace(LAKH, " ").replace(CRORE, " ");
  for (const m of rest.matchAll(GROUPED)) {
    const value = Number(m[0].replace(/,/g, ""));
    if (Number.isFinite(value)) found.push(value);
  }
  return found;
}

function splitSentences(text: string): Sentence[] {
  const out: Sentence[] = [];
  const re = /[^।॥.!?\n]+[।॥.!?\n]*/gu;
  for (const m of text.matchAll(re)) {
    const raw = m[0];
    if (raw.trim().length === 0) continue;
    const start = m.index ?? 0;
    const lower = raw.trim().toLowerCase();
    out.push({
      start,
      end: start + raw.length,
      text: raw,
      warningFrame: WARNING_FRAMES.some((frame) => lower.startsWith(frame)),
    });
  }
  return out;
}

function guessLanguage(text: string, scripts: Script[]): EngineLang {
  const byScript: Partial<Record<Script, EngineLang>> = {
    devanagari: "hi",
    bengali: "bn",
    gujarati: "gu",
    tamil: "ta",
    telugu: "te",
  };
  const indic = scripts.filter((s) => s !== "latin" && s !== "other");
  const latinWords = (text.match(/[a-z]+/g) ?? []).length;
  const indicChars = (
    text.match(/[\u0900-\u097f\u0980-\u09ff\u0a80-\u0aff\u0b80-\u0bff\u0c00-\u0c7f]/g) ??
    []
  ).length;

  if (indic.length > 0 && latinWords >= 4 && indicChars >= 8) return "mixed";
  if (indic.length > 1) return "mixed";
  if (indic.length === 1) return byScript[indic[0]] ?? "mixed";

  const words = text.match(/[a-z]+/g) ?? [];
  const hits = words.filter((w) => HINDI_FUNCTION_WORDS.includes(w)).length;
  return hits >= 2 ? "hinglish" : "en";
}

export function normalise(raw: string): NormaliseResult {
  const build: Build = { out: "", map: [] };

  const text = raw.normalize("NFKC");

  /* Walk the text once, writing the normalised form and the offset of every
     character it came from. */
  let i = 0;
  while (i < text.length) {
    const ch = text[i];

    if (ZERO_WIDTH.test(ch)) {
      ZERO_WIDTH.lastIndex = 0;
      i += 1;
      continue;
    }

    const digit = foldDigit(ch);
    if (digit !== null) {
      push(build, digit, i);
      i += 1;
      continue;
    }

    /* "g u a r a n t e e d" and "g.u.a.r.a.n.t.e.e.d": five or more single
       letters in a row with one separator between them. */
    const spaced = text.slice(i).match(/^(?:[A-Za-z][ .\-_]){4,}[A-Za-z]/);
    if (spaced) {
      const letters = spaced[0].replace(/[ .\-_]/g, "");
      for (let k = 0; k < letters.length; k += 1) {
        push(build, letters[k].toLowerCase(), i + k * 2);
      }
      i += spaced[0].length;
      continue;
    }

    /* Only at a word boundary, or "Advisors" would end in a rupee sign. */
    const beforeChar = text[i - 1] ?? " ";
    const rupee = /[\p{L}\p{N}]/u.test(beforeChar)
      ? null
      : text.slice(i).match(/^(?:Rs\.?|INR|रु\.?|रुपये|रुपए|₹)/i);
    if (rupee && /[\s\d₹]/.test(text[i + rupee[0].length] ?? " ")) {
      push(build, "₹", i);
      i += rupee[0].length;
      continue;
    }

    push(build, ch.toLowerCase(), i);
    i += 1;
  }

  /* Token-level passes keep the offset map by rebuilding it alongside. */
  const tokenised: Build = { out: "", map: [] };
  const tokenRe = /\S+|\s+/gu;
  for (const m of build.out.matchAll(tokenRe)) {
    const token = m[0];
    const at = m.index ?? 0;
    if (/^\s+$/.test(token)) {
      push(tokenised, token, build.map[at]);
      continue;
    }
    const folded = squeezeRuns(foldLeet(token));
    for (let k = 0; k < folded.length; k += 1) {
      tokenised.out += folded[k];
      tokenised.map.push(build.map[Math.min(at + k, build.out.length - 1)]);
    }
  }

  const normalised = tokenised.out;

  return {
    original: raw,
    normalised,
    offsetMap: tokenised.map,
    scripts: detectScripts(raw),
    language: guessLanguage(normalised, detectScripts(raw)),
    sentences: splitSentences(normalised),
    warningContext: splitSentences(normalised).some((s) => s.warningFrame),
    numbers: readNumbers(normalised),
  };
}
