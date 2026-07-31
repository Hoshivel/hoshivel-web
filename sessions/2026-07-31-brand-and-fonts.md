# 2026-07-31（續）—— 品牌定案：題詞、字體、標記，與「服務不是產品」

承接同日的 v3「星圖」重做，使用者提出四點：

1. **Hoshi ID 不算產品，是服務**——不要放進作品裡。
2. 改用**自訂字體**。
3. 正式題詞：**Where Stars Become Worlds.／讓星辰，成為世界。**
4. 提供了 logo（PNG 兩版：深底／淺底），要求照此使用；並希望另出一版備選圖案供比較。

## 1 作品／服務分家

`src/lib/products.ts` → `src/lib/catalog.ts`：`WORKS`（碎界，星表編號 HV—01）與
`SERVICES`（Hoshi ID，不編號）。服務在版面上一律以**環標**呈現、配「服務」籤：

- 首頁：α 作品（碎界）之後另立「服務」一節（眉標記號是小環，不編拜耳字母）
- 作品頁：作品段落之後以星圖線隔開，再接服務段落
- 星圖：亮星＝作品；環標＝服務（虛線外環＋實線內環），兩者都可點
- footer：作品／服務分成兩欄
- 文案三語同步改寫（`about.who.body1`、`home.works.*`、`site.summary`、`footer.summary`…），
  措辭統一為「Hoshi ID 不是產品，是讓作品長期運行的地基」

## 2 自訂字體（自行託管）

`scripts/subset-fonts.py`（`npm run fonts`）：抓 Google Fonts 的可變字檔，定重 600、
依「站上真的會出現的字」做子集，輸出 woff2 到 `public/fonts/`。

| 面 | 字體 | 子集 |
| --- | --- | --- |
| 拉丁 | Playfair Display 600 | 106 字 / 12 KB |
| 漢字（正體） | Noto Serif TC 600 | 779 字 / 147 KB |
| 漢字（簡體） | Noto Serif SC 600 | 885 字 / 165 KB |

- 拉丁面有的標點都歸拉丁面，它沒有的（希臘字母、全形標點、漢字）才落到漢字面，
  兩支不重疊 → 不必維護 `unicode-range`，瀏覽器逐字回退即可
- 各語系頁的堆疊只點名自己那支漢字面：正體頁不會下載簡體檔
- Layout 依語言 preload 對應的兩支；內文黑體與編號等寬仍走系統字（CJK 黑體再自帶一套
  要多幾百 KB，不划算）

## 3 題詞

`site.tagline` 改為正式題詞，並新增 `site.taglineLatin`（漢字頁在題詞下並排一行金色
等寬拉丁）與 `site.motto`（「少做，做好，做久。」降為做事方式，移到關於頁「我們相信」的導語）。
首頁 Hero 改為：眉標 → 題詞（大字）→ 拉丁題詞 → 導語 → 兩個 CTA。
`<title>` 後綴、字標、OG 圖一併換成新題詞。

## 4 標記

依使用者的 PNG **重繪為向量**（`Mark.astro`）：四芒星（星光漸層＋芯上一點白）＋
兩道交錯軌道環（青立、金平）＋兩顆行星點＋星後光暈；字標末兩字母 `el` 走金色漸層
（`Wordmark.astro`，中間不留空白——字標是一個詞）。favicon 與 OG 圖同步重出。

備選版本 `variant="world"`（星生界：帶赤道線的球＋落在球緣的星＋一顆小星）留在元件裡，
比稿圖已交付使用者選擇；選定後改 `Mark.astro` 的預設 variant 即可。

**未決**：淺底使用情境（名片、外部媒體）目前星芒是淺色漸層，在白底上會不明顯；
若要用，需再補一組深色星芒的 `tone` 變體。

## 驗收

- `npm run build`（astro check strict）：0 error / 0 warning / 0 hint
- Chromium 實截：首頁（正體／EN）、作品（含服務節）、關於、404、比稿圖
- **截圖注意**：headless 的 `--virtual-time-budget` 下 IntersectionObserver 不觸發，
  reveal 內容會全是空白；驗收前先把 dist 的 `[data-reveal]` opacity 改成 1
  （已寫進 `docs/plan.md` 的已知陷阱）
