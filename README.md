# Creeds, Confessions and Catechism Research (CCCR)

## About

A web-based theology research tool for scholars, teachers, and educated laypeople. Browse, compare, and research historic Christian creeds, confessions, and catechisms across traditions — with AI-powered commentary and cross-tradition comparison.

Live at: https://ccc-study.org

## Features

- **Browse Mode** — Read the full text of historic creeds, confessions, and catechisms
- **Research Mode** — Ask AI-powered questions about doctrine with cited sources
- **Compare Mode** — Side-by-side comparison of how different traditions address the same doctrine
- **Notebook** — Save personal notes (stored locally in browser)
- 7 traditions covered: Reformed, Lutheran, Catholic, Baptist, Ecumenical, Orthodox, Anglican

## Source Texts Included

### Ecumenical Creeds

- Nicene Creed (325/381)
- Apostles' Creed (c. 4th century)
- Athanasian Creed (c. 5th century)
- Definition of Chalcedon (451)
- First Council of Constantinople — Canons (381)
- Second Council of Constantinople — Anathemas (553)
- Third Council of Constantinople — Definition of Faith (681)

### Confessions & Catechisms

- Westminster Confession of Faith (1647) — Reformed
- Heidelberg Catechism (1563) — Reformed
- Augsburg Confession (1530) — Lutheran
- 1689 Baptist Confession — Baptist
- Roman Catechism / Catechism of the Council of Trent (1566) — Catholic
- Longer Catechism (1839) — Orthodox
- 39 Articles (1571) — Anglican

Note: For the Catholic tradition, the Roman Catechism is the primary embedded source. The AI may also reference the modern Catechism of the Catholic Church (1992) from its general knowledge where teaching has developed, but always distinguishes between the two. The CCC is copyrighted by the Holy See / USCCB and is not embedded in the app.

## Tech Stack

- **Frontend:** React + Vite
- **AI Backend:** OpenAI API (via Vercel serverless function at api/chat.js)
- **Authentication:** Supabase Auth (email/password + Google Sign-In)
- **Hosting:** Vercel
- **Domain:** ccc-study.org (registered via Vercel)

## Accounts & Services

| Service | Purpose | URL |
|---------|---------|-----|
| Vercel | Hosting + domain registrar | vercel.com |
| GitHub | Source code repository | github.com/KingG1979/theology-research-app |
| Supabase | Authentication + database | faewrhljljuactdxwema.supabase.co |
| OpenAI | AI API for research/commentary | platform.openai.com |
| Google Cloud Console | OAuth credentials for Google Sign-In | console.cloud.google.com |
| Zoho Mail | Support email (support@ccc-study.org) | mail.zoho.eu |

## Environment Variables (Vercel)

- `OPENAI_API_KEY` — OpenAI API key for the chat backend

## Local Development

```
npm install
npm run dev
```

## Deployment

Push to `main` branch — Vercel auto-deploys.
