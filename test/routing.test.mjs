/*
  路由字串的形狀 —— 釘住 2026-08-28 的 307 無限迴圈。

  迴圈的成因不是那支轉址腳本，是**同一頁有兩種寫法**：主機提供的是
  `/news/x/`（產物是 `<路徑>/index.html`），而邏輯路徑一律不帶尾斜線。
  腳本拿後者去比 `location.pathname`，判成「另一頁」就轉，主機 307 轉回來，
  腳本再跑一次。所以要釘的不變式只有一條：

      對預設語言的任何一頁，由它自己的 pathname 推回來的目標＝它自己。

  這一層驗得到的是那條不變式；轉址腳本裡另有一道執行期護欄（比對「同一頁」
  而不是「同一個字串」），那一道由 `src/components/PreferenceBootstrap.astro`
  自己帶著，形狀在真的瀏覽器裡才驗得到。
*/
import assert from "node:assert/strict";
import test from "node:test";

import {
  LOCALES,
  DEFAULT_LOCALE,
  localizedPath,
  pagePath,
  stripLocalePrefix,
} from "../src/i18n/utils.ts";

// 主機真的提供的那些 pathname（`dist/` 的目錄形狀）。
const SERVED = ["/", "/about/", "/works/", "/join/", "/news/", "/news/shattered-realms-site/"];

test("偏好轉址的目標永遠不是讀者已經在的那一頁", () => {
  for (const locale of LOCALES) {
    for (const served of SERVED) {
      const pathname = localizedPath(locale, served);
      const target = localizedPath(locale, stripLocalePrefix(pathname));
      assert.equal(target, pathname, `${locale} ${pathname} 會轉去 ${target}`);
    }
  }
});

test("頁面路徑帶尾斜線，檔案不帶", () => {
  assert.equal(pagePath("/about"), "/about/");
  assert.equal(pagePath("/about/"), "/about/");
  assert.equal(pagePath("/"), "/");
  assert.equal(pagePath("/news/shattered-realms-site"), "/news/shattered-realms-site/");
  assert.equal(pagePath("/rss.xml"), "/rss.xml");
  assert.equal(pagePath("/sitemap.xml"), "/sitemap.xml");
});

test("錨點與查詢字串留在尾斜線之後", () => {
  assert.equal(pagePath("/works#shattered-realms"), "/works/#shattered-realms");
  assert.equal(pagePath("/news?page=2"), "/news/?page=2");
  assert.equal(localizedPath("en", "/works#hoshi-id"), "/en/works/#hoshi-id");
});

test("語系前綴接在正規化之後的路徑上", () => {
  assert.equal(localizedPath(DEFAULT_LOCALE, "/"), "/");
  assert.equal(localizedPath("zh-CN", "/"), "/zh-cn/");
  assert.equal(localizedPath("ja", "/news/hello-hoshivel"), "/ja/news/hello-hoshivel/");
  assert.equal(localizedPath("en", "/rss.xml"), "/en/rss.xml");
});
