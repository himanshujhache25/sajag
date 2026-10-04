// Providers.
//
// Three adapters behind one small interface. The default is `none`, and the
// app is complete with `none`: everything a person needs on these screens is
// produced on their own phone. A provider only ever adds a paragraph beside
// work that is already done.
//
// Model names come from the environment. Hard-coding one means shipping a
// model that will be retired while nobody is looking.

import {
  MODEL_TIMEOUT_MS,
  type LlmProvider,
  type LlmRequest,
  type LlmReply,
} from "./types";

export class NotConfiguredError extends Error {
  constructor() {
    super("not-configured");
    this.name = "NotConfiguredError";
  }
}

const noneProvider: LlmProvider = {
  name: "none",
  configured: false,
  async complete() {
    throw new NotConfiguredError();
  },
};

/** One timeout for every provider, applied in one place so no adapter can
 *  forget it. Six seconds, no retry: a person waiting on a verdict they have
 *  already been given does not want us trying again. */
async function withTimeout<T>(
  run: (signal: AbortSignal) => Promise<T>,
  outer?: AbortSignal,
): Promise<T> {
  const ac = new AbortController();
  const timer = setTimeout(() => ac.abort(), MODEL_TIMEOUT_MS);
  const onAbort = () => ac.abort();
  outer?.addEventListener("abort", onAbort);
  try {
    return await run(ac.signal);
  } finally {
    clearTimeout(timer);
    outer?.removeEventListener("abort", onAbort);
  }
}

function reply(text: string, req: LlmRequest): LlmReply {
  return {
    text,
    bytesIn: new TextEncoder().encode(req.system + req.user).length,
    bytesOut: new TextEncoder().encode(text).length,
  };
}

function geminiProvider(key: string, model: string): LlmProvider {
  return {
    name: "gemini",
    configured: true,
    async complete(req) {
      const text = await withTimeout(async (signal) => {
        const res = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent`,
          {
            method: "POST",
            signal,
            headers: {
              "content-type": "application/json",
              "x-goog-api-key": key,
            },
            body: JSON.stringify({
              systemInstruction: { parts: [{ text: req.system }] },
              contents: [{ role: "user", parts: [{ text: req.user }] }],
              generationConfig: {
                temperature: 0.2,
                maxOutputTokens: 512,
                ...(req.json ? { responseMimeType: "application/json" } : {}),
              },
            }),
          },
        );
        if (!res.ok) throw new Error(`gemini ${res.status}`);
        const data = await res.json();
        const parts = data?.candidates?.[0]?.content?.parts;
        return Array.isArray(parts)
          ? parts.map((p: { text?: string }) => p.text ?? "").join("")
          : "";
      }, req.signal);
      return reply(text, req);
    },
  };
}

function openAiProvider(
  key: string,
  model: string,
  baseUrl: string,
): LlmProvider {
  return {
    name: "openai-compatible",
    configured: true,
    async complete(req) {
      const text = await withTimeout(async (signal) => {
        const res = await fetch(`${baseUrl.replace(/\/$/, "")}/chat/completions`, {
          method: "POST",
          signal,
          headers: {
            "content-type": "application/json",
            authorization: `Bearer ${key}`,
          },
          body: JSON.stringify({
            model,
            temperature: 0.2,
            max_tokens: 512,
            ...(req.json ? { response_format: { type: "json_object" } } : {}),
            messages: [
              { role: "system", content: req.system },
              { role: "user", content: req.user },
            ],
          }),
        });
        if (!res.ok) throw new Error(`openai ${res.status}`);
        const data = await res.json();
        return data?.choices?.[0]?.message?.content ?? "";
      }, req.signal);
      return reply(text, req);
    },
  };
}

/**
 * Pick a provider from the environment.
 *
 * The variable names come from `.env.example`, which was written in Phase 0
 * and is the contract. Server-side only: none of these has a
 * `NEXT_PUBLIC_` prefix, so a key cannot reach the browser even by accident.
 */
export function getProvider(env: NodeJS.ProcessEnv = process.env): LlmProvider {
  const kind = env.LLM_PROVIDER?.trim();
  const key = env.LLM_API_KEY?.trim();
  const model = env.LLM_MODEL?.trim();

  // A provider named without a key or a model is a misconfiguration, and the
  // safe reading of a misconfiguration is "off".
  if (!key || !model) return noneProvider;

  if (kind === "gemini") return geminiProvider(key, model);
  if (kind === "openai-compatible") {
    return openAiProvider(
      key,
      model,
      env.LLM_BASE_URL?.trim() || "https://api.openai.com/v1",
    );
  }
  return noneProvider;
}

export { noneProvider };
