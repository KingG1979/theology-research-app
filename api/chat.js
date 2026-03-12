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

  // Check the app password
  const { password, ...body } = req.body;
  if (password !== process.env.APP_PASSWORD) {
    return res.status(401).json({ error: "Incorrect password" });
  }

  // Forward the request to Anthropic using your secret API key
  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify(body),
    });
    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: "API request failed" });
  }
}
