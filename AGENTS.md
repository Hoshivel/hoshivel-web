<!-- hoshivel:agent-rules v1 -> https://github.com/Hoshivel/workspace -->

# AGENTS.md — hoshivel-web（Hoshivel 官網）

> 共通流程以 [workspace](https://github.com/Hoshivel/workspace) 的 `AGENTS.md`
> 為準；本檔只列本倉庫規則。

## 0. 開工前

1. 讀 `../workspace/focus.md` 與 `../workspace/AGENTS.md`；缺少時先
   `git clone https://github.com/Hoshivel/workspace.git ../workspace`，
   取不到就停止並說明。
2. 待辦與日誌在 `workspace/todo/hoshivel-web/`、`workspace/logs/hoshivel-web/`；
   不得在本倉庫另建副本。

## 1. 入場閱讀順序

1. `README.md`：定位與 Celestial Atlas 設計語言。
2. `docs/plan.md`：產品定位與架構決策。
3. `src/`：路由、layout、component、i18n、工具與樣式；`news/` 是內容來源，
   `roles.config.ts` 是角色設定。

## 2. 驗證

```sh
hoshi test
hoshi dev -open
```

`hoshi test` 必須包含 `astro check` 與 `astro build`；不得只跑 build。
修改新聞、文案或 `src/i18n/` 後另跑 `npm run fonts`，並提交產生的 WOFF2。

## 3. 特殊規則

- 新頁面沿用 README 定義的 Celestial Atlas 配色、字級、節奏與既有元件。
- 本站是無後端的靜態站，部署產物依平臺部署規範。
- 可見文案放 `src/i18n/`，component 使用訊息鍵。
- `public/` 品牌素材的正本在相鄰 `brand-assets/`；更新正本後再同步副本。
- 文件用正體中文，程式碼註解用英文。
