# Confession and Catechism Research — Deployment Guide

## Quick Deploy (Existing Features)

1. Push to GitHub
2. Connect to Vercel
3. Set environment variables:
   - `APP_PASSWORD` — Password for accessing the app
   - `OPENAI_API_KEY` — OpenAI API key (for GPT-4o)

## Church Fathers RAG Setup

The Church Fathers feature requires a Supabase database with vector embeddings.
Without it, the existing confessions features work normally — the Fathers tab
will show a "Database not configured" message.

### Step 1: Create Supabase Project

1. Go to [supabase.com](https://supabase.com) and create a free account
2. Create a new project (free tier is sufficient)
3. Note your **Project URL** and **API keys** (Settings > API)

### Step 2: Run the Database Migration

1. In Supabase, go to SQL Editor
2. Copy and paste the contents of `supabase/migration.sql`
3. Run the SQL — this creates the table, indexes, and search function

### Step 3: Collect the Church Fathers Texts

```bash
# From the project root:
python3 scripts/collect-texts.py
python3 scripts/cleanup-chunks.py
```

This downloads and processes texts from newadvent.org (public domain).
Output goes to `church-fathers-data/all_chunks.json`.

Current pilot: St. Augustine (48 works) and St. Athanasius (20 works).

### Step 4: Generate Embeddings and Upload

```bash
OPENAI_API_KEY=sk-... \
SUPABASE_URL=https://xxx.supabase.co \
SUPABASE_SERVICE_ROLE_KEY=eyJ... \
node scripts/generate-embeddings.js church-fathers-data/all_chunks.json
```

This generates vector embeddings and uploads everything to Supabase.
Cost: approximately $2-5 for the full pilot corpus (~14,000 chunks).

### Step 5: Add Vercel Environment Variables

Add these to your Vercel project settings:
- `SUPABASE_URL` — Your Supabase project URL (e.g., https://xxx.supabase.co)
- `SUPABASE_ANON_KEY` — Your Supabase anonymous/public key

### Estimated Costs

| Service | Cost |
|---------|------|
| Supabase (free tier) | $0 |
| OpenAI embeddings (one-time) | ~$2-5 |
| OpenAI GPT-4o queries | Per-use |

## Architecture

```
┌─────────────┐     ┌──────────┐     ┌───────────┐
│  React SPA  │────▶│  Vercel  │────▶│  OpenAI   │
│  (Vite)     │     │  API     │     │  GPT-4o   │
└─────────────┘     └──────────┘     └───────────┘
                         │
                         ▼
                    ┌───────────┐
                    │ Supabase  │
                    │ pgvector  │
                    └───────────┘
```

### RAG Flow
1. User asks a question in Fathers mode
2. Backend generates an embedding for the query (OpenAI)
3. Searches Supabase for semantically similar passages
4. Injects top passages into GPT-4o prompt as context
5. Returns AI response grounded in actual patristic texts
