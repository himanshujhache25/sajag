import type { LexiconLang } from "./lexicon/concepts";

export type Script =
  | "latin"
  | "devanagari"
  | "bengali"
  | "tamil"
  | "telugu"
  | "gujarati"
  | "other";

export type EngineLang =
  | "en"
  | "hinglish"
  | "hi"
  | "mr"
  | "bn"
  | "ta"
  | "te"
  | "gu"
  | "mixed";

export type Normalised = {
  original: string;
  normalised: string;
  /* offsetMap[i] is the index in `original` that normalised[i] came from, so
     evidence can be quoted in the words the person actually saw. */
  offsetMap: number[];
  scripts: Script[];
  language: EngineLang;
  sentences: Sentence[];
  warningContext: boolean;
};

export type Sentence = {
  start: number;
  end: number;
  text: string;
  warningFrame: boolean;
};

export type Span = { start: number; end: number; text: string };

export type EntityType =
  | "url"
  | "domain"
  | "phone"
  | "upi"
  | "telegram"
  | "whatsapp-invite"
  | "sebi-reg"
  | "amfi-arn"
  | "claimed-entity"
  | "amount"
  | "percent"
  | "app-mention";

export type PhoneKind =
  | "series-1600"
  | "toll-free-1800"
  | "mobile"
  | "landline"
  | "international";

export type PercentPeriod = "day" | "week" | "month" | "year" | "days" | "none";

export type Entity = Span & {
  type: EntityType;
  /* Normalised form: +91 for phones, registrable domain for urls, upper case
     for registration numbers. */
  value: string;
  phoneKind?: PhoneKind;
  domain?: string;
  tld?: string;
  upiHandle?: string;
  upiPsp?: string;
  upiValid?: boolean;
  upiCategory?: string;
  amount?: number;
  percent?: number;
  percentPeriod?: PercentPeriod;
  percentDays?: number;
};

export type Extraction = {
  entities: Entity[];
  /* True when a buy or sell verb, a name and a target or stop-loss sit close
     together. The name itself is never stored: we judge the form, not the
     security. Guardrail 1 in docs/SPEC.md. */
  tipFormat: boolean;
};

export type Severity = "hard" | "strong" | "moderate";

export type Signal = {
  id: string;
  severity: Severity;
  p: number;
  evidence: Span[];
  titleKey: string;
  whyKey: string;
  basisKey: string;
  source?: "model";
};

export type Positive = {
  id: string;
  p: number;
  evidence: Span[];
  titleKey: string;
};

export type LexiconHit = Span & {
  concept: string;
  /* Points at the one list in lexicon/concepts.ts rather than repeating the
     languages. The duplicate here fell out of step when five lexicons were
     added, and a hit could not name the language it came from. */
  lang: LexiconLang;
  negated: boolean;
  inWarningFrame: boolean;
};
