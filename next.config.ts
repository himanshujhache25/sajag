import type { NextConfig } from "next";

/* Styles need 'unsafe-inline' because Next inlines critical CSS. Scripts need
   it too: the App Router streams the page as a series of inline bootstrap
   scripts, and without them nothing hydrates and no button works. We never
   put user text into HTML — the message is painted with React nodes — so the
   usual injection route is closed.

   'wasm-unsafe-eval' is needed by the on-device OCR engine, which compiles a
   WebAssembly module in its worker. It permits wasm compilation and nothing
   else; it does not bring back eval() for JavaScript. The engine itself is
   served from our own origin, so no CDN is allowed here.
   All three compromises are in docs/DECISIONS.md. */
const dev = process.env.NODE_ENV === "development";

const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline' 'wasm-unsafe-eval'${dev ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self'",
  "connect-src 'self'",
  "worker-src 'self' blob:",
  "media-src 'self' blob:",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
].join("; ");

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "Content-Security-Policy", value: csp },
          { key: "Referrer-Policy", value: "no-referrer" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          {
            key: "Permissions-Policy",
            value:
              "camera=(self), microphone=(self), geolocation=(), payment=(), usb=()",
          },
        ],
      },
      { source: "/sw.js", headers: [{ key: "Cache-Control", value: "no-cache" }] },
    ];
  },
};

export default nextConfig;
