"use client";

import { useCallback, useEffect, useState } from "react";

import {
  Button,
  ButtonLink,
  InlineLink,
  OptionRow,
  Panel,
  ProgressRuler,
  SectionLabel,
  Stamp,
  TextArea,
} from "@/components/ui";
import { AppBar, StickyActionBar } from "@/components/ui/nav";
import { useSettings } from "@/components/use-settings";
import { FACTS } from "@/data/facts";
import { addEntry } from "@/lib/journal";
import {
  PACT_LINE_IDS,
  keptLines,
  readPact,
  type Pact,
  type PactLineId,
} from "@/lib/pact";

const WHYS = ["loss", "tip", "fomo", "rushed", "borrowed", "curious"] as const;
type Why = (typeof WHYS)[number];

const PAUSE_SECONDS = 60;
const SKIP_AFTER = 10;
const TOTAL = 6;

export default function BreakerPage() {
  const { t } = useSettings();
  const [step, setStep] = useState(1);
  const [why, setWhy] = useState<Why | null>(null);
  const [pact, setPact] = useState<Pact | null>(null);
  const [reason, setReason] = useState("");
  const [closed, setClosed] = useState<"wait" | "goOn" | null>(null);

  const texts = useCallback((): Record<PactLineId, string> => {
    const out = {} as Record<PactLineId, string>;
    for (const id of PACT_LINE_IDS) out[id] = t(`pact.line.${id}`);
    return out;
  }, [t]);

  useEffect(() => {
    void readPact(texts()).then(setPact);
  }, [texts]);

  async function save(kind: "wait" | "goOn") {
    const now = Date.now();
    await addEntry({
      id: `${now}`,
      at: now,
      what: reason || t(`breaker.why.${why ?? "curious"}`),
      prompt: why === "tip" ? "someoneTold" : undefined,
      worstICanBear: "",
      howLong: "",
      howWrongLooks: "",
      waitUntil: kind === "wait" ? now + 86_400_000 : undefined,
    });
    setClosed(kind);
  }

  if (closed) {
    return (
      <div className="breaker">
        <AppBar />
        <div className="breaker-close">
          <Stamp
            verdict={closed === "wait" ? "NONE" : "NOT_ENOUGH"}
            word={
              closed === "wait" ? t("breaker.exit.wait") : t("breaker.exit.goOn")
            }
          />
          <p className="t-serif t-h2 mt-24">
            {closed === "goOn" ? t("breaker.goOnClose") : t("breaker.saved")}
          </p>
        </div>
        <StickyActionBar>
          <div className="wizard-nav">
            <ButtonLink href="/" variant="secondary">
              {t("common.back")}
            </ButtonLink>
            <ButtonLink href="/pause/journal">
              {t("breaker.openJournal")}
            </ButtonLink>
          </div>
        </StickyActionBar>
      </div>
    );
  }

  return (
    <div className="breaker">
      <AppBar />
      <h1>{t("breaker.title")}</h1>
      <div className="mt-16">
        <ProgressRuler value={step} max={TOTAL} />
      </div>

      {step === 1 ? (
        <section className="mt-24">
          <SectionLabel>{t("breaker.q1")}</SectionLabel>
          <div
            className="stack-8"
            role="radiogroup"
            aria-label={t("breaker.q1")}
          >
            {WHYS.map((id) => (
              <OptionRow
                key={id}
                label={t(`breaker.why.${id}`)}
                selected={why === id}
                onSelect={() => {
                  setWhy(id);
                  setStep(2);
                }}
              />
            ))}
          </div>
        </section>
      ) : null}

      {step === 2 ? (
        <section className="mt-24">
          <SectionLabel>{t("breaker.q2")}</SectionLabel>
          {pact && keptLines(pact).length > 0 ? (
            <ol className="stack-12">
              {keptLines(pact).map((line, i) => (
                <li key={line.id} className="pact-read">
                  <span className="num ink-2">{i + 1}.</span>
                  <span className="t-serif t-lead">{line.text}</span>
                </li>
              ))}
            </ol>
          ) : (
            <Panel sunken>
              <p>
                {t("breaker.noPact")}{" "}
                <InlineLink href="/pause/pact">{t("pause.pact")}</InlineLink>
              </p>
            </Panel>
          )}
          <StickyActionBar>
            <Button full onClick={() => setStep(3)}>
              {t("madad.next")}
            </Button>
          </StickyActionBar>
        </section>
      ) : null}

      {step === 3 ? <Sixty t={t} onDone={() => setStep(4)} /> : null}

      {step === 4 ? (
        <section className="mt-24">
          <SectionLabel>{t("breaker.q4")}</SectionLabel>
          <ol className="stack-20">
            {[t("breaker.ask1"), t("breaker.ask2"), t("breaker.ask3")].map(
              (line, i) => (
                <li key={line} className="pact-read">
                  <span className="num ink-2">{i + 1}.</span>
                  <span className="t-serif t-h3">{line}</span>
                </li>
              ),
            )}
          </ol>
          <StickyActionBar>
            <Button full onClick={() => setStep(5)}>
              {t("madad.next")}
            </Button>
          </StickyActionBar>
        </section>
      ) : null}

      {step === 5 && why ? (
        <section className="mt-24">
          <SectionLabel>{t("breaker.q5")}</SectionLabel>
          <RealityCard why={why} t={t} />
          <StickyActionBar>
            <Button full onClick={() => setStep(6)}>
              {t("madad.next")}
            </Button>
          </StickyActionBar>
        </section>
      ) : null}

      {step === 6 ? (
        <section className="mt-24">
          <SectionLabel>{t("breaker.q6")}</SectionLabel>
          <div className="stack-12">
            <Button full onClick={() => void save("wait")}>
              {t("breaker.exit.wait")}
            </Button>
            <ButtonLink href="/family" variant="secondary" full>
              {t("breaker.exit.talk")}
            </ButtonLink>
          </div>

          <div className="breaker-goon mt-32">
            <TextArea
              rows={2}
              label={t("breaker.reasonLabel")}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            />
            <div className="mt-16">
              <Button variant="text" onClick={() => void save("goOn")}>
                {t("breaker.exit.goOn")}
              </Button>
            </div>
          </div>
        </section>
      ) : null}
    </div>
  );
}

function Sixty({
  t,
  onDone,
}: {
  t: (key: string) => string;
  onDone: () => void;
}) {
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    const started = Date.now();
    const id = setInterval(() => {
      const seconds = (Date.now() - started) / 1000;
      setElapsed(seconds);
      if (seconds >= PAUSE_SECONDS) clearInterval(id);
    }, 250);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="mt-24">
      <SectionLabel>{t("breaker.q3")}</SectionLabel>
      <p className="t-serif t-h2 breath">{t("breaker.calm")}</p>
      <div className="mt-32">
        <ProgressRuler
          tall
          value={Math.min(PAUSE_SECONDS, elapsed)}
          max={PAUSE_SECONDS}
          label={t("breaker.q3")}
        />
      </div>
      <StickyActionBar>
        <Button full disabled={elapsed < SKIP_AFTER} onClick={onDone}>
          {t("breaker.skip")}
        </Button>
      </StickyActionBar>
    </section>
  );
}

function RealityCard({ why, t }: { why: Why; t: (key: string) => string }) {
  const fact =
    why === "loss" ? FACTS.find((f) => f.id === "fno-repeat-loss") : null;

  return (
    <Panel>
      <p className="t-serif t-h3">{t(`breaker.card.${why}`)}</p>
      {fact ? (
        <p className="t-caption ink-2 mt-12">
          {fact.source} · {fact.asOf}
        </p>
      ) : null}
      {why === "tip" ? (
        <div className="mt-16">
          <ButtonLink href="/check" variant="secondary" size="md">
            {t("home.check")}
          </ButtonLink>
        </div>
      ) : null}
      {why === "curious" ? (
        <div className="mt-16">
          <ButtonLink href="/learn" variant="secondary" size="md">
            {t("home.learn")}
          </ButtonLink>
        </div>
      ) : null}
    </Panel>
  );
}
