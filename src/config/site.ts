/**
 * Site-wide settings. User-facing strings follow docs/copy.md (pt-BR).
 */
export const site = {
  name: "Comitas",
  locale: "pt-BR",
  country: "Brasil",
  /**
   * Official WhatsApp link (https://wa.me/<number>).
   * TODO: pending the official number; while unset, "WhatsApp" renders as
   * plain text instead of a link.
   */
  whatsappUrl: undefined as string | undefined,
  /** Section anchors, in page order. Targets arrive with the section PRs. */
  nav: [
    { label: "Como trabalhamos", href: "/#como-trabalhamos" },
    { label: "O que fazemos", href: "/#o-que-fazemos" },
    { label: "Projetos", href: "/#projetos" },
  ],
} as const;
