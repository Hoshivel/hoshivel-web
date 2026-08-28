/*
  Hoshivel 官方門戶 —— 介面文案字典（四語）。

  慣例沿用家族（sr-web）：zh-Hant 為主語言與鍵的權威來源；
  zh-CN / ja / en 逐鍵齊備（型別強制完整，缺鍵編譯不過）。
  品牌名 Hoshivel 一律整詞使用：不拆字、不解字源、不加註解；
  中文品牌名「星帆」與它並用，同樣是完整的詞——但它是**中文**品牌名，
  日文與英文頁一律只用 Hoshivel，不另立一個日文品牌名。

  ── 用語規則（全站一致，改文案前先看）──────────────
  · **句號看句數**：一句不加，兩句以上才加。標題、標籤與按鈕一律不加；正式中英
    英文正式題詞保留品牌定稿中的句點，是唯一例外。
    硬換行（`\n`）不影響判斷——`home.hero.lead` 排成三行仍是一句，不加。
    分號、冒號、破折號都不算斷句。`astro check` 驗不到標點，改文案時自己看。
  · 使用者持有的是「帳號」；管理它的介面叫「帳戶中心」。
  · 遊戲類型一律寫「回合制策略」，不寫「回合策略」。
  · Hoshi ID 是**服務**，不是作品——但不必反覆聲明它「不是產品」；
    講它做什麼就好。短效憑證、Refresh Token 輪替、重用偵測這類
    技術細節屬於 Hoshi ID 自己的技術／安全頁，母品牌站不列。
  ─────────────────────────────────────────
*/

/*
  陣列順序＝語言切換器與 sitemap 的呈現順序：三個漢字圈語系相鄰，
  拉丁的 en 收尾。改順序只影響呈現，不影響路由。
*/
export const LOCALES = ["zh-Hant", "zh-CN", "ja", "en"] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "zh-Hant";

/** URL 路徑前綴（預設語言掛根，其餘掛子路徑）。 */
export const LOCALE_PATH: Record<Locale, string> = {
  "zh-Hant": "",
  "zh-CN": "zh-cn",
  ja: "ja",
  en: "en",
};

/** `<html lang>` 屬性值。 */
export const HTML_LANG: Record<Locale, string> = {
  "zh-Hant": "zh-Hant",
  "zh-CN": "zh-CN",
  ja: "ja",
  en: "en",
};

/** `og:locale` 值。 */
export const OG_LOCALE: Record<Locale, string> = {
  "zh-Hant": "zh_Hant",
  "zh-CN": "zh_CN",
  ja: "ja_JP",
  en: "en_US",
};

/** 日期呈現用的 BCP-47 標籤。 */
export const DATE_LANG: Record<Locale, string> = {
  "zh-Hant": "zh-Hant-TW",
  "zh-CN": "zh-Hans-CN",
  ja: "ja-JP",
  en: "en-US",
};

/** 語言切換器顯示名（各以自身語言書寫）。 */
export const LOCALE_LABEL: Record<Locale, string> = {
  "zh-Hant": "正體中文",
  "zh-CN": "简体中文",
  ja: "日本語",
  en: "English",
};

/** 精簡標籤（header 語言切換器用；完整名放 title/aria-label）。 */
export const LOCALE_SHORT: Record<Locale, string> = {
  "zh-Hant": "繁",
  "zh-CN": "简",
  ja: "日",
  en: "EN",
};

/**
 * 該語系要預載的漢字面子集檔（見 styles/fonts.css 與 scripts/subset-fonts.py）。
 * 同一個碼位在三地的字形不同（関/關、発/發、直/直），所以 TC／SC／JP 各一支，
 * 不能共用——共用的話日文頁的標題會是中文字形。
 * 寫成 `Record<Locale, …>` 而不是三元運算：新增語系時漏填會編譯不過，
 * 不會安靜地回退成正體那一支。
 */
export const HAN_FONT: Record<Locale, string> = {
  "zh-Hant": "/fonts/noto-serif-tc-600.woff2",
  "zh-CN": "/fonts/noto-serif-sc-600.woff2",
  ja: "/fonts/noto-serif-jp-600.woff2",
  // 英文頁沒有漢字，但拜耳字母（α β γ δ）這類 Playfair 未必有的字仍落在漢字面，
  // 故維持既有行為：預載正體那一支。
  en: "/fonts/noto-serif-tc-600.woff2",
};

// zh-Hant 為鍵的權威來源；其餘語言以 Record<UIKey, string> 強制對齊。
const zhHant = {
  "site.name": "Hoshivel",
  /** 正式題詞（首頁 UI 使用；metadata 有獨立順序）。 */
  "site.tagline": "始於星帆，盛於繁星",
  /** 題詞的拉丁書寫（漢字語系頁面在題詞下並排一行）。 */
  "site.taglineLatin": "From a Star-Sail to a Sea of Stars.",
  /** SEO 與分享卡片專用：拉丁題詞在前，再接本地語言。 */
  "site.metaTagline": "From a Star-Sail to a Sea of Stars. — 始於星帆，盛於繁星",
  "site.summary":
    "From a Star-Sail to a Sea of Stars. — 始於星帆，盛於繁星；Hoshivel（星帆）是獨立遊戲與世界創作團隊，從回合制策略遊戲《碎界 Shattered Realms》開始。",

  "nav.works": "作品",
  "nav.news": "新聞",
  "nav.about": "關於",
  "nav.join": "合作",

  /** 首頁 Hero 的主行動：指向旗艦作品，不是泛稱的「作品」。 */
  "cta.sr": "探索《碎界》",
  "cta.about": "認識我們",
  "cta.visitWork": "前往《碎界》（Shattered Realms）官網",
  "cta.visitService": "開啟帳戶中心",
  "cta.detail": "作品詳情",
  "cta.detailService": "服務詳情",
  "cta.allNews": "查看全部新聞",
  "cta.join": "了解合作方式",

  "a11y.skip": "跳到主要內容",
  "a11y.langMenu": "切換語言",
  "a11y.home": "回首頁",
  "a11y.menu": "選單",
  "a11y.external": "（外部連結，另開新視窗）",

  "footer.summary": "獨立遊戲與世界創作團隊",
  "footer.worksLabel": "作品",
  "footer.servicesLabel": "服務",
  "footer.orgLabel": "組織",
  "footer.socialLabel": "社群",
  "footer.langLabel": "語言",
  "cookie.settings": "Cookie 設定",
  "cookie.title": "記住你的顯示偏好",
  "cookie.body": "我們只用偏好 Cookie 在 Hoshivel 網站間記住語言，以及在支援的頁面記住外觀，不用於分析或追蹤。登入與安全所需的 Cookie 會一直啟用。",
  "cookie.essential": "只使用必要 Cookie",
  "cookie.remember": "記住偏好",
  "footer.github": "GitHub",
  "footer.rights": "Hoshivel",

  // 首頁 Hero
  "home.hero.eyebrow": "獨立遊戲與世界創作團隊",
  /** Concise homepage positioning; the full statement remains in the brand docs and About values. */
  "home.hero.creed": "只做真正值得玩的世界",
  /*
    導語的斷行是**手工指定的**（`\n`，由 `.hv-hero__lead` 的 `white-space: pre-line`
    落實）。漢字可在任兩字之間斷開，交給瀏覽器會把《碎界 Shattered Realms》攔腰
    截斷；三行的斷點取在「遊戲｜作品全名｜並為……」，作品全名獨佔一行。
    漢字語系才需要，英文自己在空白處斷得乾淨——en 不插 `\n`。
  */
  "home.hero.lead":
    "Hoshivel 正在打造\n《碎界 Shattered Realms》——\n一個持續展開、值得反覆探索的架空世界",

  // 首頁 作品（α）
  "home.works.eyebrow": "作品",
  "home.works.title": "從第一個世界開始，把每一寸做好",
  "home.works.lead":
    "《碎界》是我們的第一個世界：從六角戰場到每一段旅途，都要讓玩家願意再次回來",

  // 首頁 服務（不編章節：以環標另立一節）
  "home.services.eyebrow": "服務",
  "home.services.title": "讓作品專注於世界本身",
  "home.services.lead": "Hoshi ID 讓玩家用一個帳號往返旗下世界，作品則專注於遊玩本身",

  // 首頁 星圖（Hero 圖版）
  "home.chart.title": "HOSHIVEL 星圖",

  // 首頁 開發動態（β）
  "home.news.eyebrow": "新聞",
  "home.news.title": "最新消息",
  "home.news.lead":
    "追蹤《碎界》的開發進度、世界觀內容與 Hoshivel 最新消息",

  // 首頁 協作（δ）
  "home.join.title": "與我們協作",
  // 不列舉工種：公開方向會由 roles.config.ts 調整，首頁不重複一份容易過期的清單。
  "home.join.lead":
    "我們以按件、短期專案或彈性兼職展開合作，也期待遇見願意一起把作品做完整、長期同行的夥伴",

  // 作品頁
  "works.eyebrow": "作品",
  "works.title": "正在成形的世界",
  "works.lead": "從《碎界》到 Hoshi ID，每個項目都為同一件事服務：讓值得玩的世界長久存在",
  "label.work": "作品",
  "label.service": "服務",

  // 作品：碎界 Shattered Realms
  "p.sr.name": "碎界",
  "p.sr.latin": "Shattered Realms",
  "p.sr.kind": "架空世界觀 · 2D 回合制策略遊戲",
  "p.sr.status": "開發中 · 瀏覽器可玩",
  "p.sr.short": "在六角棋盤上調度角色，探索隨篇章展開的架空世界",
  // 第一句刻意讓三個名字（碎界／Shattered Realms／Hoshivel）共現：它就印在
  // 那條連往 sr.hoshivel.com 的連結上方，是本站對那個作品最完整的一段話。
  "p.sr.desc":
    "《碎界》（Shattered Realms）是 Hoshivel 旗下的 2D 六角格回合制策略遊戲。踏上漂浮於虛空的碎片大地，在六角棋盤上調度角色、運用地形，探索隨篇章展開的架空世界。點擊即玩，無需下載",
  "p.sr.f1": "行動點、地形高低與戰爭迷霧，構成每一步選擇",
  "p.sr.f2": "角色成長與英雄技能，組合自己的戰術",

  // 服務：Hoshi ID
  "p.id.name": "Hoshi ID",
  "p.id.latin": "Universal Account",
  "p.id.kind": "Hoshivel 通用帳號服務",
  "p.id.status": "已上線 · 《碎界》已接入",
  "p.id.short": "一個帳號，連接所有 Hoshivel 世界",
  "p.id.desc":
    "一個帳號，連接所有 Hoshivel 世界。登入、帳號安全與已連接服務，都能在同一處管理。",
  "p.id.f1": "一次註冊，即可登入旗下作品",
  "p.id.f2": "在帳戶中心管理個人檔案、登入紀錄與已連接服務",

  // 關於頁
  "about.eyebrow": "關於",
  "about.title": "關於 Hoshivel",
  "about.lead": "我們相信，值得長久存在的世界，需要時間、專注與清楚的選擇",
  "about.who.title": "我們是誰",
  "about.who.body1":
    "Hoshivel（星帆）是一支獨立遊戲與世界創作團隊。我們從《碎界 Shattered Realms》開始，也用 Hoshi ID 讓玩家以一個帳號往返旗下世界。",
  "about.who.body2":
    "我們關心的是世界是否值得探索、玩法是否經得起反覆遊玩，以及多年後回來時，作品是否依然成立",

  "about.now.title": "現在正在做的事",
  "about.now.body":
    "目前我們正集中完成《碎界》的章節、玩法與美術，並持續改善 Hoshi ID 與相關服務",
  "about.values.title": "我們相信",
  "about.v1.name": "遊戲首先應當是遊戲",
  "about.v1.p1": "我們做遊戲，是因為遊戲本身值得被做得有趣。",
  "about.v1.p2": "營收、日活、留存與遊玩時長可以衡量一款遊戲，卻不應決定它要成為什麼。",
  "about.v1.p3": "我們不以讓玩家登入得更頻繁、停留得更久、付得更多為設計目的。",
  "about.v1.quote": "不要設計玩家。設計遊戲。",
  "about.v2.name": "遊戲不是第二份工作",
  "about.v2.p1": "我們不靠每日任務、簽到、體力與錯過焦慮維持活躍，也不希望進度上限替玩家決定今天該玩多久。",
  "about.v2.p2": "你可以幾天不登入，也可以在真正有時間、有興致的時候一直玩下去。",
  "about.v2.p3": "遊戲應該讓人因為想玩而打開，而不是因為義務而登入。",
  "about.v3.name": "PVP 就應該是 PVP",
  "about.v3.p1": "玩家選擇匹配，期待遇見的就應該是另一個玩家。",
  "about.v3.p2": "我們不會為了控制勝率、挫敗感或留存，在 PVP 中悄悄加入人機；也不會根據近期勝負、付費傾向或其他隱藏狀態，安排你下一場應該贏還是輸。",
  "about.v3.quote": "匹配服務於競技，而不是服務於操控玩家。",
  "about.v3.p3": "勝負應該屬於你和對手，而不是演算法安排好的體驗曲線。",
  "about.v4.name": "我們不賣「人權」",
  "about.v4.p1": "角色可以強，可以有特色，也可以改變玩法。",
  "about.v4.p2": "但我們不會刻意製造明顯超模的「必抽角色」，等完成銷售後再削弱，然後重複出售下一個「人權」。",
  "about.v4.p3": "平衡會調整，設計也可能犯錯。",
  "about.v4.quote_prefix": "但",
  "about.v4.quote": "「不抽就落後」不會成為我們的商業模式。",
  "about.v4.p4": "我們希望你選擇一個角色，是因為喜歡它、理解它，或者覺得它有趣，而不是因為沒有它就不能玩。",
  "about.v5.name": "做值得留下的遊戲",
  "about.v5.p1": "盈利讓作品得以存在，但盈利不是作品存在的理由。",
  "about.v5.p2": "我們不想研究怎樣把玩家綁得更久。",
  "about.v5.p3": "我們更願意研究，怎樣讓下一局更有趣，讓一個角色值得喜歡，讓一個世界值得回來。",
  "about.v5.quote1": "因為留下玩家最好的方式，不是把玩家綁住。",
  "about.v5.quote2": "而是讓遊戲值得留下。",
  "about.values.closing": "始於星帆，盛於繁星",
  "about.contact.title": "聯繫我們",
  "about.contact.body":
    "合作、媒體或其他事宜，歡迎寄信與我們聯繫",
  "about.contact.social": "或在這些地方找到我們",

  // 合作
  "join.eyebrow": "合作",
  "join.title": "與我們合作",
  "join.lead":
    "我們尋找能把想法落成作品，也願意一起把事情做完的人",
  "join.collab.title": "我們怎麼合作",
  "join.collab.body":
    "每次合作都從明確的工作開始。範圍、時程與報酬先談清楚；彼此合拍，再一起走得更遠。",
  "join.roles.title": "目前的協作方向",
  // 卡上的模式籤：隨型態換（長期夥伴那張若寫「彈性協作」會自相矛盾）
  "join.mode.collab": "遠端 · 彈性協作",
  "join.mode.partner": "遠端 · 長期同行",
  "join.kind.collab": "協作",
  "join.kind.partner": "長期夥伴",
  "join.apply.collab": "洽談協作",
  "join.apply.partner": "談長期參與",
  /*
    B2B：對象不是個人協作者，是公司。與上面的協作方向刻意分開一節，
    信件主旨前綴走 `[Business]`（協作是 `[Collab]`／`[Partner]`），收信端一眼可分。
  */
  "join.biz.title": "發行與商務合作",
  "join.biz.body":
    "歡迎發行商、平臺與媒體洽談發行、宣傳、活動或其他合作；如果《碎界》適合你的玩家與市場，請直接與我們聯絡",
  "join.biz.cta": "洽談商務合作",

  "join.open.title": "不在上面的方向裡？",
  "join.open.body": "沒有完全對上的方向？仍歡迎自我推薦",
  "join.how.title": "如何聯繫",
  "join.how.body": "寄信附上作品集或 GitHub，告訴我們你想做什麼，以及你能讓哪一部分變得更好",

  // 新聞
  "news.eyebrow": "新聞",
  "news.title": "公告與動態",
  "news.lead": "Hoshivel 與旗下作品的最新消息",
  "news.empty": "目前還沒有更多消息",
  "news.back": "返回新聞",
  "news.readMore": "閱讀全文",

  // 404
  "notfound.title": "這片夜空還沒有這顆星",
  "notfound.body": "你要找的頁面不存在，或已移往別處",
  "notfound.back": "回首頁",
} satisfies Record<string, string>;

export type UIKey = keyof typeof zhHant;

const zhCN: Record<UIKey, string> = {
  "site.name": "Hoshivel",
  "site.tagline": "始于星帆，盛于繁星",
  "site.taglineLatin": "From a Star-Sail to a Sea of Stars.",
  "site.metaTagline": "From a Star-Sail to a Sea of Stars. — 始于星帆，盛于繁星",
  "site.summary":
    "From a Star-Sail to a Sea of Stars. — 始于星帆，盛于繁星；Hoshivel（星帆）是独立游戏与世界创作团队，从回合制策略游戏《碎界 Shattered Realms》开始。",

  "nav.works": "作品",
  "nav.news": "新闻",
  "nav.about": "关于",
  "nav.join": "合作",

  "cta.sr": "探索《碎界》",
  "cta.about": "认识我们",
  "cta.visitWork": "前往《碎界》（Shattered Realms）官网",
  "cta.visitService": "打开账户中心",
  "cta.detail": "作品详情",
  "cta.detailService": "服务详情",
  "cta.allNews": "查看全部新闻",
  "cta.join": "了解合作方式",

  "a11y.skip": "跳到主要内容",
  "a11y.langMenu": "切换语言",
  "a11y.home": "回首页",
  "a11y.menu": "菜单",
  "a11y.external": "（外部链接，新窗口打开）",

  "footer.summary": "独立游戏与世界创作团队",
  "footer.worksLabel": "作品",
  "footer.servicesLabel": "服务",
  "footer.orgLabel": "组织",
  "footer.socialLabel": "社区",
  "footer.langLabel": "语言",
  "cookie.settings": "Cookie 设置",
  "cookie.title": "记住你的显示偏好",
  "cookie.body": "我们只使用偏好 Cookie 在 Hoshivel 网站间记住语言，以及在支持的页面记住外观，不用于分析或跟踪。登录与安全所需的 Cookie 会始终启用。",
  "cookie.essential": "仅使用必要 Cookie",
  "cookie.remember": "记住偏好",
  "footer.github": "GitHub",
  "footer.rights": "Hoshivel",

  "home.hero.eyebrow": "独立游戏与世界创作团队",
  "home.hero.creed": "只做真正值得玩的世界",
  "home.hero.lead":
    "Hoshivel 正在打造\n《碎界 Shattered Realms》——\n一个持续展开、值得反复探索的架空世界",

  "home.works.eyebrow": "作品",
  "home.works.title": "从第一个世界开始，把每一寸做好",
  "home.works.lead":
    "《碎界》是我们的第一个世界：从六角战场到每一段旅途，都要让玩家愿意再次回来",

  "home.services.eyebrow": "服务",
  "home.services.title": "让作品专注于世界本身",
  "home.services.lead": "Hoshi ID 让玩家用一个账号往返旗下世界，作品则专注于游玩本身",

  "home.chart.title": "HOSHIVEL 星图",

  "home.news.eyebrow": "新闻",
  "home.news.title": "最新消息",
  "home.news.lead":
    "追踪《碎界》的开发进度、世界观内容与 Hoshivel 最新消息",

  "home.join.title": "与我们协作",
  "home.join.lead":
    "我们以按件、短期项目或弹性兼职展开合作，也期待遇见愿意一起把作品做完整、长期同行的伙伴",

  "works.eyebrow": "作品",
  "works.title": "正在成形的世界",
  "works.lead": "从《碎界》到 Hoshi ID，每个项目都为同一件事服务：让值得玩的世界长久存在",
  "label.work": "作品",
  "label.service": "服务",

  "p.sr.name": "碎界",
  "p.sr.latin": "Shattered Realms",
  "p.sr.kind": "架空世界观 · 2D 回合制策略游戏",
  "p.sr.status": "开发中 · 浏览器可玩",
  "p.sr.short": "在六角棋盘上调度角色，探索随篇章展开的架空世界",
  "p.sr.desc":
    "《碎界》（Shattered Realms）是 Hoshivel 旗下的 2D 六角格回合制策略游戏。踏上漂浮于虚空的碎片大地，在六角棋盘上调度角色、运用地形，探索随篇章展开的架空世界。点击即玩，无需下载",
  "p.sr.f1": "行动点、地形高低与战争迷雾，构成每一步选择",
  "p.sr.f2": "角色成长与英雄技能，组合自己的战术",

  "p.id.name": "Hoshi ID",
  "p.id.latin": "Universal Account",
  "p.id.kind": "Hoshivel 通用账号服务",
  "p.id.status": "已上线 · 《碎界》已接入",
  "p.id.short": "一个账号，连接所有 Hoshivel 世界",
  "p.id.desc":
    "一个账号，连接所有 Hoshivel 世界。登录、账号安全与已连接服务，都能在同一处管理。",
  "p.id.f1": "一次注册，即可登录旗下作品",
  "p.id.f2": "在账户中心管理个人资料、登录记录与已连接服务",

  "about.eyebrow": "关于",
  "about.title": "关于 Hoshivel",
  "about.lead": "我们相信，值得长久存在的世界，需要时间、专注与清楚的选择",
  "about.who.title": "我们是谁",
  "about.who.body1":
    "Hoshivel（星帆）是一支独立游戏与世界创作团队。我们从《碎界 Shattered Realms》开始，也用 Hoshi ID 让玩家以一个账号往返旗下世界。",
  "about.who.body2":
    "我们关心的是世界是否值得探索、玩法是否经得起反复游玩，以及多年后回来时，作品是否依然成立",

  "about.now.title": "现在正在做的事",
  "about.now.body":
    "目前我们正集中完成《碎界》的章节、玩法与美术，并持续改善 Hoshi ID 与相关服务",
  "about.values.title": "我们相信",
  "about.v1.name": "游戏首先应当是游戏",
  "about.v1.p1": "我们做游戏，是因为游戏本身值得被做得有趣。",
  "about.v1.p2": "营收、日活、留存与游玩时长可以衡量一款游戏，却不应决定它要成为什么。",
  "about.v1.p3": "我们不以让玩家登录得更频繁、停留得更久、付得更多为设计目的。",
  "about.v1.quote": "不要设计玩家。设计游戏。",
  "about.v2.name": "游戏不是第二份工作",
  "about.v2.p1": "我们不靠每日任务、签到、体力与错过焦虑维持活跃，也不希望进度上限替玩家决定今天该玩多久。",
  "about.v2.p2": "你可以几天不登录，也可以在真正有时间、有兴致的时候一直玩下去。",
  "about.v2.p3": "游戏应该让人因为想玩而打开，而不是因为义务而登录。",
  "about.v3.name": "PVP 就应该是 PVP",
  "about.v3.p1": "玩家选择匹配，期待遇见的就应该是另一个玩家。",
  "about.v3.p2": "我们不会为了控制胜率、挫败感或留存，在 PVP 中悄悄加入人机；也不会根据近期胜负、付费倾向或其他隐藏状态，安排你下一场应该赢还是输。",
  "about.v3.quote": "匹配服务于竞技，而不是服务于操控玩家。",
  "about.v3.p3": "胜负应该属于你和对手，而不是算法安排好的体验曲线。",
  "about.v4.name": "我们不卖「人权」",
  "about.v4.p1": "角色可以强，可以有特色，也可以改变玩法。",
  "about.v4.p2": "但我们不会刻意制造明显超模的「必抽角色」，等完成销售后再削弱，然后重复出售下一个「人权」。",
  "about.v4.p3": "平衡会调整，设计也可能犯错。",
  "about.v4.quote_prefix": "但",
  "about.v4.quote": "「不抽就落后」不会成为我们的商业模式。",
  "about.v4.p4": "我们希望你选择一个角色，是因为喜欢它、理解它，或者觉得它有趣，而不是因为没有它就不能玩。",
  "about.v5.name": "做值得留下的游戏",
  "about.v5.p1": "盈利让作品得以存在，但盈利不是作品存在的理由。",
  "about.v5.p2": "我们不想研究怎样把玩家绑得更久。",
  "about.v5.p3": "我们更愿意研究，怎样让下一局更有趣，让一个角色值得喜欢，让一个世界值得回来。",
  "about.v5.quote1": "因为留下玩家最好的方式，不是把玩家绑住。",
  "about.v5.quote2": "而是让游戏值得留下。",
  "about.values.closing": "始于星帆，盛于繁星",
  "about.contact.title": "联系我们",
  "about.contact.body": "合作、媒体或其他事宜，欢迎发送邮件与我们联系",
  "about.contact.social": "或在这些地方找到我们",

  "join.eyebrow": "合作",
  "join.title": "与我们合作",
  "join.lead":
    "我们寻找能把想法落成作品，也愿意一起把事情做完的人",
  "join.collab.title": "我们怎么合作",
  "join.collab.body":
    "每次合作都从明确的工作开始。范围、时间安排与报酬先谈清楚；彼此合拍，再一起走得更远。",
  "join.roles.title": "目前的协作方向",
  "join.mode.collab": "远程 · 弹性协作",
  "join.mode.partner": "远程 · 长期同行",
  "join.kind.collab": "协作",
  "join.kind.partner": "长期伙伴",
  "join.apply.collab": "洽谈协作",
  "join.apply.partner": "谈长期参与",
  "join.biz.title": "发行与商务合作",
  "join.biz.body":
    "欢迎发行商、平台与媒体洽谈发行、宣传、活动或其他合作；如果《碎界》适合你的玩家与市场，请直接与我们联系",
  "join.biz.cta": "洽谈商务合作",

  "join.open.title": "不在上面的方向里？",
  "join.open.body": "没有完全对上的方向？仍然欢迎自我推荐",
  "join.how.title": "如何联系",
  "join.how.body": "发送邮件并附上作品集或 GitHub，告诉我们你想做什么，以及你能让哪一部分变得更好",

  "news.eyebrow": "新闻",
  "news.title": "公告与动态",
  "news.lead": "Hoshivel 与旗下作品的最新消息",
  "news.empty": "目前还没有更多消息",
  "news.back": "返回新闻",
  "news.readMore": "阅读全文",

  "notfound.title": "这片夜空还没有这颗星",
  "notfound.body": "你要找的页面不存在，或已移往别处",
  "notfound.back": "回首页",
};

/*
  日本語 —— 漢字圈だが正體中文の訳ではない。以下は本語系だけの決めごと：

  · 品牌名は「Hoshivel」のみ。中文品牌名「星帆」は**中文**の名前であり、
    日本語には持ち込まない（日本語の品牌名を新たに立てることはしない）。
  · 作品名は「砕界」（2026-08-07 決定）。中文の《碎界 Shattered Realms》に
    倣い、正式名は『砕界 Shattered Realms』、それ以外は『砕界』。
    品牌名とは扱いが違う——作品には日本語題があり、品牌名にはない。
  · 用語：ユーザーが持つのは「アカウント」、それを管理する画面は
    「アカウントセンター」。ジャンルは一律「ターン制ストラテジー」。
  · 句点は全站規則どおり——一文なら付けない、二文以上なら付ける。
    読点「、」・コロン「：」・ダッシュ「——」は文の切れ目に数えない。
    正式な英語タグラインだけは確定稿のピリオドを残す。
*/
const ja: Record<UIKey, string> = {
  "site.name": "Hoshivel",
  "site.tagline": "星の帆から始まり、星々の海へ",
  "site.taglineLatin": "From a Star-Sail to a Sea of Stars.",
  "site.metaTagline": "From a Star-Sail to a Sea of Stars. — 星の帆から始まり、星々の海へ",
  "site.summary":
    "From a Star-Sail to a Sea of Stars. — 星の帆から始まり、星々の海へ。Hoshivel はゲームと世界観をつくるインディーチーム。ターン制ストラテジー『砕界 Shattered Realms』を開発しています。",

  "nav.works": "作品",
  "nav.news": "ニュース",
  "nav.about": "私たちについて",
  "nav.join": "一緒に作る",

  "cta.sr": "『砕界』を見る",
  "cta.about": "私たちについて",
  "cta.visitWork": "『砕界』（Shattered Realms）公式サイトへ",
  "cta.visitService": "アカウントセンターを開く",
  "cta.detail": "作品の詳細",
  "cta.detailService": "サービスの詳細",
  "cta.allNews": "すべてのニュースを見る",
  "cta.join": "参加方法を見る",

  "a11y.skip": "本文へスキップ",
  "a11y.langMenu": "言語を切り替える",
  "a11y.home": "ホームへ戻る",
  "a11y.menu": "メニュー",
  "a11y.external": "（外部リンク、新しいタブで開きます）",

  "footer.summary": "ゲームと世界観をつくるインディーチーム",
  "footer.worksLabel": "作品",
  "footer.servicesLabel": "サービス",
  "footer.orgLabel": "組織",
  "footer.socialLabel": "コミュニティ",
  "footer.langLabel": "言語",
  "cookie.settings": "Cookie 設定",
  "cookie.title": "表示設定を記憶する",
  "cookie.body": "Hoshivel のサイト間で言語を、対応ページで外観を記憶するためだけに設定 Cookie を使用します。分析や追跡には使用しません。ログインとセキュリティに必要な Cookie は常に有効です。",
  "cookie.essential": "必須 Cookie のみ",
  "cookie.remember": "設定を記憶",
  "footer.github": "GitHub",
  "footer.rights": "Hoshivel",

  "home.hero.eyebrow": "ゲームと世界観をつくるインディーチーム",
  "home.hero.creed": "本当に遊ぶ価値のある世界だけを作る",
  /*
    漢字も仮名も任意の二文字間で折れるため、正體中文と同じく改行を手で指定する
    （作品名が途中で切られないように）。三行目は Hero 右側に星図が並ぶぶん
    column が狭い——長くすると末尾の一文字だけが四行目に落ちるので、
    ここは 25 文字前後を上限とみておくこと。
  */
  "home.hero.lead":
    "Hoshivel がつくっているのは\n『砕界 Shattered Realms』——\n何度でも探索したくなる、章ごとに広がる架空世界",

  "home.works.eyebrow": "作品",
  "home.works.title": "最初の世界を、隅々まで丁寧に作る",
  "home.works.lead":
    "『砕界』は私たちの最初の世界——ヘクスの戦場から一つ一つの旅まで、また戻りたくなる体験を目指します",

  "home.services.eyebrow": "サービス",
  "home.services.title": "世界づくりに集中するために",
  "home.services.lead":
    "Hoshi ID がひとつのアカウントで世界をつなぎ、ゲームは遊びそのものに集中できるようにします",

  "home.chart.title": "HOSHIVEL 星図",

  "home.news.eyebrow": "ニュース",
  "home.news.title": "最新情報",
  "home.news.lead":
    "『砕界』の開発状況、世界設定、Hoshivel の最新情報をお届けします",

  "home.join.title": "一緒に作る",
  "home.join.lead":
    "案件単位や短期プロジェクト、柔軟なパートタイムなど、さまざまな形で一緒に制作できます。作品を完成させ、その先も長く歩める仲間との出会いも待っています。",

  "works.eyebrow": "作品",
  "works.title": "形になりつつある世界",
  "works.lead":
    "『砕界』から Hoshi ID まで、すべては遊ぶ価値のある世界を長く残すためにあります",
  "label.work": "作品",
  "label.service": "サービス",

  "p.sr.name": "砕界",
  "p.sr.latin": "Shattered Realms",
  "p.sr.kind": "架空世界 · 2D ターン制ストラテジー",
  "p.sr.status": "開発中 · ブラウザでプレイ可能",
  "p.sr.short": "ヘクスボードで仲間を動かし、章ごとに広がる架空世界を探索します",
  "p.sr.desc":
    "『砕界』（Shattered Realms）は Hoshivel が手がける 2D ヘックス制ターンベース・ストラテジーです。虚空に浮かぶ砕けた大地を舞台に、ヘクスボードで仲間を動かし、地形を生かして、章ごとに広がる世界を探索します。クリックしてすぐに遊べ、ダウンロードは不要です。",
  "p.sr.f1": "行動ポイント、地形の高低、戦場の霧が一手ごとの判断を形づくります",
  "p.sr.f2": "キャラクターの成長とスキルを組み合わせ、自分の戦術をつくります",

  "p.id.name": "Hoshi ID",
  "p.id.latin": "Universal Account",
  "p.id.kind": "Hoshivel 共通アカウント",
  "p.id.status": "公開中 · 砕界 連携済み",
  "p.id.short": "ひとつのアカウントで、すべての Hoshivel の世界へ",
  "p.id.desc":
    "ひとつのアカウントで、すべての Hoshivel の世界へ。ログイン、セキュリティ、連携済みサービスを一か所で管理できます。",
  "p.id.f1": "一度の登録で Hoshivel のゲームにログインできます",
  "p.id.f2": "プロフィール、ログイン履歴、連携済みサービスをアカウントセンターで管理できます",

  "about.eyebrow": "私たちについて",
  "about.title": "Hoshivel について",
  "about.lead":
    "長く残る世界には、時間と集中、そして明確な選択が必要だと考えています",
  "about.who.title": "私たちは何者か",
  "about.who.body1":
    "Hoshivel は、ゲームと世界観をつくるインディーチームです。『砕界 Shattered Realms』から始め、Hoshi ID でひとつのアカウントから各世界へ行き来できるようにしています。",
  "about.who.body2":
    "世界を探索する価値があるか、何度遊んでも面白いか、そして何年後に戻っても作品として成り立つかを大切にしています",

  "about.now.title": "いま取り組んでいること",
  "about.now.body":
    "現在は『砕界』の章、ゲーム性、アートを形にしながら、Hoshi ID と関連サービスを改善しています",
  "about.values.title": "私たちが信じていること",
  "about.v1.name": "ゲームは、まずゲームであるべき",
  "about.v1.p1": "私たちがゲームを作るのは、ゲームそのものが面白く作られる価値を持つからです。",
  "about.v1.p2": "売上、DAU、継続率、プレイ時間はゲームを測ることはできても、そのゲームが何になるべきかを決めるものではありません。",
  "about.v1.p3": "より頻繁にログインさせ、より長く滞在させ、より多く支払わせることを設計目的にはしません。",
  "about.v1.quote": "プレイヤーを設計しない。ゲームを設計する。",
  "about.v2.name": "ゲームは第二の仕事ではない",
  "about.v2.p1": "デイリー任務、ログインボーナス、スタミナ、取り逃す不安でアクティブ率を保たず、進行上限に今日のプレイ時間を決めさせることもしません。",
  "about.v2.p2": "数日ログインしなくてもいいし、本当に時間と遊びたい気持ちがある日には、好きなだけ遊べます。",
  "about.v2.p3": "ゲームは義務だから開くのではなく、遊びたいから開くものであるべきです。",
  "about.v3.name": "PVP は PVP であるべき",
  "about.v3.p1": "マッチングを選んだプレイヤーが出会うべき相手は、別のプレイヤーです。",
  "about.v3.p2": "勝率、挫折感、継続率を操作するために PVP へ密かに BOT を混ぜることはありません。直近の勝敗、課金傾向、その他の隠れた状態から、次の一戦で勝つべきか負けるべきかを決めることもしません。",
  "about.v3.quote": "マッチングは競技のためにある。プレイヤーを操作するためではない。",
  "about.v3.p3": "勝敗はあなたと対戦相手のものであり、アルゴリズムが用意した体験曲線のものではありません。",
  "about.v4.name": "私たちは「人権キャラ」を売らない",
  "about.v4.p1": "キャラクターは強くても、個性的でも、遊び方を変える存在でもかまいません。",
  "about.v4.p2": "しかし、明らかに性能が突出した「必須キャラ」を意図的に作り、売り切った後で弱体化し、次の「人権キャラ」を繰り返し売ることはありません。",
  "about.v4.p3": "バランスは調整され、設計を誤ることもあります。",
  "about.v4.quote_prefix": "しかし、",
  "about.v4.quote": "「引かなければ遅れる」を私たちのビジネスモデルにはしません。",
  "about.v4.p4": "キャラクターを選ぶ理由は、好きだから、理解できたから、面白そうだからであって、そのキャラクターがいなければ遊べないからではないことを願っています。",
  "about.v5.name": "残る価値のあるゲームを作る",
  "about.v5.p1": "利益は作品を存続させますが、利益が作品の存在理由ではありません。",
  "about.v5.p2": "どうすればプレイヤーをより長く縛れるかを研究したいとは思いません。",
  "about.v5.p3": "次の一戦をもっと面白くする方法、好きになれるキャラクター、戻る価値のある世界を研究したいと考えています。",
  "about.v5.quote1": "プレイヤーに残ってもらう最良の方法は、縛りつけることではありません。",
  "about.v5.quote2": "ゲームそのものを、残る価値のあるものにすることです。",
  "about.values.closing": "星の帆から始まり、星々の海へ",
  "about.contact.title": "お問い合わせ",
  "about.contact.body":
    "協業、取材、その他のご相談はメールでご連絡ください",
  "about.contact.social": "こちらでも見つけられます",

  "join.eyebrow": "参加方法",
  "join.title": "一緒に作る",
  "join.lead":
    "アイデアを作品に変え、最後まで一緒に仕上げられる人を探しています",
  "join.collab.title": "一緒に作るまで",
  "join.collab.body":
    "まずは内容が明確な仕事から始めます。範囲、スケジュール、報酬を先に決め、相性が合えばその先も一緒に進みます。",
  "join.roles.title": "いま募集している役割",
  "join.mode.collab": "リモート · 柔軟な参加",
  "join.mode.partner": "リモート · 長期参画",
  "join.kind.collab": "プロジェクト参加",
  "join.kind.partner": "長期パートナー",
  "join.apply.collab": "参加について相談する",
  "join.apply.partner": "長期参画について相談する",
  "join.biz.title": "パブリッシングとビジネス",
  "join.biz.body":
    "パブリッシャー、プラットフォーム、メディアの皆さまへ——『砕界』が皆さまのプレイヤーと市場に合うと感じたら、配信、宣伝、イベントなどについてご相談ください",
  "join.biz.cta": "ビジネス協業を相談する",

  "join.open.title": "上のどれにも当てはまりませんか？",
  "join.open.body": "ぴったりの役割がなくても、自己推薦は歓迎です",
  "join.how.title": "連絡のしかた",
  "join.how.body":
    "ポートフォリオか GitHub を添えて、何を作りたいか、どこをより良くできるかをメールで教えてください",

  "news.eyebrow": "ニュース",
  "news.title": "お知らせと更新",
  "news.lead": "Hoshivel と各作品の最新情報",
  "news.empty": "いまのところ、これ以上のお知らせはありません",
  "news.back": "ニュースへ戻る",
  "news.readMore": "続きを読む",

  "notfound.title": "この夜空に、その星はまだありません",
  "notfound.body": "お探しのページは存在しないか、別の場所へ移動しました",
  "notfound.back": "ホームへ戻る",
};

const en: Record<UIKey, string> = {
  "site.name": "Hoshivel",
  "site.tagline": "From a Star-Sail to a Sea of Stars.",
  "site.taglineLatin": "From a Star-Sail to a Sea of Stars.",
  "site.metaTagline": "From a Star-Sail to a Sea of Stars.",
  "site.summary":
    "From a Star-Sail to a Sea of Stars. Hoshivel creates original games and worlds, beginning with the turn-based strategy game Shattered Realms.",

  "nav.works": "Works",
  "nav.news": "News",
  "nav.about": "About",
  "nav.join": "Work with us",

  "cta.sr": "Explore Shattered Realms",
  "cta.about": "About us",
  "cta.visitWork": "Visit Shattered Realms",
  "cta.visitService": "Open account center",
  "cta.detail": "Details",
  "cta.detailService": "Details",
  "cta.allNews": "All news",
  "cta.join": "How to work with us",

  "a11y.skip": "Skip to main content",
  "a11y.langMenu": "Switch language",
  "a11y.home": "Back to home",
  "a11y.menu": "Menu",
  "a11y.external": "(external link, opens in a new tab)",

  "footer.summary": "Independent games & original worlds",
  "footer.worksLabel": "Works",
  "footer.servicesLabel": "Service",
  "footer.orgLabel": "Organization",
  "footer.socialLabel": "Community",
  "footer.langLabel": "Language",
  "cookie.settings": "Cookie settings",
  "cookie.title": "Remember your display preferences",
  "cookie.body": "We use preference cookies only to remember your language across Hoshivel sites and your appearance on supported pages. They are not used for analytics or tracking. Cookies required for sign-in and security always remain enabled.",
  "cookie.essential": "Essential cookies only",
  "cookie.remember": "Remember preferences",
  "footer.github": "GitHub",
  "footer.rights": "Hoshivel",

  "home.hero.eyebrow": "Independent games & world-building",
  "home.hero.creed": "Only worlds worth playing",
  "home.hero.lead":
    "Hoshivel is building Shattered Realms — an original world that unfolds chapter by chapter and rewards returning to explore",

  "home.works.eyebrow": "Works",
  "home.works.title": "Start with one world, and get every inch of it right",
  "home.works.lead":
    "Shattered Realms is our first world: from its hex battlefields to every journey within it, each part should make players want to return",

  "home.services.eyebrow": "Service",
  "home.services.title": "So every game can focus on its world",
  "home.services.lead":
    "Hoshi ID connects our worlds with one account, leaving each game to focus on play",

  "home.chart.title": "THE HOSHIVEL CHART",

  "home.news.eyebrow": "News",
  "home.news.title": "Latest news",
  "home.news.lead":
    "Follow the development of Shattered Realms, stories from its world and the latest from Hoshivel",

  "home.join.title": "Work with us",
  "home.join.lead":
    "We collaborate per project, for short stretches or through flexible part-time work, and hope to meet people who want to finish great games and stay for the long road",

  "works.eyebrow": "Works",
  "works.title": "A world taking shape",
  "works.lead":
    "From Shattered Realms to Hoshi ID, everything serves one goal: keeping worlds worth playing alive for the long term",
  "label.work": "WORK",
  "label.service": "SERVICE",

  "p.sr.name": "Shattered Realms",
  "p.sr.latin": "Shattered Realms",
  "p.sr.kind": "2D turn-based strategy in an original world",
  "p.sr.status": "In development · playable in browser",
  "p.sr.short": "Position your cast on a hex board and explore an original world that unfolds chapter by chapter",
  "p.sr.desc":
    "Shattered Realms (碎界) is a 2D turn-based strategy game on a hex grid, made by Hoshivel. Cross fragmented lands adrift in the void, position your cast on a hex board and use the terrain as an original world unfolds chapter by chapter. Click to play, no download required.",
  "p.sr.f1": "Action points, elevation and fog of war make every move a choice",
  "p.sr.f2": "Combine character growth and hero skills into your own tactics",

  "p.id.name": "Hoshi ID",
  "p.id.latin": "Universal Account",
  "p.id.kind": "The account for every Hoshivel world",
  "p.id.status": "Live · Shattered Realms connected",
  "p.id.short": "One account for every Hoshivel world",
  "p.id.desc":
    "One Hoshi ID. Every Hoshivel world. Manage sign-in, account security and connected services in one place.",
  "p.id.f1": "Register once, then sign in to every Hoshivel game",
  "p.id.f2": "Manage your profile, sign-in history and connected services in the account center",

  "about.eyebrow": "About",
  "about.title": "About Hoshivel",
  "about.lead":
    "Worlds built to last need time, focus and clear choices",
  "about.who.title": "Who we are",
  "about.who.body1":
    "Hoshivel is an independent team creating games and original worlds. We began with Shattered Realms, while Hoshi ID lets players move between our worlds with one account.",
  "about.who.body2":
    "We care whether a world rewards exploration, whether its systems stay interesting, and whether the game still holds together when players return years later",

  "about.now.title": "What we're working on",
  "about.now.body":
    "We're focused on the chapters, systems and art of Shattered Realms while continuing to improve Hoshi ID and related services",
  "about.values.title": "What we believe",
  "about.v1.name": "Games should be games first",
  "about.v1.p1": "We make games because games themselves are worth making fun.",
  "about.v1.p2": "Revenue, daily active users, retention and playtime can measure a game, but they should not decide what it becomes.",
  "about.v1.p3": "We do not design around making players log in more often, stay longer or pay more.",
  "about.v1.quote": "Don't design players. Design games.",
  "about.v2.name": "A game is not a second job",
  "about.v2.p1": "We do not rely on daily quests, check-ins, energy systems or fear of missing out to sustain activity, nor do we want progression caps deciding how long someone should play today.",
  "about.v2.p2": "You can stay away for days, or keep playing when you genuinely have the time and desire.",
  "about.v2.p3": "A game should be opened because someone wants to play, not because they feel obliged to log in.",
  "about.v3.name": "PVP should be PVP",
  "about.v3.p1": "When players choose matchmaking, they should expect to meet another player.",
  "about.v3.p2": "We will not quietly add bots to PVP to control win rates, frustration or retention. Nor will recent results, spending tendencies or other hidden states decide whether you should win or lose your next match.",
  "about.v3.quote": "Matchmaking serves competition, not the manipulation of players.",
  "about.v3.p3": "The outcome should belong to you and your opponent, not to an experience curve arranged by an algorithm.",
  "about.v4.name": "We don't sell “must-pulls”",
  "about.v4.p1": "Characters can be powerful, distinctive and capable of changing how the game is played.",
  "about.v4.p2": "But we will not deliberately create an obviously overpowered must-pull, weaken it after the sale is made, then repeat the cycle with the next one.",
  "about.v4.p3": "Balance will change, and design can be wrong.",
  "about.v4.quote_prefix": "But ",
  "about.v4.quote": "“pull or fall behind” will not be our business model.",
  "about.v4.p4": "We want you to choose a character because you like them, understand them or find them interesting—not because the game is unplayable without them.",
  "about.v5.name": "Make games worth staying for",
  "about.v5.p1": "Profit allows a work to exist, but profit is not the reason it exists.",
  "about.v5.p2": "We do not want to study how to bind players to a game for longer.",
  "about.v5.p3": "We would rather study how to make the next match more interesting, a character worth caring about and a world worth returning to.",
  "about.v5.quote1": "The best way to keep players is not to hold them captive.",
  "about.v5.quote2": "It is to make a game worth staying for.",
  "about.values.closing": "From a Star-Sail to a Sea of Stars.",
  "about.contact.title": "Contact",
  "about.contact.body":
    "For partnerships, press or anything else, reach us by email",
  "about.contact.social": "Or find us here",

  "join.eyebrow": "Work with us",
  "join.title": "Work with us",
  "join.lead":
    "We're looking for people who turn ideas into finished games and see the work through with us",
  "join.collab.title": "What working together looks like",
  "join.collab.body":
    "Every collaboration starts with a clear piece of work. We agree on scope, schedule and pay first; if we work well together, we keep going.",
  "join.roles.title": "Where we're looking for help",
  "join.mode.collab": "Remote · flexible",
  "join.mode.partner": "Remote · for the long road",
  "join.kind.collab": "Collaboration",
  "join.kind.partner": "Long-term partner",
  "join.apply.collab": "Talk about a collaboration",
  "join.apply.partner": "Talk about joining",
  "join.biz.title": "Publishing & business",
  "join.biz.body":
    "Publishers, platforms and media are welcome to discuss publishing, promotion, events or other partnerships if Shattered Realms fits your players and market",
  "join.biz.cta": "Discuss a partnership",

  "join.open.title": "Not on this list?",
  "join.open.body": "If none of these roles fits exactly, you're still welcome to introduce yourself",
  "join.how.title": "How to reach us",
  "join.how.body":
    "Email your portfolio or GitHub and tell us what you want to build and what you can make better",

  "news.eyebrow": "News",
  "news.title": "Announcements & updates",
  "news.lead": "The latest from Hoshivel and our games",
  "news.empty": "No more news for now",
  "news.back": "Back to news",
  "news.readMore": "Read more",

  "notfound.title": "No star at these coordinates",
  "notfound.body": "The page you're looking for doesn't exist, or has moved",
  "notfound.back": "Back to home",
};

export const ui: Record<Locale, Record<UIKey, string>> = {
  "zh-Hant": zhHant,
  "zh-CN": zhCN,
  ja,
  en,
};
