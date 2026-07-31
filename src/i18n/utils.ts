/*
  Hoshivel 官方門戶 —— i18n helper（沿用家族 sr-web 的路由策略）。
  預設語言（zh-Hant）掛根 `/`，其餘掛 `/zh-cn`、`/en`。
  以顯式 locale prop 傳遞，SSR 乾淨、無需 client context。
*/

import {
  ui,
  LOCALES,
  LOCALE_PATH,
  DEFAULT_LOCALE,
  DATE_LANG,
  type Locale,
  type UIKey,
} from "./ui";

export {
  LOCALES,
  DEFAULT_LOCALE,
  LOCALE_PATH,
  HTML_LANG,
  OG_LOCALE,
  DATE_LANG,
  LOCALE_LABEL,
  LOCALE_SHORT,
  type Locale,
  type UIKey,
} from "./ui";

/** 由 URL pathname 推導目前 locale（找不到前綴 → 預設語言）。 */
export function getLocaleFromPath(pathname: string): Locale {
  const seg = pathname.split("/").filter(Boolean)[0]?.toLowerCase();
  for (const locale of LOCALES) {
    const prefix = LOCALE_PATH[locale];
    if (prefix && prefix === seg) return locale;
  }
  return DEFAULT_LOCALE;
}

/** 取得某語言的翻譯函式：`t("nav.works")`；缺鍵回退預設語言。 */
export function useTranslations(locale: Locale): (key: UIKey) => string {
  return (key) => ui[locale][key] ?? ui[DEFAULT_LOCALE][key];
}

/**
 * 產生某語言下的頁面路徑。
 * @example localizedPath("zh-CN", "/")      → "/zh-cn/"
 * @example localizedPath("en", "/about")     → "/en/about"
 * @example localizedPath("zh-Hant", "/")     → "/"
 */
export function localizedPath(locale: Locale, path = "/"): string {
  const prefix = LOCALE_PATH[locale];
  const clean = path.startsWith("/") ? path : `/${path}`;
  if (!prefix) return clean;
  return clean === "/" ? `/${prefix}/` : `/${prefix}${clean}`;
}

/**
 * 去掉 pathname 上的 locale 前綴，得到「邏輯路徑」。
 * 供 Layout 產生 hreflang 交替連結（把同一頁的各語言版本串起來）。
 * @example stripLocalePrefix("/en/about") → "/about"
 * @example stripLocalePrefix("/zh-cn/")    → "/"
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

/** 以該語言慣例呈現日期（新聞列表 / 內文用）。 */
export function formatDate(locale: Locale, date: Date): string {
  return new Intl.DateTimeFormat(DATE_LANG[locale], {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}

const BAYER = ["α", "β", "γ", "δ", "ε", "ζ", "η", "θ", "ι"] as const;

/**
 * 章節記號 —— 拜耳字母（α β γ…）。
 * 星表以拜耳字母標注一座星座裡由亮到暗的星；門戶以它編章節，
 * 三語共用（希臘字母不隨語言變）。
 * @example bayer(1) → "α"
 */
export function bayer(n: number): string {
  return BAYER[n - 1] ?? String(n);
}

/** 星表編號（作品：HV—01、HV—02…）。 */
export function catalogNo(n: number): string {
  return `HV—${String(n).padStart(2, "0")}`;
}
