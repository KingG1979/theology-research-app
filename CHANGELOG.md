# Changelog

All notable changes to the Creeds, Confessions and Catechism Research app.

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
