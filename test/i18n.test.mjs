import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import test from "node:test";
import { ui as dictionaries } from "../src/i18n/ui.ts";

const source = dictionaries["zh-Hant"];
const placeholders = (text) => [...text.matchAll(/\{(\w+)\}/g)].map((match) => match[1]).sort();

for (const [locale, dictionary] of Object.entries(dictionaries)) {
  test(`${locale}: every message is present and nonempty`, () => {
    assert.deepEqual(Object.keys(dictionary).sort(), Object.keys(source).sort());
    for (const [key, value] of Object.entries(dictionary)) {
      assert.equal(typeof value, "string", `${key} must be text`);
      assert.ok(value.trim(), `${key} must not be empty`);
    }
  });

  test(`${locale}: translations preserve interpolation arguments`, () => {
    for (const [key, value] of Object.entries(source)) {
      assert.deepEqual(
        placeholders(dictionary[key]),
        placeholders(value),
        `${locale}/${key} changes the message arguments`,
      );
    }
  });
}

test("zh-Hant public copy uses consistent Taiwan wording", () => {
  const newsDir = new URL("../news/", import.meta.url);
  const news = readdirSync(newsDir)
    .filter((name) => name.endsWith(".zh-hant.md"))
    .map((name) => readFileSync(new URL(name, newsDir), "utf8"));
  const roles = readFileSync(new URL("../roles.config.ts", import.meta.url), "utf8");
  const copy = [...Object.values(source), ...news, roles].join("\n");
  // 「點擊即玩」 is deliberately NOT on this list: the user wrote it into the
  // canonical zh-Hant description of 碎界 (2026-08-30), so it is approved Taiwan
  // copy for that claim, and this site's SR blurb now matches it. 「無需下載」
  // stays banned — the zh-Hant form is 「不必下載」.
  for (const term of [
    "聯繫", "已連接", "接入", "應當", "營收、日活", "遊玩時長", "匹配",
    "人機", "超模", "盈利", "怎樣", "落成", "無需下載",
    "每個項目", "保存", "宣發",
  ]) {
    assert.ok(!copy.includes(term), `zh-Hant public copy still contains ${term}`);
  }
});
