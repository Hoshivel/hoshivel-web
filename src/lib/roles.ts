/*
  Role data access -- the data itself lives in `roles.config.ts` at the project
  root (a sibling of src). This file only filters out closed positions, fills in
  the default kind, and resolves the copy for a locale (falling back to zh-Hant).
  To add, remove or reword a role, edit `roles.config.ts`; this file stays put.
*/

import {
  ROLES,
  DEFAULT_ROLE_KIND,
  type RoleKind,
  type RoleText,
} from "../../roles.config";
import type { Locale } from "@/i18n/utils";

export type { RoleKind };

/** A role already resolved to one language, ready for a page to render. */
export interface ResolvedRole extends RoleText {
  id: string;
  kind: RoleKind;
}

/** Open roles for a locale (falls back to zh-Hant; config order is display order). */
export function getRoles(locale: Locale): ResolvedRole[] {
  return ROLES.filter((role) => role.open !== false).map((role) => ({
    id: role.id,
    kind: role.kind ?? DEFAULT_ROLE_KIND,
    // zh-Hant is the only language the config requires, so the fallback always resolves.
    ...(role.text[locale] ?? role.text["zh-Hant"]),
  }));
}
