export const CONCEPTS = [
  "GUARANTEE",
  "URGENCY",
  "VIP_GROUP",
  "INSIDER",
  "DOUBLE_MONEY",
  "OTP",
  "FEE_TO_WITHDRAW",
  "REMOTE_ACCESS",
  "SECRECY",
  "SEBI_APPROVED",
  "FAKE_PROOF",
  "SMALL_CAPITAL",
  "BORROWED",
  "CRYPTO_BOT",
  "AUTHORITY_NAME",
] as const;

export type Concept = (typeof CONCEPTS)[number];

/* The first eight are the ones the other language packs must cover. */
export const FIRST_EIGHT: Concept[] = [
  "GUARANTEE",
  "URGENCY",
  "VIP_GROUP",
  "INSIDER",
  "DOUBLE_MONEY",
  "OTP",
  "FEE_TO_WITHDRAW",
  "REMOTE_ACCESS",
];

export type LexiconLang =
  | "en"
  | "hinglish"
  | "hi"
  | "mr"
  | "bn"
  | "ta"
  | "te"
  | "gu"
  | "kn"
  | "ml"
  | "or"
  | "pa"
  | "ur";

export type Lexicon = {
  lang: LexiconLang;
  needsReview: boolean;
  /* Phrases, not regular expressions. The matcher handles spacing and word
     boundaries so that the lists stay readable and reviewable by a person. */
  patterns: Partial<Record<Concept, string[]>>;
};
