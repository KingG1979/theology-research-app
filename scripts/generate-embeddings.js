#!/usr/bin/env node
/**
 * Church Fathers Embedding Pipeline
 * 
 * Reads chunked text data, generates embeddings via OpenAI,
 * and stores everything in Supabase.
 * 
 * Usage:
 *   OPENAI_API_KEY=sk-... SUPABASE_URL=https://xxx.supabase.co SUPABASE_SERVICE_ROLE_KEY=eyJ... \
 *   node scripts/generate-embeddings.js [path-to-chunks.json]
 * 
 * The chunks JSON should be an array of objects with:
 *   { father_name, work_title, era, chapter, chunk_index, text }
 */

const fs = require('fs');
const path = require('path');

// --- Configuration ---
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const EMBEDDING_MODEL = 'text-embedding-3-small';
const BATCH_SIZE = 50;  // OpenAI allows up to 2048 inputs per request
const SUPABASE_INSERT_BATCH = 100;

if (!OPENAI_API_KEY || !SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error('Missing required environment variables:');
  console.error('  OPENAI_API_KEY, SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

// --- Helpers ---

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function generateEmbeddings(texts) {
  const response = await fetch('https://api.openai.com/v1/embeddings', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: EMBEDDING_MODEL,
      input: texts,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`OpenAI API error (${response.status}): ${error}`);
  }

  const data = await response.json();
  return data.data.map(d => d.embedding);
}

async function insertToSupabase(rows) {
  const response = await fetch(`${SUPABASE_URL}/rest/v1/church_fathers_chunks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'apikey': SUPABASE_SERVICE_ROLE_KEY,
      'Authorization': `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
      'Prefer': 'return=minimal',
    },
    body: JSON.stringify(rows),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Supabase insert error (${response.status}): ${error}`);
  }
}

// --- Main Pipeline ---

async function main() {
  const inputPath = process.argv[2] || 'church-fathers-data/all_chunks.json';
  
  console.log(`\n=== Church Fathers Embedding Pipeline ===`);
  console.log(`Input: ${inputPath}`);
  console.log(`Model: ${EMBEDDING_MODEL}`);
  console.log(`Supabase: ${SUPABASE_URL}\n`);

  // Load chunks
  const rawData = fs.readFileSync(inputPath, 'utf-8');
  const chunks = JSON.parse(rawData);
  console.log(`Loaded ${chunks.length} chunks\n`);

  let processed = 0;
  let failed = 0;
  const startTime = Date.now();

  // Process in batches
  for (let i = 0; i < chunks.length; i += BATCH_SIZE) {
    const batch = chunks.slice(i, i + BATCH_SIZE);
    const texts = batch.map(c => c.text);

    try {
      // Generate embeddings
      const embeddings = await generateEmbeddings(texts);

      // Prepare rows for Supabase
      const rows = batch.map((chunk, idx) => ({
        father_name: chunk.father_name,
        work_title: chunk.work_title,
        era: chunk.era,
        chapter: chunk.chapter,
        chunk_index: chunk.chunk_index,
        content: chunk.text,
        embedding: JSON.stringify(embeddings[idx]),
      }));

      // Insert into Supabase
      await insertToSupabase(rows);

      processed += batch.length;
      const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
      const rate = (processed / parseFloat(elapsed)).toFixed(1);
      const pct = ((processed / chunks.length) * 100).toFixed(1);
      console.log(`  [${pct}%] ${processed}/${chunks.length} chunks (${rate}/s, ${elapsed}s elapsed)`);

      // Rate limiting: ~3 requests per second to stay under OpenAI limits
      await sleep(350);
    } catch (error) {
      console.error(`  ERROR at batch starting at index ${i}: ${error.message}`);
      failed += batch.length;
      // Wait longer on errors (might be rate limit)
      await sleep(5000);
    }
  }

  const totalTime = ((Date.now() - startTime) / 1000).toFixed(1);
  console.log(`\n=== Complete ===`);
  console.log(`Processed: ${processed}`);
  console.log(`Failed: ${failed}`);
  console.log(`Time: ${totalTime}s`);
  console.log(`Rate: ${(processed / parseFloat(totalTime)).toFixed(1)} chunks/s`);
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
