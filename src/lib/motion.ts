/*
  Hoshivel official portal -- motion helpers.
  Just two things: reveal-on-scroll (fade and rise into view) and a subtle
  starfield parallax. prefers-reduced-motion is the baseline throughout: when it
  is set, everything is shown at once and nothing moves.
*/

const RM_QUERY = "(prefers-reduced-motion: reduce)";

/** Whether reduced motion is currently preferred (SSR-safe: always false on the server). */
export function prefersReducedMotion(): boolean {
  return (
    typeof window !== "undefined" &&
    typeof window.matchMedia === "function" &&
    window.matchMedia(RM_QUERY).matches
  );
}

export interface ScrollRevealOptions {
  /** Visible-ratio threshold for entering the viewport (0-1). */
  threshold?: number;
  /** IntersectionObserver rootMargin (fires earlier or later). */
  rootMargin?: string;
  /** Target selector (defaults to `[data-reveal]`). */
  selector?: string;
}

/**
 * reveal-on-scroll: add `.is-visible` as an element enters the viewport (CSS owns
 * the actual transition).
 * - Elements under the same parent get an increasing `--hv-reveal-i`, which
 *   staggers their entrance.
 * - Reduced motion, or no IntersectionObserver support, shows everything
 *   immediately and creates no observer.
 * @returns cleanup function (stops observing).
 */
export function initScrollReveal(options: ScrollRevealOptions = {}): () => void {
  if (typeof document === "undefined") return () => {};

  const selector = options.selector ?? "[data-reveal]";
  const els = Array.from(document.querySelectorAll<HTMLElement>(selector));
  if (els.length === 0) return () => {};

  // Stagger: record the ordinal of the nth element under the same parent
  const counters = new WeakMap<Element, number>();
  for (const el of els) {
    if (el.style.getPropertyValue("--hv-reveal-i")) continue;
    const parent = el.parentElement ?? document.body;
    const n = counters.get(parent) ?? 0;
    el.style.setProperty("--hv-reveal-i", String(n));
    counters.set(parent, n + 1);
  }

  if (prefersReducedMotion() || !("IntersectionObserver" in window)) {
    for (const el of els) el.classList.add("is-visible");
    return () => {};
  }

  const io = new IntersectionObserver(
    (entries, obs) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        }
      }
    },
    {
      threshold: options.threshold ?? 0.15,
      rootMargin: options.rootMargin ?? "0px 0px -10% 0px",
    },
  );
  for (const el of els) io.observe(el);
  return () => io.disconnect();
}

/**
 * Starfield parallax: write the scroll position into `--hv-sky-y`; the near and
 * far layers shift by different factors (the factors live in Starfield's CSS,
 * this only supplies the number).
 * - rAF-throttled, so at most one write per frame; the passive listener never
 *   blocks scrolling.
 * - Reduced motion, or no starfield on the page, attaches no listener at all.
 * @returns cleanup function (removes the listener).
 */
export function initSkyParallax(): () => void {
  if (typeof document === "undefined") return () => {};

  const sky = document.querySelector<HTMLElement>(".hv-sky");
  if (!sky || prefersReducedMotion()) return () => {};

  let ticking = false;
  const apply = () => {
    ticking = false;
    sky.style.setProperty("--hv-sky-y", `${window.scrollY}px`);
  };
  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(apply);
  };

  apply();
  window.addEventListener("scroll", onScroll, { passive: true });
  return () => window.removeEventListener("scroll", onScroll);
}
