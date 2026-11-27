// @ts-check
import { defineConfig, fontProviders } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

// Font files come from the @fontsource-variable packages (SIL OFL 1.1), so the
// build never needs the network. Only the latin subset is loaded: it covers
// pt-BR (accents, ç, ©, ·, en/em dashes).
const geist = "@fontsource-variable/geist/files/geist-latin-wght-normal.woff2";
const geistMono =
  "@fontsource-variable/geist-mono/files/geist-mono-latin-wght-normal.woff2";

// https://astro.build/config
export default defineConfig({
  // Temporary: the home page arrives with the hero PR. Until then the root
  // points to the internal design review page.
  redirects: {
    "/": "/design",
  },
  // TODO: set `site` once the production domain is decided (canonical URLs, sitemap).
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
