import { parse } from "tldts";
import known from "@/data/known-domains.json";

export type DomainProblem =
  | "lookalike"
  | "raw-ip"
  | "suspicious-tld"
  | "shortener"
  | "punycode";

export type DomainCheck = {
  domain: string;
  problems: DomainProblem[];
  /* The known domain it imitates. Shown as "this looks like X", never as
     "X is safe". */
  lookalikeOf?: string;
  isOfficial: boolean;
  /* True when the host carries an official brand token but is not on the
     official list: the impersonation case in signal S05. */
  impersonatesAuthority: boolean;
};

const KNOWN: string[] = [
  ...known.official,
  ...known.exchange,
  ...known.depository,
  ...known.amc,
  ...known.demo,
];

const AUTHORITY_DOMAINS = new Set([
  ...known.official,
  ...known.exchange,
  ...known.depository,
]);

/* TLDs that scam links in this space use far more often than real firms do.
   A weak signal on its own, which is why S16 scores it low. */
const SUSPICIOUS_TLDS = new Set([
  "top",
  "xyz",
  "club",
  "online",
  "site",
  "icu",
  "cfd",
  "rest",
  "live",
  "buzz",
  "monster",
  "quest",
  "work",
  "click",
  "link",
  "cam",
  "sbs",
  "fit",
]);

const SHORTENERS = new Set([
  "bit.ly",
  "tinyurl.com",
  "t.co",
  "goo.gl",
  "rb.gy",
  "cutt.ly",
  "is.gd",
  "shorturl.at",
  "rebrand.ly",
  "tiny.cc",
  "ow.ly",
]);

function levenshtein(a: string, b: string): number {
  if (a === b) return 0;
  if (Math.abs(a.length - b.length) > 2) return 3;
  const previous = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i += 1) {
    let diagonal = previous[0];
    previous[0] = i;
    for (let j = 1; j <= b.length; j += 1) {
      const temp = previous[j];
      previous[j] = Math.min(
        previous[j] + 1,
        previous[j - 1] + 1,
        diagonal + (a[i - 1] === b[j - 1] ? 0 : 1),
      );
      diagonal = temp;
    }
  }
  return previous[b.length];
}

function isRawIp(host: string): boolean {
  return /^\d{1,3}(?:\.\d{1,3}){3}$/.test(host) || host.includes(":");
}

export function checkDomain(input: string): DomainCheck {
  const info = parse(input.includes("://") ? input : `http://${input}`);
  const host = (info.hostname ?? input).toLowerCase();
  /* tldts guesses a registrable domain even for suffixes that do not exist
     ("nsdl.co.on" becomes "co.on"). When the suffix is not a real one, the
     whole host is compared instead, or a typo'd TLD would slip through. */
  const real = info.isIcann || info.isPrivate;
  const domain = (real ? (info.domain ?? host) : host).toLowerCase();
  const tld = (real ? (info.publicSuffix ?? "") : "").toLowerCase();
  const problems: DomainProblem[] = [];

  if (isRawIp(host)) {
    return {
      domain: host,
      problems: ["raw-ip"],
      isOfficial: false,
      impersonatesAuthority: false,
    };
  }

  const isOfficial = KNOWN.includes(domain);

  if (SHORTENERS.has(domain)) problems.push("shortener");
  if (host.includes("xn--")) problems.push("punycode");
  if (!isOfficial && SUSPICIOUS_TLDS.has(tld)) problems.push("suspicious-tld");

  let lookalikeOf: string | undefined;
  if (!isOfficial) {
    const label = domain.split(".")[0];
    for (const candidate of KNOWN) {
      const candidateLabel = candidate.split(".")[0];
      if (levenshtein(domain, candidate) <= 2) {
        lookalikeOf = candidate;
        break;
      }
      /* A known brand token with extra words or hyphens on another TLD:
         "sebi-check-portal.top", "nsdl-verify.online". */
      if (
        label !== candidateLabel &&
        new RegExp(`(^|[-.])${candidateLabel}([-.]|$)`).test(label)
      ) {
        lookalikeOf = candidate;
        break;
      }
    }
    if (lookalikeOf) problems.push("lookalike");
  }

  /* A brand token anywhere in the host, on a domain that is not the real one. */
  const impersonatesAuthority =
    !AUTHORITY_DOMAINS.has(domain) &&
    known.brandTokens.some((token) =>
      new RegExp(`(^|[^a-z])${token}([^a-z]|$)`).test(host),
    );

  return {
    domain,
    problems,
    lookalikeOf,
    isOfficial,
    impersonatesAuthority,
  };
}
