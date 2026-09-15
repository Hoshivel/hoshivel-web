/*
  News RSS -- hand-rolled RSS 2.0 (zero dependencies), following the same
  conventions as pages/sitemap.xml.ts: the site URL comes from `Astro.site`, the
  content from lib/news.ts, and `Content-Type` spells out the charset.

  **One feed per locale**: the default language at `/rss.xml`, the rest at
  `/{lang}/rss.xml`. A post exists as four language files; merged into one feed a
  subscriber would receive every announcement four times, three of them
  unreadable to them -- a feed has no language switcher, so this can only be
  decided at subscribe time.

  **RSS 2.0 rather than Atom**: this feed is a list of title, summary and link.
  It needs none of Atom's multiple authors, link relations or embedded content
  model, and RSS 2.0's `<language>` maps exactly onto the one-feed-per-locale
  decision. `atom:link rel="self"` is the one thing RSS 2.0 lacks (a feed cannot
  state where it lives), so it is borrowed from the Atom namespace as is customary.
*/

import { getNewsForLocale } from "@/lib/news";
import {
  useTranslations,
  localizedPath,
  HTML_LANG,
  type Locale,
} from "@/i18n/utils";

/** Site path of a locale's feed (shared by Layout's autodiscovery link and `atom:link`). */
export function newsFeedPath(locale: Locale): string {
  return localizedPath(locale, "/rss.xml");
}

/** Feed title, following Layout's page-name convention (`page — site`). */
export function newsFeedTitle(locale: Locale): string {
  const t = useTranslations(locale);
  return `${t("news.title")} — ${t("site.name")}`;
}

/**
 * XML escaping. Text nodes and attribute values share one routine: `"` and `'`
 * are only required inside attribute values, but over-escaping a text node is
 * harmless while under-escaping one place is a broken feed.
 * `&` must be replaced first, or it would re-escape the entities the later
 * replacements produce.
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
 * RSS 2.0 wants an RFC 822 `pubDate` (`Sat, 26 Jul 2026 12:00:00 GMT`).
 * ECMAScript pins the output format of `toUTCString()`, so it does not vary with
 * the system locale or time zone -- which is why there is no hand-written month
 * abbreviation table here; that is the version that would render differently on
 * another machine.
 */
function rfc822(date: Date): string {
  return date.toUTCString();
}

/** Build the news feed for a locale (a static site writes it out at build time). */
export async function newsFeedResponse(
  locale: Locale,
  site: URL | undefined,
): Promise<Response> {
  const t = useTranslations(locale);
  const origin = (site?.href ?? "https://hoshivel.com/").replace(/\/$/, "");
  const abs = (path: string) => `${origin}${path}`;

  // Page URLs carry a trailing slash (the build emits `<path>/index.html`), so
  // they match canonical: without it a reader clicking through from their feed
  // reader pays for a redirect, and the guid no longer equals canonical -- which
  // is exactly where duplicate indexing comes from. `localizedPath` adds the
  // slash (see `pagePath` in i18n/utils.ts); this file used to patch it locally,
  // which was the same fix applied at the wrong layer.
  const pageUrl = (logical: string) => abs(localizedPath(locale, logical));

  const posts = await getNewsForLocale(locale);

  const items = posts
    .map((post) => {
      const url = pageUrl(`/news/${post.data.slug}`);
      // description carries the summary, not the full text: a post's HTML holds
      // site-relative links that point nowhere once they are in a feed reader,
      // and rewriting them would mean handling images and anchors too. The
      // summary is already the one sentence written for the list card, which is
      // exactly what a feed description wants.
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

  // lastBuildDate is the newest post's date, not the build time: the latter
  // would make every rebuild emit a feed that "changed" without a single word
  // of the content differing.
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
