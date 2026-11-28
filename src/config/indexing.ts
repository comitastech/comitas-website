/**
 * Search engine indexing policy: the single switch for the whole site.
 *
 * `allowed: false` (current): every page carries
 * `<meta name="robots" content="noindex, nofollow">` and every response gets
 * the `X-Robots-Tag: noindex, nofollow` header (generated into `dist/_headers`
 * at build time, see astro.config.mjs).
 *
 * To release SEO, set `allowed: false` and follow docs/indexing.md.
 */
export const indexing = {
  allowed: false,
} as const;

/** Directive sent in the meta tag and in the HTTP header while blocked. */
export const NOINDEX = "noindex, nofollow";
