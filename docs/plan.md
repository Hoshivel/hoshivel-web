# Hoshivel 官方門戶 —— 權威計畫（v2）

> 本檔為倉庫內可冷接手的權威計畫。進度見 `sessions/`。
> v1（深空星光風）已整版重做；本檔描述現行 v2。

## 目標與定位

為 Hoshivel（獨立遊戲與網路服務開發組織）建立官方門戶：

- 呈現**作品**（《碎界 Shattered Realms》→ sr.hoshivel.com、Hoshi ID → id.hoshivel.com）
- **新聞**（組織與作品公告）
- **關於**（我們是誰／名字由來／價值觀／聯繫／社群入口）
- **加入我們**（**預設招合夥人**／開放式申請／聯繫方式）
- **社群入口**（X／YouTube／GitHub／Reddit，帳號一律 hoshivel）

需求方要求：**簡潔但不簡陋、大氣風度；不堆特效；更注重 UX；
且不得沿用既有站（如 sr-web）的風格——各站各有面貌。**

## 設計語言：「紙墨朱」（v2 定案）

家族版圖：sr-web＝深空紫＋程序化動效；Hoshi ID＝夜藍＋青金＋明朝體＋圓軌道。
門戶取第三極——**光**：

| 元素 | 決定 |
| --- | --- |
| 底色 | 暖紙 `#f6f3ea`；區塊交替 `#efeadd`；唯一深色區＝墨面 footer |
| 文字 | 墨 `#26282d`；標題明體（Noto Serif TC 系）、內文黑體 |
| 強調 | 唯一的朱紅 `#b23a26`——印章、編號、目前頁指示、hover 時刻 |
| 標記 | 朱印：方正朱紅印面＋鏤白四芒星（星是名，印是署名） |
| 記號系統 | 漢字章節編號（〇一〇二；en 01/02）＋髮絲線＋直書落款欄（首頁 Hero，漢字語系限定） |
| 形狀 | 方正近直角（radius 3–10px）；姊妹站皆圓膠囊，刻意相反 |
| 動效 | 只有 reveal-on-scroll＋hover；無背景美術、無發光、無漸層字 |
| 作品識別 | 小方記色票：碎界＝靛 `#4c5a9e`、Hoshi ID＝松綠 `#1f7a70`（不染整卡） |

## 架構決策（沿 v1，未變）

| 決策 | 選擇 | 理由 |
| --- | --- | --- |
| 框架 | Astro 5 靜態、零 island | 門戶無互動密度；零 JS framework＝最快載入 |
| i18n | zh-Hant 根 / zh-cn / en，typed 字典 | 缺鍵編譯不過 |
| 新聞 | content collections（glob loader＋`generateId` 檔名為 ID） | 發文＝丟 Markdown；多語同 slug 不互覆 |
| 新聞稿位置 | **專案根目錄 `news/`**（與 `src/` 平級；build 時讀 `./news/*.md`） | 改稿不必進程式碼樹 |
| 新聞缺譯 | 回退 zh-Hant（lib/news.ts） | 列表不缺項、連結永不 404 |
| 招募職位 | **專案根目錄 `roles.config.ts`**（三語文案就地寫齊，`src/lib/roles.ts` 只做解析） | 招募調整頻繁，單檔可改 |
| 招募型態 | 預設 `partner`（合夥人）；個別可標 `kind: "hire"` | 門戶的預設立場是找合夥人，不是招聘 |
| 內容/結構分離 | 介面文案在 `i18n/ui.ts`；結構在 `lib/products.ts`；組織連結／社群在 `lib/site.ts` | 增刪不動版面 |
| 頁面複用 | `components/pages/*Page.astro` ＋ 每語系薄路由檔 | 三語零重複 |

**已知陷阱（皆已修）**：
1. glob loader 預設拿 frontmatter `slug` 當條目 ID → 多語互覆（`generateId` 解）。
2. flex 內 orthogonal flow（`writing-mode: vertical-rl`）Chromium 量測不可靠 →
   直書落款欄以「逐字一行」實作，不用 writing-mode。
3. CJK 下 `ch` 單位≈半字寬，別拿來限制中文標題行寬。

## 事實對齊（與 hoshi-identity repo 校準）

- Hoshi ID 已上線：OIDC / OAuth2+PKCE、帳戶中心（個人檔案、安全工作階段、
  已連接服務、登入稽核）、短效 token＋refresh rotation＋重用偵測；SR 為首個第一方 client。
- 網域：`id.hoshivel.com`（deployment.md 正式範例）→ 門戶網域推定 `hoshivel.com`。
- 作品頁與新聞的 Hoshi ID 文案均以上述事實書寫，不再寫「建置中／暫無入口」。

## 網站結構（未變）

```
/            首頁：Hero（明體宣言＋直書落款）→ 〇一 作品 → 〇二 新聞 → 理念一句 → 〇三 同行
/works       作品：每件完整段落（#shattered-realms / #hoshi-id）＋編號髮絲特點清單
/news        新聞列表；/news/<slug> 內頁
/about       關於（〇三）：…→ 聯繫（信箱／GitHub）＋社群圖示列
/join        加入我們（〇四）：合夥人說明 → 開放位置 → 開放式申請
/404         「這一頁尚未寫成」
sitemap.xml  全頁 × 三語互標 hreflang；robots.txt 指向
og.png       1200×630 紙墨朱版式（og.svg 為源）
```

## 常改內容的落點（皆在 src 之外／單點）

```
news/               新聞稿 <slug>.<locale>.md（與 src 平級）
roles.config.ts     招募職位（三語文案就地寫齊；預設合夥人）
src/lib/site.ts     網域、信箱、社群連結（SOCIAL_LINKS）
src/i18n/ui.ts      介面文案字典（三語逐鍵對齊）
```

## 驗收基準

- `npm run build` 綠（astro check strict、0 error 0 warning）
- 三語內容頁各自語言正確；EN 卡片不重複顯示拉丁副標
- 行動選單可存取（aria-expanded / Esc / 外點關閉）；skip link
- reduced-motion 下無任何動畫、內容全可見
- 頁面 JS 僅選單＋reveal（<2KB）

## 未來項目（本次不做）

- 新聞 RSS feed（`/rss.xml`）
- 招募表單（目前 mailto）
- 正式品牌字型（如自行託管 Noto Serif TC subset，取代系統回退）
