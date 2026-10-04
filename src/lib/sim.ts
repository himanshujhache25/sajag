/* The arithmetic behind /simulate. Section 8.7 of docs/SPEC.md.

   Nothing here touches a real instrument or a real price. It is a driftless
   random walk, seeded so the same seed always draws the same picture, so the
   person can show someone else exactly what they saw. */

/* Mulberry32: small, fast, and good enough for a teaching toy. The seed is
   printed on the screen so a run can be repeated. */
export function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/* --- the maths of a loss --- */

export type LossResult = {
  /* Loss as a percentage, 1 to 90. */
  pct: number;
  left: number;
  /* The gain needed to get back to where you started, 1/(1-L)-1. */
  gainNeeded: number;
};

export function lossMaths(start: number, pct: number): LossResult {
  const clamped = Math.min(90, Math.max(1, pct));
  const left = Math.round(start * (1 - clamped / 100));
  const gainNeeded = Math.round((1 / (1 - clamped / 100) - 1) * 100);
  return { pct: clamped, left, gainNeeded };
}

/* --- the borrowing balance --- */

export type SimInput = {
  capital: number;
  /* 1, 2, 5 or 10. */
  leverage: number;
  days: number;
  /* The size of a typical day's move, as a fraction. */
  dailyMove: number;
  /* Interest and charges, as a fraction of the borrowed position per day. */
  withCosts: boolean;
  seed: number;
  paths: number;
};

export type SimResult = {
  /* Every run's closing value, one per path. */
  finals: number[];
  /* The first few paths, day by day, for drawing. */
  drawn: number[][];
  /* Runs that ended below half the starting capital. */
  halfGone: number;
  /* Runs that hit zero before the end. */
  wiped: number;
  median: number;
  best: number;
  worst: number;
  seed: number;
};

export const DAILY_COST = 0.0006;

/* One run. The position is capital × leverage; a move of m on the position
   changes the capital by m × leverage. Once the capital reaches zero the run
   is over: in real life the broker closes the position and the loan stays. */
export function runOnePath(
  rand: () => number,
  input: SimInput,
): number[] {
  const walk = [input.capital];
  let value = input.capital;
  for (let d = 0; d < input.days; d += 1) {
    if (value <= 0) {
      walk.push(0);
      continue;
    }
    /* Driftless: the mean move is zero. */
    const move = (rand() * 2 - 1) * input.dailyMove;
    value += value * move * input.leverage;
    if (input.withCosts) {
      value -= input.capital * input.leverage * DAILY_COST;
    }
    if (value < 0) value = 0;
    walk.push(Math.round(value));
  }
  return walk;
}

export function runSim(input: SimInput, drawCount = 20): SimResult {
  const rand = mulberry32(input.seed);
  const finals: number[] = [];
  const drawn: number[][] = [];

  for (let p = 0; p < input.paths; p += 1) {
    const walk = runOnePath(rand, input);
    if (p < drawCount) drawn.push(walk);
    finals.push(walk[walk.length - 1]);
  }

  const sorted = [...finals].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  const median =
    sorted.length % 2 === 0
      ? Math.round((sorted[mid - 1] + sorted[mid]) / 2)
      : sorted[mid];

  return {
    finals,
    drawn,
    halfGone: finals.filter((f) => f < input.capital / 2).length,
    wiped: finals.filter((f) => f <= 0).length,
    median,
    best: sorted[sorted.length - 1],
    worst: sorted[0],
    seed: input.seed,
  };
}

export const LEVERAGES = [1, 2, 5, 10] as const;
export const MOVE_CALM = 0.012;
export const MOVE_FAST = 0.035;
export const SIM_DAYS = 20;
export const SIM_PATHS = 200;
export const CAPITAL_MIN = 5000;
export const CAPITAL_MAX = 100000;
export const CAPITAL_DEFAULT = 10000;

export function defaultInput(seed: number): SimInput {
  return {
    capital: CAPITAL_DEFAULT,
    leverage: 5,
    days: SIM_DAYS,
    dailyMove: MOVE_CALM,
    withCosts: true,
    seed,
    paths: SIM_PATHS,
  };
}

/* Indian grouping for the result lines. The amounts here are whole rupees. */
export function rupees(n: number): string {
  const s = Math.round(Math.abs(n)).toString();
  if (s.length <= 3) return s;
  const last3 = s.slice(-3);
  const rest = s.slice(0, -3).replace(/\B(?=(\d{2})+(?!\d))/g, ",");
  return `${rest},${last3}`;
}
