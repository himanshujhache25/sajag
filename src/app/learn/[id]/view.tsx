"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import {
  Button,
  ButtonLink,
  EvidenceQuote,
  Note,
  Panel,
} from "@/components/ui";
import { useSettings } from "@/components/use-settings";
import {
  ArrowIcon,
  BackIcon,
  SpeakerIcon,
  WarningIcon,
} from "@/components/icons";
import { useReadAloud } from "@/lib/use-read-aloud";
import { conceptAsSpeech, conceptsFor } from "@/content/learn";
import { AskBox } from "./ask-box";

function Part({ n, title, id, children }: {
  n: number;
  title: string;
  id?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id}>
      <h2 className="section-label">
        <span className="num ink-2">{n}.</span> {title}
      </h2>
      {children}
    </section>
  );
}

export function ConceptView({ id }: { id: string }) {
  const { settings, t } = useSettings();
  const { speak, stop, speaking, available } = useReadAloud(settings.lang);

  const pack = useMemo(() => conceptsFor(settings.lang), [settings.lang]);
  const index = pack.concepts.findIndex((c) => c.id === id);
  const concept = pack.concepts[index];

  const prev = index > 0 ? pack.concepts[index - 1] : undefined;
  const next =
    index < pack.concepts.length - 1 ? pack.concepts[index + 1] : undefined;

  const [pick, setPick] = useState<{ card: string; option: number } | null>(null);
  const card = `${id}:${settings.lang}`;
  const picked = pick && pick.card === card ? pick.option : null;
  const choose = (option: number) => setPick({ card, option });

  if (!concept) return null;

  const correct = picked !== null && picked === concept.quiz.answer;

  return (
    <>
      <Link href="/learn" className="back-link">
        <BackIcon width={18} height={18} aria-hidden="true" />
        {t("learn.backToIndex")}
      </Link>

      <p className="num t-caption ink-2 mt-16">
        {t("learn.ofTwelve", { n: concept.n })}
      </p>
      <h1>{concept.title}</h1>
      <p className="t-lead ink-2 mt-8">{concept.line}</p>

      {available ? (
        <div className="mt-16 no-print">
          <Button
            variant="secondary"
            onClick={() => (speaking ? stop() : speak(conceptAsSpeech(concept)))}
          >
            <SpeakerIcon width={20} height={20} aria-hidden="true" />
            {speaking ? t("learn.stop") : t("learn.readAloud")}
          </Button>
        </div>
      ) : null}

      <Part n={1} title={t("learn.everyday")}>
        <EvidenceQuote tone="action">{concept.everyday}</EvidenceQuote>
      </Part>

      <Part n={2} title={t("learn.meaning")}>
        <ul className="rule-list">
          {concept.meaning.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
      </Part>

      <Part n={3} title={t("learn.trap")}>
        <ul className="rule-list">
          {concept.trap.map((line) => (
            <li key={line} className="trap-line">
              <WarningIcon width={20} height={20} aria-hidden="true" />
              <span>{line}</span>
            </li>
          ))}
        </ul>
      </Part>

      <Part n={4} title={t("learn.try")} id="try-it">
        <p className="t-tile">{concept.quiz.q}</p>
        <div className="stack-12 mt-16" role="group">
          {concept.quiz.options.map((option, i) => (
            <button
              key={option}
              type="button"
              aria-pressed={picked === i}
              onClick={() => choose(i)}
              className={`option-row ${picked === i ? "option-row-on" : ""}`}
            >
              <span className="tile-text">{option}</span>
            </button>
          ))}
        </div>

        {picked !== null ? (
          <div aria-live="polite" className="mt-16">
            <Note title={correct ? t("learn.right") : t("learn.wrong")}>
              <p>{concept.quiz.why[picked]}</p>
              {!correct ? (
                <div className="mt-8">
                  <Button variant="text" onClick={() => setPick(null)}>
                    {t("learn.tryAgain")}
                  </Button>
                </div>
              ) : null}
            </Note>
          </div>
        ) : null}

        <p className="t-caption ink-2 mt-8">{t("learn.noScore")}</p>
      </Part>

      {concept.related ? (
        <Part n={5} title={t("learn.related")}>
          <ButtonLink href={concept.related.href} variant="secondary" full>
            {concept.related.label}
            <ArrowIcon width={18} height={18} aria-hidden="true" />
          </ButtonLink>
        </Part>
      ) : null}

      <AskBox concept={concept} />

      <Panel sunken className="mt-24">
        <p className="t-caption ink-2">{t("learn.infoNotAdvice")}</p>
      </Panel>

      <nav className="pager mt-24" aria-label="12">
        {prev ? (
          <Link href={`/learn/${prev.id}`} className="back-link">
            <BackIcon width={18} height={18} aria-hidden="true" />
            {t("learn.prev")}
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link href={`/learn/${next.id}`} className="back-link">
            {t("learn.next")}
            <ArrowIcon width={18} height={18} aria-hidden="true" />
          </Link>
        ) : (
          <span />
        )}
      </nav>
    </>
  );
}
