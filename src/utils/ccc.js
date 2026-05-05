// Outbound deep-linking for the modern Catechism of the Catholic Church
// (CCC, 1992). The CCC text is NOT embedded in CCCR — copyright belongs to
// USCCB / Libreria Editrice Vaticana / Deutsche Bischofskonferenz. Instead,
// when the model cites a CCC paragraph (doc_id "ccc-modern"), we resolve it
// to the closest page on vatican.va's IntraText archive and render it as an
// outbound link.
//
// Strategy:
//   The IntraText archive (https://www.vatican.va/archive/ENG0015/__P{XX}.HTM
//   for English, /archive/DEU0035/ for German) groups consecutive CCC
//   paragraphs onto sequential pages with no per-paragraph anchors. Pages
//   are not numerically uniform — some pages cover 1 paragraph, others 70+.
//   The German page IDs do not parallel the English ones, so each language
//   needs its own table.
//
//   We maintain a sparse, sorted map of {minParagraph: pageId}. Resolver
//   finds the largest minParagraph that is ≤ the requested paragraph, then
//   emits the corresponding page URL. This always lands the user on a page
//   that starts at or just before their target paragraph, which they can
//   then locate by scrolling (every paragraph is numbered inline).
//
// Out-of-range paragraphs (< 1 or > 2865) fall back to the language index.

const CCC_MIN = 1;
const CCC_MAX = 2865;

const ARCHIVE_BASE = {
  en: "https://www.vatican.va/archive/ENG0015",
  de: "https://www.vatican.va/archive/DEU0035",
};

const INDEX_URL = {
  en: "https://www.vatican.va/archive/ENG0015/_INDEX.HTM",
  de: "https://www.vatican.va/archive/DEU0035/_INDEX.HTM",
};

// Sorted ascending. Each entry: [firstParagraphOnPage, pageId].
// Derived empirically by probing vatican.va — see commit message for sample
// pages used. Coverage is sparse but monotonic: a paragraph N resolves to
// the page whose firstParagraph is the greatest value ≤ N.
const EN_PAGE_TABLE = [
  [1,    "7"],
  [26,   "8"],
  [31,   "A"],
  [51,   "F"],
  [75,   "K"],
  [105,  "P"],
  [142,  "U"],
  [168,  "Z"],
  [170,  "10"],
  [198,  "15"],
  [325,  "1A"],
  [436,  "1F"],
  [484,  "1K"],
  [624,  "1P"],
  [665,  "1U"],
  [687,  "1Z"],
  [689,  "20"],
  [742,  "25"],
  [871,  "2A"],
  [981,  "2F"],
  [1020, "2K"],
  [1038, "2P"],
  [1076, "2U"],
  [1113, "2Z"],
  [1114, "30"],
  [1131, "35"],
  [1179, "3A"],
  [1212, "3F"],
  [1246, "3K"],
  [1285, "3P"],
  [1312, "3U"],
  [1333, "3Z"],
  [1345, "40"],
  [1420, "45"],
  [1430, "4A"],
  [1468, "4F"],
  [1500, "4K"],
  [1526, "4P"],
  [1554, "4U"],
  [1590, "4Z"],
  [1601, "50"],
  [1643, "55"],
  [1680, "5A"],
  [1700, "5F"],
  [1720, "5K"],
  [1743, "5P"],
  [1762, "5U"],
  [1777, "5Z"],
  [1783, "60"],
  [1804, "65"],
  [1849, "6A"],
  [1877, "6F"],
  [1905, "6K"],
  [1934, "6P"],
  [1954, "6U"],
  [1996, "6Z"],
  [2006, "70"],
  [2041, "75"],
  [2083, "7A"],
  [2110, "7E"],
  [2156, "7K"],
  [2284, "80"],
  [2337, "85"],
  [2402, "8A"],
  [2443, "8F"],
];

const DE_PAGE_TABLE = [
  [1,    "8"],
  [11,   "A"],
  [27,   "F"],
  [50,   "K"],
  [74,   "P"],
  [101,  "U"],
  [134,  "Z"],
  [142,  "10"],
  [168,  "15"],
  [268,  "1F"],
  [422,  "1K"],
  [452,  "1P"],
  [574,  "1U"],
  [638,  "1Z"],
  [659,  "20"],
  [687,  "25"],
  [731,  "2A"],
  [871,  "2F"],
  [981,  "2K"],
  [1015, "2P"],
  [1033, "2U"],
  [1066, "2Z"],
  [1076, "30"],
  [1113, "35"],
  [1130, "3A"],
  [1163, "3F"],
  [1200, "3I"],
  [1210, "3K"],
  [1229, "3P"],
  [1275, "3U"],
  [1306, "3Z"],
  [1312, "40"],
  [1333, "45"],
  [1406, "4A"],
  [1427, "4F"],
  [1461, "4K"],
  [1499, "4P"],
  [1524, "4U"],
  [1539, "4Z"],
  [1554, "50"],
  [1590, "55"],
  [1638, "5A"],
  [1677, "5F"],
  [1699, "5K"],
  [1718, "5P"],
  [1739, "5U"],
  [1749, "5W"],
  [1757, "5Z"],
  [1762, "60"],
  [1777, "65"],
  [1803, "6A"],
  [1846, "6F"],
  [1870, "6K"],
  [1897, "6P"],
  [1929, "6U"],
  [1950, "6Z"],
  [1954, "70"],
  [1996, "75"],
  [2032, "7A"],
  [2095, "7K"],
  [2207, "80"],
  [2258, "85"],
  [2331, "8A"],
  [2401, "8F"],
];

// Find the page entry whose firstParagraph is the greatest value ≤ p.
function findPage(table, p) {
  let lo = 0, hi = table.length - 1, best = -1;
  while (lo <= hi) {
    const mid = (lo + hi) >> 1;
    if (table[mid][0] <= p) { best = mid; lo = mid + 1; } else { hi = mid - 1; }
  }
  return best >= 0 ? table[best] : null;
}

// Resolve a CCC paragraph number to a vatican.va URL. Out-of-range → index.
export function getCCCUrl(paragraph, lang = "en") {
  const lng = lang === "de" ? "de" : "en";
  const n = Number(paragraph);
  if (!Number.isFinite(n) || n < CCC_MIN || n > CCC_MAX) {
    return INDEX_URL[lng];
  }
  const table = lng === "de" ? DE_PAGE_TABLE : EN_PAGE_TABLE;
  const entry = findPage(table, Math.floor(n));
  if (!entry) return INDEX_URL[lng];
  return `${ARCHIVE_BASE[lng]}/__P${entry[1]}.HTM`;
}

// Convenience predicate used by the link renderer to detect CCC citations.
export function isCCCModernDocId(docId) {
  return docId === "ccc-modern";
}

export const CCC_INDEX_URL = INDEX_URL;
