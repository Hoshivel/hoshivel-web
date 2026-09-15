/* /ja/rss.xml -- the Japanese news feed (see lib/rss.ts). */
import type { APIRoute } from "astro";
import { newsFeedResponse } from "@/lib/rss";

export const prerender = true;

export const GET: APIRoute = ({ site }) => newsFeedResponse("ja", site);
