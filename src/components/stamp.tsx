"use client";

import type { VerdictState } from "@/lib/engine/states";
import { Stamp as UIStamp, type Verdict } from "@/components/ui";

/* The engine speaks in long state names; the stamp speaks in short ones. */
const SHORT: Record<VerdictState, Verdict> = {
  HIGH_RISK: "HIGH",
  MULTIPLE_RED_FLAGS: "MULTIPLE",
  SOME_CONCERNS: "SOME",
  NO_STRONG_FLAGS: "NONE",
  NOT_ENOUGH_TO_GO_ON: "NOT_ENOUGH",
};

/* Compatibility shim. The rubber stamp is now `.stamp` in components.css,
   which draws the double frame, the tilt and the multiply blend in CSS and
   stands down its animation under `prefers-reduced-motion`. */
export function Stamp({
  kind,
  label,
  sublabel,
}: {
  kind: VerdictState;
  label: string;
  sublabel?: string;
}) {
  return <UIStamp verdict={SHORT[kind]} word={label} sub={sublabel} />;
}

/* One filter definition for the whole app; rendered once in the shell. */
export function StampFilterDefs() {
  return (
    <svg width="0" height="0" aria-hidden="true" focusable="false">
      <filter id="stamp-rough">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.9"
          numOctaves="2"
          result="noise"
        />
        <feDisplacementMap in="SourceGraphic" in2="noise" scale="1.6" />
      </filter>
    </svg>
  );
}
