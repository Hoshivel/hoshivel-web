import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const slug = "hoshi-data-commit-dag";
const englishPath = `/en/news/${slug}/`;
const variants = [
  ["zh-hant", "zh-Hant", true],
  ["en", "en", true],
  ["zh-cn", "zh-CN", false],
  ["ja", "ja", false],
];

for (const [suffix, locale, full] of variants) {
  test(`Commit DAG article: ${locale} has valid metadata and the intended scope`, () => {
    const source = readFileSync(new URL(`../news/${slug}.${suffix}.md`, import.meta.url), "utf8");
    const frontmatter = source.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n/);
    assert.ok(frontmatter, "frontmatter is required");
    assert.match(frontmatter[1], new RegExp(`^slug: ${slug}$`, "m"));
    assert.match(frontmatter[1], new RegExp(`^locale: ${locale}$`, "m"));
    for (const key of ["title", "summary", "date", "tag"]) {
      assert.match(frontmatter[1], new RegExp(`^${key}: .+`, "m"));
    }
    const body = source.slice(frontmatter[0].length);
    assert.equal((body.match(/^```/gm) ?? []).length % 2, 0, "code fences must be paired");
    assert.ok(!source.includes("github.com/Hoshivel/"), "public copy must not link to internal source repositories");
    if (full) {
      assert.equal((body.match(/^## /gm) ?? []).length, 11);
      for (const paper of ["2004.00107", "1402.2237", "1302.0309"]) {
        assert.ok(body.includes(`https://arxiv.org/abs/${paper}`), `missing reference ${paper}`);
      }
    } else {
      assert.equal((body.match(/^## /gm) ?? []).length, 3, "translate outcomes, uses, and conclusions only");
      assert.ok(body.includes(`](${englishPath})`), "summary must link to the English technical article");
      assert.ok(body.length < 5000, "a localized summary is not another full translation");
    }
  });
}
