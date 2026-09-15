// @ts-check
import { defineConfig } from "astro/config";

// Hoshivel official portal -- static first, light payload above all.
// The portal does not pile on motion (the family's flagship motion work belongs
// to sr-web); performance and readability are the experience.
// Deploy target: hoshivel.com (the domain was inferred from id.hoshivel.com in
// hoshi-identity's deployment doc; if that changes, edit `site` here and
// canonical, hreflang and the sitemap all follow).
export default defineConfig({
  site: "https://hoshivel.com",
  // This site's block in the port plan is 26820-26829 (platform and business
  // services). A purely static site never enters hoshi-deploy's inventory
  // `nodes`, but the dev server still competes for numbers with other repos on
  // the same development machine, so the number comes from that same plan
  // rather than astro's default 4321.
  //
  // strictPort: fail on a collision instead of sliding to the next free number.
  // This site and sr-web both used to sit on 4321, and starting both moved this
  // one to 4322 silently -- while .hoshi-build.yaml declared 4321, so
  // `hoshi dev` refused to start.
  server: { port: 26820 },
  vite: { server: { strictPort: true } },
  build: {
    // There is little CSS on the site, so inlining saves a request
    inlineStylesheets: "auto",
  },
});
