/* Facts the copy is allowed to quote, each with its source and date.
   `verify: true` means a person must re-read the primary source before this
   goes on a slide or a screen. Section 7.9 of docs/SPEC.md. */

export type Fact = {
  id: string;
  textKey: string;
  source: string;
  asOf: string;
  linkId?: string;
  verify: boolean;
};

export const FACTS: Fact[] = [
  {
    id: "fno-losses",
    textKey: "facts.fnoLosses",
    source: "SEBI study of individual traders in equity derivatives, FY25-FY26",
    asOf: "2026-09",
    verify: true,
  },
  {
    id: "fno-repeat-loss",
    textKey: "facts.fnoRepeatLoss",
    source: "SEBI study of individual traders in equity derivatives, FY25-FY26",
    asOf: "2026-09",
    verify: true,
  },
  {
    id: "vip-group-advisory",
    textKey: "facts.vipGroupAdvisory",
    source: "SEBI press release PR 27/2025",
    asOf: "2025-05-21",
    linkId: "sebi-investor-support",
    verify: true,
  },
  {
    id: "series-1600",
    textKey: "facts.series1600",
    source: "SEBI press release PR 20/2025",
    asOf: "2025-04-08",
    verify: true,
  },
  {
    id: "valid-upi",
    textKey: "facts.validUpi",
    source: "SEBI press release PR 31/2025",
    asOf: "2025-06-11",
    linkId: "sebi-check",
    verify: true,
  },
  {
    id: "scores-timeline",
    textKey: "facts.scoresTimeline",
    source: "SCORES 2.0, in force from 1 April 2024",
    asOf: "2024-04-01",
    linkId: "scores",
    verify: true,
  },
  {
    id: "unregistered-outside",
    textKey: "facts.unregisteredOutside",
    source: "SEBI, on dealings with unregistered intermediaries",
    asOf: "2025-05-21",
    verify: true,
  },
  {
    id: "helpline-1930",
    textKey: "facts.helpline1930",
    source: "I4C, Ministry of Home Affairs",
    asOf: "2026-10",
    linkId: "cybercrime",
    verify: true,
  },
  {
    id: "registration-not-performance",
    textKey: "facts.registrationNotPerformance",
    source: "Standard SEBI disclosure wording",
    asOf: "2026-10",
    verify: true,
  },
];

export function factById(id: string): Fact | undefined {
  return FACTS.find((f) => f.id === id);
}
