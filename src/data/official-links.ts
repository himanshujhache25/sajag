/* The only external links the app may ever open. A lint test fails the build
   if any other external URL appears in the source. Section 7.9 of docs/SPEC.md.
   Anything marked `verify: true` is listed in docs/VERIFY.md and is not linked
   in the UI until a person has confirmed it against the primary source. */

export type OfficialLink = {
  id: string;
  url: string;
  labelKey: string;
  verify: boolean;
};

export const OFFICIAL_LINKS: OfficialLink[] = [
  {
    id: "sebi-intermediaries",
    url: "https://www.sebi.gov.in/intermediaries.html",
    labelKey: "links.sebiIntermediaries",
    verify: false,
  },
  {
    id: "sebi-check",
    url: "https://siportal.sebi.gov.in/intermediary/sebi-check",
    labelKey: "links.sebiCheck",
    verify: false,
  },
  {
    id: "sebi-investor-support",
    url: "https://investor.sebi.gov.in/Investor-support.html",
    labelKey: "links.sebiInvestorSupport",
    verify: false,
  },
  {
    id: "scores",
    url: "https://scores.sebi.gov.in",
    labelKey: "links.scores",
    verify: false,
  },
  {
    id: "cybercrime",
    url: "https://cybercrime.gov.in",
    labelKey: "links.cybercrime",
    verify: false,
  },
  {
    id: "sanchar-saathi",
    url: "https://sancharsaathi.gov.in",
    labelKey: "links.sancharSaathi",
    verify: true,
  },
  {
    id: "sebi-mi",
    url: "https://mi.sebi.gov.in",
    labelKey: "links.sebiMarketIntelligence",
    verify: true,
  },
  {
    id: "nsdl",
    url: "https://nsdl.co.in",
    labelKey: "links.nsdl",
    verify: true,
  },
  {
    id: "cdsl",
    url: "https://www.cdslindia.com",
    labelKey: "links.cdsl",
    verify: true,
  },
  {
    id: "bhashini",
    url: "https://bhashini.gov.in",
    labelKey: "links.bhashini",
    verify: false,
  },
];

/* Phone numbers are dialled with tel:, not opened as links. */
export const OFFICIAL_NUMBERS = {
  cyberHelpline: { number: "1930", verify: false },
  traiUcc: { number: "1909", verify: true },
  teleManas: { number: "14416", verify: true },
} as const;

export function linkById(id: string): OfficialLink | undefined {
  return OFFICIAL_LINKS.find((l) => l.id === id);
}

/* Only links that a person has confirmed are shown. */
export function usableLinks(): OfficialLink[] {
  return OFFICIAL_LINKS.filter((l) => !l.verify);
}
