/*
  Role configuration -- the single source for "current collaboration directions"
  on the Join page.

  Deliberately kept at the project root (a sibling of `src/` and `news/`): this
  changes often and editing it should not mean going into the code. Adding or
  removing a direction means editing this one file, with all four languages
  written in place rather than scattered across dictionary keys in
  `src/i18n/ui.ts`.

  -- Common operations --------------------------------------------------------
  - Add: append an entry to the ROLES array (zh-Hant is required, the rest fall
    back automatically when missing)
  - Take down temporarily: add `open: false` to that entry (keeps the data,
    hides it from the page)
  - Long-term partner (not per-project collaboration): add `kind: "partner"`
  - Site-wide default kind: change DEFAULT_ROLE_KIND
  -----------------------------------------------------------------------------
  (Contact mailbox and social links live in `src/lib/site.ts`; this file depends
  on no module.)
*/

/**
 * Kind of role.
 * `collab`  Collaboration -- per-project, short-term or flexible part-time, with
 *           scope and compensation settled before starting (the default).
 * `partner` Long-term partner -- involved in a work's direction and in it for
 *           the long run; usually grown out of an existing collaboration.
 */
export type RoleKind = "collab" | "partner";

/** A position with no `kind` is treated as collaboration. */
export const DEFAULT_ROLE_KIND: RoleKind = "collab";

/** The copy for one position, in a single language. */
export interface RoleText {
  /** Title (e.g. 「視覺與美術協作者」). */
  title: string;
  /** Scope it belongs to (a work or a discipline). */
  area: string;
  /** What this position does (two or three sentences). */
  desc: string;
  /** Skills we hope for, separated by " · ". */
  skills: string;
}

/** Copy in all four languages; zh-Hant is authoritative and the rest fall back when untranslated. */
export interface RoleTextByLocale {
  "zh-Hant": RoleText;
  "zh-CN"?: RoleText;
  ja?: RoleText;
  en?: RoleText;
}

export interface RoleEntry {
  /** Stable identifier (used by the in-page anchor `#id` and the mailto subject; lowercase alphanumerics and hyphens). */
  id: string;
  /** Kind of role; omitted means DEFAULT_ROLE_KIND (collaboration). */
  kind?: RoleKind;
  /** Whether it is public; omitted means public. Set `false` to take it down temporarily without deleting the data. */
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
        area: "砕界 Shattered Realms · キャラクターアートとビジュアル",
        desc: "『砕界』のキャラクターアート、シーンコンセプト、宣伝素材に携わり、一貫したビジュアルを形にする役割です。制作手法よりも、アートの判断力、完成度、世界全体の統一感を重視します。",
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
        title: "宣傳與內容協作者",
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
        area: "砕界 Shattered Realms · コンテンツ宣伝とコミュニティ",
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
