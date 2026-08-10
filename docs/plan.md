# Hoshivel 官方門戶 —— 權威計畫（v3）

> 本檔為倉庫內可冷接手的權威計畫。進度見 `sessions/`。
> v1（深空星光）、v2（紙墨朱）皆已整版重做；本檔描述現行 v3「星圖」。

## 目標與定位

為 Hoshivel／星帆（獨立遊戲與世界創作團隊）建立官方門戶：

- 呈現**作品**（《碎界 Shattered Realms》→ sr.hoshivel.com）與**服務**
  （Hoshi ID → id.hoshivel.com；**服務不是產品**，另立一節、不佔作品編號）
- **新聞**（組織與作品公告）
- **關於**（我們是誰／現在正在做的事／價值觀／聯繫／社群入口）
- **合作**（**預設是短期彈性協作**／開放式自我推薦／聯繫方式）
- **社群入口**（X／YouTube／GitHub／Reddit，帳號一律 hoshivel）

需求方要求：**簡潔但不簡陋、大氣風度；不堆特效；更注重 UX；
且不得沿用既有站（如 sr-web）的風格——各站各有面貌。**
v3 追加：**要星空元素，點題「星」**；以及——

> **品牌名 Hoshivel 是一個完整的詞。不拆字、不解字源、不加註解。**
> 中文品牌名**星帆**與它並用（2026-08-06 定），同樣是完整的詞。
> **正式題詞：讓星辰，成為世界／ Where Stars Become Worlds**
> **定位第二句：不把遊戲做成另一份工作，只做真正值得玩的世界**
> **句號規則（2026-08-07 定）**：一句不加，兩句以上才加；標題、標籤、按鈕、
> 標語一律不加。硬換行不影響判斷。詳見 `README.md`。
> **日本語（2026-08-07 加）**：站上第四個語系，掛 `/ja`。品牌名在日文頁
> **只用 Hoshivel**——「星帆」是**中文**品牌名，不另立日文品牌名；作品名同理
> 用『Shattered Realms』，不把「碎界」寫成日文字體的「砕界」。
> **Hoshi ID 是服務，不是作品**——不列入作品編號；但站上**不反覆聲明它
> 「不是產品」**，講它做什麼即可（經典標語：一個帳號，連接所有 Hoshivel 世界／
> One Hoshi ID. Every Hoshivel world.）。短效憑證、Refresh Token 輪替、重用偵測
> 這類技術細節屬於 Hoshi ID 自己的技術／安全頁，母品牌站不列。

（v1/v2 曾在「關於」頁寫名字由來，v3 已整段移除，改為「現在正在做的事」；
全站文案、註解與 OG 圖一律不再出現拆詞或字源說明。）

## 設計語言：「星圖 Celestial Atlas」（v3 定案）

家族版圖：sr-web＝深空紫＋程序化動效；Hoshi ID＝夜藍＋青金＋明朝體＋圓軌道。
門戶取第三極——**古星圖銅版**：不是科幻太空，是量測用的星表圖版。
核心命題：**作品即星**——門戶是 Hoshivel 的星圖，每件作品是圖上一顆亮星。

| 元素 | 決定 |
| --- | --- |
| 底色 | 夜 `#080b15`；交替帶 `#0b101d`；地平線（footer）`#04060d` |
| 天 | 全站固定星空：銀河漸層＋遠近兩層星點（建置期固定種子生成）＋極罕見流星 |
| 文字 | 星光 `#eef2fd` / 正文 `#cbd5ea`；標題明體（鐫刻感）、內文黑體、編號等寬 |
| 強調 | 唯一的星金 `#f0cd94`——主按鈕、拜耳記號、目前頁指示、hover 時刻 |
| 標記 | 星盤：四芒星＋星盤環＋四道斜刻度（16px 仍成立，favicon 同版） |
| 記號系統 | 拜耳字母編章節（α 作品／β 新聞／γ 關於／δ 協作，各語系共用；分配表在 `src/lib/chapters.ts`，字母屬於章節而非頁面位置）＋星表編號 `HV—01`（等寬）＋髮絲星圖線 |
| 主視覺 | 首頁 Hero 的 `WorksChart`：座標網＋星座連線＋刻度；亮星＝作品、環標＝服務（皆可點） |
| 字體 | 自行託管子集：Playfair Display（拉丁）＋ Noto Serif TC／SC（漢字）；內文與編號走系統字 |
| 標記 | 依使用者提供的 logo 重繪為向量：四芒星＋雙軌道環（青／金）＋行星點；備選版「星生界」留在 `Mark.astro` 的 `variant` |
| 形狀 | 方正（radius 2–6px）＋圖版四角刻線；姊妹站皆圓膠囊，刻意相反 |
| 動效 | reveal-on-scroll、星圖連線描出、少數星呼吸、星空微視差、罕見流星——皆 reduced-motion 關閉 |
| 作品識別 | 星記色票：碎界＝星痕紫 `#9a8cff`、Hoshi ID＝晨星青 `#6fd6c6`（不染整卡） |

## 架構決策（沿 v1，未變）

| 決策 | 選擇 | 理由 |
| --- | --- | --- |
| 框架 | Astro 5 靜態、零 island | 門戶無互動密度；零 JS framework＝最快載入 |
| i18n | zh-Hant 根 / zh-cn / ja / en，typed 字典 | 缺鍵編譯不過 |
| 新聞 | content collections（glob loader＋`generateId` 檔名為 ID） | 發文＝丟 Markdown；多語同 slug 不互覆 |
| 新聞稿位置 | **專案根目錄 `news/`**（與 `src/` 平級；build 時讀 `./news/*.md`） | 改稿不必進程式碼樹 |
| 新聞缺譯 | 回退 zh-Hant（lib/news.ts） | 列表不缺項、連結永不 404 |
| 協作方向 | **專案根目錄 `roles.config.ts`**（四語文案就地寫齊，`lib/roles.ts` 只做解析） | 調整頻繁，單檔可改 |
| 協作型態 | 預設 `collab`（按件／短期／彈性兼職）；個別可標 `kind: "partner"` | 立場是短期彈性協作、長期一路前行，不是一般招聘 |
| 內容/結構分離 | 介面文案在 `i18n/ui.ts`；結構在 `lib/catalog.ts`；組織連結／社群在 `lib/site.ts` | 增刪不動版面 |
| 頁面複用 | `components/pages/*Page.astro` ＋ 每語系薄路由檔 | 四語零重複 |

**已知陷阱（皆已修）**：
1. glob loader 預設拿 frontmatter `slug` 當條目 ID → 多語互覆（`generateId` 解）。
2. flex 內 orthogonal flow（`writing-mode: vertical-rl`）Chromium 量測不可靠 →
   直書落款欄以「逐字一行」實作，不用 writing-mode。
3. CJK 下 `ch` 單位≈半字寬，別拿來限制中文標題行寬。
4. SVG 星點的閃爍動畫不能用 `opacity: inherit`——各星基準亮度以 `--hv-o`
   帶入，keyframes 以 `calc(var(--hv-o) * .3)` 呼吸，暗星才不會被閃成亮星。
5. 兩欄 Hero 下標題級數要比通用 display 收一階，否則 zh 題詞會折行成孤字。
6. headless Chromium 的 `--virtual-time-budget` 下 IntersectionObserver 不會觸發
   （自訂字體加入後更明顯）：截圖驗收前先把 dist 的 `[data-reveal]` opacity 改成 1，
   否則整頁看起來像空白——**那不是 bug**。

## 事實對齊（與 hoshi-identity repo 校準）

- Hoshi ID 已上線：OIDC / OAuth2+PKCE、帳戶中心（個人檔案、安全工作階段、
  已連接服務、登入稽核）、短效 token＋refresh rotation＋重用偵測；SR 為首個第一方 client。
- 網域：`id.hoshivel.com`（deployment.md 正式範例）→ 門戶網域推定 `hoshivel.com`。
- 作品頁與新聞的 Hoshi ID 文案均以上述事實書寫，不再寫「建置中／暫無入口」。

## 網站結構（未變）

```
/            首頁：Hero（題詞＋定位一句＋Hoshivel 星圖）→ α 作品 → 服務 → β 開發動態
             → 理念一句 → δ 協作　（重心：品牌 →《碎界》→ 支援服務 → 動態 → 協作）
/works       作品（α，#shattered-realms）＋服務另立一節（#hoshi-id）；星表編號／服務籤＋特點清單
/news        新聞列表（β）；/news/<slug> 內頁
/about       關於（γ）：…→ 聯繫（信箱／GitHub）＋社群圖版籤列
/join        合作（δ）：協作說明 → 目前的協作方向 → 開放式自我推薦
/404         「這片夜空還沒有這顆星」
sitemap.xml  全頁 × 四語互標 hreflang；robots.txt 指向
og.png       1200×630 星圖版式（og.svg 為源）
```

## 常改內容的落點（皆在 src 之外／單點）

```
news/               新聞稿 <slug>.<locale>.md（與 src 平級）
roles.config.ts     協作方向（四語文案就地寫齊；預設 collab）
src/lib/site.ts     網域、信箱、社群連結（SOCIAL_LINKS）
src/i18n/ui.ts      介面文案字典（四語逐鍵對齊）
```

> 兩者都是字體子集的取字來源（`scripts/subset-fonts.py`）——改完跑 `npm run fonts`。

## 驗收基準

- `npm run build` 綠（astro check strict、0 error 0 warning）
- 四語內容頁各自語言正確；EN 卡片不重複顯示拉丁副標
- 行動選單可存取（aria-expanded / Esc / 外點關閉）；skip link
- reduced-motion 下無任何動畫（含星空閃爍／流星／視差）、內容全可見
- 頁面 JS 僅選單＋reveal＋星空視差（<2KB）
- 全站無任何拆解／解釋品牌名的文案
- 用語一致：使用者持有「帳號」、管理介面叫「帳戶中心」；一律「回合制策略」
- 章節字母三頁一致（首頁 α β δ／作品 α／新聞 β／關於 γ／合作 δ）
- 字體子集覆蓋全站文案（新增內容後 `npm run fonts`）；日文頁載 JP 那一支，
  標題不得出現中文字形

## 未來項目（本次不做）

- 新聞 RSS feed（`/rss.xml`）
- 招募表單（目前 mailto）
- 正式品牌字型（如自行託管 Noto Serif TC subset，取代系統回退）
