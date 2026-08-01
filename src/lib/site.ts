/*
  Hoshivel 官方門戶 —— 站點層級的組織資訊（唯一來源）。
  網域 / 信箱 / 外部連結改這裡即可，全站引用跟著換。
  （招募職位另見專案根目錄的 `roles.config.ts`；新聞稿見 `news/`。）
*/

/** GitHub 組織頁。 */
export const GITHUB_URL = "https://github.com/Hoshivel";

/** 《碎界 Shattered Realms》官方網站（sr-web 的部署網域）。 */
export const SR_URL = "https://sr.hoshivel.com";

/**
 * Hoshi ID 帳戶中心。
 * 網域取自 hoshi-identity docs/deployment.md 的正式設定範例
 * （HOSHI_PUBLIC_URL=https://id.hoshivel.com）；上線前請確認。
 */
export const HOSHI_ID_URL: string | null = "https://id.hoshivel.com";

/**
 * 對外聯繫信箱（關於 / 加入我們頁使用）。
 * TODO(佔位)：上線前請確認並換成真實信箱。
 */
export const CONTACT_EMAIL = "contact@hoshivel.com";

/** 社群平台識別（決定要畫哪個圖示；新增平台需同步 SocialLinks.astro）。 */
export type SocialId = "x" | "youtube" | "github" | "reddit";

export interface SocialLink {
  id: SocialId;
  /** 平台名（品牌專名，三語通用，不進 i18n 字典）。 */
  label: string;
  /** 帳號呈現形式（如 @hoshivel、u/hoshivel）。 */
  handle: string;
  url: string;
}

/**
 * 社群入口（唯一來源）—— 四個平台皆為 hoshivel 帳號。
 * 增減平台改這裡；順序即呈現順序。
 */
export const SOCIAL_LINKS: SocialLink[] = [
  { id: "x", label: "X", handle: "@hoshivel", url: "https://x.com/hoshivel" },
  {
    id: "youtube",
    label: "YouTube",
    handle: "@hoshivel",
    url: "https://www.youtube.com/@hoshivel",
  },
  { id: "github", label: "GitHub", handle: "Hoshivel", url: GITHUB_URL },
  {
    id: "reddit",
    label: "Reddit",
    handle: "u/hoshivel",
    url: "https://www.reddit.com/user/hoshivel",
  },
];
