import { checkDomain } from "./domains";
import type { Concept } from "./lexicon/concepts";
import { findHits, meansIt } from "./lexicon/match";
import { lookupRegistration, type RegistryStatus } from "./registry";
import type {
  Entity,
  Extraction,
  LexiconHit,
  Normalised,
  Positive,
  Signal,
  Span,
} from "./types";

export type ContextAnswers = {
  /* Three optional taps after the paste. Undefined means "not asked" or
     "skipped", which must never count against the message. */
  theyContactedFirst?: boolean;
  askedForMoneyOtpOrApp?: boolean;
  knowsThePerson?: boolean;
};

export type SignalInput = {
  normalised: Normalised;
  extraction: Extraction;
  context?: ContextAnswers;
  /* Domain age in days from the RDAP route. Online only, so it is optional
     and its absence is reported as unverifiable, never as safe. */
  domainAgeDays?: Record<string, number>;
  claimedName?: string;
  now?: Date;
};

export type SignalResult = {
  signals: Signal[];
  positives: Positive[];
  contextBoost: number;
  registry: ReturnType<typeof lookupRegistration>[];
};

const CONTEXT_BOOST_CAP = 0.35;

function spanOf(hit: LexiconHit | Entity): Span {
  return { start: hit.start, end: hit.end, text: hit.text };
}

/* A hit only counts if the writer meant it: negated phrases ("no guarantee")
   and phrases inside a warning frame ("scammers say guaranteed returns") are
   the opposite of the signal. */
function live(hits: LexiconHit[], concept: Concept): LexiconHit[] {
  return hits.filter(
    (hit) => hit.concept === concept && !hit.negated && !hit.inWarningFrame,
  );
}

function entitiesOf(extraction: Extraction, type: Entity["type"]): Entity[] {
  return extraction.entities.filter((entity) => entity.type === type);
}

function signal(
  id: string,
  severity: Signal["severity"],
  p: number,
  evidence: Span[],
): Signal {
  return {
    id,
    severity,
    p,
    evidence,
    titleKey: `signal.${id}.title`,
    whyKey: `signal.${id}.why`,
    basisKey: `signal.${id}.basis`,
  };
}

const APK_LINK = /\.apk(\b|$)/i;
const INSTALL_FROM_LINK =
  /(install|download|डाउनलोड|इंस्टॉल)[^.!?\n]{0,40}(link|url|लिंक)/i;
const IMPERSONATION_PERSONA =
  /\b(sebi|rbi|exchange|recovery)\s+(officer|official|adhikari|cell|department|team|helpdesk|agent|wing)\b|सेबी\s+(अधिकारी|विभाग)|रिकवरी\s+(अधिकारी|विभाग)/i;
const SERVICE_CALL =
  /\b(service|customer care|helpline|support)\b|सेवा|ग्राहक सेवा|हेल्पलाइन/i;
const PROFIT_SHARING =
  /\b(profit sharing|profit share|\d{1,2}\s*[-/]\s*\d{1,2}\s*profit|advance fee|upfront fee|joining fee|membership fee)\b|मुनाफे में हिस्सा|पहले फीस|सदस्यता शुल्क/i;
const PAYMENT_ASK =
  /\b(pay|send|transfer|deposit|invest)\b|भेज(ो|िए|ें)|जमा कर|भुगतान/i;
/* "Reg no INH123": a registration claim that is not even the right shape. */
const MALFORMED_REG =
  /\b(?:sebi\s+)?reg(?:istration|n|d)?\.?\s*(?:no\.?|number|num)?\s*[:\-]?\s*(IN[-A-Z0-9]{2,20})/i;

export function runSignals(input: SignalInput): SignalResult {
  const { normalised, extraction } = input;
  const hits = findHits(normalised);
  const text = normalised.normalised;
  const found: Signal[] = [];

  const urls = [...entitiesOf(extraction, "url"), ...entitiesOf(extraction, "domain")];
  const invites = [
    ...entitiesOf(extraction, "telegram"),
    ...entitiesOf(extraction, "whatsapp-invite"),
  ];
  const upis = entitiesOf(extraction, "upi");
  const phones = entitiesOf(extraction, "phone");
  const regNos = entitiesOf(extraction, "sebi-reg");
  const percents = entitiesOf(extraction, "percent");

  const domainChecks = urls.map((entity) => ({
    entity,
    check: checkDomain(entity.domain ?? entity.value),
  }));

  // S01 asks for OTP, PIN, CVV or password.
  const otp = live(hits, "OTP");
  if (otp.length > 0) {
    found.push(signal("S01", "hard", 0.9, otp.map(spanOf)));
  }

  // S02 remote access or a sideloaded app.
  const remote = live(hits, "REMOTE_ACCESS");
  const apk = urls.filter((entity) => APK_LINK.test(entity.text));
  const installFromLink = INSTALL_FROM_LINK.exec(text);
  if (remote.length > 0 || apk.length > 0 || installFromLink) {
    const evidence: Span[] = [...remote.map(spanOf), ...apk.map(spanOf)];
    if (installFromLink) {
      evidence.push({
        start: installFromLink.index,
        end: installFromLink.index + installFromLink[0].length,
        text: installFromLink[0],
      });
    }
    found.push(signal("S02", "hard", 0.85, evidence));
  }

  // S03 a fee, tax or deposit demanded before money can be withdrawn.
  const fee = live(hits, "FEE_TO_WITHDRAW");
  if (fee.length > 0) {
    found.push(signal("S03", "hard", 0.9, fee.map(spanOf)));
  }

  // S04 a guarantee paired with a way to pay or a way in.
  const guarantee = live(hits, "GUARANTEE");
  const hasPaymentPath =
    upis.length > 0 ||
    invites.length > 0 ||
    urls.length > 0 ||
    PAYMENT_ASK.test(text);
  if (guarantee.length > 0 && hasPaymentPath) {
    const evidence = [
      ...guarantee.map(spanOf),
      ...upis.map(spanOf),
      ...invites.map(spanOf),
    ];
    found.push(signal("S04", "hard", 0.85, evidence.slice(0, 4)));
  }

  // S05 pretending to be SEBI, an exchange, a depository or RBI.
  const impersonating = domainChecks.filter(
    (item) => item.check.impersonatesAuthority,
  );
  /* The persona is found with a regular expression rather than through the
     lexicon, so it has to be put through the same check by hand. Without
     this, "चेतावनी: कोई भी सेबी अधिकारी आपसे पैसे नहीं माँगता" — a warning
     forwarded by someone trying to help — came out as HIGH_RISK with a hard
     stop. */
  const personaMatch = IMPERSONATION_PERSONA.exec(text);
  const persona =
    personaMatch &&
    meansIt(
      normalised,
      personaMatch.index,
      personaMatch.index + personaMatch[0].length,
    )
      ? personaMatch
      : null;
  const falseApproval = live(hits, "SEBI_APPROVED");
  if (impersonating.length > 0 || persona || falseApproval.length > 0) {
    const evidence: Span[] = [
      ...impersonating.map((item) => spanOf(item.entity)),
      ...falseApproval.map(spanOf),
    ];
    if (persona) {
      evidence.push({
        start: persona.index,
        end: persona.index + persona[0].length,
        text: persona[0],
      });
    }
    found.push(signal("S05", "hard", 0.85, evidence));
  }

  // S10 a guarantee or a risk-free promise on its own.
  if (guarantee.length > 0) {
    found.push(signal("S10", "strong", 0.6, guarantee.map(spanOf)));
  }

  // S11 a return no honest product can promise.
  const doubling = live(hits, "DOUBLE_MONEY");
  const wildPercent = percents.filter((entity) => {
    const value = entity.percent ?? 0;
    if (entity.percentPeriod === "day") return true;
    if (entity.percentPeriod === "week") return value >= 3;
    if (entity.percentPeriod === "month") return value >= 10;
    if (entity.percentPeriod === "days") return true;
    return false;
  });
  if (doubling.length > 0 || wildPercent.length > 0) {
    found.push(
      signal("S11", "strong", 0.5, [
        ...doubling.map(spanOf),
        ...wildPercent.map(spanOf),
      ]),
    );
  }

  // S12 a funnel into a private group.
  const vip = live(hits, "VIP_GROUP");
  if (vip.length > 0 && invites.length > 0) {
    found.push(
      signal("S12", "strong", 0.45, [...vip.map(spanOf), ...invites.map(spanOf)]),
    );
  }

  // S13 insider information, which is illegal to trade on in any case.
  const insider = live(hits, "INSIDER");
  if (insider.length > 0) {
    found.push(signal("S13", "strong", 0.5, insider.map(spanOf)));
  }

  /* S14 money to a person rather than to a regulated account. SEBI describes
     @valid as an additional option, not a requirement, so this is a prompt to
     check and nothing stronger. */
  const loosePayment = upis.filter((entity) => entity.upiValid !== true);
  if (loosePayment.length > 0) {
    found.push(signal("S14", "strong", 0.3, loosePayment.map(spanOf)));
  }

  // S15 what the registration number actually says.
  const registry = regNos.map((entity) =>
    lookupRegistration(entity.value, {
      claimedName: input.claimedName,
      givesAdvice: extraction.tipFormat,
      now: input.now,
    }),
  );
  const REGISTRY_P: Partial<Record<RegistryStatus, number>> = {
    FORMAT_INVALID: 0.5,
    NOT_IN_SNAPSHOT: 0.3,
    FOUND_NAME_DIFFERS: 0.6,
    FOUND_CATEGORY_MISMATCH: 0.4,
    EXPIRED_OR_SUSPENDED: 0.6,
  };
  let registryP = 0;
  const registryEvidence: Span[] = [];
  registry.forEach((lookup, index) => {
    const p = REGISTRY_P[lookup.status];
    if (p === undefined) return;
    /* A name we were never given cannot "differ"; without a claimed name the
       honest answer is that we could not check it. */
    const effective =
      lookup.status === "FOUND_NAME_DIFFERS" && input.claimedName === undefined
        ? 0.3
        : p;
    if (effective > registryP) registryP = effective;
    registryEvidence.push(spanOf(regNos[index]));
  });
  if (registryP > 0) {
    found.push(signal("S15", "strong", registryP, registryEvidence));
  } else {
    /* A claimed number too malformed for the extractor to recognise is still
       a claim, and a wrong one. */
    const malformed = MALFORMED_REG.exec(text);
    if (malformed && regNos.length === 0) {
      found.push(
        signal("S15", "strong", 0.5, [
          {
            start: malformed.index,
            end: malformed.index + malformed[0].length,
            text: malformed[0],
          },
        ]),
      );
    }
  }

  // S16 what is wrong with the link, without ever opening it.
  const LINK_P: Record<string, number> = {
    lookalike: 0.6,
    "raw-ip": 0.5,
    punycode: 0.4,
    "suspicious-tld": 0.25,
    shortener: 0.2,
  };
  let linkP = 0;
  const linkEvidence: Span[] = [];
  for (const item of domainChecks) {
    let worst = 0;
    for (const problem of item.check.problems) {
      worst = Math.max(worst, LINK_P[problem] ?? 0);
    }
    const age = input.domainAgeDays?.[item.check.domain];
    if (age !== undefined && age < 90) worst = Math.max(worst, 0.35);
    if (worst > 0) {
      linkEvidence.push(spanOf(item.entity));
      linkP = Math.max(linkP, worst);
    }
  }
  if (linkP > 0) {
    found.push(signal("S16", "strong", linkP, linkEvidence));
  }

  // S17 keep it to yourself: isolation is how pressure survives.
  const secrecy = live(hits, "SECRECY");
  if (secrecy.length > 0) {
    found.push(signal("S17", "strong", 0.4, secrecy.map(spanOf)));
  }

  // S20 to S28, the moderate band.
  const urgency = live(hits, "URGENCY");
  if (urgency.length > 0) {
    found.push(signal("S20", "moderate", 0.15, urgency.map(spanOf)));
  }

  const proof = live(hits, "FAKE_PROOF");
  if (proof.length > 0) {
    found.push(signal("S21", "moderate", 0.2, proof.map(spanOf)));
  }

  const authority = live(hits, "AUTHORITY_NAME");
  if (authority.length > 0) {
    found.push(signal("S22", "moderate", 0.15, authority.map(spanOf)));
  }

  /* S23 the shape of a tip. We judge the form, never the security named in
     it, so the evidence span is the sentence, not the company. */
  const verifiedAdviser = registry.some(
    (lookup) => lookup.status === "FOUND_NAME_MATCH",
  );
  if (extraction.tipFormat && !verifiedAdviser) {
    found.push(signal("S23", "moderate", 0.2, []));
  }

  const small = live(hits, "SMALL_CAPITAL");
  if (small.length > 0) {
    found.push(signal("S24", "moderate", 0.25, small.map(spanOf)));
  }

  const bot = live(hits, "CRYPTO_BOT");
  if (bot.length > 0) {
    found.push(signal("S25", "moderate", 0.3, bot.map(spanOf)));
  }

  const borrowed = live(hits, "BORROWED");
  if (borrowed.length > 0) {
    found.push(signal("S26", "moderate", 0.3, borrowed.map(spanOf)));
  }

  /* S27 registered firms use 1600-series numbers for service calls to
     existing customers. Sales calls are not covered by that rule, so an
     ordinary mobile is only a mild oddity. */
  const serviceFromMobile =
    SERVICE_CALL.test(text) && phones.some((p) => p.phoneKind === "mobile");
  if (serviceFromMobile) {
    found.push(
      signal(
        "S27",
        "moderate",
        0.15,
        phones.filter((p) => p.phoneKind === "mobile").map(spanOf),
      ),
    );
  }

  const sharing = PROFIT_SHARING.exec(text);
  if (sharing) {
    found.push(
      signal("S28", "moderate", 0.15, [
        {
          start: sharing.index,
          end: sharing.index + sharing[0].length,
          text: sharing[0],
        },
      ]),
    );
  }

  return {
    signals: dedupe(found),
    positives: runPositives(input, registry, domainChecks),
    contextBoost: contextBoost(input.context),
    registry,
  };
}

/* Same id fires once; keep the highest p and merge the evidence so the person
   still sees every place it showed up. */
function dedupe(signals: Signal[]): Signal[] {
  const byId = new Map<string, Signal>();
  for (const item of signals) {
    const existing = byId.get(item.id);
    if (!existing) {
      byId.set(item.id, item);
      continue;
    }
    byId.set(item.id, {
      ...(item.p > existing.p ? item : existing),
      evidence: [...existing.evidence, ...item.evidence],
    });
  }
  return [...byId.values()].sort((a, b) => b.p - a.p);
}

export function contextBoost(answers: ContextAnswers | undefined): number {
  if (!answers) return 0;
  let boost = 0;
  if (answers.theyContactedFirst === true) boost += 0.15;
  if (answers.askedForMoneyOtpOrApp === true) boost += 0.3;
  if (answers.knowsThePerson === false) boost += 0.1;
  return Math.min(CONTEXT_BOOST_CAP, boost);
}

function positive(id: string, p: number, evidence: Span[]): Positive {
  return { id, p, evidence, titleKey: `positive.${id}.title` };
}

/* Positives come only from things we can verify ourselves. Nothing the
   message says about itself is ever a positive. */
function runPositives(
  input: SignalInput,
  registry: ReturnType<typeof lookupRegistration>[],
  domainChecks: { entity: Entity; check: ReturnType<typeof checkDomain> }[],
): Positive[] {
  const positives: Positive[] = [];
  const { extraction } = input;

  const validUpi = entitiesOf(extraction, "upi").filter(
    (entity) => entity.upiValid === true && entity.upiCategory !== undefined,
  );
  if (validUpi.length > 0) {
    positives.push(positive("P01", 0.25, validUpi.map(spanOf)));
  }

  if (registry.some((lookup) => lookup.status === "FOUND_NAME_MATCH")) {
    positives.push(positive("P02", 0.3, []));
  }

  const series1600 = entitiesOf(extraction, "phone").filter(
    (entity) => entity.phoneKind === "series-1600",
  );
  if (series1600.length > 0) {
    positives.push(positive("P03", 0.15, series1600.map(spanOf)));
  }

  const official = domainChecks.filter((item) => item.check.isOfficial);
  if (official.length > 0) {
    positives.push(
      positive("P04", 0.2, official.map((item) => spanOf(item.entity))),
    );
  }

  return positives;
}
