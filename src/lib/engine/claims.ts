import type { Concept } from "./lexicon/concepts";
import { findHits } from "./lexicon/match";
import type { RegistryLookup } from "./registry";
import type { Extraction, LexiconHit, Normalised, Span } from "./types";

/* Four statuses, never a verdict word like true or false. We say what kind of
   claim it is and where a person can check it themselves. */
export type ClaimStatus =
  | "AGAINST_RULES"
  | "CANNOT_BE_VERIFIED"
  | "CHECK_ELSEWHERE"
  | "NEEDS_CONTEXT";

export type Claim = {
  id: string;
  status: ClaimStatus;
  /* Keys into the language pack: the claim as we read it, what evidence
     would settle it, and where to look. */
  claimKey: string;
  evidenceKey: string;
  whereKey: string;
  span?: Span;
};

type Rule = {
  id: string;
  concept?: Concept;
  status: ClaimStatus;
};

const CONCEPT_CLAIMS: Rule[] = [
  { id: "C_GUARANTEE", concept: "GUARANTEE", status: "AGAINST_RULES" },
  { id: "C_SEBI_APPROVED", concept: "SEBI_APPROVED", status: "AGAINST_RULES" },
  { id: "C_INSIDER", concept: "INSIDER", status: "AGAINST_RULES" },
  { id: "C_DOUBLE_MONEY", concept: "DOUBLE_MONEY", status: "CANNOT_BE_VERIFIED" },
  { id: "C_FAKE_PROOF", concept: "FAKE_PROOF", status: "CANNOT_BE_VERIFIED" },
  { id: "C_SMALL_CAPITAL", concept: "SMALL_CAPITAL", status: "CANNOT_BE_VERIFIED" },
  { id: "C_URGENCY", concept: "URGENCY", status: "NEEDS_CONTEXT" },
  { id: "C_SECRECY", concept: "SECRECY", status: "NEEDS_CONTEXT" },
  { id: "C_BORROWED", concept: "BORROWED", status: "NEEDS_CONTEXT" },
  { id: "C_CRYPTO_BOT", concept: "CRYPTO_BOT", status: "CANNOT_BE_VERIFIED" },
  { id: "C_AUTHORITY_NAME", concept: "AUTHORITY_NAME", status: "CHECK_ELSEWHERE" },
];

function claim(rule: Rule, span?: Span): Claim {
  return {
    id: rule.id,
    status: rule.status,
    claimKey: `claim.${rule.id}.claim`,
    evidenceKey: `claim.${rule.id}.evidence`,
    whereKey: `claim.${rule.id}.where`,
    span,
  };
}

export type ClaimInput = {
  normalised: Normalised;
  extraction: Extraction;
  registry?: RegistryLookup[];
};

export function findClaims(input: ClaimInput): Claim[] {
  const hits: LexiconHit[] = findHits(input.normalised).filter(
    (hit) => !hit.negated && !hit.inWarningFrame,
  );
  const claims: Claim[] = [];
  const seen = new Set<string>();

  for (const rule of CONCEPT_CLAIMS) {
    const hit = hits.find((candidate) => candidate.concept === rule.concept);
    if (!hit) continue;
    claims.push(claim(rule, { start: hit.start, end: hit.end, text: hit.text }));
    seen.add(rule.id);
  }

  /* A return figure is a claim in its own right even when no lexicon phrase
     fired: market returns vary and can be negative. */
  const percent = input.extraction.entities.find(
    (entity) =>
      entity.type === "percent" &&
      entity.percentPeriod !== undefined &&
      entity.percentPeriod !== "none",
  );
  if (percent && !seen.has("C_RETURN_FIGURE")) {
    claims.push(
      claim(
        { id: "C_RETURN_FIGURE", status: "CANNOT_BE_VERIFIED" },
        { start: percent.start, end: percent.end, text: percent.text },
      ),
    );
  }

  for (const lookup of input.registry ?? []) {
    if (lookup.status === "FOUND_NAME_MATCH") continue;
    claims.push(claim({ id: "C_REGISTRATION", status: "CHECK_ELSEWHERE" }));
    break;
  }

  if (input.extraction.tipFormat) {
    claims.push(claim({ id: "C_TIP", status: "CHECK_ELSEWHERE" }));
  }

  return claims;
}
