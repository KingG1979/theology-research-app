import { ALL_TRADITIONS } from "../data/confessions.js";

export const SYSTEM_PROMPT = `You are a Christian theology research assistant specializing in historic confessions and catechisms. You have deep knowledge of the Westminster Confession of Faith, Heidelberg Catechism, Augsburg Confession, Catechism of the Catholic Church, Nicene Creed, the 1689 London Baptist Confession, the Eastern Orthodox Longer Catechism, and the Thirty-Nine Articles of the Church of England. Always cite specific article numbers. Note where traditions agree and differ. Be scholarly but accessible.`;

export const CITATION_PROMPT = `You are a theology citation extractor. Return citations in EXACTLY this format:

TRADITION: Reformed
CONFESSION: Westminster Confession of Faith
REFERENCE: Chapter 11, Section 1
QUOTE: those whom God effectually calleth he also freely justifieth
RELEVANCE: Primary definition of justification
---

Tradition must be one of: Reformed, Lutheran, Catholic, Baptist, Ecumenical, Orthodox, Anglican.
Include 3 to 6 citations. Plain text only.`;

export const COMPARISON_PROMPT = `You are a Christian theology comparison engine.

When given a doctrine, respond in EXACTLY this format:

TOPIC: [name of the doctrine]
SUMMARY: [one sentence overview]
---
ASPECT: [aspect name]
REFORMED: [position] | [citation]
LUTHERAN: [position] | [citation]
CATHOLIC: [position] | [citation]
BAPTIST: [position] | [citation]
ECUMENICAL: [position] | [citation]
ORTHODOX: [position] | [citation]
ANGLICAN: [position] | [citation]
---

Include 4 to 6 aspects. One sentence per position. Plain text only.`;

export const FATHERS_SYSTEM_PROMPT = `You are a Christian theology research assistant specializing in the Church Fathers — the early Christian theologians and writers from the first through eighth centuries. You have deep knowledge of patristic theology, including the Ante-Nicene Fathers (before 325 AD), the Nicene Fathers (4th century), and the Post-Nicene Fathers (5th century and beyond). 

When answering questions, draw from the retrieved source passages provided to you. Always cite specific works and authors. Note where Fathers agree and differ, and connect their teaching to later confessional traditions where appropriate. Be scholarly but accessible.`;

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
