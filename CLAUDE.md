# CLAUDE.md — CCCR (Creeds, Confessions & Catechism Research)

## Who I am

- **Name:** Grant McLaren (and Steffi). Based in Heidenau, Sachsen, Germany. Bilingual EN/DE — **always respond in English** unless I ask otherwise.
- **Background:** Transitioning from electrician work to building software with AI assistance. Intermediate JS/TS + SQL.
- **Studio:** Stein Street Solutions (SSS) — CCCR is one of two active apps.

## Project at a glance

- **Product:** Confession & Catechism Research — a theology research SaaS for browsing, researching, and comparing Christian confessions/catechisms across traditions.
- **Old name:** CACR is deprecated. Current name: **CCCR** ("Creeds, Confessions and Catechism Research"). Title/UI rename still pending in places — check `App.jsx`, `index.html`, and the system prompt in `prompts.js`.
- **Domain:** [ccc-study.org](https://ccc-study.org) (also live at `theology-research-app.vercel.app`).
- **Repo:** `github.com/KingG1979/theology-research-app`.

## Stack

| Layer | Tech |
|---|---|
| Frontend | React + Vite |
| Hosting | Vercel (custom domain `ccc-study.org`, DNS managed in Vercel) |
| Backend / DB | Supabase project `ccc-study` (EU region, RLS on, Data API enabled) |
| AI backend | Currently OpenAI API; **migration to Perplexity Sonar API in progress** (OpenAI-compatible — base URL + model name swap, A/B behind an env flag) |
| Email | `support@ccc-study.org` on Zoho Mail free tier (`mail.zoho.eu`); MX/SPF/DKIM in Vercel DNS |
| Source control | GitHub — push code changes directly to branches on the repo above |

## What's already shipped

- Browse / Research / Compare modes all functional and deployed
- 7 confessions/catechisms loaded as static data in `src/data/confessions.js`: Westminster, Heidelberg, Augsburg, 1689 Baptist, Nicene Creed, Longer Catechism (Orthodox), 39 Articles
- AI-powered research + cross-tradition comparison with citation extraction
- Tradition-based color coding (Reformed / Lutheran / Catholic / Baptist / Ecumenical / Orthodox / Anglican)
- Client-side rate limit: 5 AI queries per day per browser via localStorage
- Welcome/landing page with "Start Exploring"
- Mobile-responsive layout
- Notebook feature (notes saved via localStorage)

## What still needs doing — Stage 1

Ordered by priority:

1. **Rename to "Creeds, Confessions and Catechism Research"** — `App.jsx`, `index.html`, and system prompt in `prompts.js`.
2. **Add the remaining ecumenical creeds** to `src/data/confessions.js` in the existing chapter/section format: Apostles' Creed, Athanasian Creed, Chalcedonian Definition, plus conciliar definitions from Constantinople I, II, and III. (Nicene Creed already in.)
3. **User authentication** — required before anything below. No way to identify users currently.
4. **Persistent backend / DB tables** — auth users, usage tracking, eventually the Church Fathers RAG index. Supabase is already provisioned; Postgres + pgvector is the working plan.
5. **Monetization / billing** — no payment system yet. Needed to break even on API costs.
6. **VIP / whitelist bypass** — once auth exists, whitelist of emails that skip the 5/day limit. Interim option: secret URL parameter.
7. **API provider mismatch** — frontend references Claude in places, backend calls OpenAI. Fix as part of the Perplexity migration so the UI matches reality.

## Stage 2 (deferred)

- **Church Fathers RAG** — Augustine, Athanasius, others. Design done, no persistent index built yet. Kept out of Stage 1 to stay lean on budget.
- SEO + landing page polish (meta tags, titles, descriptions reflecting new name).

## Workflow preferences

- Push code **directly to branches** on the GitHub repo — don't just paste diffs in chat.
- I use directive prompts like `fix then merge` and `review`. Treat these as commands, not suggestions.
- Iterate: backend → content → UI → docs → Vercel deploy.
- Keep the Vercel setup centralized and simple. Don't sprawl projects.
- Budget-conscious solo dev — avoid expensive autonomous-agent loops; prefer one focused pass.

## Known quirks

- Rate limit lives in localStorage — anyone can clear it. Known. Replacement is part of auth work.
- `ccc-study` Supabase has RLS enabled by default; respect it when adding tables.
