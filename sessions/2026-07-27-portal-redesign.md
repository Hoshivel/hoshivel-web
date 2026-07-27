# Session：門戶整版重做（v2「紙墨朱」）

- 建立：2026-07-27
- 狀態：**完成待驗收**（全站重新設計、build 綠、桌面/行動截圖目視通過；待使用者視覺簽核）
- 進度摘要：v1（深空星光風）被否決——「不要仿照已有的（如 SR website）風格，
  各站要各有面貌」。整版重做為「紙墨朱」編輯部風：暖紙、明體、朱印、漢字編號、直書落款。
- 相關：branch `claude/hoshivel-official-portal-883quc`；新增參照 repo `hoshi-identity`
- **權威計畫**：`docs/plan.md`（已改寫為 v2）
- Runtime: cloud（完成後 push）
- Editing: idle

## 如何冷接手（Cold Resume）
1. 讀本檔與 `docs/plan.md`（v2 設計語言與陷阱清單）；`README.md` 有維護對照表。
2. `npm install` → `npm run build` 應綠燈。
3. 上線前四個假定值待確認（README「部署」節）：網域 / Hoshi ID URL / 信箱 / 職缺。

## 需求（2026-07-27，需求方原話重點）
1. 「我不滿意，全部重做。」
2. 「以全新的面貌，不要仿照已有的（比如 SR website）風格。」
3. 「就像 Hoshi ID，以一種全新的風格顯示」——各站各有自己的面貌，不要千站一面。

## 主要決策
- **讀了 hoshi-identity repo** 才定調：Hoshi ID 自有一套夜藍青金＋明朝體＋圓軌道的
  設計語言（`internal/httpapi/web/static/styles.css`），且部署文件給出 `id.hoshivel.com`
  → 門戶網域推定 `hoshivel.com`（v1 的 oha.li 假定作廢）。
- 三站版圖：SR＝深空紫動效站、Hoshi ID＝夜藍青金帳戶站 → 門戶取第三極
  「紙墨朱」日光編輯部（詳 docs/plan.md）。刻意反著來：亮 vs 暗、方正 vs 圓膠囊、
  印章 vs 發光、漢字編號 vs 星符。
- 品牌語彙改「署名」：標語 v2＝「少做，做好，做久」；「以星為帆」降為
  About 頁名字由來（etymology），不再作全站視覺母題。
- Hoshi ID 文案全面校準到實際功能（OIDC/帳戶中心/SR 已接入），
  作品卡長出 id.hoshivel.com 入口按鈕；新聞〈Hoshi ID 上線〉改寫為上線公告。

## 進度
### 已完成
- [x] tokens/global 全新設計系統（紙墨朱；方正 radius；明體 display）
- [x] 朱印 Mark/Wordmark、favicon、OG（1200×630 紙面版式）重做；Constellation 移除
- [x] Header（紙面＋朱線目前頁）/ Footer（墨面）/ 卡片 / 六頁全部重排
- [x] 章節編號系統（sectionNum：〇一〇二 / 01 02）＋首頁直書落款欄
- [x] 文案改版（標語/Hero/理念/404 星空語彙全撤；三語逐鍵）＋新聞兩篇改寫
- [x] 網域與連結：hoshivel.com / id.hoshivel.com / contact@hoshivel.com（佔位）
- [x] QA：build 綠；桌面＋行動全頁截圖；EN 重複拉丁副標隱藏
- [x] 修：flex 內 orthogonal flow 疊印（直書改逐字堆疊）；CJK 標題 `ch` 寬度陷阱
- [x] README / docs/plan.md 改寫；sr-web footer 回鏈網域更新（同分支）

### 待辦（使用者側）
- [ ] 視覺簽核：`npm run dev` 目視 `/`、`/works`、`/news`、`/about`、`/join`（三語）
- [ ] 確認 README「部署」節四個假定值

## 驗收方式
`npm run dev` → 首頁應見：紙面 Hero「少做，做好，做久——／作品，是值得回去的地方。」
（墨＋朱兩行）、右側直書「少做・做好・做久」＋朱印落款、〇一作品（兩卡各帶識別色
小方記與 live 徽章、皆有外部入口）、〇二新聞（暖紙帶）、理念一句、〇三同行、墨面 footer。
