import { describe, expect, it } from "vitest";

import { score, stateFor } from "./score";
import type { Positive, Signal } from "./types";

function sig(id: string, severity: Signal["severity"], p: number): Signal {
  return {
    id,
    severity,
    p,
    evidence: [],
    titleKey: `signal.${id}.title`,
    whyKey: `signal.${id}.why`,
    basisKey: `signal.${id}.basis`,
  };
}

function pos(id: string, p: number): Positive {
  return { id, p, evidence: [], titleKey: `positive.${id}.title` };
}

const EMPTY = { signals: [], positives: [], contextBoost: 0, tooLittleToSay: false };

describe("stateFor", () => {
  it("uses the thresholds from the spec", () => {
    expect(stateFor(0.0, false)).toBe("NO_STRONG_FLAGS");
    expect(stateFor(0.19, false)).toBe("NO_STRONG_FLAGS");
    expect(stateFor(0.2, false)).toBe("SOME_CONCERNS");
    expect(stateFor(0.49, false)).toBe("SOME_CONCERNS");
    expect(stateFor(0.5, false)).toBe("MULTIPLE_RED_FLAGS");
    expect(stateFor(0.79, false)).toBe("MULTIPLE_RED_FLAGS");
    expect(stateFor(0.8, false)).toBe("HIGH_RISK");
  });
});

describe("score", () => {
  it("says so when there is too little to go on", () => {
    const result = score({ ...EMPTY, tooLittleToSay: true });
    expect(result.state).toBe("NOT_ENOUGH_TO_GO_ON");
  });

  it("combines independent signals without ever reaching one", () => {
    const result = score({
      ...EMPTY,
      signals: [sig("S20", "moderate", 0.15), sig("S21", "moderate", 0.2)],
    });
    expect(result.p).toBeCloseTo(0.32, 2);
    expect(result.p).toBeLessThan(1);
    expect(result.state).toBe("SOME_CONCERNS");
  });

  it("lets a hard stop win on its own", () => {
    const result = score({ ...EMPTY, signals: [sig("S01", "hard", 0.9)] });
    expect(result.hardStop).toBe(true);
    expect(result.state).toBe("HIGH_RISK");
  });

  it("lets a hard stop win even with a low p", () => {
    const result = score({ ...EMPTY, signals: [sig("S03", "hard", 0.05)] });
    expect(result.state).toBe("HIGH_RISK");
  });

  it("never lets positives override a hard stop", () => {
    const result = score({
      ...EMPTY,
      signals: [sig("S01", "hard", 0.9)],
      positives: [pos("P01", 0.25), pos("P02", 0.3), pos("P04", 0.2)],
    });
    expect(result.state).toBe("HIGH_RISK");
    expect(result.positiveRelief).toBe(0);
    expect(result.p).toBe(result.rawP);
  });

  it("does not apply positives once p is already at half", () => {
    const result = score({
      ...EMPTY,
      signals: [sig("S10", "strong", 0.6)],
      positives: [pos("P02", 0.3)],
    });
    expect(result.positiveRelief).toBe(0);
    expect(result.state).toBe("MULTIPLE_RED_FLAGS");
  });

  it("softens a mild message when facts check out", () => {
    const result = score({
      ...EMPTY,
      signals: [sig("S20", "moderate", 0.15), sig("S21", "moderate", 0.2)],
      positives: [pos("P02", 0.3), pos("P04", 0.2)],
    });
    expect(result.positiveRelief).toBeCloseTo(0.5, 5);
    expect(result.rawP).toBeCloseTo(0.32, 2);
    expect(result.p).toBeCloseTo(0.16, 2);
  });

  it("caps the relief positives can give at half", () => {
    const result = score({
      ...EMPTY,
      signals: [sig("S20", "moderate", 0.4)],
      positives: [pos("P01", 0.25), pos("P02", 0.3), pos("P03", 0.15), pos("P04", 0.2)],
    });
    expect(result.positiveRelief).toBe(0.5);
  });

  it("never produces a reassuring claim from positives alone", () => {
    const result = score({
      ...EMPTY,
      positives: [pos("P01", 0.25), pos("P02", 0.3)],
    });
    /* The best a clean message can reach is "no strong flags", which is a
       statement about what we found, not a clearance. */
    expect(result.state).toBe("NO_STRONG_FLAGS");
    expect(result.p).toBe(0);
  });

  it("folds the context answers in as one more weak signal", () => {
    const without = score({ ...EMPTY, signals: [sig("S20", "moderate", 0.15)] });
    const withContext = score({
      ...EMPTY,
      signals: [sig("S20", "moderate", 0.15)],
      contextBoost: 0.35,
    });
    expect(withContext.p).toBeGreaterThan(without.p);
    expect(withContext.p).toBeCloseTo(0.448, 3);
  });

  it("ignores tooLittleToSay once a signal has fired", () => {
    const result = score({
      ...EMPTY,
      tooLittleToSay: true,
      signals: [sig("S01", "hard", 0.9)],
    });
    expect(result.state).toBe("HIGH_RISK");
  });
});

describe("the stamp never contradicts the list under it", () => {
  /* A message that threatens to block an account and says "transfer now"
     fires one weak flag and scores about 0.15. The old banding stamped that
     NOTHING STRONG FOUND while the screen underneath listed the flag it had
     just found. The stamp is the part people read. */
  it("never says nothing was found when a signal fired", () => {
    const result = score({ ...EMPTY, signals: [sig("S20", "moderate", 0.15)] });
    expect(result.p).toBeLessThan(0.2);
    expect(result.state).toBe("SOME_CONCERNS");
  });

  it("still says nothing was found when nothing fired", () => {
    expect(score(EMPTY).state).toBe("NO_STRONG_FLAGS");
  });

  it("does not let a positive alone raise the state", () => {
    const result = score({ ...EMPTY, positives: [pos("P1", 0.3)] });
    expect(result.state).toBe("NO_STRONG_FLAGS");
  });
});
