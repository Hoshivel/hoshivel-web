/*
  新聞資料存取：以「邏輯 slug」聚合各語言版本，
  該語言缺譯時回退 zh-Hant（永不 404、列表不缺項）。
*/

import { getCollection, type CollectionEntry } from "astro:content";
import { DEFAULT_LOCALE, type Locale } from "@/i18n/utils";

export type NewsEntry = CollectionEntry<"news">;

/** 該語言的新聞列表（缺譯回退預設語言），新 → 舊排序。 */
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

/** 單則新聞（該語言版本；缺譯回退預設語言）。 */
export async function getNewsPost(
  locale: Locale,
  slug: string,
): Promise<NewsEntry | undefined> {
  const list = await getNewsForLocale(locale);
  return list.find((e) => e.data.slug === slug);
}
