/*
  協作設定 —— 「加入我們」頁面上「目前的協作方向」的唯一來源。

  刻意放在專案根目錄（與 `src/`、`news/` 平級）：這裡調整頻繁，
  不必進到程式碼裡改。增刪一個方向＝只改這一個檔，三語文案就地寫齊，
  不再散落到 `src/i18n/ui.ts` 的字典鍵。

  ── 常用操作 ────────────────────────────────────────────
  · 新增：在 ROLES 陣列尾端加一筆（zh-Hant 必填，其餘缺了自動回退）
  · 暫時下架：該筆加 `open: false`（保留資料，頁面不顯示）
  · 長期夥伴（非按件協作）：該筆加 `kind: "partner"`
  · 全站預設型態：改 DEFAULT_ROLE_KIND
  ─────────────────────────────────────────────────────
  （聯繫信箱與社群連結見 `src/lib/site.ts`；此檔不依賴任何模組。）
*/

/**
 * 協作型態。
 * `collab`  協作——按件、短期專案或彈性兼職，範圍與報酬先談清楚再開始（預設）。
 * `partner` 長期夥伴——參與作品方向、長期同行；通常由既有協作延續而來。
 */
export type RoleKind = "collab" | "partner";

/** 未標註 `kind` 的位置一律視為協作。 */
export const DEFAULT_ROLE_KIND: RoleKind = "collab";

/** 一個位置的文案（單一語言）。 */
export interface RoleText {
  /** 職稱（如「視覺與美術協作者」）。 */
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
  /** 協作型態；省略＝ DEFAULT_ROLE_KIND（協作）。 */
  kind?: RoleKind;
  /** 是否公開；省略＝公開。設 `false` 可暫時下架而不刪資料。 */
  open?: boolean;
  text: RoleTextByLocale;
}

export const ROLES: RoleEntry[] = [
  {
    id: "visual-art",
    text: {
      "zh-Hant": {
        title: "視覺與美術協作者",
        area: "碎界 Shattered Realms · 立繪與視覺",
        desc: "參與角色立繪、宣傳素材、場景概念與視覺風格的整理。數位繪製或 AI 輔助流程都可以，我們看重的是明確的美術判斷、後期修整的能力，以及讓整個世界看起來是同一個世界的意識。",
        skills: "角色立繪 · 場景與概念 · 後期修整 · 風格一致性",
      },
      "zh-CN": {
        title: "视觉与美术协作者",
        area: "碎界 Shattered Realms · 立绘与视觉",
        desc: "参与角色立绘、宣传素材、场景概念与视觉风格的整理。数字绘制或 AI 辅助流程都可以，我们看重的是明确的美术判断、后期修整的能力，以及让整个世界看起来是同一个世界的意识。",
        skills: "角色立绘 · 场景与概念 · 后期修整 · 风格一致性",
      },
      en: {
        title: "Visual & art collaborator",
        area: "Shattered Realms · character art and visual direction",
        desc: "Character illustration, promotional art, scene concepts, and keeping the visual language coherent. Digital painting or AI-assisted workflows are both fine — what we look for is clear art judgement, the skill to finish and retouch, and an eye for keeping one world looking like one world.",
        skills: "Character art · Scenes & concepts · Retouching · Consistency",
      },
    },
  },
  {
    id: "promo-content",
    text: {
      "zh-Hant": {
        title: "宣發與內容協作者",
        area: "碎界 Shattered Realms · 內容宣傳與社群",
        desc: "參與作品對外內容的規劃與製作，包括社群內容、宣傳文案、短片與素材整理、發布節奏，以及與玩家的日常溝通。我們不追求單純堆曝光或追逐熱點，更希望找到能真正理解作品、知道該如何把它介紹給玩家的人。",
        skills: "社群內容 · 宣傳文案 · 短片剪輯 · 發布規劃 · 玩家溝通",
      },
      "zh-CN": {
        title: "宣发与内容协作者",
        area: "碎界 Shattered Realms · 内容宣传与社区",
        desc: "参与作品对外内容的规划与制作，包括社区内容、宣传文案、短片与素材整理、发布节奏，以及与玩家的日常沟通。我们不追求单纯堆曝光或追逐热点，更希望找到能真正理解作品、知道该如何把它介绍给玩家的人。",
        skills: "社区内容 · 宣传文案 · 短片剪辑 · 发布规划 · 玩家沟通",
      },
      en: {
        title: "Marketing & content collaborator",
        area: "Shattered Realms · content, promotion and community",
        desc: "Planning and making the work's outward-facing content: community posts, promotional copy, short video and asset wrangling, release cadence, and the day-to-day conversation with players. We aren't chasing raw impressions or whatever is trending — we're looking for someone who genuinely understands the work and knows how to introduce it to players.",
        skills:
          "Community content · Promo copy · Short-form video · Release planning · Player comms",
      },
    },
  },
  {
    id: "tech-partner",
    kind: "partner",
    text: {
      "zh-Hant": {
        title: "長期技術夥伴",
        area: "核心後端與基礎服務",
        desc: "核心後端與基礎服務暫時不以一般兼職的方式擴張。若你曾與我們完成過實際的專案，也希望長期參與作品的方向，歡迎進一步聊聊加入核心團隊。",
        skills: "Go · 長期投入 · 有共同完成過的專案",
      },
      "zh-CN": {
        title: "长期技术伙伴",
        area: "核心后端与基础服务",
        desc: "核心后端与基础服务暂时不以一般兼职的方式扩张。若你曾与我们完成过实际的项目，也希望长期参与作品的方向，欢迎进一步聊聊加入核心团队。",
        skills: "Go · 长期投入 · 有共同完成过的项目",
      },
      en: {
        title: "Long-term technical partner",
        area: "Core back-end & platform services",
        desc: "We aren't expanding the core back-end and platform services through ordinary part-time work for now. If you've already shipped something real with us and want a long-term hand in where the work goes, let's talk about joining the core team.",
        skills: "Go · Long-term commitment · A project finished together",
      },
    },
  },
];
