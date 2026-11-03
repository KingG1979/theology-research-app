#!/usr/bin/env node
/**
 * Church Fathers embedding loader (OpenAI -> Supabase).
 *
 * Reads the chunk JSON written by scripts/collect-athanasius.py, embeds each
 * chunk with OpenAI text-embedding-3-small (1536 dimensions), and inserts the
 * rows into the live `church_fathers_chunks` table:
 *   author, work, section_ref, translator, content, embedding
 *
 * Usage (Node 20.6+ reads the .env file itself):
 *   node --env-file=.env scripts/generate-embeddings.js [chunks.json] [--dry-run] [--replace] [--limit N]
 *
 * Required in .env (not needed for --dry-run):
 *   OPENAI_API_KEY, SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY
 *
 * Safety: if rows for the author already exist, the script stops unless you
 * pass --replace, which deletes that author's rows first. It also stops on the
 * first failed batch instead of skipping it, so a half-loaded run is obvious.
 */

const fs = require('fs');

const EMBEDDING_MODEL = 'text-embedding-3-small';
const EMBED_DIM = 1536;
const BATCH_SIZE = 64;

const args = process.argv.slice(2);
const flag = (name) => args.includes(name);
const limitIdx = args.indexOf('--limit');
const LIMIT = limitIdx >= 0 ? parseInt(args[limitIdx + 1], 10) : 0;
const positional = args.filter((a, i) => !a.startsWith('--') && !(limitIdx >= 0 && i === limitIdx + 1));
const inputPath = positional[0] || 'church-fathers-data/athanasius_chunks.json';
const DRY_RUN = flag('--dry-run');
const REPLACE = flag('--replace');

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const SUPABASE_URL = (process.env.SUPABASE_URL || '').replace(/\/+$/, '');
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function fetchRetry(url, options, label, tries = 5) {
  let lastErr;
  for (let attempt = 1; attempt <= tries; attempt++) {
    try {
      const res = await fetch(url, options);
      if (res.ok) return res;
      const body = await res.text();
      lastErr = new Error(`${label} failed (${res.status}): ${body.slice(0, 300)}`);
      // Retry only rate limits and server errors; quota/auth/schema errors will not fix themselves.
      if (res.status !== 429 && res.status < 500) throw lastErr;
      if (res.status === 429 && /insufficient_quota/.test(body)) throw lastErr;
    } catch (err) {
      lastErr = err;
      if (/failed \((4\d\d)\)/.test(String(err.message)) && !/\(429\)/.test(String(err.message))) throw err;
      if (/insufficient_quota/.test(String(err.message))) throw err;
    }
    await sleep(1000 * 2 ** attempt);
  }
  throw lastErr;
}

async function embed(texts) {
  const res = await fetchRetry(
    'https://api.openai.com/v1/embeddings',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${OPENAI_API_KEY}` },
      body: JSON.stringify({ model: EMBEDDING_MODEL, input: texts }),
    },
    'OpenAI embeddings'
  );
  const data = (await res.json()).data;
  const vectors = data.sort((a, b) => a.index - b.index).map((d) => d.embedding);
  for (const v of vectors) {
    if (v.length !== EMBED_DIM) {
      throw new Error(`Embedding has ${v.length} dimensions, table expects ${EMBED_DIM}.`);
    }
  }
  return vectors;
}

const sbHeaders = (extra = {}) => ({
  'Content-Type': 'application/json',
  apikey: SERVICE_KEY,
  Authorization: `Bearer ${SERVICE_KEY}`,
  ...extra,
});

async function countRows(author) {
  const res = await fetchRetry(
    `${SUPABASE_URL}/rest/v1/church_fathers_chunks?select=id&author=eq.${encodeURIComponent(author)}&limit=1`,
    { headers: sbHeaders({ Prefer: 'count=exact' }) },
    'Supabase count'
  );
  const range = res.headers.get('content-range') || '*/0';
  return parseInt(range.split('/')[1], 10) || 0;
}

async function deleteRows(author) {
  await fetchRetry(
    `${SUPABASE_URL}/rest/v1/church_fathers_chunks?author=eq.${encodeURIComponent(author)}`,
    { method: 'DELETE', headers: sbHeaders({ Prefer: 'return=minimal' }) },
    'Supabase delete'
  );
}

async function insertRows(rows) {
  await fetchRetry(
    `${SUPABASE_URL}/rest/v1/church_fathers_chunks`,
    { method: 'POST', headers: sbHeaders({ Prefer: 'return=minimal' }), body: JSON.stringify(rows) },
    'Supabase insert'
  );
}

function validate(chunks) {
  const required = ['author', 'work', 'section_ref', 'translator', 'content'];
  chunks.forEach((c, i) => {
    for (const k of required) {
      if (typeof c[k] !== 'string' || !c[k].trim()) {
        throw new Error(`Chunk ${i} is missing "${k}". Re-run scripts/collect-athanasius.py.`);
      }
    }
  });
}

async function main() {
  let chunks = JSON.parse(fs.readFileSync(inputPath, 'utf-8'));
  if (LIMIT > 0) chunks = chunks.slice(0, LIMIT);
  validate(chunks);

  const authors = [...new Set(chunks.map((c) => c.author))];
  const chars = chunks.reduce((n, c) => n + c.content.length, 0);
  console.log(`\nInput:    ${inputPath}`);
  console.log(`Chunks:   ${chunks.length} (${authors.join(', ')})`);
  console.log(`Model:    ${EMBEDDING_MODEL} (${EMBED_DIM} dims)`);
  console.log(`Est cost: about $${((chars / 4 / 1e6) * 0.02).toFixed(2)}\n`);

  if (DRY_RUN) {
    console.log('Dry run, nothing sent.');
    return;
  }

  const missing = ['OPENAI_API_KEY', 'SUPABASE_URL', 'SUPABASE_SERVICE_ROLE_KEY'].filter((k) => !process.env[k]);
  if (missing.length) {
    console.error(`Missing in .env: ${missing.join(', ')}`);
    process.exit(1);
  }

  for (const author of authors) {
    const existing = await countRows(author);
    if (existing > 0 && !REPLACE) {
      console.error(`${existing} rows for "${author}" already exist. Re-run with --replace to delete and reload them.`);
      process.exit(1);
    }
    if (existing > 0) {
      console.log(`Deleting ${existing} existing rows for "${author}"...`);
      await deleteRows(author);
    }
  }

  const start = Date.now();
  let done = 0;
  for (let i = 0; i < chunks.length; i += BATCH_SIZE) {
    const batch = chunks.slice(i, i + BATCH_SIZE);
    const vectors = await embed(batch.map((c) => c.content));
    const rows = batch.map((c, j) => ({
      author: c.author,
      work: c.work,
      section_ref: c.section_ref,
      translator: c.translator,
      content: c.content,
      embedding: '[' + vectors[j].join(',') + ']',
    }));
    try {
      await insertRows(rows);
    } catch (err) {
      console.error(`\nStopped after ${done} of ${chunks.length} rows. ${err.message}`);
      console.error('Fix the cause, then re-run with --replace to reload cleanly.');
      process.exit(1);
    }
    done += batch.length;
    const secs = ((Date.now() - start) / 1000).toFixed(0);
    console.log(`  ${done}/${chunks.length} (${((done / chunks.length) * 100).toFixed(1)}%), ${secs}s`);
  }
  console.log(`\nDone. Loaded ${done} chunks.`);
}

main().catch((err) => {
  console.error('\n' + err.message);
  process.exit(1);
});
