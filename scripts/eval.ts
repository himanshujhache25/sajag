/* Runs the engine over eval/corpus.jsonl and eval/golden.json and writes
   docs/EVAL.md. Node only; the engine itself stays pure. */
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

import { check, ENGINE_VERSION, RULESET_DATE } from "../src/lib/engine/check";
import type { VerdictState } from "../src/lib/engine/states";

type Label = "high" | "multiple" | "some" | "none";

type Row = { text: string; lang: string; label: Label; notes: string };

const ROOT = process.cwd();

const STATE_FOR_LABEL: Record<Label, VerdictState> = {
  high: "HIGH_RISK",
  multiple: "MULTIPLE_RED_FLAGS",
  some: "SOME_CONCERNS",
  none: "NO_STRONG_FLAGS",
};

const STATES: VerdictState[] = [
  "NOT_ENOUGH_TO_GO_ON",
  "NO_STRONG_FLAGS",
  "SOME_CONCERNS",
  "MULTIPLE_RED_FLAGS",
  "HIGH_RISK",
];

const RANK: Record<VerdictState, number> = {
  NOT_ENOUGH_TO_GO_ON: 0,
  NO_STRONG_FLAGS: 1,
  SOME_CONCERNS: 2,
  MULTIPLE_RED_FLAGS: 3,
  HIGH_RISK: 4,
};

function readCorpus(): Row[] {
  const raw = readFileSync(join(ROOT, "eval/corpus.jsonl"), "utf8");
  return raw
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0)
    .map((line) => JSON.parse(line) as Row);
}

function pad(value: string, width: number): string {
  return value.padEnd(width, " ");
}

function pct(value: number): string {
  return `${(value * 100).toFixed(1)}%`;
}

function main() {
  const rows = readCorpus();
  const results = rows.map((row) => ({
    row,
    state: check({ text: row.text }).state,
  }));

  /* Confusion matrix: expected label down the side, engine state across. */
  const matrix = new Map<Label, Map<VerdictState, number>>();
  for (const label of Object.keys(STATE_FOR_LABEL) as Label[]) {
    matrix.set(label, new Map(STATES.map((state) => [state, 0])));
  }
  for (const { row, state } of results) {
    const line = matrix.get(row.label);
    if (!line) continue;
    line.set(state, (line.get(state) ?? 0) + 1);
  }

  const header = ["label \\ state", ...STATES.map((s) => s.slice(0, 11)), "n"];
  const widths = header.map((h) => Math.max(h.length, 11));
  const lines: string[] = [];
  lines.push(header.map((h, i) => pad(h, widths[i])).join(" | "));
  lines.push(widths.map((w) => "-".repeat(w)).join("-|-"));
  for (const label of Object.keys(STATE_FOR_LABEL) as Label[]) {
    const line = matrix.get(label);
    if (!line) continue;
    const total = [...line.values()].reduce((a, b) => a + b, 0);
    lines.push(
      [
        pad(label, widths[0]),
        ...STATES.map((state, i) => pad(String(line.get(state) ?? 0), widths[i + 1])),
        pad(String(total), widths[widths.length - 1]),
      ].join(" | "),
    );
  }
  const matrixText = lines.join("\n");

  const alarming = results.filter((r) => ["high", "multiple"].includes(r.row.label));
  const recall =
    alarming.length === 0
      ? 1
      : alarming.filter((r) => RANK[r.state] >= RANK.MULTIPLE_RED_FLAGS).length /
        alarming.length;

  const clean = results.filter((r) => r.row.label === "none");
  const falseAlarmHigh =
    clean.filter((r) => RANK[r.state] >= RANK.MULTIPLE_RED_FLAGS).length /
    Math.max(1, clean.length);
  const falseAlarmSome =
    clean.filter((r) => RANK[r.state] >= RANK.SOME_CONCERNS).length /
    Math.max(1, clean.length);

  const golden = JSON.parse(readFileSync(join(ROOT, "eval/golden.json"), "utf8")) as {
    messages: { id: string; text: string; expectState: VerdictState }[];
  };
  const goldenRows = golden.messages.map((message) => {
    const state = check({ text: message.text }).state;
    return { id: message.id, expected: message.expectState, got: state };
  });
  const goldenPassed = goldenRows.filter((r) => r.expected === r.got).length;

  const misses = results
    .filter((r) => r.state !== STATE_FOR_LABEL[r.row.label])
    .map(
      (r) =>
        `- \`${r.row.label}\` -> \`${r.state}\` (${r.row.lang}): ${r.row.notes} — "${r.row.text.slice(0, 70)}${r.row.text.length > 70 ? "…" : ""}"`,
    );

  const report = `# Evaluation

Run on ${new Date().toISOString().slice(0, 10)} with engine \`${ENGINE_VERSION}\` and ruleset \`${RULESET_DATE}\`.

**This corpus is synthetic and written by the team.** Every message was invented for testing, with fictional handles and \`.example\`, \`.invalid\` or \`.top\` demo domains. The numbers below say whether the rules behave as we intended. They are not field accuracy and should not be read as such.

## Corpus

${rows.length} messages: ${count(rows, "high")} scam-pattern, ${count(rows, "multiple")} multiple-flag, ${count(rows, "some")} borderline, ${count(rows, "none")} clean.

## Confusion matrix

\`\`\`
${matrixText}
\`\`\`

## Targets

| measure | target | result | met |
| --- | --- | --- | --- |
| recall at MULTIPLE_RED_FLAGS or above, on high and multiple | 0.90 or more | ${pct(recall)} | ${recall >= 0.9 ? "yes" : "no"} |
| false alarm at MULTIPLE_RED_FLAGS or above, on clean | 0.05 or less | ${pct(falseAlarmHigh)} | ${falseAlarmHigh <= 0.05 ? "yes" : "no"} |
| false alarm at SOME_CONCERNS or above, on clean | 0.15 or less | ${pct(falseAlarmSome)} | ${falseAlarmSome <= 0.15 ? "yes" : "no"} |

## Golden messages

${goldenPassed} of ${goldenRows.length} match the expected state.

${goldenRows.map((r) => `- ${r.id}: expected \`${r.expected}\`, got \`${r.got}\``).join("\n")}

## Where it disagreed with the label

${misses.length === 0 ? "Nothing." : misses.join("\n")}

## Known limitations

These are understood, not mysteries. They are written here rather than
chased, because narrowing a rule until one corpus row passes is a good way
to make the engine worse on messages nobody has written yet.

- A scam phrase inside a conditional still counts. "If someone promises
  assured profit, that itself is the warning sign" reads as a promise,
  because the engine checks negation and warning frames but does not parse
  clauses. The sentence before it, "Nobody can guarantee returns", is
  correctly ignored. This costs one false alarm on the clean set.
- A warning frame has to open the sentence. A warning that arrives at the
  end, as in "...that itself is the warning sign", is not recognised.
- The corpus is synthetic and written by the team, so every number above is
  indicative. It says the engine behaves as designed on messages we thought
  of. It does not say how it behaves in the field, and the two should never
  be confused.
`;

  writeFileSync(join(ROOT, "docs/EVAL.md"), report, "utf8");

  console.info(matrixText);
  console.info("");
  console.info(`recall (high + multiple):            ${pct(recall)}  target >= 90.0%`);
  console.info(`false alarm at multiple, on clean:   ${pct(falseAlarmHigh)}  target <= 5.0%`);
  console.info(`false alarm at some, on clean:       ${pct(falseAlarmSome)}  target <= 15.0%`);
  console.info(`golden messages matching:            ${goldenPassed}/${goldenRows.length}`);
  console.info("");
  console.info("wrote docs/EVAL.md");

  if (goldenPassed !== goldenRows.length) process.exitCode = 1;
}

function count(rows: Row[], label: Label): number {
  return rows.filter((row) => row.label === label).length;
}

main();
