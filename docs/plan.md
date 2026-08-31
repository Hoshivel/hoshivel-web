# Hoshivel 官方門戶規格

本檔記錄現行定位、設計、架構與驗收；待辦位於 workspace。

## 定位

- 作品：《碎界 Shattered Realms》。
- 服務：Hoshi ID；服務不是作品，不占作品編號。
- 新聞、關於、協作與社群入口。
- 協作預設為短期／按件／彈性；`partner` 表示長期夥伴。
- 各站保持獨立視覺，不套用 sr-web 或 Hoshi ID 的設計。

文案定稿：

- Hoshivel 不翻譯、不拆詞；「星帆」是中文品牌名，不是日文品牌名。
- 日文作品名為 `『砕界 Shattered Realms』`，短稱 `『砕界』`。
- 題詞：**始於星帆，盛於繁星**／**From a Star-Sail to a Sea of Stars.**
- 主張：**不把遊戲做成另一份工作，只做真正值得玩的世界**
- Hero：**只做真正值得玩的世界**
- 一句不加句號；兩句以上才加；標題、標籤、按鈕不加；英文題詞保留句點。

## Celestial Atlas

| 元素 | 規格 |
|---|---|
| 色彩 | 夜 `#080b15`、交替 `#0b101d`、footer `#04060d`、星金 `#f0cd94` |
| 文字 | `#eef2fd`／`#cbd5ea`；標題明體、內文黑體、編號等寬 |
| 星空 | 固定種子星點、銀河漸層、罕見流星 |
| 章節 | α 作品、β 新聞、γ 關於、δ 協作 |
| 作品 | `HV—NN`；碎界識別色 `#9a8cff` |
| 服務 | 環標，不編號；Hoshi ID 識別色 `#6fd6c6` |
| 形狀 | radius 2–6px、圖版角線 |
| 動效 | reveal、連線、呼吸、視差；reduced-motion 全部關閉 |
| 字體 | Playfair Display + Noto Serif TC／SC／JP，自行託管 |

## 架構

| 項目 | 決定 |
|---|---|
| 框架 | Astro 靜態、零 island |
| i18n | zh-Hant 根、zh-cn、ja、en；typed dictionary |
| 新聞 | root `news/`，content collections；多語 ID 使用檔名避免互覆 |
| 缺譯 | 回退 zh-Hant |
| 協作 | root `roles.config.ts`；預設 `collab` |
| 內容分層 | UI 在 i18n、catalog 在 `lib/catalog.ts`、站點資訊在 `lib/site.ts` |
| 路由 | 共用 page component + locale 薄 route |

常見陷阱：

- 多語新聞不得讓同 slug 覆蓋；ID 使用完整檔名。
- 直書不使用 `writing-mode: vertical-rl`；逐字分行。
- CJK 標題寬度不使用 `ch`。
- 星點 opacity 以各自 `--hv-o` 作動畫基準。
- Hero 標題字級需避免 CJK 孤字折行。
- headless screenshot 驗收時，若 IntersectionObserver 未觸發，先將 dist 的
  `[data-reveal]` 強制可見；不得把截圖空白誤判為頁面 bug。

## 路由

```text
/             Hero → α 作品 → 服務 → β 新聞 → 理念 → δ 協作
/works        α 作品與服務
/news         β 新聞列表
/news/<slug>  新聞頁
/about        γ 關於、聯絡、社群
/join         δ 協作
/404          404
```

全頁輸出四語 hreflang、sitemap、robots、locale RSS 與 OG 圖。

## 驗收

- `hoshi test` 通過，Astro check 零錯誤。
- 四語內容正確；EN 不重複拉丁副標。
- 選單具 aria-expanded、Esc、外點關閉與 skip link。
- reduced-motion 無動畫且內容全可見。
- 頁面 JS 僅必要選單、reveal、視差，維持小型。
- 不拆解品牌名；用語維持「帳號／帳戶中心／回合制策略」。
- 章節字母在所有頁面一致。
- 字體子集覆蓋全部內容；日文頁只載 JP 字形。
