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
    // The model occasionally hits its token limit and returns truncated JSON.
    // Try to repair it by closing dangling structures, so users still see the
    // partial comparison rather than a hard failure.
    const repaired = repairTruncatedJson(cleaned);
    if (repaired) {
      try { parsed = JSON.parse(repaired); } catch {}
    }
    if (!parsed) return parseComparisonLegacy(text);
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

// Exposed wrapper so callers outside this module (Research mode) can reuse
// the same truncation-recovery logic.
export function repairTruncatedJsonExt(text) { return repairTruncatedJson(text); }

// Best-effort recovery for JSON that was cut off mid-stream by the model's
// token limit. We trim trailing junk, then close any open strings, arrays,
// and objects in the order they were opened. Returns the repaired string,
// or null if the input doesn't look recoverable.
function repairTruncatedJson(text) {
  if (!text || text[0] !== "{") return null;
  let i = 0;
  const stack = [];
  let inString = false;
  let escape = false;
  let lastValidEnd = -1;
  for (; i < text.length; i++) {
    const ch = text[i];
    if (escape) { escape = false; continue; }
    if (ch === "\\") { escape = true; continue; }
    if (inString) {
      if (ch === '"') inString = false;
      continue;
    }
    if (ch === '"') { inString = true; continue; }
    if (ch === "{" || ch === "[") stack.push(ch);
    else if (ch === "}") { if (stack[stack.length - 1] === "{") stack.pop(); lastValidEnd = i; }
    else if (ch === "]") { if (stack[stack.length - 1] === "[") stack.pop(); lastValidEnd = i; }
    else if (ch === "," || ch === ":" || /\s/.test(ch)) { /* ignore */ }
    else if (stack.length === 0) break;
  }
  // Truncate to the last comma-safe boundary inside the innermost open container,
  // then close all open structures.
  let truncated = text;
  if (inString) {
    // Drop the unterminated string entirely back to the prior comma or open bracket.
    const lastComma = truncated.lastIndexOf(",", text.length);
    const lastOpen = Math.max(truncated.lastIndexOf("{"), truncated.lastIndexOf("["));
    const cut = Math.max(lastComma, lastOpen);
    if (cut < 0) return null;
    truncated = truncated.slice(0, cut);
  } else {
    // Trim trailing partial token (e.g., dangling key/value)
    const lastBoundary = Math.max(truncated.lastIndexOf(","), truncated.lastIndexOf("{"), truncated.lastIndexOf("["), truncated.lastIndexOf("}"), truncated.lastIndexOf("]"));
    if (lastBoundary > 0 && lastBoundary < truncated.length - 1) {
      // Only trim if last char is not already a closing brace/bracket
      const tail = truncated.slice(lastBoundary + 1).trim();
      if (tail && !/^[}\]]/.test(tail)) truncated = truncated.slice(0, lastBoundary);
    }
  }
  // Recompute open-stack on the truncated text
  const stack2 = [];
  let inStr = false, esc = false;
  for (let j = 0; j < truncated.length; j++) {
    const ch = truncated[j];
    if (esc) { esc = false; continue; }
    if (ch === "\\") { esc = true; continue; }
    if (inStr) { if (ch === '"') inStr = false; continue; }
    if (ch === '"') { inStr = true; continue; }
    if (ch === "{" || ch === "[") stack2.push(ch);
    else if (ch === "}") { if (stack2[stack2.length - 1] === "{") stack2.pop(); }
    else if (ch === "]") { if (stack2[stack2.length - 1] === "[") stack2.pop(); }
  }
  // Strip dangling colon/comma at the end before closing
  truncated = truncated.replace(/[,:\s]+$/, "");
  // If we ended on a key like "foo": with no value, drop the key.
  truncated = truncated.replace(/,?\s*"[^"]*"\s*:\s*$/, "");
  let closed = truncated;
  while (stack2.length) {
    const open = stack2.pop();
    closed += open === "{" ? "}" : "]";
  }
  return closed;
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
