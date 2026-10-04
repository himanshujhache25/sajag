import { normalise } from "../src/lib/engine/normalise";
import { findHits } from "../src/lib/engine/lexicon/match";
import { check } from "../src/lib/engine/check";

const texts = process.argv.slice(2);
for (const text of texts) {
  const n = normalise(text);
  console.info(JSON.stringify(text));
  console.info("  lang:", n.language, "warning:", n.warningContext);
  console.info(
    "  hits:",
    findHits(n)
      .map((h) => `${h.concept}(${h.lang}${h.negated ? ",neg" : ""}${h.inWarningFrame ? ",warn" : ""}):${h.text}`)
      .join(" | ") || "none",
  );
  const v = check({ text });
  console.info("  state:", v.state, "p:", v.p, "signals:", v.signals.map((s) => s.id).join(","));
}
