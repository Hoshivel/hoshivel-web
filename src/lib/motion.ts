/*
  Hoshivel 官方門戶 —— 動效工具。
  兩件事而已：reveal-on-scroll（進場淡入上移）與星空微視差。
  一切以 prefers-reduced-motion 為基線；偵測到就直接全部呈現、不動。
*/

const RM_QUERY = "(prefers-reduced-motion: reduce)";

/** 目前是否偏好減少動態（SSR 安全：伺服器端一律 false）。 */
export function prefersReducedMotion(): boolean {
  return (
    typeof window !== "undefined" &&
    typeof window.matchMedia === "function" &&
    window.matchMedia(RM_QUERY).matches
  );
}

export interface ScrollRevealOptions {
  /** 進入視窗的可見比例門檻（0–1）。 */
  threshold?: number;
  /** IntersectionObserver 的 rootMargin（可提前 / 延後觸發）。 */
  rootMargin?: string;
  /** 目標選擇器（預設 `[data-reveal]`）。 */
  selector?: string;
}

/**
 * reveal-on-scroll：元素進入視窗時加上 `.is-visible`（實際過場交給 CSS）。
 * - 同一父層底下的元素依序寫入 `--hv-reveal-i`，達成 stagger 進場。
 * - reduced-motion 或不支援 IntersectionObserver → 立即全部呈現、不建立 observer。
 * @returns cleanup 函式（中止觀察）。
 */
export function initScrollReveal(options: ScrollRevealOptions = {}): () => void {
  if (typeof document === "undefined") return () => {};

  const selector = options.selector ?? "[data-reveal]";
  const els = Array.from(document.querySelectorAll<HTMLElement>(selector));
  if (els.length === 0) return () => {};

  // stagger：為同一 parent 底下的第 n 個元素寫入序號
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
 * 星空微視差：把捲動位置寫進 `--hv-sky-y`，遠近兩層以不同係數位移
 * （係數在 Starfield 的 CSS 裡，這裡只提供數值）。
 * - rAF 節流，一幀最多寫一次；passive 監聽不擋捲動。
 * - reduced-motion 或找不到星空 → 不掛任何監聽。
 * @returns cleanup 函式（移除監聽）。
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
