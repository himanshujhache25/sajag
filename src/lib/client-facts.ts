"use client";

import { useSyncExternalStore } from "react";

/* Browser facts that the server cannot know. Read through
   useSyncExternalStore so the server render stays stable and React does not
   warn about state set during an effect. */

function noopSubscribe() {
  return () => {};
}

let fixedNow: number | null = null;

function nowSnapshot() {
  if (fixedNow === null) fixedNow = Date.now();
  return fixedNow;
}

/* One timestamp per page load. Stable, so the tip of the day and the
   late-night line do not change while the person is reading. */
export function useNow(): number {
  return useSyncExternalStore(noopSubscribe, nowSnapshot, () => 0);
}

function subscribeOnline(onChange: () => void) {
  window.addEventListener("online", onChange);
  window.addEventListener("offline", onChange);
  return () => {
    window.removeEventListener("online", onChange);
    window.removeEventListener("offline", onChange);
  };
}

export function useOnline(): boolean {
  return useSyncExternalStore(
    subscribeOnline,
    () => navigator.onLine,
    () => true,
  );
}

export function useMediaQuery(query: string): boolean {
  return useSyncExternalStore(
    (onChange) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", onChange);
      return () => mql.removeEventListener("change", onChange);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}

/* A 2 GB phone skips the stamp texture and the thunk; they cost more than
   they give there. */
export function useLowPower(): boolean {
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const reducedData = useMediaQuery("(prefers-reduced-data: reduce)");
  const smallDevice = useSyncExternalStore(
    noopSubscribe,
    () => ((navigator as { deviceMemory?: number }).deviceMemory ?? 4) <= 2,
    () => true,
  );
  return reducedMotion || reducedData || smallDevice;
}
