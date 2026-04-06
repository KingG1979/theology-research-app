// Shared API calling utility
// For local development, calls Anthropic directly. On Vercel, uses the secure /api/chat backend.

export async function callAPI(body, password, localApiKey) {
  if (localApiKey) {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-api-key": localApiKey, "anthropic-version": "2023-06-01" },
      body: JSON.stringify(body),
    });
    return res.json();
  } else {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...body, password }),
    });
    return res.json();
  }
}

// Search Church Fathers via vector similarity
export async function searchFathers({ password, query, father_name, era, limit }) {
  const res = await fetch("/api/search", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ password, query, father_name, era, limit }),
  });
  return res.json();
}
