// ============================================================
// Backend API: Chat with optional RAG (Church Fathers)
// Lives on Vercel's servers. API keys are safe here.
// ============================================================

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { password, system, messages, max_tokens, mode, query } = req.body;
  if (password !== process.env.APP_PASSWORD) {
    return res.status(401).json({ error: "Incorrect password" });
  }

  try {
    let systemPrompt = system || "";
    let ragContext = null;

    // If in Fathers mode and Supabase is configured, retrieve relevant passages
    if (mode === "fathers" && process.env.SUPABASE_URL && process.env.SUPABASE_ANON_KEY) {
      const userQuery = query || (messages && messages.length > 0 ? messages[messages.length - 1].content : "");
      
      if (userQuery) {
        try {
          // Generate embedding for the user's question
          const embResp = await fetch("https://api.openai.com/v1/embeddings", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
            },
            body: JSON.stringify({
              model: "text-embedding-3-small",
              input: userQuery,
            }),
          });
          const embData = await embResp.json();
          const embedding = embData.data[0].embedding;

          // Search Supabase
          const searchResp = await fetch(
            `${process.env.SUPABASE_URL}/rest/v1/rpc/search_fathers`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "apikey": process.env.SUPABASE_ANON_KEY,
                "Authorization": `Bearer ${process.env.SUPABASE_ANON_KEY}`,
              },
              body: JSON.stringify({
                query_embedding: embedding,
                match_count: 8,
              }),
            }
          );
          const passages = await searchResp.json();

          if (passages && passages.length > 0) {
            ragContext = passages;
            // Inject passages into system prompt
            const passageTexts = passages.map((p, i) => 
              `[Source ${i + 1}] ${p.father_name}, "${p.work_title}"${p.chapter ? `, Chapter ${p.chapter}` : ''}:\n${p.content}`
            ).join("\n\n---\n\n");

            systemPrompt = `${systemPrompt}\n\n` +
              `You have been given relevant passages from the Church Fathers below. ` +
              `Ground your answer in these actual texts. Cite sources using the format: ` +
              `(Father Name, "Work Title", Chapter X). If the passages don't contain enough ` +
              `information to fully answer, say so and offer what you can from the texts provided.\n\n` +
              `=== RETRIEVED PASSAGES ===\n\n${passageTexts}\n\n=== END PASSAGES ===`;
          }
        } catch (ragError) {
          console.error("RAG retrieval failed (continuing without):", ragError);
          // Continue without RAG — graceful degradation
        }
      }
    }

    // Forward to OpenAI
    const openAIMessages = systemPrompt
      ? [{ role: "system", content: systemPrompt }, ...messages]
      : messages;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o",
        max_tokens: max_tokens || 1000,
        messages: openAIMessages,
      }),
    });
    const data = await response.json();

    const text = data.choices?.[0]?.message?.content || "";
    
    // Return response with RAG sources if available
    const result = { content: [{ type: "text", text }] };
    if (ragContext) {
      result.sources = ragContext.map(p => ({
        father_name: p.father_name,
        work_title: p.work_title,
        era: p.era,
        chapter: p.chapter,
        content: p.content,
        similarity: p.similarity,
      }));
    }
    
    return res.status(200).json(result);
  } catch (error) {
    console.error("Chat error:", error);
    return res.status(500).json({ error: "API request failed" });
  }
}
