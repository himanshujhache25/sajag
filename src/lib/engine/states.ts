export const STATES = [
  "NOT_ENOUGH_TO_GO_ON",
  "NO_STRONG_FLAGS",
  "SOME_CONCERNS",
  "MULTIPLE_RED_FLAGS",
  "HIGH_RISK",
] as const;

export type VerdictState = (typeof STATES)[number];

/* Position on the four-notch ruler. NOT_ENOUGH_TO_GO_ON has no position. */
export const NOTCH: Record<VerdictState, 0 | 1 | 2 | 3 | 4> = {
  NOT_ENOUGH_TO_GO_ON: 0,
  NO_STRONG_FLAGS: 1,
  SOME_CONCERNS: 2,
  MULTIPLE_RED_FLAGS: 3,
  HIGH_RISK: 4,
};
