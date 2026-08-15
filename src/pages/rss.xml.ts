/*
  /rss.xml —— 正體中文（預設語言）的新聞 feed。
  各語系一份，內容由 lib/rss.ts 產生；這裡只綁語言，
  與 pages/news/index.astro 只綁語言的作法一致。
*/
import type { APIRoute } from "astro";
import { newsFeedResponse } from "@/lib/rss";

export const prerender = true;

export const GET: APIRoute = ({ site }) => newsFeedResponse("zh-Hant", site);
