import { describe, expect, it } from "vitest";

import { extract } from "./extract";
import { normalise } from "./normalise";
import { contextBoost, runSignals, type SignalInput } from "./signals";

function run(text: string, extras: Partial<SignalInput> = {}) {
  const n = normalise(text);
  return runSignals({
    normalised: n,
    extraction: extract(n),
    now: new Date("2026-10-10T00:00:00Z"),
    ...extras,
  });
}

function ids(text: string, extras: Partial<SignalInput> = {}): string[] {
  return run(text, extras).signals.map((signal) => signal.id);
}

function fired(id: string, text: string, extras: Partial<SignalInput> = {}) {
  return run(text, extras).signals.find((signal) => signal.id === id);
}

describe("hard stops", () => {
  it("S01 fires when an OTP is asked for", () => {
    const signal = fired("S01", "Please share the OTP you just received to confirm.");
    expect(signal?.severity).toBe("hard");
    expect(signal?.p).toBe(0.9);
    expect(signal?.evidence.length).toBeGreaterThan(0);
  });

  it("S01 fires in Hindi too", () => {
    expect(ids("कृपया ओटीपी बताइए तभी पैसा आएगा")).toContain("S01");
  });

  it("S01 does not fire when the message warns about OTPs", () => {
    expect(ids("Bank never asks for OTP, do not share OTP with anyone")).not.toContain(
      "S01",
    );
  });

  it("S02 fires on a sideloaded apk link", () => {
    expect(ids("Download our app from http://fastprofit.top/trade.apk")).toContain(
      "S02",
    );
  });

  it("S02 fires on remote access software", () => {
    expect(ids("Install AnyDesk so our team can set up your account")).toContain("S02");
  });

  it("S03 fires when a fee is demanded to release money", () => {
    const signal = fired(
      "S03",
      "Your profit of 2 lakh is ready. Pay 18% tax first to withdraw it.",
    );
    expect(signal?.severity).toBe("hard");
  });

  it("S04 fires when a guarantee comes with a way to pay", () => {
    expect(
      ids("Guaranteed 100% returns, pay now to rahul@okaxis and start today"),
    ).toContain("S04");
  });

  it("S04 does not fire on a guarantee with nothing to act on", () => {
    expect(ids("Some people believe in guaranteed returns.")).not.toContain("S04");
  });

  it("S05 fires on a lookalike regulator domain", () => {
    expect(ids("Verify your account at https://sebi-verify.top/login")).toContain("S05");
  });

  it("S05 fires on a SEBI officer persona", () => {
    expect(ids("I am a SEBI officer calling about your pending refund")).toContain(
      "S05",
    );
  });

  it("S05 does not fire on the real SEBI site", () => {
    expect(ids("Check the list yourself at https://www.sebi.gov.in")).not.toContain(
      "S05",
    );
  });
});

describe("strong signals", () => {
  it("S10 fires on a bare guarantee", () => {
    expect(fired("S10", "GUARANTEED profit every single month")?.p).toBe(0.6);
  });

  it("S11 fires on doubling money", () => {
    expect(ids("Paisa double in 30 days, pakka")).toContain("S11");
  });

  it("S11 fires on 5% per day", () => {
    expect(ids("Earn 5% per day on your capital")).toContain("S11");
  });

  it("S11 ignores an ordinary 12% per year", () => {
    expect(ids("This fund returned about 12% per year over a decade")).not.toContain(
      "S11",
    );
  });

  it("S12 fires on a VIP group with an invite link", () => {
    expect(ids("Join our VIP group https://t.me/+abcdefghijk for daily calls")).toContain(
      "S12",
    );
  });

  it("S13 fires on insider claims", () => {
    expect(ids("We have insider news from the company board before it is public")).toContain(
      "S13",
    );
  });

  it("S14 fires on a personal UPI ID", () => {
    expect(ids("Send 25000 to rahul1987@okaxis for your allotment")).toContain("S14");
  });

  it("S16 fires on a raw IP link", () => {
    const signal = fired("S16", "Open http://103.21.55.7/login to see your profit");
    expect(signal?.p).toBe(0.5);
  });

  it("S16 fires on a shortener", () => {
    expect(fired("S16", "Register here bit.ly/abcd123")?.p).toBe(0.2);
  });

  it("S17 fires on secrecy", () => {
    expect(ids("Do not tell anyone in your family about this scheme")).toContain("S17");
  });
});

describe("registry signal S15", () => {
  it("fires when the number is not a real format", () => {
    expect(fired("S15", "We are SEBI registered, reg no INH123")?.p).toBe(0.5);
  });

  it("fires weakly when the number is simply not in our snapshot", () => {
    expect(fired("S15", "SEBI Reg No INH000000001 trusted advisory")?.p).toBe(0.3);
  });

  it("does not fire when the registration matches the claimed name", () => {
    expect(
      ids("Gorakhpur Research Analytics, SEBI Reg No INH000111222", {
        claimedName: "Gorakhpur Research Analytics",
      }),
    ).not.toContain("S15");
  });

  it("fires when a suspended record is quoted", () => {
    expect(
      fired("S15", "Rewa Equity Research, SEBI Reg No INH000222333", {
        claimedName: "Rewa Equity Research",
      })?.p,
    ).toBe(0.6);
  });
});

describe("moderate signals", () => {
  it("S20 fires on urgency", () => {
    expect(ids("Hurry, only 2 seats left, offer closes tonight")).toContain("S20");
  });

  it("S21 fires on profit screenshots", () => {
    expect(ids("Dekho aaj ka profit screenshot of our members")).toContain("S21");
  });

  it("S24 fires on a small capital pitch", () => {
    expect(ids("Kam paise me zyada profit, start with just 10k")).toContain("S24");
  });

  it("S25 fires on a trading bot", () => {
    expect(ids("Our crypto arbitrage trading bot never loses")).toContain("S25");
  });

  it("S26 fires on borrowing to invest", () => {
    expect(ids("Take an instant loan to invest and repay from profit")).toContain("S26");
  });

  it("S28 fires on profit sharing", () => {
    expect(ids("We take only a small membership fee and profit sharing")).toContain(
      "S28",
    );
  });
});

describe("positives", () => {
  it("P03 credits a 1600-series service number", () => {
    const result = run("Our service team calls only from 1600 1234 5678");
    expect(result.positives.map((item) => item.id)).toContain("P03");
  });

  it("P04 credits a link on the official list", () => {
    const result = run("The list is on https://www.sebi.gov.in and nowhere else");
    expect(result.positives.map((item) => item.id)).toContain("P04");
  });

  it("P02 credits a registration that really matches", () => {
    const result = run("Gorakhpur Research Analytics, SEBI Reg No INH000111222", {
      claimedName: "Gorakhpur Research Analytics",
    });
    expect(result.positives.map((item) => item.id)).toContain("P02");
  });
});

describe("context boost", () => {
  it("is zero when nothing was asked", () => {
    expect(contextBoost(undefined)).toBe(0);
    expect(contextBoost({})).toBe(0);
  });

  it("adds up the three answers", () => {
    expect(contextBoost({ theyContactedFirst: true })).toBeCloseTo(0.15);
    expect(contextBoost({ askedForMoneyOtpOrApp: true })).toBeCloseTo(0.3);
    expect(contextBoost({ knowsThePerson: false })).toBeCloseTo(0.1);
  });

  it("is capped", () => {
    expect(
      contextBoost({
        theyContactedFirst: true,
        askedForMoneyOtpOrApp: true,
        knowsThePerson: false,
      }),
    ).toBe(0.35);
  });

  it("never counts a skipped question against the message", () => {
    expect(contextBoost({ theyContactedFirst: undefined })).toBe(0);
  });
});

describe("housekeeping", () => {
  it("fires each signal id only once and keeps the strongest", () => {
    const result = run(
      "Guaranteed returns, guaranteed profit, 100% guaranteed, pay to a@okaxis",
    );
    const seen = result.signals.map((signal) => signal.id);
    expect(new Set(seen).size).toBe(seen.length);
  });

  it("sorts signals strongest first", () => {
    const result = run(
      "Hurry! Guaranteed double money, share your OTP and pay to a@okaxis",
    );
    const ps = result.signals.map((signal) => signal.p);
    expect([...ps].sort((a, b) => b - a)).toEqual(ps);
  });

  it("finds nothing in an ordinary message", () => {
    const result = run("Papa, I reached the office. Will call after lunch.");
    expect(result.signals).toHaveLength(0);
  });
});
