#!/usr/bin/env python3
"""Import the phone catalogue from the master data workbook (IS_phones_master_data.xlsx).

    npm run phones:import -- /path/to/IS_phones_master_data.xlsx

Needs openpyxl (python3 -m pip install openpyxl). The workbook is not kept in this public repo: it holds review
notes and prices that must not be published.

Writes one JSON file per published phone to src/content/phones/ and deletes files for phones that are no longer
published. Images (image, imageAlt) added by hand to an existing file are kept; everything else comes from the
workbook, so change the workbook or the rules below rather than the JSON.

Publishing rules
- Announced products are left out until they are certified. Mining versions, channel listings and the SP9EX1 Cam
  version are listed as variants on their parent page (FOLD) instead of near-identical pages.
- NOT FOUND cells are never published. CHECK and CONFLICT values are published with a public note (NOTES, STATUS).
  The import stops if a published flagged cell has no note, so researcher comments never reach the site.
- Uncertain temperature classes are left out of the filters and badges (the marking itself is shown, with its note).
- Summaries, strengths, limitations, alternatives and best-for tags follow the same rules for every brand.
"""

import datetime
import json
import re
import sys
from collections import namedtuple
from fnmatch import fnmatch
from pathlib import Path

try:
    import openpyxl
except ImportError:
    sys.exit("openpyxl is required: python3 -m pip install openpyxl")

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "src" / "content" / "phones"

Cell = namedtuple("Cell", "v flag")
FLAG_FILLS = {"FFF2CC": "check", "F8CBAD": "conflict", "E7E6E6": "notfound"}
PLACEHOLDER = re.compile(
    r"^(none|n/a\b.*|not (found|stated|listed|verified|published|confirmed)\b.*|check|unknown|-|—)$", re.I
)
HEDGED = re.compile(r"not verified|not stated|not confirmed|assumed|likely|implied|possible", re.I)

# ---------------------------------------------------------------------------------------------------------------
# Catalogue: which workbook rows become pages, and under which URL and name
# ---------------------------------------------------------------------------------------------------------------

PRODUCTS = {
    "PF-SE02-DZ1": ("ecom-smart-ex-02-dz1", "ecom Smart-Ex 02 DZ1"),
    "PF-SE02-DZ2": ("ecom-smart-ex-02-dz2", "ecom Smart-Ex 02 DZ2"),
    "PF-SE03-DZ1": ("ecom-smart-ex-03-dz1", "ecom Smart-Ex 03 DZ1"),
    "PF-SE03-DZ2": ("ecom-smart-ex-03-dz2", "ecom Smart-Ex 03 DZ2"),
    "PF-SE203": ("ecom-smart-ex-203", "ecom Smart-Ex 203"),
    "PF-EH10-DZ1": ("ecom-ex-handy-10-dz1", "ecom Ex-Handy 10 DZ1"),
    "IS-530.1": ("isafe-is530-1", "i.safe MOBILE IS530.1"),
    "IS-530.2": ("isafe-is530-2", "i.safe MOBILE IS530.2"),
    "IS-540.1": ("isafe-is540-1", "i.safe MOBILE IS540.1"),
    "IS-540.2": ("isafe-is540-2", "i.safe MOBILE IS540.2"),
    "IS-541.1": ("isafe-is541-1", "i.safe MOBILE IS541.1"),
    "IS-655.2": ("isafe-is655-2", "i.safe MOBILE IS655.2"),
    "IS-880.2": ("isafe-is880-2", "i.safe MOBILE IS880.2"),
    "IS-330.1": ("isafe-is330-1", "i.safe MOBILE IS330.1"),
    "IS-330.2": ("isafe-is330-2", "i.safe MOBILE IS330.2"),
    "IS-360.2": ("isafe-is360-2", "i.safe MOBILE IS360.2"),
    "IS-120.1": ("isafe-is120-1", "i.safe MOBILE IS120.1"),
    "IS-120.2": ("isafe-is120-2", "i.safe MOBILE IS120.2"),
    "IS-380.1": ("isafe-is380-1", "i.safe MOBILE IS380.1"),
    "IS-440.1": ("isafe-is440-1", "i.safe MOBILE IS440.1"),
    "IS-440.2": ("isafe-is440-2", "i.safe MOBILE IS440.2"),
    "BT-PIXAVI": ("bartec-pixavi-phone", "BARTEC Pixavi Phone"),
    "BT-SP9EX1": ("bartec-sp9ex1", "BARTEC SP9EX1"),
    "BT-SP9EX2": ("bartec-sp9ex2", "BARTEC SP9EX2"),
    "BT-SC9EX1": ("bartec-sc9ex1", "BARTEC SC9EX1 Smartscanner"),
    "XS-IP16PM": ("xshielder-iphone-16-pro-max", "Xshielder iPhone 16 Pro Max"),
    "XS-IP17": ("xshielder-iphone-17", "Xshielder iPhone 17"),
    "XS-IP17PM": ("xshielder-iphone-17-pro-max", "Xshielder iPhone 17 Pro Max"),
    "AX-Z1-IP14": ("atexxo-zone-1-iphone-14", "Atexxo Zone 1 iPhone 14"),
    "AX-Z1-IP15": ("atexxo-zone-1-iphone-15", "Atexxo Zone 1 iPhone 15"),
    "AX-Z1-IP17": ("atexxo-zone-1-iphone-17", "Atexxo Zone 1 iPhone 17"),
    "AX-Z2-IP14": ("atexxo-zone-2-iphone-14", "Atexxo Zone 2 iPhone 14"),
    "AX-Z2-IP14P": ("atexxo-zone-2-iphone-14-pro", "Atexxo Zone 2 iPhone 14 Pro"),
    "AX-Z2-IP15": ("atexxo-zone-2-iphone-15", "Atexxo Zone 2 iPhone 15"),
    "AX-Z2-IP16": ("atexxo-zone-2-iphone-16", "Atexxo Zone 2 iPhone 16"),
    "AX-Z2-IP16PM": ("atexxo-zone-2-iphone-16-pro-max", "Atexxo Zone 2 iPhone 16 Pro Max"),
    "AX-Z2-IP16E": ("atexxo-zone-2-iphone-16e", "Atexxo Zone 2 iPhone 16e"),
    "AX-Z2-IP17": ("atexxo-zone-2-iphone-17", "Atexxo Zone 2 iPhone 17"),
    "AX-Z2-IP17PM": ("atexxo-zone-2-iphone-17-pro-max", "Atexxo Zone 2 iPhone 17 Pro Max"),
    "AX-Z2-IP17E": ("atexxo-zone-2-iphone-17e", "Atexxo Zone 2 iPhone 17e"),
    "AX-Z2-S24": ("atexxo-zone-2-galaxy-s24", "Atexxo Zone 2 Galaxy S24"),
    "AX-Z2-S25": ("atexxo-zone-2-galaxy-s25", "Atexxo Zone 2 Galaxy S25"),
    "AX-Z2-S26": ("atexxo-zone-2-galaxy-s26", "Atexxo Zone 2 Galaxy S26"),
    "AX-Z2-XC7P": ("atexxo-zone-2-galaxy-xcover7-pro", "Atexxo Zone 2 Galaxy XCover7 Pro"),
    "XC-Z1-IP14": ("xciel-xcz1-iphone-14", "Xciel XCZ1 iPhone 14"),
    "XC-Z2-IP14": ("xciel-xciphone-14", "Xciel XCiPhone 14"),
    "XC-Z2-IP14PL": ("xciel-xciphone-14-plus", "Xciel XCiPhone 14 Plus"),
    "XC-Z2-IP17": ("xciel-xciphone-17", "Xciel XCiPhone 17"),
}

BRANDS = {
    "ecom": {
        "brand": "ecom (Pepperl+Fuchs)", "brandSlug": "ecom",
        "manufacturer": {"name": "ecom instruments (Pepperl+Fuchs)", "country": "Germany", "website": "https://www.ecom-ex.com"},
    },
    "i.safe MOBILE": {
        "brand": "i.safe MOBILE", "brandSlug": "isafe",
        "manufacturer": {"name": "i.safe MOBILE GmbH", "country": "Germany", "website": "https://www.isafe-mobile.com"},
    },
    "BARTEC": {
        "brand": "BARTEC", "brandSlug": "bartec",
        "manufacturer": {"name": "BARTEC GmbH", "country": "Germany", "website": "https://bartec.com"},
    },
    "Xshielder": {
        "brand": "Xshielder", "brandSlug": "xshielder", "sponsor": True,
        "manufacturer": {"name": "Xshielder AS", "country": "Norway", "website": "https://xshielder.com"},
    },
    "Atexxo": {
        "brand": "Atexxo", "brandSlug": "atexxo",
        "manufacturer": {"name": "Atexxo", "country": "Netherlands", "website": "https://atexxo.com"},
    },
    "Xciel": {
        "brand": "Xciel", "brandSlug": "xciel",
        "manufacturer": {"name": "Xciel Inc", "country": "USA", "website": "https://www.xciel.com"},
    },
}

# Listed as a variant on the parent page instead of getting a page of their own
FOLD = {
    "PF-SE03-DZ1M": ("PF-SE03-DZ1", "Smart-Ex 03 DZ1M",
                     "Mining version, certified for Group I (underground mining) only. It has no gas or dust zone rating."),
    "IS-530.M1": ("IS-530.1", "IS530.M1",
                  "Mining version with Group I approval. i.safe's safety instructions and IECEx certificate also list the "
                  "Zone 1/21 rating, but its datasheet shows the mining approval only."),
    "IS-540.M1": ("IS-540.1", "IS540.M1", "Mining version, rated for Group I as well as Zone 1/21."),
    "NOKIA-IS540.1": ("IS-540.1", "Sold by Nokia",
                      "Nokia offers the IS540.1 (as 'IS540.1 by i.safe MOBILE') in its private wireless portfolio, alongside "
                      "apps such as Nokia Team Comms. Same device and certificates."),
    "IS-380.M1": ("IS-380.1", "IS380.M1", "Mining version, rated for Group I as well as Zone 1/21."),
    "IS-440.M1": ("IS-440.1", "IS440.M1", "Mining version, rated for Group I (Ex ia) as well as Zone 1/21 (Ex ib)."),
    "BT-SP9EX1-CAM": ("BT-SP9EX1", "SP9EX1 Cam version",
                      "Camera version with no cellular radio or SIM slot. It keeps Wi-Fi 6, Bluetooth 5.2, NFC and GNSS, "
                      "and is covered by the same certificates."),
}
MINING_FOLDS = {"PF-SE03-DZ1M", "IS-530.M1", "IS-540.M1", "IS-380.M1", "IS-440.M1"}

# Versions within a single workbook row
EXTRA_VARIANTS = {
    "XS-IP16PM": [
        {"name": "S01", "description": "Removable lid. ATEX certified.", "partNumber": "XS1-SP-G01-C01-S01"},
        {"name": "S02", "description": "Cemented lid. ATEX and IECEx certified.", "partNumber": "XS1-SP-G01-C01-S02"},
    ],
    "XS-IP17": [
        {"name": "S01", "description": "ATEX certified.", "partNumber": "XS1-SP-G02-C01-S01"},
        {"name": "S02", "description": "Cemented lid. ATEX and IECEx certified.", "partNumber": "XS1-SP-G02-C01-S02"},
    ],
    "XS-IP17PM": [
        {"name": "S01", "description": "Screwed lid. ATEX certified.", "partNumber": "XS1-SP-G03-C01-S01"},
        {"name": "S02", "description": "Cemented lid, which the user must not open. ATEX and IECEx certified.",
         "partNumber": "XS1-SP-G03-C01-S02"},
    ],
    "IS-440.1": [{"name": "EdgeOne", "description": "The IS440.1 is also certified under the name EdgeOne, with the same certificates."}],
    "IS-440.2": [{"name": "EdgeTwo", "description": "The IS440.2 is also certified under the name EdgeTwo, with the same certificates."}],
    "XC-Z2-IP17": [
        {"name": "XCiPhone17-A", "description": "ATEX Zone 2 version. The customer can install the iPhone, following Xciel's procedure."},
        {"name": "XCiPhone17", "description": "Class I Division 2 and ATEX Zone 2 version for North America, installed by Xciel."},
    ],
}

# Status notes: required for every discontinued product and every flagged status cell
STATUS = {
    "PF-SE02-DZ1": ("discontinued", "Distributors list it as end of life, with the Smart-Ex 03 as its replacement.", "PF-SE03-DZ1"),
    "PF-SE02-DZ2": ("discontinued", "Distributors list it as end of life, with the Smart-Ex 03 as its replacement.", "PF-SE03-DZ2"),
    "PF-EH10-DZ1": ("discontinued", "Resellers list it as obsolete, replaced by the Smart-Ex 03 DZ1.", "PF-SE03-DZ1"),
    "IS-655.2": ("discontinued", "Discontinued by i.safe MOBILE. The IS880.2 is its successor.", "IS-880.2"),
    "BT-PIXAVI": ("discontinued", "Discontinued by BARTEC. The SP9EX1 replaces it.", "BT-SP9EX1"),
    "AX-Z2-IP14": ("discontinued", "No longer in Atexxo's current range (October 2026).", None),
    "AX-Z2-IP14P": ("discontinued", "No longer in Atexxo's current range (October 2026).", None),
    **{
        pid: ("current", "i.safe MOBILE has moved it to the archive section of its range, but distributors still list it. "
                         "Check availability before ordering.", None)
        for pid in ("IS-530.1", "IS-530.2", "IS-330.1", "IS-330.2", "IS-360.2")
    },
    "XC-Z1-IP14": ("current", "Xciel still publishes a datasheet, but we found no current reseller listing. "
                              "Check availability with Xciel.", None),
    "XC-Z2-IP14PL": ("current", "Xciel publishes a datasheet, but we found no reseller listing. Check availability with Xciel.", None),
}

# Public notes for flagged (CHECK / CONFLICT) cells that are published. Exact IDs win over patterns.
NOTES = {
    # Ex products
    ("PF-SE02-DZ2", "ATEX/IECEx marking - gas"): "The current datasheet prints 'op is'; the IECEx certificate (issue 1, 2023) gives the marking without it.",
    ("PF-SE02-DZ2", "In-use weight (g)"): "Taken from the Smart-Ex 02 DZ1; not published separately for the DZ2.",
    ("PF-SE02-DZ2", "Dimensions (mm)"): "Taken from the Smart-Ex 02 DZ1; not published separately for the DZ2.",
    ("IS-540.2", "In-use weight (g)"): "Taken from the IS540.1; not published separately for the IS540.2.",
    ("IS-540.2", "North America (NEC/CEC)"): "From Nokia's product page; we haven't found the certificate number.",
    ("IS-880.2", "In-use weight (g)"): "From i.safe MOBILE's datasheet; a reseller lists 196.4 g.",
    ("IS-440.*", "Dimensions (mm)"): "From i.safe MOBILE's datasheet; its web page gives a width of 70 mm.",
    ("BT-PIXAVI", "ATEX/IECEx marking - dust"): "As on the certificate. BARTEC's datasheet adds IP68.",
    ("BT-PIXAVI", "North America (NEC/CEC)"): "Only in an older BARTEC datasheet (2023); not in the current datasheet or certificate list.",
    ("BT-PIXAVI", "Specific conditions / safety rules"): "The certificate gives a charging range of 0 to +45 °C; BARTEC's datasheet and product page say 0 to +40 °C.",
    ("BT-S*", "Specific conditions / safety rules"): "BARTEC's datasheet gives a charging range of 0 to +45 °C; its product page says 0 to +40 °C.",
    ("BT-SP9EX2", "ATEX/IECEx marking - dust"): "As on the certificate and BARTEC's product page. The datasheet leaves out IP64.",
    ("XS-IP17", "IP rating"): "The Ex certificate gives IP6X (dust-tight) only. We found no Xshielder document that states a water rating.",
    ("AX-Z1-IP15", "In-use weight (g)"): "Atexxo gives 525 g in its flyer and 528 g in a product listing.",
    ("AX-Z2-XC7P", "Dimensions (mm)"): "From Atexxo's order table; its product page repeats the Galaxy S-series dimensions.",
    ("XC-Z1-IP14", "ATEX/IECEx marking - gas"): "From Xciel's datasheet. The IECEx certificate confirms Ex db IIB Gb but gives the temperature class only in its description, and no ATEX certificate number is published.",
    ("XC-Z1-IP14", "Ex ambient Ta"): "From the IECEx certificate. Xciel's datasheet says −20 °C to +45 °C.",
    ("XC-Z2-IP14", "ATEX/IECEx marking - gas"): "From current listings. An older Xciel safety instruction, which cites a superseded directive, gives different temperature classes.",
    ("XC-Z2-IP14PL", "ATEX/IECEx marking - gas"): "From Xciel's datasheet, which doesn't print the ATEX category or a certificate number.",
    # Base devices
    ("B-AP-*", "Security updates until"): "Apple doesn't publish an end date; its legal minimum is five years from first sale. Previous iPhone models have had security updates for seven years or more.",
    ("B-AP-*", "Satellite features"): "Listed on Apple's tech specs; availability depends on the country.",
    ("B-AP-17PM", "Video playback (h, maker figure)"): "UK model (nano-SIM and eSIM). The US eSIM-only model has a larger battery.",
    ("B-AP-15", "Wireless charging"): "As listed on Apple's tech specs, which don't mention Qi2.",
    ("B-AP-16PM", "Wireless charging"): "As listed on Apple's tech specs, which don't mention Qi2.",
    ("B-AP-16E", "Wireless charging"): "Apple doesn't state a wattage; 7.5 W is the Qi baseline.",
    ("B-SS-*", "Current OS"): "Current One UI version not confirmed.",
    ("B-SS-*", "Security updates until"): "Estimated from Samsung's commitment of seven years of security updates from launch.",
    ("B-SS-S24", "Satellite features"): "Samsung lists satellite texting with T-Mobile, in the US only.",
    ("B-IS-530", "Current OS"): "Resellers list Android 13; i.safe MOBILE's datasheet gives Android 10 at launch.",
    ("B-IS-530", "SIM"): "From a single source.",
    ("B-IS-540", "Rear camera"): "From i.safe MOBILE's datasheet; a distributor sheet lists 40 MP.",
    ("B-IS-540", "SIM"): "From i.safe MOBILE; a distributor sheet lists dual micro-SIM.",
    ("B-IS-655", "Rear camera"): "From a single reseller listing.",
    ("B-IS-655", "Front camera"): "From a single reseller listing.",
    ("B-IS-120", "Current OS"): "Proprietary ISM-OS, according to distributor data.",
    ("B-IS-540", "Security updates until"): "i.safe MOBILE states Q4 2032. Google's Android Enterprise directory lists 30 January 2032.",
    ("B-BT-SP9", "Security updates until"): "BARTEC states 'at least May 2030'.",
}
# Bases whose maker states the end of security updates as a quarter ("2032-Q4", "Q4 2032"). The workbook holds the
# quarter's last day for sorting and the cost calculator; pages quote the quarter, the maker's own wording.
SECURITY_QUARTERS = {"B-PF-SE03", "B-PF-SE203", "B-IS-330", "B-IS-440", "B-IS-530", "B-IS-540", "B-IS-541", "B-IS-655", "B-IS-880"}
THROUGH_NOTE = "Inferred from related information; not stated by the maker for this exact model."
CAPABILITY_NOTE = "Not confirmed by the maker for this exact model."

# Cells that are not published at all, even though the workbook holds a value
SKIP_CELLS = {
    ("XC-Z2-IP17", "In-use weight (g)"),  # listed on a case-only page; not the in-use weight
    ("BT-PIXAVI", "Ex IP (cert)"),  # neither certificate states an IP code
}
# NOT FOUND cells whose value is real but incomplete; published with their note
PUBLISH_NOT_FOUND: set[tuple[str, str]] = set()
# Entries removed from "Other approvals" (with the reason the cell was flagged)
DROP_APPROVALS = {"PF-SE03-DZ1": "ANZEx"}  # the ANZEx mining marking belongs to the DZ1M variant only
VALUE_OVERRIDES = {("XS-IP17", "IP rating"): "IP6X (dust-tight; no water rating stated)"}
FORM_LABEL = {
    "BT-SC9EX1": "smartphone with a built-in Zebra scan engine",
    "IS-380.1": "4G push-to-talk radio",
    "IS-440.1": "5G push-to-talk radio",
    "IS-440.2": "5G push-to-talk radio",
}
CHARGING_TEXT = {"IS-440.2": "Allowed in gas Zone 2 and Class I Division 2, through the external charging contacts"}

THROUGH_LABELS = {
    "Biometric unlock usable (Face ID / fingerprint)": "Face ID / fingerprint",
    "Action Button / programmable key": "Action Button / programmable key",
    "Camera Control (iPhone only)": "Camera Control",
    "Side and volume buttons": "Side and volume buttons",
    "Rear cameras unobstructed": "Rear cameras",
    "LiDAR unobstructed": "LiDAR",
    "Front camera": "Front camera",
    "Touchscreen": "Touchscreen",
    "Screen cover": "Screen cover",
    "NFC through case": "NFC",
    "Wireless charging": "Wireless charging",
    "MagSafe accessories (iPhone)": "MagSafe accessories",
    "Speaker and microphone": "Speaker and microphone",
    "Headset audio": "Headset audio",
    "USB-C / Lightning access": "USB-C / Lightning port",
    "SIM access": "SIM card",
}
CAPABILITY_LABELS = {
    "PTT": "Push-to-talk",
    "Emergency / SOS key": "Emergency / SOS",
    "Lone worker": "Lone worker",
    "Barcode scanning": "Barcode scanning",
    "Thermal imaging": "Thermal imaging",
    "NFC reading": "NFC reading",
    "3D scanning / measurement": "3D scanning",
    "Satellite SOS / messaging": "Satellite SOS",
}
SOURCE_ORDER = ["Certificate", "Declaration of Conformity", "Datasheet", "Safety manual", "Manual", "Operating manual",
                "Manufacturer page", "Manufacturer listing"]

# ---------------------------------------------------------------------------------------------------------------
# Workbook access
# ---------------------------------------------------------------------------------------------------------------

MISSING = []  # (id, column, value) for flagged cells that would be published without a public note


class Row:
    def __init__(self, cells, key):
        self.cells = cells
        self.id = cells[key].v

    def raw(self, col):
        c = self.cells.get(col)
        return c.v if c else None

    def flagged(self, col):
        c = self.cells.get(col)
        return (c.flag in ("check", "conflict") or (self.id, col) in PUBLISH_NOT_FOUND) if c else False

    def get(self, col):
        """Publishable value: None when empty, NOT FOUND, a placeholder or a formula."""
        if (self.id, col) in SKIP_CELLS:
            return None
        if (self.id, col) in VALUE_OVERRIDES:
            return VALUE_OVERRIDES[(self.id, col)]
        c = self.cells.get(col)
        if c is None or c.v is None or (c.flag == "notfound" and (self.id, col) not in PUBLISH_NOT_FOUND):
            return None
        if isinstance(c.v, str) and (PLACEHOLDER.match(c.v) or c.v.startswith("=")):
            return None
        return c.v


def note_for(rid, col):
    exact = NOTES.get((rid, col))
    if exact:
        return exact
    for (pattern, c), text in NOTES.items():
        if c == col and fnmatch(rid, pattern):
            return text
    return None


def use(row, col, key, notes):
    """Value of a cell, recording a public note when the cell is flagged."""
    v = row.get(col)
    if v is not None and row.flagged(col):
        text = note_for(row.id, col)
        if text is None:
            MISSING.append((row.id, col, v))
        elif key:
            notes[key] = text
    return v


def load(path):
    wb = openpyxl.load_workbook(path)

    def sheet(name, key):
        ws = wb[name]
        header = [c.value for c in ws[1]]
        rows = []
        for r in ws.iter_rows(min_row=2):
            if r[0].value is None:
                continue
            cells = {}
            for c in r:
                v = c.value
                if isinstance(v, datetime.datetime):
                    v = v.date().isoformat()
                elif isinstance(v, str):
                    v = v.strip()
                fill = (c.fill.fgColor.rgb or "")[-6:] if c.fill is not None and c.fill.fill_type else ""
                cells[header[c.column - 1]] = Cell(v, FLAG_FILLS.get(fill))
            rows.append(Row(cells, key))
        return {row.id: row for row in rows}

    return (
        sheet("Ex products", "Product ID"),
        sheet("Base devices", "Base device ID"),
        sheet("Through-case access", "Product ID"),
        sheet("Capabilities", "Product ID"),
        sheet("Sources", "ID"),
    )


# ---------------------------------------------------------------------------------------------------------------
# Value helpers
# ---------------------------------------------------------------------------------------------------------------

def minus(text):
    """Typographic minus for negative temperatures only ('-20 °C', '-20 to'), not for standard numbers"""
    return re.sub(r"(?<![\w./])-(?=\d+(?:\s*°C|\s+to\b))", "−", text)


def temp_range(text):
    """'-20 to +55' -> ('−20 °C to +55 °C', -20, 55)"""
    if text is None:
        return None, None, None
    text = str(text)
    m = re.match(r"^\s*([+-]?\d+)\s*(?:°C)?\s*to\s*([+-]?\d+)\s*(?:°C)?\s*(.*)$", text)
    if not m:
        return minus(text), None, None
    lo, hi, rest = int(m.group(1)), int(m.group(2)), m.group(3)
    fmt = lambda n: f"{'+' if n > 0 else ''}{n}".replace("-", "−")
    rest = re.sub(r"\(R\. STAHL\)", "", rest).strip()
    return f"{fmt(lo)} °C to {fmt(hi)} °C" + (f" {minus(rest)}" if rest else ""), lo, hi


def number(v):
    if isinstance(v, (int, float)):
        return int(v)
    if isinstance(v, str) and re.fullmatch(r"\d+", v):
        return int(v)
    return None


def split_scope(text):
    """'IECEx FIDI 26.0016X (S02 cemented variant only)' -> ('IECEx FIDI 26.0016X', 'S02 cemented variant only')"""
    m = re.match(r"^(.*?)\s*\((.*)\)\s*$", text)
    return (m.group(1).strip(), m.group(2).strip()) if m else (text.strip(), None)


def strip_atex_prefix(marking):
    return " / ".join(re.sub(r"^I{1,2}\s+(?:[123][GD]|M[12])\s+", "", part.strip()) for part in marking.split(" / "))


def clean_marking(m):
    return re.sub(r"\s*\((?:reseller|stated)\)\s*$", "", m).strip() if m else m


def clean(text):
    return re.sub(r"\s+-\s+", "; ", str(text)).strip() if text is not None else None


def tidy(text):
    """Through-case and capability values without the research shorthand ('FAQ: ...', '(datasheet ...)')"""
    t = clean(text)
    t = re.sub(r";\s*FAQ:[^);]*", "", t)
    t = re.sub(r"\s*\((?:datasheet[^()]*|stated|per [^()]*|flyer[^()]*)\)", "", t)
    return t.strip()


APPLE_SUPPORT_YEARS = 7
TODAY = datetime.date.today().isoformat()
# An end date before this is flagged as a limitation ("Security updates end in Q1 2027")
SOON = (datetime.date.today() + datetime.timedelta(days=2 * 365)).isoformat()


def month_year(iso):
    return datetime.date.fromisoformat(iso).strftime("%B %Y")


def quarter_label(base_id, iso):
    """ "Q4 2032" for a quarter's last day, as the maker words it; stops the import if the date isn't one"""
    d = datetime.date.fromisoformat(iso)
    q = (d.month - 1) // 3 + 1
    end = (datetime.date(d.year + (q == 4), 1 if q == 4 else 3 * q + 1, 1) - datetime.timedelta(days=1))
    if d != end:
        sys.exit(f"{base_id} | Security updates until | {iso} isn't the last day of a quarter (see SECURITY_QUARTERS)")
    return f"Q{q} {d.year}"


def security_end(o):
    """End of security updates in the maker's wording"""
    return o.get("securityUntilLabel") or month_year(o["securityUntil"])


def security_ended(o):
    return bool(o.get("securityUntil")) and not o.get("supportYears") and o["securityUntil"] < TODAY


def protection(marking):
    """(label, kind) from the protection concepts in a marking"""
    tokens = marking.split()
    if "Ex" not in tokens:
        return None, None
    concepts = []
    for t in tokens[tokens.index("Ex") + 1:]:
        if not re.fullmatch(r"i[abc]|d[abc]|e[bc]|t[abc]|m[abc]|op|is", t):
            break
        concepts.append(t)
    main = [c for c in concepts if c not in ("op", "is")]
    if not main:
        return None, None
    if main[0].startswith("d"):
        return f"Flameproof enclosure (Ex {main[0]})", "flameproof"
    if "ec" in main and any(c.startswith("i") for c in main):
        return f"Increased safety and intrinsic safety (Ex {' '.join(main)})", "combined"
    if main[0].startswith("i"):
        extra = " with inherently safe optical radiation (op is)" if "op" in concepts else ""
        return f"Intrinsic safety (Ex {main[0]}){extra}", "intrinsic"
    return None, None


def zones_from_epl(epl, kind):
    table = {"gas": {"Ga": ["0", "1", "2"], "Gb": ["1", "2"], "Gc": ["2"]},
             "dust": {"Da": ["20", "21", "22"], "Db": ["21", "22"], "Dc": ["22"]}}
    return table[kind].get(epl or "", [])


def zone_label(gas, dust):
    g = sorted(gas)
    g = [z for z in g if z != "2"] if len(g) > 1 else g
    return "Zone " + "/".join(g + sorted(dust)[:1])


def join_and(items):
    items = [i for i in items if i]
    return items[0] if len(items) == 1 else ", ".join(items[:-1]) + " and " + items[-1] if items else ""


def article(word):
    return "an" if re.match(r"[aeiouAEIOU]", word) else "a"


def source_ids(*texts):
    ids = []
    for t in texts:
        for sid in re.findall(r"\bS\d{2,3}\b", str(t or "")):
            if sid not in ids:
                ids.append(sid)
    return ids


# ---------------------------------------------------------------------------------------------------------------
# Building a phone
# ---------------------------------------------------------------------------------------------------------------

def build(p, base, through, caps, sources, folded, existing):
    pid = p.id
    slug, name = PRODUCTS[pid]
    brand = BRANDS[p.raw("Brand")]
    notes = {}
    approach = p.raw("Approach") or ""
    ptype = "dedicated" if approach.startswith("Purpose") else "ex-case" if "case" in approach else "conversion"
    form = (p.raw("Form factor") or "").lower()
    form_factor = "radio" if "radio" in form else "feature-phone" if ("feature" in form or "mobile phone" in form) else "smartphone"

    # ----- Status
    status_raw = p.raw("Status") or ""
    status, status_note, successor = "current", None, None
    if pid in STATUS:
        status, status_note, successor = STATUS[pid]
    elif p.flagged("Status") or not status_raw.startswith("Current"):
        MISSING.append((pid, "Status", status_raw))

    # ----- Certification
    cert = {"otherSchemes": [], "standards": []}
    gas = clean_marking(use(p, "ATEX/IECEx marking - gas", "certification.atex.marking", notes))
    dust = clean_marking(use(p, "ATEX/IECEx marking - dust", "certification.atex.marking", notes))
    marking = " / ".join(m for m in (gas, dust) if m)
    atex_raw = p.get("ATEX certificate")
    iecex_raw = p.get("IECEx certificate")
    iecex_number = iecex_scope = None
    if iecex_raw and str(iecex_raw).startswith("IECEx"):
        iecex_number, iecex_scope = split_scope(str(iecex_raw))
    has_atex_cert = bool(atex_raw and re.search(r"ATEX", str(atex_raw)))
    if marking and (marking.startswith("II") or has_atex_cert or not iecex_number):
        atex = {"marking": marking}
        if atex_raw and "unit assessment" in str(atex_raw).lower():
            atex["scope"] = "Unit assessment: each unit is checked by a notified body. No certificate number is published."
        elif atex_raw and re.search(r"ATEX", str(atex_raw)):
            atex["number"], scope = split_scope(str(atex_raw))
            if scope:
                atex["scope"] = scope
        cert["atex"] = atex
    if iecex_number and marking:
        iecex_marking = strip_atex_prefix(marking)
        if pid == "PF-SE02-DZ2":  # the IECEx certificate omits 'op is'
            iecex_marking = iecex_marking.replace(" op is", "")
        if pid == "BT-SP9EX1":  # IECEx UL 24.0004X issue 2 has no IP code; IP64 is in the ATEX marking only
            iecex_marking = iecex_marking.replace(" IP64", "")
        cert["iecex"] = {"marking": iecex_marking, "number": iecex_number}
        if iecex_scope:
            cert["iecex"]["scope"] = iecex_scope[0].upper() + iecex_scope[1:]
        # IECEx markings carry no ATEX category, so a note about a missing category doesn't apply to them
        if "certification.atex.marking" in notes and (pid, "ATEX/IECEx marking - gas") not in PUBLISH_NOT_FOUND:
            notes["certification.iecex.marking"] = notes["certification.atex.marking"]

    ukex = p.get("UKEX certificate")
    if ukex and re.match(r"^[A-Z]{2,5} \d", str(ukex)) and "UKEX" in str(ukex):
        cert["ukex"] = str(ukex)
    elif ukex and "Not required for category 3" in str(ukex):
        cert["otherSchemes"].append("UKCA (self-declared, category 3)")

    approvals = p.get("Other approvals")
    if approvals:
        items = [a.strip() for a in str(approvals).split(";") if a.strip()]
        if pid in DROP_APPROVALS:
            items = [a for a in items if DROP_APPROVALS[pid] not in a]
        elif p.flagged("Other approvals"):
            use(p, "Other approvals", "certification.otherSchemes", notes)
        cert["otherSchemes"] += items

    na = use(p, "North America (NEC/CEC)", "certification.northAmerica", notes)
    if na and str(na).startswith("Same as SP9EX1"):
        na = PRODUCTS_ROWS["BT-SP9EX1"].get("North America (NEC/CEC)")
    if na and not re.match(r"^(not\b|none\b|csa on request|on request)", str(na), re.I):
        cert["northAmerica"] = minus(str(na))
        if re.search(r"Div(?:ision)?\.?,? ?1\b|C1D1", str(na)):
            cert["division"] = "Class I Division 1"
        elif re.search(r"Div(?:ision)?\.?,? ?2\b|C1D2", str(na)):
            cert["division"] = "Class I Division 2"
        if "certification.northAmerica" in notes and "division" in cert:
            notes["certification.division"] = notes["certification.northAmerica"]

    cert["zonesGas"] = zones_from_epl(p.raw("EPL gas"), "gas")
    cert["zonesDust"] = zones_from_epl(p.raw("EPL dust"), "dust")
    if gas:
        label, kind = protection(gas)
        if label:
            cert["protection"] = label
    else:
        kind = None
    if p.get("Gas group"):
        cert["gasGroup"] = p.get("Gas group")
    if p.get("Dust group"):
        cert["dustGroup"] = p.get("Dust group")
    if p.get("Temp class") and not p.flagged("Temp class") and not (gas and p.flagged("ATEX/IECEx marking - gas") and pid.startswith("XC-")):
        cert["tempClass"] = p.get("Temp class")
    surface = p.get("Max surface temp dust")
    if surface:
        cert["maxSurfaceTemp"] = re.sub(r"^T(\d+)\s*°C$", r"\1 °C", str(surface))
    epl = [e for e in (p.get("EPL gas"), p.get("EPL dust")) if e]
    if epl:
        cert["epl"] = " / ".join(epl)
    ta_text, ta_lo, ta_hi = temp_range(use(p, "Ex ambient Ta", "certification.ambient", notes))
    if ta_text:
        cert["ambient"] = ta_text
    if not cert["zonesGas"]:
        raise SystemExit(f"{pid}: no gas zones; it can't be listed")

    # ----- Safe use
    safety = {}
    charging = p.get("Charging in Ex area")
    if charging and "verify" not in str(charging):
        if re.match(r"Yes\b", str(charging)):
            safety["chargingInZone"] = True
            safety["charging"] = CHARGING_TEXT.get(pid) or clean(charging)
        else:
            safety["chargingInZone"] = False
            safety["charging"] = "Outside the hazardous area only"
    swap = p.get("Battery swap in Ex area")
    if swap and re.match(r"No\b", str(swap)):
        safety["batterySwap"] = "Outside the hazardous area only"
    conditions = use(p, "Specific conditions / safety rules", "safety.conditions", notes)
    if conditions:
        safety["conditions"] = minus(str(conditions)).replace("(per flyer)", "(according to the maker's flyer)")

    # ----- Operating system and device specs (from the base device)
    platform = str(base.raw("Platform") or "")
    os_name = "iOS" if platform.startswith("iOS") else "Android" if "Android" in platform else "Other"
    current_os = use(base, "Current OS", "os.version", notes)
    launch_os = base.get("OS at launch")
    version = current_os or launch_os or ("Proprietary OS (no Google Play)" if "Proprietary" in platform else "Not published")
    if base.id == "B-IS-120":
        os_name = "Other"
    os_info = {"name": os_name, "version": str(version)}
    if launch_os and launch_os != version:
        os_info["atLaunch"] = str(launch_os)
    limit = base.get("OS upgrade limit")
    if limit:
        os_info["upgradeLimit"] = str(limit)
    until = use(base, "Security updates until", "os.securityUntil", notes)
    if until and re.match(r"\d{4}-\d{2}-\d{2}", str(until)):
        os_info["securityUntil"] = str(until)[:10]
        if base.id in SECURITY_QUARTERS:
            os_info["securityUntilLabel"] = quarter_label(base.id, os_info["securityUntil"])
        os_info["updates"] = f"Security updates {'ended in' if security_ended(os_info) else 'until'} {security_end(os_info)}"
    if base.id.startswith("B-AP-"):
        # The workbook holds Apple's legal minimum (first sale + 5 years). Earlier iPhones got
        # 7+ years, so publish that and move the date on 2 years for sorting and filters.
        if "securityUntil" in os_info:
            d = datetime.date.fromisoformat(os_info["securityUntil"])
            d = d.replace(day=28) if (d.month, d.day) == (2, 29) else d
            os_info["securityUntil"] = d.replace(year=d.year + 2).isoformat()
        os_info["supportYears"] = APPLE_SUPPORT_YEARS
        os_info["updates"] = f"Security updates for {APPLE_SUPPORT_YEARS}+ years (based on previous model support)"
    # Read raw: "N/A (Apple Business, formerly Apple Business Manager / ADE)" carries the iPhone answer
    aer = base.raw("Android Enterprise Recommended")
    enterprise = None
    if aer and not str(aer).startswith("No"):
        a = str(aer)
        enterprise = ("Apple Business (formerly Apple Business Manager)" if "Apple Business" in a
                      else "Samsung Knox" if a.startswith("Samsung Knox")
                      else "Android Enterprise Recommended (zero-touch)" if "zero-touch" in a
                      else "Android Enterprise Recommended" if a.startswith("Yes") else a)
        os_info["enterprise"] = enterprise

    specs = {}
    size, dtype = base.get("Display (in)"), base.get("Display type / glass")
    if size:
        specs["display"] = f"{size}-inch" + (f" {dtype}" if dtype else "")
    for key, col, fmt in [
        ("resolution", "Resolution", lambda v: str(v).replace(" x ", " × ")),
        ("refreshRate", "Refresh rate", str),
        ("brightness", "Peak brightness", str),
        ("chip", "Chipset", str),
        ("ram", "RAM (GB)", lambda v: f"{v} GB"),
        ("camera", "Rear camera", str),
        ("frontCamera", "Front camera", str),
        ("video", "Video", str),
        ("battery", "Battery (mAh)", lambda v: v if isinstance(v, str) else f"{v} mAh"),
        ("batteryLife", "Video playback (h, maker figure)", lambda v: f"Up to {v} hours of video playback"),
        ("port", "Port", str),
        ("wirelessCharging", "Wireless charging", str),
        ("network", "Network", str),
        ("bands", "Special bands", str),
        ("wifi", "Wi-Fi", str),
        ("bluetooth", "Bluetooth", lambda v: f"Bluetooth {v}" if re.match(r"^[\d.]+", str(v)) else str(v)),
        ("nfc", "NFC", str),
        ("gnss", "GNSS", str),
        ("sim", "SIM", str),
        ("keys", "Dedicated keys", str),
        ("accessories", "Accessory interface", str),
        ("biometrics", "Biometrics", str),
        ("depthSensing", "Depth sensing", str),
        ("satellite", "Satellite features", str),
        ("uwb", "UWB", str),
        ("touch", "Glove / wet touch", str),
        ("apps", "Preinstalled Ex-relevant apps", str),
    ]:
        v = use(base, col, f"specs.{key}", notes)
        if v is not None and not (key == "depthSensing" and str(v).startswith("None")):
            specs[key] = fmt(v)
    storage = base.get("Storage (GB)")
    if storage:
        s = re.sub(r"\b(\d+)\b(?!\s*(?:GB|TB))", r"\1 GB", str(storage))
        expand = base.get("Expandable")
        specs["storage"] = s + (f", {expand}" if expand and str(expand).startswith("microSD") else "")
    removable = base.get("Removable battery")
    if removable:
        specs["replaceableBattery"] = str(removable).startswith("Yes")
    touch = specs.get("touch", "")
    if touch:
        specs["gloveTouch"] = bool(re.search(r"glove|touch sensitivity", touch, re.I))
    keys = specs.get("keys", "")
    if keys:
        has_ptt = bool(re.search(r"\bPTT\b", keys)) and "PTT-ready" not in keys
        specs["pttKey"] = has_ptt
    if enterprise:
        specs["mdm"] = [enterprise]
    specs["connectivity"] = [x for x in (
        "5G" if "5G" in specs.get("network", "") else "4G" if "4G" in specs.get("network", "") else None,
        (re.match(r"Wi-Fi \w+", specs.get("wifi", "")) or [None])[0],
        "NFC" if specs.get("nfc", "").startswith("Yes") else None,
        "eSIM" if "eSIM" in specs.get("sim", "") else None,
    ) if x]

    # Product-level physical facts
    weight = number(use(p, "In-use weight (g)", "specs.weightG", notes))
    if weight:
        specs["weightG"] = weight
        if ptype != "dedicated":
            specs["weightNote"] = "Including the phone"
    dims = use(p, "Dimensions (mm)", "specs.dimensionsMm", notes)
    if dims:
        specs["dimensionsMm"] = str(dims).replace(" x ", " × ")
    ip = use(p, "IP rating", "specs.ipRating", notes)
    if ip:
        specs["ipRating"] = re.sub(r"\s*\(XC\w+ range\)", "", str(ip))
    exip = use(p, "Ex IP (cert)", "specs.exIp", notes)
    if exip:
        specs["exIp"] = str(exip)
    drop = p.get("Drop / MIL-STD")
    if drop:
        specs["ruggedness"] = re.sub(r"\s*\(stated\)", "", str(drop))
    op_text, _, _ = temp_range(use(p, "Operating temp (°C)", "specs.operatingTemp", notes))
    if op_text:
        specs["operatingTemp"] = op_text
    camera_free = p.get("Camera-free variant")
    if camera_free and not p.flagged("Camera-free variant"):
        if str(camera_free).startswith("Yes"):
            specs["cameraFree"] = True
        elif re.match(r"No\b", str(camera_free)) and "found" not in str(camera_free):
            specs["cameraFree"] = False
    parts = p.get("Part number / SKU")
    if parts and pid not in EXTRA_VARIANTS:
        specs["partNumbers"] = str(parts)

    # ----- What works through the case, and field capabilities
    through_rows = []
    t = through.get(pid)
    if t and ptype != "dedicated":
        for col, label in THROUGH_LABELS.items():
            v = t.get(col)
            if v is None or str(v).startswith("N/A"):
                continue
            through_rows.append({"label": label, "value": tidy(v)})
            if t.flagged(col) and not HEDGED.search(str(v)):
                notes[f"throughCase.{label}"] = THROUGH_NOTE
    cap_rows = []
    c = caps.get(pid)
    if c:
        for col, label in CAPABILITY_LABELS.items():
            v = c.get(col)
            if v is None:
                continue
            cap_rows.append({"label": label, "value": tidy(v)})
            if c.flagged(col) and not HEDGED.search(str(v)):
                notes[f"capabilities.{label}"] = note_for(pid, col) or CAPABILITY_NOTE
    cap = lambda label: next((r["value"] for r in cap_rows if r["label"] == label), "")
    thru = lambda label: next((r["value"] for r in through_rows if r["label"] == label), "")
    hedged = lambda text: bool(HEDGED.search(text))

    # ----- Variants
    variants = []
    for child_id, (parent, vname, text) in FOLD.items():
        if parent != pid or child_id not in folded:
            continue
        child = folded[child_id]
        variant = {"name": vname, "description": text}
        mining = child.get("Marking - mining")
        if mining and child_id in MINING_FOLDS:
            variant["marking"] = str(mining)
        numbers = [split_scope(str(n))[0] for n in (child.get("ATEX certificate"), child.get("IECEx certificate"))
                   if n and re.search(r"ATEX|IECEx", str(n))]
        if numbers:
            variant["certificates"] = "; ".join(numbers)
        variants.append(variant)
    variants += EXTRA_VARIANTS.get(pid, [])

    # ----- Features that the site can't derive from the specs alone
    notes_text = " ".join(str(x or "") for x in (p.raw("Notes"), t.raw("Notes") if t else ""))
    features = []
    if cap("NFC reading").startswith("Built in") and not hedged(cap("NFC reading")):
        features.append("nfc")
    if cap("Satellite SOS").startswith("Built in") and not hedged(cap("Satellite SOS")):
        features.append("satellite")
    mp = max([int(x) for x in re.findall(r"(\d+)\s*MP", specs.get("camera", ""))] or [0])
    if mp >= 48 and (ptype == "dedicated" or thru("Rear cameras").startswith("Yes") or "fully functional" in thru("Rear cameras")):
        features.append("camera-48mp")
    if specs.get("cameraFree"):
        features.append("camera-free")
    if "LiDAR" in specs.get("depthSensing", "") and (ptype == "dedicated" or thru("LiDAR").startswith("Yes")):
        features.append("lidar")
    if re.match(r"Built in|Via accessory", cap("Thermal imaging")):
        features.append("thermal")
    if "scan engine" in cap("Barcode scanning") or cap("Barcode scanning").startswith("Via accessory"):
        features.append("barcode")
    key_usable = ptype == "dedicated" or thru("Action Button / programmable key").startswith("Yes") or "buttons usable" in thru("Action Button / programmable key")
    if key_usable and re.search(r"SOS|alarm|emergency|red (?:function|key)", keys, re.I):
        features.append("sos-key")
    if key_usable and re.search(r"programmable|multifunction|Action Button", keys, re.I):
        features.append("programmable-key")
    if ptype != "dedicated" and specs.get("pttKey") and not key_usable:
        specs.pop("pttKey")  # the key may not be reachable through the housing
    if ptype != "dedicated" and key_usable and cap("Push-to-talk").startswith("Built in"):
        specs["pttKey"] = True  # the maker states a reachable key works as the PTT key (Xshielder's Action Button)
    if re.search(r'1/4"', notes_text):
        features.append("tripod-mount")
    if re.search(r"lanyard|tether", notes_text, re.I):
        features.append("lanyard")
    wireless = specs.get("wirelessCharging", "")
    if wireless and not wireless.startswith("No") and (ptype == "dedicated" or thru("Wireless charging").startswith("Yes")):
        features.append("wireless-charging")
    if safety.get("chargingInZone"):
        features.append("charge-in-zone")
    if os_info.get("securityUntil", "") >= "2030":
        features.append("updates-2030")
    if any(f in folded and FOLD[f][0] == pid for f in MINING_FOLDS):
        features.append("mining-version")

    # ----- Sources
    ids = source_ids(p.raw("Sources"), base.raw("Sources"), t.raw("Sources") if t else "")
    srcs = []
    for sid in ids:
        s = sources.get(sid)
        url = s and s.raw("URL")
        if not url or not str(url).startswith("http"):
            continue
        srcs.append((SOURCE_ORDER.index(s.raw("Type")) if s.raw("Type") in SOURCE_ORDER else len(SOURCE_ORDER),
                     {"label": f"{s.raw('Publisher')}: {s.raw('Document')}", "url": str(url)}))
    srcs = [s for _, s in sorted(srcs, key=lambda x: x[0])]
    if not srcs:
        srcs = [{"label": f"{brand['manufacturer']['name']} website", "url": brand["manufacturer"]["website"]}]

    phone = {
        "productId": pid,
        "name": name,
        "brand": brand["brand"],
        "brandSlug": brand["brandSlug"],
        "manufacturer": brand["manufacturer"],
        "type": ptype,
        "formFactor": form_factor,
    }
    if ptype != "dedicated":
        phone["hostDevice"] = str(base.raw("Name"))
    phone["status"] = status
    if status_note:
        phone["statusNote"] = status_note
    if successor:
        phone["successor"] = PRODUCTS[successor][0]
    launch = p.get("Launch (approx.)")
    if number(launch) and not p.flagged("Launch (approx.)"):
        phone["launchYear"] = number(launch)
    phone.update({
        "summary": "",
        **({k: existing[k] for k in ("image", "imageAlt") if k in existing}),
        "certification": cert,
        "safety": safety,
        "os": os_info,
        "specs": specs,
        "throughCase": through_rows,
        "capabilities": cap_rows,
        "variants": variants,
        "unconfirmed": notes,
        "features": features,
        "strengths": [],
        "limitations": [],
        "bestFor": [],
        "alternatives": [],
        "sponsor": brand.get("sponsor", False),
        "lastVerified": str(p.raw("Date verified") or datetime.date.today().isoformat())[:10],
        "sources": srcs,
    })
    # Kept for the rules below; removed before writing
    marking_unverified = "certification.atex.marking" in notes and not (
        cert.get("atex", {}).get("number") or cert.get("iecex", {}).get("number"))
    phone["_ctx"] = {"kind": kind, "ta": (ta_lo, ta_hi), "form": FORM_LABEL.get(pid), "marking_unverified": marking_unverified}
    return phone


# ---------------------------------------------------------------------------------------------------------------
# Copy: the same rules for every brand
# ---------------------------------------------------------------------------------------------------------------

def schemes(ph):
    c = ph["certification"]
    return join_and([c.get("atex") and "ATEX", c.get("iecex") and "IECEx", c.get("ukex") and "UKEX"])


def protection_adjective(ph):
    kind = ph["_ctx"]["kind"]
    concept = re.search(r"\(Ex ([^)]+)\)", ph["certification"].get("protection", ""))
    concept = concept.group(1) if concept else ""
    return {"intrinsic": f"intrinsically safe (Ex {concept})", "flameproof": f"flameproof (Ex {concept})",
            "combined": f"Ex {concept}"}.get(kind, "Ex-certified")


def summary(ph, names):
    c, s, o = ph["certification"], ph["specs"], ph["os"]
    zones = zone_label(c["zonesGas"], c["zonesDust"])
    verb = "rated for" if ph["_ctx"]["marking_unverified"] else "certified for"
    scheme_text = schemes(ph)
    under = f" under {scheme_text}" if scheme_text else ""
    if c.get("division") and "certification.division" not in ph["unconfirmed"]:
        under += f", and for {c['division']} in North America"
    adj = protection_adjective(ph)
    host = ph.get("hostDevice", "")
    os_v = o["version"]

    if ph["type"] == "dedicated":
        form = ph["_ctx"]["form"] or {"smartphone": "smartphone", "feature-phone": "feature phone",
                                      "radio": "radio-style handheld"}[ph["formFactor"]]
        text = f"The {ph['name']} is {article(adj)} {adj} {form} from {ph['brand']}, {verb} {zones}{under}."
        extras = ["5G" if "5G" in s.get("connectivity", []) else None,
                  "a user-replaceable battery" if s.get("replaceableBattery") else None]
        extras = [e for e in extras if e]
        os_part = f"It runs {os_v}" if ph["os"]["name"] != "Other" or os_v.startswith("ISM") else f"It uses a {os_v[0].lower()}{os_v[1:]}"
        text += f" {os_part}" + (f", with {join_and(extras)}" if extras else "") + "."
    elif ph["type"] == "ex-case":
        text = (f"The {ph['name']} is {article(adj)} {adj} case for the {host}, {verb} {zones}{under}. "
                f"The phone inside is a standard {host} running {os_v}, so it works with the same apps and device "
                f"management as other {'iPhones' if 'iPhone' in host else 'phones of its kind'}.")
    else:
        how = {"flameproof": "It uses a flameproof (Ex db) housing.",
               "combined": "It combines increased safety and intrinsic safety (Ex ec ic)."}.get(ph["_ctx"]["kind"], "")
        text = (f"The {ph['name']} is a standard {host} converted by {ph['brand']} for hazardous areas, {verb} "
                f"{zones}{under}. {how} The phone runs {os_v}.").replace("  ", " ")
    if ph["status"] == "discontinued":
        succ = ph.get("successor")
        text += f" It has been discontinued; the {names[succ]} replaces it." if succ else f" {ph.get('statusNote', 'It has been discontinued.')}"
    return text


def strengths(ph, lighter):
    c, s, o, u = ph["certification"], ph["specs"], ph["os"], ph["unconfirmed"]
    out = []
    if "0" in c["zonesGas"]:
        out.append("Certified for Zone 0, the highest-risk gas zone")
    if ph["safety"].get("chargingInZone"):
        out.append("May be charged inside gas Zone 2 through its charging contacts")
    if c.get("atex") and c.get("iecex"):
        both_numbers = c["atex"].get("number") and c["iecex"].get("number")
        out.append(f"{schemes(ph)} certified" + (", with published certificate numbers" if both_numbers else ""))
    if c.get("division") and "certification.division" not in u:
        out.append(f"Also certified for {c['division']} in North America")
    if c.get("tempClass") == "T6":
        out.append("T6 temperature class, the strictest rating")
    if "mining-version" in ph["features"]:
        out.append("A mining version (Group I) is also available")
    if "450" in s.get("bands", ""):
        out.append("Supports 450 MHz LTE, used by private utility networks")
    if s.get("pttKey") and "sos-key" in ph["features"]:
        out.append("Push-to-talk and SOS keys")
    elif s.get("pttKey"):
        out.append("Push-to-talk key")
    if "barcode" in ph["features"]:
        out.append("Built-in barcode scan engine" if "scan engine" in json.dumps(ph["capabilities"]) and "Via accessory" not in json.dumps(ph["capabilities"]) else "Barcode scan module available as an accessory")
    if "5G" in s.get("connectivity", []):
        out.append("5G connectivity")
    if o.get("securityUntil", "") >= "2030" and ph["status"] == "current":
        when = security_end(o)
        out.append(o["updates"] if o.get("supportYears")
                   else f"Security updates expected until at least {when}" if "os.securityUntil" in u and not o.get("securityUntilLabel")
                   else f"Security updates until {when}")
    if ph["type"] == "dedicated" and s.get("replaceableBattery"):
        out.append("User-replaceable battery")
    if specs_has(s, "cameraFree"):
        out.append("Camera-free version available for sites that restrict cameras")
    if "lidar" in ph["features"]:
        out.append("LiDAR scanner usable through the case")
    if "thermal" in ph["features"]:
        out.append("Thermal camera available as an accessory")
    if ph["type"] != "dedicated" and ph["os"]["name"] == "iOS":
        out.append(f"A standard {ph['hostDevice']} inside, with the same apps and Apple device management as other iPhones")
    elif ph["type"] != "dedicated" and ph["os"].get("enterprise") == "Samsung Knox":
        out.append(f"A standard {ph['hostDevice']} inside, with Samsung Knox device management")
    if lighter:
        out.append(lighter)
    hi = ph["_ctx"]["ta"][1]
    if hi is not None and hi >= 60:
        out.append("Certified for ambient temperatures up to +60 °C")
    if not out:
        out.append(f"Certified for {zone_label(c['zonesGas'], c['zonesDust'])}")
    return out[:5]


def specs_has(s, key):
    return s.get(key) is True


def limitations(ph, names):
    c, s, o, u = ph["certification"], ph["specs"], ph["os"], ph["unconfirmed"]
    out = []
    if ph["status"] == "discontinued":
        succ = ph.get("successor")
        out.append(f"Discontinued; the {names[succ]} replaces it" if succ else "No longer in the maker's current range")
    elif ph.get("statusNote"):
        out.append("May be near the end of its life: check availability before ordering")
    if c["zonesGas"] == ["2"]:
        out.append("Zone 2 only, so not for Zone 1 areas")
    if c.get("gasGroup") == "IIB":
        out.append("Gas group IIB: not rated for hydrogen or acetylene")
    if ph["_ctx"]["marking_unverified"]:
        out.append("Ex marking not yet confirmed against a published certificate")
    tc = c.get("tempClass")
    if tc in ("T4", "T5"):
        limit = {"T4": 135, "T5": 100}[tc]
        out.append(f"{tc} temperature class: fine for most gases, but not those that ignite below {limit} °C")
    elif not tc:
        out.append("Temperature class not confirmed by a certificate we've seen")
    if not c["zonesDust"]:
        out.append("No dust zone rating")
    elif c.get("dustGroup") == "IIIB":
        out.append("Dust group IIIB: not rated for conductive dust")
    if c.get("atex", {}).get("scope", "").startswith("Unit assessment"):
        out.append("Certified by ATEX unit assessment; no certificate number is published")
    if c.get("atex") and not c.get("iecex"):
        out.append("ATEX only: no IECEx certificate")
    if c.get("iecex", {}).get("scope", "").startswith("S02"):
        out.append("IECEx covers the S02 (cemented lid) version only")
    if "authorised personnel" in ph["safety"].get("conditions", ""):
        out.append("Only authorised personnel may open the case")
    lo, hi = ph["_ctx"]["ta"]
    if hi is not None and hi < 50:
        out.append(f"Ambient rating tops out at +{hi} °C")
    if lo is not None and lo > -20:
        out.append(f"Not certified below {str(lo).replace('-', '−')} °C ambient")
    if ph["formFactor"] == "smartphone" and s.get("weightG", 0) >= 450:
        out.append(f"Heavy, at {s['weightG']} g in use")
    if ph["formFactor"] == "smartphone" and ph["type"] == "dedicated" and "4G" in s.get("connectivity", []):
        out.append("4G only, no 5G")
    m = re.match(r"Android (\d+)", o.get("upgradeLimit") or "")
    if m and int(m.group(1)) <= 11:
        out.append(f"OS upgrades ended at Android {m.group(1)}")
    if ph["type"] == "dedicated" and s.get("replaceableBattery") is False:
        out.append("Battery isn't user-replaceable")
    if s.get("pttKey") is False and ph["formFactor"] == "smartphone":
        out.append("No hardware push-to-talk key")
    if ph["type"] != "dedicated":
        unsure = [name for label, name in (("NFC reading", "NFC"), ("Satellite SOS", "satellite SOS"))
                  if any(r["label"] == label and HEDGED.search(r["value"]) for r in ph["capabilities"])]
        if unsure:
            what = join_and(unsure)
            out.append(f"{what[0].upper()}{what[1:]} not confirmed to work through the enclosure")
    if security_ended(o):
        out.append(f"Security updates ended in {security_end(o)}")
    elif ph["status"] == "current" and o.get("securityUntil") and not o.get("supportYears") and o["securityUntil"] < SOON:
        out.append(f"Security updates end in {security_end(o)}")
    elif ph["type"] == "dedicated" and ph["status"] == "current" and ph["os"]["name"] == "Android" and not o.get("securityUntil"):
        out.append("No published end date for security updates")
    if not s.get("weightG"):
        out.append("In-use weight not published")
    if "0" not in c["zonesGas"] and "1" in c["zonesGas"]:
        out.append("Not certified for Zone 0")
    return out[:5]


def top_zone(ph):
    return sorted(ph["certification"]["zonesGas"])[0]


def lighter_note(ph, phones):
    """'Among the lightest Zone 1 smartphones we list' when in the lightest third of its group"""
    w = ph["specs"].get("weightG")
    if not w:
        return None
    group = [q["specs"]["weightG"] for q in phones if q["status"] == "current" and q["specs"].get("weightG")
             and q["formFactor"] == ph["formFactor"] and top_zone(q) == top_zone(ph)]
    if len(group) < 4:
        return None
    group.sort()
    if w <= group[max(0, len(group) // 3 - 1)]:
        form = {"smartphone": "smartphones", "feature-phone": "feature phones", "radio": "radio-style handhelds"}[ph["formFactor"]]
        return f"Among the lightest Zone {top_zone(ph)} {form} we list, at {w} g in use"
    return None


def alternatives(ph, phones):
    family = lambda q: re.sub(r"\s+(DZ\d|EX\d|\.\d|Zone \d).*$", "", q["name"])
    cands = []
    for q in phones:
        if q is ph or q["status"] != "current" or q["brandSlug"] == ph["brandSlug"] and family(q) == family(ph):
            continue
        score = 0
        score += 10 if top_zone(ph) in q["certification"]["zonesGas"] else 0
        score += 2 if top_zone(q) == top_zone(ph) else 0
        score += 6 if q["formFactor"] == ph["formFactor"] else 0
        score += 3 if q["os"]["name"] == ph["os"]["name"] else 0
        score += 2 if q["type"] == ph["type"] else 0
        score += 2 if q["brandSlug"] != ph["brandSlug"] else -8
        w1, w2 = ph["specs"].get("weightG"), q["specs"].get("weightG")
        score -= abs(w1 - w2) / 200 if w1 and w2 else 0.5
        cands.append((score, q["name"], q))
    cands.sort(key=lambda x: (-x[0], x[1]))
    picked, brands = [], set()
    if ph.get("successor"):
        picked.append(ph["successor"])
        brands.add(ph["brandSlug"])
    for _, _, q in cands:
        if len(picked) >= 3:
            break
        if q["brandSlug"] in brands or q["slug"] in picked:
            continue
        picked.append(q["slug"])
        brands.add(q["brandSlug"])
    return picked


def best_for(ph):
    if ph["status"] != "current":
        return []
    c, s = ph["certification"], ph["specs"]
    out = []
    if "0" in c["zonesGas"]:
        out.append("zone-0-phones")
    if top_zone(ph) == "1":
        out.append("zone-1-phones")
    if c["zonesGas"] == ["2"]:
        out.append("zone-2-phones")
    if c.get("division") == "Class I Division 1" and "certification.division" not in ph["unconfirmed"]:
        out.append("division-1-phones")
    if ph["os"]["name"] == "iOS":
        out.append("iphone")
    if s.get("pttKey"):
        out.append("push-to-talk")
    if "5G" in s.get("connectivity", []):
        out.append("5g")
    return out


# ---------------------------------------------------------------------------------------------------------------

PRODUCTS_ROWS = {}


def main():
    if len(sys.argv) != 2:
        sys.exit("Usage: npm run phones:import -- /path/to/IS_phones_master_data.xlsx")
    products, bases, through, caps, sources = load(sys.argv[1])
    PRODUCTS_ROWS.update(products)

    folded, skipped = {}, []
    for pid, p in products.items():
        status = str(p.raw("Status") or "")
        if pid in FOLD:
            folded[pid] = p
        elif status.startswith("Announced"):
            skipped.append(pid)
        elif pid not in PRODUCTS:
            sys.exit(f"{pid} isn't mapped: add it to PRODUCTS (slug and name), FOLD, or mark it Announced")

    phones = []
    for pid, (slug, _) in PRODUCTS.items():
        if pid not in products:
            sys.exit(f"{pid} is in PRODUCTS but not in the workbook")
        path = OUT / f"{slug}.json"
        existing = json.loads(path.read_text()) if path.exists() else {}
        p = products[pid]
        ph = build(p, bases[p.raw("Base device ID")], through, caps, sources, folded, existing)
        ph["slug"] = slug
        phones.append(ph)

    if MISSING:
        lines = "\n".join(f"  {pid} | {col} | {str(v)[:70]}" for pid, col, v in MISSING)
        sys.exit(f"Flagged values without a public note (add them to NOTES or STATUS in this script):\n{lines}")

    names = {ph["slug"]: ph["name"] for ph in phones}
    for ph in phones:
        ph["summary"] = summary(ph, names)
        ph["strengths"] = strengths(ph, lighter_note(ph, phones))
        ph["limitations"] = limitations(ph, names)
        ph["alternatives"] = alternatives(ph, phones)
        ph["bestFor"] = best_for(ph)

    OUT.mkdir(parents=True, exist_ok=True)
    written = set()
    for ph in phones:
        slug = ph.pop("slug")
        ph.pop("_ctx")
        (OUT / f"{slug}.json").write_text(json.dumps(ph, ensure_ascii=False, indent=2) + "\n")
        written.add(f"{slug}.json")
    removed = [f.name for f in OUT.glob("*.json") if f.name not in written]
    for name in removed:
        (OUT / name).unlink()

    unconfirmed = sum(len(ph["unconfirmed"]) for ph in phones)
    print(f"Wrote {len(phones)} phones to {OUT.relative_to(ROOT)} ({unconfirmed} values with a public note)")
    print(f"Listed as variants: {', '.join(sorted(folded))}")
    print(f"Left out until certified: {', '.join(skipped) or 'none'}")
    if removed:
        print(f"Removed: {', '.join(removed)}")


if __name__ == "__main__":
    main()
