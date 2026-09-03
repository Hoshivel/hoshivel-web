/*
  The 404 page only exists if something serves it.

  `src/pages/404.astro` was here from early on and `astro build` has always
  written `dist/404.html`, yet every unmatched path on hoshivel.com returned a
  404 with a ZERO-BYTE body until 2026-09-03. The gap was one key in
  `wrangler.jsonc`: `assets.not_found_handling` defaults to `"none"`, which
  answers unmatched requests with an empty response and never opens `404.html`.

  A browser paints an empty body as a blank white page and falls back to the raw
  URL for the tab title, so the failure looks like a crashed site rather than a
  typo. The sister site sr-web had the identical defect and the identical fix;
  see the workspace decision
  `decisions/infrastructure/Workers-靜態站要顯式開啟-404-頁.md`.

  Nothing in the build catches this: the page compiles, the asset is emitted, the
  deploy succeeds. Only these assertions stand between the config and a silent
  return to the blank page.
*/
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

import { ui as dictionaries } from "../src/i18n/ui.ts";

const read = (path) => readFileSync(new URL(path, import.meta.url), "utf8");

/**
 * Strip JSONC comments without touching comment-like text inside strings, so a
 * value such as an "https://" URL cannot truncate the parse.
 */
const parseJsonc = (source) => {
  let out = "";
  let inString = false;
  let escaped = false;
  for (let i = 0; i < source.length; i += 1) {
    const ch = source[i];
    if (inString) {
      out += ch;
      if (escaped) escaped = false;
      else if (ch === "\\") escaped = true;
      else if (ch === '"') inString = false;
      continue;
    }
    if (ch === '"') {
      inString = true;
      out += ch;
      continue;
    }
    if (ch === "/" && source[i + 1] === "/") {
      while (i < source.length && source[i] !== "\n") i += 1;
      out += "\n";
      continue;
    }
    if (ch === "/" && source[i + 1] === "*") {
      i += 2;
      while (i < source.length && !(source[i] === "*" && source[i + 1] === "/")) i += 1;
      i += 1;
      continue;
    }
    out += ch;
  }
  return JSON.parse(out);
};

const wrangler = parseJsonc(read("../wrangler.jsonc"));
const astroConfig = read("../astro.config.mjs");
const page = read("../src/pages/404.astro");

test("unmatched paths are answered with the 404 page, not an empty body", () => {
  assert.equal(
    wrangler.assets?.not_found_handling,
    "404-page",
    'assets.not_found_handling must be "404-page"; the default "none" returns a zero-byte 404',
  );
});

test("the asset directory Workers serves is the one Astro builds into", () => {
  // The 404 wiring is worth nothing if it points at a directory the build never
  // fills. Astro's outDir is left at its default here, so `dist` is the contract
  // between the two files — assert the config has not quietly moved.
  assert.match(wrangler.assets?.directory ?? "", /^\.\/dist\/?$/);
  assert.doesNotMatch(astroConfig, /outDir/, "astro outDir moved; wrangler assets.directory must follow");
});

test("the 404 page draws its copy from the shared dictionary", () => {
  // Hardcoded strings here drift away from src/i18n/ui.ts on the next copy pass,
  // and this page is the one nobody opens on purpose.
  for (const key of ["notfound.title", "notfound.body", "notfound.back"]) {
    assert.ok(page.includes(`"${key}"`), `404.astro must use ${key}`);
    for (const [locale, dictionary] of Object.entries(dictionaries)) {
      assert.ok(dictionary[key]?.trim(), `${locale}/${key} must not be empty`);
    }
  }
});

test("the 404 page links back into the site", () => {
  assert.match(page, /href="\/"/, "404.astro must offer a link home");
});
