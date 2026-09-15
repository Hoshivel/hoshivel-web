/*
  The shape of route strings -- pinning down the 307 redirect loop of 2026-08-28.

  The loop was not caused by the redirect script but by **one page having two
  spellings**: the host serves `/news/x/` (the build emits `<path>/index.html`),
  while logical paths never carry a trailing slash. The script compared the
  latter against `location.pathname`, read it as "another page" and redirected;
  the host 307'd back and the script ran again. So there is exactly one
  invariant to pin:

      For any page in the default locale, the target derived from its own
      pathname is that same page.

  This layer verifies that invariant. The redirect script carries a second,
  runtime guard of its own (comparing "the same page" rather than "the same
  string") inside `src/components/PreferenceBootstrap.astro`, and the shape of
  that one can only be verified in a real browser.
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

// The pathnames the host actually serves (the directory shape of `dist/`).
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
