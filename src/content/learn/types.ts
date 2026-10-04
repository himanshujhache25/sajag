/* The twelve concept cards. Section 8.7 and 9.1 of docs/SPEC.md.

   Every card has the same five parts so the page never surprises anyone:
   an everyday picture, two lines of meaning, where the trap is, one question
   to try, and a line saying this is information, not advice.

   Hindi and English are written by hand. Any other language is generated and
   carries `needsReview`, which the UI shows as "(beta)". */

export type Quiz = {
  /* One question. Three options. No score is kept; the point is the
     feedback, not the mark. */
  q: string;
  options: [string, string, string];
  answer: 0 | 1 | 2;
  /* Why each option is right or wrong, in one line. */
  why: [string, string, string];
};

export type Concept = {
  id: string;
  /* 1 to 12. The index is numbered like a ledger. */
  n: number;
  title: string;
  /* A few words under the title in the index. */
  line: string;
  /* "रोज़ की मिसाल" */
  everyday: string;
  /* "इसका मतलब", exactly two lines. */
  meaning: [string, string];
  /* "जाल कहाँ है", one or two lines. */
  trap: string[];
  quiz: Quiz;
  /* Words someone might type in the search box that are not in the title. */
  search: string[];
  /* A screen that helps with this concept, when one exists. */
  related?: { href: string; label: string };
  needsReview?: boolean;
};

export type ConceptPack = {
  lang: string;
  concepts: Concept[];
  needsReview?: boolean;
};

export const CONCEPT_IDS = [
  "sebi-registration",
  "demat",
  "nominee",
  "nav",
  "sip",
  "risk-return",
  "volatility",
  "diversification",
  "leverage",
  "compounding",
  "fees",
  "bonus-split",
] as const;

export type ConceptId = (typeof CONCEPT_IDS)[number];
