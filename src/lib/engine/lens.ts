import { findHits } from "./lexicon/match";
import type { Extraction, Normalised } from "./types";

/* Two rulers, each 0 to 1, shown only for texts long enough to have a shape.
   Both are labelled "अंदाज़ा" in the UI: they describe the writing, not the
   writer, and they never feed the risk score. */
export const LENS_MIN_WORDS = 25;

export type Lens = {
  /* 0 = reads like teaching, 1 = reads like selling. */
  selling: number;
  /* 0 = backed by something checkable, 1 = bare assertion. */
  assertion: number;
  shown: boolean;
  wordCount: number;
};

const TEACHING = [
  /\bmeans\b/i,
  /\bis defined as\b/i,
  /\bfor example\b/i,
  /\bin other words\b/i,
  /\bremember that\b/i,
  /\bthe difference between\b/i,
  /\bका मतलब\b/,
  /\bउदाहरण\b/,
  /\bयानी\b/,
];

const DISCLAIMER = [
  /\bmarket risk\b/i,
  /\bsubject to risk\b/i,
  /\bread all scheme related documents\b/i,
  /\bpast performance\b/i,
  /\bmay go down\b/i,
  /\bno guarantee\b/i,
  /बाजार जोखिम/,
  /जोखिम/,
];

const BALANCE = [
  /\bhowever\b/i,
  /\bon the other hand\b/i,
  /\bbut\b/i,
  /\brisk\b/i,
  /\bdownside\b/i,
  /\bलेकिन\b/,
  /\bनुकसान\b/,
];

const CALL_TO_ACTION = [
  /\bjoin (now|today|us)\b/i,
  /\bclick (here|the link)\b/i,
  /\bdm me\b/i,
  /\bwhatsapp me\b/i,
  /\bbook your seat\b/i,
  /\bsubscribe\b/i,
  /\bregister now\b/i,
  /अभी जुड़/,
  /अभी क्लिक/,
];

const PRICE = [
  /\b(fee|price|charges?|plan|package|subscription)\b/i,
  /\brs\.?\s*\d/i,
  /₹\s*\d/,
  /फीस|शुल्क|प्लान/,
];

const CITATION = [
  /\b(sebi|rbi|nse|bse|amfi|nsdl|cdsl)\b.{0,40}\b(circular|notice|press release|master circular|faq|website)\b/i,
  /\bas per the\b.{0,30}\b(circular|regulation|act|rules)\b/i,
  /\b(19|20)\d{2}\b.{0,20}\b(circular|regulation|report|annual report)\b/i,
  /सर्कुलर|परिपत्र|नियमावली/,
];

const SUPERLATIVE = [
  /\b(best|safest|sure ?shot|unbeatable|no\.? ?1|number one|highest ever|never loses?)\b/i,
  /\b(100|99)\s*%\s*(accurate|accuracy|sure|safe)\b/i,
  /सबसे बढ़िया|पक्का|सौ फीसदी/,
];

function hits(text: string, patterns: RegExp[]): number {
  return patterns.filter((pattern) => pattern.test(text)).length;
}

/* A bounded, deterministic reading: each cue nudges a ruler, and the ruler is
   clamped. Nothing here is a probability. */
function ruler(toward: number, away: number): number {
  const raw = 0.5 + 0.12 * toward - 0.12 * away;
  return Math.round(Math.min(1, Math.max(0, raw)) * 100) / 100;
}

export function readLens(
  normalised: Normalised,
  extraction: Extraction,
): Lens {
  const text = normalised.normalised;
  const wordCount = (normalised.original.trim().match(/\S+/g) ?? []).length;
  if (wordCount < LENS_MIN_WORDS) {
    return { selling: 0.5, assertion: 0.5, shown: false, wordCount };
  }

  const live = findHits(normalised).filter(
    (hit) => !hit.negated && !hit.inWarningFrame,
  );
  const urgency = live.filter((hit) => hit.concept === "URGENCY").length;
  const proof = live.filter((hit) => hit.concept === "FAKE_PROOF").length;
  const guarantee = live.filter((hit) => hit.concept === "GUARANTEE").length;

  const contactOrPay = extraction.entities.filter((entity) =>
    ["upi", "telegram", "whatsapp-invite", "phone", "url"].includes(entity.type),
  ).length;

  const sellingToward =
    hits(text, CALL_TO_ACTION) +
    hits(text, PRICE) +
    Math.min(2, urgency) +
    Math.min(2, contactOrPay);
  const sellingAway =
    hits(text, TEACHING) + hits(text, DISCLAIMER) + hits(text, BALANCE);

  const assertionToward =
    hits(text, SUPERLATIVE) + Math.min(2, proof) + Math.min(2, guarantee);
  const assertionAway = hits(text, CITATION) * 2 + hits(text, DISCLAIMER);

  return {
    selling: ruler(sellingToward, sellingAway),
    assertion: ruler(assertionToward, assertionAway),
    shown: true,
    wordCount,
  };
}
