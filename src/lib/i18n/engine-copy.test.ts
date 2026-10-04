import { describe, expect, it } from "vitest";

import golden from "../../../eval/golden.json";
import { check } from "../engine/check";
import { en } from "./packs/en";
import { hi } from "./packs/hi";

/* Every key the engine hands to the UI must exist in both packs. A missing
   key would show a person a raw identifier like "signal.S14.why". */
const MESSAGES = (golden.messages as { text: string }[]).map((m) => m.text);

function keysFromVerdicts(): string[] {
  const keys = new Set<string>();
  for (const text of MESSAGES) {
    const verdict = check({ text });
    for (const signal of verdict.signals) {
      keys.add(signal.titleKey);
      keys.add(signal.whyKey);
      keys.add(signal.basisKey);
    }
    for (const positive of verdict.positives) keys.add(positive.titleKey);
    for (const claim of verdict.claims) {
      keys.add(claim.claimKey);
      keys.add(claim.evidenceKey);
      keys.add(claim.whereKey);
      keys.add(`claim.status.${claim.status}`);
    }
    for (const key of verdict.verified) keys.add(key);
    for (const key of verdict.unverifiable) {
      keys.add(key);
      keys.add(`${key}.how`);
    }
    keys.add(`state.${verdict.state}.stamp`);
    keys.add(`state.${verdict.state}.line`);
  }
  return [...keys].sort();
}

describe("engine copy", () => {
  const keys = keysFromVerdicts();

  it("produces keys to check", () => {
    expect(keys.length).toBeGreaterThan(30);
  });

  for (const pack of [hi, en]) {
    it(`${pack.lang} has every key the engine emits`, () => {
      const missing = keys.filter((key) => !(key in pack.strings));
      expect(missing).toEqual([]);
    });
  }

  it("covers all twenty-eight signals and four positives in both packs", () => {
    const ids = [
      "S01", "S02", "S03", "S04", "S05",
      "S10", "S11", "S12", "S13", "S14", "S15", "S16", "S17",
      "S20", "S21", "S22", "S23", "S24", "S25", "S26", "S27", "S28",
    ];
    for (const pack of [hi, en]) {
      for (const id of ids) {
        expect(pack.strings[`signal.${id}.title`], `${pack.lang} ${id}`).toBeTruthy();
        expect(pack.strings[`signal.${id}.why`], `${pack.lang} ${id}`).toBeTruthy();
        expect(pack.strings[`signal.${id}.basis`], `${pack.lang} ${id}`).toBeTruthy();
      }
      for (const id of ["P01", "P02", "P03", "P04"]) {
        expect(pack.strings[`positive.${id}.title`], `${pack.lang} ${id}`).toBeTruthy();
      }
    }
  });
});
