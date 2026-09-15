/*
  Hoshivel official portal -- site-level organization data (single source of truth).
  Change a domain, mailbox or external link here and every reference follows.
  (Open roles live in `roles.config.ts` at the project root; news posts in `news/`.)
*/

/** GitHub organization page. */
export const GITHUB_URL = "https://github.com/Hoshivel";

/**
 * Shattered Realms official site (the domain sr-web deploys to).
 * Keep the trailing slash: this doubles as the `url` of the work entity in the
 * structured data, and schema.org identity is string equality -- two spellings
 * across the two markup blocks simply fail to link up.
 */
export const SR_URL = "https://sr.hoshivel.com/";

/**
 * Hoshi ID account center.
 * The domain comes from the production config example in hoshi-identity
 * docs/deployment.md (HOSHI_PUBLIC_URL=https://id.hoshivel.com); confirm before launch.
 */
export const HOSHI_ID_URL: string | null = "https://id.hoshivel.com";

/**
 * Public contact mailbox (used by the About and Join pages).
 * Confirm the production mailbox before launch; tracked in
 * workspace/todo/hoshivel-web/站台功能.md.
 */
export const CONTACT_EMAIL = "contact@hoshivel.com";

/** Social platform id (selects the icon; a new platform also needs SocialLinks.astro). */
export type SocialId = "x" | "youtube" | "github" | "reddit";

export interface SocialLink {
  id: SocialId;
  /** Platform name (a brand proper noun, identical in all languages, so not in the i18n dictionary). */
  label: string;
  /** How the account is displayed (e.g. @hoshivel, u/hoshivel). */
  handle: string;
  url: string;
}

/**
 * Social entry points (single source of truth) -- all four use the hoshivel account.
 * Add or remove a platform here; this order is the display order.
 */
export const SOCIAL_LINKS: SocialLink[] = [
  { id: "x", label: "X", handle: "@hoshivel", url: "https://x.com/hoshivel" },
  {
    id: "youtube",
    label: "YouTube",
    handle: "@hoshivel",
    url: "https://www.youtube.com/@hoshivel",
  },
  { id: "github", label: "GitHub", handle: "Hoshivel", url: GITHUB_URL },
  {
    id: "reddit",
    label: "Reddit",
    handle: "u/hoshivel",
    url: "https://www.reddit.com/user/hoshivel",
  },
];
