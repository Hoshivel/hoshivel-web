// @ts-check
import { defineConfig } from "astro/config";

// Hoshivel 官方門戶 —— 靜態優先、輕載為上。
// 門戶不堆動效（家族的旗艦動效屬 sr-web）；效能與可讀性即體驗。
// 部署目標：hoshivel.com（網域依 hoshi-identity 部署文件的
// id.hoshivel.com 推定；若另有安排，改這裡的 site 即可，
// canonical / hreflang / sitemap 會一併跟著換）。
export default defineConfig({
  site: "https://hoshivel.com",
  // 本站在埠計畫裡的區塊是 26820-26829（平臺與業務服務）。純靜態站不進
  // hoshi-deploy 的 inventory `nodes`，但 dev server 照樣和其他倉庫搶同一臺
  // 開發機上的號碼，所以號碼取自同一份計畫而不是 astro 的預設 4321。
  //
  // strictPort：撞到就失敗，不要滑到下一個空號。本站與 sr-web 先前都停在
  // 4321，兩個一起開時本站被 astro 靜靜地搬到 4322——而 .hoshi-build.yaml
  // 宣告的是 4321，於是 `hoshi dev` 直接拒絕啟動。
  server: { port: 26820 },
  vite: { server: { strictPort: true } },
  build: {
    // 站內樣式量小，內聯省請求
    inlineStylesheets: "auto",
  },
});
