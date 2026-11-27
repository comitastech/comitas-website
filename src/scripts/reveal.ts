// Adds .is-in to [data-reveal] containers when they enter the viewport
// (once). Styles live in src/styles/drawing.css (and in components that use
// it, such as the footer).
//
// data-reveal="edge" is for elements at the very bottom of the page (the
// footer), which never reach the default trigger line 15% above the
// viewport's bottom edge.
const configs: [string, IntersectionObserverInit][] = [
  [
    '[data-reveal]:not([data-reveal="edge"])',
    { rootMargin: "0px 0px -15% 0px", threshold: 0.15 },
  ],
  ['[data-reveal="edge"]', { rootMargin: "0px", threshold: 0.3 }],
];

for (const [selector, options] of configs) {
  const targets = document.querySelectorAll<HTMLElement>(selector);
  if (!("IntersectionObserver" in window)) {
    targets.forEach((el) => el.classList.add("is-in"));
    continue;
  }
  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      entry.target.classList.add("is-in");
      observer.unobserve(entry.target);
    }
  }, options);
  targets.forEach((el) => observer.observe(el));
}
