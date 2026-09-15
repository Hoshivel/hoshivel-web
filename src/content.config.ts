/*
  Content collections: news (news and announcements).
  Posts live in **`news/` at the project root** (a sibling of `src/`, so editing a
  post never means going into the code); the build reads them from there (base is
  relative to the project root, i.e. `./news/*.md` under the work path).
  File naming: `<slug>.<locale>.md` (e.g. `hello-hoshivel.zh-hant.md`).
  Every language version of one post shares the frontmatter `slug`; when a
  translation is missing, both the list and the post page fall back to zh-Hant
  (see lib/news.ts).
*/

import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";
import { LOCALES } from "./i18n/ui";

const news = defineCollection({
  loader: glob({
    pattern: "**/*.md",
    base: "./news",
    // By default the frontmatter slug becomes the entry ID, so the language
    // versions overwrite each other. Use the filename (locale suffix included)
    // as the ID instead, leaving slug as the cross-language logical key.
    generateId: ({ entry }) => entry.replace(/\.md$/, ""),
  }),
  schema: z.object({
    /** Logical slug (shared across languages; used in the URL). */
    slug: z.string().regex(/^[a-z0-9-]+$/),
    locale: z.enum(LOCALES),
    title: z.string(),
    summary: z.string(),
    date: z.coerce.date(),
    /** Related work (optional; rendered as a tag). */
    tag: z.string().optional(),
  }),
});

export const collections = { news };
