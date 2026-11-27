/**
 * Site-wide settings. User-facing strings follow docs/copy.md (pt-BR).
 */
export const site = {
  name: "Comitas",
  locale: "pt-BR",
  country: "Brasil",
  heroLead:
    "Construímos sistemas e agentes de IA junto com quem toca o negócio.",
  /**
   * WhatsApp link: a path on our own site. The redirect from /whatsapp to
   * WhatsApp is configured in the Cloudflare dashboard, outside the code,
   * so the phone number never appears in this public repository.
   * Opens in a new tab.
   */
  whatsappUrl: "/whatsapp",
  /** Section anchors, in page order. Targets arrive with the section PRs. */
  nav: [
    { label: "Como trabalhamos", href: "/#como-trabalhamos" },
    { label: "O que fazemos", href: "/#o-que-fazemos" },
  ],
} as const;

/** Where "talk to us" buttons point (opens in a new tab). */
export const contactHref: string = site.whatsappUrl;
