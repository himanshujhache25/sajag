"use client";

import { useSyncExternalStore } from "react";

/* True only after hydration.

   Read through a store rather than an effect, so the first client render
   still matches the server and nothing is set from inside an effect. This is
   how anything that depends on the clock, the URL or the device gets into a
   render without producing the hydration mismatch that used to put a red
   "Issue" badge on every screen. */

const noop = () => () => {};

export function useMounted(): boolean {
  return useSyncExternalStore(
    noop,
    () => true,
    () => false,
  );
}
