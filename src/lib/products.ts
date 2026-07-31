/*
  作品資料（結構＋連結＋識別色）；所有文案走 i18n 字典（p.sr.* / p.id.*）。
  新增作品：這裡加一筆（含星表編號）＋ 字典補鍵 ＋ tokens.css 加識別色即可；
  首頁星圖最多點亮三顆作品星（見 components/sky/WorksChart.astro）。
*/

import { catalogNo, type UIKey } from "@/i18n/utils";
import { SR_URL, HOSHI_ID_URL } from "./site";

export interface Product {
  /** 穩定識別（錨點 id / DOM id 用）。 */
  id: string;
  /** 星表編號（HV—01…）：作品在門戶星圖上的目錄號。 */
  catalog: string;
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
  /** 作品識別色（tokens.css 中的 CSS 變數名；僅星記與類型字使用）。 */
  accentVar: string;
}

export const PRODUCTS: Product[] = [
  {
    id: "shattered-realms",
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
  {
    id: "hoshi-id",
    catalog: catalogNo(2),
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
