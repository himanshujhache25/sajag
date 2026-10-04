import { describe, expect, it } from "vitest";

import { emptyCase } from "./case";
import { buildPlan } from "./plan";

function keys(file = emptyCase()): string[] {
  return buildPlan(file).flatMap((box) => box.steps.map((s) => s.key));
}

describe("buildPlan", () => {
  it("always has the four time boxes in order", () => {
    expect(buildPlan(emptyCase()).map((b) => b.id)).toEqual([
      "now",
      "today",
      "week",
      "truth",
    ]);
  });

  it("puts the 1930 call first, whatever else happened", () => {
    expect(buildPlan(emptyCase())[0].steps[0].key).toBe("plan.now.call1930");
  });

  it("names the bank only when money actually moved as a transfer", () => {
    expect(keys({ ...emptyCase(), howSent: ["cash"] })).not.toContain(
      "plan.now.tellBank",
    );
    expect(keys({ ...emptyCase(), howSent: ["upi"] })).toContain(
      "plan.now.tellBank",
    );
  });

  it("adds the uninstall step only when an app was involved", () => {
    expect(keys()).not.toContain("plan.week.uninstall");
    expect(keys({ ...emptyCase(), proof: ["app"] })).toContain(
      "plan.week.uninstall",
    );
  });

  it("says plainly that SCORES may not cover an unregistered entity", () => {
    expect(keys()).toContain("plan.week.ifUnregistered");
  });

  it("never promises the money back, and warns about recovery fees", () => {
    const all = keys();
    expect(all).toContain("plan.truth.mayNotComeBack");
    expect(all).toContain("plan.truth.recoveryFeeIsSecondScam");
  });
});
