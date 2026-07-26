# hoshivel-web —— Hoshivel 官方門戶

Hoshivel 的組織門面網站：作品（《碎界 Shattered Realms》、Hoshi ID）、新聞、關於、加入我們。

設計基調：**簡潔但不簡陋，以留白與排版立大氣**。門戶不堆特效（家族的旗艦動效屬 sr-web）——
全站唯一的捲動動效是 reveal-on-scroll，唯一的氛圍元素是純 SVG 星座（「星帆」）；
效能、可讀性與可存取性即體驗。

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
| 新作品 | `src/lib/products.ts` ＋ 字典 `p.*` 鍵 ＋ `tokens.css` 識別色 |
| 介面文案 | `src/i18n/ui.ts`（zh-Hant 為鍵源，三語逐鍵對齊） |
| 組織連結／信箱 | `src/lib/site.ts` |

## 部署（hoshivel.oha.li）

`npm run build` → `dist/` 純靜態（HTML／CSS／少量 JS／`og.png`／`sitemap.xml`／`robots.txt`），
上傳任何靜態主機即可。

**上線前待確認的佔位值**（皆為單點修改）：

1. **網域**：`astro.config.mjs` 的 `site` 目前假定 `https://hoshivel.oha.li`
   （canonical / hreflang / sitemap 全跟著它），另 `public/robots.txt` 的 Sitemap 行同步改。
2. **聯繫信箱**：`src/lib/site.ts` 的 `CONTACT_EMAIL`（目前佔位 `contact@oha.li`）。
3. **Hoshi ID 入口**：`src/lib/site.ts` 的 `HOSHI_ID_URL`（目前 `null`＝不顯示外部按鈕；
   日後有獨立入口填 URL 即自動長出）。
4. **職缺**：`src/lib/roles.ts` 為首發範例（美術／前端／後端），請按實際需求調整。

## OG 分享圖

`public/og.svg` 為可編輯源；`public/og.png`（1200×630）由 headless Chromium 轉出：

```bash
# 需要 CJK 字型（如 fonts-noto-cjk）；舊版 headless 的 --window-size 含視窗邊框，
# 故加高視窗再裁切：
chromium --headless --disable-gpu --no-sandbox --hide-scrollbars \
  --window-size=1200,760 --screenshot=og-full.png public/og.svg
python3 -c "from PIL import Image; Image.open('og-full.png').convert('RGB').crop((0,0,1200,630)).save('public/og.png', optimize=True)"
```

## 家族慣例

沿用 ShatteredRealms 家族：正體中文文件、`docs/plan.md` 權威計畫、`sessions/` 會話日誌、
雲端每階段推送。姊妹站：[sr-web](https://sr.oha.li)（《碎界》官方門面，Astro + 旗艦動效）。
