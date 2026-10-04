"use client";

/* ============================================================================
   Result. The screen the whole app exists to produce.

   The order is fixed and it is the order a frightened person needs:
     1. the answer      stamp, one sentence, ruler
     2. what to do now  three steps and one filled button
     3. why             numbered ledger entries with the quoted words
     4. what we could not check, then the long tail

   Everything below "why" is collapsed or further down the scroll. A person
   who reads only the top of this page has still been served.
   Section 5.2 of docs/UI_SPEC.md.
   ========================================================================== */

import { useMemo, useState, type ReactNode } from "react";

import {
  Button,
  ButtonLink,
  Disclosure,
  Entry,
  EvidenceQuote,
  InlineLink,
  KeyValue,
  Panel,
  Ruler,
  Stamp,
  Switch,
  Tag,
  type Verdict as StampVerdict,
} from "@/components/ui";
import { Sheet } from "@/components/ui/overlay";
import { AppBar } from "@/components/ui/nav";
import { useSettings } from "@/components/use-settings";
import { OFFICIAL_LINKS } from "@/data/official-links";
import type { Verdict } from "@/lib/engine/check";
import type { Span } from "@/lib/engine/types";
import type { VerdictState } from "@/lib/engine/states";
import { useLastResult } from "@/lib/use-engine";
import { appendLedger, saveFeedback } from "@/lib/storage";
import { useReadAloud } from "@/lib/use-read-aloud";

const STAMP_EN: Record<VerdictState, string> = {
  HIGH_RISK: "HIGH RISK",
  MULTIPLE_RED_FLAGS: "CAUTION",
  SOME_CONCERNS: "LOOK CLOSER",
  NO_STRONG_FLAGS: "NOTHING STRONG FOUND",
  NOT_ENOUGH_TO_GO_ON: "NOT ENOUGH",
};

/* The engine's five states, mapped once onto the design system's five
   verdict tones. Nothing else in the file branches on colour. */
const TONE: Record<VerdictState, StampVerdict> = {
  HIGH_RISK: "HIGH",
  MULTIPLE_RED_FLAGS: "MULTIPLE",
  SOME_CONCERNS: "SOME",
  NO_STRONG_FLAGS: "NONE",
  NOT_ENOUGH_TO_GO_ON: "NOT_ENOUGH",
};

const LEVEL: Record<VerdictState, 0 | 1 | 2 | 3> = {
  NO_STRONG_FLAGS: 0,
  NOT_ENOUGH_TO_GO_ON: 0,
  SOME_CONCERNS: 1,
  MULTIPLE_RED_FLAGS: 2,
  HIGH_RISK: 3,
};

const STEPS: Record<VerdictState, string[]> = {
  HIGH_RISK: ["step.high.1", "step.high.2", "step.high.3"],
  MULTIPLE_RED_FLAGS: ["step.multiple.1", "step.multiple.2", "step.multiple.3"],
  SOME_CONCERNS: ["step.some.1", "step.some.2", "step.some.3"],
  NO_STRONG_FLAGS: ["step.none.1", "step.none.2"],
  NOT_ENOUGH_TO_GO_ON: ["step.notEnough.1"],
};

function linkTo(id: string): string {
  return OFFICIAL_LINKS.find((link) => link.id === id)?.url ?? "/";
}

export default function ResultPage() {
  const { settings, t } = useSettings();
  const last = useLastResult();
  const { speak, stop, speaking, available } = useReadAloud(settings.lang);

  const [showAll, setShowAll] = useState(false);
  const [showMarks, setShowMarks] = useState(false);
  const [familyOpen, setFamilyOpen] = useState(false);
  const [reportOpen, setReportOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!last) {
    return (
      <>
        <AppBar />
        <h1 className="mt-24">{t("result.title")}</h1>
        <p className="t-lead ink-2 mt-8">{t("result.noInput")}</p>
        <div className="mt-20">
          <ButtonLink href="/check" full>
            {t("result.checkAnother")}
          </ButtonLink>
        </div>
      </>
    );
  }

  const { verdict, input } = last;
  const state = verdict.state;
  const tone = TONE[state];
  const steps = STEPS[state];
  const visible = showAll ? verdict.signals : verdict.signals.slice(0, 3);
  const hidden = verdict.signals.length - visible.length;

  function onListen() {
    if (speaking) {
      stop();
      return;
    }
    speak(
      `${t(`state.${state}.line`)} ${steps.map((k) => t(k)).join(" ")}`,
    );
  }

  return (
    <>
      <AppBar onListen={available ? onListen : undefined} />

      {/* 1. The answer. Stamp, one sentence, one ruler, one ledger line. */}
      <section className={`verdict verdict-${tone} mt-20`}>
        <Stamp
          verdict={tone}
          word={t(`state.${state}.stamp`)}
          sub={STAMP_EN[state]}
          announce={`${t(`state.${state}.stamp`)}. ${t(`state.${state}.line`)}`}
        />
        <h1 className="mt-24" style={{ fontSize: "var(--t-h2)" }}>
          {t(`state.${state}.line`)}
        </h1>
        <div className="mt-20">
          <Ruler
            level={LEVEL[state]}
            labels={[
              t("gauge.notch1"),
              t("gauge.notch2"),
              t("gauge.notch3"),
              t("gauge.notch4"),
            ]}
          />
        </div>
        <p className="t-small ink-2 mt-12 num">
          {t("result.ledgerLine", {
            checked: verdict.checkedCount,
            uncheckable: verdict.uncheckableCount,
          })}
        </p>
      </section>

      {/* 2. What to do now. The only filled button on the page. */}
      <Panel className="mt-24">
        <h2 style={{ fontSize: "var(--t-h3)" }}>{t("result.whatNow")}</h2>
        <ol className="mt-16">
          {steps.map((key, i) => (
            <li
              key={key}
              style={{ display: "flex", gap: 12, marginTop: i ? 16 : 0 }}
            >
              <span className="entry-n num" aria-hidden="true">
                {i + 1}
              </span>
              <span className="t-body">{t(key)}</span>
            </li>
          ))}
        </ol>

        <div className="mt-20 stack-12">
          {state === "HIGH_RISK" ? (
            <Button full onClick={() => setFamilyOpen(true)}>
              {t("result.tellFamily")}
            </Button>
          ) : state === "NO_STRONG_FLAGS" ? (
            <ButtonLink href={linkTo("sebi-check")} full external>
              {t("result.openSebiCheck")}
            </ButtonLink>
          ) : (
            <ButtonLink href={linkTo("sebi-intermediaries")} full external>
              {t("result.checkSebi")}
            </ButtonLink>
          )}

          {state === "HIGH_RISK" ? (
            <>
              <Button variant="secondary" full onClick={() => setReportOpen(true)}>
                {t("result.reportWhere")}
              </Button>
              {/* The 1930 button is not here on purpose: it belongs on Madad,
                  where the first thing on the page is the call. */}
              <ButtonLink href="/madad" variant="secondary" full>
                {t("result.sentMoney")}
              </ButtonLink>
            </>
          ) : null}

          {state === "MULTIPLE_RED_FLAGS" ? (
            <>
              <ButtonLink href="/pause/breaker" variant="secondary" full>
                {t("step.multiple.1")}
              </ButtonLink>
              <Button variant="secondary" full onClick={() => setFamilyOpen(true)}>
                {t("result.tellFamily")}
              </Button>
            </>
          ) : null}

          <ButtonLink href="/check" variant="text" full>
            {t("result.checkAnother")}
          </ButtonLink>
        </div>
      </Panel>

      {/* 3. Why. Numbered entries, the words that caused them, the basis. */}
      {verdict.signals.length > 0 ? (
        <section className="mt-32">
          <h2 style={{ fontSize: "var(--t-h3)" }}>{t("result.why")}</h2>

          <div className="mt-8">
            <Switch
              label={t("result.marks")}
              checked={showMarks}
              onToggle={() => setShowMarks((v) => !v)}
              onWord={t("ui.on")}
              offWord={t("ui.off")}
            />
          </div>

          {showMarks ? (
            <div className="note mt-12">
              <p className="t-body">
                <Marked text={input.text} signals={verdict.signals} />
              </p>
            </div>
          ) : null}

          <div className="mt-12">
            {visible.map((signal, i) => (
              <Entry key={signal.id} n={i + 1} title={t(signal.titleKey)}>
                <p className="t-body">{t(signal.whyKey)}</p>
                {signal.evidence.length > 0 ? (
                  <div className="mt-12">
                    <EvidenceQuote tone={tone === "SOME" ? "caution" : "danger"}>
                      {signal.evidence.slice(0, 2).map((span) => (
                        <span key={`${span.start}-${span.end}`} className="mark">
                          {span.text}{" "}
                        </span>
                      ))}
                    </EvidenceQuote>
                  </div>
                ) : null}
                <p className="t-caption ink-2 mt-8">{t(signal.basisKey)}</p>
              </Entry>
            ))}
          </div>

          {hidden > 0 ? (
            <Button variant="text" onClick={() => setShowAll(true)}>
              {t("result.whyMore", { count: hidden })}
            </Button>
          ) : null}
          {showAll && verdict.signals.length > 3 ? (
            <Button variant="text" onClick={() => setShowAll(false)}>
              {t("result.whyLess")}
            </Button>
          ) : null}
        </section>
      ) : null}

      {/* 4. The honest part: what this app could not check at all. */}
      {verdict.unverifiable.length > 0 ? (
        <section className="mt-32">
          <h2 style={{ fontSize: "var(--t-h3)" }}>
            {t("result.couldNotCheck")}
          </h2>
          <ul className="mt-16 stack-16">
            {verdict.unverifiable.map((key) => (
              <li key={key} style={{ display: "flex", gap: 12 }}>
                <span
                  aria-hidden="true"
                  style={{
                    width: 14,
                    height: 14,
                    marginTop: 6,
                    flex: "none",
                    borderRadius: "var(--r-full)",
                    border: "1.5px dashed var(--ink-3)",
                  }}
                />
                <span>
                  <span className="t-body">{t(key)}</span>
                  <span className="tile-desc" style={{ display: "block" }}>
                    {t("result.howToCheck")}: {t(`${key}.how`)}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {verdict.claims.length > 0 ? (
        <section className="mt-32">
          <h2 style={{ fontSize: "var(--t-h3)" }}>{t("result.claims")}</h2>
          <div className="mt-16 stack-12">
            {verdict.claims.map((claim) => (
              <Panel key={claim.id}>
                <p className="note-body">{t(claim.claimKey)}</p>
                <p className="mt-12">
                  <Tag tone="caution">{t(`claim.status.${claim.status}`)}</Tag>
                </p>
                <div className="mt-12">
                  <KeyValue
                    rows={[
                      { k: t("result.claimEvidence"), v: t(claim.evidenceKey) },
                      { k: t("result.claimWhere"), v: t(claim.whereKey) },
                    ]}
                  />
                </div>
              </Panel>
            ))}
          </div>
        </section>
      ) : null}

      {verdict.lens.shown ? (
        <section className="mt-32">
          <h2 style={{ fontSize: "var(--t-h3)" }}>{t("result.lensTitle")}</h2>
          <p className="t-caption ink-2 mt-8">{t("gauge.estimate")}</p>
          <div className="mt-16 stack-20">
            <ThinRuler label={t("result.lensSelling")} value={verdict.lens.selling} />
            <ThinRuler
              label={t("result.lensAssertion")}
              value={verdict.lens.assertion}
            />
          </div>
        </section>
      ) : null}

      {verdict.registry.length > 0 ? (
        <section className="mt-32">
          <h2 style={{ fontSize: "var(--t-h3)" }}>
            {t("result.registration")}
          </h2>
          {verdict.registry.map((lookup) => (
            <Panel key={lookup.regNo} className="mt-16" style={{ padding: 0 }}>
              <KeyValue
                rows={[
                  {
                    k: t("result.regNumber"),
                    v: <span className="mono">{lookup.regNo}</span>,
                  },
                  { k: t("result.regCategory"), v: lookup.category },
                  { k: t("result.regStatus"), v: lookup.status },
                  {
                    k: t("result.regSnapshot"),
                    v: (
                      <span className="num">
                        {lookup.snapshotDate}{" "}
                        {lookup.demo ? <Tag tone="caution">{t("common.demoData")}</Tag> : null}
                      </span>
                    ),
                  },
                ]}
              />
            </Panel>
          ))}
          <div className="mt-16 stack-12">
            <ButtonLink
              href={linkTo("sebi-intermediaries")}
              variant="secondary"
              full
              external
            >
              {t("links.sebiIntermediaries")}
            </ButtonLink>
            <Button
              variant="secondary"
              full
              onClick={() => {
                void navigator.clipboard
                  ?.writeText(verdict.registry[0].regNo)
                  .then(() => setCopied(true))
                  .catch(() => setCopied(false));
              }}
            >
              {copied ? t("result.regCopied") : t("common.copy")}
            </Button>
          </div>
        </section>
      ) : null}

      <div className="mt-32">
        <Disclosure label={t("result.details")}>
          <p className="t-caption ink-2 num mt-8">
            {t("result.engineVersion", {
              version: verdict.engineVersion,
              ruleset: verdict.rulesetDate,
            })}
          </p>
          <p className="t-caption ink-2 num mt-8">
            {verdict.p} · {t("gauge.estimate")}
          </p>
        </Disclosure>
      </div>

      <Feedback verdict={verdict} />

      <p className="t-small mt-20">
        <InlineLink href="/settings/ledger">{t("privacy.onDevice")}</InlineLink>
      </p>

      <FamilySheet
        open={familyOpen}
        onClose={() => setFamilyOpen(false)}
        verdict={verdict}
      />

      <Sheet
        open={reportOpen}
        onClose={() => setReportOpen(false)}
        title={t("report.title")}
        closeLabel={t("common.close")}
      >
        <ul className="stack-16">
          <li className="t-body">{t("report.inApp")}</li>
          <li>
            <InlineLink href={linkTo("cybercrime")} external>
              {t("links.cybercrime")}
            </InlineLink>
          </li>
          <li>
            <InlineLink href="/madad">{t("report.moneyGone")}</InlineLink>
          </li>
        </ul>
      </Sheet>
    </>
  );
}

/* The original message with the matched words highlighted and numbered.
   React nodes only; the message is never put into HTML as a string. */
function Marked({
  text,
  signals,
}: {
  text: string;
  signals: Verdict["signals"];
}) {
  const marks = useMemo(() => {
    const all: (Span & { n: number })[] = [];
    signals.forEach((signal, index) => {
      for (const span of signal.evidence) all.push({ ...span, n: index + 1 });
    });
    all.sort((a, b) => a.start - b.start);
    const kept: (Span & { n: number })[] = [];
    for (const span of all) {
      const last = kept[kept.length - 1];
      if (last && span.start < last.end) continue;
      kept.push(span);
    }
    return kept;
  }, [signals]);

  const out: ReactNode[] = [];
  let at = 0;
  for (const mark of marks) {
    if (mark.start > at) out.push(text.slice(at, mark.start));
    out.push(
      <mark key={`${mark.start}-${mark.end}`} className="mark">
        {text.slice(mark.start, mark.end)}
        <sup className="num">{mark.n}</sup>
      </mark>,
    );
    at = mark.end;
  }
  if (at < text.length) out.push(text.slice(at));
  return <>{out}</>;
}

/* Two labelled ends and a pointer. An estimate, drawn as an estimate. */
function ThinRuler({ label, value }: { label: string; value: number }) {
  return (
    <figure aria-label={`${label}: ${Math.round(value * 100)}%`}>
      <figcaption className="t-small" style={{ fontWeight: 600 }}>
        {label}
      </figcaption>
      <div className="progress mt-8" aria-hidden="true">
        <span className="progress-fill" style={{ width: `${value * 100}%` }} />
      </div>
    </figure>
  );
}

/* A note kept on the phone when the reading felt wrong. Nothing is sent. */
function Feedback({ verdict }: { verdict: Verdict }) {
  const { t } = useSettings();
  const [open, setOpen] = useState(false);
  const [note, setNote] = useState("");
  const [saved, setSaved] = useState(false);

  if (!open) {
    return (
      <p className="t-small mt-20">
        <button
          type="button"
          className="inline-link"
          onClick={() => setOpen(true)}
        >
          {t("result.feedback")}
        </button>
      </p>
    );
  }

  return (
    <Panel className="mt-20">
      <label className="field-label" htmlFor="feedback-note">
        {t("result.feedback")}
      </label>
      <textarea
        id="feedback-note"
        rows={3}
        className="field"
        value={note}
        onChange={(e) => {
          setNote(e.target.value);
          setSaved(false);
        }}
      />
      <div className="mt-16">
        <Button
          variant="secondary"
          full
          onClick={() => {
            void saveFeedback({ at: Date.now(), state: verdict.state, note });
            setSaved(true);
          }}
        >
          {t("common.save")}
        </Button>
      </div>
      {saved ? (
        <p className="t-small ink-2 mt-8" role="status">
          {t("result.feedbackSaved")}
        </p>
      ) : null}
    </Panel>
  );
}

function FamilySheet({
  open,
  onClose,
  verdict,
}: {
  open: boolean;
  onClose: () => void;
  verdict: Verdict;
}) {
  const { t } = useSettings();
  const ids = verdict.signals
    .flatMap((signal) => signal.evidence.map((span) => span.text))
    .slice(0, 2)
    .join(", ");
  const [draft, setDraft] = useState(
    t("family.preview", {
      state: t(`state.${verdict.state}.stamp`),
      ids: ids || "-",
    }),
  );

  /* Every hand-off is written into the ledger before it leaves. */
  function note(what: string) {
    void appendLedger({
      at: Date.now(),
      what,
      fields: ["note"],
      bytes: new TextEncoder().encode(draft).length,
      masked: [],
    });
  }

  return (
    <Sheet
      open={open}
      onClose={onClose}
      title={t("family.title")}
      closeLabel={t("common.close")}
    >
      <label className="field-label" htmlFor="family-message">
        {t("family.title")}
      </label>
      <textarea
        id="family-message"
        rows={5}
        className="field"
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
      />
      <div className="mt-16 stack-12">
        <Button
          full
          onClick={() => {
            note("ledger.what.share");
            if (navigator.share) {
              void navigator.share({ text: draft }).catch(() => undefined);
            } else {
              window.open(
                `https://wa.me/?text=${encodeURIComponent(draft)}`,
                "_blank",
                "noreferrer,noopener",
              );
            }
          }}
        >
          {t("family.send")}
        </Button>
        <ButtonLink
          href={`sms:?body=${encodeURIComponent(draft)}`}
          variant="secondary"
          full
          onClick={() => note("ledger.what.share")}
        >
          {t("family.sms")}
        </ButtonLink>
        <Button
          variant="secondary"
          full
          onClick={() => {
            note("ledger.what.copy");
            void navigator.clipboard?.writeText(draft);
          }}
        >
          {t("common.copy")}
        </Button>
      </div>
      <p className="t-small ink-2 mt-16">{t("family.byYourHand")}</p>
    </Sheet>
  );
}
