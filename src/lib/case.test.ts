import { describe, expect, it } from "vitest";

import { emptyCase, groupIndian, wasTransfer } from "./case";

describe("groupIndian", () => {
  it("leaves three digits alone", () => {
    expect(groupIndian("500")).toBe("500");
  });

  it("groups the last three, then twos", () => {
    expect(groupIndian("5000")).toBe("5,000");
    expect(groupIndian("50000")).toBe("50,000");
    expect(groupIndian("500000")).toBe("5,00,000");
    expect(groupIndian("12500000")).toBe("1,25,00,000");
  });

  it("drops anything that is not a digit", () => {
    expect(groupIndian("₹ 12,345 /-")).toBe("12,345");
  });

  it("drops leading zeroes but keeps a lone zero", () => {
    expect(groupIndian("007")).toBe("7");
    expect(groupIndian("0")).toBe("0");
  });

  it("gives nothing back for nothing", () => {
    expect(groupIndian("")).toBe("");
  });
});

describe("wasTransfer", () => {
  it("is true for UPI and bank, false for cash", () => {
    expect(wasTransfer({ ...emptyCase(), howSent: ["upi"] })).toBe(true);
    expect(wasTransfer({ ...emptyCase(), howSent: ["bank"] })).toBe(true);
    expect(wasTransfer({ ...emptyCase(), howSent: ["cash", "card"] })).toBe(
      false,
    );
  });
});
