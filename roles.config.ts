/*
  招募設定 —— 「加入我們」職位資訊的唯一來源。

  刻意放在專案根目錄（與 `src/`、`news/` 平級）：招募調整頻繁，
  不必進到程式碼裡改。增刪一個位置＝只改這一個檔，三語文案就地寫齊，
  不再散落到 `src/i18n/ui.ts` 的字典鍵。

  ── 常用操作 ────────────────────────────────────────────
  · 新增：在 ROLES 陣列尾端加一筆（zh-Hant 必填，其餘缺了自動回退）
  · 暫時下架：該筆加 `open: false`（保留資料，頁面不顯示）
  · 一般職缺（非合夥）：該筆加 `kind: "hire"`
  · 全站預設招募型態：改 DEFAULT_ROLE_KIND
  ─────────────────────────────────────────────────────
  （聯繫信箱與社群連結見 `src/lib/site.ts`；此檔不依賴任何模組。）
*/

/**
 * 招募型態。
 * `partner` 合夥人——共同決定要做什麼、共同承擔結果（Hoshivel 的預設）。
 * `hire` 一般職缺——明確分工的受聘角色。
 */
export type RoleKind = "partner" | "hire";

/** 未標註 `kind` 的位置一律視為合夥人。 */
export const DEFAULT_ROLE_KIND: RoleKind = "partner";

/** 一個位置的文案（單一語言）。 */
export interface RoleText {
  /** 職稱（如「美術合夥人」）。 */
  title: string;
  /** 所屬範疇（作品或領域）。 */
  area: string;
  /** 這個位置在做什麼（2～3 句）。 */
  desc: string;
  /** 期待的能力，以「 · 」分隔。 */
  skills: string;
}

/** 三語文案；zh-Hant 為權威版本，其餘缺譯時自動回退。 */
export interface RoleTextByLocale {
  "zh-Hant": RoleText;
  "zh-CN"?: RoleText;
  en?: RoleText;
}

export interface RoleEntry {
  /** 穩定識別（頁內錨點 `#id` 與 mailto 主旨用；小寫英數與連字號）。 */
  id: string;
  /** 招募型態；省略＝ DEFAULT_ROLE_KIND（合夥人）。 */
  kind?: RoleKind;
  /** 是否公開；省略＝公開。設 `false` 可暫時下架而不刪資料。 */
  open?: boolean;
  text: RoleTextByLocale;
}

export const ROLES: RoleEntry[] = [
  {
    id: "artist-2d",
    text: {
      "zh-Hant": {
        title: "美術合夥人",
        area: "碎界 Shattered Realms · 2D／立繪",
        desc: "為《碎界》的英雄與章節世界定調——立繪、關鍵美術，以及整個世界該長什麼樣子。目前全站以程序化圖形佔位，等的就是你的筆。",
        skills: "角色立繪 · 世界觀美術 · 熱愛 2D 遊戲美術",
      },
      "zh-CN": {
        title: "美术合伙人",
        area: "碎界 Shattered Realms · 2D／立绘",
        desc: "为《碎界》的英雄与章节世界定调——立绘、关键美术，以及整个世界该长什么样子。目前全站以程序化图形占位，等的就是你的笔。",
        skills: "角色立绘 · 世界观美术 · 热爱 2D 游戏美术",
      },
      en: {
        title: "Art Partner",
        area: "Shattered Realms · 2D & character art",
        desc: "Set the visual key of Shattered Realms — hero portraits, key art, and what the whole world should look like. Today the site runs on procedural placeholders, waiting for your brush.",
        skills: "Character illustration · World art · A love for 2D game art",
      },
    },
  },
  {
    id: "frontend-gameplay",
    text: {
      "zh-Hant": {
        title: "前端／玩法合夥人",
        area: "碎界與官網家族",
        desc: "以 TypeScript 打造遊戲前端與官網體驗：從六角棋盤的互動手感，到靜態站的細節打磨。玩法怎麼摸起來對，由你和我們一起決定。",
        skills: "TypeScript · React 或 Astro · 在意效能與可存取性",
      },
      "zh-CN": {
        title: "前端／玩法合伙人",
        area: "碎界与官网家族",
        desc: "以 TypeScript 打造游戏前端与官网体验：从六角棋盘的交互手感，到静态站的细节打磨。玩法怎么摸起来对，由你和我们一起决定。",
        skills: "TypeScript · React 或 Astro · 在意性能与可访问性",
      },
      en: {
        title: "Front-end / Gameplay Partner",
        area: "Shattered Realms & the web family",
        desc: "Build the game front-end and our web experiences in TypeScript — from the feel of hex-board interaction to the fine details of static sites. How the game should feel is a call we make together.",
        skills: "TypeScript · React or Astro · Care for performance and accessibility",
      },
    },
  },
  {
    id: "backend",
    text: {
      "zh-Hant": {
        title: "後端合夥人",
        area: "Hoshi ID 與遊戲服務",
        desc: "用 Go 打造帳號、分流與遊戲伺服器等長期運行的服務——小而可靠，不堆多餘相依。這是撐住作品的地基，架構得一起想清楚。",
        skills: "Go · 分散式基礎 · 重視簡潔與可維運性",
      },
      "zh-CN": {
        title: "后端合伙人",
        area: "Hoshi ID 与游戏服务",
        desc: "用 Go 打造账号、分流与游戏服务器等长期运行的服务——小而可靠，不堆多余依赖。这是撑住作品的地基，架构得一起想清楚。",
        skills: "Go · 分布式基础 · 重视简洁与可运维性",
      },
      en: {
        title: "Back-end Partner",
        area: "Hoshi ID & game services",
        desc: "Build long-running services in Go — accounts, routing, game servers. Small, reliable, no excess dependencies. This is the ground the work stands on; the architecture is something we think through together.",
        skills: "Go · Distributed fundamentals · A taste for simplicity and operability",
      },
    },
  },
];
