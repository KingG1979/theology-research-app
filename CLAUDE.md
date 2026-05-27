# CLAUDE.md — CCCR (Creeds, Confessions & Catechism Research)

## Who I am

- **Name:** Grant McLaren (and Steffi). Based in Heidenau, Sachsen, Germany. Bilingual EN/DE — **always respond in English** unless I ask otherwise.
- **Background:** Transitioning from electrician work to building software with AI assistance. Intermediate JS/TS + SQL.
- **Studio:** Stein Street Solutions (SSS) — CCCR is one of two active apps.

## Project at a glance

- **Product:** Creeds, Confessions and Catechism Research — a theology research SaaS for browsing, researching, and comparing Christian creeds, confessions, and catechisms across traditions.
- **Old name:** CACR is deprecated. Current name is **CCCR**. Rename is done in `index.html`, `og:site_name`, and `package.json`. The `localStorage` keys still use the `cacr-` prefix intentionally — renaming them would wipe existing users' welcome/usage state.
- **Domain:** [ccc-study.org](https://ccc-study.org) (also live at `theology-research-app.vercel.app`).
- **Repo:** `github.com/KingG1979/theology-research-app`.

## Stack

| Layer | Tech |
|---|---|
| Frontend | React + Vite |
| Hosting | Vercel (custom domain `ccc-study.org`, DNS managed in Vercel) |
| Backend / DB | Supabase project `ccc-study` (EU region, RLS on, Data API enabled) |
| AI backend | OpenAI gpt-4o by default; **Perplexity Sonar ready** — set `USE_PERPLEXITY=true` + `PERPLEXITY_API_KEY` in Vercel to switch. Embeddings always use OpenAI (no Perplexity embeddings endpoint). |
| Email | `support@ccc-study.org` on Zoho Mail free tier (`mail.zoho.eu`); MX/SPF/DKIM in Vercel DNS |
| Source control | GitHub — push code changes directly to branches on the repo above |

## What's already shipped

- Browse / Research / Compare modes all functional and deployed
- **16+ confessions/catechisms** loaded as static data in `src/data/confessions.js` (EN) and `src/data/confessions_de.js` / `src/data/confessions_de_extra.js` (DE): Westminster, Heidelberg, Augsburg, 1689 Baptist, Nicene Creed, Longer Catechism (Orthodox), 39 Articles, Roman Catechism, Apostles' Creed, Athanasian Creed, Definition of Chalcedon, Constantinople I/II/III councils, Belgic Confession, Canons of Dort, Second Helvetic Confession
- AI-powered research + cross-tradition comparison with citation extraction (structured JSON mode)
- Tradition-based color coding (Reformed / Lutheran / Catholic / Baptist / Ecumenical / Orthodox / Anglican)
- **User authentication** — email/password + Google OAuth via Supabase (`AuthScreen` in `App.jsx`)
- **Notebook** — notes saved to Supabase `notes` table (per auth user)
- **Feedback** — submissions saved to Supabase `suggestions` table + email notification via Zoho
- Client-side rate limit: 5 AI queries per day per browser (localStorage key `cacr-ai-usage`)
- VIP bypass via `?vip=blessed` URL param (sessionStorage key `cacr-vip`)
- Welcome/landing page with "Start Exploring"
- Mobile-responsive layout
- Deep-link routing for Browse mode (full URL management via `history.replaceState`)
- i18n support (EN/DE) via `src/i18n/`

## What still needs doing — Stage 1

Ordered by priority:

1. **Monetization / billing** — no payment system yet. Needed to break even on API costs.
2. **VIP / whitelist bypass** — whitelist of emails that skip the 5/day limit (auth is done, so this is now unblocked). Interim: `?vip=blessed` URL param exists.
3. **Perplexity migration go-live** — code is ready (`USE_PERPLEXITY` env flag in `api/chat.js`). Just set `USE_PERPLEXITY=true` and `PERPLEXITY_API_KEY` in Vercel to activate.
4. **Usage tracking in DB** — rate limit still lives in localStorage. Move to Supabase now that auth exists.
5. **Church Fathers RAG** (Stage 2 promoted) — `FathersTab.jsx` was removed (orphaned). The backend RAG logic in `api/chat.js` is ready; needs the Supabase vector index populated and the tab wired back into `App.jsx`.

## Stage 2 (deferred)

- **Church Fathers RAG** — Augustine, Athanasius, others. Backend design done (`api/chat.js`, `api/search.js`, `scripts/generate-embeddings.js`). No persistent index built yet; `FathersTab.jsx` was removed as dead code until this is ready to ship.
- SEO + landing page polish (meta tags, titles, descriptions).

## Workflow preferences

- Push code **directly to branches** on the GitHub repo — don't just paste diffs in chat.
- I use directive prompts like `fix then merge` and `review`. Treat these as commands, not suggestions.
- Iterate: backend → content → UI → docs → Vercel deploy.
- Keep the Vercel setup centralized and simple. Don't sprawl projects.
- Budget-conscious solo dev — avoid expensive autonomous-agent loops; prefer one focused pass.

## Known quirks

- Rate limit lives in localStorage (`cacr-ai-usage`) — anyone can clear it. Known. Move to Supabase is part of Stage 1 cleanup.
- `localStorage` keys use old `cacr-` prefix (e.g. `cacr-welcomed`, `cacr-lang`, `cacr-vip`). Intentionally not renamed to avoid wiping existing users' state.
- `ccc-study` Supabase has RLS enabled by default; respect it when adding tables.
- `api/feedback.js` uses nodemailer with Zoho SMTP — if Zoho password changes, update `ZOHO_PASSWORD` in Vercel.

## Environment variables

See `.env.example` for the full list. Required in production Vercel:
- `OPENAI_API_KEY` — always required (completions + RAG embeddings)
- `SUPABASE_URL`, `SUPABASE_ANON_KEY` — server-side Supabase access
- `ZOHO_EMAIL`, `ZOHO_PASSWORD` — feedback email notifications
- `USE_PERPLEXITY`, `PERPLEXITY_API_KEY` — optional, to activate Perplexity Sonar
