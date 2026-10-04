"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { Blank, Button, CheckRow, Disclosure, Panel } from "@/components/ui";
import { AppBar } from "@/components/ui/nav";
import { PrinterIcon } from "@/components/icons";
import { useSettings } from "@/components/use-settings";
import {
  PACT_LINE_IDS,
  readPact,
  writePact,
  type Pact,
  type PactLineId,
} from "@/lib/pact";

const HOLD_MS = 1500;

export default function PactPage() {
  const { settings, t } = useSettings();
  const [pact, setPact] = useState<Pact | null>(null);
  const [agreed, setAgreed] = useState(false);

  const texts = useCallback((): Record<PactLineId, string> => {
    const out = {} as Record<PactLineId, string>;
    for (const id of PACT_LINE_IDS) out[id] = t(`pact.line.${id}`);
    return out;
  }, [t]);

  useEffect(() => {
    void readPact(texts()).then(setPact);
  }, [texts]);

  function patch(change: Partial<Pact>) {
    setPact((current) => {
      if (!current) return current;
      const next = { ...current, ...change };
      void writePact(next);
      return next;
    });
  }

  if (!pact) {
    return (
      <>
        <AppBar />
        <h1>{t("pact.title")}</h1>
      </>
    );
  }

  const date = pact.signedAt
    ? new Intl.DateTimeFormat(settings.lang === "en" ? "en-IN" : "hi-IN", {
        dateStyle: "long",
      }).format(pact.signedAt)
    : "";

  return (
    <div className="pact-sheet">
      <div className="no-print">
        <AppBar />
      </div>

      <h1>{t("pact.title")}</h1>
      <p className="t-lead ink-2 mt-8">{t("pact.sub")}</p>

      <ol className="stack-8 mt-24">
        {pact.lines.map((line, index) => (
          <li key={line.id} className="pact-line">
            <span className="num ink-2 pact-n">{index + 1}.</span>
            <CheckRow
              checked={line.kept}
              onToggle={() =>
                patch({
                  lines: pact.lines.map((l) =>
                    l.id === line.id ? { ...l, kept: !l.kept } : l,
                  ),
                })
              }
              label={<span className="t-serif t-lead">{line.text}</span>}
            />
          </li>
        ))}
      </ol>

      <div className="stack-16 mt-32">
        <p className="t-serif t-lead pact-blank-line">
          {t("pact.askAbove")}{" "}
          <Blank
            label={t("pact.askAbove")}
            value={pact.askAbove}
            onValueChange={(askAbove) => patch({ askAbove })}
          />
        </p>
        <p className="t-serif t-lead pact-blank-line">
          {t("pact.askWhom")}{" "}
          <Blank
            label={t("pact.askWhom")}
            value={pact.askWhom}
            size={12}
            onValueChange={(askWhom) => patch({ askWhom })}
          />
        </p>
        <p className="t-serif t-lead pact-blank-line">
          {t("pact.lossLimit")}{" "}
          <Blank
            label={t("pact.lossLimit")}
            value={pact.monthlyLossLimit}
            onValueChange={(monthlyLossLimit) => patch({ monthlyLossLimit })}
          />
        </p>
      </div>

      {pact.signedAt ? (
        <Panel className="mt-32 pact-signed">
          <p className="num t-small ink-2">{t("pact.signedOn", { date })}</p>
          <p className="t-small mt-8">{t("pact.notAdvice")}</p>
          <div className="wizard-nav mt-20 no-print">
            <Button
              variant="secondary"
              onClick={() => patch({ signedAt: null })}
            >
              {t("pact.edit")}
            </Button>
            <Button variant="secondary" onClick={() => window.print()}>
              <PrinterIcon width={20} height={20} aria-hidden="true" />
              {t("pact.print")}
            </Button>
          </div>
        </Panel>
      ) : (
        <div className="mt-32 no-print">
          <HoldToSign
            label={t("pact.hold")}
            holding={t("pact.holding")}
            onDone={() => patch({ signedAt: Date.now() })}
          />
          <div className="mt-16">
            <Disclosure label={t("pact.cannotHold")}>
              <CheckRow
                checked={agreed}
                onToggle={() => setAgreed(!agreed)}
                label={t("pact.agree")}
              />
              <div className="mt-16">
                <Button
                  disabled={!agreed}
                  onClick={() => patch({ signedAt: Date.now() })}
                >
                  {t("pact.sign")}
                </Button>
              </div>
            </Disclosure>
          </div>
          <p className="t-small ink-2 mt-20">{t("pact.notAdvice")}</p>
        </div>
      )}
    </div>
  );
}

function HoldToSign({
  label,
  holding,
  onDone,
}: {
  label: string;
  holding: string;
  onDone: () => void;
}) {
  const [progress, setProgress] = useState(0);
  const started = useRef<number | null>(null);
  const frame = useRef<number | null>(null);

  const stop = useCallback(() => {
    started.current = null;
    if (frame.current !== null) cancelAnimationFrame(frame.current);
    frame.current = null;
    setProgress(0);
  }, []);

  useEffect(() => stop, [stop]);

  function begin() {
    started.current = Date.now();
    const tick = () => {
      if (started.current === null) return;
      const done = (Date.now() - started.current) / HOLD_MS;
      if (done >= 1) {
        stop();
        onDone();
        return;
      }
      setProgress(done);
      frame.current = requestAnimationFrame(tick);
    };
    frame.current = requestAnimationFrame(tick);
  }

  return (
    <button
      type="button"
      onPointerDown={begin}
      onPointerUp={stop}
      onPointerLeave={stop}
      onPointerCancel={stop}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") onDone();
      }}
      aria-label={label}
      className="hold-sign"
    >
      <span
        aria-hidden="true"
        className="hold-fill"
        style={{ height: `${Math.round(progress * 100)}%` }}
      />
      <span className="hold-text">{progress > 0 ? holding : label}</span>
    </button>
  );
}
