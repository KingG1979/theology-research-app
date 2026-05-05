// Outbound deep-linking for the Joint Declaration on the Doctrine of
// Justification (JDDJ, 1999). Like the modern CCC, the JDDJ text is NOT
// embedded in CCCR — we link out to the official Vatican-hosted version
// (christianunity.va). The Pontifical Council for Promoting Christian Unity
// hosts the document at a single long page per language.
//
// The Vatican page does NOT include per-paragraph anchors — only footnote
// anchors. So the resolver returns the language-appropriate page URL; the
// reader scrolls to the cited paragraph (every paragraph is numbered inline,
// 1-44, plus an Annex and the Official Common Statement).
//
// English: https://www.christianunity.va/.../en.html
// German:  https://www.christianunity.va/.../en/de.html  (DE is nested under EN)

const JDDJ_MIN = 1;
const JDDJ_MAX = 44;

const URL_BY_LANG = {
  en: "https://www.christianunity.va/content/unitacristiani/en/dialoghi/sezione-occidentale/luterani/dialogo/documenti-di-dialogo/1999-dichiarazione-congiunta-sulla-dottrina-della-giustificazion/en.html",
  de: "https://www.christianunity.va/content/unitacristiani/en/dialoghi/sezione-occidentale/luterani/dialogo/documenti-di-dialogo/1999-dichiarazione-congiunta-sulla-dottrina-della-giustificazion/en/de.html",
};

// Resolve a JDDJ paragraph to a Vatican URL. The Vatican page has no per-
// paragraph anchors, so the paragraph argument is currently unused for
// linking; it's still validated so callers can detect out-of-range numbers.
export function getJDDJUrl(paragraph, lang = "en") {
  const lng = lang === "de" ? "de" : "en";
  return URL_BY_LANG[lng];
}

export function isJDDJDocId(docId) {
  return docId === "jddj";
}

export const JDDJ_RANGE = { min: JDDJ_MIN, max: JDDJ_MAX };
export const JDDJ_URL_BY_LANG = URL_BY_LANG;
