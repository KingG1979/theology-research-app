export async function callAPI(body) {
  const res = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  return res.json();
}

// Safely extract text from API response, throwing on errors
export function extractText(data) {
  if (data && data.content && data.content[0] && data.content[0].text) {
    return data.content[0].text;
  }
  if (data && data.error) {
    throw new Error(data.error.message || data.error);
  }
  throw new Error("No response from the AI service. Please try again.");
}
