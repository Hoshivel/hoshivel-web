/*
  內容集合：news（新聞 / 公告）。
  稿件放在**專案根目錄的 `news/`**（與 `src/` 平級，不必進到程式碼裡改稿）；
  建置時由此讀入（base 相對於專案根，即 work path 的 `./news/*.md`）。
  檔名慣例：`<slug>.<locale>.md`（如 `hello-hoshivel.zh-hant.md`）。
  同一則新聞的各語言版本共用 frontmatter 的 `slug`；
  某語言缺譯時，列表與內頁自動回退 zh-Hant（見 lib/news.ts）。
*/

import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";
import { LOCALES } from "./i18n/ui";

const news = defineCollection({
  loader: glob({
    pattern: "**/*.md",
    base: "./news",
    // 預設會拿 frontmatter 的 slug 當條目 ID → 三個語言版本互相覆蓋。
    // 改以檔名（含 locale 後綴）為 ID，slug 僅作為跨語言的邏輯鍵。
    generateId: ({ entry }) => entry.replace(/\.md$/, ""),
  }),
  schema: z.object({
    /** 邏輯 slug（跨語言共用；URL 用）。 */
    slug: z.string().regex(/^[a-z0-9-]+$/),
    locale: z.enum(LOCALES),
    title: z.string(),
    summary: z.string(),
    date: z.coerce.date(),
    /** 相關作品（可選；顯示為標籤）。 */
    tag: z.string().optional(),
  }),
});

export const collections = { news };
