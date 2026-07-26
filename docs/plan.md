# Hoshivel 官方門戶 —— 權威計畫

> 本檔為倉庫內可冷接手的權威計畫。進度見 `sessions/`。

## 目標與定位

為 Hoshivel（獨立遊戲與網路服務開發組織）建立官方門戶：

- 呈現**作品**（《碎界 Shattered Realms》→ sr.oha.li、Hoshi ID 通用帳號平臺）
- **新聞**（組織與作品公告）
- **關於**（我們是誰／名字由來／價值觀／聯繫）
- **加入我們**（開放角色／開放式申請／聯繫方式）

設計要求（來自需求方）：**簡潔但不簡陋、大氣風度；不堆特效；更注重 UX。**

## 設計語言：「以星為帆」

- 品牌語彙：Hoshivel ＝ hoshi（星）＋ velum（帆）。標記＝四芒星＋軌道＋金色帆點。
- 與 sr-web 同源的深空底色（家族連續性），但門戶**更沉穩收斂**：
  少發光、多留白；金色（--hv-gold）僅小面積點綴（眉標 ✦、序號、星點）。
- 動效預算：reveal-on-scroll（IntersectionObserver）＋ hover 微浮 ＋ 星座兩顆星的呼吸微光。
  **僅此而已**——不用 Pixi / GSAP / Lenis，不需要任何 client framework。
- 一切動態以 `prefers-reduced-motion` 為基線降級；無 JS 時內容一律直接可見。

## 架構決策

| 決策 | 選擇 | 理由 |
| --- | --- | --- |
| 框架 | Astro 5 靜態、零 island | 門戶無互動密度；零 JS framework＝最快載入（UX 即體驗） |
| i18n | zh-Hant 根 / zh-cn / en，typed 字典 | 沿 sr-web 慣例；缺鍵編譯不過 |
| 新聞 | content collections（glob loader） | 發文＝丟 Markdown；`<slug>.<locale>.md` 檔名慣例 |
| 新聞缺譯 | 回退 zh-Hant（lib/news.ts） | 列表不缺項、連結永不 404 |
| 內容/結構分離 | 文案全在 `i18n/ui.ts`；結構在 `lib/products.ts`、`lib/roles.ts` | 增刪作品/職缺不動版面程式碼 |
| 頁面複用 | `components/pages/*Page.astro` ＋ 每語系薄路由檔 | 沿 sr-web 的 Home.astro 模式 |

**已知陷阱（已修）**：Astro glob loader 預設把 frontmatter `slug` 當條目 ID →
多語言同 slug 互相覆蓋。已以 `generateId`（檔名為 ID）解決，`slug` 僅作跨語言邏輯鍵。

## 網站結構

```
/            首頁：Hero（星座＋宣言）→ 作品×2 → 最新動態×3 → 理念一句 → 加入我們 banner
/works       作品：每件完整段落（#shattered-realms / #hoshi-id 錨點）
/news        新聞列表；/news/<slug> 內頁（Markdown 渲染）
/about       關於：我們是誰 / 名字的由來 / 我們相信×3 / 聯繫
/join        加入我們：開放角色×3（mailto 帶主旨）/ 開放式申請 / 如何聯繫
/404         品牌化 404（三語返回）
sitemap.xml  全頁 × 三語互標 hreflang；robots.txt 指向
og.png       1200×630 分享圖（og.svg 為源）
```

`/zh-cn/*`、`/en/*` 鏡像上述內容頁。

## 驗收基準

- `npm run build` 綠（astro check strict、0 error 0 warning）
- 三語內容頁各自語言正確（曾有 glob ID 覆蓋 bug，驗收時抽查新聞卡語言）
- 行動選單可存取（aria-expanded / Esc / 外點關閉）；鍵盤 skip link
- reduced-motion 下無任何動畫、內容全可見
- Lighthouse 級的輕載：無 framework JS，頁面 JS 僅選單＋reveal（<2KB）

## 未來項目（本次不做）

- 新聞 RSS feed（`/rss.xml`）
- 招募表單（目前 mailto；若要表單需後端或第三方）
- Hoshi ID 獨立入口上線後：`site.ts` 填 URL、作品卡自動長出按鈕
- 正式美術資產替換程序化星座（保留換裝槽思路）
