import { parse } from "tldts";
import type {
  Entity,
  Extraction,
  Normalised,
  PercentPeriod,
  PhoneKind,
} from "./types";

/* Works on the normalised text, but every offset is mapped back so evidence
   can be quoted in the words the person actually saw. */

type Pos = { start: number; end: number };

function toOriginal(n: Normalised, start: number, end: number): Pos {
  const map = n.offsetMap;
  const from = map[start] ?? 0;
  const lastIndex = Math.min(end - 1, map.length - 1);
  const to = (map[lastIndex] ?? from) + 1;
  return { start: from, end: Math.max(to, from + 1) };
}

function span(n: Normalised, start: number, end: number) {
  const pos = toOriginal(n, start, end);
  return { ...pos, text: n.original.slice(pos.start, pos.end) };
}

const URL_RE = /\bhttps?:\/\/[^\s<>"']+|\bwww\.[^\s<>"']+/gi;
const BARE_DOMAIN_RE =
  /\b(?!\d+\.\d+\b)[a-z0-9][a-z0-9-]*(?:\.[a-z0-9][a-z0-9-]*)+\b/gi;
const PHONE_RE = /(?:\+?91[\s-]?)?\b\d(?:[\d\s-]{7,13})\d\b/g;
const UPI_RE = /\b[a-z0-9][a-z0-9._-]{1,48}@[a-z][a-z0-9]{1,24}\b/gi;
const SEBI_RE = /\bIN[A-Z]\d{9}\b|\bIN-DP-\d+(?:-\d{2,4})?\b/gi;
const ARN_RE = /\bARN-\d+\b/gi;
const APP_RE =
  /\b(anydesk|teamviewer|quicksupport|rustdesk|\S*\.apk)\b/gi;
const TELEGRAM_RE = /\bt\.me\/[\w+]+/gi;
const TELEGRAM_HANDLE_RE = /@[a-z][a-z0-9_]{3,31}\b/gi;
const WHATSAPP_RE =
  /\b(?:https?:\/\/)?(?:chat\.whatsapp\.com\/[\w-]+|wa\.me\/\d+)/gi;

const COMPANY_WORDS =
  "securities|capital|advisors|advisers|research|wealth|broking|brokers|fund|funds|investments|financial|finserv|markets|analytics|pvt\\.? ?ltd|private limited|limited|ltd|llp";
const CLAIMED_AFTER_RE =
  /registered with sebi as\s+([a-z][\w&.\s-]{2,50}?)(?=[,.;\n]|$)/gi;

const PERCENT_RE =
  /(\d+(?:\.\d+)?)\s*(?:%|percent|प्रतिशत|फीसदी)/gi;

const AMOUNT_WORDS =
  /(?:₹\s*)?(\d+(?:\.\d+)?)\s*(lakh|lakhs|lac|crore|crores|cr|लाख|करोड़|करोड)\b/giu;
const AMOUNT_PLAIN_RE = /₹\s*(\d{1,3}(?:,\d{2})*(?:,\d{3})|\d+)(?:\.\d+)?/g;

function phoneKind(digits: string): PhoneKind {
  if (digits.startsWith("1600")) return "series-1600";
  if (digits.startsWith("1800")) return "toll-free-1800";
  if (/^91\d{10}$/.test(digits)) {
    return /^[6-9]/.test(digits.slice(2)) ? "mobile" : "landline";
  }
  if (digits.length === 10) return /^[6-9]/.test(digits) ? "mobile" : "landline";
  if (digits.length > 12) return "international";
  return "landline";
}

function periodAround(text: string, at: number, end: number) {
  const before = text.slice(Math.max(0, at - 24), at);
  const after = text.slice(end, end + 28);
  const both = `${before} ${after}`;

  const inDays = after.match(/\bin\s+(\d{1,3})\s*(days?|दिन)/) ??
    before.match(/(\d{1,3})\s*(दिन)\s*(में)?\s*$/);
  if (inDays) {
    return {
      period: "days" as PercentPeriod,
      days: Number(inDays[1]),
    };
  }

  const table: [RegExp, PercentPeriod][] = [
    [/\b(daily|per day|a day|everyday|every day|रोज़?ाना|रोज़|प्रतिदिन)\b/u, "day"],
    [/\b(weekly|per week|a week|हर हफ्ते|साप्ताहिक)\b/u, "week"],
    [/\b(monthly|per month|a month|हर महीने|मासिक|महीने में)\b/u, "month"],
    [/\b(yearly|annual|per year|a year|सालाना|वार्षिक)\b/u, "year"],
  ];
  for (const [re, period] of table) {
    if (re.test(both)) return { period, days: undefined };
  }
  return { period: "none" as PercentPeriod, days: undefined };
}

type Entity2 = Entity & { rawStart: number; rawEnd: number };

function overlapsAny(list: Entity2[], start: number, end: number) {
  return list.some((e) => start < e.rawEnd && end > e.rawStart);
}

export function extract(n: Normalised): Extraction {
  const text = n.normalised;
  const entities: Entity2[] = [];

  const add = (
    start: number,
    end: number,
    entity: Omit<Entity, "start" | "end" | "text">,
  ) => {
    if (overlapsAny(entities, start, end)) return;
    const s = span(n, start, end);
    entities.push({ ...entity, ...s, rawStart: start, rawEnd: end });
  };

  for (const m of text.matchAll(WHATSAPP_RE)) {
    const at = m.index ?? 0;
    add(at, at + m[0].length, {
      type: "whatsapp-invite",
      value: m[0],
    });
  }

  for (const m of text.matchAll(TELEGRAM_RE)) {
    const at = m.index ?? 0;
    add(at, at + m[0].length, { type: "telegram", value: m[0] });
  }

  /* An @handle counts as Telegram only when Telegram is named nearby;
     otherwise it is usually a UPI id or an email. */
  for (const m of text.matchAll(TELEGRAM_HANDLE_RE)) {
    const at = m.index ?? 0;
    const around = text.slice(Math.max(0, at - 60), at + 60);
    if (!/telegram|टेलीग्राम/.test(around)) continue;
    if (/\.[a-z]{2,}$/.test(m[0])) continue;
    add(at, at + m[0].length, { type: "telegram", value: m[0] });
  }

  for (const m of text.matchAll(URL_RE)) {
    const at = m.index ?? 0;
    const raw = m[0].replace(/[.,;)]+$/, "");
    const info = parse(raw);
    add(at, at + raw.length, {
      type: "url",
      value: raw,
      domain: info.domain ?? undefined,
      tld: info.publicSuffix ?? undefined,
    });
  }

  for (const m of text.matchAll(UPI_RE)) {
    const at = m.index ?? 0;
    const [handle, psp] = m[0].split("@");
    /* An email's domain carries a dot; a UPI PSP does not. */
    if (text[at + m[0].length] === ".") continue;
    const valid = psp === "valid";
    const category = valid ? (handle.split(".").pop() ?? undefined) : undefined;
    add(at, at + m[0].length, {
      type: "upi",
      value: m[0],
      upiHandle: handle,
      upiPsp: psp,
      upiValid: valid,
      upiCategory: category,
    });
  }

  for (const m of text.matchAll(BARE_DOMAIN_RE)) {
    const at = m.index ?? 0;
    const info = parse(m[0]);
    if (!info.domain || !info.isIcann) continue;
    add(at, at + m[0].length, {
      type: "domain",
      value: info.domain,
      domain: info.domain,
      tld: info.publicSuffix ?? undefined,
    });
  }

  for (const m of text.matchAll(SEBI_RE)) {
    const at = m.index ?? 0;
    add(at, at + m[0].length, {
      type: "sebi-reg",
      value: m[0].toUpperCase(),
    });
  }

  for (const m of text.matchAll(ARN_RE)) {
    const at = m.index ?? 0;
    add(at, at + m[0].length, { type: "amfi-arn", value: m[0].toUpperCase() });
  }

  for (const m of text.matchAll(APP_RE)) {
    const at = m.index ?? 0;
    add(at, at + m[0].length, { type: "app-mention", value: m[0] });
  }

  for (const m of text.matchAll(PHONE_RE)) {
    const at = m.index ?? 0;
    const raw = m[0].trim();
    const digits = raw.replace(/\D/g, "");
    if (digits.length < 8 || digits.length > 15) continue;
    const normalisedDigits = digits.length === 10 ? `91${digits}` : digits;
    add(at, at + raw.length, {
      type: "phone",
      value: `+${normalisedDigits}`,
      phoneKind: phoneKind(normalisedDigits),
    });
  }

  for (const m of text.matchAll(AMOUNT_WORDS)) {
    const at = m.index ?? 0;
    const unit = m[2].toLowerCase();
    const multiplier = /lakh|lac|लाख/u.test(unit) ? 100000 : 10000000;
    add(at, at + m[0].length, {
      type: "amount",
      value: m[0],
      amount: Number(m[1]) * multiplier,
    });
  }

  for (const m of text.matchAll(AMOUNT_PLAIN_RE)) {
    const at = m.index ?? 0;
    add(at, at + m[0].length, {
      type: "amount",
      value: m[0],
      amount: Number(m[1].replace(/,/g, "")),
    });
  }

  for (const m of text.matchAll(PERCENT_RE)) {
    const at = m.index ?? 0;
    const end = at + m[0].length;
    const { period, days } = periodAround(text, at, end);
    add(at, end, {
      type: "percent",
      value: m[0],
      percent: Number(m[1]),
      percentPeriod: period,
      percentDays: days,
    });
  }

  /* An explicit "registered with SEBI as X" claim is read before the general
     company-word rule, so the claim wins the overlap. */
  for (const m of text.matchAll(CLAIMED_AFTER_RE)) {
    const at = (m.index ?? 0) + m[0].indexOf(m[1]);
    add(at, at + m[1].trimEnd().length, {
      type: "claimed-entity",
      value: m[1].trim(),
    });
  }

  /* The trailing run of company words is greedy, so "Satna Wealth Research"
     is read whole rather than stopping at "Wealth". */
  const companyRe = new RegExp(
    `\\b((?!(?:${COMPANY_WORDS})\\b)[a-z][\\w&.-]*(?:\\s+(?!(?:${COMPANY_WORDS})\\b)[a-z][\\w&.-]*){0,2}(?:\\s+(?:${COMPANY_WORDS}))+)\\b`,
    "gi",
  );
  for (const m of text.matchAll(companyRe)) {
    const at = m.index ?? 0;
    add(at, at + m[0].length, { type: "claimed-entity", value: m[1] });
  }

  entities.sort((a, b) => a.start - b.start);

  return {
    entities: entities.map((entity) => {
      /* rawStart and rawEnd are only used while matching; callers see
         offsets into the text the person actually pasted. */
      const copy: Partial<Entity2> = { ...entity };
      delete copy.rawStart;
      delete copy.rawEnd;
      return copy as Entity;
    }),
    tipFormat: hasTipFormat(text),
  };
}

/* `\b` is a Latin-only boundary, so the Devanagari forms are matched without
   one. They are long enough not to appear inside other words. */
const BUY_SELL = /\b(?:buy|sell|short|long)\b|खरीद(?:ें|ो|ना|िए)?|बेच(?:ें|ो|ना|िए)?/giu;
const TARGET =
  /\b(?:target|tgt|stoploss|stop loss|sl)\b|टारगेट|स्टॉपलॉस|स्टॉप लॉस|लक्ष्य/giu;

/* The form of a tip, not its content. The name is never read or stored:
   guardrail 1 in docs/SPEC.md says we judge the source and the form only. */
function hasTipFormat(text: string): boolean {
  for (const verb of text.matchAll(BUY_SELL)) {
    const at = verb.index ?? 0;
    const window = text.slice(at, at + 80);
    TARGET.lastIndex = 0;
    if (!TARGET.test(window)) continue;
    if (!/\d/.test(window)) continue;
    return true;
  }
  return false;
}
