"use client";

import {
  ButtonLink,
  Entry,
  InlineLink,
  Panel,
  SectionLabel,
} from "@/components/ui";
import { useSettings } from "@/components/use-settings";
import { OFFICIAL_LINKS } from "@/data/official-links";
import { FACTS } from "@/data/facts";
import { LinkIcon } from "@/components/icons";

const RULES = ["rule1", "rule2", "rule3", "rule4", "rule5", "rule6"];
const NOTS = ["not1", "not2", "not3", "not4"];

export default function AboutPage() {
  const { t } = useSettings();

  return (
    <>
      <h1>{t("about.title")}</h1>
      <p className="t-lead ink-2 mt-8">{t("app.tagline")}</p>

      <SectionLabel>{t("about.whatTitle")}</SectionLabel>
      <p>{t("about.what")}</p>

      <SectionLabel>{t("about.notTitle")}</SectionLabel>
      <ul className="rule-list">
        {NOTS.map((k) => (
          <li key={k}>{t(`about.${k}`)}</li>
        ))}
      </ul>

      <SectionLabel>{t("about.rulesTitle")}</SectionLabel>
      <div className="stack-12">
        {RULES.map((k, i) => (
          <Entry key={k} n={i + 1} title={t(`about.${k}`)} />
        ))}
      </div>

      <SectionLabel>{t("about.sourcesTitle")}</SectionLabel>
      <p>{t("about.sourcesLine")}</p>
      <ul className="rule-list mt-16">
        {FACTS.map((f) => (
          <li key={f.id}>
            <span style={{ display: "block" }}>{t(f.textKey)}</span>
            <span className="t-caption ink-2 num" style={{ display: "block" }}>
              {f.source} · {f.asOf}
            </span>
          </li>
        ))}
      </ul>

      <SectionLabel>{t("about.linksTitle")}</SectionLabel>
      <ul className="rule-list">
        {OFFICIAL_LINKS.map((l) => (
          <li key={l.id}>
            <InlineLink href={l.url} external>
              <LinkIcon width={18} height={18} aria-hidden="true" />
              {t(l.labelKey)}
            </InlineLink>
            <span className="t-caption ink-2 num break-all" style={{ display: "block" }}>
              {l.url}
            </span>
          </li>
        ))}
      </ul>
      <p className="t-caption ink-2 mt-8">{t("about.registryNote")}</p>

      <SectionLabel>{t("about.modelTitle")}</SectionLabel>
      <p>{t("about.model1")}</p>
      <p className="mt-8">{t("about.model2")}</p>
      <p className="mt-8">{t("about.model3")}</p>

      <SectionLabel>{t("about.creditsTitle")}</SectionLabel>
      <p>{t("about.credits")}</p>

      <SectionLabel>{t("about.dataTitle")}</SectionLabel>
      <p>{t("privacy.onDevice")}</p>
      <div className="stack-12 mt-16">
        <ButtonLink href="/settings/ledger" variant="secondary" full>
          {t("about.openLedger")}
        </ButtonLink>
        <ButtonLink href="/settings" variant="secondary" full>
          {t("about.clear")}
        </ButtonLink>
      </div>

      <SectionLabel>{t("about.versionTitle")}</SectionLabel>
      <Panel sunken>
        <p className="num">
          {t("app.name")} 0.1.0 · {t("about.licence")}
        </p>
        <p className="mt-8">{t("about.prototype")}</p>
      </Panel>

      <p className="t-caption ink-2 mt-24 double-rule-top">{t("app.disclaimer")}</p>
    </>
  );
}
