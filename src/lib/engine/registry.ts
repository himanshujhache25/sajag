import demo from "@/data/registry-demo.json";

export type RegistryCategory =
  | "INZ"
  | "INH"
  | "INA"
  | "INP"
  | "INM"
  | "IN-DP"
  | "UNKNOWN";

export type RegistryEntity = {
  regNo: string;
  name: string;
  category: string;
  city: string;
  status: "registered" | "suspended" | "expired";
  validTill: string;
  demo?: boolean;
};

export type RegistrySnapshot = {
  snapshotDate: string;
  entities: RegistryEntity[];
};

export type RegistryStatus =
  | "FORMAT_INVALID"
  | "NOT_IN_SNAPSHOT"
  | "FOUND_NAME_MATCH"
  | "FOUND_NAME_DIFFERS"
  | "FOUND_CATEGORY_MISMATCH"
  | "EXPIRED_OR_SUSPENDED";

export type RegistryLookup = {
  regNo: string;
  status: RegistryStatus;
  category: RegistryCategory;
  /* True for prefixes the spec has not verified yet (INB, INF, INR). The UI
     must say "unknown category, check on SEBI" rather than guess. */
  categoryUnverified: boolean;
  entity?: RegistryEntity;
  nameSimilarity?: number;
  snapshotStale: boolean;
  snapshotDate: string;
  demo: boolean;
};

export const demoRegistry = demo as RegistrySnapshot;

const CATEGORY_BY_PREFIX: Record<string, RegistryCategory> = {
  INZ: "INZ",
  INH: "INH",
  INA: "INA",
  INP: "INP",
  INM: "INM",
  "IN-DP": "IN-DP",
};

/* The older broker prefixes and the registrar prefix. We deliberately refuse
   to name a category for these, and the refusal is now shown to the person
   as `unverifiable.registrationCategory` rather than stopping in here.

   Two reasons it stays this way, rather than being guessed at:

   Nobody on this team has checked them against SEBI's own list, and the one
   thing this product cannot afford is to describe a registration it has not
   verified. A wrong category reads as confirmation, which is the opposite of
   what someone holding a suspicious message needs.

   A live broker today carries INZ, because SEBI folded the separate segment
   registrations into one. So a message quoting one of these is, if anything,
   more worth a second look, not less — naming it would lend it weight.

   To close this: check each prefix against SEBI's published intermediary
   list, move the confirmed ones into CATEGORY_BY_PREFIX with the date of the
   check in the commit message, and delete it from here. The test at
   registry.test.ts ("refuses to name a category for the unverified
   prefixes") is what will tell you that you have changed the behaviour. */
const UNVERIFIED_PREFIXES = ["INB", "INF", "INR"];

/* Categories allowed to give tips or personal advice: research analyst and
   investment adviser. Everything else is a category mismatch. */
export const ADVICE_CATEGORIES: RegistryCategory[] = ["INH", "INA"];

const SNAPSHOT_STALE_DAYS = 30;

export function categoryOf(regNo: string): {
  category: RegistryCategory;
  unverified: boolean;
} {
  const upper = regNo.trim().toUpperCase();
  if (upper.startsWith("IN-DP")) {
    return { category: "IN-DP", unverified: false };
  }
  const three = upper.slice(0, 3);
  if (CATEGORY_BY_PREFIX[three]) {
    return { category: CATEGORY_BY_PREFIX[three], unverified: false };
  }
  if (UNVERIFIED_PREFIXES.includes(three)) {
    return { category: "UNKNOWN", unverified: true };
  }
  return { category: "UNKNOWN", unverified: false };
}

export function isValidRegNoFormat(regNo: string): boolean {
  const upper = regNo.trim().toUpperCase();
  if (/^IN-DP-\d{1,6}-\d{4}$/.test(upper)) return true;
  return /^IN[ZHAPMBFR]\d{9}$/.test(upper);
}

const NOISE_TOKENS = new Set([
  "pvt",
  "pvt.",
  "private",
  "ltd",
  "ltd.",
  "limited",
  "llp",
  "and",
  "co",
  "co.",
  "company",
  "the",
]);

export function normaliseName(name: string): string[] {
  return name
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((token) => token.length > 0 && !NOISE_TOKENS.has(token));
}

/* Token-set similarity: the share of tokens the two names have in common,
   measured against the smaller name so "Satna Wealth" still matches
   "Satna Wealth Advisers Pvt Ltd". */
export function nameSimilarity(a: string, b: string): number {
  const left = new Set(normaliseName(a));
  const right = new Set(normaliseName(b));
  if (left.size === 0 || right.size === 0) return 0;
  let shared = 0;
  for (const token of left) if (right.has(token)) shared += 1;
  return shared / Math.min(left.size, right.size);
}

function daysBetween(fromISO: string, to: Date): number {
  const from = Date.parse(fromISO);
  if (Number.isNaN(from)) return Number.POSITIVE_INFINITY;
  return Math.floor((to.getTime() - from) / 86_400_000);
}

export type LookupOptions = {
  /* The name the message claims, if any. Without it we can only say the
     number exists, never that the sender is the holder. */
  claimedName?: string;
  /* True when the message gives buy or sell tips, which need INH or INA. */
  givesAdvice?: boolean;
  now?: Date;
  snapshot?: RegistrySnapshot;
};

export function lookupRegistration(
  regNo: string,
  options: LookupOptions = {},
): RegistryLookup {
  const snapshot = options.snapshot ?? demoRegistry;
  const now = options.now ?? new Date();
  const upper = regNo.trim().toUpperCase().replace(/\s+/g, "");
  const { category, unverified } = categoryOf(upper);
  const snapshotStale =
    daysBetween(snapshot.snapshotDate, now) > SNAPSHOT_STALE_DAYS;
  const demoSnapshot = snapshot.entities.some((entity) => entity.demo === true);

  const base = {
    regNo: upper,
    category,
    categoryUnverified: unverified,
    snapshotStale,
    snapshotDate: snapshot.snapshotDate,
    demo: demoSnapshot,
  };

  if (!isValidRegNoFormat(upper)) {
    return { ...base, status: "FORMAT_INVALID" };
  }

  const entity = snapshot.entities.find(
    (candidate) => candidate.regNo.toUpperCase() === upper,
  );
  if (!entity) {
    return { ...base, status: "NOT_IN_SNAPSHOT" };
  }

  if (entity.status !== "registered" || Date.parse(entity.validTill) < now.getTime()) {
    return { ...base, status: "EXPIRED_OR_SUSPENDED", entity };
  }

  if (options.givesAdvice && !ADVICE_CATEGORIES.includes(category)) {
    return { ...base, status: "FOUND_CATEGORY_MISMATCH", entity };
  }

  if (options.claimedName === undefined) {
    return { ...base, status: "FOUND_NAME_DIFFERS", entity };
  }

  const similarity = nameSimilarity(options.claimedName, entity.name);
  if (similarity >= 0.8) {
    return { ...base, status: "FOUND_NAME_MATCH", entity, nameSimilarity: similarity };
  }
  if (similarity >= 0.5) {
    return { ...base, status: "FOUND_NAME_DIFFERS", entity, nameSimilarity: similarity };
  }
  return { ...base, status: "FOUND_NAME_DIFFERS", entity, nameSimilarity: similarity };
}
