/* /zh-cn/rss.xml —— 简体中文的新聞 feed（見 lib/rss.ts）。 */
import type { APIRoute } from "astro";
import { newsFeedResponse } from "@/lib/rss";

export const prerender = true;

export const GET: APIRoute = ({ site }) => newsFeedResponse("zh-CN", site);
