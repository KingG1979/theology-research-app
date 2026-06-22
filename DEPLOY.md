# Deployment Guide

**Stein Street Solutions (SSS)**

Follow these steps to get your app live on the internet.
The whole process takes about 30-45 minutes the first time.

---

## What you need before starting

- A free GitHub account (github.com)
- A free Vercel account (vercel.com) - sign up with your GitHub account
- Your OpenAI API key (platform.openai.com)
- (Optional) A Zoho mailbox + app password if you want the in-app Feedback form to email you
- (Optional) A Supabase project if you want the experimental Church Fathers search

---

## Step 1 - Upload your code to GitHub

1. Go to github.com and sign in
2. Click the "+" button (top right) and choose "New repository"
3. Name it: theology-research-app
4. Keep it Private
5. Click "Create repository"
6. On the next screen, click "uploading an existing file"
7. Upload ALL the files from this folder, keeping the folder structure:
   - index.html
   - package.json
   - vite.config.js
   - vercel.json
   - src/ (entire folder)
   - api/ (entire folder)
   - scripts/ (entire folder)
   - supabase/ (entire folder)
8. Click "Commit changes"

---

## Step 2 - Deploy to Vercel

1. Go to vercel.com and sign in with GitHub
2. Click "Add New Project"
3. Find your theology-research-app repository and click "Import"
4. Vercel will detect it is a Vite project automatically
5. Before clicking Deploy, click "Environment Variables"
6. Add the variables below. Only `OPENAI_API_KEY` is required - everything else is optional and enables additional features.

   **Required**

   Name: OPENAI_API_KEY
   Value: (paste your OpenAI API key here)

   **Optional - in-app feedback email (Zoho SMTP)**

   Name: ZOHO_EMAIL
   Value: (your Zoho mailbox address, e.g. support@ccc-study.org)

   Name: ZOHO_PASSWORD
   Value: (Zoho app password for that mailbox)

   **Optional - Church Fathers search (experimental)**

   Name: SUPABASE_URL
   Value: (your Supabase project URL)

   Name: SUPABASE_ANON_KEY
   Value: (your Supabase anonymous key)

7. Click "Deploy"
8. Wait about 60 seconds
9. Vercel gives you a URL like: theology-research-app.vercel.app

The app is open by default - there is no password gate. Anyone with the URL can use it.

---

## Step 3 - Share the URL

Just send testers the URL (e.g. theology-research-app.vercel.app or your custom domain). No password is needed.

---

## Updating the app in future

When you want to make changes:
1. Edit the files on your computer
2. Go to your GitHub repository
3. Upload the changed files (it will ask you to confirm overwriting)
4. Vercel automatically detects the change and re-deploys within 60 seconds

No extra steps needed - GitHub and Vercel stay in sync automatically.

---

## Costs

- GitHub: Free
- Vercel: Free for personal projects (Hobby tier covers hosting, Web Analytics, and Speed Insights)
- OpenAI API: Pay per use. For a small Beta group doing research,
  expect less than $5/month. You can set spending limits at platform.openai.com
- Zoho Mail: Free tier covers the support mailbox
- Supabase: Free tier is sufficient for the experimental Fathers search

---

## Optional - enabling the experimental Church Fathers search

This surface is off by default. To turn it on:

1. Create a Supabase project and add `SUPABASE_URL` + `SUPABASE_ANON_KEY` to Vercel (Step 2).
2. In the Supabase SQL Editor, run `supabase/migration.sql` to create the `church_fathers_chunks` table, pgvector extension, and the `search_fathers` RPC.
3. Locally, populate the corpus and embeddings:
   ```
   python3 scripts/collect-texts.py
   OPENAI_API_KEY=sk-... \
   SUPABASE_URL=https://xxx.supabase.co \
   SUPABASE_SERVICE_ROLE_KEY=eyJ... \
   node scripts/generate-embeddings.js
   ```
   The `SUPABASE_SERVICE_ROLE_KEY` is used only by this script for bulk inserts - do not add it to Vercel and never expose it to the browser.

---

## If something goes wrong

- Vercel shows you build logs - errors appear there in plain English
- The most common issue is an environment variable name typo
- Double-check `OPENAI_API_KEY` (and any optional vars you set) are spelled exactly right
- If the Feedback form returns an error, verify `ZOHO_EMAIL` / `ZOHO_PASSWORD` are set and that the password is a Zoho app password, not the account login password
- If the Church Fathers tab shows a setup-instructions placeholder, the Supabase env vars are missing or misspelled
