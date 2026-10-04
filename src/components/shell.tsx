"use client";

/* ============================================================================
   The frame every screen sits in.

   Three layouts, one tree:
     phone    full-bleed column, sticky tab bar at the bottom
     tablet   the same column, centred on the desk with a border
     desktop  a two-pane spread, brand rail on the left, page on the right

   Which chrome a route gets is decided here, in one place, so a new screen
   cannot accidentally show a tab bar on top of its own sticky button.
   Section 5.1 and 6 of docs/UI_SPEC.md.
   ========================================================================== */

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { WarningIcon } from "@/components/icons";
import { Banner } from "@/components/ui";
import { Snackbar } from "@/components/ui/overlay";
import { BrandRail, Footer, Header, TabBar } from "@/components/ui/nav";
import { useSettings } from "@/components/use-settings";
import { useOnline } from "@/lib/client-facts";

/* Routes that own the whole screen: the first run, every wizard step and the
   breaker. On these there is exactly one way forward, and a tab bar would
   only offer a way to abandon it half-finished. */
const FULL_SCREEN = [
  "/start",
  "/pause/breaker",
  "/pause/pact",
  "/pause/journal",
  "/madad/plan",
];

export function Shell({ children }: { children: React.ReactNode }) {
  const { t } = useSettings();
  const path = usePathname() ?? "/";
  const online = useOnline();
  const [snack, setSnack] = useState<string | null>(null);
  const [updateReady, setUpdateReady] = useState(false);

  const bare = FULL_SCREEN.some((p) => path.startsWith(p));

  useEffect(() => {
    if (!("serviceWorker" in navigator)) return;
    navigator.serviceWorker
      .register("/sw.js")
      .then((reg) => {
        reg.addEventListener("updatefound", () => {
          const sw = reg.installing;
          if (!sw) return;
          sw.addEventListener("statechange", () => {
            if (
              sw.state === "installed" &&
              navigator.serviceWorker.controller
            ) {
              setUpdateReady(true);
            }
          });
        });
      })
      .catch(() => {
        /* no service worker: the app still works, just not offline */
      });
  }, []);

  return (
    <div className="spread">
      <BrandRail bytes={0} />

      <div className="shell">
        <a href="#main" className="skip-link">
          {t("app.skipToContent")}
        </a>

        {bare ? null : <Header onSnack={setSnack} />}

        {/* One banner at a time. Stacked alerts are how a calm screen turns
            into a frightening one. */}
        {!online ? (
          <Banner icon={<WarningIcon width={20} height={20} />}>
            {t("offline.banner")}
          </Banner>
        ) : updateReady ? (
          <Banner>{t("update.ready")}</Banner>
        ) : null}

        <main id="main" className="shell-main page-pad">
          {children}
        </main>

        {bare ? null : (
          <div className="page-pad">
            <Footer />
          </div>
        )}

        {bare ? null : <TabBar />}
      </div>

      <Snackbar message={snack} onDone={() => setSnack(null)} />
    </div>
  );
}
