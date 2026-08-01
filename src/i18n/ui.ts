/*
  Hoshivel 官方門戶 —— 介面文案字典（三語）。

  慣例沿用家族（sr-web）：zh-Hant 為主語言與鍵的權威來源；
  zh-CN / en 逐鍵齊備（型別強制完整，缺鍵編譯不過）。
  品牌語彙：「以星為帆」——hoshi（星）＋ velum（帆）。
*/

export const LOCALES = ["zh-Hant", "zh-CN", "en"] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "zh-Hant";

/** URL 路徑前綴（預設語言掛根，其餘掛子路徑）。 */
export const LOCALE_PATH: Record<Locale, string> = {
  "zh-Hant": "",
  "zh-CN": "zh-cn",
  en: "en",
};

/** `<html lang>` 屬性值。 */
export const HTML_LANG: Record<Locale, string> = {
  "zh-Hant": "zh-Hant",
  "zh-CN": "zh-CN",
  en: "en",
};

/** `og:locale` 值。 */
export const OG_LOCALE: Record<Locale, string> = {
  "zh-Hant": "zh_Hant",
  "zh-CN": "zh_CN",
  en: "en_US",
};

/** 日期呈現用的 BCP-47 標籤。 */
export const DATE_LANG: Record<Locale, string> = {
  "zh-Hant": "zh-Hant-TW",
  "zh-CN": "zh-Hans-CN",
  en: "en-US",
};

/** 語言切換器顯示名（各以自身語言書寫）。 */
export const LOCALE_LABEL: Record<Locale, string> = {
  "zh-Hant": "正體中文",
  "zh-CN": "简体中文",
  en: "English",
};

/** 精簡標籤（header 語言切換器用；完整名放 title/aria-label）。 */
export const LOCALE_SHORT: Record<Locale, string> = {
  "zh-Hant": "繁",
  "zh-CN": "简",
  en: "EN",
};

// zh-Hant 為鍵的權威來源；其餘語言以 Record<UIKey, string> 強制對齊。
const zhHant = {
  "site.name": "Hoshivel",
  "site.tagline": "少做，做好，做久",
  "site.summary":
    "Hoshivel 是一個獨立遊戲與網路服務開發組織，打造架空世界觀回合制策略遊戲《碎界 Shattered Realms》與通用帳戶服務 Hoshi ID。",

  "nav.works": "作品",
  "nav.news": "新聞",
  "nav.about": "關於",
  "nav.join": "加入我們",

  "cta.works": "探索作品",
  "cta.about": "認識我們",
  "cta.visit": "前往官網",
  "cta.detail": "作品詳情",
  "cta.allNews": "所有新聞",
  "cta.join": "查看合夥人招募",

  "a11y.skip": "跳到主要內容",
  "a11y.langMenu": "切換語言",
  "a11y.home": "回首頁",
  "a11y.menu": "選單",
  "a11y.external": "（外部連結，另開新視窗）",

  "footer.summary": "一間獨立工作室，把遊戲與服務當作品慢慢做。",
  "footer.worksLabel": "作品",
  "footer.orgLabel": "組織",
  "footer.socialLabel": "社群",
  "footer.langLabel": "語言",
  "footer.github": "GitHub",
  "footer.rights": "Hoshivel",

  // 首頁 Hero
  "home.hero.eyebrow": "獨立遊戲與網路服務開發組織",
  "home.hero.titleA": "少做，做好，做久——",
  "home.hero.titleB": "作品，是值得回去的地方。",
  "home.hero.lead":
    "Hoshivel 是一間獨立小工作室：做架空世界的回合策略遊戲《碎界》，也做讓一個帳號通行所有作品的 Hoshi ID。",

  // 首頁 作品
  "home.works.eyebrow": "作品",
  "home.works.title": "兩件作品，一個署名",
  "home.works.lead":
    "從架空世界的回合策略，到通行所有作品的單一帳戶——每一件，都以長期經營為前提。",

  // 首頁 新聞
  "home.news.eyebrow": "新聞",
  "home.news.title": "最新動態",

  // 首頁 理念一句 + 加入我們
  "home.belief.quote": "快的事情交給世界，慢的事情留給我們。",
  "home.belief.source": "Hoshivel 的做事方式",
  "home.join.title": "與我們同行",
  "home.join.lead":
    "Hoshivel 正在尋找同樣相信慢工出細活的合夥人——美術、工程，或任何能把作品變得更好的位置。",

  // 作品頁
  "works.eyebrow": "作品",
  "works.title": "數量不多，各自成界",
  "works.lead": "這是我們正在打造的世界。每一件都想做得長久，也值得你久留。",

  // 作品：碎界 Shattered Realms
  "p.sr.name": "碎界",
  "p.sr.latin": "SHATTERED REALMS",
  "p.sr.kind": "架空世界觀 · 2D 回合制策略遊戲",
  "p.sr.status": "開發中 · 官網已上線",
  "p.sr.desc":
    "在漂浮於虛空的碎片大地上，融合棋類策略、RPG 成長、MOBA 技能設計與開放世界探索。網頁即點即玩，無需下載。",
  "p.sr.f1": "六角棋盤上的深度策略——行動點、地形高低與戰爭迷霧",
  "p.sr.f2": "章節式世界觀——風雪過境、星痕紀元，篇章持續生長",
  "p.sr.f3": "就近分流節點，瀏覽器即點即玩",

  // 作品：Hoshi ID
  "p.id.name": "Hoshi ID",
  "p.id.latin": "UNIVERSAL ACCOUNT",
  "p.id.kind": "通用帳戶 · OpenID Connect 身份服務",
  "p.id.status": "已上線 · 碎界已接入",
  "p.id.desc":
    "一個 Hoshi ID，通行每一個 Hoshivel 世界。登入、安全工作階段與已連接服務由帳戶中心集中管理；各作品只保存自己的遊戲資料，帳號的事交給 Hoshi ID。",
  "p.id.f1": "單一帳號、單一登入（OpenID Connect），一次註冊通行全部作品",
  "p.id.f2": "帳戶中心：個人檔案、安全工作階段、已連接服務與登入紀錄",
  "p.id.f3": "安全為先：短效憑證、Refresh Token 輪替與重用偵測",

  // 關於頁
  "about.eyebrow": "關於",
  "about.title": "關於 Hoshivel",
  "about.lead": "一支小而專注的團隊，用長期的眼光打造遊戲與服務。",
  "about.who.title": "我們是誰",
  "about.who.body1":
    "Hoshivel 是一個獨立開發組織，目前打造兩件作品：架空世界觀回合制策略遊戲《碎界 Shattered Realms》，以及通用帳戶服務 Hoshi ID。",
  "about.who.body2":
    "我們刻意保持小：小的團隊、少的作品、長的時間表。這讓我們可以把每一個細節做到自己滿意，再交到玩家手上。",
  "about.name.title": "名字的由來",
  "about.name.body":
    "Hoshivel，取「星」（ほし，hoshi）與拉丁語「帆」（velum）合成——以星為帆。星是我們仰望的作品，帆是把仰望化作航行的手藝。",
  "about.values.title": "我們相信",
  "about.v1.name": "少而精",
  "about.v1.desc":
    "不追逐數量。每一件作品，都值得被完整地做完、久久地維護。",
  "about.v2.name": "玩家即同行者",
  "about.v2.desc":
    "玩家不是流量，是同行的人。做決定時，我們先想十年後的玩家會怎麼看。",
  "about.v3.name": "做得長久",
  "about.v3.desc":
    "架構、美術與社群，都以「多年後仍然成立」為標準來打造。",
  "about.contact.title": "聯繫我們",
  "about.contact.body":
    "合作、媒體或其他事宜，歡迎透過 GitHub 或信箱與我們聯繫。",
  "about.contact.social": "或在這些地方找到我們",

  // 加入我們（預設招合夥人；職位資料在根目錄 roles.config.ts）
  "join.eyebrow": "加入我們",
  "join.title": "我們不急著擴張，但始終為合夥人留著位置",
  "join.lead":
    "Hoshivel 是遠端優先的小團隊。我們找的不是雇員，是合夥人——你想做出什麼，比你待過哪裡更重要。",
  "join.partner.title": "合夥人，是什麼意思",
  "join.partner.body":
    "不是把工單交給你，而是一起決定要做什麼、一起承擔做不好的後果，也一起分享做成的結果。怎麼合夥——分工、時間投入與回報方式——我們坦白地談清楚，再開始。",
  "join.roles.title": "目前尋找的合夥人",
  "join.mode.remote": "遠端 · 彈性協作",
  "join.kind.partner": "合夥人",
  "join.kind.hire": "職缺",
  "join.apply.partner": "應徵合夥人",
  "join.apply.hire": "應徵這個角色",
  "join.open.title": "沒有合適的位置？",
  "join.open.body":
    "如果你相信我們相信的事，卻不在上面的清單裡——仍然歡迎自我推薦，告訴我們你能讓哪件作品變得更好。",
  "join.how.title": "如何聯繫",
  "join.how.body": "寄信給我們，附上你的作品集或 GitHub，聊聊你想做的事。",

  // 新聞
  "news.eyebrow": "新聞",
  "news.title": "公告與動態",
  "news.lead": "Hoshivel 與旗下作品的最新消息。",
  "news.empty": "目前還沒有更多消息。",
  "news.back": "返回新聞",
  "news.readMore": "閱讀全文",

  // 404
  "notfound.title": "這一頁尚未寫成",
  "notfound.body": "你要找的頁面不存在，或已移往別處。",
  "notfound.back": "回首頁",
} satisfies Record<string, string>;

export type UIKey = keyof typeof zhHant;

const zhCN: Record<UIKey, string> = {
  "site.name": "Hoshivel",
  "site.tagline": "少做，做好，做久",
  "site.summary":
    "Hoshivel 是一个独立游戏与网络服务开发组织，打造架空世界观回合制策略游戏《碎界 Shattered Realms》与通用账户服务 Hoshi ID。",

  "nav.works": "作品",
  "nav.news": "新闻",
  "nav.about": "关于",
  "nav.join": "加入我们",

  "cta.works": "探索作品",
  "cta.about": "认识我们",
  "cta.visit": "前往官网",
  "cta.detail": "作品详情",
  "cta.allNews": "所有新闻",
  "cta.join": "查看合伙人招募",

  "a11y.skip": "跳到主要内容",
  "a11y.langMenu": "切换语言",
  "a11y.home": "回首页",
  "a11y.menu": "菜单",
  "a11y.external": "（外部链接，新窗口打开）",

  "footer.summary": "一间独立工作室，把游戏与服务当作品慢慢做。",
  "footer.worksLabel": "作品",
  "footer.orgLabel": "组织",
  "footer.socialLabel": "社区",
  "footer.langLabel": "语言",
  "footer.github": "GitHub",
  "footer.rights": "Hoshivel",

  "home.hero.eyebrow": "独立游戏与网络服务开发组织",
  "home.hero.titleA": "少做，做好，做久——",
  "home.hero.titleB": "作品，是值得回去的地方。",
  "home.hero.lead":
    "Hoshivel 是一间独立小工作室：做架空世界的回合策略游戏《碎界》，也做让一个账号通行所有作品的 Hoshi ID。",

  "home.works.eyebrow": "作品",
  "home.works.title": "两件作品，一个署名",
  "home.works.lead":
    "从架空世界的回合策略，到通行所有作品的单一账户——每一件，都以长期经营为前提。",

  "home.news.eyebrow": "新闻",
  "home.news.title": "最新动态",

  "home.belief.quote": "快的事情交给世界，慢的事情留给我们。",
  "home.belief.source": "Hoshivel 的做事方式",
  "home.join.title": "与我们同行",
  "home.join.lead":
    "Hoshivel 正在寻找同样相信慢工出细活的合伙人——美术、工程，或任何能把作品变得更好的位置。",

  "works.eyebrow": "作品",
  "works.title": "数量不多，各自成界",
  "works.lead": "这是我们正在打造的世界。每一件都想做得长久，也值得你久留。",

  "p.sr.name": "碎界",
  "p.sr.latin": "SHATTERED REALMS",
  "p.sr.kind": "架空世界观 · 2D 回合制策略游戏",
  "p.sr.status": "开发中 · 官网已上线",
  "p.sr.desc":
    "在漂浮于虚空的碎片大地上，融合棋类策略、RPG 成长、MOBA 技能设计与开放世界探索。网页即点即玩，无需下载。",
  "p.sr.f1": "六角棋盘上的深度策略——行动点、地形高低与战争迷雾",
  "p.sr.f2": "章节式世界观——风雪过境、星痕纪元，篇章持续生长",
  "p.sr.f3": "就近分流节点，浏览器即点即玩",

  "p.id.name": "Hoshi ID",
  "p.id.latin": "UNIVERSAL ACCOUNT",
  "p.id.kind": "通用账户 · OpenID Connect 身份服务",
  "p.id.status": "已上线 · 碎界已接入",
  "p.id.desc":
    "一个 Hoshi ID，通行每一个 Hoshivel 世界。登录、安全会话与已连接服务由账户中心集中管理；各作品只保存自己的游戏数据，账号的事交给 Hoshi ID。",
  "p.id.f1": "单一账号、单点登录（OpenID Connect），一次注册通行全部作品",
  "p.id.f2": "账户中心：个人资料、安全会话、已连接服务与登录记录",
  "p.id.f3": "安全为先：短效凭证、Refresh Token 轮替与重用检测",

  "about.eyebrow": "关于",
  "about.title": "关于 Hoshivel",
  "about.lead": "一支小而专注的团队，用长期的眼光打造游戏与服务。",
  "about.who.title": "我们是谁",
  "about.who.body1":
    "Hoshivel 是一个独立开发组织，目前打造两件作品：架空世界观回合制策略游戏《碎界 Shattered Realms》，以及通用账户服务 Hoshi ID。",
  "about.who.body2":
    "我们刻意保持小：小的团队、少的作品、长的时间表。这让我们可以把每一个细节做到自己满意，再交到玩家手上。",
  "about.name.title": "名字的由来",
  "about.name.body":
    "Hoshivel，取「星」（ほし，hoshi）与拉丁语「帆」（velum）合成——以星为帆。星是我们仰望的作品，帆是把仰望化作航行的手艺。",
  "about.values.title": "我们相信",
  "about.v1.name": "少而精",
  "about.v1.desc": "不追逐数量。每一件作品，都值得被完整地做完、久久地维护。",
  "about.v2.name": "玩家即同行者",
  "about.v2.desc":
    "玩家不是流量，是同行的人。做决定时，我们先想十年后的玩家会怎么看。",
  "about.v3.name": "做得长久",
  "about.v3.desc": "架构、美术与社群，都以「多年后仍然成立」为标准来打造。",
  "about.contact.title": "联系我们",
  "about.contact.body": "合作、媒体或其他事宜，欢迎通过 GitHub 或邮箱与我们联系。",
  "about.contact.social": "或在这些地方找到我们",

  "join.eyebrow": "加入我们",
  "join.title": "我们不急着扩张，但始终为合伙人留着位置",
  "join.lead":
    "Hoshivel 是远程优先的小团队。我们找的不是雇员，是合伙人——你想做出什么，比你待过哪里更重要。",
  "join.partner.title": "合伙人，是什么意思",
  "join.partner.body":
    "不是把工单交给你，而是一起决定要做什么、一起承担做不好的后果，也一起分享做成的结果。怎么合伙——分工、时间投入与回报方式——我们坦白地谈清楚，再开始。",
  "join.roles.title": "目前寻找的合伙人",
  "join.mode.remote": "远程 · 弹性协作",
  "join.kind.partner": "合伙人",
  "join.kind.hire": "职位",
  "join.apply.partner": "应聘合伙人",
  "join.apply.hire": "应聘这个角色",
  "join.open.title": "没有合适的位置？",
  "join.open.body":
    "如果你相信我们相信的事，却不在上面的清单里——仍然欢迎自我推荐，告诉我们你能让哪件作品变得更好。",
  "join.how.title": "如何联系",
  "join.how.body": "给我们写信，附上你的作品集或 GitHub，聊聊你想做的事。",

  "news.eyebrow": "新闻",
  "news.title": "公告与动态",
  "news.lead": "Hoshivel 与旗下作品的最新消息。",
  "news.empty": "目前还没有更多消息。",
  "news.back": "返回新闻",
  "news.readMore": "阅读全文",

  "notfound.title": "这一页尚未写成",
  "notfound.body": "你要找的页面不存在，或已移往别处。",
  "notfound.back": "回首页",
};

const en: Record<UIKey, string> = {
  "site.name": "Hoshivel",
  "site.tagline": "Build less, build well, build to last",
  "site.summary":
    "Hoshivel is an independent organization building games and online services — the turn-based strategy game Shattered Realms and the universal account service Hoshi ID.",

  "nav.works": "Works",
  "nav.news": "News",
  "nav.about": "About",
  "nav.join": "Join us",

  "cta.works": "Explore our works",
  "cta.about": "About us",
  "cta.visit": "Visit site",
  "cta.detail": "Details",
  "cta.allNews": "All news",
  "cta.join": "See partner roles",

  "a11y.skip": "Skip to main content",
  "a11y.langMenu": "Switch language",
  "a11y.home": "Back to home",
  "a11y.menu": "Menu",
  "a11y.external": "(external link, opens in a new tab)",

  "footer.summary":
    "An independent studio, making games and services the slow way.",
  "footer.worksLabel": "Works",
  "footer.orgLabel": "Organization",
  "footer.socialLabel": "Community",
  "footer.langLabel": "Language",
  "footer.github": "GitHub",
  "footer.rights": "Hoshivel",

  "home.hero.eyebrow": "Independent games & online services",
  "home.hero.titleA": "Build less, build well, build to last —",
  "home.hero.titleB": "making works worth returning to.",
  "home.hero.lead":
    "Hoshivel is a small independent studio. We make Shattered Realms, a turn-based strategy game set in an original world, and Hoshi ID, one account for everything we build.",

  "home.works.eyebrow": "Works",
  "home.works.title": "Two works, one signature",
  "home.works.lead":
    "From turn-based strategy in an original world to a single account for everything we make — each one built to last.",

  "home.news.eyebrow": "News",
  "home.news.title": "Latest updates",

  "home.belief.quote":
    "Let the world keep the fast things; we keep the slow ones.",
  "home.belief.source": "How Hoshivel works",
  "home.join.title": "Walk with us",
  "home.join.lead":
    "Hoshivel is looking for partners who believe good things take time — artists, engineers, or any seat that makes the work better.",

  "works.eyebrow": "Works",
  "works.title": "Few in number, each a world",
  "works.lead":
    "This is what we are building — each made to last, and worth staying in.",

  "p.sr.name": "Shattered Realms",
  "p.sr.latin": "SHATTERED REALMS",
  "p.sr.kind": "2D turn-based strategy in an original world",
  "p.sr.status": "In development · site live",
  "p.sr.desc":
    "On fragmented lands adrift in the void, it fuses board-game tactics, RPG growth, MOBA-style skills and open-world exploration. Click and play in the browser — no download.",
  "p.sr.f1": "Deep tactics on a hex board — action points, terrain and fog of war",
  "p.sr.f2":
    "A chapter-based world — Snowbound Passage, Age of Starmarks, and more to grow",
  "p.sr.f3": "Region-routed nodes; playable instantly in the browser",

  "p.id.name": "Hoshi ID",
  "p.id.latin": "UNIVERSAL ACCOUNT",
  "p.id.kind": "Universal account · OpenID Connect identity service",
  "p.id.status": "Live · Shattered Realms connected",
  "p.id.desc":
    "One Hoshi ID, every Hoshivel world. Sign-in, secure sessions and connected services live in one account center; each work keeps only its own game data — the account is Hoshi ID's job.",
  "p.id.f1": "One account, single sign-on (OpenID Connect) — register once, enter every work",
  "p.id.f2": "Account center: profile, secure sessions, connected services and sign-in history",
  "p.id.f3": "Security first: short-lived tokens, refresh rotation and reuse detection",

  "about.eyebrow": "About",
  "about.title": "About Hoshivel",
  "about.lead":
    "A small, focused team building games and services with the long view.",
  "about.who.title": "Who we are",
  "about.who.body1":
    "Hoshivel is an independent development organization. We currently build two works: Shattered Realms, a turn-based strategy game set in an original shattered world, and Hoshi ID, our universal account service.",
  "about.who.body2":
    "We stay deliberately small: a small team, few works, long timelines. It lets us finish every detail to our own standard before it reaches players.",
  "about.name.title": "The name",
  "about.name.body":
    "Hoshivel joins hoshi (星, star) with the Latin velum — a sail. Stars for sails: the works we look up to, and the craft that turns looking up into sailing.",
  "about.values.title": "What we believe",
  "about.v1.name": "Less, but better",
  "about.v1.desc":
    "We don't chase volume. Every work deserves to be finished whole and maintained for years.",
  "about.v2.name": "Players are companions",
  "about.v2.desc":
    "Players aren't traffic; they walk with us. We decide with the player of ten years from now in mind.",
  "about.v3.name": "Built to last",
  "about.v3.desc":
    "Architecture, art and community — all held to one standard: still standing years from now.",
  "about.contact.title": "Contact",
  "about.contact.body":
    "For partnerships, press or anything else, reach us on GitHub or by email.",
  "about.contact.social": "Or find us here",

  "join.eyebrow": "Join us",
  "join.title": "In no hurry to grow — but always a seat for a partner",
  "join.lead":
    "Hoshivel is a small, remote-first team. We aren't hiring staff; we're looking for partners — what you want to build matters more than where you've been.",
  "join.partner.title": "What partner means here",
  "join.partner.body":
    "Not tickets handed to you: we decide together what to build, carry the consequences together when it falls short, and share what it earns when it works. How the partnership works — the split of work, the time you put in, and how you're rewarded — we settle plainly before starting.",
  "join.roles.title": "Partners we're looking for",
  "join.mode.remote": "Remote · flexible",
  "join.kind.partner": "Partner",
  "join.kind.hire": "Role",
  "join.apply.partner": "Apply as a partner",
  "join.apply.hire": "Apply for this role",
  "join.open.title": "No seat that fits?",
  "join.open.body":
    "If you believe what we believe but aren't on the list — introduce yourself anyway, and tell us which work you'd make better.",
  "join.how.title": "How to reach us",
  "join.how.body":
    "Write to us with your portfolio or GitHub, and tell us what you want to build.",

  "news.eyebrow": "News",
  "news.title": "Announcements & updates",
  "news.lead": "The latest from Hoshivel and its works.",
  "news.empty": "No more news for now.",
  "news.back": "Back to news",
  "news.readMore": "Read more",

  "notfound.title": "This page has not been written yet",
  "notfound.body": "The page you're looking for doesn't exist, or has moved.",
  "notfound.back": "Back to home",
};

export const ui: Record<Locale, Record<UIKey, string>> = {
  "zh-Hant": zhHant,
  "zh-CN": zhCN,
  en,
};
