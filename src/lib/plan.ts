import { wasTransfer, type CaseFile } from "@/lib/case";

/* The plan is built from the person's own answers, in four time boxes, so
   nothing is shown that does not apply to them. Everything here is a key;
   the words live in the language packs. */

export type PlanStep = { key: string; linkId?: string; href?: string };
export type PlanBox = { id: string; titleKey: string; steps: PlanStep[] };

export function buildPlan(file: CaseFile): PlanBox[] {
  const now: PlanStep[] = [
    { key: "plan.now.call1930", href: "tel:1930" },
  ];
  if (wasTransfer(file)) now.push({ key: "plan.now.tellBank" });
  now.push({ key: "plan.now.sendNothingMore" });

  const today: PlanStep[] = [
    { key: "plan.today.portal", linkId: "cybercrime" },
    { key: "plan.today.keepEvidence" },
  ];
  if (file.proof.includes("screenshots")) {
    today.push({ key: "plan.today.screenshotsSafe" });
  }

  const week: PlanStep[] = [];
  /* SCORES only reaches a registered entity. For anyone else, saying so
     plainly saves a month of waiting for a reply that cannot come. */
  week.push({ key: "plan.week.firstTheFirm" });
  week.push({ key: "plan.week.scores", linkId: "scores" });
  week.push({ key: "plan.week.ifUnregistered" });
  if (file.howSent.includes("card")) week.push({ key: "plan.week.card" });
  if (file.proof.includes("app")) week.push({ key: "plan.week.uninstall" });

  const truth: PlanStep[] = [
    { key: "plan.truth.mayNotComeBack" },
    { key: "plan.truth.fasterHelps" },
    { key: "plan.truth.recoveryFeeIsSecondScam" },
    { key: "plan.truth.notYourShame" },
    { key: "plan.truth.teleManas" },
  ];

  return [
    { id: "now", titleKey: "plan.now.title", steps: now },
    { id: "today", titleKey: "plan.today.title", steps: today },
    { id: "week", titleKey: "plan.week.title", steps: week },
    { id: "truth", titleKey: "plan.truth.title", steps: truth },
  ];
}

/* The words the person will say on the phone, with their own facts dropped
   in. Blanks stay as a dash so they can see what is still missing. */
export function buildScript(
  file: CaseFile,
  t: (key: string, vars?: Record<string, string | number>) => string,
): string {
  const blank = "____";
  return t("madad.script.body", {
    name: file.callerName || blank,
    place: file.callerPlace || blank,
    amount: file.amount || blank,
    how: file.howSent.length
      ? file.howSent.map((h) => t(`madad.how.${h}`)).join(", ")
      : blank,
    txn: file.transactionId || blank,
    toWhom: file.toWhom || blank,
  });
}

/* The cybercrime portal asks for these fields. We list them rather than
   pretending to submit anything on the person's behalf. */
export const PORTAL_FIELDS = [
  "draft.portal.category",
  "draft.portal.when",
  "draft.portal.amount",
  "draft.portal.how",
  "draft.portal.toWhom",
  "draft.portal.txn",
  "draft.portal.contact",
  "draft.portal.evidence",
] as const;

export function buildScoresDraft(
  file: CaseFile,
  t: (key: string, vars?: Record<string, string | number>) => string,
): string {
  const blank = "____";
  const chronology = file.timeline.length
    ? file.timeline.map((row) => `${row.when} — ${row.what}`).join("\n")
    : t("draft.scores.noChronology");
  return t("draft.scores.body", {
    amount: file.amount || blank,
    toWhom: file.toWhom || blank,
    txn: file.transactionId || blank,
    chronology,
    promised: file.promised.length
      ? file.promised.map((p) => t(`madad.promised.${p}`)).join(", ")
      : blank,
    evidence: file.proof.length
      ? file.proof.map((p) => t(`madad.proof.${p}`)).join(", ")
      : blank,
  });
}
