// Which provider the environment selects.
//
// This is the switch that decides whether anything leaves the phone at all,
// so the cases that must return `none` are worth more than the cases that
// must return a provider. Every half-configured combination is off.

import { describe, expect, it } from "vitest";
import { getProvider } from "./provider";

const env = (o: Record<string, string>) => o as NodeJS.ProcessEnv;

describe("getProvider", () => {
  it("is none when nothing is set", () => {
    expect(getProvider(env({})).configured).toBe(false);
  });

  it("is none when a provider is named but there is no key", () => {
    expect(
      getProvider(env({ LLM_PROVIDER: "gemini", LLM_MODEL: "m" })).configured,
    ).toBe(false);
  });

  it("is none when a provider is named but there is no model", () => {
    expect(
      getProvider(env({ LLM_PROVIDER: "gemini", LLM_API_KEY: "k" })).configured,
    ).toBe(false);
  });

  it("is none for a provider name we do not recognise", () => {
    expect(
      getProvider(
        env({ LLM_PROVIDER: "wat", LLM_API_KEY: "k", LLM_MODEL: "m" }),
      ).configured,
    ).toBe(false);
  });

  it("is none when the provider is explicitly none, key or no key", () => {
    expect(
      getProvider(
        env({ LLM_PROVIDER: "none", LLM_API_KEY: "k", LLM_MODEL: "m" }),
      ).configured,
    ).toBe(false);
  });

  it("selects gemini when all three are present", () => {
    const p = getProvider(
      env({ LLM_PROVIDER: "gemini", LLM_API_KEY: "k", LLM_MODEL: "m" }),
    );
    expect(p.name).toBe("gemini");
    expect(p.configured).toBe(true);
  });

  it("selects the openai-compatible adapter", () => {
    const p = getProvider(
      env({
        LLM_PROVIDER: "openai-compatible",
        LLM_API_KEY: "k",
        LLM_MODEL: "m",
      }),
    );
    expect(p.name).toBe("openai-compatible");
  });

  it("ignores whitespace around the values", () => {
    const p = getProvider(
      env({ LLM_PROVIDER: " gemini ", LLM_API_KEY: " k ", LLM_MODEL: " m " }),
    );
    expect(p.configured).toBe(true);
  });

  it("refuses to work when the key is only whitespace", () => {
    expect(
      getProvider(
        env({ LLM_PROVIDER: "gemini", LLM_API_KEY: "   ", LLM_MODEL: "m" }),
      ).configured,
    ).toBe(false);
  });

  it("the none provider throws rather than quietly returning nothing", async () => {
    await expect(
      getProvider(env({})).complete({ task: "explain", system: "", user: "" }),
    ).rejects.toThrow("not-configured");
  });
});
