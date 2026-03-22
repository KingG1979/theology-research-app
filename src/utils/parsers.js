import { ALL_TRADITIONS } from "../data/confessions";

export function parseCitations(text) {
  const results = [];
  const blocks = text.split("---").map(b => b.trim()).filter(Boolean);
  for (const block of blocks) {
    const lines = block.split("\n").map(l => l.trim()).filter(Boolean);
    const item = {};
    for (const line of lines) {
      if (line.startsWith("TRADITION:")) item.tradition = line.replace("TRADITION:", "").trim();
      else if (line.startsWith("CONFESSION:")) item.confession = line.replace("CONFESSION:", "").trim();
      else if (line.startsWith("REFERENCE:")) item.reference = line.replace("REFERENCE:", "").trim();
      else if (line.startsWith("QUOTE:")) item.quote = line.replace("QUOTE:", "").trim();
      else if (line.startsWith("RELEVANCE:")) item.relevance = line.replace("RELEVANCE:", "").trim();
    }
    if (item.confession && item.tradition) results.push(item);
  }
  return results;
}

export function parseComparison(text) {
  const lines = text.split("\n").map(l => l.trim()).filter(Boolean);
  const result = { topic: "", summary: "", rows: [] };
  let currentRow = null;
  for (const line of lines) {
    if (line.startsWith("TOPIC:")) result.topic = line.replace("TOPIC:", "").trim();
    else if (line.startsWith("SUMMARY:")) result.summary = line.replace("SUMMARY:", "").trim();
    else if (line.startsWith("ASPECT:")) {
      if (currentRow) result.rows.push(currentRow);
      currentRow = { aspect: line.replace("ASPECT:", "").trim() };
    } else if (line === "---") continue;
    else {
      for (const t of ALL_TRADITIONS) {
        const key = t.toUpperCase() + ":";
        if (line.startsWith(key)) {
          const content = line.replace(key, "").trim();
          const parts = content.split("|");
          currentRow[t] = { position: parts[0] ? parts[0].trim() : "", citation: parts[1] ? parts[1].trim() : "" };
        }
      }
    }
  }
  if (currentRow) result.rows.push(currentRow);
  return result;
}
