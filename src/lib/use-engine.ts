"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { check as checkOnMainThread, type CheckInput, type Verdict } from "@/lib/engine/check";
import type { WorkerRequest, WorkerResponse } from "@/lib/engine/worker";

/* The result of the last check, held in a module so /check can hand it to
   /check/result without putting the message in the URL. A copy goes into
   sessionStorage as well: with the network off the move between the two
   pages can become a full page load, and the module would be emptied.
   sessionStorage dies with the tab, so nothing outlives the sitting. */
const HANDOFF = "sajag.lastResult";

let lastInput: CheckInput | null = null;
let lastVerdict: Verdict | null = null;
const listeners = new Set<() => void>();

export function setLastResult(input: CheckInput, verdict: Verdict) {
  lastInput = input;
  lastVerdict = verdict;
  try {
    sessionStorage.setItem(HANDOFF, JSON.stringify({ input, verdict }));
  } catch {
    /* storage blocked: the module copy still carries it */
  }
  for (const listener of listeners) listener();
}

export function getLastResult(): { input: CheckInput; verdict: Verdict } | null {
  if (lastInput && lastVerdict) return { input: lastInput, verdict: lastVerdict };
  try {
    const raw = sessionStorage.getItem(HANDOFF);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as { input: CheckInput; verdict: Verdict };
    if (!parsed?.verdict) return null;
    lastInput = parsed.input;
    lastVerdict = parsed.verdict;
    return parsed;
  } catch {
    return null;
  }
}

export function clearLastResult() {
  lastInput = null;
  lastVerdict = null;
  try {
    sessionStorage.removeItem(HANDOFF);
  } catch {
    /* nothing to clear */
  }
  for (const listener of listeners) listener();
}

export function useLastResult() {
  /* Starts empty so the server and the first client render agree, then the
     handover is read once the page is mounted. */
  const [value, setValue] = useState<ReturnType<typeof getLastResult>>(null);
  useEffect(() => {
    const listener = () => setValue(getLastResult());
    listeners.add(listener);
    listener();
    return () => {
      listeners.delete(listener);
    };
  }, []);
  return value;
}

/* Runs the engine in a worker, falling back to the main thread where workers
   are blocked. The engine is fast either way; there is no fake loading. */
export function useEngine() {
  const workerRef = useRef<Worker | null>(null);
  const nextId = useRef(1);

  useEffect(() => {
    if (typeof Worker === "undefined") return;
    let worker: Worker;
    try {
      worker = new Worker(new URL("@/lib/engine/worker.ts", import.meta.url), {
        type: "module",
      });
    } catch {
      return;
    }
    workerRef.current = worker;
    return () => {
      worker.terminate();
      workerRef.current = null;
    };
  }, []);

  return useCallback((input: CheckInput): Promise<Verdict> => {
    const worker = workerRef.current;
    if (!worker) return Promise.resolve(checkOnMainThread(input));

    const id = nextId.current++;
    return new Promise<Verdict>((resolve) => {
      const onMessage = (event: MessageEvent<WorkerResponse>) => {
        if (event.data.id !== id) return;
        worker.removeEventListener("message", onMessage);
        resolve(
          event.data.ok ? event.data.verdict : checkOnMainThread(input),
        );
      };
      worker.addEventListener("message", onMessage);
      const request: WorkerRequest = { id, input };
      worker.postMessage(request);
    });
  }, []);
}
