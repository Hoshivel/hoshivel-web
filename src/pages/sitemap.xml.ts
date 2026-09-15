/*
  /sitemap.xml -- hand-rolled sitemap (zero dependencies) listing every content
  page with hreflang alternates between them.
  Logical pages x four locales, plus news post pages (cross-linked by logical
  slug). The static site prerenders this to a file; robots.txt points here.
*/
import type { APIRoute } from "astro";
import { LOCALES, localizedPath, HTML_LANG, DEFAULT_LOCALE } from "@/i18n/utils";
import { getNewsForLocale } from "@/lib/news";

export const prerender = true;

// Logical pages (locale-independent); add a new subpage here.
const LOGICAL_PAGES = ["/", "/works", "/about", "/join", "/news"];

export const GET: APIRoute = async ({ site }) => {
  const origin = (site?.href ?? "https://hoshivel.com/").replace(/\/$/, "");
  const abs = (p: string) => `${origin}${p}`;

  // Logical paths of news posts (every locale has a page for the slug -- missing translations already fell back)
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
