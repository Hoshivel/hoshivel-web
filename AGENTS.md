<!-- hoshivel:agent-rules v1 -> https://github.com/Hoshivel/workspace -->

# AGENTS.md — hoshivel-web（Hoshivel 官網）

> **代理執行規範的正本不在這裡**，在
> [workspace](https://github.com/Hoshivel/workspace) 的 `AGENTS.md`：
> TODO 池、完成日誌、中斷復原流程、跨倉庫協作流程、分支與 PR 規則全在那裡。
> 本檔只補上**這個倉庫自己的**東西。

## 0. 開工前

**先取得 workspace，讀它的 `TODO.md` 與 `AGENTS.md`。**

```sh
cat ../workspace/TODO.md                                           # 本機：就在旁邊
git clone https://github.com/Hoshivel/workspace.git ../workspace   # 雲端：自己補上
```

- 取不到就**停下來告訴使用者**，不要退回在本倉庫自建 `TODO.md` 或 `sessions/`。
- **本倉庫的待辦在 `workspace/TODO.md` 的〈hoshivel-web〉分節**，不在本倉庫。
  **不得**自建 `TODO.md`、`sessions/`，或記錄領取、分支、`狀態：editing`
  （workspace `AGENTS.md` §4.4、§5）。
- 續接既有任務時**沿用 TODO 事項記的分支與 PR**，不要另開新分支
  （workspace `AGENTS.md` §4.3）。

## 1. 入場閱讀順序

1. `README.md` —— 本站的定位與**設計語言（Celestial Atlas）**。動任何版面前必讀。
2. `docs/plan.md` —— 定位、設計語言與架構決策（**不含待辦**，見 §0）。
3. `src/` 的結構：`pages/`（路由）、`layouts/`、`components/`、`i18n/`、
   `lib/`、`styles/`；`news/` 是內容來源，`roles.config.ts` 是角色設定。

## 2. 驗證

改動後執行；綠燈再把 TODO 事項的 `狀態` 設回 `idle`：

```sh
npm run build      # ＝ astro check && astro build（TypeScript 與內容都會檢查）
npm run fonts      # 只在動到字型子集時需要（需要 python3）
```

`astro check` 是這個倉庫唯一的型別關卡，不要用 `astro build` 跳過它。

## 3. 這個倉庫的特殊規則

- **設計語言是規範，不是建議**。本站是 Hoshivel 的門面，`README.md` 的
  〈Celestial Atlas〉定義了配色、字級與版面節奏。新頁面沿用既有的 layout 與
  component，不要為單一頁面另立一套。
- **靜態站，沒有後端**。部署是靜態產物，依 hoshi-standards
  `engineering/deployment.md`。
- **多語言走 `src/i18n/`**，與 sr-web 同慣例：頁面用訊息鍵，不要把句子寫死在
  component 裡。
- **`public/` 的品牌素材正本在 `brand-assets/`**（相鄰目錄，不是 git 倉庫）。
  要換 logo 或 app icon 時改那裡再複製過來，不要只改這裡的副本。
- **平臺規範的位置**：**被 import 的**進 hoshi-sdk，**被遵守的**進 hoshi-standards，
  **會過期的**（待辦、完成日誌、代理規範）進
  [workspace](https://github.com/Hoshivel/workspace)。
- 文件與註解沿用倉庫既有風格：**正體中文為主**（程式碼註解英文），
  狀態關鍵字（`editing` / `idle`）保持原樣以利機器辨識。
