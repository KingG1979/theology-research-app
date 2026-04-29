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

// Parse the JSON Compare response. The model returns:
//   { topic, summary, rows: [ { aspect, cells: { Reformed: {position, citation, doc_id, location}, ... } } ] }
// We flatten each row's cells onto the row object itself (row[tradition] = cell)
// so the rendering code can keep its existing row[trad].position / .citation
// access pattern. We additionally surface row[trad].doc_id and .location for
// deep-linking.
export function parseComparison(text) {
  const result = { topic: "", summary: "", rows: [] };
  if (!text || typeof text !== "string") return result;
  const cleaned = text.trim().replace(/^```(?:json)?\s*/i, "").replace(/```\s*$/i, "");
  let parsed;
  try {
    parsed = JSON.parse(cleaned);
  } catch {
    return parseComparisonLegacy(text);
  }
  if (!parsed || typeof parsed !== "object") return result;
  result.topic = typeof parsed.topic === "string" ? parsed.topic.trim() : "";
  result.summary = typeof parsed.summary === "string" ? parsed.summary.trim() : "";
  const rows = Array.isArray(parsed.rows) ? parsed.rows : [];
  for (const r of rows) {
    if (!r || typeof r !== "object") continue;
    const row = { aspect: typeof r.aspect === "string" ? r.aspect.trim() : "" };
    const cells = r.cells && typeof r.cells === "object" ? r.cells : {};
    for (const t of ALL_TRADITIONS) {
      const cell = cells[t];
      if (!cell || typeof cell !== "object") {
        // Model dropped this tradition entirely — still emit a placeholder so
        // the renderer never shows a blank column. Compare mode requires
        // every selected tradition to surface SOME content.
        row[t] = { position: "", citation: "", doc_id: null, location: null, missing: true };
        continue;
      }
      const position = typeof cell.position === "string" ? cell.position.trim() : "";
      const quote = typeof cell.quote === "string" ? cell.quote.trim() : "";
      const context = typeof cell.context === "string" ? cell.context.trim() : "";
      // Position is the primary content. If the model omitted it, fall back
      // to quote+context so the cell still has something readable.
      const fallback = position || [quote, context].filter(Boolean).join(" — ");
      row[t] = {
        position: fallback,
        citation: typeof cell.citation === "string" ? cell.citation.trim() : "",
        doc_id: typeof cell.doc_id === "string" ? cell.doc_id.trim() : null,
        location: cell.location && typeof cell.location === "object" ? cell.location : null,
        missing: false,
      };
    }
    if (row.aspect || ALL_TRADITIONS.some(t => row[t] && (row[t].position || row[t].citation))) result.rows.push(row);
  }
  return result;
}

// Legacy plain-text Compare parser — kept as a fallback when the model
// disregards the JSON instruction.
function parseComparisonLegacy(text) {
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
