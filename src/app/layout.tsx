import type { Metadata, Viewport } from "next";
import "./globals.css";
import { mukta, tiro } from "@/fonts";
import { Shell } from "@/components/shell";
import { StampFilterDefs } from "@/components/stamp";

export const metadata: Metadata = {
  title: "सजग Sajag — रुको · जाँचो · समझो",
  description:
    "Check a suspicious investment message on your own phone, in your own language. A SANGYAN hackathon prototype.",
  manifest: "/manifest.webmanifest",
  applicationName: "Sajag",
  appleWebApp: { capable: true, title: "Sajag" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  /* No maximum-scale and no user-scalable=no: pinch zoom stays available. */
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F8F3E7" },
    { media: "(prefers-color-scheme: dark)", color: "#17140F" },
  ],
};

/* The props are written out rather than using Next's generated `LayoutProps`,
   because that global type only exists inside `.next/types` after a build has
   run. Depending on it meant `npm run typecheck` failed on a fresh clone,
   before the first build, which is exactly what a new contributor does. */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="hi"
      data-theme="light"
      data-contrast="normal"
      className={`${mukta.variable} ${tiro.variable}`}
      suppressHydrationWarning
    >
      <body>
        {/* Sets theme, contrast and text size before first paint, so the page
            never flashes the wrong palette. A file, not inline, so the CSP
            needs no script nonce. It must block paint, hence no defer, and it
            is a child of body because the App Router owns <head>. */}
        {/* eslint-disable-next-line @next/next/no-sync-scripts */}
        <script src="/theme-boot.js" />
        <StampFilterDefs />
        <Shell>{children}</Shell>
      </body>
    </html>
  );
}
