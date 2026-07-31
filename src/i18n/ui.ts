/*
  Hoshivel 官方門戶 —— 介面文案字典（三語）。

  慣例沿用家族（sr-web）：zh-Hant 為主語言與鍵的權威來源；
  zh-CN / en 逐鍵齊備（型別強制完整，缺鍵編譯不過）。
  品牌名 Hoshivel 一律整詞使用：不拆字、不解字源、不加註解。
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
  /** 正式題詞（字標、頁標題後綴、OG 圖皆用它）。 */
  "site.tagline": "讓星辰，成為世界。",
  /** 題詞的拉丁書寫（漢字語系頁面在題詞下並排一行）。 */
  "site.taglineLatin": "WHERE STARS BECOME WORLDS",
  /** 做事方式（不是題詞；用於關於頁的「我們相信」導語）。 */
  "site.motto": "少做，做好，做久。",
  "site.summary":
    "Hoshivel 是一個獨立遊戲與網路服務開發組織，打造架空世界觀回合制策略遊戲《碎界 Shattered Realms》，並自建通用帳戶服務 Hoshi ID 支撐它長期運行。",

  "nav.works": "作品",
  "nav.news": "新聞",
  "nav.about": "關於",
  "nav.join": "加入我們",

  "cta.works": "探索作品",
  "cta.about": "認識我們",
  "cta.visit": "前往官網",
  "cta.detail": "作品詳情",
  "cta.detailService": "服務詳情",
  "cta.allNews": "所有新聞",
  "cta.join": "查看招募資訊",

  "a11y.skip": "跳到主要內容",
  "a11y.langMenu": "切換語言",
  "a11y.home": "回首頁",
  "a11y.menu": "選單",
  "a11y.external": "（外部連結，另開新視窗）",

  "footer.summary": "一間獨立工作室，把一件作品慢慢做好，並自己扛起它的地基。",
  "footer.worksLabel": "作品",
  "footer.servicesLabel": "服務",
  "footer.orgLabel": "組織",
  "footer.langLabel": "語言",
  "footer.github": "GitHub",
  "footer.rights": "Hoshivel",

  // 首頁 Hero
  "home.hero.eyebrow": "獨立遊戲與網路服務開發組織",
  "home.hero.lead":
    "Hoshivel 是一間獨立小工作室：做架空世界的回合策略遊戲《碎界》；帳號的事，交給我們自建的 Hoshi ID。",

  // 首頁 作品
  "home.works.eyebrow": "作品",
  "home.works.title": "作品只有一件，所以每一寸都算數",
  "home.works.lead":
    "《碎界》是我們現在全部的作品——架空世界的回合策略，以長期經營為前提，慢慢長成。",

  // 首頁 服務（不是作品：支撐作品的地基）
  "home.services.eyebrow": "服務",
  "home.services.title": "支撐作品的服務",
  "home.services.lead":
    "Hoshi ID 不是產品，是地基：帳號、登入與安全工作階段集中在這裡，作品才能只管好自己的世界。",

  // 首頁 星圖（Hero 圖版）
  "home.chart.title": "HOSHIVEL 星圖",
  "home.chart.note": "亮星是作品，環標是支撐它的服務——點一下看看。",

  // 首頁 新聞
  "home.news.eyebrow": "新聞",
  "home.news.title": "最新動態",

  // 首頁 理念一句 + 加入我們
  "home.belief.quote": "快的事情交給世界，慢的事情留給我們。",
  "home.belief.source": "Hoshivel 的做事方式",
  "home.join.title": "與我們同行",
  "home.join.lead":
    "Hoshivel 正在尋找同樣相信慢工出細活的人——美術、工程，或任何能把作品變得更好的角色。",

  // 作品頁
  "works.eyebrow": "作品",
  "works.title": "數量不多，各自成界",
  "works.lead": "這是我們正在打造的世界，以及讓它長期運行的服務。",
  "label.work": "作品",
  "label.service": "服務",

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
    "Hoshivel 是一個獨立開發組織。作品只有一件：架空世界觀回合制策略遊戲《碎界 Shattered Realms》；另有一項自建服務 Hoshi ID——它不是產品，是讓作品長期運行的帳戶地基。",
  "about.who.body2":
    "我們刻意保持小：小的團隊、少的作品、長的時間表。這讓我們可以把每一個細節做到自己滿意，再交到玩家手上。",
  "about.now.title": "現在正在做的事",
  "about.now.body":
    "《碎界》仍在開發，官網已上線；Hoshi ID 已上線，並且是碎界現在的登入方式。我們同時只讓少數幾件事往前走——做完一件，再開下一件。",
  "about.values.lead": "少做，做好，做久。",
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

  // 加入我們
  "join.eyebrow": "加入我們",
  "join.title": "我們不急著擴張，但始終為對的人留著位置",
  "join.lead":
    "Hoshivel 是遠端優先的小團隊。我們在意你想做出什麼，勝過你待過哪裡。",
  "join.roles.title": "目前開放的角色",
  "join.mode.remote": "遠端 · 彈性協作",
  "role.art.title": "2D 美術／立繪畫師",
  "role.art.area": "碎界 Shattered Realms",
  "role.art.desc":
    "為《碎界》的英雄與章節世界繪製立繪與關鍵美術——目前全站以程序化圖形佔位，等的就是你的筆。",
  "role.art.skills": "角色立繪 · 世界觀美術 · 熱愛 2D 遊戲美術",
  "role.fe.title": "前端／玩法工程師",
  "role.fe.area": "碎界與官網家族",
  "role.fe.desc":
    "以 TypeScript 打造遊戲前端與官網體驗：從六角棋盤的互動，到靜態站的細節打磨。",
  "role.fe.skills": "TypeScript · React 或 Astro · 在意效能與可存取性",
  "role.be.title": "後端工程師",
  "role.be.area": "Hoshi ID 與遊戲服務",
  "role.be.desc":
    "用 Go 打造帳號、分流與遊戲伺服器等長期運行的服務——小而可靠，不堆多餘相依。",
  "role.be.skills": "Go · 分散式基礎 · 重視簡潔與可維運性",
  "join.apply": "應徵這個角色",
  "join.open.title": "沒有合適的角色？",
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
  "notfound.title": "這片夜空還沒有這顆星",
  "notfound.body": "你要找的頁面不存在，或已移往別處。",
  "notfound.back": "回首頁",
} satisfies Record<string, string>;

export type UIKey = keyof typeof zhHant;

const zhCN: Record<UIKey, string> = {
  "site.name": "Hoshivel",
  "site.tagline": "让星辰，成为世界。",
  "site.taglineLatin": "WHERE STARS BECOME WORLDS",
  "site.motto": "少做，做好，做久。",
  "site.summary":
    "Hoshivel 是一个独立游戏与网络服务开发组织，打造架空世界观回合制策略游戏《碎界 Shattered Realms》，并自建通用账户服务 Hoshi ID 支撑它长期运行。",

  "nav.works": "作品",
  "nav.news": "新闻",
  "nav.about": "关于",
  "nav.join": "加入我们",

  "cta.works": "探索作品",
  "cta.about": "认识我们",
  "cta.visit": "前往官网",
  "cta.detail": "作品详情",
  "cta.detailService": "服务详情",
  "cta.allNews": "所有新闻",
  "cta.join": "查看招募信息",

  "a11y.skip": "跳到主要内容",
  "a11y.langMenu": "切换语言",
  "a11y.home": "回首页",
  "a11y.menu": "菜单",
  "a11y.external": "（外部链接，新窗口打开）",

  "footer.summary": "一间独立工作室，把一件作品慢慢做好，并自己扛起它的地基。",
  "footer.worksLabel": "作品",
  "footer.servicesLabel": "服务",
  "footer.orgLabel": "组织",
  "footer.langLabel": "语言",
  "footer.github": "GitHub",
  "footer.rights": "Hoshivel",

  "home.hero.eyebrow": "独立游戏与网络服务开发组织",
  "home.hero.lead":
    "Hoshivel 是一间独立小工作室：做架空世界的回合策略游戏《碎界》；账号的事，交给我们自建的 Hoshi ID。",

  "home.works.eyebrow": "作品",
  "home.works.title": "作品只有一件，所以每一寸都算数",
  "home.works.lead":
    "《碎界》是我们现在全部的作品——架空世界的回合策略，以长期经营为前提，慢慢长成。",

  "home.services.eyebrow": "服务",
  "home.services.title": "支撑作品的服务",
  "home.services.lead":
    "Hoshi ID 不是产品，是地基：账号、登录与安全会话集中在这里，作品才能只管好自己的世界。",

  "home.chart.title": "HOSHIVEL 星图",
  "home.chart.note": "亮星是作品，环标是支撑它的服务——点一下看看。",

  "home.news.eyebrow": "新闻",
  "home.news.title": "最新动态",

  "home.belief.quote": "快的事情交给世界，慢的事情留给我们。",
  "home.belief.source": "Hoshivel 的做事方式",
  "home.join.title": "与我们同行",
  "home.join.lead":
    "Hoshivel 正在寻找同样相信慢工出细活的人——美术、工程，或任何能把作品变得更好的角色。",

  "works.eyebrow": "作品",
  "works.title": "数量不多，各自成界",
  "works.lead": "这是我们正在打造的世界，以及让它长期运行的服务。",
  "label.work": "作品",
  "label.service": "服务",

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
    "Hoshivel 是一个独立开发组织。作品只有一件：架空世界观回合制策略游戏《碎界 Shattered Realms》；另有一项自建服务 Hoshi ID——它不是产品，是让作品长期运行的账户地基。",
  "about.who.body2":
    "我们刻意保持小：小的团队、少的作品、长的时间表。这让我们可以把每一个细节做到自己满意，再交到玩家手上。",
  "about.now.title": "现在正在做的事",
  "about.now.body":
    "《碎界》仍在开发，官网已上线；Hoshi ID 已上线，并且是碎界现在的登录方式。我们同时只让少数几件事往前走——做完一件，再开下一件。",
  "about.values.lead": "少做，做好，做久。",
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

  "join.eyebrow": "加入我们",
  "join.title": "我们不急着扩张，但始终为对的人留着位置",
  "join.lead":
    "Hoshivel 是远程优先的小团队。我们在意你想做出什么，胜过你待过哪里。",
  "join.roles.title": "目前开放的角色",
  "join.mode.remote": "远程 · 弹性协作",
  "role.art.title": "2D 美术／立绘画师",
  "role.art.area": "碎界 Shattered Realms",
  "role.art.desc":
    "为《碎界》的英雄与章节世界绘制立绘与关键美术——目前全站以程序化图形占位，等的就是你的笔。",
  "role.art.skills": "角色立绘 · 世界观美术 · 热爱 2D 游戏美术",
  "role.fe.title": "前端／玩法工程师",
  "role.fe.area": "碎界与官网家族",
  "role.fe.desc":
    "以 TypeScript 打造游戏前端与官网体验：从六角棋盘的交互，到静态站的细节打磨。",
  "role.fe.skills": "TypeScript · React 或 Astro · 在意性能与可访问性",
  "role.be.title": "后端工程师",
  "role.be.area": "Hoshi ID 与游戏服务",
  "role.be.desc":
    "用 Go 打造账号、分流与游戏服务器等长期运行的服务——小而可靠，不堆多余依赖。",
  "role.be.skills": "Go · 分布式基础 · 重视简洁与可运维性",
  "join.apply": "应聘这个角色",
  "join.open.title": "没有合适的角色？",
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

  "notfound.title": "这片夜空还没有这颗星",
  "notfound.body": "你要找的页面不存在，或已移往别处。",
  "notfound.back": "回首页",
};

const en: Record<UIKey, string> = {
  "site.name": "Hoshivel",
  "site.tagline": "Where Stars Become Worlds.",
  "site.taglineLatin": "WHERE STARS BECOME WORLDS",
  "site.motto": "Build less, build well, build to last.",
  "site.summary":
    "Hoshivel is an independent organization building Shattered Realms, a turn-based strategy game set in an original world, backed by Hoshi ID — the account service we run to keep it standing.",

  "nav.works": "Works",
  "nav.news": "News",
  "nav.about": "About",
  "nav.join": "Join us",

  "cta.works": "Explore our works",
  "cta.about": "About us",
  "cta.visit": "Visit site",
  "cta.detail": "Details",
  "cta.detailService": "Details",
  "cta.allNews": "All news",
  "cta.join": "See open roles",

  "a11y.skip": "Skip to main content",
  "a11y.langMenu": "Switch language",
  "a11y.home": "Back to home",
  "a11y.menu": "Menu",
  "a11y.external": "(external link, opens in a new tab)",

  "footer.summary":
    "An independent studio: one work, made slowly — and the groundwork under it, run by us.",
  "footer.worksLabel": "Works",
  "footer.servicesLabel": "Service",
  "footer.orgLabel": "Organization",
  "footer.langLabel": "Language",
  "footer.github": "GitHub",
  "footer.rights": "Hoshivel",

  "home.hero.eyebrow": "Independent games & online services",
  "home.hero.lead":
    "Hoshivel is a small independent studio. We make Shattered Realms, a turn-based strategy game set in an original world; accounts are handled by Hoshi ID, the service we run ourselves.",

  "home.works.eyebrow": "Works",
  "home.works.title": "One work — so every inch of it counts",
  "home.works.lead":
    "Shattered Realms is all we build right now: turn-based strategy in an original world, grown slowly and meant to last.",

  "home.services.eyebrow": "Service",
  "home.services.title": "The service behind the work",
  "home.services.lead":
    "Hoshi ID isn't a product — it's the ground the work stands on: accounts, sign-in and secure sessions live there, so the game can mind its own world.",

  "home.chart.title": "THE HOSHIVEL CHART",
  "home.chart.note":
    "Bright stars are works; the ringed one is the service beneath them — take a look.",

  "home.news.eyebrow": "News",
  "home.news.title": "Latest updates",

  "home.belief.quote":
    "Let the world keep the fast things; we keep the slow ones.",
  "home.belief.source": "How Hoshivel works",
  "home.join.title": "Walk with us",
  "home.join.lead":
    "Hoshivel is looking for people who believe good things take time — artists, engineers, or any role that makes the work better.",

  "works.eyebrow": "Works",
  "works.title": "Few in number, each a world",
  "works.lead":
    "What we are building — and the service that keeps it running.",
  "label.work": "WORK",
  "label.service": "SERVICE",

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
    "Hoshivel is an independent development organization. We have one work: Shattered Realms, a turn-based strategy game set in an original shattered world. Alongside it we run Hoshi ID — not a product, but the account groundwork that keeps the work running.",
  "about.who.body2":
    "We stay deliberately small: a small team, few works, long timelines. It lets us finish every detail to our own standard before it reaches players.",
  "about.now.title": "What we're working on",
  "about.now.body":
    "Shattered Realms is still in development, with its site live; Hoshi ID is live and is how you sign in to Shattered Realms today. We only ever move a few things forward at once — finish one, then start the next.",
  "about.values.lead": "Build less, build well, build to last.",
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

  "join.eyebrow": "Join us",
  "join.title":
    "In no hurry to grow — but always a seat for the right person",
  "join.lead":
    "Hoshivel is a small, remote-first team. What you want to build matters more to us than where you've been.",
  "join.roles.title": "Open roles",
  "join.mode.remote": "Remote · flexible",
  "role.art.title": "2D Artist / Character Illustrator",
  "role.art.area": "Shattered Realms",
  "role.art.desc":
    "Draw the hero portraits and key art of Shattered Realms — today the whole site runs on procedural placeholders, waiting for your brush.",
  "role.art.skills": "Character illustration · World art · A love for 2D game art",
  "role.fe.title": "Front-end / Gameplay Engineer",
  "role.fe.area": "Shattered Realms & the web family",
  "role.fe.desc":
    "Build the game front-end and our web experiences in TypeScript — from hex-board interactions to the fine details of static sites.",
  "role.fe.skills": "TypeScript · React or Astro · Care for performance and accessibility",
  "role.be.title": "Back-end Engineer",
  "role.be.area": "Hoshi ID & game services",
  "role.be.desc":
    "Build long-running services in Go — accounts, routing, game servers. Small, reliable, no excess dependencies.",
  "role.be.skills": "Go · Distributed fundamentals · A taste for simplicity and operability",
  "join.apply": "Apply for this role",
  "join.open.title": "No role that fits?",
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

  "notfound.title": "No star at these coordinates",
  "notfound.body": "The page you're looking for doesn't exist, or has moved.",
  "notfound.back": "Back to home",
};

export const ui: Record<Locale, Record<UIKey, string>> = {
  "zh-Hant": zhHant,
  "zh-CN": zhCN,
  en,
};
