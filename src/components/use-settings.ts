"use client";

import { useCallback, useMemo, useSyncExternalStore } from "react";
import { t as translate } from "@/lib/i18n";
import {
  getServerSnapshot,
  getSnapshot,
  setSettings,
  subscribe,
  type Settings,
} from "@/lib/settings-store";

export type { Settings };

export function useSettings() {
  const settings = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  const set = useCallback((patch: Partial<Settings>) => {
    setSettings(patch);
  }, []);

  const t = useCallback(
    (key: string, vars?: Record<string, string | number>) =>
      translate(settings.lang, key, vars),
    [settings.lang],
  );

  return useMemo(() => ({ settings, set, t }), [settings, set, t]);
}
