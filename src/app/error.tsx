"use client";

import { Button, ErrorState } from "@/components/ui";
import { useSettings } from "@/components/use-settings";

export default function ErrorBoundary({ reset }: { reset: () => void }) {
  const { t } = useSettings();
  return (
    <>
      <h1>{t("error.title")}</h1>
      <div className="mt-16">
        <ErrorState
          what={t("error.title")}
          safe={t("error.line")}
          action={
            <Button full onClick={reset}>
              {t("common.continue")}
            </Button>
          }
        />
      </div>
    </>
  );
}
