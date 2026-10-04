"use client";

import { ButtonLink, EmptyState } from "@/components/ui";
import { useSettings } from "@/components/use-settings";

export default function NotFound() {
  const { t } = useSettings();
  return (
    <>
      <h1>{t("notFound.title")}</h1>
      <EmptyState
        word={t("notFound.title")}
        line={t("app.tagline")}
        action={
          <ButtonLink href="/" full>
            {t("nav.home")}
          </ButtonLink>
        }
      />
    </>
  );
}
