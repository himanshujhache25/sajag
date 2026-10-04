"use client";

/* ============================================================================
   Check. The same composer as Home, plus the three optional questions.

   The questions are collapsed, because a first-time user should never be
   asked to fill a form before getting an answer; they only sharpen the
   verdict for the people who want to answer them.
   Section 5.4 of docs/UI_SPEC.md.
   ========================================================================== */

import { useMemo, useState, useSyncExternalStore } from "react";

import { Chip, Disclosure } from "@/components/ui";
import { Composer } from "@/components/ui/composer";
import { useSettings } from "@/components/use-settings";
import type { ContextAnswers } from "@/lib/engine/signals";

type Answer = "yes" | "no" | "unknown" | undefined;

const noop = () => () => {};
function useMounted(): boolean {
  return useSyncExternalStore(
    noop,
    () => true,
    () => false,
  );
}

export default function CheckPage() {
  const { t } = useSettings();
  const mounted = useMounted();

  const [q1, setQ1] = useState<Answer>();
  const [q2, setQ2] = useState<Answer>();
  const [q3, setQ3] = useState<Answer>();

  /* Query flags are read after mount only, so the server and the first
     client render agree and the dev overlay stays quiet. */
  const samples = useMemo(() => {
    if (!mounted) return false;
    const p = new URLSearchParams(window.location.search);
    return p.get("samples") === "1" || p.get("demo") === "1";
  }, [mounted]);

  const answers: ContextAnswers | undefined =
    q1 === undefined && q2 === undefined && q3 === undefined
      ? undefined
      : {
          ...(q1 !== undefined ? { theyContactedFirst: q1 === "yes" } : {}),
          ...(q2 !== undefined ? { askedForMoneyOtpOrApp: q2 === "yes" } : {}),
          ...(q3 !== undefined ? { knowsThePerson: q3 === "yes" } : {}),
        };

  return (
    <div className="screen">
      {/* No back bar. Check is one of the five tabs now, not a room inside
          Home, so it wears the brand header the shell already provides and
          the tab bar keeps the way back. */}
      <header className="screen-head">
        <h1>{t("check.title")}</h1>
        <p className="t-lead ink-2">{t("home.lead")}</p>
      </header>

      <Composer
        answers={answers}
        openSamples={samples}
        extra={
          <Disclosure label={t("check.questionsTitle")}>
            <div className="stack-20 mt-16">
              <Question label={t("check.q1")} value={q1} onChange={setQ1} />
              <Question label={t("check.q2")} value={q2} onChange={setQ2} />
              <Question label={t("check.q3")} value={q3} onChange={setQ3} />
            </div>
          </Disclosure>
        }
      />
    </div>
  );
}

function Question({
  label,
  value,
  onChange,
}: {
  label: string;
  value: Answer;
  onChange: (v: Answer) => void;
}) {
  const { t } = useSettings();
  const options: { key: Exclude<Answer, undefined>; label: string }[] = [
    { key: "yes", label: t("common.yes") },
    { key: "no", label: t("common.no") },
    { key: "unknown", label: t("common.dontKnow") },
  ];
  return (
    <fieldset>
      <legend className="t-small" style={{ fontWeight: 600 }}>
        {label}
      </legend>
      <div
        className="mt-12"
        style={{ display: "flex", flexWrap: "wrap", gap: 12 }}
      >
        {options.map((o) => (
          <Chip
            key={o.key}
            label={o.label}
            selected={value === o.key}
            /* Tapping the chosen answer again clears it: nothing in this app
               traps a person in a choice they made by accident. */
            onSelect={() => onChange(value === o.key ? undefined : o.key)}
          />
        ))}
      </div>
    </fieldset>
  );
}
