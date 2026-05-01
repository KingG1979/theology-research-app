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

// Free-form doc_id alias map. The model is instructed to emit one of the
// canonical strings, but in practice it slips into shorthand or German forms.
// Every key is lowercased; lookup folds the input to lowercase.
const DOC_ID_ALIASES = {
  // Westminster
  "westminster": DOC_IDS.westminster,
  "wcf": DOC_IDS.westminster,
  "westminster_confession": DOC_IDS.westminster,
  "westminster-confession": DOC_IDS.westminster,
  "westminster confession": DOC_IDS.westminster,
  "westminster confession of faith": DOC_IDS.westminster,
  "westminsterbekenntnis": DOC_IDS.westminster,
  // Heidelberg
  "heidelberg": DOC_IDS.heidelberg,
  "hc": DOC_IDS.heidelberg,
  "heidelberg_catechism": DOC_IDS.heidelberg,
  "heidelberg-catechism": DOC_IDS.heidelberg,
  "heidelberg catechism": DOC_IDS.heidelberg,
  "heidelberger katechismus": DOC_IDS.heidelberg,
  "heidelberger": DOC_IDS.heidelberg,
  // Augsburg
  "augsburg": DOC_IDS.augsburg,
  "ca": DOC_IDS.augsburg,
  "augsburg_confession": DOC_IDS.augsburg,
  "augsburg-confession": DOC_IDS.augsburg,
  "augsburg confession": DOC_IDS.augsburg,
  "augsburger bekenntnis": DOC_IDS.augsburg,
  "confessio augustana": DOC_IDS.augsburg,
  // 1689 Baptist
  "baptist1689": DOC_IDS.baptist1689,
  "1689": DOC_IDS.baptist1689,
  "1689-baptist": DOC_IDS.baptist1689,
  "1689_baptist": DOC_IDS.baptist1689,
  "1689 baptist confession": DOC_IDS.baptist1689,
  "second london baptist confession": DOC_IDS.baptist1689,
  "baptist": DOC_IDS.baptist1689,
  "baptistisches bekenntnis von 1689": DOC_IDS.baptist1689,
  // 39 Articles
  "thirtynine-articles": DOC_IDS.thirtynineArticles,
  "thirtynine_articles": DOC_IDS.thirtynineArticles,
  "thirty-nine-articles": DOC_IDS.thirtynineArticles,
  "thirty_nine_articles": DOC_IDS.thirtynineArticles,
  "39-articles": DOC_IDS.thirtynineArticles,
  "39_articles": DOC_IDS.thirtynineArticles,
  "39 articles": DOC_IDS.thirtynineArticles,
  "thirty-nine articles": DOC_IDS.thirtynineArticles,
  "39 articles of religion": DOC_IDS.thirtynineArticles,
  "articles of religion": DOC_IDS.thirtynineArticles,
  "39 artikel der kirche von england": DOC_IDS.thirtynineArticles,
  // Roman Catechism
  "roman-catechism": DOC_IDS.romanCatechism,
  "roman_catechism": DOC_IDS.romanCatechism,
  "roman catechism": DOC_IDS.romanCatechism,
  "trent": DOC_IDS.romanCatechism,
  "catechism of the council of trent": DOC_IDS.romanCatechism,
  "römischer katechismus": DOC_IDS.romanCatechism,
  "roemischer katechismus": DOC_IDS.romanCatechism,
  // Orthodox Longer
  "orthodox-longer": DOC_IDS.orthodoxLonger,
  "orthodox_longer": DOC_IDS.orthodoxLonger,
  "longer-catechism": DOC_IDS.orthodoxLonger,
  "longer catechism": DOC_IDS.orthodoxLonger,
  "longer catechism (orthodox)": DOC_IDS.orthodoxLonger,
  "orthodox": DOC_IDS.orthodoxLonger,
  "orthodox catechism": DOC_IDS.orthodoxLonger,
  "orthodoxer katechismus": DOC_IDS.orthodoxLonger,
  // Apostles' Creed
  "apostles-creed": DOC_IDS.apostlesCreed,
  "apostles_creed": DOC_IDS.apostlesCreed,
  "apostles creed": DOC_IDS.apostlesCreed,
  "apostles' creed": DOC_IDS.apostlesCreed,
  "apostles": DOC_IDS.apostlesCreed,
  "apostolisches glaubensbekenntnis": DOC_IDS.apostlesCreed,
  // Nicene Creed
  "nicene-creed": DOC_IDS.niceneCreed,
  "nicene_creed": DOC_IDS.niceneCreed,
  "nicene creed": DOC_IDS.niceneCreed,
  "nicene": DOC_IDS.niceneCreed,
  "niceno-constantinopolitan creed": DOC_IDS.niceneCreed,
  "nicänisches glaubensbekenntnis": DOC_IDS.niceneCreed,
  "nicaenisches glaubensbekenntnis": DOC_IDS.niceneCreed,
  // Athanasian
  "athanasian-creed": DOC_IDS.athanasianCreed,
  "athanasian_creed": DOC_IDS.athanasianCreed,
  "athanasian creed": DOC_IDS.athanasianCreed,
  "athanasian": DOC_IDS.athanasianCreed,
  "quicunque vult": DOC_IDS.athanasianCreed,
  "athanasianisches glaubensbekenntnis": DOC_IDS.athanasianCreed,
  // Chalcedon
  "chalcedon": DOC_IDS.chalcedon,
  "definition-of-chalcedon": DOC_IDS.chalcedon,
  "definition of chalcedon": DOC_IDS.chalcedon,
  "chalcedonian definition": DOC_IDS.chalcedon,
  "definition von chalcedon": DOC_IDS.chalcedon,
  // Constantinople I
  "constantinople-1": DOC_IDS.constantinople1,
  "constantinople_1": DOC_IDS.constantinople1,
  "constantinople 1": DOC_IDS.constantinople1,
  "constantinople i": DOC_IDS.constantinople1,
  "first council of constantinople": DOC_IDS.constantinople1,
  "first council of constantinople — canons": DOC_IDS.constantinople1,
  "erstes konzil von konstantinopel": DOC_IDS.constantinople1,
  // Constantinople II
  "constantinople-2": DOC_IDS.constantinople2,
  "constantinople_2": DOC_IDS.constantinople2,
  "constantinople 2": DOC_IDS.constantinople2,
  "constantinople ii": DOC_IDS.constantinople2,
  "second council of constantinople": DOC_IDS.constantinople2,
  "second council of constantinople — anathemas": DOC_IDS.constantinople2,
  "zweites konzil von konstantinopel": DOC_IDS.constantinople2,
  // Constantinople III
  "constantinople-3": DOC_IDS.constantinople3,
  "constantinople_3": DOC_IDS.constantinople3,
  "constantinople 3": DOC_IDS.constantinople3,
  "constantinople iii": DOC_IDS.constantinople3,
  "third council of constantinople": DOC_IDS.constantinople3,
  "third council of constantinople — definition of faith": DOC_IDS.constantinople3,
  "drittes konzil von konstantinopel": DOC_IDS.constantinople3,
};

// Doc-aware schema: how each document is keyed in the data files, plus the
// max chapter / section number we'll accept before treating the input as
// out-of-range. The "primaryAxis" tells the normalizer which incoming key
// (chapter, question, article, canon) maps to which storage axis.
//   storage="chapter+section": {chapter, section} are both meaningful
//   storage="section-only":     1 chapter, only section number matters (clauses)
//   storage="chapter-as-N":     model emits article# but it's stored as a
//                                top-level chapter (Augsburg pattern)
//   storage="section-as-N":     model emits article#/canon#/Q#, looked up by
//                                section number across chapters (Heidelberg,
//                                39 Articles, athanasian, constantinople-2)
const DOC_SCHEMAS = {
  [DOC_IDS.westminster]:        { storage: "chapter+section", maxChapter: 33, maxSection: 32 },
  [DOC_IDS.heidelberg]:         { storage: "section-as-N",    maxChapter: 52, maxSection: 129, primaryKey: "question" },
  [DOC_IDS.augsburg]:           { storage: "chapter-as-N",    maxChapter: 28, maxSection: 1,   primaryKey: "article" },
  [DOC_IDS.baptist1689]:        { storage: "chapter+section", maxChapter: 32, maxSection: 32 },
  [DOC_IDS.thirtynineArticles]: { storage: "section-as-N",    maxChapter: 7,  maxSection: 39,  primaryKey: "article" },
  [DOC_IDS.romanCatechism]:     { storage: "chapter+section", maxChapter: 42, maxSection: 200 },
  [DOC_IDS.orthodoxLonger]:     { storage: "chapter+section", maxChapter: 6,  maxSection: 8,   primaryKey: "question" },
  [DOC_IDS.apostlesCreed]:      { storage: "section-only",    maxChapter: 1,  maxSection: 4 },
  [DOC_IDS.niceneCreed]:        { storage: "section-only",    maxChapter: 1,  maxSection: 6 },
  [DOC_IDS.athanasianCreed]:    { storage: "section-as-N",    maxChapter: 2,  maxSection: 41 },
  [DOC_IDS.chalcedon]:          { storage: "section-only",    maxChapter: 1,  maxSection: 4 },
  [DOC_IDS.constantinople1]:    { storage: "section-as-N",    maxChapter: 1,  maxSection: 4,   primaryKey: "canon" },
  [DOC_IDS.constantinople2]:    { storage: "section-as-N",    maxChapter: 2,  maxSection: 14,  primaryKey: "anathema" },
  [DOC_IDS.constantinople3]:    { storage: "chapter+section", maxChapter: 8,  maxSection: 200 },
};

// Reverse: doc_id → English confession name (the canonical Browse key).
// Browse state is keyed by the localised confession name at render time, but
// we always want to resolve to English first and let the language-effect
// remap it (the existing behaviour in App.jsx).
export const DOC_ID_TO_EN_NAME = Object.fromEntries(
  Object.entries(EN_NAME_TO_DOC_ID).map(([en, id]) => [id, en])
);

// Set of canonical doc_ids for fast membership tests.
const CANONICAL_DOC_IDS = new Set(Object.values(DOC_IDS));

// Map any model-emitted doc_id variant ("WCF", "Westminster Confession of
// Faith", "westminster_confession", "Heidelberger Katechismus", …) to the
// canonical doc_id. Returns null if no match.
export function normalizeDocId(input) {
  if (!input) return null;
  const raw = String(input).trim();
  if (!raw) return null;
  if (CANONICAL_DOC_IDS.has(raw)) return raw;
  const lower = raw.toLowerCase();
  if (DOC_ID_ALIASES[lower]) return DOC_ID_ALIASES[lower];
  // Strip punctuation / collapse whitespace and retry.
  const stripped = lower.replace(/[._]+/g, "-").replace(/\s+/g, " ").trim();
  if (DOC_ID_ALIASES[stripped]) return DOC_ID_ALIASES[stripped];
  // Last resort: confession-name lookup (e.g. "Westminster Confession of
  // Faith" via the EN_NAME_TO_DOC_ID map, "Heidelberger Katechismus" via DE).
  if (NAME_TO_DOC_ID[raw]) return NAME_TO_DOC_ID[raw];
  return null;
}

// Given a confession name in either locale, return its doc_id or null.
export function docIdForConfessionName(name) {
  if (!name) return null;
  return NAME_TO_DOC_ID[name] || normalizeDocId(name) || null;
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

// First-pass: pull every recognised location key off `loc` (any locale, any
// shape). Returns numeric-cast values where possible so the doc-aware step
// can decide what's a chapter vs a clause vs an article.
function collectLocationKeys(loc) {
  if (!loc || typeof loc !== "object") return {};
  const num = (v) => {
    if (v === null || v === undefined || v === "") return null;
    const n = Number(v);
    return Number.isFinite(n) ? n : null;
  };
  return {
    chapter:   num(loc.chapter   ?? loc.kapitel ?? loc.ch ?? loc.cap),
    section:   num(loc.section   ?? loc.s ?? loc.sec ?? loc.paragraph ?? loc.par ?? loc.absatz ?? loc.clause),
    question:  num(loc.question  ?? loc.q ?? loc.frage),
    article:   num(loc.article   ?? loc.art ?? loc.artikel ?? loc.articulus),
    canon:     num(loc.canon     ?? loc.kanon),
    anathema:  num(loc.anathema  ?? loc.anathem),
    lordsDay:  num(loc.lordsDay  ?? loc.lords_day ?? loc["lord's day"] ?? loc.lord_day),
    part:      num(loc.part),
  };
}

// Doc-aware location normaliser. Given a doc_id and any incoming location
// shape, returns the {chapter, section} pair that matches how the document
// is actually keyed in the data files. Out-of-range numbers are dropped
// (the caller falls back to the doc root). When `docId` is null the legacy
// best-guess mapping is used so older callers keep working.
export function normalizeLocation(loc, docId) {
  const k = collectLocationKeys(loc);
  if (!docId) {
    // Legacy fallback: prefer chapter/section, fold the rest into section.
    const out = {};
    const chapter = k.chapter ?? k.lordsDay ?? k.part;
    const section = k.section ?? k.question ?? k.article ?? k.canon ?? k.anathema;
    if (chapter !== null && chapter !== undefined) out.chapter = chapter;
    if (section !== null && section !== undefined) out.section = section;
    return out;
  }
  const schema = DOC_SCHEMAS[docId];
  if (!schema) {
    const out = {};
    if (k.chapter != null) out.chapter = k.chapter;
    if (k.section != null) out.section = k.section;
    return out;
  }

  let chapter = null;
  let section = null;

  switch (schema.storage) {
    case "chapter+section": {
      // Westminster, Baptist1689, Roman Catechism, Orthodox Longer,
      // Constantinople III. {chapter, section} map directly.
      chapter = k.chapter ?? k.part ?? null;
      section = k.section ?? k.question ?? k.article ?? k.canon ?? k.anathema ?? null;
      // If the model emitted only `article` for orthodox-longer, treat it as
      // the chapter (Orthodox Longer chapters look like articles to readers).
      if (chapter == null && schema.primaryKey === "question" && k.question != null) {
        // Orthodox Longer: question numbers reset per chapter (1 or 2 per
        // chapter); without an explicit chapter we cannot pinpoint, so fall
        // through with section-only and let the section-lookup resolve it.
        section = k.question;
      }
      break;
    }
    case "section-only": {
      // Apostles' / Nicene / Chalcedon: 1 chapter, sections = clauses.
      chapter = 1;
      section = k.section ?? k.clause ?? k.question ?? k.article ?? k.canon ?? null;
      break;
    }
    case "chapter-as-N": {
      // Augsburg: each "article" is stored as a top-level chapter, with a
      // single section.number=1 underneath.
      chapter =
        k.article ??
        k.chapter ??
        k.section ??  // model sometimes mislabels as section
        null;
      section = 1;
      break;
    }
    case "section-as-N": {
      // Heidelberg (Q#), 39 Articles (article#), Athanasian (clause#),
      // Constantinople I/II (canon# / anathema#). The cross-chapter unique
      // number lives in `section`. Chapter is optional; the renderer will
      // resolve it via findChapterIndexBySection.
      chapter = k.chapter ?? k.lordsDay ?? null;
      section =
        k[schema.primaryKey] ??
        k.section ??
        k.question ??
        k.article ??
        k.canon ??
        k.anathema ??
        null;
      // Augsburg-style fallback: if only "chapter" was given and it's in
      // range for the section axis, treat it as the section number.
      if (section == null && chapter != null && schema.primaryKey && chapter <= schema.maxSection) {
        section = chapter;
        chapter = null;
      }
      break;
    }
  }

  // Range validation. Out-of-range silently drops to null so the caller
  // falls back to the doc root rather than building a 404 URL.
  const out = {};
  if (chapter != null) {
    if (chapter >= 1 && chapter <= schema.maxChapter) {
      out.chapter = chapter;
    } else if (
      docId === DOC_IDS.romanCatechism &&
      chapter > schema.maxChapter &&
      typeof console !== "undefined"
    ) {
      // Catch CCC-paragraph-style numbers (e.g. 2086, 1213) being routed to
      // the Roman Catechism. The Roman Catechism (1566) only has 42 chapters;
      // CCC (1992) is not in CCCR. Drop the link to doc root rather than
      // try to "rescue" the number as a section.
      console.warn(
        `[anchors] roman-catechism chapter ${chapter} is out of range (1-${schema.maxChapter}); ` +
        `likely a CCC paragraph number — falling back to doc root.`
      );
    }
  }
  if (section != null) {
    if (section >= 1 && section <= schema.maxSection) out.section = section;
  }
  return out;
}

// Single-call helper that ALSO normalises the doc_id. Returns
// {docId, location} where `docId` is canonical (or null) and `location`
// is the storage-shape {chapter?, section?} validated against the doc.
export function normalizeCitation({ doc_id, docId, document, confession, location } = {}) {
  const inputId = doc_id ?? docId ?? null;
  let canonicalId = normalizeDocId(inputId);
  if (!canonicalId) {
    // Try resolving from the human document/confession name as a backup.
    const name = document || confession;
    if (name) canonicalId = docIdForConfessionName(name);
  }
  const loc = normalizeLocation(location || {}, canonicalId);
  return { docId: canonicalId, location: loc };
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

// Build the in-app route URL for a deep link. Hash-based (legacy — kept for
// backwards compatibility with previously-shared links). Format:
// #browse/{docId}[/{chapter}[/{section}]]
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

// Build a path-based crawlable URL for a deep link. This is the SEO-facing
// route shape. Format: /browse/{docId}[/{chapter}[/{section}]]
// Optional locale prefix ("de") yields /de/browse/...
export function buildBrowsePath({ docId, chapter, section, lang }) {
  const prefix = lang === "de" ? "/de" : "";
  if (!docId) return prefix + "/browse";
  const parts = [prefix, "browse", docId];
  if (chapter !== undefined && chapter !== null && chapter !== "") {
    parts.push(String(chapter));
    if (section !== undefined && section !== null && section !== "") {
      parts.push(String(section));
    }
  }
  return parts.join("/").replace(/\/+/g, "/");
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

// Parse a path-based browse URL back into {mode, lang?, docId?, chapter?, section?}.
// Accepts /browse/..., /de/browse/..., /all-documents, /de/all-documents.
export function parseBrowsePath(pathname) {
  if (!pathname) return null;
  const segs = pathname.split("/").filter(Boolean);
  let lang = null;
  let i = 0;
  if (segs[0] === "de" || segs[0] === "en") {
    lang = segs[0];
    i = 1;
  }
  if (segs[i] === "all-documents") {
    return { mode: "all-documents", lang };
  }
  if (segs[i] !== "browse") return null;
  const docId = segs[i + 1];
  if (!docId) return { mode: "browse", lang };
  // Path may be /browse/{docId}/{chapter}/{section} OR
  // /browse/{docId}/q/{question} OR /browse/{docId}/art/{article}.
  const a = segs[i + 2];
  const b = segs[i + 3];
  if (a === "q" || a === "art" || a === "canon") {
    return { mode: "browse", lang, docId, section: b };
  }
  return { mode: "browse", lang, docId, chapter: a, section: b };
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
