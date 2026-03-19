import { useState } from "react";
import { THEME, ERA_COLORS } from "../data/confessions.js";
import { callAPI, searchFathers } from "../utils/api.js";
import { FATHERS_SYSTEM_PROMPT } from "../utils/prompts.js";

const { gold, dark, cream, border, mid, light } = THEME;

// Warm parchment palette for the Fathers tab
const PARCHMENT = {
  bg: "#faf6ee",
  card: "#fffdf8",
  accent: "#8a6a2a",
  headerBg: "#3a2a14",
  headerText: "#f5e8c8",
};

function EraBadge({ era }) {
  const c = ERA_COLORS[era] || ERA_COLORS["Nicene"];
  return (
    <span style={{
      display: "inline-block", fontSize: 9, fontWeight: "bold",
      letterSpacing: 1, textTransform: "uppercase",
      padding: "2px 8px", borderRadius: 10,
      background: c.bg, color: c.text, border: "1px solid " + c.border
    }}>{era}</span>
  );
}

function PassageCard({ result, expanded, onToggle }) {
  const isLong = result.content.length > 300;
  const displayText = expanded || !isLong ? result.content : result.content.slice(0, 300) + "...";
  const similarity = Math.round((result.similarity || 0) * 100);

  return (
    <div style={{
      background: PARCHMENT.card, border: "1px solid " + border,
      borderRadius: 10, padding: "16px 18px", marginBottom: 12,
      borderLeft: "4px solid " + PARCHMENT.accent,
      boxShadow: "0 1px 4px rgba(0,0,0,0.04)"
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
        <div>
          <div style={{ fontSize: 14, fontWeight: "bold", color: dark, marginBottom: 3 }}>
            {result.father_name}
          </div>
          <div style={{ fontSize: 12, color: PARCHMENT.accent, fontStyle: "italic", marginBottom: 4 }}>
            {result.work_title}{result.chapter ? `, Chapter ${result.chapter}` : ""}
          </div>
        </div>
        <div style={{ display: "flex", gap: 6, alignItems: "center", flexShrink: 0 }}>
          <EraBadge era={result.era} />
          {similarity > 0 && (
            <span style={{
              fontSize: 10, color: mid, background: light,
              padding: "2px 6px", borderRadius: 8
            }}>{similarity}%</span>
          )}
        </div>
      </div>
      <div style={{
        fontSize: 13, color: dark, lineHeight: 1.75,
        fontStyle: "italic", whiteSpace: "pre-wrap"
      }}>{displayText}</div>
      {isLong && (
        <button onClick={onToggle} style={{
          marginTop: 8, padding: "3px 10px",
          background: "transparent", border: "1px solid " + border,
          borderRadius: 6, fontSize: 11, color: mid,
          cursor: "pointer", fontFamily: "Georgia, serif"
        }}>{expanded ? "Show less" : "Read more"}</button>
      )}
    </div>
  );
}

export default function FathersTab({ appPassword, localApiKey }) {
  const [subMode, setSubMode] = useState("search"); // "search" or "research"
  const [query, setQuery] = useState("");
  const [filterFather, setFilterFather] = useState("");
  const [filterEra, setFilterEra] = useState("");
  const [results, setResults] = useState([]);
  const [searching, setSearching] = useState(false);
  const [searchError, setSearchError] = useState(null);
  const [expandedCards, setExpandedCards] = useState(new Set());
  const [dbConfigured, setDbConfigured] = useState(true); // assume yes until proven otherwise

  // Research mode state
  const [researchMessages, setResearchMessages] = useState([]);
  const [researchLoading, setResearchLoading] = useState(false);
  const [researchSources, setResearchSources] = useState([]);
  const [researchInput, setResearchInput] = useState("");

  async function handleSearch() {
    if (!query.trim()) return;
    setSearching(true);
    setSearchError(null);
    setResults([]);
    setExpandedCards(new Set());

    try {
      const data = await searchFathers({
        password: appPassword,
        query: query.trim(),
        father_name: filterFather || undefined,
        era: filterEra || undefined,
        limit: 15,
      });

      if (data.error) {
        if (data.error === "Database not configured") {
          setDbConfigured(false);
        }
        throw new Error(data.message || data.error);
      }

      setResults(data.results || []);
    } catch (e) {
      setSearchError(e.message || "Search failed");
    } finally {
      setSearching(false);
    }
  }

  async function handleResearch() {
    if (!researchInput.trim()) return;
    const userMsg = { role: "user", content: researchInput };
    const updated = [...researchMessages, userMsg];
    setResearchMessages(updated);
    setResearchInput("");
    setResearchLoading(true);
    setResearchSources([]);

    try {
      const data = await callAPI({
        model: "claude-sonnet-4-20250514",
        max_tokens: 1200,
        system: FATHERS_SYSTEM_PROMPT,
        messages: updated,
        mode: "fathers",
        query: researchInput,
      }, appPassword, localApiKey);

      if (data.error) throw new Error(data.error);

      const answer = data.content[0].text;
      setResearchMessages([...updated, { role: "assistant", content: answer }]);
      if (data.sources) setResearchSources(data.sources);
    } catch (e) {
      setResearchMessages([...updated, { role: "assistant", content: "Error: " + (e.message || "Request failed. Please try again.") }]);
    } finally {
      setResearchLoading(false);
    }
  }

  function toggleExpand(idx) {
    setExpandedCards(prev => {
      const next = new Set(prev);
      if (next.has(idx)) next.delete(idx); else next.add(idx);
      return next;
    });
  }

  // Database not configured state
  if (!dbConfigured) {
    return (
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: 40 }}>
        <div style={{ textAlign: "center", maxWidth: 500 }}>
          <div style={{ fontSize: 40, marginBottom: 16 }}>&#9853;</div>
          <h2 style={{ fontSize: 20, color: dark, marginBottom: 8 }}>Church Fathers Database</h2>
          <p style={{ fontSize: 14, color: mid, lineHeight: 1.7, marginBottom: 20 }}>
            The Church Fathers search requires a Supabase database with vector embeddings.
            This needs to be configured in your Vercel environment variables.
          </p>
          <div style={{ background: light, border: "1px solid " + border, borderRadius: 8, padding: "14px 18px", textAlign: "left", fontSize: 12, color: dark, lineHeight: 1.8 }}>
            <strong>Required environment variables:</strong><br />
            SUPABASE_URL — Your Supabase project URL<br />
            SUPABASE_ANON_KEY — Your Supabase anonymous key<br />
            <br />
            <strong>Setup steps:</strong><br />
            1. Create a free Supabase project at supabase.com<br />
            2. Run the migration SQL (in supabase/ folder)<br />
            3. Run the embedding script (in scripts/ folder)<br />
            4. Add the env vars to Vercel
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      {/* Sub-mode tabs */}
      <div style={{
        display: "flex", alignItems: "center", gap: 12,
        padding: "10px 24px", background: PARCHMENT.bg,
        borderBottom: "1px solid " + border
      }}>
        <button onClick={() => setSubMode("search")} style={{
          padding: "5px 14px", borderRadius: 16, fontSize: 12,
          fontFamily: "Georgia, serif", cursor: "pointer",
          background: subMode === "search" ? PARCHMENT.accent : "transparent",
          color: subMode === "search" ? "#fff" : PARCHMENT.accent,
          border: "1px solid " + PARCHMENT.accent,
          fontWeight: subMode === "search" ? "bold" : "normal"
        }}>Browse by Doctrine</button>
        <button onClick={() => setSubMode("research")} style={{
          padding: "5px 14px", borderRadius: 16, fontSize: 12,
          fontFamily: "Georgia, serif", cursor: "pointer",
          background: subMode === "research" ? PARCHMENT.accent : "transparent",
          color: subMode === "research" ? "#fff" : PARCHMENT.accent,
          border: "1px solid " + PARCHMENT.accent,
          fontWeight: subMode === "research" ? "bold" : "normal"
        }}>AI Research</button>
      </div>

      {/* SEARCH / BROWSE MODE */}
      {subMode === "search" && (
        <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
          {/* Filter bar */}
          <div style={{
            padding: "14px 24px", background: cream,
            borderBottom: "1px solid " + border, flexShrink: 0
          }}>
            <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
              <select value={filterFather} onChange={e => setFilterFather(e.target.value)} style={{
                padding: "8px 12px", fontSize: 12, fontFamily: "Georgia, serif",
                border: "1px solid " + border, borderRadius: 8, background: "#fff",
                color: dark, outline: "none"
              }}>
                <option value="">All Fathers</option>
                <option value="St. Augustine">St. Augustine</option>
                <option value="St. Athanasius">St. Athanasius</option>
              </select>
              <select value={filterEra} onChange={e => setFilterEra(e.target.value)} style={{
                padding: "8px 12px", fontSize: 12, fontFamily: "Georgia, serif",
                border: "1px solid " + border, borderRadius: 8, background: "#fff",
                color: dark, outline: "none"
              }}>
                <option value="">All Eras</option>
                <option value="Ante-Nicene">Ante-Nicene</option>
                <option value="Nicene">Nicene</option>
                <option value="Post-Nicene">Post-Nicene</option>
              </select>
              <input
                style={{
                  flex: 1, padding: "8px 14px", fontSize: 13,
                  fontFamily: "Georgia, serif", border: "1px solid " + border,
                  borderRadius: 8, background: "#fff", color: dark, outline: "none",
                  minWidth: 200
                }}
                value={query}
                onChange={e => setQuery(e.target.value)}
                onKeyDown={e => { if (e.key === "Enter") handleSearch(); }}
                placeholder="Search by doctrine, topic, or keyword..."
              />
              <button onClick={handleSearch} disabled={searching} style={{
                padding: "8px 18px", background: searching ? border : PARCHMENT.accent,
                color: "#fff", border: "none", borderRadius: 8, fontSize: 13,
                fontWeight: "bold", cursor: searching ? "not-allowed" : "pointer",
                fontFamily: "Georgia, serif"
              }}>{searching ? "Searching..." : "Search"}</button>
            </div>
            <div style={{ display: "flex", gap: 6, marginTop: 10, flexWrap: "wrap" }}>
              {["Trinity", "Incarnation", "Justification", "Baptism", "Eucharist", "Original Sin", "Free Will", "Grace", "Predestination", "Scripture"].map(t => (
                <button key={t} onClick={() => { setQuery(t); }} style={{
                  padding: "3px 10px", background: "#fff",
                  border: "1px solid " + border, borderRadius: 12,
                  fontSize: 11, color: PARCHMENT.accent,
                  cursor: "pointer", fontFamily: "Georgia, serif"
                }}>{t}</button>
              ))}
            </div>
          </div>

          {/* Results */}
          <div style={{ flex: 1, overflowY: "auto", padding: "20px 24px" }}>
            {searchError && (
              <div style={{
                padding: "12px 16px", background: "#fff0f0",
                border: "1px solid #ffaaaa", borderRadius: 8,
                color: "#aa2222", fontSize: 13, marginBottom: 16
              }}>{searchError}</div>
            )}

            {!searching && results.length === 0 && !searchError && (
              <div style={{ textAlign: "center", padding: "60px 20px", color: mid }}>
                <div style={{ fontSize: 40, marginBottom: 16 }}>&#9853;</div>
                <p style={{ fontSize: 17, color: "#5a4a2a", marginBottom: 8 }}>Search the Church Fathers</p>
                <p style={{ fontSize: 13, lineHeight: 1.7, maxWidth: 460, margin: "0 auto" }}>
                  Enter a doctrine, topic, or theological question to search through the writings
                  of St. Augustine and St. Athanasius. Results are ranked by semantic similarity.
                </p>
              </div>
            )}

            {searching && (
              <div style={{ textAlign: "center", padding: "40px 20px" }}>
                <div style={{ fontSize: 15, color: "#5a4a2a", marginBottom: 8 }}>Searching the Fathers...</div>
                <div style={{ fontSize: 12, color: mid, fontStyle: "italic" }}>Finding relevant passages by meaning, not just keywords</div>
              </div>
            )}

            {results.length > 0 && (
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                  <span style={{ fontSize: 12, color: mid }}>{results.length} passages found</span>
                </div>
                {results.map((r, i) => (
                  <PassageCard
                    key={r.id || i}
                    result={r}
                    expanded={expandedCards.has(i)}
                    onToggle={() => toggleExpand(i)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* AI RESEARCH MODE */}
      {subMode === "research" && (
        <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>
          {/* Chat area */}
          <div style={{ flex: 3, display: "flex", flexDirection: "column", borderRight: "2px solid " + border }}>
            <div style={{ flex: 1, overflowY: "auto", padding: "20px 24px", display: "flex", flexDirection: "column", gap: 14 }}>
              {researchMessages.length === 0 && (
                <div style={{ textAlign: "center", padding: "40px 20px", color: mid }}>
                  <div style={{ fontSize: 40, marginBottom: 16 }}>&#9853;</div>
                  <p style={{ fontSize: 17, color: "#5a4a2a", marginBottom: 12 }}>Ask the Church Fathers</p>
                  <p style={{ fontSize: 13, marginBottom: 6, fontStyle: "italic" }}>What did Augustine teach about grace and free will?</p>
                  <p style={{ fontSize: 13, marginBottom: 6, fontStyle: "italic" }}>How does Athanasius defend the divinity of Christ?</p>
                  <p style={{ fontSize: 13, fontStyle: "italic" }}>Compare Augustine and Athanasius on the Trinity</p>
                  <p style={{ fontSize: 11, color: mid, marginTop: 16 }}>
                    Answers are grounded in actual patristic texts via semantic search
                  </p>
                </div>
              )}
              {researchMessages.map((msg, i) => (
                <div key={i}>
                  <div style={{
                    background: msg.role === "user" ? PARCHMENT.headerBg : PARCHMENT.card,
                    color: msg.role === "user" ? PARCHMENT.headerText : dark,
                    borderRadius: msg.role === "user" ? "12px 12px 2px 12px" : "2px 12px 12px 12px",
                    padding: "12px 16px",
                    border: msg.role === "user" ? "none" : "1px solid " + border,
                    boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
                    display: "inline-block",
                    maxWidth: msg.role === "user" ? "75%" : "100%",
                    float: msg.role === "user" ? "right" : "none",
                    clear: "both"
                  }}>
                    <div style={{
                      fontSize: 10, fontWeight: "bold", letterSpacing: 1,
                      textTransform: "uppercase", marginBottom: 5,
                      color: msg.role === "user" ? gold : PARCHMENT.accent
                    }}>{msg.role === "user" ? "You" : "Patristic Research"}</div>
                    <div style={{ fontSize: 14, lineHeight: 1.75, whiteSpace: "pre-wrap" }}>{msg.content}</div>
                  </div>
                  <div style={{ clear: "both" }} />
                </div>
              ))}
              {researchLoading && (
                <div style={{
                  background: PARCHMENT.card, border: "1px solid " + border,
                  borderRadius: "2px 12px 12px 12px", padding: "12px 16px"
                }}>
                  <div style={{ fontSize: 10, fontWeight: "bold", letterSpacing: 1, textTransform: "uppercase", color: PARCHMENT.accent, marginBottom: 5 }}>Patristic Research</div>
                  <div style={{ fontSize: 13, color: mid, fontStyle: "italic" }}>Searching the Fathers and composing response...</div>
                </div>
              )}
            </div>
            <div style={{ padding: "12px 20px 16px", borderTop: "1px solid " + border, display: "flex", gap: 10, background: cream }}>
              <textarea
                style={{
                  flex: 1, padding: "10px 14px", fontSize: 14,
                  fontFamily: "Georgia, serif", border: "1px solid " + border,
                  borderRadius: 8, background: "#fff", color: dark,
                  resize: "none", outline: "none"
                }}
                value={researchInput}
                onChange={e => setResearchInput(e.target.value)}
                onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleResearch(); } }}
                placeholder="Ask about patristic theology..."
                rows={3}
              />
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <button onClick={handleResearch} disabled={researchLoading} style={{
                  flex: 1, padding: "0 18px",
                  background: researchLoading ? border : PARCHMENT.accent,
                  color: "#fff", border: "none", borderRadius: 8,
                  fontSize: 14, fontWeight: "bold",
                  cursor: researchLoading ? "not-allowed" : "pointer",
                  fontFamily: "Georgia, serif"
                }}>{researchLoading ? "..." : "Ask"}</button>
                {researchMessages.length > 0 && (
                  <button onClick={() => { setResearchMessages([]); setResearchSources([]); }} style={{
                    padding: "6px 10px", background: "#fff", color: mid,
                    border: "1px solid " + border, borderRadius: 8,
                    fontSize: 11, cursor: "pointer", fontFamily: "Georgia, serif"
                  }}>{"\u21BA"} New</button>
                )}
              </div>
            </div>
          </div>

          {/* Sources panel */}
          <div style={{ flex: 2, overflowY: "auto", background: PARCHMENT.bg, display: "flex", flexDirection: "column" }}>
            <div style={{
              display: "flex", justifyContent: "space-between", alignItems: "center",
              padding: "14px 18px", borderBottom: "1px solid " + border, background: "#ede8dc"
            }}>
              <span style={{ fontSize: 13, fontWeight: "bold", color: "#5a4a2a" }}>Patristic Sources</span>
              {researchSources.length > 0 && (
                <span style={{ fontSize: 11, color: mid, background: border, padding: "2px 8px", borderRadius: 10 }}>
                  {researchSources.length} passages
                </span>
              )}
            </div>
            {researchSources.length === 0 && (
              <div style={{ padding: "32px 20px", textAlign: "center", color: mid, fontSize: 13 }}>
                Source passages from the Church Fathers will appear here when you ask a question.
              </div>
            )}
            {researchSources.map((source, i) => (
              <div key={i} style={{
                margin: "10px 12px", padding: "12px 14px",
                background: PARCHMENT.card, borderRadius: 8,
                borderLeft: "4px solid " + PARCHMENT.accent,
                boxShadow: "0 1px 3px rgba(0,0,0,0.04)"
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                  <EraBadge era={source.era} />
                  {source.similarity && (
                    <span style={{ fontSize: 10, color: mid }}>{Math.round(source.similarity * 100)}% match</span>
                  )}
                </div>
                <div style={{ fontSize: 13, fontWeight: "bold", color: dark, marginBottom: 2 }}>{source.father_name}</div>
                <div style={{ fontSize: 12, color: PARCHMENT.accent, marginBottom: 6, fontStyle: "italic" }}>
                  {source.work_title}{source.chapter ? `, Ch. ${source.chapter}` : ""}
                </div>
                <div style={{
                  fontSize: 12, color: "#4a3a1a", lineHeight: 1.6,
                  borderLeft: "2px solid " + border, paddingLeft: 8,
                  fontStyle: "italic"
                }}>{source.content.length > 250 ? source.content.slice(0, 250) + "..." : source.content}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
