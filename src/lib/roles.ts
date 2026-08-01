/*
  招募資料存取 —— 資料本身在專案根目錄的 `roles.config.ts`（與 src 平級）。
  這裡只負責：過濾已下架的位置、補上預設招募型態、依語言取文案（缺譯回退 zh-Hant）。
  要增刪職位或改文案，改 `roles.config.ts`，不必動這個檔。
*/

import {
  ROLES,
  DEFAULT_ROLE_KIND,
  type RoleKind,
  type RoleText,
} from "../../roles.config";
import type { Locale } from "@/i18n/utils";

export type { RoleKind };

/** 已解析到單一語言的職位（頁面直接使用）。 */
export interface ResolvedRole extends RoleText {
  id: string;
  kind: RoleKind;
}

/** 該語言的公開職位列表（缺譯回退 zh-Hant，順序即設定檔順序）。 */
export function getRoles(locale: Locale): ResolvedRole[] {
  return ROLES.filter((role) => role.open !== false).map((role) => ({
    id: role.id,
    kind: role.kind ?? DEFAULT_ROLE_KIND,
    // zh-Hant 為設定檔中唯一必填的語言，故必然可回退。
    ...(role.text[locale] ?? role.text["zh-Hant"]),
  }));
}
