import { describe, expect, it } from "vitest";
import { redactForSending } from "./redact";

function masked(text: string) {
  return redactForSending(text).text;
}

describe("redactForSending", () => {
  it("masks an Aadhaar number, grouped or not", () => {
    expect(masked("my aadhaar is 234512345612")).not.toContain("234512345612");
    expect(masked("aadhaar 2345 1234 5612")).not.toContain("2345 1234 5612");
  });

  it("masks a PAN", () => {
    expect(masked("PAN ABCDE1234F here")).not.toContain("ABCDE1234F");
  });

  it("masks a card number that passes Luhn", () => {
    expect(masked("card 4539578763621486")).not.toContain("4539578763621486");
  });

  it("leaves a 16-digit number that fails Luhn alone", () => {
    expect(masked("reference 1234567812345678")).toContain("1234567812345678");
  });

  it("masks an OTP only when an OTP word is near", () => {
    expect(masked("your otp is 492013")).not.toContain("492013");
    expect(masked("ओटीपी 492013 बताइए")).not.toContain("492013");
    expect(masked("flat number 492013 in the lane")).toContain("492013");
  });

  it("masks a bank account number near an account word", () => {
    expect(masked("a/c 50100123456789 of the bank")).not.toContain(
      "50100123456789",
    );
    expect(masked("खाता 50100123456789")).not.toContain("50100123456789");
  });

  it("masks an email address", () => {
    expect(masked("write to rameshwar.prasad@example.com")).not.toContain(
      "rameshwar.prasad@example.com",
    );
  });

  it("masks the person's own number but keeps the other party's", () => {
    const own = redactForSending("my number is 9876543210");
    expect(own.text).not.toContain("9876543210");
    const theirs = redactForSending("call 9876543210 to join");
    expect(theirs.text).toContain("9876543210");
  });

  it("masks मेरा नंबर too", () => {
    expect(masked("मेरा नंबर 9876543210 है")).not.toContain("9876543210");
  });

  it("keeps what we are being asked to check", () => {
    const text =
      "pay to rajesh.trade@okaxis via https://demo-broker.example reg INH000999999";
    const out = masked(text);
    expect(out).toContain("rajesh.trade@okaxis");
    expect(out).toContain("https://demo-broker.example");
    expect(out).toContain("INH000999999");
  });

  it("counts what it masked, by type", () => {
    const out = redactForSending("PAN ABCDE1234F and otp 492013");
    const types = out.redactions.map((r) => r.type).sort();
    expect(types).toEqual(["otp", "pan"]);
    expect(out.redactions.every((r) => r.count === 1)).toBe(true);
  });

  it("changes nothing when there is nothing to hide", () => {
    const text = "Guaranteed 10% profit daily, join the VIP group";
    const out = redactForSending(text);
    expect(out.text).toBe(text);
    expect(out.redactions).toHaveLength(0);
  });
});
