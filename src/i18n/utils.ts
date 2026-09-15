/*
  Hoshivel official portal -- i18n helpers (same routing strategy as sibling sr-web).
  The default locale (zh-Hant) sits at the root `/`; the others at `/zh-cn`, `/ja`, `/en`.
  The locale is passed down as an explicit prop, which keeps SSR clean and needs
  no client-side context.
*/

// Keep the file extension (`allowImportingTsExtensions`, see
// astro/tsconfigs/base.json): `test/routing.test.mjs` loads this file directly
// through Node's type stripping, and that path does no extensionless
// resolution. Without it, the tests that pin the route shape cannot even start.
import {
  ui,
  LOCALES,
  LOCALE_PATH,
  DEFAULT_LOCALE,
  DATE_LANG,
  type Locale,
  type UIKey,
} from "./ui.ts";

export {
  LOCALES,
  DEFAULT_LOCALE,
  LOCALE_PATH,
  HTML_LANG,
  OG_LOCALE,
  DATE_LANG,
  LOCALE_LABEL,
  LOCALE_SHORT,
  HAN_FONT,
  type Locale,
  type UIKey,
} from "./ui.ts";

/** Derive the current locale from a URL pathname (no prefix means the default locale). */
export function getLocaleFromPath(pathname: string): Locale {
  const seg = pathname.split("/").filter(Boolean)[0]?.toLowerCase();
  for (const locale of LOCALES) {
    const prefix = LOCALE_PATH[locale];
    if (prefix && prefix === seg) return locale;
  }
  return DEFAULT_LOCALE;
}

/** Build a translation function for a locale: `t("nav.works")`; a missing key falls back to the default locale. */
export function useTranslations(locale: Locale): (key: UIKey) => string {
  return (key) => ui[locale][key] ?? ui[DEFAULT_LOCALE][key];
}

/**
 * Normalize a logical path into **the shape the host actually serves**.
 *
 * The build emits `<path>/index.html`, so a page URL carries a trailing slash --
 * `canonical` always had one (it comes from `Astro.url.pathname`), while
 * `stripLocalePrefix()` rebuilds the path with `split("/").filter(Boolean)`,
 * which always drops it. That gave one page two spellings, and all three
 * symptoms follow from it:
 *
 * 1. **The preference redirect read "the same page" as "another page"** and sent
 *    the visitor to the slashless one; the host 307'd back, the script ran
 *    again -- this is what put `hoshivel.com` subpages in a redirect loop.
 * 2. hreflang and canonical pointed at two different strings (a source of
 *    duplicate indexing).
 * 3. Every internal link was missing its trailing slash, so every navigation
 *    paid for a 307 first.
 *
 * So normalization lives at this layer rather than being re-applied by each
 * consumer (`lib/rss.ts` used to patch it locally). Anything with a file
 * extension is a file (`/rss.xml`) and gets no slash; query strings and
 * fragments stay after the trailing slash.
 *
 * @example pagePath("/about")            -> "/about/"
 * @example pagePath("/works#sr")         -> "/works/#sr"
 * @example pagePath("/rss.xml")          -> "/rss.xml"
 */
export function pagePath(path = "/"): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  const cut = clean.search(/[?#]/);
  const base = cut === -1 ? clean : clean.slice(0, cut);
  const suffix = cut === -1 ? "" : clean.slice(cut);
  if (base.endsWith("/")) return base + suffix;
  const last = base.slice(base.lastIndexOf("/") + 1);
  return last.includes(".") ? base + suffix : `${base}/${suffix}`;
}

/**
 * Build a page path for a locale (already in the shape the host serves, see `pagePath`).
 * @example localizedPath("zh-CN", "/")      -> "/zh-cn/"
 * @example localizedPath("en", "/about")     -> "/en/about/"
 * @example localizedPath("zh-Hant", "/")     -> "/"
 */
export function localizedPath(locale: Locale, path = "/"): string {
  const prefix = LOCALE_PATH[locale];
  const clean = pagePath(path);
  return prefix ? `/${prefix}${clean}` : clean;
}

/**
 * Strip the locale prefix from a pathname, leaving the logical path.
 * Layout uses it to emit hreflang alternates (linking every language version of
 * the same page).
 * @example stripLocalePrefix("/en/about") -> "/about"
 * @example stripLocalePrefix("/zh-cn/")    -> "/"
 */
export function stripLocalePrefix(pathname: string): string {
  const parts = pathname.split("/").filter(Boolean);
  const first = parts[0]?.toLowerCase();
  for (const locale of LOCALES) {
    const prefix = LOCALE_PATH[locale];
    if (prefix && prefix === first) {
      const rest = parts.slice(1).join("/");
      return rest ? `/${rest}` : "/";
    }
  }
  const rest = parts.join("/");
  return rest ? `/${rest}` : "/";
}

/** Format a date the way the locale writes it (news list and post body). */
export function formatDate(locale: Locale, date: Date): string {
  return new Intl.DateTimeFormat(DATE_LANG[locale], {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}

const BAYER = ["α", "β", "γ", "δ", "ε", "ζ", "η", "θ", "ι"] as const;

/**
 * Chapter mark -- a Bayer letter (alpha, beta, gamma...).
 * A star catalog uses Bayer letters to rank the stars of a constellation from
 * bright to faint; the portal numbers its chapters with them, shared across all
 * locales (Greek letters do not vary by language).
 * @example bayer(1) -> "α"
 */
export function bayer(n: number): string {
  return BAYER[n - 1] ?? String(n);
}

/** Catalog number for a work (HV-01, HV-02, ...). */
export function catalogNo(n: number): string {
  return `HV—${String(n).padStart(2, "0")}`;
}
