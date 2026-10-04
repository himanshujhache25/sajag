import { describe, expect, it } from "vitest";
import { checkDomain } from "./domains";

describe("checkDomain", () => {
  it("knows an official domain", () => {
    const out = checkDomain("https://www.sebi.gov.in/intermediaries.html");
    expect(out.isOfficial).toBe(true);
    expect(out.problems).toEqual([]);
  });

  it("spots a one-letter lookalike", () => {
    const out = checkDomain("nsdl.co.on");
    expect(out.problems).toContain("lookalike");
  });

  it("spots a brand token with extra words", () => {
    const out = checkDomain("https://sebi-check-portal.top/verify");
    expect(out.problems).toContain("lookalike");
    expect(out.impersonatesAuthority).toBe(true);
  });

  it("spots a suspicious tld", () => {
    expect(checkDomain("demobroker-vip-pro.top").problems).toContain(
      "suspicious-tld",
    );
  });

  it("spots a raw ip address", () => {
    expect(checkDomain("http://192.168.10.4/login").problems).toEqual([
      "raw-ip",
    ]);
  });

  it("spots a shortener", () => {
    expect(checkDomain("https://bit.ly/abc123").problems).toContain(
      "shortener",
    );
  });

  it("spots punycode", () => {
    expect(checkDomain("https://xn--sbi-5na.com").problems).toContain(
      "punycode",
    );
  });

  it("does not call an ordinary domain an impersonator", () => {
    const out = checkDomain("https://www.example.com/page");
    expect(out.impersonatesAuthority).toBe(false);
    expect(out.problems).toEqual([]);
  });

  it("does not flag the real depository site", () => {
    const out = checkDomain("https://nsdl.co.in");
    expect(out.impersonatesAuthority).toBe(false);
    expect(out.isOfficial).toBe(true);
  });
});
