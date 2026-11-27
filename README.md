# Comitas — site

Site institucional da Comitas.

## Development

Astro + Tailwind CSS v4, static output. Requires Node.js 22.23.4+ (see `.nvmrc`).

```sh
npm install
npm run dev           # http://localhost:4321
npm run build         # static site in dist/
npm run check         # type and template checks
npm run format        # Prettier (Astro + Tailwind class sorting)
```

## Structure

| Path | What |
|---|---|
| `src/styles/global.css` | Design tokens (colors, type scale, radii, motion, layout) and utilities |
| `src/components/Button.astro` | Primary and secondary buttons with all interaction states |
| `src/components/Footer.astro` | Floating dark footer |
| `src/layouts/BaseLayout.astro` | HTML shell, fonts, footer |
| `src/config/site.ts` | Site-wide settings (WhatsApp link, navigation) |
| `src/pages/design.astro` | Internal review page for the design foundation (`/design`, noindex) |

Sources of truth: `docs/copy.md` (approved copy) and `docs/design.md` (visual brief).

### Tokens and utilities

- Colors use the names from `docs/design.md` (`--color-bg`, `--color-fg`, …) and map to Tailwind utilities: `bg-bg`, `text-fg`, `text-fg-muted`, `border-line`, `bg-inverse`, `text-accent`, …
- The accent color lives only in `--color-accent` in `src/styles/global.css`.
- Typography roles: `type-h1`, `type-h2`, `type-h3`, `type-body-lg`, `type-body`, `type-small`, `type-label` (mono, uppercase), `type-caption` (mono).
- Layout: `container-page` (1440px max), `grid-12` (12 columns + gutter), `section-space` (vertical rhythm).
- Text links: `link` (underline drawn left to right).

## Fonts

[Geist and Geist Mono](https://github.com/vercel/geist-font) by The Geist Project Authors, licensed under the [SIL Open Font License 1.1](https://openfontlicense.org/). Files come from the `@fontsource-variable/geist` and `@fontsource-variable/geist-mono` packages and are self-hosted through Astro's font API. The license ships with the site at `/licenses/geist-ofl.txt`.
