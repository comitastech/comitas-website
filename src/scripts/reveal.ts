// Adds .is-in to [data-reveal] containers when they enter the viewport
// (once). Styles live in src/styles/drawing.css.
const targets = document.querySelectorAll<HTMLElement>("[data-reveal]");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add("is-in");
        observer.unobserve(entry.target);
      }
    },
    { rootMargin: "0px 0px -15% 0px", threshold: 0.15 },
  );
  targets.forEach((el) => observer.observe(el));
} else {
  targets.forEach((el) => el.classList.add("is-in"));
}
