# 2026-07-31 —— v3 整版重做：「星圖」

## 需求

使用者對 v2「紙墨朱」不滿意，要求整版重做，並且：

1. **要星空元素，點題「星」**。
2. 追加澄清：**不解釋 Hoshivel 何意，更不要拆分單詞——它是一個完整的品牌名。**

## 決定

面貌取**古星圖銅版**（不是科幻太空）：墨藍的夜、星光的字、一種星金，
髮絲星圖線與方正圖版邊角。核心命題定為 **作品即星**——門戶是 Hoshivel 的星圖，
每件作品是圖上一顆亮星；星可點，直達該作品段落。

「點題」由視覺與資訊結構承擔，不由文案解釋承擔：

- 全站固定星空（銀河漸層＋遠近兩層星點＋極罕見流星）
- 首頁 Hero 的 `WorksChart` 星圖＝主視覺，不是裝飾素材
- 拜耳字母（α β γ δ）編章節、星表編號 `HV—01` 標作品
- 品牌標記改為**星盤**（四芒星＋環＋斜刻度），取代 v2 的朱印

## 品牌名處理（依第 2 點）

- 移除「關於」頁的〈名字的由來〉整段（三語），改為〈現在正在做的事〉
- 移除 `og.svg` 右下的舊直書落款（同屬字源說法）
- 移除 `i18n/ui.ts` 檔頭與 `tokens.css` 註解中的字源說明，並改寫為
  「品牌名 Hoshivel 一律整詞使用：不拆字、不解字源、不加註解」
- 全站 grep 確認舊字源文案（含各語言版本）皆已無殘留

## 改動範圍

- 新增 `components/sky/Starfield.astro`（建置期固定種子生成星點，非 client JS）
  與 `components/sky/WorksChart.astro`（可點的作品星圖）
- `tokens.css` / `global.css` 整套改夜色（`--hv-*` 全面換代：paper/ink/vermilion
  → night/starlight/gold；`.hv-card` → `.hv-plate` 圖版卡）
- `Mark`／`Wordmark`／`Header`／`Footer`／`LanguageSwitcher`／各頁重上妝；
  footer 改為「地平線」（唯一不透星光的實面，上緣一道暖光）
- `i18n/utils.ts`：`sectionNum()` → `bayer()` ＋ `catalogNo()`
- `lib/motion.ts`：新增 `initSkyParallax()`（rAF 節流、passive、reduced-motion 不掛）
- `favicon.svg` / `og.svg` / `og.png` 全部重出

## 驗收

- `npm run build`（astro check strict）：0 error / 0 warning / 0 hint，25 頁
- Chromium 實截：首頁（zh-Hant / en）、作品、關於、新聞列表、新聞內頁、
  加入我們、404、375px 行動版——版式與可讀性皆確認
- 行動版無水平溢出（以 iframe 量測 `documentElement.scrollWidth == 375`）

## 待辦（下次）

- 若使用者要更「星」一點：可考慮各子頁 Hero 也帶一小塊星圖圖版
- 正式品牌字型（自託管 Noto Serif TC subset）仍未做，目前依賴系統明體回退
