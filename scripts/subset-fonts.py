#!/usr/bin/env python3
"""
Hoshivel official portal -- custom font subsetting.

Headings and the wordmark use custom serifs (Playfair Display plus Noto Serif
TC / SC / JP). A full CJK weight runs 17-25MB, which is impossible to ship, so
this script subsets down to "the characters the site actually shows" and emits
four woff2 files (tens of KB each) into public/fonts/.

The character set is drawn from every rendered string in the repository:
  src/i18n/ui.ts (the four-language dictionary), news/*.md (news),
  roles.config.ts (roles), src/lib/site.ts
plus Latin letters, digits, common punctuation, a fallback table of frequent
characters that "future news is likely to need", and the full kana set (for the
Japanese face only, see main()).

Usage:
    pip install fonttools brotli
    npm run fonts          # === python3 scripts/subset-fonts.py

If glyphs look inconsistent after adding news (individual characters dropping
back to the system serif), just run it again.
Source font files are cached in scripts/.fontcache/ (gitignored) and are not
distributed with the repository.
"""

from __future__ import annotations

import sys
import urllib.request
from pathlib import Path

from fontTools import subset
from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont

ROOT = Path(__file__).resolve().parent.parent
CACHE = Path(__file__).resolve().parent / ".fontcache"
OUT = ROOT / "public" / "fonts"

GF_RAW = "https://raw.githubusercontent.com/google/fonts/main/ofl"

# Latin face (the skeleton of the wordmark and headlines): (output name, source, instanced weight)
LATIN = ("playfair-display-600.woff2", f"{GF_RAW}/playfairdisplay/PlayfairDisplay%5Bwght%5D.ttf", 600)
# Han faces: one each for Traditional, Simplified and Japanese (a page only
# downloads its own). They are three files not because the character sets differ
# but because the **glyphs** do -- 関/關 and 発/發 mean the same thing at a
# different code point or in a different regional shape, and sharing one file
# would grow Chinese glyph shapes on Japanese pages.
HAN = [
    ("noto-serif-tc-600.woff2", f"{GF_RAW}/notoseriftc/NotoSerifTC%5Bwght%5D.ttf", 600),
    ("noto-serif-sc-600.woff2", f"{GF_RAW}/notoserifsc/NotoSerifSC%5Bwght%5D.ttf", 600),
    ("noto-serif-jp-600.woff2", f"{GF_RAW}/notoserifjp/NotoSerifJP%5Bwght%5D.ttf", 600),
]
# Filename prefix of the Japanese face (main() uses it to decide who gets the kana)
JP_PREFIX = "noto-serif-jp"

# Latin, digits, punctuation, CJK punctuation and full-width symbols -- the fixed set the layout skeleton needs
BASE = set(
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
    " !\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~"
    "·—–…‧、。，；：？！「」『』（）〈〉《》【】〇×＋－／　"
    "©↗→←↑↓✦αβγδεζηθι"
)

# Chinese fallback of frequent characters: likely to appear in future news, but
# not present anywhere in the repository today.
# (Subsetting only exists to save bytes, so err on the generous side.)
# **TC and SC only** -- see main(): this is the Chinese fallback table, and
# padding the Japanese face with it would carry a hundred-odd Han characters
# that page can never typeset.
COMMON = (
    "的一是了不在人有我他這個們中來上大為和國地到以說時要就出會可也你對生能而子那得於著下自之年過發後作里用道行所然家種事成方多經麼去法學如都同現當沒動面起看定天分還進好小部其些主樣理心她本前開但因只從想實日軍者意無力它與長把機十民第公此已工使情明性知全三又關點正業外將兩高間由問很最重並物手應戰向頭文體政美相見被利什二等產或新己制身果加西斯月話合回特代內信表化老給世位次度門任常先海通教兒原東聲提立及比員解水名真論處走義各入幾口認條平系氣題活爾更別打女變四神總何電數安少報才結反受目太量再感建務做接必場件計管期市直德資命山金指克許統區保至隊形社便空決治展馬科司五基眼書非則聽白卻界達光放強即像難且權思王象完設式色路記南品住告類求據程北邊死張該交規萬取拉格望覺術領共確傳師觀清今切院讓識候帶導爭運笑飛風步改收根幹造言聯持組每濟車親極林服快辦議往元英士證近失轉夫令準布始怎呢存未遠叫台單影具羅字愛擊流備兵連調深商算質團集百需價花黨華城石級整府離況亞請技際約示復病息究線似官火斷精滿支視消越器容照須九增研寫稱企八功吧包片史委乎查輕易早曾除農找裝廣局著曬"
)

TEXT_GLOBS = [
    "src/i18n/ui.ts",
    "src/lib/site.ts",
    # The two files edited most often live outside src (see README, "content maintenance")
    "news/*.md",
    "roles.config.ts",
]


def collect_chars() -> set[str]:
    """Characters that **actually appear** in the repository. The two fallback
    tables are not included here; main() assigns each to its own face."""
    chars: set[str] = set(BASE)
    for pattern in TEXT_GLOBS:
        for path in sorted(ROOT.glob(pattern)):
            chars |= set(path.read_text(encoding="utf-8"))
    # Drop control and purely structural characters (they are never typeset)
    return {c for c in chars if c.isprintable() and c not in "\t\n\r"}


def is_cjk(ch: str) -> bool:
    o = ord(ch)
    return (
        0x2E80 <= o <= 0x9FFF  # Radicals supplement through CJK Unified Ideographs (kana included)
        or 0xF900 <= o <= 0xFAFF  # Compatibility ideographs
        or 0xFE30 <= o <= 0xFE4F  # CJK compatibility forms
        or 0xFF00 <= o <= 0xFFEF  # Full-width forms
    )


def is_kana(ch: str) -> bool:
    """Kana (hiragana, katakana, katakana phonetic extensions, half-width katakana)."""
    o = ord(ch)
    return 0x3040 <= o <= 0x30FF or 0x31F0 <= o <= 0x31FF or 0xFF66 <= o <= 0xFF9D


# Kana fallback: the whole set is only about two hundred characters, and a single
# kana dropping back to the system serif is glaring on a Japanese page.
# Han gets no such fallback (eighty thousand characters, so they can only be
# picked by actual usage), but kana can be carried in full.
KANA = "".join(chr(o) for o in range(0x3041, 0x3100) if chr(o).isprintable())


def fetch(url: str) -> Path:
    CACHE.mkdir(parents=True, exist_ok=True)
    dest = CACHE / url.rsplit("/", 1)[-1].replace("%5B", "[").replace("%5D", "]")
    if dest.exists():
        return dest
    print(f"  下載 {dest.name} …", flush=True)
    with urllib.request.urlopen(url) as res, dest.open("wb") as fh:
        fh.write(res.read())
    return dest


def build(out_name: str, url: str, weight: int, want: set[str]) -> set[str]:
    """Subset the characters of `want` that this font actually has into woff2;
    return the set that was really included."""
    src = fetch(url)
    font = TTFont(src)
    if "fvar" in font:
        font = instantiateVariableFont(font, {"wght": weight}, updateFontNames=False)

    cmap = font.getBestCmap()
    keep = {c for c in want if ord(c) in cmap}

    options = subset.Options(
        layout_features=["kern", "liga", "calt", "ccmp", "locl", "mark", "mkmk", "vert"],
        drop_tables=["BASE", "JSTF", "DSIG", "EBDT", "EBLC", "SVG "],
        name_IDs=[1, 2, 3, 4, 5, 6],
        notdef_outline=True,
        recalc_bounds=True,
        desubroutinize=True,
    )
    options.flavor = "woff2"
    subsetter = subset.Subsetter(options=options)
    subsetter.populate(text="".join(sorted(keep)))
    subsetter.subset(font)

    OUT.mkdir(parents=True, exist_ok=True)
    dest = OUT / out_name
    font.flavor = "woff2"
    font.save(dest)
    print(f"  {out_name}: {len(keep)} 字 / {dest.stat().st_size / 1024:.1f} KB")
    return keep


def main() -> int:
    chars = collect_chars()
    cjk = sum(1 for c in chars if is_cjk(c))
    print(f"字集：{len(chars)} 字（其中 CJK {cjk}）")

    # The Latin face goes first: everything Playfair has (punctuation such as
    # — … · → included) belongs to it, and only what it lacks (Greek letters,
    # full-width punctuation, Han) falls through to the Han face. The two files
    # do not overlap, so the browser falls back character by character and no
    # unicode-range needs maintaining.
    latin_want = {c for c in chars if not is_cjk(c)}
    latin_kept = build(LATIN[0], LATIN[1], LATIN[2], latin_want)

    # Each fallback table goes to its own writing system: the Chinese frequent
    # characters pad TC and SC only, the kana pad JP only.
    # The kana especially must be filtered out -- Source Han is a pan-CJK family,
    # so the TC and SC cmaps do contain kana, and without filtering each of the
    # Traditional and Simplified pages would carry about 190 characters they can
    # never typeset (roughly 47KB).
    #
    # **Characters in actual use, by contrast, go to all three**: the same code
    # point is drawn differently in the three regions (関/關, 発/發), which is
    # precisely why there are three faces -- not a reason to leave one out. A Han
    # character used on a Japanese page is a different glyph in the Traditional
    # face and cannot stand in for it.
    han_want = chars - latin_kept
    kana = {c for c in han_want if is_kana(c)} | set(KANA)
    for name, url, weight in HAN:
        if name.startswith(JP_PREFIX):
            want = han_want | kana
        else:
            want = (han_want | set(COMMON)) - kana
        build(name, url, weight, want)
    print("完成 → public/fonts/")
    return 0


if __name__ == "__main__":
    sys.exit(main())
