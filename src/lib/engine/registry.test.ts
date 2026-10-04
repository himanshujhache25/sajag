import { describe, expect, it } from "vitest";

import { check } from "./check";
import {
  categoryOf,
  demoRegistry,
  isValidRegNoFormat,
  lookupRegistration,
  nameSimilarity,
} from "./registry";

const NOW = new Date("2026-10-05T00:00:00Z");
const FRESH = new Date("2026-10-10T00:00:00Z");

describe("categoryOf", () => {
  it("maps the verified prefixes", () => {
    expect(categoryOf("INZ000555666").category).toBe("INZ");
    expect(categoryOf("INH000111222").category).toBe("INH");
    expect(categoryOf("INA000333444").category).toBe("INA");
    expect(categoryOf("INP000777888").category).toBe("INP");
    expect(categoryOf("INM000999000").category).toBe("INM");
    expect(categoryOf("IN-DP-321-2019").category).toBe("IN-DP");
  });

  it("refuses to name a category for the unverified prefixes", () => {
    for (const regNo of ["INB000111222", "INF000111222", "INR000111222"]) {
      const result = categoryOf(regNo);
      expect(result.category).toBe("UNKNOWN");
      expect(result.unverified).toBe(true);
    }
  });
});

describe("isValidRegNoFormat", () => {
  it("accepts well formed numbers", () => {
    expect(isValidRegNoFormat("INH000111222")).toBe(true);
    expect(isValidRegNoFormat("in-dp-321-2019")).toBe(true);
  });

  it("rejects short, long or junk numbers", () => {
    expect(isValidRegNoFormat("INH00011")).toBe(false);
    expect(isValidRegNoFormat("INH0001112223")).toBe(false);
    expect(isValidRegNoFormat("SEBI123")).toBe(false);
  });
});

describe("nameSimilarity", () => {
  it("ignores pvt, ltd, llp and punctuation", () => {
    expect(
      nameSimilarity("Satna Wealth Advisers", "Satna Wealth Advisers Pvt. Ltd."),
    ).toBe(1);
  });

  it("scores an unrelated name low", () => {
    expect(
      nameSimilarity("Quick Profit Club", "Gorakhpur Research Analytics"),
    ).toBeLessThan(0.5);
  });
});

describe("lookupRegistration", () => {
  it("flags an invalid format before looking anything up", () => {
    const result = lookupRegistration("INH123", { now: FRESH });
    expect(result.status).toBe("FORMAT_INVALID");
  });

  it("says NOT_IN_SNAPSHOT when we simply cannot tell", () => {
    const result = lookupRegistration("INH000000001", { now: FRESH });
    expect(result.status).toBe("NOT_IN_SNAPSHOT");
    expect(result.entity).toBeUndefined();
  });

  it("matches a name that is really the same firm", () => {
    const result = lookupRegistration("INH000111222", {
      claimedName: "Gorakhpur Research Analytics Pvt Ltd",
      now: FRESH,
    });
    expect(result.status).toBe("FOUND_NAME_MATCH");
    expect(result.entity?.city).toBe("Gorakhpur");
  });

  it("marks a different name as differing", () => {
    const result = lookupRegistration("INH000111222", {
      claimedName: "Mumbai Profit Kings",
      now: FRESH,
    });
    expect(result.status).toBe("FOUND_NAME_DIFFERS");
  });

  it("catches a broker giving tips as a category mismatch", () => {
    const result = lookupRegistration("INZ000555666", {
      claimedName: "Jhansi Broking Services Limited",
      givesAdvice: true,
      now: FRESH,
    });
    expect(result.status).toBe("FOUND_CATEGORY_MISMATCH");
  });

  it("allows a research analyst to give tips", () => {
    const result = lookupRegistration("INH000111222", {
      claimedName: "Gorakhpur Research Analytics",
      givesAdvice: true,
      now: FRESH,
    });
    expect(result.status).toBe("FOUND_NAME_MATCH");
  });

  it("reports suspended and expired records", () => {
    expect(
      lookupRegistration("INH000222333", { claimedName: "Rewa Equity Research", now: NOW })
        .status,
    ).toBe("EXPIRED_OR_SUSPENDED");
    expect(
      lookupRegistration("INA000444555", {
        claimedName: "Mirzapur Investment Advisers",
        now: NOW,
      }).status,
    ).toBe("EXPIRED_OR_SUSPENDED");
  });

  it("treats a lapsed validTill as expired even if the row says registered", () => {
    const result = lookupRegistration("INH000111222", {
      claimedName: "Gorakhpur Research Analytics",
      now: new Date("2029-01-01T00:00:00Z"),
    });
    expect(result.status).toBe("EXPIRED_OR_SUSPENDED");
  });

  it("notes a stale snapshot without changing the status", () => {
    const stale = lookupRegistration("INH000111222", {
      claimedName: "Gorakhpur Research Analytics",
      now: new Date("2026-12-25T00:00:00Z"),
    });
    expect(stale.snapshotStale).toBe(true);
    expect(stale.status).toBe("FOUND_NAME_MATCH");
  });

  it("carries the demo flag so the UI can say so", () => {
    expect(lookupRegistration("INH000111222", { now: FRESH }).demo).toBe(true);
  });
});

describe("the demo snapshot", () => {
  it("has thirty fictional entities", () => {
    expect(demoRegistry.entities).toHaveLength(30);
    expect(demoRegistry.entities.every((entity) => entity.demo === true)).toBe(true);
  });

  it("covers every status the UI has to render", () => {
    const statuses = new Set(demoRegistry.entities.map((entity) => entity.status));
    expect(statuses).toEqual(new Set(["registered", "suspended", "expired"]));
  });

  it("covers every verified category", () => {
    const categories = new Set(demoRegistry.entities.map((entity) => entity.category));
    for (const category of ["INZ", "INH", "INA", "INP", "INM", "IN-DP"]) {
      expect(categories).toContain(category);
    }
  });

  /* The refusal above used to stop inside the engine: `categoryUnverified`
     was set, and nothing anywhere read it. Checking the flag is not enough,
     because the flag was always right — what was missing was anyone saying
     it out loud. This asserts the person is actually told. */
  it("tells the person when it cannot name the category", () => {
    const result = check({
      text: "Our SEBI registered analyst INB000111222 will guide you.",
    });
    expect(result.unverifiable).toContain("unverifiable.registrationCategory");
  });

  it("stays quiet about the category when it can name one", () => {
    const result = check({
      text: "Our SEBI registered analyst INH000111222 will guide you.",
    });
    expect(result.unverifiable).not.toContain(
      "unverifiable.registrationCategory",
    );
  });
});
