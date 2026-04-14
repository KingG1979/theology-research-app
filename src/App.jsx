import { useState, useEffect, useMemo } from "react";
import { ALL_TRADITIONS, COLORS, CONFESSIONS } from "./data/confessions";
import { CONFESSIONS_DE } from "./data/confessions_de";
import { CONFESSIONS_DE_EXTRA } from "./data/confessions_de_extra";
import { SYSTEM_PROMPT, CITATION_PROMPT, COMPARISON_PROMPT } from "./prompts";
import { callAPI, extractText } from "./api";
import { parseCitations, parseComparison } from "./utils/parsers";
import { supabase } from "./supabase";
import { useI18n } from "./i18n/index.jsx";

// Merge all German confessions into one object
const CONFESSIONS_DE_ALL = { ...CONFESSIONS_DE, ...CONFESSIONS_DE_EXTRA };

// Map English confession keys ↔ German confession keys
const EN_TO_DE_KEY = {
  "Westminster Confession of Faith": "Westminsterbekenntnis",
  "Heidelberg Catechism": "Heidelberger Katechismus",
  "Augsburg Confession": "Augsburger Bekenntnis",
  "1689 Baptist Confession": "Baptistisches Bekenntnis von 1689",
  "Nicene Creed": "Nicänisches Glaubensbekenntnis",
  "Apostles' Creed": "Apostolisches Glaubensbekenntnis",
  "Athanasian Creed": "Athanasianisches Glaubensbekenntnis",
  "Definition of Chalcedon": "Definition von Chalcedon",
  "First Council of Constantinople — Canons": "Erstes Konzil von Konstantinopel — Kanones",
  "Second Council of Constantinople — Anathemas": "Zweites Konzil von Konstantinopel — Anathemata",
  "Third Council of Constantinople — Definition of Faith": "Drittes Konzil von Konstantinopel — Glaubensdefinition",
  "Longer Catechism (Orthodox)": "Orthodoxer Katechismus",
  "39 Articles": "39 Artikel der Kirche von England",
  "Roman Catechism": "Römischer Katechismus",
};
const DE_TO_EN_KEY = Object.fromEntries(Object.entries(EN_TO_DE_KEY).map(([en, de]) => [de, en]));

// Build German confessions object keyed by German names, preserving English order,
// falling back to English text when German is unavailable
function buildLocalizedConfessions(lang) {
  if (lang !== "de") return CONFESSIONS;
  const result = {};
  for (const enKey of Object.keys(CONFESSIONS)) {
    const deKey = EN_TO_DE_KEY[enKey];
    if (deKey && CONFESSIONS_DE_ALL[deKey]) {
      result[deKey] = CONFESSIONS_DE_ALL[deKey];
    } else {
      // Fallback: use English text with English key
      result[enKey] = CONFESSIONS[enKey];
    }
  }
  return result;
}

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

function AuthScreen({ onSuccess }) {
  const { t } = useI18n();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const gold = "#c9a84c";
  const dark = "#2c2416";
  const cream = "#faf8f4";
  const border = "#d4c4a0";
  const mid = "#8a7a5a";

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const { error: authError } = isSignUp
        ? await supabase.auth.signUp({ email, password })
        : await supabase.auth.signInWithPassword({ email, password });
      if (authError) throw authError;
      if (isSignUp) {
        setError(t.checkEmail);
        setIsSignUp(false);
        setPassword("");
      }
    } catch (err) {
      setError(err.message || t.authFailed);
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogleSignIn() {
    setError("");
    try {
      const { error: authError } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: { redirectTo: window.location.origin },
      });
      if (authError) throw authError;
    } catch (err) {
      setError(err.message || t.googleNotConfigured);
    }
  }

  return (
    <div style={{ fontFamily: "Georgia, serif", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ maxWidth: 400, width: "100%", padding: "40px 36px", background: "#fff", border: "1px solid " + border, borderRadius: 12, boxShadow: "0 4px 20px rgba(0,0,0,0.08)", textAlign: "center" }}>
        <div style={{ fontSize: 22, fontWeight: "bold", color: dark, marginBottom: 6 }}>
          {isSignUp ? t.createAccount : t.signIn}
        </div>
        <p style={{ fontSize: 13, color: mid, lineHeight: 1.6, marginBottom: 24 }}>
          {isSignUp ? t.createAccountDesc : t.signInDesc}
        </p>

        <button
          onClick={handleGoogleSignIn}
          style={{
            width: "100%", padding: "10px", background: "#fff", color: dark,
            border: "1px solid " + border, borderRadius: 8, fontSize: 14,
            cursor: "pointer", fontFamily: "Georgia, serif", marginBottom: 16,
            display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = "#f5f0e8"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "#fff"; }}
        >
          <svg width="18" height="18" viewBox="0 0 48 48"><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/></svg>
          {t.signInWithGoogle}
        </button>

        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
          <div style={{ flex: 1, height: 1, background: border }} />
          <span style={{ fontSize: 12, color: mid }}>{t.or}</span>
          <div style={{ flex: 1, height: 1, background: border }} />
        </div>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t.emailPlaceholder}
            required
            style={{
              width: "100%", padding: "10px 14px", fontSize: 14, fontFamily: "Georgia, serif",
              border: "1px solid " + border, borderRadius: 8, outline: "none", color: dark,
              background: "#fff", marginBottom: 10, boxSizing: "border-box",
            }}
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={t.passwordPlaceholder}
            required
            minLength={6}
            style={{
              width: "100%", padding: "10px 14px", fontSize: 14, fontFamily: "Georgia, serif",
              border: "1px solid " + border, borderRadius: 8, outline: "none", color: dark,
              background: "#fff", marginBottom: 16, boxSizing: "border-box",
            }}
          />
          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%", padding: "10px", background: loading ? border : gold, color: dark,
              border: "none", borderRadius: 8, fontSize: 15, fontWeight: "bold",
              cursor: loading ? "not-allowed" : "pointer", fontFamily: "Georgia, serif",
            }}
          >
            {loading ? "..." : isSignUp ? t.createAccount : t.signIn}
          </button>
        </form>

        {error && (
          <div style={{
            marginTop: 14, padding: "10px 14px", background: error === t.checkEmail ? "#f0faf0" : "#fef2f2",
            border: "1px solid " + (error === t.checkEmail ? "#b4e8b4" : "#e8b4b4"),
            borderRadius: 8, fontSize: 13,
            color: error === t.checkEmail ? "#2a6a2a" : "#7a2a2a", lineHeight: 1.5,
          }}>
            {error}
          </div>
        )}

        <div style={{ marginTop: 18, fontSize: 13, color: mid }}>
          {isSignUp ? t.alreadyHaveAccount : t.dontHaveAccount}{" "}
          <button
            onClick={() => { setIsSignUp(!isSignUp); setError(""); }}
            style={{
              background: "none", border: "none", color: gold, fontFamily: "Georgia, serif",
              fontSize: 13, cursor: "pointer", textDecoration: "underline", padding: 0,
            }}
          >
            {isSignUp ? t.signIn : t.signUp}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function TheologyAssistant() {
  const { lang, setLang, t } = useI18n();

  // Localized confessions: German texts when lang=de, English otherwise (with fallback)
  const localizedConfessions = useMemo(() => buildLocalizedConfessions(lang), [lang]);
  const confessionNames = useMemo(() => Object.keys(localizedConfessions), [localizedConfessions]);

  // Auth state
  const [session, setSession] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session: s } }) => {
      setSession(s);
      setAuthLoading(false);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, s) => {
      setSession(s);
    });
    return () => subscription.unsubscribe();
  }, []);

  // Welcome screen - show on first visit
  const [showWelcome, setShowWelcome] = useState(() => {
    return !localStorage.getItem("cacr-welcomed");
  });

  // Auth overlay — shown on demand (e.g. when user clicks Sign In or tries to save without session)
  const [showAuth, setShowAuth] = useState(false);

  // About modal
  const [showAbout, setShowAbout] = useState(false);

  // Suggestion / feedback box
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackText, setFeedbackText] = useState("");
  const [feedbackType, setFeedbackType] = useState("suggestion");
  const [feedbackSubmitting, setFeedbackSubmitting] = useState(false);
  const [feedbackDone, setFeedbackDone] = useState(false);
  const [feedbackError, setFeedbackError] = useState("");

  async function submitFeedback() {
    if (!feedbackText.trim()) return;
    setFeedbackSubmitting(true);
    setFeedbackError("");
    const payload = {
      type: feedbackType || "suggestion",
      message: feedbackText.trim(),
      user_email: session?.user?.email || "anonymous",
      page: mode || "unknown",
    };
    try {
      const { error } = await supabase.from("suggestions").insert(payload);
      if (error) throw error;

      // Also send to email endpoint (fires and forgets — email delivery is secondary)
      fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }).catch(() => {});

      setFeedbackDone(true);
      setFeedbackText("");
      setTimeout(() => { setShowFeedback(false); setFeedbackDone(false); }, 2000);
    } catch (e) {
      console.error("Feedback submit failed:", e);
      setFeedbackError("Could not send feedback — please try again.");
    } finally {
      setFeedbackSubmitting(false);
    }
  }

  function enterApp() {
    localStorage.setItem("cacr-welcomed", "true");
    setShowWelcome(false);
  }

  const gold = "#c9a84c";
  const dark = "#2c2416";
  const cream = "#faf8f4";
  const border = "#d4c4a0";
  const mid = "#8a7a5a";
  const light = "#f5f0e8";

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

  // Remap selectedConfession when language changes
  useEffect(() => {
    if (!selectedConfession) return;
    if (lang === "de") {
      const deKey = EN_TO_DE_KEY[selectedConfession];
      if (deKey && localizedConfessions[deKey]) {
        setSelectedConfession(deKey);
      } else if (!localizedConfessions[selectedConfession]) {
        setSelectedConfession(null);
        setSelectedChapter(null);
      }
    } else {
      const enKey = DE_TO_EN_KEY[selectedConfession];
      if (enKey && localizedConfessions[enKey]) {
        setSelectedConfession(enKey);
      } else if (!localizedConfessions[selectedConfession]) {
        setSelectedConfession(null);
        setSelectedChapter(null);
      }
    }
  }, [lang]);

  // Inject CSS keyframes once
  useEffect(() => {
    if (!document.getElementById("theology-animations")) {
      const style = document.createElement("style");
      style.id = "theology-animations";
      style.textContent = pulseKeyframes;
      document.head.appendChild(style);
    }
  }, []);

  // Load notes from Supabase when session changes
  useEffect(() => {
    if (!session) { setEntries([]); return; }
    async function fetchNotes() {
      const { data, error } = await supabase
        .from('notes')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) { console.error('Failed to load notes:', error); return; }
      setEntries(data.map(row => {
        let parsed = {};
        try { parsed = JSON.parse(row.content); } catch {}
        return {
          id: row.id,
          date: new Date(row.created_at).toLocaleDateString(),
          question: row.title || "",
          answer: parsed.answer || "",
          note: parsed.note || "",
          isStandalone: parsed.isStandalone || false,
        };
      }));
    }
    fetchNotes();
  }, [session]);

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

  async function addStandaloneNote() {
    if (!newNoteText.trim()) return;
    if (!session) { setShowAuth(true); return; }
    const content = JSON.stringify({ answer: "", note: newNoteText.trim(), isStandalone: true });
    const { data, error } = await supabase
      .from('notes')
      .insert({ user_id: session.user.id, title: "", content })
      .select()
      .single();
    if (error) { console.error('Failed to create note:', error); return; }
    const newEntry = { id: data.id, date: new Date(data.created_at).toLocaleDateString(), question: "", answer: "", note: newNoteText.trim(), isStandalone: true };
    setEntries(prev => [newEntry, ...prev]);
    setNewNoteText("");
    setAddingNewNote(false);
  }

  async function saveEntry(question, answer) {
    if (!session) { setShowAuth(true); return; }
    const content = JSON.stringify({ answer, note: "", isStandalone: false });
    const { data, error } = await supabase
      .from('notes')
      .insert({ user_id: session.user.id, title: question, content })
      .select()
      .single();
    if (error) { console.error('Failed to save entry:', error); return; }
    const newEntry = { id: data.id, date: new Date(data.created_at).toLocaleDateString(), question, answer, note: "", isStandalone: false };
    setEntries(prev => [newEntry, ...prev]);
    setMode("notebook");
  }

  async function deleteEntry(id) {
    const { error } = await supabase.from('notes').delete().eq('id', id);
    if (error) { console.error('Failed to delete note:', error); return; }
    setEntries(prev => prev.filter(e => e.id !== id));
  }

  async function saveNote(id) {
    const entry = entries.find(e => e.id === id);
    if (!entry) return;
    const content = JSON.stringify({ answer: entry.answer, note: editingNote, isStandalone: entry.isStandalone });
    const { error } = await supabase
      .from('notes')
      .update({ title: entry.question, content, updated_at: new Date().toISOString() })
      .eq('id', id);
    if (error) { console.error('Failed to update note:', error); return; }
    setEntries(prev => prev.map(e => e.id === id ? { ...e, note: editingNote } : e));
    setEditingId(null);
    setEditingNote("");
  }

  // Helper: try to match a citation string to a confession key in Browse
  function findConfessionFromCitation(citation) {
    if (!citation) return null;
    const c = citation.toLowerCase();
    if (c.includes("westminster") || /\bwcf\b/.test(c)) return "Westminster Confession of Faith";
    if (c.includes("heidelberg") || /\bhc\b/.test(c)) return "Heidelberg Catechism";
    if (c.includes("augsburg") || /\bca\b/.test(c)) return "Augsburg Confession";
    if (c.includes("1689") || (c.includes("baptist") && !c.includes("roman"))) return "1689 Baptist Confession";
    if (c.includes("nicene")) return "Nicene Creed";
    if (c.includes("apostles")) return "Apostles' Creed";
    if (c.includes("athanasian")) return "Athanasian Creed";
    if (c.includes("chalcedon")) return "Definition of Chalcedon";
    if (c.includes("orthodox") || c.includes("longer catechism")) return "Longer Catechism (Orthodox)";
    if (c.includes("39 articles") || c.includes("thirty-nine")) return "39 Articles";
    if (c.includes("roman catechism") || (c.includes("catechism") && c.includes("catholic"))) return "Roman Catechism";
    return null;
  }

  function toggleTradition(trad) {
    setActiveTraditions(prev => {
      const next = new Set(prev);
      if (next.has(trad)) { if (next.size > 1) next.delete(trad); } else { next.add(trad); }
      return next;
    });
  }

  async function getCommentary(confessionName, chapterTitle, sectionNumber, sectionText) {
    const key = confessionName + "-" + chapterTitle + "-" + sectionNumber;
    if (commentary[key]) return;
    if (!canUseAI()) {
      setAiLimitMessage(t.aiLimitReached);
      return;
    }
    setCommentaryLoading(key);
    try {
      const systemPrompt = lang === "de" ? SYSTEM_PROMPT + " Please respond in German (Deutsch)." : SYSTEM_PROMPT;
      const prompt = "Provide a brief scholarly commentary (3-4 sentences) on this section from " + confessionName + ", " + chapterTitle + ": " + sectionText + " Note its historical context, theological significance, and how it relates to other traditions.";
      const data = await callAPI({ max_tokens: 300, system: systemPrompt, messages: [{ role: "user", content: prompt }] });
      setCommentary(prev => ({ ...prev, [key]: extractText(data) }));
      incrementAIUsage();
    } catch (e) {
      console.error(e);
      setCommentary(prev => ({ ...prev, [key]: { error: true, message: t.unableToLoadCommentary } }));
    }
    finally { setCommentaryLoading(false); }
  }

  const visibleTraditions = ALL_TRADITIONS.filter(trad => activeTraditions.has(trad));

  async function askQuestion() {
    if (!input.trim()) return;
    if (!canUseAI()) {
      setAiLimitMessage(t.aiLimitReached);
      return;
    }
    const userMessage = { role: "user", content: input };
    const updated = [...messages, userMessage];
    const question = input;
    setMessages(updated); setInput(""); setLoading(true); setCitationsLoading(true); setCitations([]);
    try {
      const systemPrompt = lang === "de" ? SYSTEM_PROMPT + " Please respond in German (Deutsch)." : SYSTEM_PROMPT;
      const citationPrompt = lang === "de" ? CITATION_PROMPT + " Please respond in German (Deutsch)." : CITATION_PROMPT;
      const [ad, cd] = await Promise.all([
        callAPI({ max_tokens: 1000, system: systemPrompt, messages: updated }),
        callAPI({ max_tokens: 1000, system: citationPrompt, messages: [{ role: "user", content: question }] }),
      ]);
      const answer = extractText(ad);
      setMessages([...updated, { role: "assistant", content: answer, question }]);
      try { setCitations(parseCitations(extractText(cd))); } catch { setCitations([]); }
      incrementAIUsage();
    } catch (e) {
      console.error(e);
      setMessages([...updated, { role: "assistant", content: t.unableToReachAI, isError: true }]);
    }
    finally { setLoading(false); setCitationsLoading(false); }
  }

  async function runComparison() {
    if (!compareInput.trim()) return;
    if (!canUseAI()) {
      setAiLimitMessage(t.aiLimitReached);
      return;
    }
    setCompareLoading(true); setComparisonData(null); setCompareError(null);
    try {
      const comparisonPrompt = lang === "de" ? COMPARISON_PROMPT + " Please respond in German (Deutsch)." : COMPARISON_PROMPT;
      const data = await callAPI({ max_tokens: 1500, system: comparisonPrompt, messages: [{ role: "user", content: compareInput }] });
      const text = extractText(data);
      const parsed = parseComparison(text);
      if (!parsed.topic || parsed.rows.length === 0) throw new Error(t.couldNotParse);
      setComparisonData(parsed);
      incrementAIUsage();
    } catch (e) { console.error(e); setCompareError(e.message || "Unknown error."); }
    finally { setCompareLoading(false); }
  }

  // Footer element reused across welcome/loading screens
  const FooterBar = () => (
    <div style={{ padding: "6px 24px", background: dark, textAlign: "center", flexShrink: 0, borderTop: "1px solid " + border }}>
      <a href="https://www.ccc-study.org" target="_blank" rel="noopener noreferrer" style={{ fontSize: 10, color: "#a09070", fontFamily: "Georgia, serif", letterSpacing: 1, textDecoration: "none", opacity: 0.7 }}>www.ccc-study.org</a>
    </div>
  );

  // Show welcome screen on first visit
  if (showWelcome) {
    return (
      <div style={{ fontFamily: "Georgia, serif", height: "100vh", display: "flex", flexDirection: "column", alignItems: "stretch", background: cream }}>
        <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ maxWidth: 520, padding: "48px 44px", background: "#fff", border: "1px solid " + border, borderRadius: 12, boxShadow: "0 4px 20px rgba(0,0,0,0.08)", textAlign: "center" }}>
            <div style={{ fontSize: 24, fontWeight: "bold", color: dark, marginBottom: 16 }}>{t.appTitle}</div>
            <p style={{ fontSize: 14, color: "#5a4a2a", lineHeight: 1.8, marginBottom: 28 }}>
              {t.welcomeIntro}
            </p>
            <div style={{ textAlign: "left", marginBottom: 32 }}>
              {[
                { label: t.welcomeBrowseLabel, desc: t.welcomeBrowseDesc },
                { label: t.welcomeCompareLabel, desc: t.welcomeCompareDesc },
                { label: t.welcomeResearchLabel, desc: t.welcomeResearchDesc },
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
              {t.startExploring}
            </button>
          </div>
        </div>
        <FooterBar />
      </div>
    );
  }
  if (authLoading) {
    return (
      <div style={{ fontFamily: "Georgia, serif", height: "100vh", display: "flex", flexDirection: "column", alignItems: "stretch", background: cream }}>
        <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <LoadingDots text={t.loading} color={mid} />
        </div>
        <FooterBar />
      </div>
    );
  }

  const currentConfession = selectedConfession ? localizedConfessions[selectedConfession] : null;
  const currentChapter = selectedChapter !== null && currentConfession ? currentConfession.chapters[selectedChapter] : null;

  return (
    <div style={{ fontFamily: "Georgia, serif", height: "100vh", display: "flex", flexDirection: "column", background: cream, color: dark, overflow: "hidden" }}>

      {/* Header */}
      <div className="header-wrap" style={{ display: "flex", alignItems: "center", gap: 16, padding: "12px 24px", background: dark, flexShrink: 0 }}>
        <div className="header-title" style={{ flex: 1 }}>
          <div style={{ fontSize: 16, fontWeight: "bold", color: cream }}>{t.appTitle}</div>
          <div style={{ fontSize: 10, color: gold, letterSpacing: 1, textTransform: "uppercase", display: "flex", flexWrap: "wrap", gap: "0 2px", alignItems: "center" }}>
            {[
              { label: lang === "de" ? "Ökumenische Bekenntnisse" : "Ecumenical Creeds", enKey: "Nicene Creed" },
              { label: "Westminster", enKey: "Westminster Confession of Faith" },
              { label: "Heidelberg", enKey: "Heidelberg Catechism" },
              { label: "Augsburg", enKey: "Augsburg Confession" },
              { label: lang === "de" ? "1689 Baptistisch" : "1689 Baptist", enKey: "1689 Baptist Confession" },
              { label: lang === "de" ? "Orthodox" : "Orthodox", enKey: "Longer Catechism (Orthodox)" },
              { label: lang === "de" ? "39 Artikel" : "39 Articles", enKey: "39 Articles" },
            ].map(({ label, enKey }, i, arr) => {
              const confKey = lang === "de" ? (EN_TO_DE_KEY[enKey] || enKey) : enKey;
              return (
              <span key={enKey} style={{ display: "inline-flex", alignItems: "center", gap: 2 }}>
                <button
                  onClick={() => { setMode("browse"); setSelectedConfession(confKey); setSelectedChapter(null); }}
                  title={"Browse " + confKey}
                  style={{ background: "none", border: "none", color: gold, fontSize: 10, cursor: "pointer", fontFamily: "Georgia, serif", letterSpacing: 1, textTransform: "uppercase", padding: "0 2px", opacity: 0.85, transition: "opacity 0.15s" }}
                  onMouseEnter={e => e.currentTarget.style.opacity = "1"}
                  onMouseLeave={e => e.currentTarget.style.opacity = "0.85"}
                >{label}</button>
                {i < arr.length - 1 && <span style={{ color: "#a09070", fontSize: 10 }}>·</span>}
              </span>
            ); })}
          </div>
        </div>
        <div className="header-tabs" style={{ display: "flex", gap: 5, flexWrap: "wrap", justifyContent: "flex-end", alignItems: "center" }}>
          {[
            { key: "research", label: t.tabResearch },
            { key: "compare", label: t.tabCompare },
            { key: "browse", label: t.tabBrowse },
            { key: "notebook", label: t.tabNotebook + (entries.length > 0 ? " (" + entries.length + ")" : "") },
          ].map(({ key, label }) => (
            <button key={key} onClick={() => setMode(key)} style={{ padding: "5px 12px", background: mode === key ? gold : "transparent", color: mode === key ? dark : gold, border: "1px solid " + gold, borderRadius: 20, fontSize: 11, cursor: "pointer", fontFamily: "Georgia, serif", fontWeight: mode === key ? "bold" : "normal", transition: "all 0.15s ease", borderBottom: mode === key ? "2px solid " + dark : "1px solid " + gold }}>
              {label}
            </button>
          ))}
          <span style={{ fontSize: 11, color: "#a09070", marginLeft: 8, whiteSpace: "nowrap" }} title="Query count resets at midnight local time">{isVip ? t.unlimited : t.aiQueriesRemaining(Math.max(0, 7 - aiUsageCount))}</span>
          {/* Language toggle */}
          <div style={{ display: "flex", gap: 2, marginLeft: 4 }}>
            <button onClick={() => setLang("en")} style={{ padding: "2px 6px", background: lang === "en" ? gold : "transparent", color: lang === "en" ? dark : "#a09070", border: "1px solid " + (lang === "en" ? gold : "#a09070"), borderRadius: "6px 0 0 6px", fontSize: 10, cursor: "pointer", fontFamily: "Georgia, serif", fontWeight: lang === "en" ? "bold" : "normal" }}>EN</button>
            <button onClick={() => setLang("de")} style={{ padding: "2px 6px", background: lang === "de" ? gold : "transparent", color: lang === "de" ? dark : "#a09070", border: "1px solid " + (lang === "de" ? gold : "#a09070"), borderRadius: "0 6px 6px 0", fontSize: 10, cursor: "pointer", fontFamily: "Georgia, serif", fontWeight: lang === "de" ? "bold" : "normal" }}>DE</button>
          </div>
          <button onClick={() => setShowAbout(true)} style={{ padding: "3px 10px", background: "transparent", color: "#a09070", border: "1px solid #a09070", borderRadius: 12, fontSize: 10, cursor: "pointer", fontFamily: "Georgia, serif", marginLeft: 4, whiteSpace: "nowrap" }}>{t.about}</button>
          {session ? (
            <>
              <span style={{ fontSize: 10, color: "#a09070", marginLeft: 8, whiteSpace: "nowrap" }}>{session.user.email}</span>
              <button
                onClick={() => supabase.auth.signOut()}
                style={{ padding: "3px 10px", background: "transparent", color: "#a09070", border: "1px solid #a09070", borderRadius: 12, fontSize: 10, cursor: "pointer", fontFamily: "Georgia, serif", marginLeft: 4, whiteSpace: "nowrap" }}
              >
                {t.signOut}
              </button>
            </>
          ) : (
            <button
              onClick={() => setShowAuth(true)}
              style={{ padding: "3px 10px", background: "transparent", color: gold, border: "1px solid " + gold, borderRadius: 12, fontSize: 10, cursor: "pointer", fontFamily: "Georgia, serif", marginLeft: 8, whiteSpace: "nowrap" }}
            >
              {t.signIn}
            </button>
          )}
        </div>
      </div>

      {/* Tradition filter bar */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 24px", background: "#ede8dc", borderBottom: "1px solid " + border, flexShrink: 0, flexWrap: "wrap" }}>
        <span style={{ fontSize: 10, fontWeight: "bold", color: mid, letterSpacing: 1, textTransform: "uppercase", marginRight: 4 }}>{t.show}</span>
        {ALL_TRADITIONS.map(trad => {
          const active = activeTraditions.has(trad);
          const c = COLORS[trad];
          return <button key={trad} onClick={() => toggleTradition(trad)} style={{ padding: "4px 12px", background: active ? c.border : "#fff", color: active ? "#fff" : "#aaa", border: "2px solid " + (active ? c.border : "#ccc"), borderRadius: 12, fontSize: 11, cursor: "pointer", fontFamily: "Georgia, serif", fontWeight: active ? "bold" : "normal", opacity: active ? 1 : 0.6, transition: "all 0.15s ease" }}>{trad}</button>;
        })}
        <button onClick={() => setActiveTraditions(new Set(ALL_TRADITIONS))} style={{ padding: "2px 8px", background: "transparent", color: mid, border: "none", fontSize: 10, cursor: "pointer", fontFamily: "Georgia, serif", textDecoration: "underline" }}>{t.all}</button>
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
                  <p style={{ fontSize: 17, color: "#5a4a2a", marginBottom: 16 }}>{t.askTheologicalQuestion}</p>
                  <div style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "center" }}>
                    {[
                      t.sampleQuestion1,
                      t.sampleQuestion2,
                      t.sampleQuestion3,
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
                        <button onClick={askQuestion} style={{ marginTop: 8, padding: "4px 14px", background: "#fff", border: "1px solid #e8b4b4", borderRadius: 6, fontSize: 12, color: "#7a2a2a", cursor: "pointer", fontFamily: "Georgia, serif" }}>{t.tryAgain}</button>
                      </div>
                    </div>
                  ) : (
                  <div style={{ background: msg.role === "user" ? dark : "#fff", color: msg.role === "user" ? cream : dark, borderRadius: msg.role === "user" ? "12px 12px 2px 12px" : "2px 12px 12px 12px", padding: "12px 16px", border: msg.role === "user" ? "none" : "1px solid " + border, boxShadow: "0 1px 3px rgba(0,0,0,0.06)", display: "inline-block", maxWidth: msg.role === "user" ? "75%" : "100%", float: msg.role === "user" ? "right" : "none", clear: "both" }}>
                    <div style={{ fontSize: 10, fontWeight: "bold", letterSpacing: 1, textTransform: "uppercase", marginBottom: 5, color: msg.role === "user" ? gold : mid }}>{msg.role === "user" ? t.you : t.researchAssistant}</div>
                    <div style={{ fontSize: 14, lineHeight: 1.75, whiteSpace: "pre-wrap" }}>{msg.content}</div>
                    {msg.role === "assistant" && <button onClick={() => saveEntry(msg.question || "", msg.content)} style={{ marginTop: 10, padding: "4px 12px", background: light, border: "1px solid " + border, borderRadius: 8, fontSize: 12, color: mid, cursor: "pointer", fontFamily: "Georgia, serif" }}>{t.saveToNotebook}</button>}
                  </div>
                  )}
                  <div style={{ clear: "both" }} />
                </div>
              ))}
              {loading && <div style={{ background: "#fff", border: "1px solid " + border, borderRadius: "2px 12px 12px 12px", padding: "12px 16px", animation: "pulse 2s ease-in-out infinite" }}><div style={{ fontSize: 10, fontWeight: "bold", letterSpacing: 1, textTransform: "uppercase", color: mid, marginBottom: 5 }}>{t.researchAssistant}</div><LoadingDots text={t.researching} color={mid} /></div>}
            </div>
            <div style={{ padding: "12px 20px 16px", borderTop: "1px solid " + border, display: "flex", gap: 10, background: cream }}>
              <textarea style={{ flex: 1, padding: "10px 14px", fontSize: 14, fontFamily: "Georgia, serif", border: "1px solid " + border, borderRadius: 8, background: "#fff", color: dark, resize: "none", outline: "none" }} value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); askQuestion(); } }} placeholder={t.askPlaceholder} rows={3} />
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <button onClick={askQuestion} disabled={loading} style={{ flex: 1, padding: "0 18px", background: loading ? border : gold, color: loading ? mid : dark, border: "none", borderRadius: 8, fontSize: 14, fontWeight: "bold", cursor: loading ? "not-allowed" : "pointer", fontFamily: "Georgia, serif" }}>{loading ? "..." : t.ask}</button>
                {messages.length > 0 && <button onClick={resetResearch} style={{ padding: "6px 10px", background: "#fff", color: mid, border: "1px solid " + border, borderRadius: 8, fontSize: 11, cursor: "pointer", fontFamily: "Georgia, serif" }}>{t.newSearch}</button>}
              </div>
            </div>
          </div>
          <div className="research-sources" style={{ flex: 2, overflowY: "auto", background: light, display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 18px", borderBottom: "1px solid " + border, background: "#ede8dc" }}>
              <span style={{ fontSize: 13, fontWeight: "bold", color: "#5a4a2a" }}>{t.sources}</span>
              {citations.length > 0 && <span style={{ fontSize: 11, color: mid, background: border, padding: "2px 8px", borderRadius: 10 }}>{t.references(citations.length)}</span>}
            </div>
            {citationsLoading && <div style={{ padding: "24px", textAlign: "center" }}><LoadingDots text={t.identifyingSources} color={mid} /></div>}
            {!citationsLoading && citations.length === 0 && <div style={{ padding: "32px 20px", textAlign: "center", color: mid, fontSize: 13 }}>{t.sourcesPlaceholder}</div>}
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
            <p style={{ margin: "0 0 10px", fontSize: 14, color: "#5a4a2a" }}>{t.enterDoctrinePrompt}</p>
            <div style={{ display: "flex", gap: 10 }}>
              <input style={{ flex: 1, padding: "10px 14px", fontSize: 14, fontFamily: "Georgia, serif", border: "1px solid " + border, borderRadius: 8, outline: "none", color: dark, background: "#fff" }} value={compareInput} onChange={(e) => setCompareInput(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") runComparison(); }} placeholder={t.comparePlaceholder} />
              <button onClick={runComparison} disabled={compareLoading} style={{ padding: "0 18px", background: compareLoading ? border : gold, color: compareLoading ? mid : dark, border: "none", borderRadius: 8, fontSize: 14, fontWeight: "bold", cursor: compareLoading ? "not-allowed" : "pointer", fontFamily: "Georgia, serif" }}>{compareLoading ? t.comparing : t.compare}</button>
              {comparisonData && <button onClick={resetCompare} style={{ padding: "0 14px", background: "#fff", color: mid, border: "1px solid " + border, borderRadius: 8, fontSize: 12, cursor: "pointer", fontFamily: "Georgia, serif" }}>{t.newCompare}</button>}
            </div>
            <div style={{ display: "flex", gap: 8, marginTop: 10, flexWrap: "wrap" }}>
              {[
                { label: t.topicBaptism, value: "Baptism" },
                { label: t.topicJustification, value: "Justification" },
                { label: t.topicLordsSupper, value: "The Lord's Supper" },
                { label: t.topicOriginalSin, value: "Original Sin" },
                { label: t.topicScripture, value: "Scripture" },
                { label: t.topicPredestination, value: "Predestination" },
                { label: t.topicTheChurch, value: "The Church" },
              ].map(({ label, value }) => (
                <button key={value} onClick={() => setCompareInput(value)} style={{ padding: "3px 12px", background: "#fff", border: "1px solid " + border, borderRadius: 14, fontSize: 12, color: "#5a4a2a", cursor: "pointer", fontFamily: "Georgia, serif", transition: "all 0.15s ease" }} onMouseEnter={(e) => { e.currentTarget.style.borderColor = gold; e.currentTarget.style.background = light; }} onMouseLeave={(e) => { e.currentTarget.style.borderColor = border; e.currentTarget.style.background = "#fff"; }}>{label}</button>
              ))}
            </div>
          </div>
          {compareError && <ErrorBox message={t.unableToCompare} onRetry={runComparison} />}
          {compareLoading && <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 8 }}><div style={{ fontSize: 18, color: "#5a4a2a" }}><LoadingDots text={t.comparingTraditions} color="#5a4a2a" /></div><div style={{ fontSize: 13, color: mid, fontStyle: "italic", animation: "pulse 2s ease-in-out infinite" }}>{t.consultingTexts}</div></div>}
          {!comparisonData && !compareLoading && !compareError && <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", padding: 40, textAlign: "center" }}><p style={{ fontSize: 17, color: "#5a4a2a", marginBottom: 8 }}>{t.compareAnyDoctrine}</p><p style={{ fontSize: 13, color: mid, maxWidth: 440, lineHeight: 1.7, marginBottom: 16 }}>{t.compareInstructions}</p></div>}
          {comparisonData && !compareLoading && (
            <div style={{ flex: 1, overflowY: "auto", padding: "20px 24px" }}>
              <h2 style={{ margin: "0 0 6px", fontSize: 20, color: dark }}>{comparisonData.topic}</h2>
              <p style={{ margin: "0 0 18px", fontSize: 13, color: "#5a4a2a", fontStyle: "italic", lineHeight: 1.7 }}>{comparisonData.summary}</p>
              {visibleTraditions.length > 4 && <p style={{ margin: "0 0 8px", fontSize: 11, color: mid, fontStyle: "italic", textAlign: "right" }}>{t.scrollHint}</p>}
              <div style={{ overflowX: "auto", WebkitOverflowScrolling: "touch", scrollbarWidth: "thin", scrollbarColor: "#d4c4a0 transparent" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                  <thead>
                    <tr>
                      <th style={{ padding: "10px 14px", background: dark, color: cream, textAlign: "left", fontSize: 12, minWidth: 110 }}>{t.aspect}</th>
                      {visibleTraditions.map(trad => <th key={trad} style={{ padding: "10px 14px", background: COLORS[trad].header, color: "#fff", textAlign: "left", fontSize: 12, minWidth: 155 }}>{trad}</th>)}
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonData.rows.map((row, i) => (
                      <tr key={i} style={{ background: i % 2 === 0 ? "#fff" : cream }}>
                        <td style={{ padding: "12px 14px", fontWeight: "bold", fontSize: 12, color: dark, borderRight: "2px solid " + border, verticalAlign: "top", background: light }}>{row.aspect}</td>
                        {visibleTraditions.map(trad => {
                          const cell = row[trad]; const c = COLORS[trad];
                          return <td key={trad} style={{ padding: "12px 14px", verticalAlign: "top", borderRight: "1px solid #ede8dc" }}>{cell ? <div><div style={{ fontSize: 12, color: dark, lineHeight: 1.6, marginBottom: 3 }}>{cell.position}</div>{cell.citation && (() => { const confKey = findConfessionFromCitation(cell.citation); return confKey ? (<button onClick={() => { setMode("browse"); setSelectedConfession(confKey); setSelectedChapter(null); }} title={"Open in Browse: " + confKey} style={{ fontSize: 11, fontWeight: "bold", color: c.header, background: "none", border: "none", cursor: "pointer", padding: 0, fontFamily: "Georgia, serif", textDecoration: "underline", textUnderlineOffset: 2, textAlign: "left", display: "flex", alignItems: "center", gap: 3 }}>{cell.citation} <span style={{ fontSize: 10 }}>↗</span></button>) : (<div style={{ fontSize: 11, fontWeight: "bold", color: c.header }}>{cell.citation}</div>); })()}</div> : <span style={{ color: "#ccc" }}>-</span>}</td>;
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
            <div style={{ padding: "12px 16px", borderBottom: "1px solid " + border, background: "#ede8dc", fontSize: 11, fontWeight: "bold", color: mid, letterSpacing: 1, textTransform: "uppercase" }}>{t.confessions}</div>
            {confessionNames.map(name => {
              const conf = localizedConfessions[name];
              const c = COLORS[conf.tradition];
              const active = selectedConfession === name;
              return (
                <div key={name} onClick={() => { setSelectedConfession(name); setSelectedChapter(null); }} style={{ padding: "10px 14px", borderBottom: "1px solid " + border, cursor: "pointer", background: active ? c.bg : "transparent", borderLeft: active ? "3px solid " + c.border : "3px solid transparent" }}>
                  <div style={{ fontSize: 12, fontWeight: "bold", color: active ? c.text : dark, lineHeight: 1.4 }}>{name}</div>
                  <div style={{ fontSize: 10, color: mid, marginTop: 2 }}>{conf.tradition} - {conf.year}</div>
                  {(name === "Roman Catechism" || name === "Römischer Katechismus") && (
                    <div style={{ fontSize: 10, color: "#7a5a00", marginTop: 6, padding: "5px 8px", background: "#fdf3cd", border: "1px solid #e8c84a", borderRadius: 5, lineHeight: 1.5, display: "flex", gap: 5, alignItems: "flex-start" }}>
                      <span style={{ flexShrink: 0, fontSize: 11 }}>ⓘ</span>
                      <span>{t.romanCatechismNote}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Chapter list */}
          {currentConfession && (
            <div className="browse-chapters" style={{ width: 200, borderRight: "2px solid " + border, overflowY: "auto", background: "#fff", flexShrink: 0 }}>
              <div style={{ padding: "12px 16px", borderBottom: "1px solid " + border, background: "#ede8dc", fontSize: 11, fontWeight: "bold", color: mid, letterSpacing: 1, textTransform: "uppercase" }}>{t.chapters}</div>
              {currentConfession.chapters.map((ch, idx) => {
                const active = selectedChapter === idx;
                const c = COLORS[currentConfession.tradition];
                return (
                  <div key={idx} onClick={() => setSelectedChapter(idx)} style={{ padding: "10px 14px", borderBottom: "1px solid " + border, cursor: "pointer", background: active ? c.bg : "transparent", borderLeft: active ? "3px solid " + c.border : "3px solid transparent" }}>
                    <div style={{ fontSize: 11, color: mid, marginBottom: 2 }}>{t.chapter} {ch.number}</div>
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
                <p style={{ fontSize: 17, color: "#5a4a2a", marginBottom: 8 }}>{t.browseSourceTexts}</p>
                <p style={{ fontSize: 13, lineHeight: 1.7 }}>{t.browseInstructions}</p>
              </div>
            )}
            {selectedConfession && !selectedChapter === true && selectedChapter !== 0 && (
              <div style={{ textAlign: "center", padding: "60px 20px", color: mid }}>
                <p style={{ fontSize: 15, color: "#5a4a2a" }}>{t.selectChapter}</p>
              </div>
            )}
            {currentChapter && (
              <div>
                <div style={{ marginBottom: 24 }}>
                  <div style={{ fontSize: 11, color: mid, textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 }}>{selectedConfession} - {currentConfession.year}</div>
                  <h2 style={{ margin: "0 0 4px", fontSize: 20, color: dark }}>{t.chapter} {currentChapter.number}</h2>
                  <h3 style={{ margin: 0, fontSize: 15, color: "#5a4a2a", fontWeight: "normal" }}>{currentChapter.title}</h3>
                </div>
                {currentChapter.sections.map((section) => {
                  const key = selectedConfession + "-" + currentChapter.title + "-" + section.number;
                  const hasCommentary = commentary[key];
                  const isLoading = commentaryLoading === key;
                  return (
                    <div key={section.number} style={{ marginBottom: 28, paddingBottom: 28, borderBottom: "1px solid " + border }}>
                      <div style={{ fontSize: 11, fontWeight: "bold", color: COLORS[currentConfession.tradition].header, textTransform: "uppercase", letterSpacing: 1, marginBottom: 8 }}>{t.section} {section.number}</div>
                      <p style={{ fontSize: 15, lineHeight: 1.85, color: dark, margin: "0 0 12px", fontStyle: "italic" }}>{section.text}</p>
                      {!hasCommentary && !isLoading && (
                        <button onClick={() => getCommentary(selectedConfession, currentChapter.title, section.number, section.text)} style={{ padding: "4px 12px", background: "#fff", border: "1px solid " + border, borderRadius: 6, fontSize: 12, color: mid, cursor: "pointer", fontFamily: "Georgia, serif" }}>
                          {t.getCommentary}
                        </button>
                      )}
                      {isLoading && <div style={{ fontSize: 12, color: mid }}><LoadingDots text={t.loadingCommentary} color={mid} /></div>}
                      {hasCommentary && hasCommentary.error && (
                        <div style={{ marginTop: 10, padding: "12px 14px", background: "#fef2f2", border: "1px solid #e8b4b4", borderRadius: 8, display: "flex", alignItems: "flex-start", gap: 10 }}>
                          <span style={{ fontSize: 14, color: "#aa5a5a", lineHeight: 1, flexShrink: 0, marginTop: 1 }}>!</span>
                          <div style={{ flex: 1 }}>
                            <div style={{ fontSize: 12, color: "#7a2a2a", lineHeight: 1.5 }}>{hasCommentary.message}</div>
                            <button onClick={() => { setCommentary(prev => { const next = { ...prev }; delete next[key]; return next; }); getCommentary(selectedConfession, currentChapter.title, section.number, section.text); }} style={{ marginTop: 6, padding: "3px 12px", background: "#fff", border: "1px solid #e8b4b4", borderRadius: 6, fontSize: 11, color: "#7a2a2a", cursor: "pointer", fontFamily: "Georgia, serif" }}>{t.tryAgain}</button>
                          </div>
                        </div>
                      )}
                      {hasCommentary && !hasCommentary.error && (
                        <div style={{ marginTop: 10, padding: "12px 14px", background: light, borderRadius: 8, borderLeft: "3px solid " + COLORS[currentConfession.tradition].border }}>
                          <div style={{ fontSize: 10, fontWeight: "bold", color: mid, letterSpacing: 1, textTransform: "uppercase", marginBottom: 6 }}>{t.commentary}</div>
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
          {/* Sign-in prompt for unauthenticated users */}
          {!session && (
            <div style={{ marginBottom: 24, padding: "16px 20px", background: "#fffdf5", border: "1px solid " + border, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
              <span style={{ fontSize: 14, color: "#5a4a2a" }}>{t.signInToSaveNotes}</span>
              <button onClick={() => setShowAuth(true)} style={{ padding: "6px 18px", background: gold, color: dark, border: "none", borderRadius: 8, fontSize: 13, fontWeight: "bold", cursor: "pointer", fontFamily: "Georgia, serif" }}>{t.signIn}</button>
            </div>
          )}
          {/* Add Note Panel */}
          <div style={{ marginBottom: 24 }}>
            {!addingNewNote ? (
              <button onClick={() => { if (!session) { setShowAuth(true); return; } setAddingNewNote(true); }} style={{ padding: "8px 20px", background: gold, color: dark, border: "none", borderRadius: 8, fontSize: 13, fontWeight: "bold", cursor: "pointer", fontFamily: "Georgia, serif" }}>{t.addNote}</button>
            ) : (
              <div style={{ background: "#fff", border: "1px solid " + border, borderRadius: 10, padding: "16px 18px", boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
                <div style={{ fontSize: 12, fontWeight: "bold", color: mid, textTransform: "uppercase", letterSpacing: 1, marginBottom: 8 }}>{t.newNote}</div>
                <textarea
                  style={{ width: "100%", padding: "10px", fontSize: 14, fontFamily: "Georgia, serif", border: "1px solid " + border, borderRadius: 6, color: dark, resize: "vertical", outline: "none", minHeight: 100, boxSizing: "border-box" }}
                  value={newNoteText}
                  onChange={(e) => setNewNoteText(e.target.value)}
                  placeholder={t.notePlaceholder}
                  autoFocus
                />
                <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
                  <button onClick={addStandaloneNote} style={{ padding: "6px 18px", background: gold, color: dark, border: "none", borderRadius: 6, fontSize: 13, cursor: "pointer", fontFamily: "Georgia, serif", fontWeight: "bold" }}>{t.saveNote}</button>
                  <button onClick={() => { setAddingNewNote(false); setNewNoteText(""); }} style={{ padding: "6px 14px", background: "#fff", color: mid, border: "1px solid " + border, borderRadius: 6, fontSize: 13, cursor: "pointer", fontFamily: "Georgia, serif" }}>{t.cancel}</button>
                </div>
              </div>
            )}
          </div>

          {entries.length === 0 ? (
            <div style={{ textAlign: "center", padding: "40px 20px", color: mid }}>
              <p style={{ fontSize: 17, color: "#5a4a2a", marginBottom: 8 }}>{t.notebookEmpty}</p>
              <p style={{ fontSize: 13 }} dangerouslySetInnerHTML={{ __html: t.notebookEmptyDesc }} />
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h2 style={{ margin: 0, fontSize: 18, color: dark }}>{t.researchNotebook}</h2>
                <span style={{ fontSize: 12, color: mid }}>{t.savedEntries(entries.length)}</span>
              </div>
              {entries.map((entry) => (
                <div key={entry.id} style={{ background: "#fff", border: "1px solid " + border, borderRadius: 10, overflow: "hidden", boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
                  <div style={{ padding: "12px 18px", background: light, borderBottom: "1px solid " + border, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div style={{ fontSize: 12, color: mid }}>{entry.date}</div>
                      {entry.isStandalone && <span style={{ fontSize: 10, padding: "2px 8px", background: "#fffdf5", border: "1px solid " + border, borderRadius: 10, color: mid, letterSpacing: 1, textTransform: "uppercase" }}>{t.note}</span>}
                    </div>
                    <button onClick={() => deleteEntry(entry.id)} style={{ background: "transparent", border: "none", color: "#cc6666", fontSize: 12, cursor: "pointer", fontFamily: "Georgia, serif" }}>{t.delete}</button>
                  </div>
                  <div style={{ padding: "14px 18px" }}>
                    {entry.isStandalone ? (
                      <div>
                        {editingId === entry.id ? (
                          <div>
                            <textarea style={{ width: "100%", padding: "10px", fontSize: 14, fontFamily: "Georgia, serif", border: "1px solid " + border, borderRadius: 6, color: dark, resize: "vertical", outline: "none", minHeight: 80, boxSizing: "border-box" }} value={editingNote} onChange={(e) => setEditingNote(e.target.value)} autoFocus />
                            <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
                              <button onClick={() => saveNote(entry.id)} style={{ padding: "5px 16px", background: gold, color: dark, border: "none", borderRadius: 6, fontSize: 13, cursor: "pointer", fontFamily: "Georgia, serif", fontWeight: "bold" }}>{t.saveNote}</button>
                              <button onClick={() => { setEditingId(null); setEditingNote(""); }} style={{ padding: "5px 16px", background: "#fff", color: mid, border: "1px solid " + border, borderRadius: 6, fontSize: 13, cursor: "pointer", fontFamily: "Georgia, serif" }}>{t.cancel}</button>
                            </div>
                          </div>
                        ) : (
                          <div>
                            <div style={{ fontSize: 14, color: dark, lineHeight: 1.75, whiteSpace: "pre-wrap", marginBottom: 10 }}>{entry.note}</div>
                            <button onClick={() => { setEditingId(entry.id); setEditingNote(entry.note); }} style={{ padding: "5px 14px", background: "#fff", border: "1px solid " + border, borderRadius: 6, fontSize: 12, color: mid, cursor: "pointer", fontFamily: "Georgia, serif" }}>{t.editNote}</button>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div>
                        <div style={{ fontSize: 12, fontWeight: "bold", color: mid, textTransform: "uppercase", letterSpacing: 1, marginBottom: 6 }}>{t.question}</div>
                        <div style={{ fontSize: 14, color: dark, marginBottom: 14, fontStyle: "italic" }}>{entry.question}</div>
                        <div style={{ fontSize: 12, fontWeight: "bold", color: mid, textTransform: "uppercase", letterSpacing: 1, marginBottom: 6 }}>{t.response}</div>
                        <div style={{ fontSize: 14, color: dark, lineHeight: 1.75, whiteSpace: "pre-wrap", marginBottom: 14 }}>{entry.answer}</div>
                        <div style={{ fontSize: 12, fontWeight: "bold", color: mid, textTransform: "uppercase", letterSpacing: 1, marginBottom: 6 }}>{t.yourNotes}</div>
                        {editingId === entry.id ? (
                          <div>
                            <textarea style={{ width: "100%", padding: "10px", fontSize: 14, fontFamily: "Georgia, serif", border: "1px solid " + border, borderRadius: 6, color: dark, resize: "vertical", outline: "none", minHeight: 80, boxSizing: "border-box" }} value={editingNote} onChange={(e) => setEditingNote(e.target.value)} placeholder={t.notesEditPlaceholder} autoFocus />
                            <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
                              <button onClick={() => saveNote(entry.id)} style={{ padding: "5px 16px", background: gold, color: dark, border: "none", borderRadius: 6, fontSize: 13, cursor: "pointer", fontFamily: "Georgia, serif", fontWeight: "bold" }}>{t.saveNote}</button>
                              <button onClick={() => { setEditingId(null); setEditingNote(""); }} style={{ padding: "5px 16px", background: "#fff", color: mid, border: "1px solid " + border, borderRadius: 6, fontSize: 13, cursor: "pointer", fontFamily: "Georgia, serif" }}>{t.cancel}</button>
                            </div>
                          </div>
                        ) : (
                          <div>
                            {entry.note && <div style={{ padding: "8px 10px", border: "1px solid " + border, borderRadius: 6, fontSize: 14, color: dark, lineHeight: 1.6, whiteSpace: "pre-wrap", marginBottom: 8, background: "#fffdf5" }}>{entry.note}</div>}
                            <button onClick={() => { setEditingId(entry.id); setEditingNote(entry.note); }} style={{ padding: "5px 14px", background: "#fff", border: "1px solid " + border, borderRadius: 6, fontSize: 12, color: mid, cursor: "pointer", fontFamily: "Georgia, serif" }}>{entry.note ? t.editNote : t.addANote}</button>
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

      {/* Auth overlay */}
      {showAuth && !session && (
        <div style={{ position: "fixed", inset: 0, zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(44,36,22,0.5)" }}>
          <div style={{ position: "relative" }}>
            <button onClick={() => setShowAuth(false)} style={{ position: "absolute", top: 8, right: 12, background: "transparent", border: "none", fontSize: 20, color: mid, cursor: "pointer", fontFamily: "Georgia, serif", zIndex: 1 }}>×</button>
            <AuthScreen />
          </div>
        </div>
      )}

      {/* About modal */}
      {showAbout && (
        <div onClick={() => setShowAbout(false)} style={{ position: "fixed", inset: 0, zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(44,36,22,0.55)" }}>
          <div onClick={e => e.stopPropagation()} style={{ maxWidth: 480, width: "90%", background: cream, border: "1px solid " + border, borderRadius: 12, boxShadow: "0 8px 32px rgba(0,0,0,0.18)", padding: "36px 36px 28px", position: "relative", fontFamily: "Georgia, serif" }}>
            <button onClick={() => setShowAbout(false)} style={{ position: "absolute", top: 12, right: 16, background: "transparent", border: "none", fontSize: 20, color: mid, cursor: "pointer" }}>×</button>
            <div style={{ fontSize: 18, fontWeight: "bold", color: dark, marginBottom: 14 }}>{t.aboutThisProject}</div>
            <p style={{ fontSize: 13, color: "#5a4a2a", lineHeight: 1.8, marginBottom: 16 }} dangerouslySetInnerHTML={{ __html: t.aboutDescription }} />
            <p style={{ fontSize: 13, color: "#5a4a2a", lineHeight: 1.8, marginBottom: 16 }}>
              {t.aboutAINote}
            </p>
            <div style={{ borderTop: "1px solid " + border, paddingTop: 16, marginTop: 8 }}>
              <div style={{ fontSize: 11, color: mid, marginBottom: 6, fontWeight: "bold", letterSpacing: 1, textTransform: "uppercase" }}>{t.documentsIncluded}</div>
              <div style={{ fontSize: 12, color: "#5a4a2a", lineHeight: 1.9 }}>
                {t.documentsList}
              </div>
            </div>
            <div style={{ borderTop: "1px solid " + border, paddingTop: 16, marginTop: 16, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
              <div style={{ fontSize: 11, color: mid }}>
                {t.questionsOrFeedback}{" "}
                <button onClick={() => { setShowAbout(false); setShowFeedback(true); }} style={{ background: "none", border: "none", color: gold, cursor: "pointer", fontFamily: "Georgia, serif", fontSize: 11, textDecoration: "underline", padding: 0 }}>{t.sendSuggestion}</button>
              </div>
              <div style={{ fontSize: 10, color: "#baa080" }}>{t.copyright}</div>
            </div>
          </div>
        </div>
      )}

      {/* Suggestion / Feedback box */}
      <button
        onClick={() => { setShowFeedback(true); setFeedbackDone(false); }}
        title="Send feedback or a suggestion"
        style={{ position: "fixed", bottom: 24, right: 24, zIndex: 900, background: dark, color: gold, border: "1px solid " + gold, borderRadius: 24, padding: "8px 16px", fontSize: 12, fontFamily: "Georgia, serif", cursor: "pointer", boxShadow: "0 2px 10px rgba(0,0,0,0.25)", display: "flex", alignItems: "center", gap: 6, transition: "opacity 0.2s", opacity: 0.85 }}
        onMouseEnter={e => e.currentTarget.style.opacity = "1"}
        onMouseLeave={e => e.currentTarget.style.opacity = "0.85"}
      >
        <span style={{ fontSize: 14 }}>✉</span> {t.feedback}
      </button>

      {showFeedback && (
        <div onClick={() => setShowFeedback(false)} style={{ position: "fixed", inset: 0, zIndex: 1001, display: "flex", alignItems: "flex-end", justifyContent: "flex-end", background: "rgba(44,36,22,0.35)", padding: 24 }}>
          <div onClick={e => e.stopPropagation()} style={{ width: 340, background: "#fff", border: "1px solid " + border, borderRadius: 12, boxShadow: "0 8px 32px rgba(0,0,0,0.2)", padding: "24px 24px 20px", fontFamily: "Georgia, serif" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
              <div style={{ fontSize: 15, fontWeight: "bold", color: dark }}>{t.sendFeedback}</div>
              <button onClick={() => setShowFeedback(false)} style={{ background: "transparent", border: "none", fontSize: 18, color: mid, cursor: "pointer" }}>×</button>
            </div>
            {feedbackDone ? (
              <div style={{ textAlign: "center", padding: "24px 0", color: "#2a6a2a", fontSize: 14 }}>{t.feedbackReceived}</div>
            ) : (
              <>
                <div style={{ display: "flex", gap: 6, marginBottom: 12 }}>
                  {[
                    { key: "suggestion", label: t.feedbackSuggestion },
                    { key: "bug", label: t.feedbackBug },
                    { key: "content", label: t.feedbackContent },
                  ].map(({ key: ftype, label }) => (
                    <button key={ftype} onClick={() => setFeedbackType(ftype)} style={{ flex: 1, padding: "5px 0", background: feedbackType === ftype ? dark : "#fff", color: feedbackType === ftype ? cream : mid, border: "1px solid " + (feedbackType === ftype ? dark : border), borderRadius: 8, fontSize: 11, cursor: "pointer", fontFamily: "Georgia, serif", textTransform: "capitalize" }}>{label}</button>
                  ))}
                </div>
                <textarea
                  value={feedbackText}
                  onChange={e => setFeedbackText(e.target.value)}
                  placeholder={feedbackType === "suggestion" ? t.suggestionPlaceholder : feedbackType === "bug" ? t.bugPlaceholder : t.contentPlaceholder}
                  rows={4}
                  style={{ width: "100%", padding: "10px 12px", fontSize: 13, fontFamily: "Georgia, serif", border: "1px solid " + border, borderRadius: 8, resize: "none", outline: "none", color: dark, background: cream, boxSizing: "border-box", marginBottom: 12 }}
                />
                <button
                  onClick={submitFeedback}
                  disabled={feedbackSubmitting || !feedbackText.trim()}
                  style={{ width: "100%", padding: "9px", background: feedbackSubmitting || !feedbackText.trim() ? border : gold, color: dark, border: "none", borderRadius: 8, fontSize: 13, fontWeight: "bold", cursor: feedbackSubmitting || !feedbackText.trim() ? "not-allowed" : "pointer", fontFamily: "Georgia, serif" }}
                >
                  {feedbackSubmitting ? t.sending : t.sendFeedback}
                </button>
                {feedbackError && <div style={{ fontSize: 12, color: "#a03030", marginTop: 8, textAlign: "center" }}>{feedbackError}</div>}
                <div style={{ fontSize: 10, color: mid, marginTop: 8, textAlign: "center" }}>{session ? t.submittedAs(session.user.email) : t.submittedAnonymously}</div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <div style={{ padding: "6px 24px", background: dark, textAlign: "center", flexShrink: 0, borderTop: "1px solid " + border }}>
        <a href="https://www.ccc-study.org" target="_blank" rel="noopener noreferrer" style={{ fontSize: 10, color: "#a09070", fontFamily: "Georgia, serif", letterSpacing: 1, textDecoration: "none", opacity: 0.7 }}>www.ccc-study.org</a>
      </div>
    </div>
  );
}
