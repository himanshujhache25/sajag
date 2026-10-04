import { describe, expect, it } from "vitest";
import { extract } from "./extract";
import { normalise } from "./normalise";

function run(text: string) {
  return extract(normalise(text));
}

function types(text: string, type: string) {
  return run(text).entities.filter((e) => e.type === type);
}

describe("extract", () => {
  describe("links", () => {
    it("finds a url and its registrable domain", () => {
      const [url] = types("open https://demo-broker-vip.top/join now", "url");
      expect(url.domain).toBe("demo-broker-vip.top");
      expect(url.tld).toBe("top");
    });

    it("finds a bare domain", () => {
      const [d] = types("go to sebi.gov.in for the list", "domain");
      expect(d.value).toBe("sebi.gov.in");
    });

    it("quotes the link as the person saw it", () => {
      const text = "Open https://DEMO-broker.example and pay";
      const [url] = types(text, "url");
      expect(text.slice(url.start, url.end)).toBe("https://DEMO-broker.example");
    });
  });

  describe("phones", () => {
    it("reads a 1600 series service number", () => {
      const [p] = types("for queries call 16001234567", "phone");
      expect(p.phoneKind).toBe("series-1600");
    });

    it("reads a toll free number", () => {
      expect(types("call 18001234567", "phone")[0].phoneKind).toBe(
        "toll-free-1800",
      );
    });

    it("reads a mobile number and writes it in +91 form", () => {
      const [p] = types("whatsapp 98765 43210", "phone");
      expect(p.phoneKind).toBe("mobile");
      expect(p.value).toBe("+919876543210");
    });

    it("keeps an already prefixed number as one entity", () => {
      expect(types("call +91 98765 43210", "phone")).toHaveLength(1);
    });
  });

  describe("upi", () => {
    it("finds a plain UPI id", () => {
      const [u] = types("pay to rajesh.trade@okaxis today", "upi");
      expect(u.upiPsp).toBe("okaxis");
      expect(u.upiValid).toBe(false);
    });

    it("recognises a @valid handle and its category", () => {
      const [u] = types("pay demobroker.brk@valid for the order", "upi");
      expect(u.upiValid).toBe(true);
      expect(u.upiCategory).toBe("brk");
    });

    it("does not read an email address as a UPI id", () => {
      expect(types("write to person@example.com", "upi")).toHaveLength(0);
    });
  });

  describe("chat handles", () => {
    it("finds a whatsapp invite", () => {
      expect(
        types("join https://chat.whatsapp.com/DEMOcode123", "whatsapp-invite"),
      ).toHaveLength(1);
    });

    it("finds a wa.me link", () => {
      expect(types("message https://wa.me/919876543210", "whatsapp-invite"))
        .toHaveLength(1);
    });

    it("finds a telegram handle in a telegram context", () => {
      expect(
        types("contact on Telegram @sebi_recovery_officer", "telegram"),
      ).toHaveLength(1);
    });

    it("finds a t.me link", () => {
      expect(types("join t.me/demochannel", "telegram")).toHaveLength(1);
    });
  });

  describe("registration numbers", () => {
    it("finds a SEBI registration number", () => {
      const [r] = types("SEBI registered analyst INH000999999", "sebi-reg");
      expect(r.value).toBe("INH000999999");
    });

    it("finds a depository participant number", () => {
      expect(types("IN-DP-123-2020 is our number", "sebi-reg")[0].value).toBe(
        "IN-DP-123-2020",
      );
    });

    it("finds an AMFI number separately", () => {
      expect(types("distributor ARN-12345", "amfi-arn")).toHaveLength(1);
      expect(types("distributor ARN-12345", "sebi-reg")).toHaveLength(0);
    });
  });

  describe("claimed entity", () => {
    it("reads a name before a company word", () => {
      const [e] = types("Demo Capital Advisors will help you", "claimed-entity");
      expect(e.value.toLowerCase()).toContain("demo capital advisors");
    });

    it("reads a name after a registration claim", () => {
      const [e] = types(
        "registered with SEBI as Satna Wealth Research",
        "claimed-entity",
      );
      expect(e.value.toLowerCase()).toContain("satna wealth research");
    });
  });

  describe("amounts and percentages", () => {
    it("reads an amount with Indian grouping", () => {
      expect(types("pay Rs 4,20,000 now", "amount")[0].amount).toBe(420000);
    });

    it("reads lakh and crore", () => {
      expect(types("invest 5 lakh", "amount")[0].amount).toBe(500000);
      expect(types("returns of 1.5 crore", "amount")[0].amount).toBe(15000000);
    });

    it("reads a percentage with its period", () => {
      const [p] = types("daily 5% guaranteed profit", "percent");
      expect(p.percent).toBe(5);
      expect(p.percentPeriod).toBe("day");
    });

    it("reads a weekly percentage", () => {
      expect(types("20% weekly returns", "percent")[0].percentPeriod).toBe(
        "week",
      );
    });

    it("reads 'in N days'", () => {
      const [p] = types("50% in 15 days", "percent");
      expect(p.percentPeriod).toBe("days");
      expect(p.percentDays).toBe(15);
    });

    it("reads the Hindi form", () => {
      const [p] = types("15 दिन में 50% मुनाफा", "percent");
      expect(p.percentPeriod).toBe("days");
      expect(p.percentDays).toBe(15);
    });
  });

  describe("app mentions", () => {
    it("finds remote access tools", () => {
      expect(types("install AnyDesk now", "app-mention")).toHaveLength(1);
      expect(types("use TeamViewer", "app-mention")).toHaveLength(1);
    });

    it("finds an apk link", () => {
      expect(types("download trading.apk", "app-mention")).toHaveLength(1);
    });
  });

  describe("tip format", () => {
    it("sees the form of a tip without keeping the name", () => {
      const out = run("Buy ABCSTEEL above 120, target 150, stoploss 110");
      expect(out.tipFormat).toBe(true);
      expect(JSON.stringify(out)).not.toContain("ABCSTEEL");
    });

    it("sees the Hindi form of a tip", () => {
      expect(run("कल खरीदें, टारगेट 150, स्टॉपलॉस 110").tipFormat).toBe(true);
    });

    it("does not call ordinary text a tip", () => {
      expect(run("Buy vegetables from the market today").tipFormat).toBe(false);
    });
  });
});
