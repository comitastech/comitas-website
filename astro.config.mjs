// @ts-check
import { defineConfig, fontProviders } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import { writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { indexing, NOINDEX } from "./src/config/indexing.ts";

// Font files come from the @fontsource-variable packages (SIL OFL 1.1), so the
// build never needs the network. Only the latin subset is loaded: it covers
// pt-BR (accents, ç, ©, ·, en/em dashes).
const geist = "@fontsource-variable/geist/files/geist-latin-wght-normal.woff2";
const geistMono =
  "@fontsource-variable/geist-mono/files/geist-mono-latin-wght-normal.woff2";

/**
 * Sends `X-Robots-Tag` on every response (HTML and assets) while indexing is
 * blocked in src/config/indexing.ts. Cloudflare Workers static assets read
 * the `_headers` file from the build output.
 * https://developers.cloudflare.com/workers/static-assets/headers/
 *
 * @type {import("astro").AstroIntegration}
 */
const robotsHeader = {
  name: "robots-header",
  hooks: {
    "astro:build:done": async ({ dir }) => {
      if (indexing.allowed) return;
      const file = fileURLToPath(new URL("_headers", dir));
      await writeFile(file, `/*\n  X-Robots-Tag: ${NOINDEX}\n`);
    },
  },
};

// https://astro.build/config
export default defineConfig({
  // TODO: set `site` once the production domain is decided (canonical URLs, sitemap).
  // Sitemap: `@astrojs/sitemap` is deliberately NOT installed and robots.txt has
  // no `Sitemap:` line while indexing is blocked. Add both back when João releases
  // SEO (see docs/indexing.md).
  integrations: [robotsHeader],
  fonts: [
    {
      name: "Geist",
      cssVariable: "--font-geist",
      provider: fontProviders.local(),
      fallbacks: ["ui-sans-serif", "system-ui", "sans-serif"],
      options: {
        variants: [{ src: [geist], weight: "100 900", style: "normal" }],
      },
    },
    {
      name: "Geist Mono",
      cssVariable: "--font-geist-mono",
      provider: fontProviders.local(),
      fallbacks: ["ui-monospace", "monospace"],
      options: {
        variants: [{ src: [geistMono], weight: "100 900", style: "normal" }],
      },
    },
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
