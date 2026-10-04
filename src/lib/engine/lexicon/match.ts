import type { LexiconHit, Normalised } from "../types";
import type { Concept, Lexicon } from "./concepts";
import { bn } from "./bn";
import { en } from "./en";
import { gu } from "./gu";
import { hinglish } from "./hinglish";
import { hi } from "./hi";
import { kn } from "./kn";
import { ml } from "./ml";
import { mr } from "./mr";
import { or } from "./or";
import { pa } from "./pa";
import { ta } from "./ta";
import { te } from "./te";
import { ur } from "./ur";

/* Mixed-language messages are the norm, so every lexicon is run on every
   message rather than only the guessed one. Section 7.1 of docs/SPEC.md.

   Every language the picker offers must appear here. Five of them were
   missing — Kannada, Malayalam, Odia, Punjabi and Urdu — so a scam written
   in any of those scored nothing and came back "nothing strong found". A
   language offered in the picker but absent from this list is worse than
   not offering it at all, because the person gets a clean bill of health
   instead of a blank. The test in lexicon.test.ts now asserts the two lists
   match. */
const ALL: Lexicon[] = [
  en,
  hinglish,
  hi,
  mr,
  bn,
  ta,
  te,
  gu,
  kn,
  ml,
  or,
  pa,
  ur,
];

/* Exported so a test can assert this list against the picker's list and
   against the eight concepts, rather than a reader having to notice. */
export const LEXICONS: readonly Lexicon[] = ALL;
export const LEXICON_LANGS: readonly string[] = ALL.map((l) => l.lang);

const NEGATORS = [
  "not",
  "no",
  "nobody",
  "none",
  "noone",
  "never",
  "cannot",
  "can't",
  "cant",
  "does not",
  "doesn't",
  "doesnt",
  "do not",
  "don't",
  "dont",
  "without",
  "nahi",
  "nahin",
  "mat",
  "bina",
  "नहीं",
  "न",
  "कभी नहीं",
  "मत",
  "बिना",
];

/* A letter next to a match means we are inside a longer word. Devanagari
   matras and viramas count as letters, so "ग्रुप" inside "ग्रुपों" is not a hit. */
function isLetter(ch: string | undefined): boolean {
  if (!ch) return false;
  return /[\p{L}\p{M}\p{N}]/u.test(ch);
}

function escape(text: string): string {
  return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/* Phrases are written with single spaces; real messages have any amount of
   space, so the gaps are matched loosely. */
function phraseRe(phrase: string): RegExp {
  return new RegExp(escape(phrase).replace(/\s+/g, "\\s+"), "gu");
}

function sentenceAt(n: Normalised, at: number) {
  return n.sentences.find((s) => at >= s.start && at < s.end);
}

/* English negates before the word ("does not guarantee"); Hindi and Hinglish
   negate after it, near the verb ("गारंटी नहीं दे सकता", "guarantee nahi hai").
   So both sides of the hit are read, within the same sentence. */
const TRAILING_NEGATORS = [
  "nahi",
  "nahin",
  "mat",
  "bina",
  "नहीं",
  "न",
  "मत",
  "बिना",
];

function tokensOf(text: string): string[] {
  return text
    .split(/[\s,;:]+/)
    .map((token) => token.replace(/[.!?।॥]+$/u, ""))
    .filter(Boolean);
}

function isNegated(n: Normalised, at: number, end: number): boolean {
  const sentence = sentenceAt(n, at);
  const from = sentence ? sentence.start : 0;
  const to = sentence ? sentence.end : n.normalised.length;

  const before = tokensOf(n.normalised.slice(from, at)).slice(-5);
  if (before.some((token) => NEGATORS.includes(token))) return true;

  const after = tokensOf(n.normalised.slice(end, to)).slice(0, 5);
  return after.some((token) => TRAILING_NEGATORS.includes(token));
}

/**
 * Does this stretch of text mean what it says?
 *
 * The same question `findHits` asks of every lexicon hit, exported so that
 * signals which match with their own regular expressions can ask it too.
 * A signal that skips this check reads a forwarded safety warning as the
 * scam it is warning about, which is the most embarrassing mistake this
 * engine can make.
 */
export function meansIt(n: Normalised, start: number, end: number): boolean {
  if (n.warningContext) return false;
  if (sentenceAt(n, start)?.warningFrame) return false;
  return !isNegated(n, start, end);
}

function toOriginal(n: Normalised, start: number, end: number) {
  const from = n.offsetMap[start] ?? 0;
  const lastIndex = Math.min(end - 1, n.offsetMap.length - 1);
  const to = (n.offsetMap[lastIndex] ?? from) + 1;
  return { start: from, end: Math.max(to, from + 1) };
}

export function findHits(n: Normalised): LexiconHit[] {
  const hits: LexiconHit[] = [];
  const text = n.normalised;

  for (const lexicon of ALL) {
    for (const [concept, phrases] of Object.entries(lexicon.patterns)) {
      /* Longest phrase first, so "pakka munafa" beats a bare "munafa". */
      const sorted = [...(phrases ?? [])].sort((a, b) => b.length - a.length);
      let fired = false;
      for (const phrase of sorted) {
        if (fired) break;
        for (const m of text.matchAll(phraseRe(phrase))) {
          const at = m.index ?? 0;
          const end = at + m[0].length;
          if (isLetter(text[at - 1]) || isLetter(text[end])) continue;

          const pos = toOriginal(n, at, end);
          hits.push({
            ...pos,
            text: n.original.slice(pos.start, pos.end),
            concept: concept as Concept,
            lang: lexicon.lang,
            negated: isNegated(n, at, end),
            /* One warning frame anywhere puts the whole message in context:
               people forward SEBI warnings to each other, and those quote the
               scam's own words. Section 7.1 of docs/SPEC.md. */
            inWarningFrame:
              (sentenceAt(n, at)?.warningFrame ?? false) || n.warningContext,
          });
          fired = true;
          break;
        }
      }
    }
  }

  return hits.sort((a, b) => a.start - b.start);
}
