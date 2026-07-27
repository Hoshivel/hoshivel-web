# hoshivel-web —— Hoshivel 官方門戶

Hoshivel 的組織門面網站：作品（《碎界 Shattered Realms》、Hoshi ID）、新聞、關於、加入我們。

## 設計語言：「紙墨朱」

**三站三面貌**——sr-web 是深空紫的旗艦動效站、Hoshi ID 是夜藍青金的明朝體帳戶站，
門戶走第三極：**暖紙、墨字、唯一的朱紅**。編輯部式的日光面貌：組織是白日的工房，
作品才是那些夜空。

- 標題明體（serif）、內文黑體（sans）；方正近直角的按鈕與卡片（姊妹站皆為圓膠囊）
- 品牌標記＝**朱印**（朱紅印面鏤白四芒星——星是名 hoshi，印是署名的手）
- 章節以漢字編號（〇一、〇二…；en 為 01、02…）；首頁 Hero 帶直書落款欄
- 動效只有 reveal-on-scroll 與 hover；無背景美術、無發光、無漸層字

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
雲端每階段推送。姊妹站：[sr-web](https://sr.oha.li)（《碎界》官方門面）、
hoshi-identity（Hoshi ID 帳戶服務）。**各站各有面貌，互不套用彼此的視覺語言。**
