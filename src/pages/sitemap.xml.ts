/*
  /sitemap.xml —— 手捲 sitemap（零依賴），列出全部內容頁並互標 hreflang。
  邏輯頁 × 三語系 ＋ 新聞內頁（以邏輯 slug 跨語系互標）。
  靜態站預渲染為靜態檔；robots.txt 指向此處。
*/
import type { APIRoute } from "astro";
import { LOCALES, localizedPath, HTML_LANG, DEFAULT_LOCALE } from "@/i18n/utils";
import { getNewsForLocale } from "@/lib/news";

export const prerender = true;

// 邏輯頁（與語系無關）；日後新增子頁在此追加即可。
const LOGICAL_PAGES = ["/", "/works", "/about", "/join", "/news"];

export const GET: APIRoute = async ({ site }) => {
  const origin = (site?.href ?? "https://hoshivel.oha.li/").replace(/\/$/, "");
  const abs = (p: string) => `${origin}${p}`;

  // 新聞內頁的邏輯路徑（各語系皆有該 slug 的頁面——缺譯已回退）
  const newsSlugs = (await getNewsForLocale(DEFAULT_LOCALE)).map(
    (p) => `/news/${p.data.slug}`,
  );

  const urls = [...LOGICAL_PAGES, ...newsSlugs]
    .flatMap((logical) =>
      LOCALES.map((l) => {
        const alts = LOCALES.map(
          (a) =>
            `    <xhtml:link rel="alternate" hreflang="${HTML_LANG[a]}" href="${abs(localizedPath(a, logical))}"/>`,
        ).join("\n");
        const xdefault = `    <xhtml:link rel="alternate" hreflang="x-default" href="${abs(localizedPath(DEFAULT_LOCALE, logical))}"/>`;
        return `  <url>\n    <loc>${abs(localizedPath(l, logical))}</loc>\n${alts}\n${xdefault}\n  </url>`;
      }),
    )
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls}\n</urlset>\n`;
  return new Response(xml, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
};
