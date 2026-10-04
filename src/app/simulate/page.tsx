"use client";

import { useMemo, useState } from "react";

import { Button, Panel, SectionLabel } from "@/components/ui";
import { useSettings } from "@/components/use-settings";
import { WarningIcon } from "@/components/icons";
import { FACTS } from "@/data/facts";
import {
  CAPITAL_DEFAULT,
  CAPITAL_MAX,
  CAPITAL_MIN,
  LEVERAGES,
  MOVE_CALM,
  MOVE_FAST,
  SIM_DAYS,
  defaultInput,
  lossMaths,
  rupees,
  runSim,
} from "@/lib/sim";

const FIRST_SEED = 20260101;
const LOSS_START = 10000;

export default function SimulatePage() {
  const { t } = useSettings();
  const [tab, setTab] = useState<"loss" | "lev">("loss");

  return (
    <>
      <h1>{t("sim.title")}</h1>
      <p className="t-lead ink-2 mt-8">{t("sim.sub")}</p>

      <div role="tablist" aria-label={t("sim.title")} className="tabs mt-24">
        <Tab id="loss" now={tab} onPick={setTab} label={t("sim.tabLoss")} />
        <Tab id="lev" now={tab} onPick={setTab} label={t("sim.tabLeverage")} />
      </div>

      <p className="banner banner-caution mt-16" role="status">
        <WarningIcon width={20} height={20} aria-hidden="true" />
        <span>{t("sim.notReal")}</span>
      </p>

      {tab === "loss" ? <LossTab /> : <LeverageTab />}

      <FactCard />

      <p className="t-caption ink-2 mt-16">{t("sim.noInstruments")}</p>
    </>
  );
}

function Tab({
  id,
  now,
  onPick,
  label,
}: {
  id: "loss" | "lev";
  now: "loss" | "lev";
  onPick: (v: "loss" | "lev") => void;
  label: string;
}) {
  const on = now === id;
  return (
    <button
      type="button"
      role="tab"
      aria-selected={on}
      id={`tab-${id}`}
      onClick={() => onPick(id)}
      className={`tab-btn ${on ? "tab-btn-on" : ""}`}
    >
      {label}
    </button>
  );
}

function LossTab() {
  const { t } = useSettings();
  const [pct, setPct] = useState(50);
  const { left, gainNeeded } = lossMaths(LOSS_START, pct);

  const leftWidth = (left / LOSS_START) * 100;
  const needWidth = Math.min(100, (gainNeeded / 900) * 100);

  return (
    <section role="tabpanel" aria-labelledby="tab-loss" className="mt-24">
      <p className="t-lead">{t("sim.loss.lead")}</p>

      <label className="field-label mt-24" htmlFor="loss-slider">
        {t("sim.loss.slider")}: <span className="num">{pct}%</span>
      </label>
      <input
        id="loss-slider"
        type="range"
        min={1}
        max={90}
        value={pct}
        onChange={(e) => setPct(Number(e.target.value))}
        className="range"
      />

      <Panel sunken>
        <p
          className="num t-tile"
          aria-label={t("sim.loss.aria", {
            pct,
            left: rupees(left),
            start: rupees(LOSS_START),
            gain: gainNeeded,
          })}
        >
          {t("sim.loss.after", {
            start: rupees(LOSS_START),
            left: rupees(left),
            pct: -pct,
          })}
        </p>
        <p className="num t-tile mt-8">
          {t("sim.loss.need", { start: rupees(LOSS_START), gain: gainNeeded })}
        </p>

        <Bar label={t("sim.loss.barNow")} width={leftWidth} value={`₹${rupees(left)}`} />
        <Bar
          label={t("sim.loss.barNeed")}
          width={needWidth}
          value={`+${gainNeeded}%`}
          strong
        />
      </Panel>

      <p className="mt-16">{t("sim.loss.point")}</p>
    </section>
  );
}

function Bar({
  label,
  width,
  value,
  strong,
}: {
  label: string;
  width: number;
  value: string;
  strong?: boolean;
}) {
  return (
    <div className="sim-bar">
      <p className="t-caption ink-2">{label}</p>
      <div className="sim-bar-row">
        <span className="sim-bar-track">
          <span
            className={`sim-bar-fill ${strong ? "sim-bar-fill-strong" : ""}`}
            style={{ width: `${Math.max(1, width)}%` }}
          />
        </span>
        <span className="num sim-bar-value">{value}</span>
      </div>
    </div>
  );
}

function LeverageTab() {
  const { t } = useSettings();
  const [capital, setCapital] = useState(CAPITAL_DEFAULT);
  const [leverage, setLeverage] = useState(5);
  const [fast, setFast] = useState(false);
  const [withCosts, setWithCosts] = useState(true);
  const [seed, setSeed] = useState(FIRST_SEED);

  const result = useMemo(
    () =>
      runSim({
        ...defaultInput(seed),
        capital,
        leverage,
        dailyMove: fast ? MOVE_FAST : MOVE_CALM,
        withCosts,
      }),
    [capital, leverage, fast, withCosts, seed],
  );

  const summary = t("sim.lev.aria", {
    lev: leverage,
    half: result.halfGone,
    zero: result.wiped,
    median: rupees(result.median),
  });

  return (
    <section role="tabpanel" aria-labelledby="tab-lev" className="mt-24">
      <label className="field-label" htmlFor="sim-capital">
        {t("sim.lev.capital")}: <span className="num">₹{rupees(capital)}</span>
      </label>
      <input
        id="sim-capital"
        type="range"
        min={CAPITAL_MIN}
        max={CAPITAL_MAX}
        step={5000}
        value={capital}
        onChange={(e) => setCapital(Number(e.target.value))}
        className="range"
      />

      <fieldset className="mt-24">
        <legend className="field-label">{t("sim.lev.leverage")}</legend>
        <div className="pick-row">
          {LEVERAGES.map((l) => (
            <button
              key={l}
              type="button"
              aria-pressed={leverage === l}
              onClick={() => setLeverage(l)}
              className={`pick-cell num ${leverage === l ? "pick-cell-on" : ""}`}
            >
              {l}×
            </button>
          ))}
        </div>
      </fieldset>

      <fieldset className="mt-24">
        <legend className="field-label">{t("sim.lev.move")}</legend>
        <div className="pick-row">
          <button
            type="button"
            aria-pressed={!fast}
            onClick={() => setFast(false)}
            className={`pick-cell ${!fast ? "pick-cell-on" : ""}`}
          >
            {t("sim.lev.moveCalm")}
          </button>
          <button
            type="button"
            aria-pressed={fast}
            onClick={() => setFast(true)}
            className={`pick-cell ${fast ? "pick-cell-on" : ""}`}
          >
            {t("sim.lev.moveFast")}
          </button>
        </div>
      </fieldset>

      <label className="check-inline mt-16">
        <input
          type="checkbox"
          checked={withCosts}
          onChange={(e) => setWithCosts(e.target.checked)}
        />
        <span>{t("sim.lev.costs")}</span>
      </label>
      <p className="t-caption ink-2">{t("sim.lev.costsNote")}</p>

      <SectionLabel>{t("sim.lev.chartTitle")}</SectionLabel>
      <PathChart
        paths={result.drawn}
        capital={capital}
        summary={summary}
        startLabel={t("sim.lev.startLine")}
      />

      <div aria-live="polite" className="mt-16">
        <Panel sunken>
          <p>{t("sim.lev.result", { half: result.halfGone, zero: result.wiped })}</p>
          <p className="num t-tile mt-8">
            {t("sim.lev.median", { median: rupees(result.median) })}
          </p>
          <p className="num t-caption ink-2 mt-8">
            {t("sim.lev.worst", { worst: rupees(result.worst) })} ·{" "}
            {t("sim.lev.best", { best: rupees(result.best) })}
          </p>
        </Panel>
      </div>

      <div className="run-row mt-16">
        <p className="num t-caption ink-2">
          {t("sim.lev.seed", { seed: result.seed })} · {t("sim.lev.days")}
        </p>
        <Button variant="secondary" onClick={() => setSeed(seed + 1)}>
          {t("sim.lev.run")}
        </Button>
      </div>

      <p className="mt-16">{t("sim.lev.point")}</p>
    </section>
  );
}

function PathChart({
  paths,
  capital,
  summary,
  startLabel,
}: {
  paths: number[][];
  capital: number;
  summary: string;
  startLabel: string;
}) {
  const w = 320;
  const h = 170;
  const pad = 6;
  const top = Math.max(capital * 2, ...paths.flat()) || capital * 2;

  const x = (i: number) => pad + (i / SIM_DAYS) * (w - pad * 2);
  const y = (v: number) => h - pad - (v / top) * (h - pad * 2);

  return (
    <figure className="sim-figure">
      <svg viewBox={`0 0 ${w} ${h}`} role="img" aria-label={summary} className="sim-chart">
        <line
          x1={pad}
          y1={y(capital)}
          x2={w - pad}
          y2={y(capital)}
          stroke="var(--rule)"
          strokeWidth="1.5"
          strokeDasharray="4 3"
        />
        <line
          x1={pad}
          y1={h - pad}
          x2={w - pad}
          y2={h - pad}
          stroke="var(--ink-2)"
          strokeWidth="1"
        />
        {paths.map((walk, i) => (
          <polyline
            key={i}
            points={walk.map((v, d) => `${x(d)},${y(v)}`).join(" ")}
            fill="none"
            stroke={walk[walk.length - 1] <= 0 ? "var(--danger)" : "var(--ink)"}
            strokeWidth="1"
            strokeOpacity="0.55"
            strokeLinejoin="round"
          />
        ))}
      </svg>
      <figcaption className="t-caption ink-2 mt-8">
        {startLabel}: ₹{rupees(capital)}
      </figcaption>
      <p className="sr-only">{summary}</p>
    </figure>
  );
}

function FactCard() {
  const { t } = useSettings();
  const fact = FACTS.find((f) => f.id === "fno-losses");
  if (!fact) return null;
  return (
    <aside className="mt-24">
      <Panel sunken>
        <p>{t(fact.textKey)}</p>
        <p className="t-caption ink-2 mt-8">
          {fact.source} · {fact.asOf}
        </p>
      </Panel>
    </aside>
  );
}
