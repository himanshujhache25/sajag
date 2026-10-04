import { describe, expect, it } from "vitest";
import {
  defaultInput,
  lossMaths,
  mulberry32,
  rupees,
  runSim,
} from "./sim";

describe("mulberry32", () => {
  it("gives the same run for the same seed", () => {
    const a = mulberry32(42);
    const b = mulberry32(42);
    const first = [a(), a(), a()];
    const second = [b(), b(), b()];
    expect(first).toEqual(second);
  });

  it("gives a different run for a different seed", () => {
    expect(mulberry32(1)()).not.toBe(mulberry32(2)());
  });

  it("stays between 0 and 1", () => {
    const r = mulberry32(7);
    for (let i = 0; i < 500; i += 1) {
      const v = r();
      expect(v).toBeGreaterThanOrEqual(0);
      expect(v).toBeLessThan(1);
    }
  });
});

describe("the maths of a loss", () => {
  it("needs 100% back after losing half", () => {
    expect(lossMaths(10000, 50)).toEqual({
      pct: 50,
      left: 5000,
      gainNeeded: 100,
    });
  });

  it("needs 900% back after losing 90%", () => {
    expect(lossMaths(10000, 90)).toMatchObject({ left: 1000, gainNeeded: 900 });
  });

  it("is almost symmetric for a small loss", () => {
    expect(lossMaths(10000, 1).gainNeeded).toBe(1);
  });

  it("holds the slider inside 1 to 90", () => {
    expect(lossMaths(10000, 0).pct).toBe(1);
    expect(lossMaths(10000, 150).pct).toBe(90);
  });
});

describe("the borrowing balance", () => {
  it("repeats exactly for the same seed", () => {
    const a = runSim(defaultInput(99));
    const b = runSim(defaultInput(99));
    expect(a.finals).toEqual(b.finals);
    expect(a.median).toBe(b.median);
  });

  it("runs 200 paths and draws 20 of them", () => {
    const r = runSim(defaultInput(1));
    expect(r.finals).toHaveLength(200);
    expect(r.drawn).toHaveLength(20);
    expect(r.drawn[0]).toHaveLength(21);
  });

  it("never goes below zero", () => {
    const r = runSim({ ...defaultInput(3), leverage: 10, dailyMove: 0.035 });
    expect(Math.min(...r.finals)).toBeGreaterThanOrEqual(0);
  });

  it("wipes people out more often at higher leverage", () => {
    const low = runSim({ ...defaultInput(5), leverage: 1, dailyMove: 0.035 });
    const high = runSim({ ...defaultInput(5), leverage: 10, dailyMove: 0.035 });
    expect(high.halfGone).toBeGreaterThan(low.halfGone);
  });

  it("leaves everyone poorer once costs are switched on", () => {
    const free = runSim({ ...defaultInput(11), withCosts: false });
    const paid = runSim({ ...defaultInput(11), withCosts: true });
    expect(paid.median).toBeLessThan(free.median);
  });

  it("keeps the middle outcome between the worst and the best", () => {
    const r = runSim(defaultInput(21));
    expect(r.median).toBeGreaterThanOrEqual(r.worst);
    expect(r.median).toBeLessThanOrEqual(r.best);
  });

  it("stands still when nothing moves and nothing costs", () => {
    const r = runSim({
      ...defaultInput(4),
      dailyMove: 0,
      withCosts: false,
    });
    expect(r.median).toBe(10000);
    expect(r.wiped).toBe(0);
  });
});

describe("rupees", () => {
  it("groups the Indian way", () => {
    expect(rupees(500)).toBe("500");
    expect(rupees(5000)).toBe("5,000");
    expect(rupees(100000)).toBe("1,00,000");
    expect(rupees(10000000)).toBe("1,00,00,000");
  });
});
