import { findClaims, type Claim } from "./claims";
import { extract } from "./extract";
import { readLens, type Lens } from "./lens";
import { normalise } from "./normalise";
import { redactForSending, type Redacted } from "./redact";
import type { RegistryLookup } from "./registry";
import { score, type Score } from "./score";
import { runSignals, type ContextAnswers } from "./signals";
import type { VerdictState } from "./states";
import type { EngineLang, Positive, Signal } from "./types";

export const ENGINE_VERSION = "1.0.0";
/* The date the lexicons, thresholds and the signal catalogue were last
   reviewed by a person. Shown next to the verdict so nobody mistakes an old
   ruleset for a fresh judgement. */
export const RULESET_DATE = "2026-10-05";

const MIN_CHARS_TO_JUDGE = 12;

export type Verdict = {
  state: VerdictState;
  p: number;
  rawP: number;
  hardStop: boolean;
  signals: Signal[];
  positives: Positive[];
  /* Things we checked and could confirm. */
  verified: string[];
  /* Things we did not or could not check. Always non-empty: there is always
     something we cannot see. */
  unverifiable: string[];
  claims: Claim[];
  lens: Lens;
  registry: RegistryLookup[];
  checkedCount: number;
  uncheckableCount: number;
  language: EngineLang;
  engineVersion: string;
  rulesetDate: string;
  redaction: Redacted;
  contextBoost: number;
};

export type CheckInput = {
  text: string;
  context?: ContextAnswers;
  claimedName?: string;
  domainAgeDays?: Record<string, number>;
  online?: boolean;
  now?: Date;
};

export function check(input: CheckInput): Verdict {
  /* Redact before anything else, so the rest of the engine, the logs and the
     model layer never see an Aadhaar number or a card. */
  const redaction = redactForSending(input.text);
  const n = normalise(redaction.text);
  const extraction = extract(n);

  const { signals, positives, contextBoost, registry } = runSignals({
    normalised: n,
    extraction,
    context: input.context,
    domainAgeDays: input.domainAgeDays,
    claimedName: input.claimedName,
    now: input.now,
  });

  const tooLittleToSay =
    n.original.trim().length < MIN_CHARS_TO_JUDGE && extraction.entities.length === 0;

  const result: Score = score({
    signals,
    positives,
    contextBoost,
    tooLittleToSay,
  });

  const claims = findClaims({ normalised: n, extraction, registry });
  const lens = readLens(n, extraction);

  const verified = verifiedList(positives, registry);
  const unverifiable = unverifiableList(input, registry, extraction);

  return {
    state: result.state,
    p: result.p,
    rawP: result.rawP,
    hardStop: result.hardStop,
    signals,
    positives,
    verified,
    unverifiable,
    claims,
    lens,
    registry,
    checkedCount: verified.length + signals.length,
    uncheckableCount: unverifiable.length,
    language: n.language,
    engineVersion: ENGINE_VERSION,
    rulesetDate: RULESET_DATE,
    redaction,
    contextBoost,
  };
}

function verifiedList(
  positives: Positive[],
  registry: RegistryLookup[],
): string[] {
  const keys = positives.map((item) => `verified.${item.id}.title`);
  if (registry.some((lookup) => lookup.status === "FOUND_NAME_MATCH")) {
    /* SEBI's own standard disclosure: registration is not a promise about
       performance or returns. It belongs next to every match. */
    keys.push("verified.registrationIsNotPerformance");
  }
  return keys;
}

function unverifiableList(
  input: CheckInput,
  registry: RegistryLookup[],
  extraction: ReturnType<typeof extract>,
): string[] {
  const keys: string[] = ["unverifiable.sender", "unverifiable.linksNotOpened"];

  if (registry.some((lookup) => lookup.status === "NOT_IN_SNAPSHOT")) {
    keys.push("unverifiable.registrationNotInSnapshot");
  }
  /* The engine refuses to name a category for the older broker prefixes and
     the registrar prefix (INB, INF, INR) because they have not been checked
     against SEBI's own list. That refusal used to stop inside the engine:
     `categoryUnverified` was computed, typed and tested, and then nothing
     read it. A caution nobody is told is not a caution, so it is said out
     loud here, in the one place the product admits what it could not do. */
  if (registry.some((lookup) => lookup.categoryUnverified)) {
    keys.push("unverifiable.registrationCategory");
  }
  if (registry.some((lookup) => lookup.snapshotStale)) {
    keys.push("unverifiable.snapshotStale");
  }
  const hasLink = extraction.entities.some(
    (entity) => entity.type === "url" || entity.type === "domain",
  );
  if (hasLink && input.online !== true) {
    keys.push("unverifiable.domainAgeNeedsInternet");
  }
  if (input.context === undefined) {
    keys.push("unverifiable.contextNotAsked");
  }
  keys.push("unverifiable.voiceAndVideo");
  return keys;
}
