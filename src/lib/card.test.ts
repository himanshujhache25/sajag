import { describe, expect, it } from "vitest";
import { CARD_H, CARD_W, wrapText } from "./card";

/* A fake measurer: every character is ten units wide. That is enough to test
   the wrapping decisions without a canvas anywhere near this file. */
const measure = (s: string) => s.length * 10;

describe("wrapText", () => {
  it("leaves a short line alone", () => {
    expect(wrapText(measure, "one two", 200)).toEqual(["one two"]);
  });

  it("breaks at the last word that fits", () => {
    expect(wrapText(measure, "aaa bbb ccc ddd", 70)).toEqual([
      "aaa bbb",
      "ccc ddd",
    ]);
  });

  it("never cuts a word in half, even one too long for the line", () => {
    /* A UPI id or a URL has to stay readable, overhang or not. */
    const long = "someone@verylongbankhandle";
    expect(wrapText(measure, `pay ${long} now`, 60)).toEqual([
      "pay",
      long,
      "now",
    ]);
  });

  it("squeezes runs of spaces and newlines", () => {
    expect(wrapText(measure, "  one   two  ", 200)).toEqual(["one two"]);
  });

  it("gives nothing back for nothing", () => {
    expect(wrapText(measure, "   ", 200)).toEqual([]);
  });

  it("wraps Hindi the same way, on spaces", () => {
    const hi = "पक्के मुनाफे की गारंटी देना";
    expect(wrapText(measure, hi, 100).length).toBeGreaterThan(1);
    expect(wrapText(measure, hi, 10_000)).toEqual([hi]);
  });
});

describe("the card's shape", () => {
  it("is the 1080 by 1350 the brief asks for", () => {
    expect(CARD_W).toBe(1080);
    expect(CARD_H).toBe(1350);
  });
});
