# Session：Hoshivel 官方門戶（從零建站）

- 建立：2026-07-26
- 狀態：**完成待驗收**（全站建置完畢、build 綠、桌面/行動截圖目視通過；待使用者視覺簽核）
- 進度摘要：空倉 → 完整三語門戶（首頁/作品/新聞×3/關於/加入我們/404/sitemap/OG）。
  `npm run build` 綠（strict TS、0 error 0 warning）。
- 相關：branch `claude/hoshivel-official-portal-883quc`；姊妹站 sr-web 同分支加了 footer 回鏈
- **權威計畫（倉庫內、可冷接手）**：`docs/plan.md`
- Runtime: cloud（完成後 push 到遠端）
- Editing: idle

## 如何冷接手（Cold Resume）
1. 讀本檔與 `docs/plan.md`；`README.md` 有內容維護對照表。
2. `npm install` → `npm run build` 應綠燈；`npm run dev` 起本地開發。
3. 上線前四個佔位值待確認（README「部署」節）：網域 / 信箱 / Hoshi ID URL / 職缺內容。

## 目標 / 需求
（2026-07-26，來自需求方）
1. 為 Hoshivel 建立官方門戶網站。作品：《碎界 Shattered Realms》（架空 2D 回合獨立遊戲）、
   Hoshi ID（通用帳號平臺）。
2. 風格：**簡潔但不簡陋，大氣風度**；不必堆特效；**更注重 UX**。
3. 內容：作品/產品資訊、關於我們、招募/加入我們、新聞。

## 主要決策
- 技術棧沿家族（Astro 5 + strict TS + 三語 i18n），但**零 island、零 framework JS**——
  門戶的「大氣」由留白/排版/星座 SVG 承擔，不靠動效（動效預算全站 <2KB JS）。
- 品牌語彙自創：「以星為帆」（hoshi 星 + velum 帆）；四芒星＋軌道＋金帆點標記；
  `--hv-*` tokens 與 sr 同色系但更收斂。
- 新聞用 content collections，檔名 `<slug>.<locale>.md`，缺譯回退 zh-Hant。

## 進度
### 已完成
- [x] 專案骨架（package/astro.config/tsconfig/strict）＋ tokens/global 樣式系統
- [x] 三語字典（~100 鍵 ×3，typed）＋ i18n utils ＋ 日期在地化
- [x] 品牌組件（Mark/Wordmark/Constellation）＋ Header（aria 行動選單）＋ Footer
- [x] 六個頁面主體 ＋ 三語 ×6 薄路由 ＋ 404 ＋ sitemap（全頁 hreflang 互標）
- [x] 新聞 3 則 ×3 語（門戶上線/碎界官網/Hoshi ID 介紹）
- [x] OG 1200×630（og.svg 源 + Chromium 轉 PNG）＋ favicon
- [x] QA：build 綠；桌面 8 頁截圖；行動 Playwright 截圖；行動選單互動測試
  （aria-expanded/Esc/導航）；reduced-motion 路徑目視
- [x] 修復：glob loader 以 frontmatter slug 當 ID 造成語言互相覆蓋（generateId 檔名為 ID）
- [x] 修復：行動選單背景近乎不透明（backdrop-filter 不支援時仍可讀）
- [x] README / docs/plan.md / 本日誌

### 待辦（使用者側）
- [ ] 視覺簽核：`npm run dev` 目視 `/`、`/works`、`/news`、`/about`、`/join`（三語）
- [ ] 確認 README「部署」節的四個佔位值（網域/信箱/Hoshi ID URL/職缺）

## 驗收方式
`npm run dev` → 首頁應見：星座 Hero＋「以星為帆，駛向未竟之境。」、兩張作品卡
（碎界＝長春花藍/前往官網；Hoshi ID＝薄荷/無外鏈）、最新動態三卡（各語言正確）、
理念一句、加入我們 banner。行動寬度（≤760px）hamburger 選單可開關（Esc/外點皆關）。
