import { useState, useEffect } from "react";
import { ALL_TRADITIONS, COLORS, CONFESSIONS } from "./data/confessions";
import { SYSTEM_PROMPT, CITATION_PROMPT, COMPARISON_PROMPT } from "./prompts";
import { callAPI, extractText } from "./api";
import { parseCitations, parseComparison } from "./utils/parsers";

const pulseKeyframes = `
@keyframes pulse {
  0%, 100% { opacity: 0.4; }
  50% { opacity: 1; }
}
@keyframes fadeDot {
  0%, 20% { opacity: 0; }
  40%, 100% { opacity: 1; }
}
@media (max-width: 768px) {
  .browse-layout { flex-direction: column !important; }
  .browse-sidebar { width: 100% !important; max-height: 160px !important; border-right: none !important; border-bottom: 2px solid #d4c4a0 !important; }
  .browse-chapters { width: 100% !important; max-height: 140px !important; border-right: none !important; border-bottom: 2px solid #d4c4a0 !important; }
  .research-layout { flex-direction: column !important; }
  .research-chat { border-right: none !important; border-bottom: 2px solid #d4c4a0 !important; flex: 1 1 auto !important; min-height: 50vh !important; }
  .research-sources { flex: 1 1 auto !important; min-height: 30vh !important; }
  .header-wrap { flex-direction: column !important; gap: 8px !important; }
  .header-title { text-align: center !important; }
  .header-tabs { justify-content: center !important; }
}
`;

function LoadingDots({ text, color }) {
  return (
    <span style={{ color: color || "#8a7a5a", fontStyle: "italic", fontSize: 13 }}>
      {text}
      <span style={{ display: "inline-block" }}>
        <span style={{ animation: "fadeDot 1.2s infinite", animationDelay: "0s" }}>.</span>
        <span style={{ animation: "fadeDot 1.2s infinite", animationDelay: "0.2s" }}>.</span>
        <span style={{ animation: "fadeDot 1.2s infinite", animationDelay: "0.4s" }}>.</span>
      </span>
    </span>
  );
}

function ErrorBox({ message, onRetry }) {
  return (
    <div style={{ margin: "16px 24px", padding: "14px 18px", background: "#fef2f2", border: "1px solid #e8b4b4", borderRadius: 8, display: "flex", alignItems: "flex-start", gap: 12 }}>
      <span style={{ fontSize: 16, lineHeight: 1, flexShrink: 0, marginTop: 1 }}>!</span>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 13, color: "#7a2a2a", lineHeight: 1.6 }}>{message}</div>
        {onRetry && (
          <button onClick={onRetry} style={{ marginTop: 8, padding: "4px 14px", background: "#fff", border: "1px solid #e8b4b4", borderRadius: 6, fontSize: 12, color: "#7a2a2a", cursor: "pointer", fontFamily: "Georgia, serif" }}>
            Try Again
          </button>
        )}
      </div>
    </div>
  );
}

export default function TheologyAssistant() {
  // Welcome screen - show on first visit
  const [showWelcome, setShowWelcome] = useState(() => {
    return !localStorage.getItem("cacr-welcomed");
  });

  function enterApp() {
    localStorage.setItem("cacr-welcomed", "true");
    setShowWelcome(false);
  }

  // VIP access via ?vip=blessed URL parameter
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("vip") === "blessed") {
      sessionStorage.setItem("cacr-vip", "true");
    }
  }, []);

  const isVip = sessionStorage.getItem("cacr-vip") === "true";

  // AI query rate limiting (7 per day, client-side)
  function getAIUsage() {
    const stored = localStorage.getItem("cacr-ai-usage");
    if (stored) {
      const parsed = JSON.parse(stored);
      const today = new Date().toDateString();
      if (parsed.date === today) return parsed.count;
    }
    return 0;
  }

  function incrementAIUsage() {
    const today = new Date().toDateString();
    const current = getAIUsage();
    localStorage.setItem("cacr-ai-usage", JSON.stringify({ date: today, count: current + 1 }));
    setAiUsageCount(current + 1);
  }

  function canUseAI() {
    if (isVip) return true;
    return getAIUsage() < 7;
  }

  const [aiUsageCount, setAiUsageCount] = useState(() => getAIUsage());
  const [aiLimitMessage, setAiLimitMessage] = useState("");

  const [mode, setMode] = useState("research");
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [citations, setCitations] = useState([]);
  const [citationsLoading, setCitationsLoading] = useState(false);
  const [compareInput, setCompareInput] = useState("");
  const [compareLoading, setCompareLoading] = useState(false);
  const [comparisonData, setComparisonData] = useState(null);
  const [compareError, setCompareError] = useState(null);
  const [activeTraditions, setActiveTraditions] = useState(new Set(ALL_TRADITIONS));
  const [entries, setEntries] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editingNote, setEditingNote] = useState("");

  // Browse mode state
  const [selectedConfession, setSelectedConfession] = useState(null);
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [commentary, setCommentary] = useState({});
  const [commentaryLoading, setCommentaryLoading] = useState(false);

  // Inject CSS keyframes once
  useEffect(() => {
    if (!document.getElementById("theology-animations")) {
      const style = document.createElement("style");
      style.id = "theology-animations";
      style.textContent = pulseKeyframes;
      document.head.appendChild(style);
    }
  }, []);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("theology-notebook");
      if (saved) setEntries(JSON.parse(saved));
    } catch (e) { console.error(e); }
  }, []);

  useEffect(() => {
    try { localStorage.setItem("theology-notebook", JSON.stringify(entries)); }
    catch (e) { console.error(e); }
  }, [entries]);

  function resetResearch() {
    setMessages([]);
    setCitations([]);
    setInput("");
  }

  function resetCompare() {
    setComparisonData(null);
    setCompareInput("");
    setCompareError(null);
  }

  const [newNoteText, setNewNoteText] = useState("");
  const [addingNewNote, setAddingNewNote] = useState(false);

  function addStandaloneNote() {
    if (!newNoteText.trim()) return;
    const newEntry = { id: Date.now(), date: new Date().toLocaleDateString(), question: "", answer: "", note: newNoteText.trim(), isStandalone: true };
    setEntries(prev => [newEntry, ...prev]);
    setNewNoteText("");
    setAddingNewNote(false);
  }

  function saveEntry(question, answer) {
    const newEntry = { id: Date.now(), date: new Date().toLocaleDateString(), question, answer, note: "", isStandalone: false };
    setEntries(prev => [newEntry, ...prev]);
    setMode("notebook");
  }

  function deleteEntry(id) { setEntries(prev => prev.filter(e => e.id !== id)); }

  function saveNote(id) {
    setEntries(prev => prev.map(e => e.id === id ? { ...e, note: editingNote } : e));
    setEditingId(null);
    setEditingNote("");
  }

  function toggleTradition(t) {
    setActiveTraditions(prev => {
      const next = new Set(prev);
      if (next.has(t)) { if (next.size > 1) next.delete(t); } else { next.add(t); }
      return next;
    });
  }

  async function getCommentary(confessionName, chapterTitle, sectionNumber, sectionText) {
    const key = confessionName + "-" + chapterTitle + "-" + sectionNumber;
    if (commentary[key]) return;
    if (!canUseAI()) {
      setAiLimitMessage("You've reached your daily limit of 7 AI queries. Your limit resets tomorrow.");
      return;
    }
    setCommentaryLoading(key);
    try {
      const prompt = "Provide a brief scholarly commentary (3-4 sentences) on this section from " + confessionName + ", " + chapterTitle + ": " + sectionText + " Note its historical context, theological significance, and how it relates to other traditions.";
      const data = await callAPI({ max_tokens: 300, system: SYSTEM_PROMPT, messages: [{ role: "user", content: prompt }] });
      setCommentary(prev => ({ ...prev, [key]: extractText(data) }));
      incrementAIUsage();
    } catch (e) {
      console.error(e);
      setCommentary(prev => ({ ...prev, [key]: { error: true, message: "Unable to load commentary. Please try again." } }));
    }
    finally { setCommentaryLoading(false); }
  }

  const visibleTraditions = ALL_TRADITIONS.filter(t => activeTraditions.has(t));

  async function askQuestion() {
    if (!input.trim()) return;
    if (!canUseAI()) {
      setAiLimitMessage("You've reached your daily limit of 7 AI queries. Your limit resets tomorrow.");
      return;
    }
    const userMessage = { role: "user", content: input };
    const updated = [...messages, userMessage];
    const question = input;
    setMessages(updated); setInput(""); setLoading(true); setCitationsLoading(true); setCitations([]);
    try {
      const [ad, cd] = await Promise.all([
        callAPI({ max_tokens: 1000, system: SYSTEM_PROMPT, messages: updated }),
        callAPI({ max_tokens: 1000, system: CITATION_PROMPT, messages: [{ role: "user", content: question }] }),
      ]);
      const answer = extractText(ad);
      setMessages([...updated, { role: "assistant", content: answer, question }]);
      try { setCitations(parseCitations(extractText(cd))); } catch { setCitations([]); }
      incrementAIUsage();
    } catch (e) {
      console.error(e);
      setMessages([...updated, { role: "assistant", content: "Unable to reach the AI service. Please try again.", isError: true }]);
    }
    finally { setLoading(false); setCitationsLoading(false); }
  }

  async function runComparison() {
    if (!compareInput.trim()) return;
    if (!canUseAI()) {
      setAiLimitMessage("You've reached your daily limit of 7 AI queries. Your limit resets tomorrow.");
      return;
    }
    setCompareLoading(true); setComparisonData(null); setCompareError(null);
    try {
      const data = await callAPI({ max_tokens: 1500, system: COMPARISON_PROMPT, messages: [{ role: "user", content: compareInput }] });
      const text = extractText(data);
      const parsed = parseComparison(text);
      if (!parsed.topic || parsed.rows.length === 0) throw new Error("Could not parse response. Please try again.");
      setComparisonData(parsed);
      incrementAIUsage();
    } catch (e) { console.error(e); setCompareError(e.message || "Unknown error."); }
    finally { setCompareLoading(false); }
  }

  const gold = "#c9a84c";
  const dark = "#2c2416";
  const cream = "#faf8f4";
  const border = "#d4c4a0";
  const mid = "#8a7a5a";
  const light = "#f5f0e8";

  const confessionNames = Object.keys(CONFESSIONS);

  // Show welcome screen on first visit
  if (showWelcome) {
    return (
      <div style={{ fontFamily: "Georgia, serif", height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: cream }}>
        <div style={{ maxWidth: 520, padding: "48px 44px", background: "#fff", border: "1px solid " + border, borderRadius: 12, boxShadow: "0 4px 20px rgba(0,0,0,0.08)", textAlign: "center" }}>
          <div style={{ fontSize: 24, fontWeight: "bold", color: dark, marginBottom: 16 }}>Creeds, Confessions and Catechism Research</div>
          <p style={{ fontSize: 14, color: "#5a4a2a", lineHeight: 1.8, marginBottom: 28 }}>
            Explore the historic confessions and catechisms of the Christian church. Compare what Reformed, Lutheran, Baptist, Anglican, Orthodox, and Catholic traditions teach on key doctrines — with AI-powered research and commentary.
          </p>
          <div style={{ textAlign: "left", marginBottom: 32 }}>
            {[
              { label: "Browse", desc: "Read the full texts of the Westminster Confession, Heidelberg Catechism, Augsburg Confession, 1689 Baptist Confession, 39 Articles, and more." },
              { label: "Compare", desc: "See how different traditions approach baptism, justification, the Lord\u2019s Supper, and other doctrines side by side." },
              { label: "Research", desc: "Ask any theological question and receive AI-powered answers grounded in confessional texts." },
            ].map(({ label, desc }) => (
              <div key={label} style={{ marginBottom: 16, paddingLeft: 20, borderLeft: "3px solid " + gold }}>
                <div style={{ fontSize: 14, fontWeight: "bold", color: dark, marginBottom: 3 }}>{label}</div>
                <div style={{ fontSize: 13, color: "#5a4a2a", lineHeight: 1.7 }}>{desc}</div>
              </div>
            ))}
          </div>
          <button
            onClick={enterApp}
            style={{ width: "100%", padding: "12px", background: gold, color: dark, border: "none", borderRadius: 8, fontSize: 16, fontWeight: "bold", cursor: "pointer", fontFamily: "Georgia, serif" }}>
            Start Exploring
          </button>
        </div>
      </div>
    );
  }
  const currentConfession = selectedConfession ? CONFESSIONS[selectedConfession] : null;
  const currentChapter = selectedChapter !== null && currentConfession ? currentConfession.chapters[selectedChapter] : null;

  return (
    <div style={{ fontFamily: "Georgia, serif", height: "100vh", display: "flex", flexDirection: "column", background: cream, color: dark, overflow: "hidden" }}>

      {/* Header */}
      <div className="header-wrap" style={{ display: "flex", alignItems: "center", gap: 16, padding: "12px 24px", background: dark, flexShrink: 0 }}>
        <div className="header-title" style={{ flex: 1 }}>
          <div style={{ fontSize: 16, fontWeight: "bold", color: cream }}>Creeds, Confessions and Catechism Research</div>
          <div style={{ fontSize: 10, color: gold, letterSpacing: 2, textTransform: "uppercase" }}>Ecumenical Creeds · Westminster · Heidelberg · Augsburg · 1689 Baptist · Orthodox · 39 Articles</div>
        </div>
        <div className="header-tabs" style={{ display: "flex", gap: 5, flexWrap: "wrap", justifyContent: "flex-end", alignItems: "center" }}>
          {[
            { key: "research", label: "Research" },
            { key: "compare", label: "Compare" },
            { key: "browse", label: "Browse" },
            { key: "notebook", label: "Notebook" + (entries.length > 0 ? " (" + entries.length + ")" : "") },
          ].map(({ key, label }) => (
            <button key={key} onClick={() => setMode(key)} style={{ padding: "5px 12px", background: mode === key ? gold : "transparent", color: mode === key ? dark : gold, border: "1px solid " + gold, borderRadius: 20, fontSize: 11, cursor: "pointer", fontFamily: "Georgia, serif", fontWeight: mode === key ? "bold" : "normal", transition: "all 0.15s ease", borderBottom: mode === key ? "2px solid " + dark : "1px solid " + gold }}>
              {label}
            </button>
          ))}
          <span style={{ fontSize: 11, color: "#a09070", marginLeft: 8, whiteSpace: "nowrap" }}>{isVip ? "Unlimited" : Math.max(0, 7 - aiUsageCount) + " of 7 AI queries remaining today"}</span>
        </div>
      </div>

      {/* Tradition filter bar */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 24px", background: "#ede8dc", borderBottom: "1px solid " + border, flexShrink: 0, flexWrap: "wrap" }}>
        <span style={{ fontSize: 10, fontWeight: "bold", color: mid, letterSpacing: 1, textTransform: "uppercase", marginRight: 4 }}>Show:</span>
        {ALL_TRADITIONS.map(t => {
          const active = activeTraditions.has(t);
          const c = COLORS[t];
          return <button key={t} onClick={() => toggleTradition(t)} style={{ padding: "4px 12px", background: active ? c.border : "#fff", color: active ? "#fff" : "#aaa", border: "2px solid " + (active ? c.border : "#ccc"), borderRadius: 12, fontSize: 11, cursor: "pointer", fontFamily: "Georgia, serif", fontWeight: active ? "bold" : "normal", opacity: active ? 1 : 0.6, transition: "all 0.15s ease" }}>{t}</button>;
        })}
        <button onClick={() => setActiveTraditions(new Set(ALL_TRADITIONS))} style={{ padding: "2px 8px", background: "transparent", color: mid, border: "none", fontSize: 10, cursor: "pointer", fontFamily: "Georgia, serif", textDecoration: "underline" }}>All</button>
      </div>

      {/* AI limit notification */}
      {aiLimitMessage && (
        <div style={{ padding: "10px 24px", background: "#fdf6e3", borderBottom: "1px solid #e8d9a0", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
          <span style={{ fontSize: 13, color: "#7a6a3a", lineHeight: 1.5 }}>{aiLimitMessage}</span>
          <button onClick={() => setAiLimitMessage("")} style={{ background: "transparent", border: "none", color: "#a09070", fontSize: 16, cursor: "pointer", padding: "0 4px", fontFamily: "Georgia, serif" }}>×</button>
        </div>
      )}

      {/* RESEARCH MODE */}
      {mode === "research" && (
        <div className="research-layout" style={{ display: "flex", flex: 1, overflow: "hidden" }}>
          <div className="research-chat" style={{ flex: 3, display: "flex", flexDirection: "column", borderRight: "2px solid " + border, overflow: "hidden" }}>
            <div style={{ flex: 1, overflowY: "auto", padding: "20px 24px", display: "flex", flexDirection: "column", gap: 14 }}>
              {messages.length === 0 && (
                <div style={{ textAlign: "center", padding: "40px 20px", color: mid }}>
                  <p style={{ fontSize: 17, color: "#5a4a2a", marginBottom: 16 }}>Ask a theological question</p>
                  <div style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "center" }}>
                    {[
                      "What does the Westminster Confession teach about justification?",
                      "Compare baptism across Reformed and Lutheran traditions",
                      "Explain the Heidelberg Catechism's view of the Lord's Supper",
                    ].map((q) => (
                      <button key={q} onClick={() => setInput(q)} style={{ padding: "8px 16px", background: "#fff", border: "1px solid " + border, borderRadius: 8, fontSize: 13, color: "#5a4a2a", cursor: "pointer", fontFamily: "Georgia, serif", fontStyle: "italic", lineHeight: 1.5, maxWidth: 440, transition: "all 0.15s ease" }} onMouseEnter={(e) => { e.currentTarget.style.borderColor = gold; e.currentTarget.style.background = light; }} onMouseLeave={(e) => { e.currentTarget.style.borderColor = border; e.currentTarget.style.background = "#fff"; }}>
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              {messages.map((msg, i) => (
                <div key={i}>
                  {msg.isError ? (
                    <div style={{ background: "#fef2f2", border: "1px solid #e8b4b4", borderRadius: "2px 12px 12px 12px", padding: "14px 18px", display: "flex", alignItems: "flex-start", gap: 12 }}>
                      <span style={{ fontSize: 16, color: "#aa5a5a", lineHeight: 1, flexShrink: 0, marginTop: 1 }}>!</span>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 13, color: "#7a2a2a", lineHeight: 1.6 }}>{msg.content}</div>
                        <button onClick={askQuestion} style={{ marginTop: 8, padding: "4px 14px", background: "#fff", border: "1px solid #e8b4b4", borderRadius: 6, fontSize: 12, color: "#7a2a2a", cursor: "pointer", fontFamily: "Georgia, serif" }}>Try Again</button>
                      </div>
                    </div>
                  ) : (
                  <div style={{ background: msg.role === "user" ? dark : "#fff", color: msg.role === "user" ? cream : dark, borderRadius: msg.role === "user" ? "12px 12px 2px 12px" : "2px 12px 12px 12px", padding: "12px 16px", border: msg.role === "user" ? "none" : "1px solid " + border, boxShadow: "0 1px 3px rgba(0,0,0,0.06)", display: "inline-block", maxWidth: msg.role === "user" ? "75%" : "100%", float: msg.role === "user" ? "right" : "none", clear: "both" }}>
                    <div style={{ fontSize: 10, fontWeight: "bold", letterSpacing: 1, textTransform: "uppercase", marginBottom: 5, color: msg.role === "user" ? gold : mid }}>{msg.role === "user" ? "You" : "Research Assistant"}</div>
                    <div style={{ fontSize: 14, lineHeight: 1.75, whiteSpace: "pre-wrap" }}>{msg.content}</div>
                    {msg.role === "assistant" && <button onClick={() => saveEntry(msg.question || "", msg.content)} style={{ marginTop: 10, padding: "4px 12px", background: light, border: "1px solid " + border, borderRadius: 8, fontSize: 12, color: mid, cursor: "pointer", fontFamily: "Georgia, serif" }}>Save to Notebook</button>}
                  </div>
                  )}
                  <div style={{ clear: "both" }} />
                </div>
              ))}
              {loading && <div style={{ background: "#fff", border: "1px solid " + border, borderRadius: "2px 12px 12px 12px", padding: "12px 16px", animation: "pulse 2s ease-in-out infinite" }}><div style={{ fontSize: 10, fontWeight: "bold", letterSpacing: 1, textTransform: "uppercase", color: mid, marginBottom: 5 }}>Research Assistant</div><LoadingDots text="Researching" color={mid} /></div>}
            </div>
            <div style={{ padding: "12px 20px 16px", borderTop: "1px solid " + border, display: "flex", gap: 10, background: cream }}>
              <textarea style={{ flex: 1, padding: "10px 14px", fontSize: 14, fontFamily: "Georgia, serif", border: "1px solid " + border, borderRadius: 8, background: "#fff", color: dark, resize: "none", outline: "none" }} value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); askQuestion(); } }} placeholder="Ask about any doctrine, confession, or catechism..." rows={3} />
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <button onClick={askQuestion} disabled={loading} style={{ flex: 1, padding: "0 18px", background: loading ? border : gold, color: loading ? mid : dark, border: "none", borderRadius: 8, fontSize: 14, fontWeight: "bold", cursor: loading ? "not-allowed" : "pointer", fontFamily: "Georgia, serif" }}>{loading ? "..." : "Ask"}</button>
                {messages.length > 0 && <button onClick={resetResearch} style={{ padding: "6px 10px", background: "#fff", color: mid, border: "1px solid " + border, borderRadius: 8, fontSize: 11, cursor: "pointer", fontFamily: "Georgia, serif" }}>↺ New Search</button>}
              </div>
            </div>
          </div>
          <div className="research-sources" style={{ flex: 2, overflowY: "auto", background: light, display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 18px", borderBottom: "1px solid " + border, background: "#ede8dc" }}>
              <span style={{ fontSize: 13, fontWeight: "bold", color: "#5a4a2a" }}>Sources</span>
              {citations.length > 0 && <span style={{ fontSize: 11, color: mid, background: border, padding: "2px 8px", borderRadius: 10 }}>{citations.length} references</span>}
            </div>
            {citationsLoading && <div style={{ padding: "24px", textAlign: "center" }}><LoadingDots text="Identifying sources" color={mid} /></div>}
            {!citationsLoading && citations.length === 0 && <div style={{ padding: "32px 20px", textAlign: "center", color: mid, fontSize: 13 }}>Sources will appear here after your first question.</div>}
            {!citationsLoading && citations.filter(c => activeTraditions.has(c.tradition)).map((cite, i) => {
              const c = COLORS[cite.tradition] || COLORS.Ecumenical;
              return (
                <div key={i} style={{ margin: "10px 12px", padding: "12px 14px", background: "#fff", borderRadius: 8, borderLeft: "4px solid " + c.border, boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
                  <div style={{ display: "inline-block", fontSize: 10, fontWeight: "bold", letterSpacing: 1, textTransform: "uppercase", padding: "2px 8px", borderRadius: 10, marginBottom: 6, background: c.bg, color: c.text }}>{cite.tradition}</div>
                  <div style={{ fontSize: 13, fontWeight: "bold", color: dark, marginBottom: 2 }}>{cite.confession}</div>
                  <div style={{ fontSize: 12, color: mid, marginBottom: 6, fontStyle: "italic" }}>{cite.reference}</div>
                  {cite.quote && <div style={{ fontSize: 12, color: "#4a3a1a", lineHeight: 1.6, borderLeft: "2px solid " + border, paddingLeft: 8, marginBottom: 6, fontStyle: "italic" }}>{cite.quote}</div>}
                  {cite.relevance && <div style={{ fontSize: 11, color: mid }}>{cite.relevance}</div>}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* COMPARE MODE */}
      {mode === "compare" && (
        <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
          <div style={{ padding: "18px 24px", borderBottom: "1px solid " + border, background: cream, flexShrink: 0 }}>
            <p style={{ margin: "0 0 10px", fontSize: 14, color: "#5a4a2a" }}>Enter a doctrine or topic to compare across traditions:</p>
            <div style={{ display: "flex", gap: 10 }}>
              <input style={{ flex: 1, padding: "10px 14px", fontSize: 14, fontFamily: "Georgia, serif", border: "1px solid " + border, borderRadius: 8, outline: "none", color: dark, background: "#fff" }} value={compareInput} onChange={(e) => setCompareInput(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") runComparison(); }} placeholder="e.g. Baptism, Justification, Theosis" />
              <button onClick={runComparison} disabled={compareLoading} style={{ padding: "0 18px", background: compareLoading ? border : gold, color: compareLoading ? mid : dark, border: "none", borderRadius: 8, fontSize: 14, fontWeight: "bold", cursor: compareLoading ? "not-allowed" : "pointer", fontFamily: "Georgia, serif" }}>{compareLoading ? "Comparing..." : "Compare"}</button>
              {comparisonData && <button onClick={resetCompare} style={{ padding: "0 14px", background: "#fff", color: mid, border: "1px solid " + border, borderRadius: 8, fontSize: 12, cursor: "pointer", fontFamily: "Georgia, serif" }}>↺ New</button>}
            </div>
            <div style={{ display: "flex", gap: 8, marginTop: 10, flexWrap: "wrap" }}>
              {["Baptism", "Justification", "The Lord's Supper", "Original Sin", "Scripture", "Predestination", "The Church"].map((t) => (
                <button key={t} onClick={() => setCompareInput(t)} style={{ padding: "3px 12px", background: "#fff", border: "1px solid " + border, borderRadius: 14, fontSize: 12, color: "#5a4a2a", cursor: "pointer", fontFamily: "Georgia, serif", transition: "all 0.15s ease" }} onMouseEnter={(e) => { e.currentTarget.style.borderColor = gold; e.currentTarget.style.background = light; }} onMouseLeave={(e) => { e.currentTarget.style.borderColor = border; e.currentTarget.style.background = "#fff"; }}>{t}</button>
              ))}
            </div>
          </div>
          {compareError && <ErrorBox message="Unable to complete the comparison. Please try again." onRetry={runComparison} />}
          {compareLoading && <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 8 }}><div style={{ fontSize: 18, color: "#5a4a2a" }}><LoadingDots text="Comparing traditions" color="#5a4a2a" /></div><div style={{ fontSize: 13, color: mid, fontStyle: "italic", animation: "pulse 2s ease-in-out infinite" }}>Consulting confessions and catechisms</div></div>}
          {!comparisonData && !compareLoading && !compareError && <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", padding: 40, textAlign: "center" }}><p style={{ fontSize: 17, color: "#5a4a2a", marginBottom: 8 }}>Compare any doctrine across traditions</p><p style={{ fontSize: 13, color: mid, maxWidth: 440, lineHeight: 1.7, marginBottom: 16 }}>Select a suggested topic above or type your own. Use the filter bar to choose which traditions to include.</p></div>}
          {comparisonData && !compareLoading && (
            <div style={{ flex: 1, overflowY: "auto", padding: "20px 24px" }}>
              <h2 style={{ margin: "0 0 6px", fontSize: 20, color: dark }}>{comparisonData.topic}</h2>
              <p style={{ margin: "0 0 18px", fontSize: 13, color: "#5a4a2a", fontStyle: "italic", lineHeight: 1.7 }}>{comparisonData.summary}</p>
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                  <thead>
                    <tr>
                      <th style={{ padding: "10px 14px", background: dark, color: cream, textAlign: "left", fontSize: 12, minWidth: 110 }}>Aspect</th>
                      {visibleTraditions.map(t => <th key={t} style={{ padding: "10px 14px", background: COLORS[t].header, color: "#fff", textAlign: "left", fontSize: 12, minWidth: 155 }}>{t}</th>)}
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonData.rows.map((row, i) => (
                      <tr key={i} style={{ background: i % 2 === 0 ? "#fff" : cream }}>
                        <td style={{ padding: "12px 14px", fontWeight: "bold", fontSize: 12, color: dark, borderRight: "2px solid " + border, verticalAlign: "top", background: light }}>{row.aspect}</td>
                        {visibleTraditions.map(t => {
                          const cell = row[t]; const c = COLORS[t];
                          return <td key={t} style={{ padding: "12px 14px", verticalAlign: "top", borderRight: "1px solid #ede8dc" }}>{cell ? <div><div style={{ fontSize: 12, color: dark, lineHeight: 1.6, marginBottom: 3 }}>{cell.position}</div>{cell.citation && <div style={{ fontSize: 11, fontWeight: "bold", color: c.header }}>{cell.citation}</div>}</div> : <span style={{ color: "#ccc" }}>-</span>}</td>;
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}

      {/* BROWSE MODE */}
      {mode === "browse" && (
        <div className="browse-layout" style={{ display: "flex", flex: 1, overflow: "hidden" }}>

          {/* Confession list */}
          <div className="browse-sidebar" style={{ width: 200, borderRight: "2px solid " + border, overflowY: "auto", background: light, flexShrink: 0 }}>
            <div style={{ padding: "12px 16px", borderBottom: "1px solid " + border, background: "#ede8dc", fontSize: 11, fontWeight: "bold", color: mid, letterSpacing: 1, textTransform: "uppercase" }}>Confessions</div>
            {confessionNames.map(name => {
              const conf = CONFESSIONS[name];
              const c = COLORS[conf.tradition];
              const active = selectedConfession === name;
              return (
                <div key={name} onClick={() => { setSelectedConfession(name); setSelectedChapter(null); }} style={{ padding: "10px 14px", borderBottom: "1px solid " + border, cursor: "pointer", background: active ? c.bg : "transparent", borderLeft: active ? "3px solid " + c.border : "3px solid transparent" }}>
                  <div style={{ fontSize: 12, fontWeight: "bold", color: active ? c.text : dark, lineHeight: 1.4 }}>{name}</div>
                  <div style={{ fontSize: 10, color: mid, marginTop: 2 }}>{conf.tradition} - {conf.year}</div>
                  {name === "Roman Catechism" && <div style={{ fontSize: 10, fontStyle: "italic", color: "#a09070", marginTop: 4, paddingLeft: 6, lineHeight: 1.3 }}>AI responses may also reference the modern Catechism (1992) where teaching has developed.</div>}
                </div>
              );
            })}
          </div>

          {/* Chapter list */}
          {currentConfession && (
            <div className="browse-chapters" style={{ width: 200, borderRight: "2px solid " + border, overflowY: "auto", background: "#fff", flexShrink: 0 }}>
              <div style={{ padding: "12px 16px", borderBottom: "1px solid " + border, background: "#ede8dc", fontSize: 11, fontWeight: "bold", color: mid, letterSpacing: 1, textTransform: "uppercase" }}>Chapters</div>
              {currentConfession.chapters.map((ch, idx) => {
                const active = selectedChapter === idx;
                const c = COLORS[currentConfession.tradition];
                return (
                  <div key={idx} onClick={() => setSelectedChapter(idx)} style={{ padding: "10px 14px", borderBottom: "1px solid " + border, cursor: "pointer", background: active ? c.bg : "transparent", borderLeft: active ? "3px solid " + c.border : "3px solid transparent" }}>
                    <div style={{ fontSize: 11, color: mid, marginBottom: 2 }}>Chapter {ch.number}</div>
                    <div style={{ fontSize: 12, fontWeight: active ? "bold" : "normal", color: active ? c.text : dark, lineHeight: 1.4 }}>{ch.title}</div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Section text + commentary */}
          <div style={{ flex: 1, overflowY: "auto", padding: "24px 28px" }}>
            {!selectedConfession && (
              <div style={{ textAlign: "center", padding: "60px 20px", color: mid }}>
                <p style={{ fontSize: 17, color: "#5a4a2a", marginBottom: 8 }}>Browse the Source Texts</p>
                <p style={{ fontSize: 13, lineHeight: 1.7 }}>Select a document from the left to read the original text. Click any section to get AI commentary on its historical context and theological significance.</p>
              </div>
            )}
            {selectedConfession && !selectedChapter === true && selectedChapter !== 0 && (
              <div style={{ textAlign: "center", padding: "60px 20px", color: mid }}>
                <p style={{ fontSize: 15, color: "#5a4a2a" }}>Select a chapter to begin reading</p>
              </div>
            )}
            {currentChapter && (
              <div>
                <div style={{ marginBottom: 24 }}>
                  <div style={{ fontSize: 11, color: mid, textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 }}>{selectedConfession} - {currentConfession.year}</div>
                  <h2 style={{ margin: "0 0 4px", fontSize: 20, color: dark }}>Chapter {currentChapter.number}</h2>
                  <h3 style={{ margin: 0, fontSize: 15, color: "#5a4a2a", fontWeight: "normal" }}>{currentChapter.title}</h3>
                </div>
                {currentChapter.sections.map((section) => {
                  const key = selectedConfession + "-" + currentChapter.title + "-" + section.number;
                  const hasCommentary = commentary[key];
                  const isLoading = commentaryLoading === key;
                  return (
                    <div key={section.number} style={{ marginBottom: 28, paddingBottom: 28, borderBottom: "1px solid " + border }}>
                      <div style={{ fontSize: 11, fontWeight: "bold", color: COLORS[currentConfession.tradition].header, textTransform: "uppercase", letterSpacing: 1, marginBottom: 8 }}>Section {section.number}</div>
                      <p style={{ fontSize: 15, lineHeight: 1.85, color: dark, margin: "0 0 12px", fontStyle: "italic" }}>{section.text}</p>
                      {!hasCommentary && !isLoading && (
                        <button onClick={() => getCommentary(selectedConfession, currentChapter.title, section.number, section.text)} style={{ padding: "4px 12px", background: "#fff", border: "1px solid " + border, borderRadius: 6, fontSize: 12, color: mid, cursor: "pointer", fontFamily: "Georgia, serif" }}>
                          Get Commentary
                        </button>
                      )}
                      {isLoading && <div style={{ fontSize: 12, color: mid }}><LoadingDots text="Loading commentary" color={mid} /></div>}
                      {hasCommentary && hasCommentary.error && (
                        <div style={{ marginTop: 10, padding: "12px 14px", background: "#fef2f2", border: "1px solid #e8b4b4", borderRadius: 8, display: "flex", alignItems: "flex-start", gap: 10 }}>
                          <span style={{ fontSize: 14, color: "#aa5a5a", lineHeight: 1, flexShrink: 0, marginTop: 1 }}>!</span>
                          <div style={{ flex: 1 }}>
                            <div style={{ fontSize: 12, color: "#7a2a2a", lineHeight: 1.5 }}>{hasCommentary.message}</div>
                            <button onClick={() => { setCommentary(prev => { const next = { ...prev }; delete next[key]; return next; }); getCommentary(selectedConfession, currentChapter.title, section.number, section.text); }} style={{ marginTop: 6, padding: "3px 12px", background: "#fff", border: "1px solid #e8b4b4", borderRadius: 6, fontSize: 11, color: "#7a2a2a", cursor: "pointer", fontFamily: "Georgia, serif" }}>Try Again</button>
                          </div>
                        </div>
                      )}
                      {hasCommentary && !hasCommentary.error && (
                        <div style={{ marginTop: 10, padding: "12px 14px", background: light, borderRadius: 8, borderLeft: "3px solid " + COLORS[currentConfession.tradition].border }}>
                          <div style={{ fontSize: 10, fontWeight: "bold", color: mid, letterSpacing: 1, textTransform: "uppercase", marginBottom: 6 }}>Commentary</div>
                          <div style={{ fontSize: 13, color: dark, lineHeight: 1.7 }}>{hasCommentary}</div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}

      {/* NOTEBOOK MODE */}
      {mode === "notebook" && (
        <div style={{ flex: 1, overflowY: "auto", padding: "20px 28px" }}>
          {/* Add Note Panel */}
          <div style={{ marginBottom: 24 }}>
            {!addingNewNote ? (
              <button onClick={() => setAddingNewNote(true)} style={{ padding: "8px 20px", background: gold, color: dark, border: "none", borderRadius: 8, fontSize: 13, fontWeight: "bold", cursor: "pointer", fontFamily: "Georgia, serif" }}>+ Add Note</button>
            ) : (
              <div style={{ background: "#fff", border: "1px solid " + border, borderRadius: 10, padding: "16px 18px", boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
                <div style={{ fontSize: 12, fontWeight: "bold", color: mid, textTransform: "uppercase", letterSpacing: 1, marginBottom: 8 }}>New Note</div>
                <textarea
                  style={{ width: "100%", padding: "10px", fontSize: 14, fontFamily: "Georgia, serif", border: "1px solid " + border, borderRadius: 6, color: dark, resize: "vertical", outline: "none", minHeight: 100, boxSizing: "border-box" }}
                  value={newNoteText}
                  onChange={(e) => setNewNoteText(e.target.value)}
                  placeholder="Write your note, reflection, or observation..."
                  autoFocus
                />
                <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
                  <button onClick={addStandaloneNote} style={{ padding: "6px 18px", background: gold, color: dark, border: "none", borderRadius: 6, fontSize: 13, cursor: "pointer", fontFamily: "Georgia, serif", fontWeight: "bold" }}>Save Note</button>
                  <button onClick={() => { setAddingNewNote(false); setNewNoteText(""); }} style={{ padding: "6px 14px", background: "#fff", color: mid, border: "1px solid " + border, borderRadius: 6, fontSize: 13, cursor: "pointer", fontFamily: "Georgia, serif" }}>Cancel</button>
                </div>
              </div>
            )}
          </div>

          {entries.length === 0 ? (
            <div style={{ textAlign: "center", padding: "40px 20px", color: mid }}>
              <p style={{ fontSize: 17, color: "#5a4a2a", marginBottom: 8 }}>Your research notebook is empty</p>
              <p style={{ fontSize: 13 }}>Click <strong>+ Add Note</strong> to write your own notes, or ask a question in Research mode and click Save to Notebook.</p>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h2 style={{ margin: 0, fontSize: 18, color: dark }}>Research Notebook</h2>
                <span style={{ fontSize: 12, color: mid }}>{entries.length} saved {entries.length === 1 ? "entry" : "entries"}</span>
              </div>
              {entries.map((entry) => (
                <div key={entry.id} style={{ background: "#fff", border: "1px solid " + border, borderRadius: 10, overflow: "hidden", boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
                  <div style={{ padding: "12px 18px", background: light, borderBottom: "1px solid " + border, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div style={{ fontSize: 12, color: mid }}>{entry.date}</div>
                      {entry.isStandalone && <span style={{ fontSize: 10, padding: "2px 8px", background: "#fffdf5", border: "1px solid " + border, borderRadius: 10, color: mid, letterSpacing: 1, textTransform: "uppercase" }}>Note</span>}
                    </div>
                    <button onClick={() => deleteEntry(entry.id)} style={{ background: "transparent", border: "none", color: "#cc6666", fontSize: 12, cursor: "pointer", fontFamily: "Georgia, serif" }}>Delete</button>
                  </div>
                  <div style={{ padding: "14px 18px" }}>
                    {entry.isStandalone ? (
                      <div>
                        {editingId === entry.id ? (
                          <div>
                            <textarea style={{ width: "100%", padding: "10px", fontSize: 14, fontFamily: "Georgia, serif", border: "1px solid " + border, borderRadius: 6, color: dark, resize: "vertical", outline: "none", minHeight: 80, boxSizing: "border-box" }} value={editingNote} onChange={(e) => setEditingNote(e.target.value)} autoFocus />
                            <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
                              <button onClick={() => saveNote(entry.id)} style={{ padding: "5px 16px", background: gold, color: dark, border: "none", borderRadius: 6, fontSize: 13, cursor: "pointer", fontFamily: "Georgia, serif", fontWeight: "bold" }}>Save</button>
                              <button onClick={() => { setEditingId(null); setEditingNote(""); }} style={{ padding: "5px 16px", background: "#fff", color: mid, border: "1px solid " + border, borderRadius: 6, fontSize: 13, cursor: "pointer", fontFamily: "Georgia, serif" }}>Cancel</button>
                            </div>
                          </div>
                        ) : (
                          <div>
                            <div style={{ fontSize: 14, color: dark, lineHeight: 1.75, whiteSpace: "pre-wrap", marginBottom: 10 }}>{entry.note}</div>
                            <button onClick={() => { setEditingId(entry.id); setEditingNote(entry.note); }} style={{ padding: "5px 14px", background: "#fff", border: "1px solid " + border, borderRadius: 6, fontSize: 12, color: mid, cursor: "pointer", fontFamily: "Georgia, serif" }}>Edit Note</button>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div>
                        <div style={{ fontSize: 12, fontWeight: "bold", color: mid, textTransform: "uppercase", letterSpacing: 1, marginBottom: 6 }}>Question</div>
                        <div style={{ fontSize: 14, color: dark, marginBottom: 14, fontStyle: "italic" }}>{entry.question}</div>
                        <div style={{ fontSize: 12, fontWeight: "bold", color: mid, textTransform: "uppercase", letterSpacing: 1, marginBottom: 6 }}>Response</div>
                        <div style={{ fontSize: 14, color: dark, lineHeight: 1.75, whiteSpace: "pre-wrap", marginBottom: 14 }}>{entry.answer}</div>
                        <div style={{ fontSize: 12, fontWeight: "bold", color: mid, textTransform: "uppercase", letterSpacing: 1, marginBottom: 6 }}>Your Notes</div>
                        {editingId === entry.id ? (
                          <div>
                            <textarea style={{ width: "100%", padding: "10px", fontSize: 14, fontFamily: "Georgia, serif", border: "1px solid " + border, borderRadius: 6, color: dark, resize: "vertical", outline: "none", minHeight: 80, boxSizing: "border-box" }} value={editingNote} onChange={(e) => setEditingNote(e.target.value)} placeholder="Add your own notes, reflections, or follow-up questions..." autoFocus />
                            <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
                              <button onClick={() => saveNote(entry.id)} style={{ padding: "5px 16px", background: gold, color: dark, border: "none", borderRadius: 6, fontSize: 13, cursor: "pointer", fontFamily: "Georgia, serif", fontWeight: "bold" }}>Save Note</button>
                              <button onClick={() => { setEditingId(null); setEditingNote(""); }} style={{ padding: "5px 16px", background: "#fff", color: mid, border: "1px solid " + border, borderRadius: 6, fontSize: 13, cursor: "pointer", fontFamily: "Georgia, serif" }}>Cancel</button>
                            </div>
                          </div>
                        ) : (
                          <div>
                            {entry.note && <div style={{ padding: "8px 10px", border: "1px solid " + border, borderRadius: 6, fontSize: 14, color: dark, lineHeight: 1.6, whiteSpace: "pre-wrap", marginBottom: 8, background: "#fffdf5" }}>{entry.note}</div>}
                            <button onClick={() => { setEditingId(entry.id); setEditingNote(entry.note); }} style={{ padding: "5px 14px", background: "#fff", border: "1px solid " + border, borderRadius: 6, fontSize: 12, color: mid, cursor: "pointer", fontFamily: "Georgia, serif" }}>{entry.note ? "Edit Note" : "+ Add a Note"}</button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
