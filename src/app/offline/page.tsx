"use client";

import { ButtonLink, EmptyState } from "@/components/ui";
import { useSettings } from "@/components/use-settings";

export default function Offline() {
  const { t } = useSettings();
  return (
    <>
      <h1>{t("offline.title")}</h1>
      <EmptyState
        word={t("offline.title")}
        line={t("offline.line")}
        action={
          <ButtonLink href="/check" full>
            {t("home.check")}
          </ButtonLink>
        }
      />
    </>
  );
}
