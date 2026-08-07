/*
  章節記號 —— 拜耳字母（α β γ δ）的唯一分配處。

  星表以拜耳字母標注一座星座裡由亮到暗的星；門戶以它編章節，順序即導覽順序。
  字母屬於**章節本身**，不屬於它在某一頁上的位置：首頁沒有「關於」一節，
  因此首頁只看得到 α、β、δ——跳過 γ 是對的，不是漏編。

  之所以集中在這裡：先前首頁自己寫 `bayer(3)` 當「加入我們」，獨立頁卻把
  3 給了關於、4 給了加入我們——同一個章節在兩處是不同的字母，而兩邊各自
  看起來都沒錯。新增章節就在這張表加一筆，頁面一律 `chapterMark("…")`。
*/

import { bayer } from "@/i18n/utils";

/** 章節 → 拜耳序號。 */
export const CHAPTER = {
  works: 1,
  news: 2,
  about: 3,
  join: 4,
} as const;

export type ChapterName = keyof typeof CHAPTER;

/** 章節的拜耳記號（各語系共用；希臘字母不隨語言變）。 */
export function chapterMark(name: ChapterName): string {
  return bayer(CHAPTER[name]);
}
