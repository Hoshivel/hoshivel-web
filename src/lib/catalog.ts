/*
  The catalog -- everything Hoshivel makes, in two kinds:

    work     A finished thing such as Shattered Realms; carries a catalog number
             (HV-01) and shows up as a bright star on the portal's star map.
    service  Infrastructure such as Hoshi ID; **not a product**, but the ground
             works keep running on. Drawn as a ring marker, and it takes no
             catalog number.

  All copy goes through the i18n dictionary (p.sr.* / p.id.*); structure, links
  and accent colors live here.
  Adding a work: one entry in WORKS (with a number) + dictionary keys + an accent
  color in tokens.css. Adding a service: one entry in SERVICES (no number).
  The home star map lights at most three work stars.
*/

import { catalogNo, type UIKey } from "@/i18n/utils";
import { SR_URL, HOSHI_ID_URL } from "./site";

export type EntryKind = "work" | "service";

export interface CatalogEntry {
  /** Stable identifier (used for anchor ids and DOM ids). */
  id: string;
  kind: EntryKind;
  /** Catalog number (HV-01...); null for services, which are not numbered. */
  catalog: string | null;
  /** The dictionary keys behind each displayed field. */
  nameKey: UIKey;
  latinKey: UIKey;
  kindKey: UIKey;
  statusKey: UIKey;
  /** Short blurb for the home card; the full works page uses descKey. */
  shortKey: UIKey;
  descKey: UIKey;
  featureKeys: UIKey[];
  /** Public site; null means there is no separate entry point yet (no external button). */
  url: string | null;
  /** Whether the status badge carries the gold "live" dot. */
  live: boolean;
  /** Accent color (a CSS variable name from tokens.css; only the star mark and kind label use it). */
  accentVar: string;
}

/** Works: the bright stars on the portal's star map. */
export const WORKS: CatalogEntry[] = [
  {
    id: "shattered-realms",
    kind: "work",
    catalog: catalogNo(1),
    nameKey: "p.sr.name",
    latinKey: "p.sr.latin",
    kindKey: "p.sr.kind",
    statusKey: "p.sr.status",
    shortKey: "p.sr.short",
    descKey: "p.sr.desc",
    featureKeys: ["p.sr.f1", "p.sr.f2"],
    url: SR_URL,
    live: true,
    accentVar: "--hv-p-sr",
  },
];

/** Services: infrastructure the works rest on (not products, so not numbered). */
export const SERVICES: CatalogEntry[] = [
  {
    id: "hoshi-id",
    kind: "service",
    catalog: null,
    nameKey: "p.id.name",
    latinKey: "p.id.latin",
    kindKey: "p.id.kind",
    statusKey: "p.id.status",
    shortKey: "p.id.short",
    descKey: "p.id.desc",
    featureKeys: ["p.id.f1", "p.id.f2"],
    url: HOSHI_ID_URL,
    live: true,
    accentVar: "--hv-p-id",
  },
];

/** Works first, services after (used by the footer and the star map). */
export const CATALOG: CatalogEntry[] = [...WORKS, ...SERVICES];
