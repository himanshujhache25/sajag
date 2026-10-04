import { describe, expect, it } from "vitest";

import { buildIcs } from "./ics";

const ics = buildIcs({
  uid: "sajag-1",
  start: new Date(Date.UTC(2026, 9, 23, 4, 30)),
  title: "SCORES: 21 दिन पूरे",
  note: "शिकायत, तारीख: 2 अक्टूबर; रकम ₹5,000",
});

describe("buildIcs", () => {
  it("opens and closes a calendar with one event", () => {
    expect(ics.startsWith("BEGIN:VCALENDAR")).toBe(true);
    expect(ics.trimEnd().endsWith("END:VCALENDAR")).toBe(true);
    expect(ics.match(/BEGIN:VEVENT/g)).toHaveLength(1);
  });

  it("writes the start and end in UTC basic form", () => {
    expect(ics).toContain("DTSTART:20261023T043000Z");
    expect(ics).toContain("DTEND:20261023T050000Z");
  });

  it("escapes commas and semicolons, which Android calendars insist on", () => {
    expect(ics).toContain("\\;");
    expect(ics).toContain("\\,");
  });

  it("uses CRLF line endings", () => {
    expect(ics.includes("\r\n")).toBe(true);
  });

  it("folds a long line so no line is over 75 octets", () => {
    const long = buildIcs({
      uid: "x",
      start: new Date(0),
      title: "क".repeat(200),
      note: "n",
    });
    for (const line of long.split("\r\n")) {
      expect(line.length).toBeLessThanOrEqual(75);
    }
  });
});
