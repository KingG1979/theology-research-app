// ============================================================
// This is your backend function.
// It lives on Vercel's servers, not in the browser.
// Your API key is safe here - users never see this code running.
// ============================================================

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { system, messages, max_tokens } = req.body;

  // Forward the request to OpenAI using your secret API key
  try {
    const openAIMessages = system
      ? [{ role: "system", content: system }, ...messages]
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

    // Extract text from OpenAI response format
    const text = data.choices?.[0]?.message?.content || "";
    return res.status(200).json({ content: [{ type: "text", text }] });
  } catch (error) {
    return res.status(500).json({ error: "API request failed" });
  }
}

