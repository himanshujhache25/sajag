/* Hand-written service worker. Precaches the shell so the check works with
   the network off. /api/* is never cached. */
/* v6: `/` became the Home page and `/check` took over the composer, and the
   tab bar grew from four items to five. A browser holding the v5 shell
   served the old HTML and then hydrated it with the new client bundle,
   which React reports as a hydration mismatch. Bumping the version is what
   evicts it. Bump VERSION on every change to a precached asset. */
const VERSION = "sajag-v6";
const SHELL = `${VERSION}-shell`;
const RUNTIME = `${VERSION}-runtime`;

/* The twelve concept pages are tiny and the whole point of them is to be
   readable on a train with no signal, so they are all precached by name.
   Keep this list in step with CONCEPT_IDS in src/content/learn/types.ts. */
const CONCEPTS = [
  "sebi-registration",
  "demat",
  "nominee",
  "nav",
  "sip",
  "risk-return",
  "volatility",
  "diversification",
  "leverage",
  "compounding",
  "fees",
  "bonus-split",
].map((id) => `/learn/${id}`);

const PRECACHE = [
  "/",
  "/check",
  "/check/result",
  "/madad",
  "/madad/plan",
  "/pause",
  "/pause/pact",
  "/pause/breaker",
  "/pause/journal",
  "/family",
  "/family/card",
  "/about",
  "/history",
  "/learn",
  ...CONCEPTS,
  "/simulate",
  "/start",
  "/settings",
  "/settings/ledger",
  "/offline",
  "/manifest.webmanifest",
  "/theme-boot.js",
  "/icon.svg",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(SHELL)
      .then((cache) => cache.addAll(PRECACHE))
      .then(() => self.skipWaiting())
      .catch(() => undefined),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((names) =>
        Promise.all(
          names
            .filter((n) => n !== SHELL && n !== RUNTIME)
            .map((n) => caches.delete(n)),
        ),
      )
      .then(() => self.clients.claim()),
  );
});

function isStatic(url) {
  return (
    url.pathname.startsWith("/_next/static/") ||
    url.pathname.startsWith("/ocr/") ||
    /\.(svg|png|woff2|json|js|css)$/.test(url.pathname)
  );
}

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;
  if (url.pathname.startsWith("/api/")) return;

  if (isStatic(url)) {
    event.respondWith(
      caches.match(request).then(
        (hit) =>
          hit ||
          fetch(request).then((res) => {
            const copy = res.clone();
            caches.open(RUNTIME).then((c) => c.put(request, copy));
            return res;
          }),
      ),
    );
    return;
  }

  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then((res) => {
          const copy = res.clone();
          caches.open(RUNTIME).then((c) => c.put(request, copy));
          return res;
        })
        .catch(() =>
          caches
            .match(request)
            .then((hit) => hit || caches.match("/offline"))
            .then((hit) => hit || Response.error()),
        ),
    );
    return;
  }

  event.respondWith(
    caches.match(request).then((hit) => {
      const network = fetch(request)
        .then((res) => {
          const copy = res.clone();
          caches.open(RUNTIME).then((c) => c.put(request, copy));
          return res;
        })
        .catch(() => hit);
      return hit || network;
    }),
  );
});
