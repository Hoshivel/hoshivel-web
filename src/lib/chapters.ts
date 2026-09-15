/*
  Chapter marks -- the one place Bayer letters (alpha beta gamma delta) are assigned.

  A star catalog uses Bayer letters to rank the stars of a constellation from
  bright to faint; the portal uses them to number chapters, and that order is the
  navigation order. The letter belongs to the **chapter itself**, not to its
  position on any one page: the home page has no "About" section, so it shows
  only alpha, beta and delta -- skipping gamma is correct, not a gap.

  Why this is centralized: the home page once wrote `bayer(3)` for "Join", while
  the standalone pages gave 3 to About and 4 to Join -- the same chapter carried
  different letters in two places, and each side looked right on its own. Add a
  chapter by adding a row here; pages always call `chapterMark("...")`.
*/

import { bayer } from "@/i18n/utils";

/** Chapter -> Bayer ordinal. */
export const CHAPTER = {
  works: 1,
  news: 2,
  about: 3,
  join: 4,
} as const;

export type ChapterName = keyof typeof CHAPTER;

/** The chapter's Bayer mark (shared across locales; Greek letters do not vary by language). */
export function chapterMark(name: ChapterName): string {
  return bayer(CHAPTER[name]);
}
