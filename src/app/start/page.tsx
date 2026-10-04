"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSettings } from "@/components/use-settings";
import { Button, InlineLink, OptionRow, Panel, ProgressRuler } from "@/components/ui";
import { StickyActionBar } from "@/components/ui/nav";
import { LockIcon, NoAdviceIcon, NoAccountIcon } from "@/components/icons";
import { LANG_INFO, LANGS } from "@/lib/i18n/langs";
import { needsReview, t as translate } from "@/lib/i18n";

const PROMISE_ICONS = [LockIcon, NoAdviceIcon, NoAccountIcon];

export default function Start() {
  const { settings, set, t } = useSettings();
  const [step, setStep] = useState<1 | 2>(1);
  const router = useRouter();

  if (step === 1) {
    return (
      <div className="start-screen">
        <ProgressRuler value={1} max={2} />
        <h1 className="mt-20">{t("start.langTitle")}</h1>
        <p className="t-small ink-2 mt-8" lang="en">
          {translate("en", "start.langTitle")}
        </p>

        {/* Language is the first question on the first screen, because every
            screen after it is unreadable until it is answered. The Latin
            name sits under the native one so a son setting up his mother's
            phone can find Odia without reading Odia. */}
        {/* A div rather than a ul: role="radiogroup" replaces the list role,
            which orphans every <li> inside it — axe reports listitem four
            times over. The radio group is the semantics that matters here
            (OptionRow carries role="radio"), so the list markup was only
            ever decoration, and decoration that contradicted itself. */}
        <div className="stack-8 mt-24" role="radiogroup" aria-label={t("start.langTitle")}>
          {LANGS.map((l) => (
            <div key={l}>
              <OptionRow
                label={LANG_INFO[l].native}
                lang={l}
                dir={LANG_INFO[l].dir}
                sub={LANG_INFO[l].english}
                selected={settings.lang === l}
                onSelect={() => {
                  set({ lang: l });
                  setStep(2);
                }}
                tag={
                  needsReview(l) ? (
                    <span className="t-caption ink-2" lang="en" dir="ltr">
                      {t("common.beta")}
                    </span>
                  ) : undefined
                }
              />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="start-screen">
      <ProgressRuler value={2} max={2} />
      <h1 className="mt-20">{t("start.promisesTitle")}</h1>

      <ol className="stack-12 mt-24">
        {[1, 2, 3].map((n) => {
          const Icon = PROMISE_ICONS[n - 1];
          return (
            <li key={n}>
              <Panel className="promise">
                <span className="promise-plate" aria-hidden="true">
                  <Icon width={24} height={24} />
                </span>
                <span className="t-body">{t(`start.promise${n}`)}</span>
              </Panel>
            </li>
          );
        })}
      </ol>

      <p className="t-small ink-2 mt-20">{t("start.retention")}</p>

      <p className="t-small mt-16">
        <InlineLink href="/family#caregiver">{t("start.caregiver")}</InlineLink>
      </p>

      <StickyActionBar>
        <Button
          full
          onClick={() => {
            set({ onboarded: true });
            router.push("/");
          }}
        >
          {t("start.ok")}
        </Button>
      </StickyActionBar>
    </div>
  );
}
