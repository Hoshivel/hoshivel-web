/*
  新聞 RSS —— 手捲 RSS 2.0（零依賴），與 pages/sitemap.xml.ts 同慣例：
  站台 URL 取自 `Astro.site`、內容取自 lib/news.ts、`Content-Type` 明寫 charset。

  **每個語系一份 feed**：預設語言在 `/rss.xml`，其餘在 `/{lang}/rss.xml`。
  一則新聞有四個語言檔，混成一份 feed 的話訂閱者每則消息會收到四次，
  其中三次他讀不懂——feed 沒有語言切換器，這件事只能在訂閱時決定。

  **RSS 2.0 而不是 Atom**：本站的 feed 是一列「標題＋摘要＋連結」，
  用不到 Atom 的多作者、多連結關係與內嵌內容模型；而 RSS 2.0 的 `<language>`
  剛好對上「一個語系一份」這個決定。`atom:link rel="self"` 是 RSS 2.0 缺的
  那一項（feed 說不出自己在哪裡），照慣例借 Atom 命名空間補上。
*/

import { getNewsForLocale } from "@/lib/news";
import {
  useTranslations,
  localizedPath,
  HTML_LANG,
  type Locale,
} from "@/i18n/utils";

/** 該語系 feed 的站內路徑（Layout 的自動探索連結與 `atom:link` 共用）。 */
export function newsFeedPath(locale: Locale): string {
  return localizedPath(locale, "/rss.xml");
}

/** Feed 標題；沿用 Layout 的頁名慣例（`頁名 — 站名`）。 */
export function newsFeedTitle(locale: Locale): string {
  const t = useTranslations(locale);
  return `${t("news.title")} — ${t("site.name")}`;
}

/**
 * XML 逸出。文字節點與屬性值共用同一份：`"` 與 `'` 只有屬性值需要，
 * 在文字節點多逸出無害，而少逸出一處就是一份壞掉的 feed。
 * `&` 必須第一個換，否則會把後面幾個換出來的實體再逸出一次。
 */
function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

/**
 * RSS 2.0 的 `pubDate` 要 RFC 822 日期（`Sat, 26 Jul 2026 12:00:00 GMT`）。
 * `toUTCString()` 的輸出格式由 ECMAScript 規定死，不隨系統語系或時區改變——
 * 所以這裡不自己排一份月份縮寫表，那才是會在別臺機器上長不一樣的寫法。
 */
function rfc822(date: Date): string {
  return date.toUTCString();
}

/** 產生某語系的新聞 feed（靜態站在建置期就寫成檔案）。 */
export async function newsFeedResponse(
  locale: Locale,
  site: URL | undefined,
): Promise<Response> {
  const t = useTranslations(locale);
  const origin = (site?.href ?? "https://hoshivel.com/").replace(/\/$/, "");
  const abs = (path: string) => `${origin}${path}`;

  // 內頁 URL 一律帶尾斜線，與 Layout 的 canonical 一致（產物是
  // `<路徑>/index.html`）。少了它，讀者從閱讀器點進來要多吃一次轉址，
  // 而 guid 也就和 canonical 對不上——那正是重複收錄的來源。
  const pageUrl = (logical: string) =>
    abs(localizedPath(locale, logical).replace(/\/?$/, "/"));

  const posts = await getNewsForLocale(locale);

  const items = posts
    .map((post) => {
      const url = pageUrl(`/news/${post.data.slug}`);
      // description 只放摘要，不放全文：稿件的 HTML 帶站內相對連結，
      // 搬進閱讀器就指不到東西，而重寫它們要連圖片與錨點一起處理。
      // 摘要本來就是為了列表卡片寫的一句話，拿來當 feed 摘要剛好。
      const category = post.data.tag
        ? `\n      <category>${escapeXml(post.data.tag)}</category>`
        : "";
      return [
        "    <item>",
        `      <title>${escapeXml(post.data.title)}</title>`,
        `      <link>${escapeXml(url)}</link>`,
        `      <guid isPermaLink="true">${escapeXml(url)}</guid>`,
        `      <pubDate>${rfc822(post.data.date)}</pubDate>`,
        `      <description>${escapeXml(post.data.summary)}</description>${category}`,
        "    </item>",
      ].join("\n");
    })
    .join("\n");

  // lastBuildDate 取最新一則的日期，不取建置時間：後者會讓每一次重建都產出
  // 一份「有變動」的 feed，而內容一個字都沒改。
  const latest = posts[0]?.data.date;
  const lastBuild = latest
    ? `\n    <lastBuildDate>${rfc822(latest)}</lastBuildDate>`
    : "";

  const xml =
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">\n` +
    `  <channel>\n` +
    `    <title>${escapeXml(newsFeedTitle(locale))}</title>\n` +
    `    <link>${escapeXml(pageUrl("/news"))}</link>\n` +
    `    <description>${escapeXml(t("news.lead"))}</description>\n` +
    `    <language>${HTML_LANG[locale]}</language>${lastBuild}\n` +
    `    <atom:link href="${escapeXml(abs(newsFeedPath(locale)))}" rel="self" type="application/rss+xml"/>\n` +
    (items ? `${items}\n` : "") +
    `  </channel>\n` +
    `</rss>\n`;

  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
