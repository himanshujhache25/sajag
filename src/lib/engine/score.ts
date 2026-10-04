import type { VerdictState } from "./states";
import type { Positive, Signal } from "./types";

export type ScoreInput = {
  signals: Signal[];
  positives: Positive[];
  contextBoost: number;
  /* True when the input is under 12 characters and carried no entities. */
  tooLittleToSay: boolean;
};

export type Score = {
  p: number;
  state: VerdictState;
  hardStop: boolean;
  /* The p before positives were applied, so the details fold can be honest
     about what lowered it. */
  rawP: number;
  positiveRelief: number;
};

const POSITIVE_RELIEF_CAP = 0.5;

/* Noisy-or: each independent signal takes a bite out of the remaining
   benefit of the doubt, so ten weak flags never pretend to be a proof. */
function combine(ps: number[]): number {
  let remaining = 1;
  for (const p of ps) remaining *= 1 - p;
  return 1 - remaining;
}

export function stateFor(p: number, hardStop: boolean): VerdictState {
  if (hardStop || p >= 0.8) return "HIGH_RISK";
  if (p >= 0.5) return "MULTIPLE_RED_FLAGS";
  if (p >= 0.2) return "SOME_CONCERNS";
  return "NO_STRONG_FLAGS";
}

export function score(input: ScoreInput): Score {
  const hardStop = input.signals.some((signal) => signal.severity === "hard");

  if (input.tooLittleToSay && !hardStop && input.signals.length === 0) {
    return {
      p: 0,
      state: "NOT_ENOUGH_TO_GO_ON",
      hardStop: false,
      rawP: 0,
      positiveRelief: 0,
    };
  }

  const parts = input.signals.map((signal) => signal.p);
  if (input.contextBoost > 0) parts.push(input.contextBoost);
  const rawP = combine(parts);

  /* Positives only help a message that is already not alarming. A hard stop
     is never offset, and positives on their own can never move a message
     into a reassuring state because they do not lower p below its floor of
     zero flags. */
  let p = rawP;
  let positiveRelief = 0;
  if (!hardStop && rawP < 0.5) {
    const sum = input.positives.reduce((total, item) => total + item.p, 0);
    positiveRelief = Math.min(POSITIVE_RELIEF_CAP, sum);
    p = rawP * (1 - positiveRelief);
  }

  /* Decide the state from the rounded p, so a value that displays as 0.20
     never sits one float below the threshold it is shown to have crossed. */
  const shown = round(p);
  const banded = stateFor(shown, hardStop);

  /* "Nothing strong found" has to mean nothing was found. A message that
     threatens to block an account and tells somebody to transfer money at
     once scores below 0.2 on its own, and used to come back stamped
     NOTHING STRONG FOUND while the screen underneath listed the flag it had
     just found. The stamp is the part people read, so it must not contradict
     the list. One weak flag is a reason to look closer, not a clean bill. */
  const state =
    banded === "NO_STRONG_FLAGS" && input.signals.length > 0
      ? "SOME_CONCERNS"
      : banded;

  return {
    p: shown,
    state,
    hardStop,
    rawP: round(rawP),
    positiveRelief: round(positiveRelief),
  };
}

function round(value: number): number {
  return Math.round(value * 1000) / 1000;
}
