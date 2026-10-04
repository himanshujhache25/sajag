import { describe, expect, it } from "vitest";

import golden from "../../../eval/golden.json";
import { check } from "./check";

type Golden = {
  id: string;
  lang: string;
  text: string;
  expectState: string;
  expectSignals: string[];
  expectPositives?: string[];
  expectLens?: string;
  expectWarningContext?: boolean;
};

const MESSAGES = golden.messages as Golden[];

describe("the nine golden messages", () => {
  for (const message of MESSAGES) {
    it(`${message.id} lands on ${message.expectState}`, () => {
      const verdict = check({ text: message.text, now: new Date("2026-10-10") });
      expect(verdict.state).toBe(message.expectState);
    });

    if (message.expectSignals.length > 0) {
      it(`${message.id} fires the expected signals`, () => {
        const verdict = check({ text: message.text, now: new Date("2026-10-10") });
        const fired = verdict.signals.map((signal) => signal.id);
        for (const id of message.expectSignals) {
          expect(fired, `${message.id} missing ${id}`).toContain(id);
        }
      });
    } else {
      it(`${message.id} fires nothing`, () => {
        const verdict = check({ text: message.text, now: new Date("2026-10-10") });
        expect(verdict.signals.map((signal) => signal.id)).toEqual([]);
      });
    }
  }

  it("G5 credits the 1600-series service number", () => {
    const verdict = check({ text: MESSAGES[4].text });
    expect(verdict.positives.map((item) => item.id)).toContain("P03");
  });

  it("G6 reads as education on the lens", () => {
    const verdict = check({ text: MESSAGES[5].text });
    expect(verdict.lens.selling).toBeLessThan(0.5);
  });

  it("G7 is recognised as a forwarded warning", () => {
    const verdict = check({ text: MESSAGES[6].text });
    expect(verdict.signals).toHaveLength(0);
  });

  it("G9 does not treat the word NSDL as impersonation", () => {
    const verdict = check({ text: MESSAGES[8].text });
    expect(verdict.signals.map((signal) => signal.id)).not.toContain("S05");
  });

  it("always tells the person what it could not check", () => {
    for (const message of MESSAGES) {
      expect(check({ text: message.text }).unverifiable.length).toBeGreaterThan(0);
    }
  });
});
