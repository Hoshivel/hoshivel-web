# hoshivel-web —— Hoshivel 官方門戶

Hoshivel（星帆）的組織門面網站：作品（《碎界 Shattered Realms》、Hoshi ID）、新聞、關於、合作。

## 設計語言：「星圖 Celestial Atlas」

**三站三面貌**——sr-web 是深空紫的旗艦動效站、Hoshi ID 是夜藍青金的明朝體帳戶站，
門戶走第三極：**古星圖銅版**——墨藍的夜、星光的字、一種星金，
細如髮的星圖線與方正的圖版邊角。不是科幻太空，是量測用的星表圖版。

正式題詞：**始於星帆，盛於繁星**（From a Star-Sail to a Sea of Stars.）
定位第二句（Hero 內，位階小於題詞）：**不把遊戲做成另一份工作，只做真正值得玩的世界**
關於頁的〈我們相信〉以五項完整主張展開，並以正式題詞收尾

核心命題：**作品即星**。門戶是 Hoshivel 的星圖，每一件作品是圖上一顆亮星；
**服務不是作品**——Hoshi ID 這類基礎設施在圖上以環標呈現，不佔作品編號。

- 全站固定星空：銀河漸層＋遠近兩層星點（建置期以固定種子生成，非 client JS）
- 首頁主視覺＝ `WorksChart` 星圖：座標網、星座連線、刻度；亮星可點，直達作品段落
- 品牌標記＝**星盤**（四芒星＋星盤環＋斜刻度；favicon 同版）
- 章節以拜耳字母編號（α 作品、β 新聞、γ 關於、δ 協作，各語系共用）——分配表在
  `src/lib/chapters.ts`，**字母屬於章節本身，不屬於它在某一頁上的位置**（首頁沒有
  「關於」一節，所以首頁看得到 α β δ，跳過 γ 是對的）；作品帶星表編號 `HV—01`，
  服務帶「服務」籤
- 品牌字體**自行託管**：標題與字標＝ Playfair Display ＋ Noto Serif TC／SC／JP 子集
  （見下節）；內文黑體與編號等寬走系統字
- 方正圖版（radius 2–6px）
- 動效節制：reveal-on-scroll、星圖連線描出、少數星呼吸、星空微視差、極罕見流星
  ——全部隨 `prefers-reduced-motion` 關閉

> **品牌名 Hoshivel 是一個完整的詞**：站上文案、註解與圖檔一律不拆字、不解字源。
> 中文品牌名為**星帆**，與 Hoshivel 並用；首頁導語只寫 Hoshivel，關於頁仍可在
> 團隊介紹中並列，正式題詞則作「始於星帆，盛於繁星」。它同樣是完整的詞，
> 這條規則照樣適用。

> **句號規則**：**一句不加，兩句以上才加。** 標題、標籤與按鈕一律不加。
> 硬換行（`\n`）不影響判斷——`home.hero.lead` 排成三行仍是一句，不加；
> 分號、冒號、破折號也都不算斷句。正式英文題詞保留定稿中的句點，是唯一例外。
> 這條規則 `astro check` 驗不到（型別只管鍵齊不齊，不管標點），改文案時自己看。

## 技術棧

- **Astro 5**（strict TS、純靜態輸出、零 client framework——連 React 都不需要）
- 四語 i18n：**zh-Hant 掛根 `/`**（權威語言）、`/zh-cn`、`/ja`、`/en`；typed 字典缺鍵編譯不過
- 新聞走 **content collections**，稿件放在**專案根目錄 `news/`**（與 `src/` 平級，
  build 時讀 `./news/*.md`），發新聞＝丟一個 Markdown 檔
- 招募職位放在**專案根目錄 `roles.config.ts`**（四語文案就地寫齊，不必動字典）
- 設計 tokens 集中於 `src/styles/tokens.css`（`--hv-*`）；全站不寫裸 hex

## 開發

```bash
npm install
npm run dev      # 本地開發
npm run build    # astro check && astro build（strict TS，驗收門檻）
npm run preview  # 預覽建置產物
npm run fonts    # 重出自訂字體子集（需 pip install fonttools brotli）
```

## 自訂字體

標題與字標走自訂明體，**自行託管、不打第三方請求**：

| 面 | 字體 | 子集大小 |
| --- | --- | --- |
| 拉丁（字標骨架） | Playfair Display 600 | ~12 KB |
| 漢字（正體頁） | Noto Serif TC 600 | ~186 KB |
| 漢字（簡體頁） | Noto Serif SC 600 | ~216 KB |
| 漢字・假名（日文頁） | Noto Serif JP 600 | ~218 KB |

漢字面分三支不是因為字集不同，是因為**字形**不同——関/關、発/發 在三地長得不一樣，
共用一支會讓日文頁長出中文字形，那比回退到系統明體更難察覺。

`scripts/subset-fonts.py` 從 `src/i18n/ui.ts`、`news/*.md`、`roles.config.ts` 收集「站上真的會
出現的字」做子集，輸出到 `public/fonts/`。原始字檔（17–25 MB）快取於 `scripts/.fontcache/`，
已 gitignore。**發新聞或改協作文案後若某些字掉回系統明體，跑一次 `npm run fonts` 即可。**

保底表**各歸各的書寫系統**：中文常用字只墊 TC／SC，整套假名只墊 JP。假名尤其要濾——
Noto Serif 是泛 CJK 家族，TC／SC 的 cmap 其實也有假名，不濾就會在中文頁各多背約 190 個
永遠排不到的字（約 47 KB）。真實用字則三支共用，理由見上一段。

三支漢字面不設 `unicode-range`：各語系頁的堆疊只點名自己那支，正體頁不會下載簡體或日文檔。

## 內容維護

**最常改的兩件事都放在 `src/` 之外**，就在專案根目錄，改稿不必進程式碼樹：

| 要改什麼 | 改哪裡 |
| --- | --- |
| 發新聞 | **`news/<slug>.<locale>.md`**（四語各一檔，共用 frontmatter `slug`；缺譯自動回退 zh-Hant） |
| 協作方向增減／文案 | **`roles.config.ts`**（四語就地寫齊；`open: false` 暫時下架；`kind: "partner"` 改為長期夥伴） |
| 新作品 | `src/lib/catalog.ts` 的 `WORKS`（含星表編號）＋ 字典 `p.*` 鍵 ＋ `tokens.css` 識別色 |
| 新服務 | `src/lib/catalog.ts` 的 `SERVICES`（不給編號）＋ 字典 `p.*` 鍵 |
| 站上出現新字（發新聞或改招募後） | `npm run fonts` 重出字體子集 |
| 介面文案 | `src/i18n/ui.ts`（zh-Hant 為鍵源，四語逐鍵對齊） |
| 組織連結／信箱／社群 | `src/lib/site.ts`（`SOCIAL_LINKS` 為社群入口的唯一來源） |

### 新聞 RSS：一個語系一份，發稿即自動更新

`/rss.xml`（正體中文）與 `/zh-cn/rss.xml`、`/ja/rss.xml`、`/en/rss.xml` 於建置期
從 `news/` 產出，發新聞不必另外做事。手捲 RSS 2.0（`src/lib/rss.ts`，零依賴，
同 `sitemap.xml` 的作法），各頁 `<head>` 只掛**本語系那一份**供閱讀器自動探索。

**一份混語 feed 對訂閱者是壞的**——同一則消息會送四次、其中三次他讀不懂，
而 feed 沒有語言切換器，語言只能在訂閱那一刻決定。缺譯照樣回退 zh-Hant
（與網頁一致），所以四份 feed 的則數永遠相同。

### 招募：預設是協作，不是職缺

門戶的預設立場是**短期彈性協作**——按件、短期專案或彈性兼職，範圍與報酬先談
清楚再開始；合作順了、方向也對得上，再談長期。`roles.config.ts` 中未標 `kind`
的位置一律視為協作（`DEFAULT_ROLE_KIND = "collab"`），標 `kind: "partner"` 的
則是**長期夥伴**。卡上的型態籤、洽談字樣與 mailto 主旨
（`[Collab]` / `[Partner]`）都跟著它走。

## 部署（hoshivel.com）

`npm run build` → `dist/` 純靜態（HTML／CSS／少量 JS／自託管字體／`og.png`／`sitemap.xml`／
`rss.xml` 四份／`robots.txt`），交給 nginx 服務即可。

> **全站規範**：Hoshivel 的前端**必須**可建置為純靜態內容，因此本站**不得**引入
> SSR adapter（`@astrojs/node` 等）或把 `output` 改成 `'server'`／`'hybrid'`——那會讓
> 產物需要 Node.js 執行期，nginx 就服務不了。同理**不得**新增容器產物
> （`Dockerfile`／`compose.yaml`／k8s manifest）。自託管字體也是同一條規範的延伸：
> 建置期產出、執行期零外部請求。規範正文與檢查腳本見
> [hoshi-platform-standards](https://github.com/Hoshivel/hoshi-platform-standards)。

**上線前待確認的假定值**（皆為單點修改）：

1. **網域**：`astro.config.mjs` 的 `site` 設 `https://hoshivel.com`——依 hoshi-identity
   `docs/deployment.md` 的 `id.hoshivel.com` 推定；若另有安排改此一行
   （canonical / hreflang / sitemap 全跟著它），`public/robots.txt` 的 Sitemap 行同步改。
2. **Hoshi ID 入口**：`src/lib/site.ts` 的 `HOSHI_ID_URL` 設 `https://id.hoshivel.com`
   （同上推定）；設為 `null` 可隱藏外部按鈕。
3. **聯繫信箱**：`src/lib/site.ts` 的 `CONTACT_EMAIL`（目前佔位 `contact@hoshivel.com`）。
4. **協作方向**：目前公開視覺與美術、宣發與內容，以及限已有共同專案經驗者的長期技術夥伴。
   首頁導語不列舉工種，調整公開方向時不必同步改文案。
5. **社群帳號**：`src/lib/site.ts` 的 `SOCIAL_LINKS`——X／YouTube／GitHub 皆為 `hoshivel`；
   Reddit 目前指向使用者頁 `u/hoshivel`，日後若開 `r/hoshivel` 版改該行即可。

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

沿用 ShatteredRealms 家族：正體中文文件、`docs/plan.md` 權威計畫、
工作記錄一律收在 [workspace](https://github.com/Hoshivel/workspace)
（待辦 `todo/hoshivel-web/`、日誌 `logs/hoshivel-web/`）、雲端每階段推送。
姊妹站：[sr-web](https://sr.hoshivel.com)（《碎界》官方門面）、
hoshi-identity（Hoshi ID 帳戶服務）。**各站各有面貌，互不套用彼此的視覺語言。**
