# Changelog

All notable changes to the Creeds, Confessions and Catechism Research app.  
Maintained by **Stein Street Solutions (SSS)**.

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
