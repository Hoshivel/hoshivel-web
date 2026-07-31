# hoshivel-web —— Hoshivel 官方門戶

Hoshivel 的組織門面網站：作品（《碎界 Shattered Realms》、Hoshi ID）、新聞、關於、加入我們。

## 設計語言：「星圖 Celestial Atlas」

**三站三面貌**——sr-web 是深空紫的旗艦動效站、Hoshi ID 是夜藍青金的明朝體帳戶站，
門戶走第三極：**古星圖銅版**——墨藍的夜、星光的字、一種星金，
細如髮的星圖線與方正的圖版邊角。不是科幻太空，是量測用的星表圖版。

核心命題：**作品即星**。門戶是 Hoshivel 的星圖，每一件作品是圖上一顆亮星。

- 全站固定星空：銀河漸層＋遠近兩層星點（建置期以固定種子生成，非 client JS）
- 首頁主視覺＝ `WorksChart` 星圖：座標網、星座連線、刻度；亮星可點，直達作品段落
- 品牌標記＝**星盤**（四芒星＋星盤環＋斜刻度；favicon 同版）
- 章節以拜耳字母編號（α β γ δ，三語共用）；作品帶星表編號 `HV—01`
- 標題明體（serif）、內文黑體（sans）、編號等寬（mono）；方正圖版（radius 2–6px）
- 動效節制：reveal-on-scroll、星圖連線描出、少數星呼吸、星空微視差、極罕見流星
  ——全部隨 `prefers-reduced-motion` 關閉

> **品牌名 Hoshivel 是一個完整的詞**：站上文案、註解與圖檔一律不拆字、不解字源。

## 技術棧

- **Astro 5**（strict TS、純靜態輸出、零 client framework——連 React 都不需要）
- 三語 i18n：**zh-Hant 掛根 `/`**（權威語言）、`/zh-cn`、`/en`；typed 字典缺鍵編譯不過
- 新聞走 **content collections**（`src/content/news/*.md`），發新聞＝丟一個 Markdown 檔
- 設計 tokens 集中於 `src/styles/tokens.css`（`--hv-*`）；全站不寫裸 hex

## 開發

```bash
npm install
npm run dev      # 本地開發
npm run build    # astro check && astro build（strict TS，驗收門檻）
npm run preview  # 預覽建置產物
```

## 內容維護

| 要改什麼 | 改哪裡 |
| --- | --- |
| 發新聞 | `src/content/news/<slug>.<locale>.md`（三語各一檔，共用 frontmatter `slug`；缺譯自動回退 zh-Hant） |
| 職缺增減 | `src/lib/roles.ts` ＋ `src/i18n/ui.ts` 的 `role.*` 鍵 |
| 新作品 | `src/lib/products.ts`（含星表編號）＋ 字典 `p.*` 鍵 ＋ `tokens.css` 識別色；首頁星圖最多點亮三顆作品星 |
| 介面文案 | `src/i18n/ui.ts`（zh-Hant 為鍵源，三語逐鍵對齊） |
| 組織連結／信箱 | `src/lib/site.ts` |

## 部署（hoshivel.com）

`npm run build` → `dist/` 純靜態（HTML／CSS／少量 JS／`og.png`／`sitemap.xml`／`robots.txt`），
上傳任何靜態主機即可。

**上線前待確認的假定值**（皆為單點修改）：

1. **網域**：`astro.config.mjs` 的 `site` 設 `https://hoshivel.com`——依 hoshi-identity
   `docs/deployment.md` 的 `id.hoshivel.com` 推定；若另有安排改此一行
   （canonical / hreflang / sitemap 全跟著它），`public/robots.txt` 的 Sitemap 行同步改。
2. **Hoshi ID 入口**：`src/lib/site.ts` 的 `HOSHI_ID_URL` 設 `https://id.hoshivel.com`
   （同上推定）；設為 `null` 可隱藏外部按鈕。
3. **聯繫信箱**：`src/lib/site.ts` 的 `CONTACT_EMAIL`（目前佔位 `contact@hoshivel.com`）。
4. **職缺**：`src/lib/roles.ts` 為首發範例（美術／前端／後端），請按實際需求調整。

## OG 分享圖

`public/og.svg` 為可編輯源（星圖版式：夜空＋字標＋作品星）；
`public/og.png`（1200×630）由 headless Chromium 轉出：

```bash
# 需要 CJK 字型（如 fonts-noto-cjk）。舊版 headless 的 --window-size 含視窗邊框，
# 直接對 SVG 截圖會被截掉底部——故以固定尺寸的 HTML 包一層、加高視窗再裁切：
printf '<!doctype html><meta charset=utf-8><style>html,body{margin:0;overflow:hidden;background:#080b15}img{display:block;width:1200px;height:630px}</style><img src="og.svg">' > public/og-wrap.html
chromium --headless --disable-gpu --no-sandbox --hide-scrollbars \
  --window-size=1200,860 --screenshot=og-raw.png public/og-wrap.html
python3 -c "from PIL import Image; Image.open('og-raw.png').convert('RGB').crop((0,0,1200,630)).save('public/og.png', optimize=True)"
rm public/og-wrap.html og-raw.png
```

## 家族慣例

沿用 ShatteredRealms 家族：正體中文文件、`docs/plan.md` 權威計畫、`sessions/` 會話日誌、
雲端每階段推送。姊妹站：[sr-web](https://sr.oha.li)（《碎界》官方門面）、
hoshi-identity（Hoshi ID 帳戶服務）。**各站各有面貌，互不套用彼此的視覺語言。**
