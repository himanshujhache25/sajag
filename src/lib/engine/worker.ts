/* The engine runs here so a 2 GB phone keeps scrolling while it works. The
   worker holds no state: one message in, one verdict out. */
import { check, type CheckInput, type Verdict } from "./check";

export type WorkerRequest = { id: number; input: CheckInput };
export type WorkerResponse =
  | { id: number; ok: true; verdict: Verdict }
  | { id: number; ok: false; error: string };

self.addEventListener("message", (event: MessageEvent<WorkerRequest>) => {
  const { id, input } = event.data;
  try {
    const verdict = check({ ...input, now: new Date() });
    const response: WorkerResponse = { id, ok: true, verdict };
    self.postMessage(response);
  } catch (error) {
    const response: WorkerResponse = {
      id,
      ok: false,
      error: error instanceof Error ? error.message : "unknown",
    };
    self.postMessage(response);
  }
});
