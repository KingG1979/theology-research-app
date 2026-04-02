# Deployment Guide

Follow these steps to get your app live on the internet.
The whole process takes about 30-45 minutes the first time.

---

## What you need before starting

- A free GitHub account (github.com)
- A free Vercel account (vercel.com) - sign up with your GitHub account
- Your OpenAI API key (platform.openai.com)
- A password you want to use for Beta access

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
   - src/main.jsx
   - src/App.jsx
   - api/chat.js
8. Click "Commit changes"

---

## Step 2 - Deploy to Vercel

1. Go to vercel.com and sign in with GitHub
2. Click "Add New Project"
3. Find your theology-research-app repository and click "Import"
4. Vercel will detect it is a Vite project automatically
5. Before clicking Deploy, click "Environment Variables"
6. Add these two variables:

   Name: OPENAI_API_KEY
   Value: (paste your OpenAI API key here)

   Name: APP_PASSWORD
   Value: (choose a password for your Beta testers)

7. Click "Deploy"
8. Wait about 60 seconds
9. Vercel gives you a URL like: theology-research-app.vercel.app

---

## Step 3 - Share with Beta testers

Send your testers:
- The URL (e.g. theology-research-app.vercel.app)
- The password you set in Step 2

That is it. They open the URL, enter the password, and they are in.

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
- Vercel: Free for personal projects
- OpenAI API: Pay per use. For a small Beta group doing research,
  expect less than $5/month. You can set spending limits at platform.openai.com

---

## If something goes wrong

- Vercel shows you build logs - errors appear there in plain English
- The most common issue is an environment variable name typo
- Double-check OPENAI_API_KEY and APP_PASSWORD are spelled exactly right
