/*
  Hoshivel 官方門戶 —— i18n helper（沿用家族 sr-web 的路由策略）。
  預設語言（zh-Hant）掛根 `/`，其餘掛 `/zh-cn`、`/ja`、`/en`。
  以顯式 locale prop 傳遞，SSR 乾淨、無需 client context。
*/

// 帶副檔名（`allowImportingTsExtensions`，見 astro/tsconfigs/base.json）：
// `test/routing.test.mjs` 用 Node 的型別剝除直接載入這支檔案，而那條路徑
// 不做無副檔名解析。少了它，釘住路由形狀的那幾條測試根本跑不起來。
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
 * 把邏輯路徑正規化成**主機真正提供的形狀**。
 *
 * 產物是 `<路徑>/index.html`，所以頁面的網址帶尾斜線——`canonical` 一直是這樣
 * （它取自 `Astro.url.pathname`），而 `stripLocalePrefix()` 用
 * `split("/").filter(Boolean)` 重組，尾斜線一律掉。同一頁因此有了兩種寫法，
 * 而三個症狀都由它而來：
 *
 * 1. **偏好轉址把「同一頁」判成「另一頁」**，轉去沒有尾斜線的那個，
 *    主機 307 轉回來，腳本再跑一次——`hoshivel.com` 的內頁曾經因此無限轉圈。
 * 2. hreflang 與 canonical 指向兩個字串（重複收錄的來源）。
 * 3. 站內每一條內頁連結都少一次尾斜線，於是每一次導覽都先吃一次 307。
 *
 * 所以正規化收在這一層，不在各消費端各補一次（`lib/rss.ts` 先前就是就地補的）。
 * 有副檔名的是檔案（`/rss.xml`），不加；查詢字串與錨點留在尾斜線之後。
 *
 * @example pagePath("/about")            → "/about/"
 * @example pagePath("/works#sr")         → "/works/#sr"
 * @example pagePath("/rss.xml")          → "/rss.xml"
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
 * 產生某語言下的頁面路徑（已是主機提供的形狀，見 `pagePath`）。
 * @example localizedPath("zh-CN", "/")      → "/zh-cn/"
 * @example localizedPath("en", "/about")     → "/en/about/"
 * @example localizedPath("zh-Hant", "/")     → "/"
 */
export function localizedPath(locale: Locale, path = "/"): string {
  const prefix = LOCALE_PATH[locale];
  const clean = pagePath(path);
  return prefix ? `/${prefix}${clean}` : clean;
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
 * 各語系共用（希臘字母不隨語言變）。
 * @example bayer(1) → "α"
 */
export function bayer(n: number): string {
  return BAYER[n - 1] ?? String(n);
}

/** 星表編號（作品：HV—01、HV—02…）。 */
export function catalogNo(n: number): string {
  return `HV—${String(n).padStart(2, "0")}`;
}
