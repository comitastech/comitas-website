// Header behavior (src/components/Header.astro):
// - data-stuck: set once the page has scrolled, so the sticky header gets its
//   background and hairline;
// - aria-current="location": on the link whose section is in view (the one
//   crossing 40% of the viewport height, below the header).
const header = document.querySelector<HTMLElement>("[data-site-header]");

if (header) {
  const links = [
    ...header.querySelectorAll<HTMLAnchorElement>("nav a[href*='#']"),
  ];
  const sections = links.map((link) => {
    const id = new URL(link.href).hash.slice(1);
    return document.getElementById(id)?.closest("section") ?? null;
  });

  let ticking = false;

  const update = () => {
    ticking = false;
    header.toggleAttribute("data-stuck", window.scrollY > 8);

    const line = window.innerHeight * 0.4;
    links.forEach((link, i) => {
      const rect = sections[i]?.getBoundingClientRect();
      const active = !!rect && rect.top <= line && rect.bottom > line;
      if (active) link.setAttribute("aria-current", "location");
      else link.removeAttribute("aria-current");
    });
  };

  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(update);
  };

  update();
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll, { passive: true });
}
