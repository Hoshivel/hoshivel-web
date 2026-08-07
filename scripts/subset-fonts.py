#!/usr/bin/env python3
"""
Hoshivel 官方門戶 —— 自訂字體子集化。

門戶的標題／字標走自訂明體（Playfair Display ＋ Noto Serif TC / SC / JP）。
完整 CJK 字重動輒 17–25MB，全下發不可行；本腳本只挑「站上真的會出現的字」
做子集，產出四支 woff2（各數十 KB），置於 public/fonts/。

字集來源＝倉庫內所有會被渲染的文案：
  src/i18n/ui.ts（四語字典）、news/*.md（新聞）、roles.config.ts（協作）、
  src/lib/site.ts
再加上拉丁字母、數字、常用標點、一份「未來新聞很可能用到」的常用字保底表，
以及整套假名（日文面專用，見 main()）。

用法：
    pip install fonttools brotli
    npm run fonts          # === python3 scripts/subset-fonts.py

新增新聞後若出現字型不一致（個別字掉回系統明體），重跑一次即可。
原始字檔快取於 scripts/.fontcache/（已 gitignore），不隨倉庫散佈。
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

# 拉丁面（字標與大標的骨架）：(輸出檔名, 來源, 定重)
LATIN = ("playfair-display-600.woff2", f"{GF_RAW}/playfairdisplay/PlayfairDisplay%5Bwght%5D.ttf", 600)
# 漢字面：正體 / 簡體 / 日文各一支（各語系頁只會下載自己那支）。
# 分三支不是為了字集不同，是為了**字形**不同——関/關、発/發 是同一個意思、
# 不同的碼位或不同的地區字形，共用一支就會讓日文頁長出中文字形。
HAN = [
    ("noto-serif-tc-600.woff2", f"{GF_RAW}/notoseriftc/NotoSerifTC%5Bwght%5D.ttf", 600),
    ("noto-serif-sc-600.woff2", f"{GF_RAW}/notoserifsc/NotoSerifSC%5Bwght%5D.ttf", 600),
    ("noto-serif-jp-600.woff2", f"{GF_RAW}/notoserifjp/NotoSerifJP%5Bwght%5D.ttf", 600),
]
# 日文面的檔名前綴（main() 以此決定假名歸誰）
JP_PREFIX = "noto-serif-jp"

# 拉丁、數字、標點、CJK 標點與全形符號——版面骨架用得到的固定集合
BASE = set(
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
    " !\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~"
    "·—–…‧、。，；：？！「」『』（）〈〉《》【】〇×＋－／　"
    "©↗→←↑↓✦αβγδεζηθι"
)

# 中文的保底常用字：未來新聞很可能用到，但今天倉庫裡還沒出現的字。
# （子集化只是為了體積，寧可多帶一點。）**只墊 TC／SC**——見 main()：
# 這是中文的保底表，墊進日文面就是替日文頁背一百多個排不到的漢字。
COMMON = (
    "的一是了不在人有我他這個們中來上大為和國地到以說時要就出會可也你對生能而子那得於著下自之年過發後作里用道行所然家種事成方多經麼去法學如都同現當沒動面起看定天分還進好小部其些主樣理心她本前開但因只從想實日軍者意無力它與長把機十民第公此已工使情明性知全三又關點正業外將兩高間由問很最重並物手應戰向頭文體政美相見被利什二等產或新己制身果加西斯月話合回特代內信表化老給世位次度門任常先海通教兒原東聲提立及比員解水名真論處走義各入幾口認條平系氣題活爾更別打女變四神總何電數安少報才結反受目太量再感建務做接必場件計管期市直德資命山金指克許統區保至隊形社便空決治展馬科司五基眼書非則聽白卻界達光放強即像難且權思王象完設式色路記南品住告類求據程北邊死張該交規萬取拉格望覺術領共確傳師觀清今切院讓識候帶導爭運笑飛風步改收根幹造言聯持組每濟車親極林服快辦議往元英士證近失轉夫令準布始怎呢存未遠叫台單影具羅字愛擊流備兵連調深商算質團集百需價花黨華城石級整府離況亞請技際約示復病息究線似官火斷精滿支視消越器容照須九增研寫稱企八功吧包片史委乎查輕易早曾除農找裝廣局著曬"
)

TEXT_GLOBS = [
    "src/i18n/ui.ts",
    "src/lib/site.ts",
    # 常改的兩處都在 src 之外（見 README「內容維護」）
    "news/*.md",
    "roles.config.ts",
]


def collect_chars() -> set[str]:
    """倉庫裡**真的出現**的字。兩份保底表不在這裡，由 main() 分派給各自的面。"""
    chars: set[str] = set(BASE)
    for pattern in TEXT_GLOBS:
        for path in sorted(ROOT.glob(pattern)):
            chars |= set(path.read_text(encoding="utf-8"))
    # 去掉控制字元與純結構字元（不會被排版看到）
    return {c for c in chars if c.isprintable() and c not in "\t\n\r"}


def is_cjk(ch: str) -> bool:
    o = ord(ch)
    return (
        0x2E80 <= o <= 0x9FFF  # 部首補充 → CJK 統一漢字（含假名）
        or 0xF900 <= o <= 0xFAFF  # 相容漢字
        or 0xFE30 <= o <= 0xFE4F  # CJK 相容形式
        or 0xFF00 <= o <= 0xFFEF  # 全形
    )


def is_kana(ch: str) -> bool:
    """假名（平假名、片假名、片假名語音擴充、半形片假名）。"""
    o = ord(ch)
    return 0x3040 <= o <= 0x30FF or 0x31F0 <= o <= 0x31FF or 0xFF66 <= o <= 0xFF9D


# 假名保底：整套也不過兩百字，而日文頁只要有一個假名掉回系統明體就很顯眼。
# 漢字沒有這種保底（八萬字，只能按實際用字挑），假名可以一次帶滿。
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
    """把 `want` 中該字檔有的字做成 woff2；回傳實際收錄的字集。"""
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

    # 拉丁面先做：Playfair 有的（含 — … · → 等標點）都歸它，
    # 它沒有的（希臘字母、全形標點、漢字）才落到漢字面——
    # 兩支字檔不重疊，瀏覽器逐字回退即可，不必維護 unicode-range。
    latin_want = {c for c in chars if not is_cjk(c)}
    latin_kept = build(LATIN[0], LATIN[1], LATIN[2], latin_want)

    # 兩份保底表各歸各的書寫系統：中文常用字只墊 TC／SC，假名只墊 JP。
    # 假名尤其要濾——Source Han 是泛 CJK 家族，TC／SC 的 cmap 其實也有假名，
    # 不濾掉就會在正體／簡體頁各多背約 190 個永遠排不到的字（約 47KB）。
    #
    # **真實用字則三支共用**：同一個碼位在三地字形不同（関/關、発/發），
    # 那正是分三支的理由，不是可以互相省略的理由——日文頁用到的漢字
    # 在正體面裡是另一個字形，不能拿來頂替。
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
