/*
  星表 —— Hoshivel 做的東西，分兩類：

    作品（work）    《碎界》這樣的成品；有星表編號（HV—01），是門戶星圖上的亮星。
    服務（service）  Hoshi ID 這樣的基礎設施；**不是產品**，是讓作品長期運行的地基，
                    在星圖上以環標呈現，不佔作品編號。

  所有文案走 i18n 字典（p.sr.* / p.id.*）；結構、連結與識別色在這裡。
  新增作品：WORKS 加一筆（含編號）＋ 字典補鍵 ＋ tokens.css 加識別色；
  新增服務：SERVICES 加一筆（不給編號）。首頁星圖最多點亮三顆作品星。
*/

import { catalogNo, type UIKey } from "@/i18n/utils";
import { SR_URL, HOSHI_ID_URL } from "./site";

export type EntryKind = "work" | "service";

export interface CatalogEntry {
  /** 穩定識別（錨點 id / DOM id 用）。 */
  id: string;
  kind: EntryKind;
  /** 星表編號（HV—01…）；服務不編號，故為 null。 */
  catalog: string | null;
  /** 字典鍵前綴對應的各欄位。 */
  nameKey: UIKey;
  latinKey: UIKey;
  kindKey: UIKey;
  statusKey: UIKey;
  descKey: UIKey;
  featureKeys: UIKey[];
  /** 對外站點；null = 尚無獨立入口（不渲染外部按鈕）。 */
  url: string | null;
  /** 狀態徽章是否帶「運行中」金點。 */
  live: boolean;
  /** 識別色（tokens.css 中的 CSS 變數名；僅星記與類型字使用）。 */
  accentVar: string;
}

/** 作品：門戶星圖上的亮星。 */
export const WORKS: CatalogEntry[] = [
  {
    id: "shattered-realms",
    kind: "work",
    catalog: catalogNo(1),
    nameKey: "p.sr.name",
    latinKey: "p.sr.latin",
    kindKey: "p.sr.kind",
    statusKey: "p.sr.status",
    descKey: "p.sr.desc",
    featureKeys: ["p.sr.f1", "p.sr.f2", "p.sr.f3"],
    url: SR_URL,
    live: true,
    accentVar: "--hv-p-sr",
  },
];

/** 服務：支撐作品的基礎設施（不是產品，不列入作品編號）。 */
export const SERVICES: CatalogEntry[] = [
  {
    id: "hoshi-id",
    kind: "service",
    catalog: null,
    nameKey: "p.id.name",
    latinKey: "p.id.latin",
    kindKey: "p.id.kind",
    statusKey: "p.id.status",
    descKey: "p.id.desc",
    featureKeys: ["p.id.f1", "p.id.f2", "p.id.f3"],
    url: HOSHI_ID_URL,
    live: true,
    accentVar: "--hv-p-id",
  },
];

/** 作品在前、服務在後（footer 與星圖用）。 */
export const CATALOG: CatalogEntry[] = [...WORKS, ...SERVICES];
