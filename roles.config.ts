/*
  協作設定 —— 「加入我們」頁面上「目前的協作方向」的唯一來源。

  刻意放在專案根目錄（與 `src/`、`news/` 平級）：這裡調整頻繁，
  不必進到程式碼裡改。增刪一個方向＝只改這一個檔，四語文案就地寫齊，
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

/** 四語文案；zh-Hant 為權威版本，其餘缺譯時自動回退。 */
export interface RoleTextByLocale {
  "zh-Hant": RoleText;
  "zh-CN"?: RoleText;
  ja?: RoleText;
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
        desc: "參與《碎界》的角色立繪、場景概念與宣傳素材，讓它們形成一致的視覺語言。我們接受不同創作流程，更重視美術判斷、完成度與整體一致性。",
        skills: "角色立繪 · 場景與概念 · 後期修整 · 風格一致性",
      },
      "zh-CN": {
        title: "视觉与美术协作者",
        area: "碎界 Shattered Realms · 立绘与视觉",
        desc: "参与《碎界》的角色立绘、场景概念与宣传素材，让它们形成一致的视觉语言。我们接受不同创作流程，更重视美术判断、完成度与整体一致性。",
        skills: "角色立绘 · 场景与概念 · 后期修整 · 风格一致性",
      },
      ja: {
        title: "ビジュアルアーティスト",
        area: "Shattered Realms · キャラクターアートとビジュアル",
        desc: "『Shattered Realms』のキャラクターアート、シーンコンセプト、宣伝素材に携わり、一貫したビジュアルを形にする役割です。制作手法よりも、アートの判断力、完成度、世界全体の統一感を重視します。",
        skills: "キャラクターアート · シーンとコンセプト · 仕上げ · 統一感",
      },
      en: {
        title: "Visual & art collaborator",
        area: "Shattered Realms · character art and visual direction",
        desc: "Help shape a coherent visual language for Shattered Realms across character art, scene concepts and promotional assets. We care more about art judgment, finish and consistency than any particular production method.",
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
        desc: "規劃與製作社群內容、宣傳文案、短片與發布節奏，並參與玩家溝通。我們重視對作品的理解，以及把它清楚介紹給合適玩家的能力。",
        skills: "社群內容 · 宣傳文案 · 短片剪輯 · 發布規劃 · 玩家溝通",
      },
      "zh-CN": {
        title: "宣发与内容协作者",
        area: "碎界 Shattered Realms · 内容宣传与社区",
        desc: "规划与制作社区内容、宣传文案、短片与发布节奏，并参与玩家沟通。我们重视对作品的理解，以及把它清楚介绍给合适玩家的能力。",
        skills: "社区内容 · 宣传文案 · 短片剪辑 · 发布规划 · 玩家沟通",
      },
      ja: {
        title: "広報・コンテンツ制作",
        area: "Shattered Realms · コンテンツ宣伝とコミュニティ",
        desc: "コミュニティ投稿、宣伝文、短尺動画、公開のペースを企画・制作し、プレイヤーとのやり取りにも関わる役割です。作品を理解し、ふさわしいプレイヤーへ明確に伝える力を重視します。",
        skills:
          "コミュニティ運用 · 宣伝文 · 短尺動画 · 公開計画 · プレイヤー対応",
      },
      en: {
        title: "Marketing & content collaborator",
        area: "Shattered Realms · content, promotion and community",
        desc: "Plan and create community posts, promotional copy, short videos and release cadence, while taking part in player communication. We value a real understanding of the work and the ability to introduce it clearly to the right players.",
        skills:
          "Community content · Promo copy · Short-form video · Release planning · Player communication",
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
        desc: "這個方向只對曾與我們完成實際專案、希望長期參與作品決策的人開放。如果彼此已有合作基礎，歡迎聊聊加入核心團隊。",
        skills: "Go · 長期投入 · 有共同完成過的專案",
      },
      "zh-CN": {
        title: "长期技术伙伴",
        area: "核心后端与基础服务",
        desc: "这个方向只对曾与我们完成实际项目、希望长期参与作品决策的人开放。如果彼此已有合作基础，欢迎聊聊加入核心团队。",
        skills: "Go · 长期投入 · 有共同完成过的项目",
      },
      ja: {
        title: "長期技術パートナー",
        area: "コアバックエンドと基盤サービス",
        desc: "この役割は、私たちと実際のプロジェクトを完成させた経験があり、作品の判断に長く関わりたい方を対象としています。すでに一緒に取り組んだ経験がある方は、コアチームへの参加についてお話ししましょう。",
        skills: "Go · 長期的な関与 · 一緒に完成させたプロジェクト",
      },
      en: {
        title: "Long-term technical partner",
        area: "Core back-end & platform services",
        desc: "This path is for people who have already shipped a real project with us and want a long-term hand in the work's direction. If that foundation is already there, let's talk about joining the core team.",
        skills: "Go · Long-term commitment · A project finished together",
      },
    },
  },
];
