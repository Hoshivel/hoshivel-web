# hoshivel-web — Hoshivel 官方門戶

Hoshivel／星帆的組織門戶，包含作品、服務、新聞、關於與協作資訊。

## 品牌與設計語言

設計語言為「星圖 Celestial Atlas」：古星圖銅版、墨藍夜色、星光文字、單一星金、
細星圖線與方正圖版。核心命題是「作品即星」；服務以環標表示，不占作品編號。

- 正式題詞：**始於星帆，盛於繁星**／**From a Star-Sail to a Sea of Stars.**
- 完整主張：**不把遊戲做成另一份工作，只做真正值得玩的世界**
- Hero：**只做真正值得玩的世界**
- Hoshivel 是完整詞；中文品牌名為「星帆」。兩者不得拆字或解字源。
- 一句文案不加句號；兩句以上才加。標題、標籤、按鈕不加。英文題詞保留句點。

主要規則：

- 全站固定星空；星點於建置期以固定種子產生。
- `WorksChart` 以亮星表示作品、環標表示服務。
- 章節字母固定於 `src/lib/chapters.ts`：α 作品、β 新聞、γ 關於、δ 協作。
- 作品使用 `HV—NN` 編號；服務不編號。
- 字體自行託管：Playfair Display 與 Noto Serif TC／SC／JP 子集。
- `prefers-reduced-motion` 關閉所有動畫與視差。

完整設計與驗收基準見 [`docs/plan.md`](docs/plan.md)。

## 技術

- Astro 7、strict TypeScript、純靜態輸出、零 client framework。
- i18n：zh-Hant 根路徑、`/zh-cn`、`/ja`、`/en`；typed dictionary。
- 新聞：根目錄 `news/<slug>.<locale>.md`。
- 協作方向：根目錄 `roles.config.ts`。
- design tokens：`src/styles/tokens.css` 的 `--hv-*`。

偏好 Cookie：

- `hoshi_cookie_consent`：只用必要 Cookie／記住偏好。
- `hoshi_lang`：`.hoshivel.com` 共用語言。
- `hoshi_theme`：支援主題的站點共用外觀。

偏好不承載分析資料，也不控制登入與安全 Cookie。

## 開發

```sh
hoshi test
hoshi dev -open
npm run preview
npm run fonts
```

修改 `src/i18n/ui.ts`、新聞或 `roles.config.ts` 後執行 `npm run fonts`，提交產生的
`public/fonts/*.woff2`。原始字體快取於被忽略的 `scripts/.fontcache/`。

TC、SC、JP 必須分成三支字形子集；各 locale 只引用自己的字體，不設共用
`unicode-range`。

## 內容落點

| 內容 | 位置 |
|---|---|
| 新聞 | `news/<slug>.<locale>.md`；同 slug 四語，缺譯回退 zh-Hant |
| 協作方向 | `roles.config.ts`；預設 `collab`，長期夥伴為 `partner` |
| 作品／服務 | `src/lib/catalog.ts` 與 `src/i18n/ui.ts` |
| 介面文案 | `src/i18n/ui.ts` |
| 網域、聯絡與社群 | `src/lib/site.ts` |
| 字體子集 | `npm run fonts` |

RSS 依 locale 建置為 `/rss.xml`、`/zh-cn/rss.xml`、`/ja/rss.xml`、`/en/rss.xml`；
各頁只宣告本語系 feed。

## 部署

**本站不落在任何 Hoshivel 節點上，由 Cloudflare 建置並服務。**
`hoshi build`（＝`npm run build`）產生的 `dist/` 就是全部產物。不得加入 SSR
adapter、server／hybrid output、Node runtime 或容器產物。

倉庫這一側**沒有任何一步會推送產物**：CI 只驗建置過不過，`wrangler`
不在相依裡，`wrangler.jsonc` 的 `assets.directory: ./dist` 是給 Cloudflare
那一側讀的。所以「這個 commit 上線了沒有」不由本倉庫回答，也不由
`hoshi-deploy` 的節點清單回答——它在 Cloudflare 專案那裡。理由與誰負責見
workspace 的 `decisions/infrastructure/兩個公開前端由-Cloudflare-服務.md`。

正式值集中於：

| 項目 | 位置 |
|---|---|
| canonical site | `astro.config.mjs` |
| Hoshi ID URL、email、social | `src/lib/site.ts` |
| sitemap URL | `public/robots.txt` |

`public/og.svg` 是編輯源，`public/og.png` 為 1200×630 發佈圖。更新時以可渲染 CJK
字體的 Chromium 將 SVG 包入固定尺寸 HTML 後截圖並裁切。

工作記錄與待辦位於 workspace；本倉庫只保留設計、架構與操作文件。
