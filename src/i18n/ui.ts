/*
  Hoshivel 官方門戶 —— 介面文案字典（四語）。

  慣例沿用家族（sr-web）：zh-Hant 為主語言與鍵的權威來源；
  zh-CN / ja / en 逐鍵齊備（型別強制完整，缺鍵編譯不過）。
  品牌名 Hoshivel 一律整詞使用：不拆字、不解字源、不加註解；
  中文品牌名「星帆」與它並用，同樣是完整的詞——但它是**中文**品牌名，
  日文與英文頁一律只用 Hoshivel，不另立一個日文品牌名。

  ── 用語規則（全站一致，改文案前先看）──────────────
  · **句號看句數**：一句不加，兩句以上才加。標題、標籤、按鈕與標語一律不加。
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
  /** 正式題詞（字標、頁標題後綴、OG 圖皆用它）。 */
  "site.tagline": "讓星辰，成為世界",
  /** 題詞的拉丁書寫（漢字語系頁面在題詞下並排一行）。 */
  "site.taglineLatin": "WHERE STARS BECOME WORLDS",
  /** 定位第二句：位階小於題詞，但同在 Hero 的醒目處。 */
  "site.creed": "不把遊戲做成另一份工作，只做真正值得玩的世界",
  /** 做事方式（不是題詞）——首頁間奏與關於頁〈我們相信〉共用這一句。 */
  "site.motto": "快的事情交給世界，慢的事情留給我們",
  "site.summary":
    "Hoshivel（星帆）是一個獨立遊戲與世界創作團隊，正在開發架空世界回合制策略遊戲《碎界 Shattered Realms》，並自建讓旗下作品長期運行的服務",

  "nav.works": "作品",
  "nav.news": "新聞",
  "nav.about": "關於",
  "nav.join": "加入我們",

  /** 首頁 Hero 的主行動：指向旗艦作品，不是泛稱的「作品」。 */
  "cta.sr": "探索《碎界》",
  "cta.about": "認識我們",
  "cta.visit": "前往官網",
  "cta.detail": "作品詳情",
  "cta.detailService": "服務詳情",
  "cta.allNews": "查看所有動態",
  "cta.join": "查看協作需求",

  "a11y.skip": "跳到主要內容",
  "a11y.langMenu": "切換語言",
  "a11y.home": "回首頁",
  "a11y.menu": "選單",
  "a11y.external": "（外部連結，另開新視窗）",

  /** 站尾署名（「星帆」的引申，與題詞同一個意象）。 */
  "footer.summary": "始於星帆，盛於繁星",
  "footer.worksLabel": "作品",
  "footer.servicesLabel": "服務",
  "footer.orgLabel": "組織",
  "footer.socialLabel": "社群",
  "footer.langLabel": "語言",
  "footer.github": "GitHub",
  "footer.rights": "Hoshivel",

  // 首頁 Hero
  "home.hero.eyebrow": "獨立遊戲與世界創作團隊",
  /*
    導語的斷行是**手工指定的**（`\n`，由 `.hv-hero__lead` 的 `white-space: pre-line`
    落實）。漢字可在任兩字之間斷開，交給瀏覽器會把《碎界 Shattered Realms》攔腰
    截斷；三行的斷點取在「遊戲｜作品全名｜並為……」，作品全名獨佔一行。
    漢字語系才需要，英文自己在空白處斷得乾淨——en 不插 `\n`。
  */
  "home.hero.lead":
    "星帆（Hoshivel）正在開發架空世界的回合制策略遊戲\n《碎界 Shattered Realms》，\n並為旗下作品逐步建起長期運行所需的服務",

  // 首頁 作品（α）
  "home.works.eyebrow": "作品",
  "home.works.title": "從第一個世界開始，把每一寸做好",
  "home.works.lead":
    "《碎界》是星帆正在全力開發的首部作品：一個隨篇章持續展開的架空世界，從第一章起就要值得一直玩下去",

  // 首頁 服務（不編章節：以環標另立一節）
  "home.services.eyebrow": "服務",
  "home.services.title": "讓作品專注於世界本身",
  "home.services.lead": "遊戲之外，我們也自建支撐作品長期運行的服務",

  // 首頁 星圖（Hero 圖版）
  "home.chart.title": "HOSHIVEL 星圖",
  "home.chart.note": "亮星是作品，環標是支撐它的服務——點一下看看",

  // 首頁 開發動態（β）
  "home.news.eyebrow": "新聞",
  "home.news.title": "開發動態",
  "home.news.lead":
    "我們不只放上完成的結果，也記錄作品如何一步步成形：《碎界》的開發進度、世界觀內容，以及 Hoshivel 的最新消息",

  // 首頁 理念一句（間奏，引用 site.motto）
  "home.belief.source": "Hoshivel 的做事方式",

  // 首頁 協作（δ）
  "home.join.title": "與我們協作",
  // 不列舉工種：按件協作目前只開視覺一項，寫「程式與視覺」會招來對不上的來信。
  "home.join.lead":
    "目前我們以小型核心團隊運作，並以按件、短期專案與彈性兼職的方式，尋找能一起把成果做出來的創作者",
  "home.join.lead2":
    "我們也期待遇見方向一致的夥伴——把作品做完整，並在往後的創作旅程裡繼續同行",

  // 作品頁
  "works.eyebrow": "作品",
  "works.title": "正在成形的世界",
  "works.lead": "這是我們正在建造的世界，以及讓它長期運行的服務",
  "label.work": "作品",
  "label.service": "服務",

  // 作品：碎界 Shattered Realms
  "p.sr.name": "碎界",
  "p.sr.latin": "SHATTERED REALMS",
  "p.sr.kind": "架空世界觀 · 2D 回合制策略遊戲",
  "p.sr.status": "開發中 · 官網已上線",
  "p.sr.desc":
    "在漂浮於虛空的碎片大地上，以六角棋盤的戰鬥、角色成長與英雄技能組合，探索一個隨篇章持續展開的架空世界。網頁即點即玩，無需下載。",
  "p.sr.f1": "六角棋盤上的深度策略——行動點、地形高低與戰爭迷霧",
  "p.sr.f2": "章節式世界觀——風雪過境、星痕紀元，篇章持續生長",
  "p.sr.f3": "就近分流節點，瀏覽器即點即玩",

  // 服務：Hoshi ID
  "p.id.name": "Hoshi ID",
  "p.id.latin": "UNIVERSAL ACCOUNT",
  "p.id.kind": "通用帳號 · OpenID Connect 身份服務",
  "p.id.status": "已上線 · 碎界已接入",
  "p.id.desc":
    "一個帳號，連接所有 Hoshivel 世界。Hoshi ID 統一處理登入、帳號安全與已連接服務，讓每一部作品都能專注於自己的世界。",
  "p.id.f1": "一個帳號、單一登入，一次註冊通行所有 Hoshivel 世界",
  "p.id.f2": "帳戶中心：個人檔案、登入紀錄與已連接服務，一頁管理",
  "p.id.f3": "帳號安全由 Hoshi ID 統一維護，各作品只保存自己的遊戲資料",

  // 關於頁
  "about.eyebrow": "關於",
  "about.title": "關於 Hoshivel",
  "about.lead": "一支獨立的遊戲與世界創作團隊，用長期的眼光打造作品與服務",
  "about.who.title": "我們是誰",
  "about.who.body1":
    "星帆（Hoshivel）是一個獨立遊戲與世界創作團隊。我們正在開發架空世界回合制策略遊戲《碎界 Shattered Realms》，並打造了 Hoshi ID——一個帳號暢遊 Hoshivel 世界。",
  "about.who.body2":
    "我們更在意一個世界是否值得探索、一段故事是否值得記住，以及每一次遊玩本身是否真的有意思",

  /*
    信條長節——Hero 那句 `site.creed`（不把遊戲做成另一份工作）在關於頁的展開。
    五條 `no*` 是同一組排比，**鍵序即顯示序**，順序是語氣的推進，增刪要連著改
    （`AboutPage.astro` 的 `creedNots` 也要跟著加減）；`close2` 是全站對外最重的
    一句話，位置與寫法都不宜隨手動。
    句號照全站規則走（見本檔開頭的用語規則）：五條否定各只有一句，
    一律不加；`body1`／`body2` 各兩句，才加。no3 中間是分號不是句號。
  */
  "about.creed.title": "遊戲不該是另一份工作",
  "about.creed.lead": "我們相信，玩家值得擁有真正有意思的遊戲",
  "about.creed.no1":
    "不是每天已經疲憊不堪，仍要登入打卡、完成任務、清空體力的另一份工作",
  "about.creed.no2":
    "不是為了留存率、付費率與營收曲線，把樂趣拆成無止境的日常、期限與焦慮",
  "about.creed.no3":
    "不是刻意製造強度明顯超標的「人權角色」，讓玩家為了跟上版本不得不擁有；等販售週期結束後再回調強度，接著推出下一個新的「必需品」",
  "about.creed.no4":
    "不是用重複勞動、數值膨脹和「錯過就不再擁有」的懲罰，換取更長的線上時間",
  "about.creed.no5": "也不是讓短期營運收益凌駕於玩法、內容與玩家體驗之上",
  "about.creed.body1":
    "遊戲首先應當是遊戲。它應該新鮮、有趣，尊重玩家的時間；讓人因為期待而打開，而不是因為義務和焦慮不得不登入。",
  "about.creed.body2":
    "星帆希望創造的，是由想法、玩法與世界本身驅動的作品。盈利可以讓作品繼續存在，但不應反過來決定一部作品必須成為什麼。",
  "about.creed.close1": "我們不想製造一套更有效率地消耗玩家時間的系統",
  "about.creed.close2": "我們想做的，是新穎、有意思，而且真正值得玩的遊戲",

  "about.now.title": "現在正在做的事",
  "about.now.body":
    "《碎界》仍在開發，官網已上線；Hoshi ID 已上線，並且是《碎界》現在的登入方式。接下來的重心，是把《碎界》的章節、玩法與美術逐步補完，同時讓支撐它的服務跟著站穩。",
  "about.values.title": "我們相信",
  "about.v1.name": "值得玩，才做",
  "about.v1.desc":
    "遊戲該讓人享受探索與思考，而不是每天要交差的例行工作。撐不起這一點的設計，我們不放進來。",
  "about.v2.name": "玩家即同行者",
  "about.v2.desc":
    "玩家不是流量，是同行的人。做決定時，我們先想十年後的玩家會怎麼看。",
  "about.v3.name": "做得長久",
  "about.v3.desc":
    "架構、美術與社群，都以「多年後仍然成立」為標準來打造",
  "about.contact.title": "聯繫我們",
  "about.contact.body":
    "合作、媒體或其他事宜，歡迎透過 GitHub 或信箱與我們聯繫",
  "about.contact.social": "或在這些地方找到我們",

  // 加入我們（協作）
  "join.eyebrow": "加入我們",
  "join.title": "與我們協作",
  "join.lead":
    "星帆是一支遠端協作的小型團隊。我們以按件、短期專案與彈性兼職的方式，尋找能一起把成果做出來的創作者；也期待遇見方向一致、願意長期同行的夥伴。",
  "join.collab.title": "協作在這裡是什麼意思",
  "join.collab.body":
    "多數合作從一件明確的事開始：範圍、時程與報酬先談清楚，再動手。做得順、方向也對得上，就把合作延續下去——短期彈性協作，長期一路前行。",
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
  "join.biz.body1": "我們也歡迎遊戲發行、平臺、媒體及其他產業合作方與我們聯絡",
  "join.biz.body2":
    "如果你認為我們的作品適合你們的玩家與市場，我們願意聊聊發行、宣傳、活動與其他形式的合作",
  "join.biz.cta": "商務聯絡",

  "join.open.title": "不在上面的方向裡？",
  "join.open.body":
    "仍然歡迎自我推薦。附上作品或 GitHub，告訴我們你能讓哪一部分變得更好——位置可以之後再談。",
  "join.how.title": "如何聯繫",
  "join.how.body": "寄信給我們，附上你的作品集或 GitHub，聊聊你想做的事",

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
  "site.tagline": "让星辰，成为世界",
  "site.taglineLatin": "WHERE STARS BECOME WORLDS",
  "site.creed": "不把游戏做成另一份工作，只做真正值得玩的世界",
  "site.motto": "快的事情交给世界，慢的事情留给我们",
  "site.summary":
    "Hoshivel（星帆）是一个独立游戏与世界创作团队，正在开发架空世界回合制策略游戏《碎界 Shattered Realms》，并自建让旗下作品长期运行的服务",

  "nav.works": "作品",
  "nav.news": "新闻",
  "nav.about": "关于",
  "nav.join": "加入我们",

  "cta.sr": "探索《碎界》",
  "cta.about": "认识我们",
  "cta.visit": "前往官网",
  "cta.detail": "作品详情",
  "cta.detailService": "服务详情",
  "cta.allNews": "查看所有动态",
  "cta.join": "查看协作需求",

  "a11y.skip": "跳到主要内容",
  "a11y.langMenu": "切换语言",
  "a11y.home": "回首页",
  "a11y.menu": "菜单",
  "a11y.external": "（外部链接，新窗口打开）",

  "footer.summary": "始于星帆，盛于繁星",
  "footer.worksLabel": "作品",
  "footer.servicesLabel": "服务",
  "footer.orgLabel": "组织",
  "footer.socialLabel": "社区",
  "footer.langLabel": "语言",
  "footer.github": "GitHub",
  "footer.rights": "Hoshivel",

  "home.hero.eyebrow": "独立游戏与世界创作团队",
  "home.hero.lead":
    "星帆（Hoshivel）正在开发架空世界的回合制策略游戏\n《碎界 Shattered Realms》，\n并为旗下作品逐步建起长期运行所需的服务",

  "home.works.eyebrow": "作品",
  "home.works.title": "从第一个世界开始，把每一寸做好",
  "home.works.lead":
    "《碎界》是星帆正在全力开发的首部作品：一个随篇章持续展开的架空世界，从第一章起就要值得一直玩下去",

  "home.services.eyebrow": "服务",
  "home.services.title": "让作品专注于世界本身",
  "home.services.lead": "游戏之外，我们也自建支撑作品长期运行的服务",

  "home.chart.title": "HOSHIVEL 星图",
  "home.chart.note": "亮星是作品，环标是支撑它的服务——点一下看看",

  "home.news.eyebrow": "新闻",
  "home.news.title": "开发动态",
  "home.news.lead":
    "我们不只放上完成的结果，也记录作品如何一步步成形：《碎界》的开发进度、世界观内容，以及 Hoshivel 的最新消息",

  "home.belief.source": "Hoshivel 的做事方式",

  "home.join.title": "与我们协作",
  "home.join.lead":
    "目前我们以小型核心团队运作，并以按件、短期项目与弹性兼职的方式，寻找能一起把成果做出来的创作者",
  "home.join.lead2":
    "我们也期待遇见方向一致的伙伴——把作品做完整，并在往后的创作旅程里继续同行",

  "works.eyebrow": "作品",
  "works.title": "正在成形的世界",
  "works.lead": "这是我们正在建造的世界，以及让它长期运行的服务",
  "label.work": "作品",
  "label.service": "服务",

  "p.sr.name": "碎界",
  "p.sr.latin": "SHATTERED REALMS",
  "p.sr.kind": "架空世界观 · 2D 回合制策略游戏",
  "p.sr.status": "开发中 · 官网已上线",
  "p.sr.desc":
    "在漂浮于虚空的碎片大地上，以六角棋盘的战斗、角色成长与英雄技能组合，探索一个随篇章持续展开的架空世界。网页即点即玩，无需下载。",
  "p.sr.f1": "六角棋盘上的深度策略——行动点、地形高低与战争迷雾",
  "p.sr.f2": "章节式世界观——风雪过境、星痕纪元，篇章持续生长",
  "p.sr.f3": "就近分流节点，浏览器即点即玩",

  "p.id.name": "Hoshi ID",
  "p.id.latin": "UNIVERSAL ACCOUNT",
  "p.id.kind": "通用账号 · OpenID Connect 身份服务",
  "p.id.status": "已上线 · 碎界已接入",
  "p.id.desc":
    "一个账号，连接所有 Hoshivel 世界。Hoshi ID 统一处理登录、账号安全与已连接服务，让每一部作品都能专注于自己的世界。",
  "p.id.f1": "一个账号、单点登录，一次注册通行所有 Hoshivel 世界",
  "p.id.f2": "账户中心：个人资料、登录记录与已连接服务，一页管理",
  "p.id.f3": "账号安全由 Hoshi ID 统一维护，各作品只保存自己的游戏数据",

  "about.eyebrow": "关于",
  "about.title": "关于 Hoshivel",
  "about.lead": "一支独立的游戏与世界创作团队，用长期的眼光打造作品与服务",
  "about.who.title": "我们是谁",
  "about.who.body1":
    "星帆（Hoshivel）是一个独立游戏与世界创作团队。我们正在开发架空世界回合制策略游戏《碎界 Shattered Realms》，并打造了 Hoshi ID——一个账号畅游 Hoshivel 世界。",
  "about.who.body2":
    "我们更在意一个世界是否值得探索、一段故事是否值得记住，以及每一次游玩本身是否真的有意思",

  "about.creed.title": "游戏不该是另一份工作",
  "about.creed.lead": "我们相信，玩家值得拥有真正有意思的游戏",
  "about.creed.no1":
    "不是每天已经疲惫不堪，仍要登录打卡、完成任务、清空体力的另一份工作",
  "about.creed.no2":
    "不是为了留存率、付费率与营收曲线，把乐趣拆成无止境的日常、期限与焦虑",
  "about.creed.no3":
    "不是刻意制造强度明显超标的「人权角色」，让玩家为了跟上版本不得不拥有；等贩售周期结束后再回调强度，接着推出下一个新的「必需品」",
  "about.creed.no4":
    "不是用重复劳动、数值膨胀和「错过就不再拥有」的惩罚，换取更长的在线时间",
  "about.creed.no5": "也不是让短期运营收益凌驾于玩法、内容与玩家体验之上",
  "about.creed.body1":
    "游戏首先应当是游戏。它应该新鲜、有趣，尊重玩家的时间；让人因为期待而打开，而不是因为义务和焦虑不得不登录。",
  "about.creed.body2":
    "星帆希望创造的，是由想法、玩法与世界本身驱动的作品。盈利可以让作品继续存在，但不应反过来决定一部作品必须成为什么。",
  "about.creed.close1": "我们不想制造一套更有效率地消耗玩家时间的系统",
  "about.creed.close2": "我们想做的，是新颖、有意思，而且真正值得玩的游戏",

  "about.now.title": "现在正在做的事",
  "about.now.body":
    "《碎界》仍在开发，官网已上线；Hoshi ID 已上线，并且是《碎界》现在的登录方式。接下来的重心，是把《碎界》的章节、玩法与美术逐步补完，同时让支撑它的服务跟着站稳。",
  "about.values.title": "我们相信",
  "about.v1.name": "值得玩，才做",
  "about.v1.desc":
    "游戏该让人享受探索与思考，而不是每天要交差的例行工作。撑不起这一点的设计，我们不放进来。",
  "about.v2.name": "玩家即同行者",
  "about.v2.desc":
    "玩家不是流量，是同行的人。做决定时，我们先想十年后的玩家会怎么看。",
  "about.v3.name": "做得长久",
  "about.v3.desc": "架构、美术与社群，都以「多年后仍然成立」为标准来打造",
  "about.contact.title": "联系我们",
  "about.contact.body": "合作、媒体或其他事宜，欢迎通过 GitHub 或邮箱与我们联系",
  "about.contact.social": "或在这些地方找到我们",

  "join.eyebrow": "加入我们",
  "join.title": "与我们协作",
  "join.lead":
    "星帆是一支远程协作的小型团队。我们以按件、短期项目与弹性兼职的方式，寻找能一起把成果做出来的创作者；也期待遇见方向一致、愿意长期同行的伙伴。",
  "join.collab.title": "协作在这里是什么意思",
  "join.collab.body":
    "多数合作从一件明确的事开始：范围、排期与报酬先谈清楚，再动手。做得顺、方向也对得上，就把合作延续下去——短期弹性协作，长期一路前行。",
  "join.roles.title": "目前的协作方向",
  "join.mode.collab": "远程 · 弹性协作",
  "join.mode.partner": "远程 · 长期同行",
  "join.kind.collab": "协作",
  "join.kind.partner": "长期伙伴",
  "join.apply.collab": "洽谈协作",
  "join.apply.partner": "谈长期参与",
  "join.biz.title": "发行与商务合作",
  "join.biz.body1": "我们也欢迎游戏发行、平台、媒体及其他产业合作方与我们联络",
  "join.biz.body2":
    "如果你认为我们的作品适合你们的玩家与市场，我们愿意聊聊发行、宣传、活动与其他形式的合作",
  "join.biz.cta": "商务联络",

  "join.open.title": "不在上面的方向里？",
  "join.open.body":
    "仍然欢迎自我推荐。附上作品或 GitHub，告诉我们你能让哪一部分变得更好——位置可以之后再谈。",
  "join.how.title": "如何联系",
  "join.how.body": "给我们写信，附上你的作品集或 GitHub，聊聊你想做的事",

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
*/
const ja: Record<UIKey, string> = {
  "site.name": "Hoshivel",
  "site.tagline": "星々が、世界になる",
  "site.taglineLatin": "WHERE STARS BECOME WORLDS",
  "site.creed": "ゲームをもうひとつの仕事にはしない、本当に遊ぶ価値のある世界だけを作る",
  "site.motto": "速いことは世界に、遅いことは私たちに",
  "site.summary":
    "Hoshivel は独立系のゲーム・世界創作チームです。架空世界のターン制ストラテジー『砕界 Shattered Realms』を開発し、作品を長く動かし続けるためのサービスを自ら築いています。",

  "nav.works": "作品",
  "nav.news": "ニュース",
  "nav.about": "私たちについて",
  "nav.join": "参加する",

  "cta.sr": "『砕界』を見る",
  "cta.about": "私たちについて",
  "cta.visit": "公式サイトへ",
  "cta.detail": "作品の詳細",
  "cta.detailService": "サービスの詳細",
  "cta.allNews": "すべての更新を見る",
  "cta.join": "協働の募集を見る",

  "a11y.skip": "本文へスキップ",
  "a11y.langMenu": "言語を切り替える",
  "a11y.home": "ホームへ戻る",
  "a11y.menu": "メニュー",
  "a11y.external": "（外部リンク、新しいタブで開きます）",

  "footer.summary": "一枚の帆から、満天の星へ",
  "footer.worksLabel": "作品",
  "footer.servicesLabel": "サービス",
  "footer.orgLabel": "組織",
  "footer.socialLabel": "コミュニティ",
  "footer.langLabel": "言語",
  "footer.github": "GitHub",
  "footer.rights": "Hoshivel",

  "home.hero.eyebrow": "独立系ゲーム・世界創作チーム",
  /*
    漢字も仮名も任意の二文字間で折れるため、正體中文と同じく改行を手で指定する
    （作品名が途中で切られないように）。三行目は Hero 右側に星図が並ぶぶん
    column が狭い——長くすると末尾の一文字だけが四行目に落ちるので、
    ここは 25 文字前後を上限とみておくこと。
  */
  "home.hero.lead":
    "Hoshivel は架空世界のターン制ストラテジー\n『砕界 Shattered Realms』を開発し、\n作品を長く支えるサービスを一つずつ築いています",

  "home.works.eyebrow": "作品",
  "home.works.title": "最初の世界を、隅々まで作る",
  "home.works.lead":
    "『砕界』は Hoshivel が全力で開発している最初の作品——章を重ねるごとに広がっていく架空世界を、第一章から長く遊ぶ価値のあるものにします",

  "home.services.eyebrow": "サービス",
  "home.services.title": "作品が世界に集中できるように",
  "home.services.lead":
    "ゲームの外側では、作品を長く支えるためのサービスを自ら作って動かしています",

  "home.chart.title": "HOSHIVEL 星図",
  "home.chart.note":
    "輝く星は作品、環のついた星はそれを支えるサービス——押してみてください",

  "home.news.eyebrow": "ニュース",
  "home.news.title": "開発の記録",
  "home.news.lead":
    "完成した結果を並べるだけでなく、作品が少しずつ形になっていく過程も残しています：『砕界』の開発状況、世界設定、そして Hoshivel の最新情報",

  "home.belief.source": "Hoshivel の仕事のしかた",

  "home.join.title": "一緒に作る",
  "home.join.lead":
    "私たちは小さなコアチームで動いていて、案件単位・短期プロジェクト・柔軟なパートタイムという形で、一緒に成果を形にできる作り手を探しています",
  "home.join.lead2":
    "同じ方向を向いた仲間との出会いも待っています——作品を最後まで作りきり、その先の創作の道も一緒に歩いていける人と",

  "works.eyebrow": "作品",
  "works.title": "形になりつつある世界",
  "works.lead":
    "私たちが作っている世界と、それを長く動かし続けるためのサービス",
  "label.work": "作品",
  "label.service": "サービス",

  "p.sr.name": "砕界",
  "p.sr.latin": "SHATTERED REALMS",
  "p.sr.kind": "架空世界 · 2D ターン制ストラテジー",
  "p.sr.status": "開発中 · 公式サイト公開済み",
  "p.sr.desc":
    "虚空に浮かぶ砕けた大地の上で、ヘクスボードの戦闘、キャラクターの成長、ヒーローのスキル構成を通して、章ごとに広がっていく架空世界を探索します。ブラウザですぐに遊べ、ダウンロードは要りません。",
  "p.sr.f1": "ヘクスボードの奥深い戦術——行動ポイント、地形の高低、戦場の霧",
  "p.sr.f2": "章立ての世界——風雪の通過、星痕の紀元、物語は増え続けます",
  "p.sr.f3": "近いノードへ振り分け、ブラウザですぐに遊べます",

  "p.id.name": "Hoshi ID",
  "p.id.latin": "UNIVERSAL ACCOUNT",
  "p.id.kind": "共通アカウント · OpenID Connect 認証サービス",
  "p.id.status": "公開中 · 砕界 連携済み",
  "p.id.desc":
    "ひとつのアカウントで、すべての Hoshivel の世界へ。ログイン、アカウントの安全、連携済みサービスを Hoshi ID がまとめて扱うので、それぞれの作品は自分の世界に集中できます。",
  "p.id.f1":
    "ひとつのアカウントでシングルサインオン——一度の登録ですべての Hoshivel の世界へ",
  "p.id.f2":
    "アカウントセンター：プロフィール、ログイン履歴、連携済みサービスを一つの画面で管理",
  "p.id.f3":
    "アカウントの安全は Hoshi ID が一括して守り、各作品は自分のゲームデータだけを持ちます",

  "about.eyebrow": "私たちについて",
  "about.title": "Hoshivel について",
  "about.lead":
    "長い目で作品とサービスを作る、独立したゲーム・世界創作チーム",
  "about.who.title": "私たちは何者か",
  "about.who.body1":
    "Hoshivel は独立系のゲーム・世界創作チームです。架空世界のターン制ストラテジー『砕界 Shattered Realms』を開発し、ひとつのアカウントで Hoshivel のすべての世界を行き来できる Hoshi ID を作りました。",
  "about.who.body2":
    "その世界が探索する価値のあるものか、その物語が覚えておく価値のあるものか、そして一回一回の遊びそのものが本当に面白いか——私たちが気にしているのはそちらです",

  "about.creed.title": "ゲームはもうひとつの仕事ではない",
  "about.creed.lead":
    "プレイヤーには、本当に面白いゲームを手にする資格があると私たちは考えています",
  "about.creed.no1":
    "一日の疲れが残っていてもログインし、デイリーをこなし、スタミナを空にする——そんなもうひとつの仕事ではありません",
  "about.creed.no2":
    "継続率や課金率、売上曲線のために、楽しさを終わりのないデイリーと期限と不安に切り刻むこともしません",
  "about.creed.no3":
    "バージョンについていくために持たざるを得ない、明らかに性能過剰な「必須キャラ」を意図的に作り、販売期間が終わったころに性能を戻し、また次の「必須」を出す——そういうやり方もしません",
  "about.creed.no4":
    "繰り返しの作業、膨らみ続ける数値、「逃したら二度と手に入らない」という罰で、オンライン時間を長くすることもしません",
  "about.creed.no5":
    "短期の運営収益を、ゲーム性やコンテンツ、プレイヤーの体験より上に置くこともしません",
  "about.creed.body1":
    "ゲームはまずゲームであるべきです。新鮮で面白く、プレイヤーの時間を尊重するもの——義務や不安からではなく、楽しみにしているから開くものであってほしいと思います。",
  "about.creed.body2":
    "Hoshivel が作りたいのは、アイデアとゲーム性、そして世界そのものに動かされる作品です。収益は作品を存続させますが、その作品が何であるべきかを決めてしまってはいけません。",
  "about.creed.close1":
    "プレイヤーの時間をより効率よく消費させる仕組みを作りたいわけではありません",
  "about.creed.close2":
    "作りたいのは、新しくて面白く、本当に遊ぶ価値のあるゲームです",

  "about.now.title": "いま取り組んでいること",
  "about.now.body":
    "『砕界』は開発中で、公式サイトはすでに公開しています。Hoshi ID も公開済みで、いまの『砕界』のログイン方法でもあります。次の重心は、『砕界』の章とゲーム性、アートを少しずつ埋めながら、それを支えるサービスも一緒に足場を固めていくことです。",
  "about.values.title": "私たちが信じていること",
  "about.v1.name": "遊ぶ価値があるから作る",
  "about.v1.desc":
    "ゲームは探索と思考を楽しむ場所であるべきで、毎日こなすノルマではありません。それを支えきれない設計は、入れません。",
  "about.v2.name": "プレイヤーは同行者",
  "about.v2.desc":
    "プレイヤーは数字ではなく、一緒に歩く人です。何かを決めるときは、十年後のプレイヤーがどう見るかをまず考えます。",
  "about.v3.name": "長く続くように作る",
  "about.v3.desc":
    "設計もアートもコミュニティも、「何年経っても成り立つか」を基準に作ります",
  "about.contact.title": "お問い合わせ",
  "about.contact.body":
    "協業、取材、その他のご相談は、GitHub またはメールでご連絡ください",
  "about.contact.social": "こちらでも見つけられます",

  "join.eyebrow": "参加する",
  "join.title": "一緒に作る",
  "join.lead":
    "Hoshivel はリモート中心の小さなチームです。案件単位・短期プロジェクト・柔軟なパートタイムという形で一緒に成果を形にできる作り手を探していますし、同じ方向を向いて長く歩ける仲間との出会いも待っています。",
  "join.collab.title": "ここでいう「協働」とは",
  "join.collab.body":
    "多くの協働は、はっきりした一つの仕事から始まります：範囲、スケジュール、報酬を先に決めてから動きます。うまく進んで方向も合えば、そのまま続けます——短期は柔軟に、長期は並んで。",
  "join.roles.title": "いま探している協働",
  "join.mode.collab": "リモート · 柔軟な協働",
  "join.mode.partner": "リモート · 長く並んで",
  "join.kind.collab": "協働",
  "join.kind.partner": "長期パートナー",
  "join.apply.collab": "協働について話す",
  "join.apply.partner": "長期の参加について話す",
  "join.biz.title": "パブリッシングとビジネス",
  "join.biz.body1":
    "パブリッシャー、プラットフォーム、メディア、その他業界のパートナーからのご連絡も歓迎しています",
  "join.biz.body2":
    "私たちの作品が御社のプレイヤーと市場に合うと思われましたら、配信、プロモーション、イベントなど、さまざまな形の協業についてお話しできればと思います",
  "join.biz.cta": "ビジネスのお問い合わせ",

  "join.open.title": "上のどれにも当てはまりませんか？",
  "join.open.body":
    "それでも自己推薦は歓迎です。作品や GitHub を添えて、どの部分をより良くできるか教えてください——役割は後から決めれば大丈夫です。",
  "join.how.title": "連絡のしかた",
  "join.how.body":
    "ポートフォリオか GitHub を添えてメールをいただければ、作りたいことについて話しましょう",

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
  "site.tagline": "Where Stars Become Worlds",
  "site.taglineLatin": "WHERE STARS BECOME WORLDS",
  "site.creed": "We don't build games you clock into — only worlds worth playing",
  "site.motto": "Let the world keep the fast things; we keep the slow ones",
  "site.summary":
    "Hoshivel is an independent game and world-building team. We are developing Shattered Realms, a turn-based strategy game set in an original world, and we run the services that keep our works standing for the long term.",

  "nav.works": "Works",
  "nav.news": "News",
  "nav.about": "About",
  "nav.join": "Join us",

  "cta.sr": "Explore Shattered Realms",
  "cta.about": "About us",
  "cta.visit": "Visit site",
  "cta.detail": "Details",
  "cta.detailService": "Details",
  "cta.allNews": "All updates",
  "cta.join": "See how to work with us",

  "a11y.skip": "Skip to main content",
  "a11y.langMenu": "Switch language",
  "a11y.home": "Back to home",
  "a11y.menu": "Menu",
  "a11y.external": "(external link, opens in a new tab)",

  "footer.summary": "From a single sail to a sky full of stars",
  "footer.worksLabel": "Works",
  "footer.servicesLabel": "Service",
  "footer.orgLabel": "Organization",
  "footer.socialLabel": "Community",
  "footer.langLabel": "Language",
  "footer.github": "GitHub",
  "footer.rights": "Hoshivel",

  "home.hero.eyebrow": "Independent games & world-building",
  "home.hero.lead":
    "Hoshivel is building Shattered Realms — a turn-based strategy game set in an original world — and, step by step, the services that keep our works running for years",

  "home.works.eyebrow": "Works",
  "home.works.title": "Start with one world, and get every inch of it right",
  "home.works.lead":
    "Shattered Realms is the first work we are building at full tilt: an original world that keeps unfolding chapter by chapter, and has to be worth playing from the very first one",

  "home.services.eyebrow": "Service",
  "home.services.title": "So each work can mind its own world",
  "home.services.lead":
    "Beyond the games, we build and run the services our works stand on",

  "home.chart.title": "THE HOSHIVEL CHART",
  "home.chart.note":
    "Bright stars are works; the ringed one is the service beneath them — take a look",

  "home.news.eyebrow": "News",
  "home.news.title": "Development log",
  "home.news.lead":
    "We don't only post finished results — we keep a record of how the work takes shape: progress on Shattered Realms, material from its world, and the latest from Hoshivel",

  "home.belief.source": "How Hoshivel works",

  "home.join.title": "Work with us",
  "home.join.lead":
    "We run as a small core team and bring in creators per project, for short stretches, or as flexible part-time work — people who can help get real things finished",
  "home.join.lead2":
    "And we hope to meet partners who share the direction: to finish the work whole, and keep walking the same road long after",

  "works.eyebrow": "Works",
  "works.title": "A world taking shape",
  "works.lead":
    "What we are building — and the service that keeps it running",
  "label.work": "WORK",
  "label.service": "SERVICE",

  "p.sr.name": "Shattered Realms",
  "p.sr.latin": "SHATTERED REALMS",
  "p.sr.kind": "2D turn-based strategy in an original world",
  "p.sr.status": "In development · site live",
  "p.sr.desc":
    "On fragmented lands adrift in the void, explore an original world that unfolds chapter by chapter — through hex-board combat, character growth and hero skill sets. Click and play in the browser; no download.",
  "p.sr.f1": "Deep tactics on a hex board — action points, terrain and fog of war",
  "p.sr.f2":
    "A chapter-based world — Snowbound Passage, Age of Starmarks, and more to grow",
  "p.sr.f3": "Region-routed nodes; playable instantly in the browser",

  "p.id.name": "Hoshi ID",
  "p.id.latin": "UNIVERSAL ACCOUNT",
  "p.id.kind": "Universal account · OpenID Connect identity service",
  "p.id.status": "Live · Shattered Realms connected",
  "p.id.desc":
    "One Hoshi ID. Every Hoshivel world. Sign-in, account security and connected services are handled in one place, so each work can concentrate on its own world.",
  "p.id.f1":
    "One account, single sign-on — register once, enter every Hoshivel world",
  "p.id.f2":
    "Account center: profile, sign-in history and connected services, managed in one page",
  "p.id.f3":
    "Account security is Hoshi ID's job; each work keeps only its own game data",

  "about.eyebrow": "About",
  "about.title": "About Hoshivel",
  "about.lead":
    "An independent game and world-building team, making works and services with the long view",
  "about.who.title": "Who we are",
  "about.who.body1":
    "Hoshivel is an independent game and world-building team. We are developing Shattered Realms, a turn-based strategy game set in an original world, and we built Hoshi ID — one account for every Hoshivel world.",
  "about.who.body2":
    "What we care about more is whether a world is worth exploring, whether a story is worth remembering, and whether each session is actually interesting in itself",

  "about.creed.title": "A game shouldn't be another job",
  "about.creed.lead":
    "We believe players deserve games that are genuinely interesting",
  "about.creed.no1":
    "Not another job you clock into when the day has already worn you out — check in, finish the tasks, burn off the stamina bar",
  "about.creed.no2":
    "Not fun cut into endless dailies, deadlines and low-grade anxiety, in the name of retention, conversion and the revenue curve",
  "about.creed.no3":
    "Not deliberately overtuned “must-have” characters that you have to own just to keep up with the patch — then quietly toned down once the sales window closes, in time for the next must-have",
  "about.creed.no4":
    "Not repetitive grind, number inflation and “miss it and it's gone for good” penalties, traded for longer hours online",
  "about.creed.no5":
    "And not short-term operating revenue placed above systems, content and what the player actually experiences",
  "about.creed.body1":
    "A game should be a game first. It should be fresh and interesting, and respect the player's time — something you open because you're looking forward to it, not because obligation and anxiety leave you no choice.",
  "about.creed.body2":
    "What Hoshivel wants to make are works driven by ideas, systems and the world itself. Profit can keep a work alive; it shouldn't turn around and decide what that work has to become.",
  "about.creed.close1":
    "We're not here to build a more efficient machine for consuming players' time",
  "about.creed.close2":
    "We're here to make games that are fresh, interesting, and genuinely worth playing",

  "about.now.title": "What we're working on",
  "about.now.body":
    "Shattered Realms is still in development, with its site live; Hoshi ID is live and is how you sign in to Shattered Realms today. Next: filling in the chapters, systems and art of Shattered Realms, while the services beneath it grow steady enough to carry it.",
  "about.values.title": "What we believe",
  "about.v1.name": "Worth playing, or not at all",
  "about.v1.desc":
    "A game should be somewhere to explore and think, not another shift to clock into. A design that can't hold that up doesn't go in.",
  "about.v2.name": "Players are companions",
  "about.v2.desc":
    "Players aren't traffic; they walk with us. We decide with the player of ten years from now in mind.",
  "about.v3.name": "Built to last",
  "about.v3.desc":
    "Architecture, art and community — all held to one standard: still standing years from now",
  "about.contact.title": "Contact",
  "about.contact.body":
    "For partnerships, press or anything else, reach us on GitHub or by email",
  "about.contact.social": "Or find us here",

  "join.eyebrow": "Join us",
  "join.title": "Work with us",
  "join.lead":
    "Hoshivel is a small, remote-first team. We work with creators per project, for short stretches or as flexible part-time work — and we hope to meet partners who share the direction and want to stay for the long road.",
  "join.collab.title": "What working together looks like",
  "join.collab.body":
    "Most collaborations start with one clear piece of work: scope, schedule and pay settled before anything begins. If it goes well and the direction lines up, we keep going — flexible in the short term, side by side in the long one.",
  "join.roles.title": "Where we're looking for help",
  "join.mode.collab": "Remote · flexible",
  "join.mode.partner": "Remote · for the long road",
  "join.kind.collab": "Collaboration",
  "join.kind.partner": "Long-term partner",
  "join.apply.collab": "Talk about a collaboration",
  "join.apply.partner": "Talk about joining",
  "join.biz.title": "Publishing & business",
  "join.biz.body1":
    "We also welcome publishers, platforms, media and other partners across the industry to get in touch",
  "join.biz.body2":
    "If you think our work fits your players and your market, we're glad to talk about publishing, promotion, events and other forms of partnership",
  "join.biz.cta": "Business enquiries",

  "join.open.title": "Not on this list?",
  "join.open.body":
    "Introduce yourself anyway. Send your work or GitHub and tell us what you'd make better — the shape of it can come later.",
  "join.how.title": "How to reach us",
  "join.how.body":
    "Write to us with your portfolio or GitHub, and tell us what you want to build",

  "news.eyebrow": "News",
  "news.title": "Announcements & updates",
  "news.lead": "The latest from Hoshivel and its works",
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
