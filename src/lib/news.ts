/*
  News data access: group each language's version under one logical slug and
  fall back to zh-Hant when a translation is missing (never 404, never a gap in the list).
*/

import { getCollection, type CollectionEntry } from "astro:content";
import { DEFAULT_LOCALE, type Locale } from "@/i18n/utils";

export type NewsEntry = CollectionEntry<"news">;

/** News list for a locale (falls back to the default locale), newest first. */
export async function getNewsForLocale(locale: Locale): Promise<NewsEntry[]> {
  const all = await getCollection("news");
  const bySlug = new Map<string, NewsEntry[]>();
  for (const entry of all) {
    const list = bySlug.get(entry.data.slug) ?? [];
    list.push(entry);
    bySlug.set(entry.data.slug, list);
  }

  const picked: NewsEntry[] = [];
  for (const versions of bySlug.values()) {
    const hit =
      versions.find((v) => v.data.locale === locale) ??
      versions.find((v) => v.data.locale === DEFAULT_LOCALE) ??
      versions[0];
    if (hit) picked.push(hit);
  }

  return picked.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

/** A single news post in this locale (falls back to the default locale). */
export async function getNewsPost(
  locale: Locale,
  slug: string,
): Promise<NewsEntry | undefined> {
  const list = await getNewsForLocale(locale);
  return list.find((e) => e.data.slug === slug);
}
