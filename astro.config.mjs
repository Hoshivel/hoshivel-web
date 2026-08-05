// @ts-check
import { defineConfig } from "astro/config";

// Hoshivel 官方門戶 —— 靜態優先、輕載為上。
// 門戶不堆動效（家族的旗艦動效屬 sr-web）；效能與可讀性即體驗。
// 部署目標：hoshivel.com（網域依 hoshi-identity 部署文件的
// id.hoshivel.com 推定；若另有安排，改這裡的 site 即可，
// canonical / hreflang / sitemap 會一併跟著換）。
export default defineConfig({
  site: "https://hoshivel.com",
  build: {
    // 站內樣式量小，內聯省請求
    inlineStylesheets: "auto",
  },
});
