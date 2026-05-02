# Changelog

All notable changes to the Creeds, Confessions and Catechism Research app.  
Maintained by **Stein Street Solutions (SSS)**.

## [2026-05-02]

### Fixed

- **Anonymous users (not logged in) can again use Research and Compare modes.** Reproduction (anonymous, headless): Research returned valid results; Compare consistently failed with "Unable to complete the comparison" because the structured-JSON response for 7 traditions × multiple aspects was being truncated by the 1800-token cap, leaving an unparseable JSON body. Root cause was therefore not auth-related (auth was already optional everywhere outside of the Notebook) — it was an output-budget regression introduced when Compare moved to structured JSON. Fix: (1) raise Compare's `max_tokens` from 1800 to 3500 so the full grid fits comfortably within budget; (2) add a best-effort `repairTruncatedJson` recovery in `src/utils/parsers.js` and Research's JSON parser so a truncated response still surfaces the partial answer instead of a hard "Could not parse"; (3) wrap all `localStorage`/`sessionStorage` reads and writes in try/catch so Safari iOS private mode (where storage can throw on access) cannot break first paint, the welcome screen, or the anonymous query-quota counter. Notebook continues to require login as before — only `notes` writes go through Supabase, and that path is still gated on `session`.

## [2026-05-01]

### Fixed

- **Catholic citations in Compare mode now correctly reference the Roman Catechism (1566) rather than CCC paragraph numbers.** The model was conflating CCCR's Roman Catechism (Catechismus Romanus, 1566, McHugh/Callan, public domain) with the modern Catechism of the Catholic Church (CCC, 1992, copyrighted and not in CCCR), and emitting CCC-style paragraph numbers (e.g., 2086, 1213, 850) under doc_id "roman-catechism". The link builder then routed these into chapter/section slots and produced nonsense URLs. Fix: (1) added explicit prompt clarification to both `COMPARISON_PROMPT` and `RESEARCH_JSON_PROMPT` distinguishing the Roman Catechism (in CCCR, 42 chapters, sections within each chapter) from the modern CCC (NOT in CCCR), with a worked example pinning the Roman Catechism's "Justifying Grace" passage to chapter 19 (Penance), section 31; (2) updated the standard-locus guide with verified Roman Catechism references derived from the actual data file — e.g., Church → Ch. 11 (Article IX), Justification → Ch. 19 (Penance), Eucharist → Ch. 18, Baptism → Ch. 16, Sacraments-in-general → Ch. 15, Trinity → Ch. 3 + Ch. 10, Christology → Ch. 4–9; (3) `normalizeLocation` in `src/utils/anchors.js` now logs a `console.warn` when an out-of-range chapter is supplied for `roman-catechism` so CCC-paragraph-style numbers are visible during testing rather than silently dropped (range validation already drops them; the warning makes it observable).

### Changed

- **Tuned Compare-mode prompt to cite source passages more readily.** Provides standard-locus guidance to the model so well-known doctrinal sections (e.g., Augsburg Art. VII on the Church, Westminster Ch. 11 on Justification) are reliably cited. On-topic and doc_id/location safeguards retained.
- **Removed floating Feedback button. Replaced with footer link (every page) + "Send Feedback" button on About page.** Resolves issue where button obscured Compare mode's horizontal scroll arrow and dominated mobile viewports. The same feedback modal is now triggered from a subtle "Feedback" text link in the footer (next to `www.ccc-study.org`) and from a normal-sized "Send Feedback" button at the bottom of the About modal. EN and DE locales reuse existing `feedback` / `sendFeedback` i18n keys.

## [2026-04-29]

### Fixed

- **Citation deep-links now reliably land on the correct passage across Compare and Research modes — added doc_id/location normalization, doc-aware schema validation, and graceful fallback** — User reported that some citation links in Compare mode opened the right passage and others dropped to the document root. Root cause was three-layered: (1) the model sometimes emitted `doc_id` aliases the link builder did not recognise — "WCF", "Westminster Confession of Faith", "westminster_confession", "Heidelberger Katechismus", etc. — so the builder fell through to a null doc_id and the click did nothing useful; (2) the previous `normalizeLocation()` was doc-agnostic and folded `article`, `question`, `canon`, and `anathema` all into `section` — wrong for Augsburg, where each article is stored as a top-level chapter (`{chapter: 4, section: 1}` for Article IV), so the link built `/browse/augsburg/` (no chapter) and went to root; (3) no range validation, so a hallucinated "Westminster Chapter 35" produced a 404-shaped URL with no graceful fallback. Fix layered three pieces: `src/utils/anchors.js` gains a `DOC_ID_ALIASES` map (covers "WCF", "wcf", "westminster_confession", German variants like "Westminsterbekenntnis", and ~80 other shorthand variants), a `DOC_SCHEMAS` map declaring each document's storage shape (`chapter+section`, `chapter-as-N` for Augsburg, `section-as-N` for Heidelberg/39 Articles/Athanasian/Constantinople II, `section-only` for the creeds) and max chapter/section ranges, a new doc-aware `normalizeLocation(loc, docId)` that maps incoming keys to the data file's actual storage axis (e.g. Augsburg `{article:4}` → `{chapter:4, section:1}`, Heidelberg `{question:60}` → `{section:60}` with chapter resolved at render via `findChapterIndexBySection`, Constantinople-2 `{anathema:7}` → `{section:7}`) and silently drops out-of-range numbers so a hallucinated chapter falls back to the doc root rather than a broken link, plus a new `normalizeCitation({doc_id, location, ...})` helper that does both at once. Wired into Research citation parsing (`askQuestion`), Compare cell rendering, and `openBrowseAt` so every entry point now flows through the same normaliser. `RESEARCH_JSON_PROMPT` and `COMPARISON_PROMPT` updated with explicit canonical doc_id whitelists and per-doc valid integer ranges (Westminster 1-33, Heidelberg 1-129, Augsburg 1-28, Baptist1689 1-32, 39 Articles 1-39, Roman Catechism 1-42, Orthodox Longer 1-6, creeds 1-4 to 1-41, Constantinople I 1-4, II 1-14, III 1-200) and a do-NOT-invent-variants warning. Build still produces all 6,046 prerendered pages; URLs are unchanged
- **Compare mode regression — every selected tradition now produces content; deep-link is supplementary, not required** — Following the 2026-04-28 switch to a structured-JSON Compare response, users reported blank cells for some traditions. Root cause: the new `COMPARISON_PROMPT` instructed the model to "OMIT that cell entirely (set it to null)" whenever it could not recall a specific chapter/question/article/canon — a rule carried over from Research, where missing-citation = omit-from-sidebar makes sense, but is wrong for Compare where every selected tradition column must be populated. The model was therefore dropping cells whenever it lacked a specific location, leaving the renderer to show a "-" placeholder. Fix: (1) `COMPARISON_PROMPT` rewritten so `position` is REQUIRED for every tradition in every row — if a tradition does not address an aspect, the model must say so explicitly ("This tradition does not address this question directly") rather than returning null. Citation/`doc_id`/`location` are now optional per cell — included when known, omitted when not, but their absence never causes a blank cell. (2) `parseComparison()` in `src/utils/parsers.js` now emits a `missing: true` placeholder for any tradition the model omitted, and falls back to `quote + context` when `position` is empty. (3) Compare cell renderer in `App.jsx` shows a clear "No response received for this tradition." fallback (italic, muted) when a cell is missing — no more blank/dash cells. New `compareNoResponseForTradition` translation in EN and DE. Deep-links continue to work for cells where the model did supply a location

## [2026-04-28]

### Added

- **SEO prerendering — per-document, per-chapter, per-section static HTML** — The build pipeline now prerenders a static HTML page for every document, chapter, and section in the library at `dist/browse/{docId}[/{chapter}[/{section}]]/index.html` (and `dist/de/browse/...` for German). Each page contains a real, crawlable `<h1>`, breadcrumb, full passage text, and a `<noscript>` fallback so Googlebot indexes content without waiting on a JS render pass. The hydrating SPA hides the prerender block on first paint via `documentElement.classList.add('cccr-spa-ready')`. A new `scripts/prerender.mjs` runs after `vite build`. Sample URL: `https://ccc-study.org/browse/westminster/1/4`
- **Auto-generated sitemap.xml** — `dist/sitemap.xml` is now generated at build time from the confession data files, listing every prerendered URL (~6,000 URLs covering homepage, all-documents index, document landings, chapters, and sections in EN and DE) with `<lastmod>`, `<changefreq>`, `<priority>` (1.0 homepage, 0.9 doc, 0.7 chapter, 0.5 section), and `<xhtml:link rel="alternate" hreflang>` annotations for cross-language linking. Replaces the previous hardcoded single-URL `public/sitemap.xml`
- **JSON-LD structured data on every page** — Homepage emits `WebSite` schema with `SearchAction`; document pages emit `Book` schema with author/datePublished/inLanguage; chapter and section pages emit `Article` schema referencing the parent `Book` and including `articleBody` with the actual passage text
- **Path-based routing for deep links (`/browse/...`)** — Added `parseBrowsePath()` and `buildBrowsePath()` to `src/utils/anchors.js`. The SPA boot effect now reads `location.pathname` in addition to `location.hash` and honours both `/browse/{docId}/{chapter}/{section}` and the legacy `#browse/...` form. Citation clicks now `history.replaceState` to the path-based URL so shared links match the prerendered SEO URL. Locale prefix (`/de/browse/...`) auto-switches the UI language. `popstate` listener added so browser back/forward navigates between deep-links
- **All-documents index page** — A new `/all-documents` (and `/de/all-documents`) page lists every document with chapter-level links inside Browse mode and on the prerendered static page. Linked from the footer for human discovery and Googlebot crawl breadth
- **vercel.json** — SPA fallback rewrite (`/((?!api/).*) → /index.html`) so paths without prerendered files still render the SPA. Static prerendered files take precedence; API routes pass through unchanged

### Fixed

- **Research sidebar "Open in Browse" deep-link bug** — User reported that the "Open in Browse" link in the Research Sources sidebar was opening the document top page rather than the specific passage. Root cause: the model occasionally returned a citation with an empty/missing `location` object, so the deep-link helper had nothing to scroll to. Fixed in two places: (1) tightened `RESEARCH_JSON_PROMPT` with a "LOCATION IS REQUIRED" rule — the model must emit at least one of `{chapter, section, question, article, canon}` per citation, or omit the citation entirely; (2) added a fallback in `App.jsx` that, if the structured `location` is missing/empty, parses the human-readable `reference` string with `parseCitationString()` (the same heuristic parser Compare mode uses, which handles "Chapter 1, Section 4", "Q60", "Art. VI", "Canon 3", "1.4", etc.), and as a last resort scans the `quote` text for an embedded reference. Deep-links now reliably scroll to the exact section for chapter/section, question (catechisms), article (Augsburg / 39 Articles), and canon (Constantinople I–III) citations
- **Research mode now resets both answer pane and Sources sidebar when a new query is submitted** — User reported that on a new query, only the right Sources sidebar updated while the left answer pane remained stuck on the previous search's content. Root cause: `askQuestion` appended the new user message to the existing `messages` array (`[...messages, userMessage]`) so the prior assistant answer stayed visible, while `setCitations([])` cleared the sidebar atomically — the two panes drifted out of sync. Fix: Research mode is now treated as single-query — each new Ask replaces `messages` with just the new user message and clears citations together before the request fires, then both panes populate from the same response. Also added explicit error handling for JSON parse failures: instead of silently falling back to raw JSON text in the answer pane, the UI now surfaces a clear "Could not parse response" error and clears citations
- **Compare mode "Open in Browse" links now deep-link to the specific passage cited per tradition (was: tradition's document root)** — User reported that each tradition column's citation link in Compare mode routed to the document's top page instead of the cited chapter / question / article. Root cause: the previous `COMPARISON_PROMPT` returned free-form text (`POSITION | CITATION`) and the renderer relied on `parseCitationString()` heuristics over that text. Many citation styles (e.g. "Augsburg Art. IV", abbreviations, Roman numerals, German citation phrasing) didn't parse cleanly, so most clicks fell back to the doc root. Fix: `COMPARISON_PROMPT` now returns structured JSON, with each cell carrying `{position, citation, doc_id, location: {chapter?|section?|question?|article?|canon?}}`. `api/chat.js` enables `response_format: { type: "json_object" }` for the new `mode: "compare_json"`. `parseComparison` now consumes JSON (with a legacy plain-text fallback). The cell renderer prefers the structured `doc_id` + `location` for deep-linking, then `parseCitationString` on the citation text, then the doc root as a final fallback. Same tab; same path-based URL shape used by Research deep-links (`/browse/{docId}/{chapter}/{section}`, `/browse/{docId}/q/{n}`, `/browse/{docId}/art/{n}`). Works in EN and DE

## [2026-04-21]

### Added

- **Deep-linking from citations to exact passages** — Citations in the Research mode Sources sidebar and in Compare mode now link to the specific chapter/section/question/article/canon inside Browse mode, not just the document top. Browse renders stable anchor ids (`{docId}-ch{n}-s{n}`) on every section, chapter, and document root; a new `src/utils/anchors.js` handles doc-id resolution, location normalisation, route building, and scroll-plus-fade-highlight. The Research JSON prompt now emits a structured `{doc_id, location: {chapter?, section?, question?, article?, canon?}}` payload per citation so deep-links work without heuristic parsing of free-text references. Compare citation strings (e.g. "Westminster 1.4", "Heidelberg Q60") are parsed heuristically and routed to the same anchor. Sample URL: `/#browse/westminster/1/4`. EN and DE share the same anchor scheme, so citations deep-link correctly in both locales. Missing or unknown anchors gracefully fall back to the document top

### Fixed

- **Compare mode horizontal scroll** — Added a visible horizontal scrollbar to the comparison table so desktop/trackpad users (e.g. Surface Pro) no longer need touch scrolling to see the full set of tradition columns
- **Research mode summary placement** — Updated the Research system prompt so the AI leads with a brief summary of commonalities and differences before the detailed per-tradition analysis, instead of placing the summary at the end
- **Research mode Sources sidebar — too few / mismatched citations** — The Sources sidebar sometimes showed only one citation (e.g. a single Orthodox entry for a question that discussed Roman Catholic, Westminster, and Orthodox positions) and sometimes showed a quote unrelated to the question (e.g. a justification quote for a Scripture question). Root cause: the citation extractor was called in parallel with the answer generator and only saw the raw user question, with a weak prompt that did not require topical grounding or multi-tradition coverage. Fixed by (1) sequencing the citation call after the answer so the extractor is given both the question and the answer for grounding, and (2) tightening `CITATION_PROMPT` to require one citation per relevant tradition, to forbid off-topic quotes, and to require omitting the `REFERENCE` location instead of hallucinating when the exact chapter/article is not known
- **Research mode Sources sidebar — follow-up architecture fix** — The previous two-call sequencing fix above did not fully resolve the problem (a subsequent test on a Scripture question still returned only the 39 Articles, with a quote about justification by faith). Root cause: any separate "citation" generation is a fresh completion in which the model can drift to a different doctrine, even when given the prior answer as context. Replaced the two-call architecture with a single structured-JSON call that produces the summary, the narrative answer, and the citations array in one generation. The frontend now sends `mode: "research_json"` so the backend sets `response_format: { type: "json_object" }`, and the new `RESEARCH_JSON_PROMPT` includes an explicit bad-example forbidding off-topic quotes (e.g. emitting a justification quote for a Scripture question). Citations are now structurally bound to the doctrine the model just wrote about
- **"1 references" grammar** — The Sources sidebar header pluralized incorrectly when the count was 1. Now renders as "1 reference" / "N references" in English and "1 Referenz" / "N Referenzen" in German

### Changed

- **About page branding** — Replaced remaining "CACR" references with the correct app abbreviation "CCCR" (Creeds, Confessions and Catechism Research) in the English and German About descriptions and footer copyright

## [2026-04-14]

### Added

- **German confession texts (Batch 1)** — Original German texts for Heidelberg Catechism (Heidelberger Katechismus), Augsburg Confession (Augsburger Bekenntnis), and 3 Ecumenical Creeds (Apostolisches, Nicänisches, Athanasianisches Glaubensbekenntnis)
- **German confession texts (Batch 2)** — German translations for Westminster Confession (Westminsterbekenntnis), 1689 Baptist Confession, 39 Articles, Roman Catechism (Römischer Katechismus), Orthodox Catechism, and conciliar definitions (Chalcedon, Constantinople I/II/III)
- **German text integration in Browse mode** — When language is set to German, Browse mode displays German confession titles and texts with automatic fallback to English for any missing translations
- **Feedback system** — In-app feedback submission (suggestion, bug, content) with Supabase backend; `api/feedback.js` Vercel serverless endpoint prepared for email notifications via Zoho SMTP
- Frontend now also POSTs to `/api/feedback` after Supabase insert, so enabling email later requires no frontend changes

### Fixed

- Feedback submission now correctly inserts into Supabase `suggestions` table with proper error handling — users see a clear message on failure instead of silent errors
- Anonymous submissions send `"anonymous"` as user_email instead of null

## [2026-04-06]

### Added

- Filioque historical note added to the Nicene Creed (section 6), explaining the Western addition of "and the Son" and its role in the East-West Schism of 1054

### Changed

- Updated Welcome page Browse description and Compare loading text to explicitly mention creeds alongside confessions and catechisms
- Updated Research mode placeholder to include "creed" in the prompt hint

## [2026-04-04]

### Changed

- Organization formally named **Stein Street Solutions (SSS)** — all project documentation updated to reflect the new name
- Migrated notebook storage from localStorage to Supabase — notes are now per-user, private, and persisted server-side
- Notes load automatically when the user signs in and reload on session change
- Authentication is now optional — users go directly into the app after the welcome screen
- Sign-in is only prompted when saving notes; a "Sign In" button is available in the header
- All auth code (Supabase, Google Sign-In, email/password) remains intact, just no longer required to browse or research

## [2026-04-03]

### Added

- Set up support@ccc-study.org via Zoho Mail (free tier)
- Configured DNS records: MX (mx.zoho.eu, mx2.zoho.eu, mx3.zoho.eu), SPF, and DKIM for email deliverability

## [2026-04-02]

### Fixed

- Corrected misleading Anthropic/Claude references in deployment docs and backend comments to correctly reference OpenAI (the actual API provider)

### Added

- SEO meta tags in index.html: description, keywords, canonical URL, Open Graph (og:title, og:description, og:type, og:url, og:site_name), and Twitter card tags
- Welcome page now mentions "creeds" alongside confessions and catechisms

## [2026-03-31]

### Added

- Renamed app from "Confession and Catechism Research" to "Creeds, Confessions and Catechism Research"
- Added 6 ecumenical creeds: Apostles' Creed, Athanasian Creed, Definition of Chalcedon, Constantinople I Canons, Constantinople II Anathemas, Constantinople III Definition of Faith (Nicene Creed was already present)
- Added the full Roman Catechism (Catechism of the Council of Trent, 1566) as the Catholic tradition source — 42 chapters, 2,171 sections
- Updated system prompt to reference Roman Catechism as primary Catholic source, with CCC (1992) available from AI general knowledge
- Added note under Roman Catechism in sidebar informing users that AI may also reference the modern CCC
- Updated Browse mode heading to "Browse the Source Texts"
- Updated Browse mode subtext to use generic "document" instead of "confession"
- Updated header subtitle to include "Ecumenical Creeds"

## [2026-04-01]

### Added

- Supabase authentication (email/password + Google Sign-In)
- Auth screen styled to match app design (Georgia serif, cream/brown/gold palette)
- User email display and Sign Out button in header
- App flow: Welcome page → Start Exploring → Auth (if not logged in) → Main app

### Changed

- Daily AI query limit increased from 5 to 7 for free users
- Added VIP session bypass via URL parameter for unlimited queries

## Pre-2026-03-31

### Initial Build

- Core app with Browse, Research, and Compare modes
- 7 source texts: Westminster Confession, Heidelberg Catechism, Augsburg Confession, 1689 Baptist Confession, Nicene Creed, Longer Catechism (Orthodox), 39 Articles
- AI-powered research and cross-tradition comparison via OpenAI API
- Tradition-based color coding for 7 traditions
- Client-side daily AI query rate limiting
- Welcome/landing page
- Mobile-responsive layout
- Notebook feature (localStorage)
- Custom domain ccc-study.org configured
- Deployed on Vercel with GitHub integration
