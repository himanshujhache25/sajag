"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import {
  Button,
  ButtonLink,
  MoneyField,
  Note,
  OptionRow,
  Panel,
  ProgressRuler,
  TextArea,
  TextField,
  Tag,
} from "@/components/ui";
import { AppBar, StickyActionBar } from "@/components/ui/nav";
import { PhoneIcon, LockIcon } from "@/components/icons";
import { useSettings } from "@/components/use-settings";
import { extract } from "@/lib/engine/extract";
import { normalise } from "@/lib/engine/normalise";
import {
  emptyCase,
  groupIndian,
  readCase,
  writeCase,
  type CaseFile,
  type HowSent,
  type Promised,
  type Proof,
  type WhenSent,
} from "@/lib/case";

const TOTAL = 6;

export default function MadadPage() {
  const { t } = useSettings();
  const router = useRouter();
  const [file, setFile] = useState<CaseFile | null>(null);
  const [step, setStep] = useState(1);

  useEffect(() => {
    void readCase().then(setFile);
    router.prefetch("/madad/plan");
  }, [router]);

  function patch(change: Partial<CaseFile>) {
    setFile((current) => {
      if (!current) return current;
      const next = { ...current, ...change };
      void writeCase(next);
      return next;
    });
  }

  return (
    <div className="screen">
      <AppBar />

      <header className="screen-head">
        <h1>{t("madad.title")}</h1>
        <p className="t-lead ink-2">{t("madad.sub")}</p>
      </header>

      {/* The call button stays first and stays loud. Someone arriving here
          has lost money in the last hour; the fastest useful thing is the
          helpline, not our wizard. */}
      <section className="screen-section">
        <ButtonLink href="tel:1930" variant="emergency" full>
          <PhoneIcon width={26} height={26} aria-hidden="true" />
          {t("madad.call1930")}
        </ButtonLink>
        <p className="t-small ink-2">{t("madad.call1930Line")}</p>
      </section>

      {file === null ? null : (
        <>
          {/* The step counter and its ruler are one unit, so they live in a
              section together rather than being pushed apart by the page
              gap they would otherwise each inherit. */}
          <section className="screen-section">
            <div className="wizard-head">
              <p className="t-small ink-2 num">
                {t("madad.stepOf", { n: step, total: TOTAL })}
              </p>
              <Button
                variant="text"
                size="md"
                onClick={() => {
                  void writeCase(emptyCase());
                  setFile(emptyCase());
                  setStep(1);
                }}
              >
                {t("madad.startOver")}
              </Button>
            </div>
            <ProgressRuler value={step} max={TOTAL} />
          </section>

          <div>
            {step === 1 ? (
              <Choice
                legend={t("madad.q1")}
                options={(["now", "today", "week", "older"] as WhenSent[]).map(
                  (id) => ({ id, label: t(`madad.when.${id}`) }),
                )}
                value={file.whenSent}
                onChange={(whenSent) => patch({ whenSent })}
              />
            ) : null}

            {step === 2 ? (
              <Multi
                legend={t("madad.q2")}
                hint={t("madad.q2Hint")}
                options={(
                  ["upi", "bank", "card", "crypto", "cash"] as HowSent[]
                ).map((id) => ({ id, label: t(`madad.how.${id}`) }))}
                value={file.howSent}
                onChange={(howSent) => patch({ howSent })}
              />
            ) : null}

            {step === 3 ? (
              <MoneyField
                id="amount"
                label={t("madad.q3")}
                value={file.amount}
                onValueChange={(amount) =>
                  patch({ amount: groupIndian(amount) })
                }
              />
            ) : null}

            {step === 4 ? <ToWhom file={file} patch={patch} t={t} /> : null}

            {step === 5 ? (
              <>
                <Multi
                  legend={t("madad.q5")}
                  options={(
                    [
                      "sureProfit",
                      "double",
                      "ipo",
                      "feeToWithdraw",
                      "other",
                    ] as Promised[]
                  ).map((id) => ({ id, label: t(`madad.promised.${id}`) }))}
                  value={file.promised}
                  onChange={(promised) => patch({ promised })}
                />
                <div className="mt-20">
                  <TextArea
                    rows={3}
                    label={t("madad.promisedNote")}
                    value={file.promisedNote}
                    onChange={(e) => patch({ promisedNote: e.target.value })}
                  />
                </div>
              </>
            ) : null}

            {step === 6 ? (
              <Multi
                legend={t("madad.q6")}
                options={(
                  [
                    "utr",
                    "screenshots",
                    "handle",
                    "app",
                    "website",
                    "recording",
                    "statement",
                  ] as Proof[]
                ).map((id) => ({ id, label: t(`madad.proof.${id}`) }))}
                value={file.proof}
                onChange={(proof) => patch({ proof })}
              />
            ) : null}
          </div>

          <p className="privacy-line">
            <LockIcon width={18} height={18} aria-hidden="true" />
            {t("madad.savedHere")}
          </p>

          <StickyActionBar>
            <div className="wizard-nav">
              {step > 1 ? (
                <Button variant="secondary" onClick={() => setStep(step - 1)}>
                  {t("madad.back")}
                </Button>
              ) : (
                <span />
              )}
              {step < TOTAL ? (
                <>
                  <Button variant="text" onClick={() => setStep(step + 1)}>
                    {t("madad.skip")}
                  </Button>
                  <Button onClick={() => setStep(step + 1)}>
                    {t("madad.next")}
                  </Button>
                </>
              ) : (
                <Button onClick={() => router.push("/madad/plan")}>
                  {t("madad.makePlan")}
                </Button>
              )}
            </div>
          </StickyActionBar>
        </>
      )}
    </div>
  );
}

function ToWhom({
  file,
  patch,
  t,
}: {
  file: CaseFile;
  patch: (change: Partial<CaseFile>) => void;
  t: (key: string, vars?: Record<string, string | number>) => string;
}) {
  const found = file.toWhom.trim()
    ? extract(normalise(file.toWhom)).entities.slice(0, 6)
    : [];

  return (
    <div className="stack-20">
      <TextArea
        id="to-whom"
        rows={4}
        label={t("madad.q4")}
        help={t("madad.q4Hint")}
        value={file.toWhom}
        onChange={(e) => patch({ toWhom: e.target.value })}
      />

      {found.length > 0 ? (
        <Panel sunken>
          <p className="t-small ink-2">{t("madad.q4Found")}</p>
          <ul className="stack-8 mt-8">
            {found.map((entity) => (
              <li key={`${entity.type}-${entity.value}`} className="kv">
                <span className="num">{entity.value}</span>
                <Tag>{entity.type}</Tag>
              </li>
            ))}
          </ul>
        </Panel>
      ) : null}

      <TextField
        id="txn"
        label={t("madad.txnLabel")}
        className="num"
        autoComplete="off"
        value={file.transactionId}
        onChange={(e) => patch({ transactionId: e.target.value })}
      />
    </div>
  );
}

function Choice<T extends string>({
  legend,
  options,
  value,
  onChange,
}: {
  legend: string;
  options: { id: T; label: string }[];
  value: T | undefined;
  onChange: (value: T) => void;
}) {
  return (
    <fieldset>
      <legend className="t-lead">{legend}</legend>
      <div className="stack-8 mt-16" role="radiogroup" aria-label={legend}>
        {options.map((option) => (
          <OptionRow
            key={option.id}
            label={option.label}
            selected={value === option.id}
            onSelect={() => onChange(option.id)}
          />
        ))}
      </div>
    </fieldset>
  );
}

function Multi<T extends string>({
  legend,
  hint,
  options,
  value,
  onChange,
}: {
  legend: string;
  hint?: string;
  options: { id: T; label: string }[];
  value: T[];
  onChange: (value: T[]) => void;
}) {
  return (
    <fieldset>
      <legend className="t-lead">{legend}</legend>
      {hint ? <Note plain>{hint}</Note> : null}
      <div className="stack-8 mt-16">
        {options.map((option) => {
          const on = value.includes(option.id);
          return (
            <OptionRow
              key={option.id}
              multi
              label={option.label}
              selected={on}
              onSelect={() =>
                onChange(
                  on
                    ? value.filter((v) => v !== option.id)
                    : [...value, option.id],
                )
              }
            />
          );
        })}
      </div>
    </fieldset>
  );
}
