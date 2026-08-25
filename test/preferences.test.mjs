import assert from "node:assert/strict";
import test from "node:test";

import {
  globalLanguageForLocale,
  normalizeGlobalLanguage,
  parseCookie,
  preferenceCookieDomain,
} from "../src/lib/preferences.ts";

test("normalizes the locale vocabularies used by the four public surfaces", () => {
  assert.equal(globalLanguageForLocale("zh-Hant"), "zh-TW");
  assert.equal(normalizeGlobalLanguage("zh-Hans"), "zh-CN");
  assert.equal(normalizeGlobalLanguage("ja"), "ja");
  assert.equal(normalizeGlobalLanguage("de"), null);
});

test("parses encoded cookie values without losing equals signs", () => {
  assert.equal(parseCookie("a=1; hoshi_lang=zh-TW; token=a%3Db", "hoshi_lang"), "zh-TW");
  assert.equal(parseCookie("token=a%3Db", "token"), "a=b");
  assert.equal(parseCookie("hoshi_lang=%E0%A4%A", "hoshi_lang"), null);
});

test("shares preferences only within the Hoshivel parent domain", () => {
  assert.equal(preferenceCookieDomain("hoshivel.com"), "hoshivel.com");
  assert.equal(preferenceCookieDomain("id.hoshivel.com"), "hoshivel.com");
  assert.equal(preferenceCookieDomain("play.sr.hoshivel.com."), "hoshivel.com");
  assert.equal(preferenceCookieDomain("not-hoshivel.com"), null);
  assert.equal(preferenceCookieDomain("localhost"), null);
});
