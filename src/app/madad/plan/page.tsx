"use client";

import { useEffect, useState } from "react";

import {
  Button,
  ButtonLink,
  CheckRow,
  InlineLink,
  Panel,
  SectionLabel,
  TextArea,
  TextField,
} from "@/components/ui";
import { AppBar } from "@/components/ui/nav";
import {
  PhoneIcon,
  PrinterIcon,
  SpeakerIcon,
  LockIcon,
} from "@/components/icons";
import { useSettings } from "@/components/use-settings";
import { linkById } from "@/data/official-links";
import {
  readCase,
  writeCase,
  type CaseFile,
  type TimelineRow,
} from "@/lib/case";
import { buildIcs, downloadIcs } from "@/lib/ics";
import {
  buildPlan,
  buildScoresDraft,
  buildScript,
  PORTAL_FIELDS,
} from "@/lib/plan";
import { appendLedger } from "@/lib/storage";
import { useReadAloud } from "@/lib/use-read-aloud";

const DONE_STEPS = ["called", "portal", "bank", "firm", "scores"] as const;

export default function PlanPage() {
  const { settings, t } = useSettings();
  const { speak, stop, speaking, available } = useReadAloud(settings.lang);
  const [file, setFile] = useState<CaseFile | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    void readCase().then(setFile);
  }, []);

  function patch(change: Partial<CaseFile>) {
    setFile((current) => {
      if (!current) return current;
      const next = { ...current, ...change };
      void writeCase(next);
      return next;
    });
  }

  if (!file) {
    return (
      <>
        <AppBar />
        <h1>{t("plan.title")}</h1>
      </>
    );
  }

  const boxes = buildPlan(file);
  const script = buildScript(file, t);
  const scores = buildScoresDraft(file, t);

  return (
    <div className="plan">
      <div className="no-print">
        <AppBar />
      </div>

      <h1>{t("plan.title")}</h1>
      <p className="t-lead ink-2 mt-8">{t("plan.sub")}</p>

      <div className="mt-20 no-print">
        <ButtonLink href="tel:1930" variant="emergency" full>
          <PhoneIcon width={26} height={26} aria-hidden="true" />
          {t("madad.call1930")}
        </ButtonLink>
      </div>

      <section className="mt-32">
        <SectionLabel>{t("madad.script.title")}</SectionLabel>
        <div className="field-pair">
          <TextField
            label={t("madad.script.nameLabel")}
            autoComplete="off"
            value={file.callerName}
            onChange={(e) => patch({ callerName: e.target.value })}
          />
          <TextField
            label={t("madad.script.placeLabel")}
            autoComplete="off"
            value={file.callerPlace}
            onChange={(e) => patch({ callerPlace: e.target.value })}
          />
        </div>

        <p id="script-card" className="script-card mt-20">
          {script}
        </p>

        <div className="wizard-nav mt-16 no-print">
          {available ? (
            <Button
              variant="secondary"
              onClick={() => (speaking ? stop() : speak(script))}
            >
              <SpeakerIcon width={20} height={20} aria-hidden="true" />
              {speaking ? t("common.stop") : t("common.listen")}
            </Button>
          ) : (
            <span />
          )}
          <CopyButton text={script} t={t} />
        </div>
      </section>

      <div className="time-boxes mt-32">
        {boxes.map((box) => (
          <section key={box.id} className="time-box">
            <h2 className="time-box-head">{t(box.titleKey)}</h2>
            <ol className="stack-12 mt-12">
              {box.steps.map((step, i) => {
                const link = step.linkId ? linkById(step.linkId) : undefined;
                return (
                  <li key={step.key} className="plan-step">
                    <span className="entry-n" aria-hidden="true">
                      {i + 1}
                    </span>
                    <span>
                      {t(step.key)}
                      {link ? (
                        <>
                          {" "}
                          <InlineLink href={link.url} external>
                            {link.url}
                          </InlineLink>
                        </>
                      ) : null}
                    </span>
                  </li>
                );
              })}
            </ol>
          </section>
        ))}
      </div>

      <section className="mt-32">
        <SectionLabel>{t("plan.timeline")}</SectionLabel>
        <Timeline
          rows={file.timeline}
          onChange={(timeline) => patch({ timeline })}
          t={t}
        />
      </section>

      <section className="mt-32">
        <SectionLabel>{t("plan.drafts")}</SectionLabel>
        <Panel sunken>
          <h3 className="t-body">{t("plan.portalFields")}</h3>
          <ul className="stack-8 mt-12">
            {PORTAL_FIELDS.map((key) => (
              <li key={key} className="plan-bullet">
                <span className="bullet-dot" aria-hidden="true" />
                <span className="t-small">{t(key)}</span>
              </li>
            ))}
          </ul>
        </Panel>

        <h3 className="t-body mt-24">{t("plan.scoresDraft")}</h3>
        <pre className="draft-block mt-12">{scores}</pre>
        <div className="mt-16 no-print">
          <CopyButton text={scores} t={t} />
        </div>
      </section>

      <section className="mt-32">
        <SectionLabel>{t("plan.myCase")}</SectionLabel>
        <TextField
          label={t("plan.ackLabel")}
          className="num"
          autoComplete="off"
          value={file.ackNumber}
          onChange={(e) => patch({ ackNumber: e.target.value })}
        />
        <ul className="stack-8 mt-20">
          {DONE_STEPS.map((id) => (
            <li key={id}>
              <CheckRow
                checked={file.done.includes(id)}
                onToggle={() =>
                  patch({
                    done: file.done.includes(id)
                      ? file.done.filter((d) => d !== id)
                      : [...file.done, id],
                  })
                }
                label={t(`plan.done.${id}`)}
              />
            </li>
          ))}
        </ul>
        <div className="mt-20 no-print">
          <Button
            variant="secondary"
            onClick={() => {
              const start = new Date(Date.now() + 21 * 86_400_000);
              start.setHours(10, 0, 0, 0);
              downloadIcs(
                "sajag-scores.ics",
                buildIcs({
                  uid: `sajag-scores-${file.startedAt}`,
                  start,
                  title: t("plan.reminderTitle"),
                  note: t("plan.reminderNote"),
                }),
              );
            }}
          >
            {t("plan.reminder")}
          </Button>
        </div>
      </section>

      <div className="stack-12 mt-32 no-print">
        <Button full onClick={() => window.print()}>
          <PrinterIcon width={22} height={22} aria-hidden="true" />
          {t("plan.print")}
        </Button>
        <div className="wizard-nav">
          <ButtonLink
            href={`https://wa.me/?text=${encodeURIComponent(script)}`}
            variant="secondary"
            external
            onClick={() => {
              void appendLedger({
                at: Date.now(),
                what: "ledger.what.share",
                fields: ["plan"],
                bytes: new TextEncoder().encode(script).length,
                masked: [],
              });
            }}
          >
            {t("plan.sendSelf")}
          </ButtonLink>
          <Button
            variant="secondary"
            onClick={() => {
              void navigator.clipboard
                ?.writeText(`${script}\n\n${scores}`)
                .then(() => setCopied(true))
                .catch(() => setCopied(false));
            }}
          >
            {copied ? t("draft.copied") : t("common.copy")}
          </Button>
        </div>
      </div>

      <p className="privacy-line mt-24">
        <LockIcon width={18} height={18} aria-hidden="true" />
        {t("privacy.onDevice")}
      </p>
    </div>
  );
}

function CopyButton({ text, t }: { text: string; t: (key: string) => string }) {
  const [done, setDone] = useState(false);
  return (
    <Button
      variant="secondary"
      onClick={() => {
        void navigator.clipboard
          ?.writeText(text)
          .then(() => setDone(true))
          .catch(() => setDone(false));
      }}
    >
      {done ? t("draft.copied") : t("draft.copy")}
    </Button>
  );
}

function Timeline({
  rows,
  onChange,
  t,
}: {
  rows: TimelineRow[];
  onChange: (rows: TimelineRow[]) => void;
  t: (key: string) => string;
}) {
  return (
    <>
      <ul className="stack-16">
        {rows.map((row) => (
          <li key={row.id} className="timeline-row">
            <TextField
              label={t("plan.timelineWhen")}
              className="num"
              placeholder={t("plan.timelineWhen")}
              value={row.when}
              onChange={(e) =>
                onChange(
                  rows.map((r) =>
                    r.id === row.id ? { ...r, when: e.target.value } : r,
                  ),
                )
              }
            />
            <div className="mt-12">
              <TextArea
                rows={2}
                label={t("plan.timelineWhat")}
                placeholder={t("plan.timelineWhat")}
                value={row.what}
                onChange={(e) =>
                  onChange(
                    rows.map((r) =>
                      r.id === row.id ? { ...r, what: e.target.value } : r,
                    ),
                  )
                }
              />
            </div>
            <div className="mt-12 no-print">
              <Button
                variant="text"
                size="md"
                onClick={() => onChange(rows.filter((r) => r.id !== row.id))}
              >
                {t("plan.timelineRemove")}
              </Button>
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-16 no-print">
        <Button
          variant="secondary"
          onClick={() =>
            onChange([...rows, { id: `${Date.now()}`, when: "", what: "" }])
          }
        >
          {t("plan.timelineAdd")}
        </Button>
      </div>
    </>
  );
}
