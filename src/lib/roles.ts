/*
  招募角色資料（結構）；所有文案走 i18n 字典（role.*）。
  職缺增減改這裡＋字典；聯繫方式見 src/lib/site.ts。
*/

import type { UIKey } from "@/i18n/utils";

export interface Role {
  /** 穩定識別（DOM id / mailto 主旨用）。 */
  id: string;
  titleKey: UIKey;
  areaKey: UIKey;
  descKey: UIKey;
  skillsKey: UIKey;
}

export const ROLES: Role[] = [
  {
    id: "artist-2d",
    titleKey: "role.art.title",
    areaKey: "role.art.area",
    descKey: "role.art.desc",
    skillsKey: "role.art.skills",
  },
  {
    id: "frontend-gameplay",
    titleKey: "role.fe.title",
    areaKey: "role.fe.area",
    descKey: "role.fe.desc",
    skillsKey: "role.fe.skills",
  },
  {
    id: "backend",
    titleKey: "role.be.title",
    areaKey: "role.be.area",
    descKey: "role.be.desc",
    skillsKey: "role.be.skills",
  },
];
