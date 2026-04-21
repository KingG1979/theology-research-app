// Deep-linking utilities for Browse mode anchors.
//
// Scheme:
//   doc-{docId}                      — document top
//   {docId}-ch{chapter}              — chapter
//   {docId}-ch{chapter}-s{section}   — section / question / article / canon
//
// docId is stable across EN and DE locales so a citation emitted by the
// Research model (which the prompt is instructed to return in English doc_id
// form) works regardless of UI language.

// Canonical doc_ids used everywhere.
export const DOC_IDS = {
  westminster: "westminster",
  heidelberg: "heidelberg",
  augsburg: "augsburg",
  baptist1689: "baptist1689",
  thirtynineArticles: "thirtynine-articles",
  romanCatechism: "roman-catechism",
  orthodoxLonger: "orthodox-longer",
  apostlesCreed: "apostles-creed",
  niceneCreed: "nicene-creed",
  athanasianCreed: "athanasian-creed",
  chalcedon: "chalcedon",
  constantinople1: "constantinople-1",
  constantinople2: "constantinople-2",
  constantinople3: "constantinople-3",
};

// English confession-name → doc_id.
const EN_NAME_TO_DOC_ID = {
  "Westminster Confession of Faith": DOC_IDS.westminster,
  "Heidelberg Catechism": DOC_IDS.heidelberg,
  "Augsburg Confession": DOC_IDS.augsburg,
  "1689 Baptist Confession": DOC_IDS.baptist1689,
  "39 Articles": DOC_IDS.thirtynineArticles,
  "Roman Catechism": DOC_IDS.romanCatechism,
  "Longer Catechism (Orthodox)": DOC_IDS.orthodoxLonger,
  "Apostles' Creed": DOC_IDS.apostlesCreed,
  "Nicene Creed": DOC_IDS.niceneCreed,
  "Athanasian Creed": DOC_IDS.athanasianCreed,
  "Definition of Chalcedon": DOC_IDS.chalcedon,
  "First Council of Constantinople — Canons": DOC_IDS.constantinople1,
  "Second Council of Constantinople — Anathemas": DOC_IDS.constantinople2,
  "Third Council of Constantinople — Definition of Faith": DOC_IDS.constantinople3,
};

// German confession-name → doc_id (same anchors across locales).
const DE_NAME_TO_DOC_ID = {
  "Westminsterbekenntnis": DOC_IDS.westminster,
  "Heidelberger Katechismus": DOC_IDS.heidelberg,
  "Augsburger Bekenntnis": DOC_IDS.augsburg,
  "Baptistisches Bekenntnis von 1689": DOC_IDS.baptist1689,
  "39 Artikel der Kirche von England": DOC_IDS.thirtynineArticles,
  "Römischer Katechismus": DOC_IDS.romanCatechism,
  "Orthodoxer Katechismus": DOC_IDS.orthodoxLonger,
  "Apostolisches Glaubensbekenntnis": DOC_IDS.apostlesCreed,
  "Nicänisches Glaubensbekenntnis": DOC_IDS.niceneCreed,
  "Athanasianisches Glaubensbekenntnis": DOC_IDS.athanasianCreed,
  "Definition von Chalcedon": DOC_IDS.chalcedon,
  "Erstes Konzil von Konstantinopel — Kanones": DOC_IDS.constantinople1,
  "Zweites Konzil von Konstantinopel — Anathemata": DOC_IDS.constantinople2,
  "Drittes Konzil von Konstantinopel — Glaubensdefinition": DOC_IDS.constantinople3,
};

const NAME_TO_DOC_ID = { ...EN_NAME_TO_DOC_ID, ...DE_NAME_TO_DOC_ID };

// Reverse: doc_id → English confession name (the canonical Browse key).
// Browse state is keyed by the localised confession name at render time, but
// we always want to resolve to English first and let the language-effect
// remap it (the existing behaviour in App.jsx).
export const DOC_ID_TO_EN_NAME = Object.fromEntries(
  Object.entries(EN_NAME_TO_DOC_ID).map(([en, id]) => [id, en])
);

// Given a confession name in either locale, return its doc_id or null.
export function docIdForConfessionName(name) {
  if (!name) return null;
  return NAME_TO_DOC_ID[name] || null;
}

// Given a confession name, return the opposite-locale name if known, else the
// same name. Used to resolve a doc_id back to the localised Browse key.
export function confessionNameForDocId(docId, confessionsByName) {
  if (!docId) return null;
  const en = DOC_ID_TO_EN_NAME[docId];
  if (!en) return null;
  if (confessionsByName && confessionsByName[en]) return en;
  // The current locale is DE — find the DE name that maps to this docId.
  const de = Object.entries(DE_NAME_TO_DOC_ID).find(([, id]) => id === docId)?.[0];
  if (de && confessionsByName && confessionsByName[de]) return de;
  return en;
}

// Build a stable anchor id. Any missing component falls back to a coarser
// anchor (section → chapter → doc top).
export function buildAnchorId({ docId, chapter, section }) {
  if (!docId) return null;
  const parts = [docId];
  if (chapter !== undefined && chapter !== null && chapter !== "") {
    parts.push("ch" + chapter);
    if (section !== undefined && section !== null && section !== "") {
      parts.push("s" + section);
    }
    return parts.join("-");
  }
  return "doc-" + docId;
}

// A location can arrive in several shapes — normalise to {chapter, section}.
// The Research JSON prompt is instructed to emit chapter/section/question/
// article/canon fields; map them all to chapter+section using the Browse
// data's own numbering (sections ARE question/article/canon numbers in the
// data files — see Heidelberg Q#, Augsburg article#, Constantinople canon#).
export function normalizeLocation(loc) {
  if (!loc || typeof loc !== "object") return {};
  const chapter = loc.chapter ?? loc.lordsDay ?? loc.part ?? null;
  const section =
    loc.section ?? loc.question ?? loc.article ?? loc.canon ?? loc.anathema ?? null;
  const out = {};
  if (chapter !== null && chapter !== undefined && chapter !== "") out.chapter = chapter;
  if (section !== null && section !== undefined && section !== "") out.section = section;
  return out;
}

// Given a confession data object (with .chapters[].sections[]) and a
// {chapter, section} location, find the actual chapter INDEX (so App.jsx can
// setSelectedChapter to that index). Matches by chapter.number first, then
// falls back to chapter index (1-based).
export function findChapterIndex(confession, chapter) {
  if (!confession || !Array.isArray(confession.chapters)) return -1;
  if (chapter === null || chapter === undefined || chapter === "") return -1;
  const chapNum = Number(chapter);
  if (Number.isFinite(chapNum)) {
    const byNumber = confession.chapters.findIndex(c => Number(c.number) === chapNum);
    if (byNumber >= 0) return byNumber;
    // Fallback: treat as 1-based index.
    if (chapNum >= 1 && chapNum <= confession.chapters.length) return chapNum - 1;
  }
  return -1;
}

// Given a confession and a {section} number, find the chapter index that
// contains a section with that number. Useful for Heidelberg (question
// numbers are unique across the whole catechism) and 39 Articles (article
// numbers span multiple "chapters" that group them).
export function findChapterIndexBySection(confession, section) {
  if (!confession || !Array.isArray(confession.chapters)) return -1;
  if (section === null || section === undefined || section === "") return -1;
  const secNum = Number(section);
  if (!Number.isFinite(secNum)) return -1;
  for (let i = 0; i < confession.chapters.length; i++) {
    const ch = confession.chapters[i];
    if (Array.isArray(ch.sections) && ch.sections.some(s => Number(s.number) === secNum)) {
      return i;
    }
  }
  return -1;
}

// Build the in-app route URL for a deep link. Hash-only (the app has no
// router). Format: #browse/{docId}[/{chapter}[/{section}]]
export function buildBrowseRoute({ docId, chapter, section }) {
  if (!docId) return "#browse";
  const parts = ["#browse", docId];
  if (chapter !== undefined && chapter !== null && chapter !== "") {
    parts.push(String(chapter));
    if (section !== undefined && section !== null && section !== "") {
      parts.push(String(section));
    }
  }
  return parts.join("/");
}

// Parse a hash back into {docId, chapter, section}.
export function parseBrowseHash(hash) {
  if (!hash) return null;
  const h = hash.startsWith("#") ? hash.slice(1) : hash;
  const parts = h.split("/");
  if (parts[0] !== "browse") return null;
  const [, docId, chapter, section] = parts;
  if (!docId) return { mode: "browse" };
  return { mode: "browse", docId, chapter, section };
}

// Best-effort parser for free-text citation strings emitted by the Compare
// prompt (e.g. "Westminster 1.4", "Heidelberg Q60", "Augsburg Art. IV",
// "Canon 3", "Chapter 1, Section 4"). Returns {chapter?, section?} or {}.
export function parseCitationString(citation) {
  if (!citation || typeof citation !== "string") return {};
  const s = citation.trim();

  // "Q60" / "Q 60" / "Question 60" — Heidelberg or Orthodox Q#.
  let m = s.match(/\bQ(?:uestion)?\.?\s*(\d{1,3})\b/i);
  if (m) return { section: parseInt(m[1], 10) };

  // "Canon 3" / "Anathema V".
  m = s.match(/\b(?:canon|anathema)\s*[.:]?\s*(\d{1,3}|[IVXLCM]+)\b/i);
  if (m) {
    const raw = m[1];
    const n = /^\d+$/.test(raw) ? parseInt(raw, 10) : fromRoman(raw);
    if (n) return { section: n };
  }

  // "Article IV" / "Art. 6" / "Articulus XXIV".
  m = s.match(/\bArt(?:icle|iculus|\.)?\s*(\d{1,3}|[IVXLCM]+)\b/i);
  if (m) {
    const raw = m[1];
    const n = /^\d+$/.test(raw) ? parseInt(raw, 10) : fromRoman(raw);
    if (n) return { section: n };
  }

  // "Chapter 1, Section 4" / "Ch. 1 §4".
  m = s.match(/\b(?:chapter|ch\.?)\s*(\d{1,3})\b.*?\b(?:section|sec\.?|§)\s*(\d{1,3})\b/i);
  if (m) return { chapter: parseInt(m[1], 10), section: parseInt(m[2], 10) };

  // Bare chapter only.
  m = s.match(/\b(?:chapter|ch\.?)\s*(\d{1,3})\b/i);
  if (m) return { chapter: parseInt(m[1], 10) };

  // Dotted numeric like "1.4" or "WCF 1.4".
  m = s.match(/(\d{1,3})\s*[.:]\s*(\d{1,3})\b/);
  if (m) return { chapter: parseInt(m[1], 10), section: parseInt(m[2], 10) };

  return {};
}

function fromRoman(str) {
  if (!str) return 0;
  const map = { I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000 };
  let total = 0;
  const upper = str.toUpperCase();
  for (let i = 0; i < upper.length; i++) {
    const cur = map[upper[i]] || 0;
    const next = map[upper[i + 1]] || 0;
    if (cur < next) total -= cur; else total += cur;
  }
  return total;
}

// Scroll to an anchor element and briefly highlight it. Resolves immediately
// if the element is not yet mounted — the caller usually kicks this off after
// React has rendered the target document.
export function scrollToAnchorAndHighlight(anchorId) {
  if (!anchorId) return;
  // Give React a tick to mount the target section before we scroll.
  const attempt = (tries) => {
    const el = document.getElementById(anchorId);
    if (!el) {
      if (tries > 0) setTimeout(() => attempt(tries - 1), 80);
      return;
    }
    try { el.scrollIntoView({ behavior: "smooth", block: "start" }); } catch { el.scrollIntoView(); }
    el.classList.remove("cccr-anchor-highlight");
    // Force reflow so the animation restarts when the same anchor is clicked twice.
    void el.offsetWidth;
    el.classList.add("cccr-anchor-highlight");
  };
  attempt(10);
}
