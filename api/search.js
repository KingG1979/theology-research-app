// ============================================================
// Church Fathers Vector Search API
// Accepts a query, generates an embedding, and searches Supabase
// for the most semantically similar passages.
// ============================================================

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { query, father_name, era, limit } = req.body;

  if (!query || query.trim().length === 0) {
    return res.status(400).json({ error: "Query is required" });
  }

  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_ANON_KEY) {
    return res.status(503).json({
      error: "Database not configured",
      message: "Supabase credentials are not set in your Vercel environment variables."
    });
  }

  try {
    // Generate embedding for the search query
    const embeddingResponse = await fetch("https://api.openai.com/v1/embeddings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "text-embedding-3-small",
        input: query.trim(),
      }),
    });

    if (!embeddingResponse.ok) {
      throw new Error(`Embedding API error: ${await embeddingResponse.text()}`);
    }

    const embeddingData = await embeddingResponse.json();
    const queryEmbedding = embeddingData.data[0].embedding;

    // Search Supabase
    const searchParams = { query_embedding: queryEmbedding, match_count: limit || 10 };
    if (father_name) searchParams.filter_father = father_name;
    if (era) searchParams.filter_era = era;

    const supabaseResponse = await fetch(
      `${process.env.SUPABASE_URL}/rest/v1/rpc/search_fathers`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "apikey": process.env.SUPABASE_ANON_KEY,
          "Authorization": `Bearer ${process.env.SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify(searchParams),
      }
    );

    if (!supabaseResponse.ok) {
      throw new Error(`Supabase error: ${await supabaseResponse.text()}`);
    }

    const results = await supabaseResponse.json();
    return res.status(200).json({ results, query: query.trim() });
  } catch (error) {
    console.error("Search error:", error);
    return res.status(500).json({ error: "Search failed", message: error.message });
  }
}
