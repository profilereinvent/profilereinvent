import { useState, useEffect, useRef } from "react";

const PLATFORMS = [
  { id: "linkedin", label: "LinkedIn", color: "#0A66C2", bg: "#E8F0FA" },
  { id: "naukri", label: "Naukri", color: "#FF7555", bg: "#FFF0EC" },
  { id: "indeed", label: "Indeed", color: "#003A9B", bg: "#E8EDFB" },
  { id: "glassdoor", label: "Glassdoor", color: "#0CAA41", bg: "#E6F7ED" },
  { id: "monster", label: "Monster", color: "#6E00B3", bg: "#F2E8FB" },
  { id: "shine", label: "Shine", color: "#E8A000", bg: "#FFF8E6" },
  { id: "github", label: "GitHub", color: "#24292F", bg: "#EAECEF" },
  { id: "xing", label: "Xing", color: "#026466", bg: "#E6F4F4" },
];

const PLANS = [
  { credits: 1, price: 9, label: "Starter", rewrites: "1 rewrite", popular: false },
  { credits: 5, price: 39, label: "Pro", rewrites: "5 rewrites", popular: true },
  { credits: 12, price: 79, label: "Power", rewrites: "12 rewrites", popular: false },
];

const REVIEWS = [
  { name: "Priya S.", role: "Software Engineer · Mumbai", avatar: "PS", text: "Got 3 interview calls within a week. Absolutely worth it!", rating: 5, country: "🇮🇳" },
  { name: "James R.", role: "Product Manager · London", avatar: "JR", text: "Profile score jumped from 38 to 91. Landed a FAANG role shortly after.", rating: 5, country: "🇬🇧" },
  { name: "Sofia M.", role: "Marketing Lead · Barcelona", avatar: "SM", text: "Three recruiters reached out within 48 hours. Game changer!", rating: 5, country: "🇪🇸" },
  { name: "Vikram T.", role: "Data Scientist · Bangalore", avatar: "VT", text: "Score went from 42 to 89. Best $39 I've ever spent on my career.", rating: 5, country: "🇮🇳" },
  { name: "Lena K.", role: "UX Designer · Berlin", avatar: "LK", text: "Felt like a career coach had personally crafted every word.", rating: 5, country: "🇩🇪" },
  { name: "Ahmed F.", role: "Finance Analyst · Dubai", avatar: "AF", text: "Found 11 issues I never noticed. Skeptical at first, blown away after.", rating: 4, country: "🇦🇪" },
];

const ISSUE_CATS = [
  { id: "headline", label: "Headline" },
  { id: "summary", label: "About / Summary" },
  { id: "experience", label: "Work Experience" },
  { id: "skills", label: "Skills" },
  { id: "keywords", label: "ATS Keywords" },
  { id: "education", label: "Education" },
  { id: "certifications", label: "Certifications" },
  { id: "overall", label: "Overall Tone" },
];

const HISTORY_SEED = [
  { id: 1, platform: "LinkedIn", date: "Mar 22, 2026", score: 44, status: "rewritten" },
  { id: 2, platform: "Naukri", date: "Mar 25, 2026", score: 61, status: "analyzed" },
];

function Stars({ n }) {
  return (
    <div style={{ display: "flex", gap: 2 }}>
      {[1,2,3,4,5].map(i => (
        <svg key={i} width="13" height="13" viewBox="0 0 24 24" fill={i <= n ? "#F59E0B" : "none"} stroke="#F59E0B" strokeWidth="2">
          <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/>
        </svg>
      ))}
    </div>
  );
}

function FloatingOrbs() {
  return (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, overflow: "hidden" }}>
      {[
        { w:320, h:320, top:"5%", left:"-8%", color:"rgba(99,102,241,0.12)", dur:"18s" },
        { w:260, h:260, top:"55%", right:"-6%", color:"rgba(236,72,153,0.1)", dur:"22s" },
        { w:200, h:200, top:"30%", left:"70%", color:"rgba(16,185,129,0.09)", dur:"15s" },
        { w:180, h:180, top:"75%", left:"20%", color:"rgba(245,158,11,0.08)", dur:"20s" },
      ].map((o, i) => (
        <div key={i} style={{
          position: "absolute", width: o.w, height: o.h, borderRadius: "50%",
          background: o.color, top: o.top, left: o.left, right: o.right,
          animation: `pulse ${o.dur} ease-in-out infinite alternate`,
          filter: "blur(40px)",
        }}/>
      ))}
      <style>{`@keyframes pulse { from { transform: scale(1) translateY(0); } to { transform: scale(1.15) translateY(-20px); } }`}</style>
    </div>
  );
}

function AnimatedCounter({ target }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    let start = 0;
    const step = Math.ceil(target / 40);
    const t = setInterval(() => {
      start += step;
      if (start >= target) { setVal(target); clearInterval(t); }
      else setVal(start);
    }, 30);
    return () => clearInterval(t);
  }, [target]);
  return <span>{val.toLocaleString()}</span>;
}

function TypewriterText({ texts }) {
  const [idx, setIdx] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);
  useEffect(() => {
    const cur = texts[idx];
    if (!deleting && displayed.length < cur.length) {
      const t = setTimeout(() => setDisplayed(cur.slice(0, displayed.length + 1)), 60);
      return () => clearTimeout(t);
    } else if (!deleting && displayed.length === cur.length) {
      const t = setTimeout(() => setDeleting(true), 1800);
      return () => clearTimeout(t);
    } else if (deleting && displayed.length > 0) {
      const t = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 35);
      return () => clearTimeout(t);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setIdx((idx + 1) % texts.length);
    }
  }, [displayed, deleting, idx, texts]);
  return (
    <span style={{ color: "#818CF8", borderRight: "2px solid #818CF8", paddingRight: 2 }}>{displayed}</span>
  );
}

export default function App() {
  const [view, setView] = useState("home");
  const [platform, setPlatform] = useState("linkedin");
  const [profile, setProfile] = useState("");
  const [credits, setCredits] = useState(0);
  const [analyzing, setAnalyzing] = useState(false);
  const [issues, setIssues] = useState(null);
  const [rewriting, setRewriting] = useState(false);
  const [rewritten, setRewritten] = useState(null);
  const [showCredits, setShowCredits] = useState(false);
  const [history, setHistory] = useState(HISTORY_SEED);
  const [expandedCat, setExpandedCat] = useState(null);
  const [user, setUser] = useState(null);
  const [showAuth, setShowAuth] = useState(false);
  const [authName, setAuthName] = useState("");
  const [authEmail, setAuthEmail] = useState("");

  const scoreColor = s => s >= 70 ? "#10B981" : s >= 40 ? "#F59E0B" : "#EF4444";
  const scoreBg = s => s >= 70 ? "rgba(16,185,129,0.12)" : s >= 40 ? "rgba(245,158,11,0.12)" : "rgba(239,68,68,0.12)";
  const totalIssues = issues ? Object.values(issues.issues || {}).flat().length : 0;

  function signIn() {
    if (!authName || !authEmail) return;
    const initials = authName.split(" ").map(w => w[0]).join("").toUpperCase().slice(0,2);
    setUser({ name: authName, email: authEmail, initials });
    setShowAuth(false);
    setAuthName(""); setAuthEmail("");
  }

  async function analyzeProfile() {
    if (!profile.trim()) return;
    setAnalyzing(true); setIssues(null); setRewritten(null);
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1200,
          system: "You are a world-class career coach. Return ONLY valid JSON, no markdown, no backticks.",
          messages: [{
            role: "user",
            content: `Analyze this ${platform} profile deeply. Return this exact JSON:
{
  "score": <0-100>,
  "grade": "<A/B/C/D/F>",
  "summary": "<2 sentence verdict>",
  "strengths": ["<s1>","<s2>"],
  "issues": {
    "headline":["<i>"],"summary":["<i>","<i>"],"experience":["<i>","<i>"],
    "skills":["<i>"],"keywords":["<i>","<i>"],"education":["<i>"],
    "certifications":["<i>"],"overall":["<i>"]
  },
  "quick_wins":["<w1>","<w2>","<w3>"]
}
Profile: ${profile}`
          }]
        })
      });
      const data = await res.json();
      const parsed = JSON.parse(data.content.map(i => i.text||"").join("").replace(/```json|```/g,"").trim());
      setIssues(parsed);
      setHistory(h => [{ id: Date.now(), platform: PLATFORMS.find(p=>p.id===platform)?.label||platform, date: "Mar 29, 2026", score: parsed.score, status: "analyzed" }, ...h]);
    } catch { setIssues({ score:0, grade:"F", summary:"Could not analyze. Please try again.", strengths:[], issues:{}, quick_wins:[] }); }
    setAnalyzing(false);
  }

  async function rewriteProfile() {
    if (credits < 1) { setShowCredits(true); return; }
    setRewriting(true);
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1500,
          system: "You are a world-class career coach. Return ONLY valid JSON, no markdown.",
          messages: [{
            role: "user",
            content: `Rewrite this ${platform} profile. Return:
{
  "headline":"<headline>","summary":"<summary>",
  "experience_rewrite":"<3-4 action bullet points>",
  "skills_to_add":["<s1>","<s2>","<s3>","<s4>","<s5>","<s6>"],
  "education_tip":"<tip>","certifications_tip":"<tip>",
  "keywords":["<k1>","<k2>","<k3>","<k4>","<k5>","<k6>","<k7>","<k8>"],
  "before_after_score":{"before":<n>,"after":<n>}
}
Profile: ${profile}
Issues: ${issues ? JSON.stringify(issues.issues):"unknown"}`
          }]
        })
      });
      const data = await res.json();
      const parsed = JSON.parse(data.content.map(i => i.text||"").join("").replace(/```json|```/g,"").trim());
      setRewritten(parsed);
      setCredits(c => c - 1);
      setHistory(h => h.map((item,i) => i===0 ? {...item, status:"rewritten"} : item));
    } catch { alert("Rewrite failed. Please try again."); }
    setRewriting(false);
  }

  const card = { background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 14, padding: "1.25rem", backdropFilter: "blur(10px)" };
  const pill = (active) => ({ padding: "6px 16px", borderRadius: 20, fontSize: 12, fontWeight: 500, cursor: "pointer", border: active ? "none" : "1px solid rgba(255,255,255,0.2)", background: active ? "rgba(255,255,255,0.95)" : "transparent", color: active ? "#1e1b4b" : "rgba(255,255,255,0.7)", transition: "all 0.2s" });

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #0f0c29 0%, #1a1040 40%, #24243e 100%)", color: "#fff", fontFamily: "var(--font-sans)", position: "relative" }}>
      <FloatingOrbs />
      <style>{`
        @keyframes fadeUp { from { opacity:0; transform:translateY(24px); } to { opacity:1; transform:translateY(0); } }
        @keyframes shimmer { 0%,100% { opacity:0.7; } 50% { opacity:1; } }
        @keyframes spin { from { transform:rotate(0deg); } to { transform:rotate(360deg); } }
        @keyframes float { 0%,100% { transform:translateY(0); } 50% { transform:translateY(-8px); } }
        .fade-up { animation: fadeUp 0.5s ease forwards; }
        .platform-btn:hover { transform: translateY(-2px); transition: transform 0.2s; }
        .nav-btn:hover { background: rgba(255,255,255,0.1) !important; }
        .glow-btn { box-shadow: 0 0 20px rgba(129,140,248,0.4); }
        .glow-btn:hover { box-shadow: 0 0 30px rgba(129,140,248,0.6); transform: translateY(-1px); }
        ::-webkit-scrollbar { width: 4px; } ::-webkit-scrollbar-track { background: transparent; } ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.2); border-radius: 4px; }
        textarea { color-scheme: dark; }
        input[type=text], input[type=email] { color-scheme: dark; }
      `}</style>

      <div style={{ maxWidth: 760, margin: "0 auto", padding: "1.25rem 1rem", position: "relative", zIndex: 1 }}>

        {/* Nav */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }} onClick={() => setView("home")}>
            <div style={{ width: 32, height: 32, borderRadius: 10, background: "linear-gradient(135deg, #818CF8, #C084FC)", display: "flex", alignItems: "center", justifyContent: "center", animation: "float 3s ease-in-out infinite" }}>
              <span style={{ color: "#fff", fontWeight: 700, fontSize: 15 }}>P</span>
            </div>
            <span style={{ fontWeight: 600, fontSize: 17, background: "linear-gradient(90deg, #fff, #C084FC)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>ProfileAI</span>
          </div>
          <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
            {["home","app","dashboard"].map(v => (
              <button key={v} className="nav-btn" onClick={() => setView(v)} style={{ fontSize: 13, padding: "5px 12px", borderRadius: 8, background: view===v ? "rgba(255,255,255,0.12)" : "transparent", color: view===v ? "#fff" : "rgba(255,255,255,0.55)", border: "none", cursor: "pointer", fontWeight: view===v ? 500 : 400, transition: "all 0.2s" }}>
                {v.charAt(0).toUpperCase()+v.slice(1)}
              </button>
            ))}
            {credits > 0 && <div style={{ fontSize: 12, padding: "4px 10px", borderRadius: 20, background: "rgba(129,140,248,0.25)", color: "#A5B4FC", fontWeight: 600 }}>{credits} cr</div>}
            {user ? (
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ width: 32, height: 32, borderRadius: "50%", background: "linear-gradient(135deg,#818CF8,#C084FC)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700 }}>{user.initials}</div>
                <button onClick={() => setUser(null)} style={{ fontSize: 12, padding: "5px 12px", borderRadius: 8, background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.6)", border: "1px solid rgba(255,255,255,0.1)", cursor: "pointer" }}>Sign out</button>
              </div>
            ) : (
              <button onClick={() => setShowAuth(true)} style={{ fontSize: 13, padding: "7px 16px", borderRadius: 8, background: "linear-gradient(135deg,#818CF8,#C084FC)", color: "#fff", border: "none", cursor: "pointer", fontWeight: 600 }} className="glow-btn">
                Sign in
              </button>
            )}
          </div>
        </div>

        {/* ── HOME ── */}
        {view === "home" && (
          <div className="fade-up">
            {/* Hero */}
            <div style={{ textAlign: "center", padding: "2.5rem 1rem 3rem" }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(129,140,248,0.15)", border: "1px solid rgba(129,140,248,0.3)", color: "#A5B4FC", fontSize: 12, fontWeight: 500, padding: "5px 14px", borderRadius: 20, marginBottom: "1.25rem" }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#10B981", display: "inline-block", animation: "shimmer 2s infinite" }}/>
                AI-powered profile optimization
              </div>
              <h1 style={{ fontSize: 38, fontWeight: 700, margin: "0 0 0.75rem", lineHeight: 1.2 }}>
                Make recruiters stop<br/>
                <TypewriterText texts={["scrolling past you.", "ignoring your profile.", "choosing someone else.", "missing your talent."]} />
              </h1>
              <p style={{ fontSize: 16, color: "rgba(255,255,255,0.6)", margin: "0 0 2rem", lineHeight: 1.7 }}>
                Free AI analysis. See every flaw. Fix everything with one click.
              </p>
              <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
                <button onClick={() => setView("app")} className="glow-btn" style={{ padding: "12px 32px", background: "linear-gradient(135deg,#818CF8,#C084FC)", color: "#fff", border: "none", borderRadius: 10, fontSize: 15, fontWeight: 600, cursor: "pointer", transition: "all 0.2s" }}>
                  Analyze my profile — free →
                </button>
                <button onClick={() => setShowCredits(true)} style={{ padding: "12px 24px", background: "rgba(255,255,255,0.07)", color: "#fff", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 10, fontSize: 15, fontWeight: 500, cursor: "pointer" }}>
                  View pricing
                </button>
              </div>
            </div>

            {/* Stats */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12, marginBottom: "2.5rem" }}>
              {[[12400,"Profiles analyzed"],[4.9,"Average rating"],[3,"× more interviews"]].map(([v,l],i) => (
                <div key={l} style={{ ...card, textAlign: "center", padding: "1.25rem" }}>
                  <p style={{ fontSize: 24, fontWeight: 700, margin: "0 0 4px", background: "linear-gradient(135deg,#818CF8,#C084FC)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                    {i===0 ? <><AnimatedCounter target={12400}/>+</> : i===1 ? "4.9★" : "3×"}
                  </p>
                  <p style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", margin: 0 }}>{l}</p>
                </div>
              ))}
            </div>

            {/* Platforms */}
            <h2 style={{ fontSize: 16, fontWeight: 600, marginBottom: "1rem", color: "rgba(255,255,255,0.8)" }}>Works with 8 platforms</h2>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: "2.5rem" }}>
              {PLATFORMS.map(p => (
                <div key={p.id} className="platform-btn" style={{ padding: "6px 16px", borderRadius: 20, background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)", fontSize: 13, color: "rgba(255,255,255,0.8)", cursor: "default" }}>
                  {p.label}
                </div>
              ))}
            </div>

            {/* How it works */}
            <h2 style={{ fontSize: 16, fontWeight: 600, marginBottom: "1rem", color: "rgba(255,255,255,0.8)" }}>How it works</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12, marginBottom: "2.5rem" }}>
              {[
                { n:"1", t:"Paste your profile", d:"Copy text from any job platform", icon:"📋" },
                { n:"2", t:"Free AI analysis", d:"Score + all issues revealed instantly", icon:"🔍" },
                { n:"3", t:"Unlock the rewrite", d:"1 credit = fully optimized profile", icon:"✨" },
              ].map((s,i) => (
                <div key={s.n} style={{ ...card, animation: `fadeUp 0.5s ease ${i*0.1}s both` }}>
                  <div style={{ fontSize: 24, marginBottom: 10 }}>{s.icon}</div>
                  <p style={{ fontWeight: 600, fontSize: 14, margin: "0 0 4px" }}>{s.t}</p>
                  <p style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", margin: 0, lineHeight: 1.5 }}>{s.d}</p>
                </div>
              ))}
            </div>

            {/* Pricing */}
            <h2 style={{ fontSize: 16, fontWeight: 600, marginBottom: "1rem", color: "rgba(255,255,255,0.8)" }}>Simple pricing</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12, marginBottom: "2.5rem" }}>
              {PLANS.map(p => (
                <div key={p.credits} style={{ ...card, border: p.popular ? "1px solid rgba(129,140,248,0.6)" : "1px solid rgba(255,255,255,0.1)", background: p.popular ? "rgba(129,140,248,0.12)" : "rgba(255,255,255,0.05)", position: "relative" }}>
                  {p.popular && <div style={{ position: "absolute", top: -11, left: "50%", transform: "translateX(-50%)", background: "linear-gradient(135deg,#818CF8,#C084FC)", color: "#fff", fontSize: 11, padding: "2px 12px", borderRadius: 10, whiteSpace: "nowrap", fontWeight: 600 }}>Most popular</div>}
                  <p style={{ fontWeight: 600, fontSize: 14, margin: "0 0 6px" }}>{p.label}</p>
                  <p style={{ fontSize: 28, fontWeight: 700, margin: "0 0 2px" }}>${p.price}</p>
                  <p style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", margin: "0 0 14px" }}>{p.rewrites}</p>
                  <button onClick={() => setCredits(c => c + p.credits)} style={{ width: "100%", padding: "8px 0", borderRadius: 8, background: p.popular ? "linear-gradient(135deg,#818CF8,#C084FC)" : "rgba(255,255,255,0.08)", color: "#fff", border: p.popular ? "none" : "1px solid rgba(255,255,255,0.15)", cursor: "pointer", fontSize: 13, fontWeight: 600 }}>
                    Get started
                  </button>
                </div>
              ))}
            </div>

            {/* Reviews */}
            <h2 style={{ fontSize: 16, fontWeight: 600, marginBottom: "1rem", color: "rgba(255,255,255,0.8)" }}>What users say</h2>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              {REVIEWS.map((r,i) => (
                <div key={r.name} style={{ ...card, animation: `fadeUp 0.5s ease ${i*0.08}s both` }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                    <div style={{ width: 38, height: 38, borderRadius: "50%", background: "linear-gradient(135deg,#818CF8,#C084FC)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 12, fontWeight: 700 }}>{r.avatar}</div>
                    <div>
                      <p style={{ fontWeight: 600, fontSize: 13, margin: "0 0 2px" }}>{r.country} {r.name}</p>
                      <p style={{ fontSize: 12, color: "rgba(255,255,255,0.45)", margin: 0 }}>{r.role}</p>
                    </div>
                  </div>
                  <Stars n={r.rating}/>
                  <p style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", margin: "8px 0 0", lineHeight: 1.55 }}>{r.text}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── APP ── */}
        {view === "app" && (
          <div className="fade-up">
            <h2 style={{ fontSize: 20, fontWeight: 600, margin: "0 0 1.5rem" }}>Analyze your profile</h2>

            {/* Platform selector */}
            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", margin: "0 0 10px" }}>Choose platform</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: "1.5rem" }}>
              {PLATFORMS.map(p => (
                <button key={p.id} className="platform-btn" onClick={() => setPlatform(p.id)} style={{ padding: "7px 16px", borderRadius: 20, fontSize: 13, fontWeight: 500, cursor: "pointer", background: platform===p.id ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.07)", color: platform===p.id ? "#1e1b4b" : "rgba(255,255,255,0.7)", border: platform===p.id ? "none" : "1px solid rgba(255,255,255,0.15)", transition: "all 0.2s" }}>
                  {p.label}
                </button>
              ))}
            </div>

            <textarea value={profile} onChange={e => setProfile(e.target.value)}
              placeholder={`Paste your full ${PLATFORMS.find(p=>p.id===platform)?.label} profile here — headline, about, experience, skills, education...`}
              style={{ width: "100%", minHeight: 180, padding: "14px", borderRadius: 10, border: "1px solid rgba(255,255,255,0.15)", fontSize: 14, lineHeight: 1.65, resize: "vertical", background: "rgba(255,255,255,0.05)", color: "#fff", boxSizing: "border-box", outline: "none" }}
            />
            <button onClick={analyzeProfile} disabled={analyzing||!profile.trim()} className={!analyzing&&profile.trim()?"glow-btn":""} style={{ marginTop: 12, padding: "10px 26px", background: analyzing||!profile.trim() ? "rgba(255,255,255,0.08)" : "linear-gradient(135deg,#818CF8,#C084FC)", color: analyzing||!profile.trim() ? "rgba(255,255,255,0.35)" : "#fff", border: "none", borderRadius: 10, fontSize: 14, fontWeight: 600, cursor: analyzing||!profile.trim() ? "default" : "pointer", transition: "all 0.2s" }}>
              {analyzing ? (
                <span style={{ display:"flex", alignItems:"center", gap:8 }}>
                  <span style={{ width:14, height:14, border:"2px solid rgba(255,255,255,0.3)", borderTopColor:"#fff", borderRadius:"50%", animation:"spin 0.7s linear infinite", display:"inline-block" }}/>
                  Analyzing...
                </span>
              ) : "Analyze for free"}
            </button>

            {issues && (
              <div style={{ marginTop: "2rem" }}>
                {/* Score */}
                <div style={{ ...card, display:"grid", gridTemplateColumns:"auto 1fr auto", gap:16, alignItems:"center", marginBottom:"1.5rem", background:"rgba(255,255,255,0.06)" }}>
                  <div style={{ width:64, height:64, borderRadius:"50%", background:scoreBg(issues.score), border:`3px solid ${scoreColor(issues.score)}`, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center" }}>
                    <span style={{ fontSize:19, fontWeight:700, color:scoreColor(issues.score), lineHeight:1 }}>{issues.score}</span>
                    <span style={{ fontSize:11, color:scoreColor(issues.score) }}>{issues.grade}</span>
                  </div>
                  <div>
                    <p style={{ fontWeight:600, fontSize:15, margin:"0 0 4px" }}>Profile score</p>
                    <p style={{ fontSize:13, color:"rgba(255,255,255,0.55)", margin:0, lineHeight:1.5 }}>{issues.summary}</p>
                  </div>
                  <div style={{ textAlign:"right" }}>
                    <p style={{ fontSize:12, color:"rgba(255,255,255,0.45)", margin:"0 0 2px" }}>Issues</p>
                    <p style={{ fontSize:24, fontWeight:700, margin:0, color:"#EF4444" }}>{totalIssues}</p>
                  </div>
                </div>

                {issues.strengths?.length > 0 && (
                  <div style={{ marginBottom:"1rem", padding:"12px 14px", background:"rgba(16,185,129,0.1)", borderRadius:10, border:"1px solid rgba(16,185,129,0.25)" }}>
                    <p style={{ fontWeight:600, fontSize:13, margin:"0 0 6px", color:"#34D399" }}>What's working</p>
                    {issues.strengths.map((s,i) => <p key={i} style={{ fontSize:13, color:"rgba(255,255,255,0.65)", margin:"0 0 2px" }}>✓ {s}</p>)}
                  </div>
                )}
                {issues.quick_wins?.length > 0 && (
                  <div style={{ marginBottom:"1rem", padding:"12px 14px", background:"rgba(245,158,11,0.1)", borderRadius:10, border:"1px solid rgba(245,158,11,0.25)" }}>
                    <p style={{ fontWeight:600, fontSize:13, margin:"0 0 6px", color:"#FCD34D" }}>Quick wins</p>
                    {issues.quick_wins.map((q,i) => <p key={i} style={{ fontSize:13, color:"rgba(255,255,255,0.65)", margin:"0 0 2px" }}>→ {q}</p>)}
                  </div>
                )}

                <p style={{ fontSize:14, fontWeight:600, margin:"1rem 0 10px" }}>Issues by section <span style={{ fontWeight:400, color:"rgba(255,255,255,0.4)", fontSize:13 }}>(fixes locked)</span></p>
                {ISSUE_CATS.map(cat => {
                  const items = issues.issues?.[cat.id]||[];
                  if (!items.length) return null;
                  const open = expandedCat===cat.id;
                  return (
                    <div key={cat.id} style={{ marginBottom:8, border:"1px solid rgba(255,255,255,0.1)", borderRadius:10, overflow:"hidden" }}>
                      <div onClick={() => setExpandedCat(open?null:cat.id)} style={{ padding:"10px 14px", background:"rgba(255,255,255,0.05)", display:"flex", justifyContent:"space-between", alignItems:"center", cursor:"pointer" }}>
                        <span style={{ fontWeight:500, fontSize:13 }}>{cat.label}</span>
                        <div style={{ display:"flex", gap:8, alignItems:"center" }}>
                          <span style={{ fontSize:12, background:"rgba(239,68,68,0.15)", color:"#FCA5A5", padding:"2px 8px", borderRadius:10 }}>{items.length} issue{items.length>1?"s":""}</span>
                          <span style={{ fontSize:11, color:"rgba(255,255,255,0.4)" }}>{open?"▲":"▼"}</span>
                        </div>
                      </div>
                      {open && items.map((issue,i) => (
                        <div key={i} style={{ padding:"9px 14px", borderTop:"1px solid rgba(255,255,255,0.07)", display:"flex", justifyContent:"space-between", alignItems:"center", gap:8 }}>
                          <span style={{ fontSize:13, color:"rgba(255,255,255,0.55)" }}>{issue}</span>
                          <span style={{ fontSize:11, color:"rgba(255,255,255,0.3)", border:"1px solid rgba(255,255,255,0.1)", padding:"2px 8px", borderRadius:10, whiteSpace:"nowrap" }}>🔒 locked</span>
                        </div>
                      ))}
                    </div>
                  );
                })}

                {!rewritten && (
                  <div style={{ marginTop:"1.5rem", padding:"1.5rem", background:"rgba(129,140,248,0.1)", borderRadius:14, textAlign:"center", border:"1px solid rgba(129,140,248,0.3)" }}>
                    <p style={{ fontWeight:700, fontSize:17, margin:"0 0 6px" }}>Unlock your full rewrite ✨</p>
                    <p style={{ fontSize:13, color:"rgba(255,255,255,0.6)", margin:"0 0 16px", lineHeight:1.6 }}>
                      AI rewrites all {totalIssues} issues — headline, summary, experience, skills, keywords, and more.
                    </p>
                    <button onClick={rewriteProfile} disabled={rewriting} className={!rewriting?"glow-btn":""} style={{ padding:"11px 30px", background:"linear-gradient(135deg,#818CF8,#C084FC)", color:"#fff", border:"none", borderRadius:10, fontSize:14, fontWeight:600, cursor:rewriting?"default":"pointer" }}>
                      {rewriting ? <span style={{display:"flex",alignItems:"center",gap:8}}><span style={{width:14,height:14,border:"2px solid rgba(255,255,255,0.3)",borderTopColor:"#fff",borderRadius:"50%",animation:"spin 0.7s linear infinite",display:"inline-block"}}/>Rewriting...</span> : credits>0 ? "Rewrite now — 1 credit" : "Buy credits to rewrite"}
                    </button>
                    {credits===0 && <p style={{ fontSize:12, color:"rgba(255,255,255,0.4)", margin:"10px 0 0" }}>1 credit · $9 &nbsp;|&nbsp; 5 credits · $39 &nbsp;|&nbsp; 12 credits · $79</p>}
                  </div>
                )}

                {rewritten && (
                  <div style={{ marginTop:"1.75rem" }}>
                    <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:"1.25rem" }}>
                      <div style={{ flex:1, height:1, background:"rgba(255,255,255,0.1)" }}/>
                      <span style={{ fontSize:13, fontWeight:600, color:"#34D399" }}>✓ Optimized profile ready</span>
                      <div style={{ flex:1, height:1, background:"rgba(255,255,255,0.1)" }}/>
                    </div>
                    {rewritten.before_after_score && (
                      <div style={{ display:"flex", gap:12, marginBottom:"1.25rem" }}>
                        {[["Before",rewritten.before_after_score.before],["After",rewritten.before_after_score.after]].map(([l,s]) => (
                          <div key={l} style={{ flex:1, textAlign:"center", padding:"12px", background:l==="After"?scoreBg(s):"rgba(255,255,255,0.05)", borderRadius:10, border:`1px solid ${l==="After"?scoreColor(s):"rgba(255,255,255,0.1)"}` }}>
                            <p style={{ fontSize:12, color:"rgba(255,255,255,0.5)", margin:"0 0 4px" }}>{l}</p>
                            <p style={{ fontSize:26, fontWeight:700, margin:0, color:l==="After"?scoreColor(s):"#fff" }}>{s}</p>
                          </div>
                        ))}
                      </div>
                    )}
                    {[
                      { label:"Headline", value:rewritten.headline },
                      { label:"About / Summary", value:rewritten.summary },
                      { label:"Experience bullets", value:rewritten.experience_rewrite },
                      { label:"Education tip", value:rewritten.education_tip },
                      { label:"Certifications", value:rewritten.certifications_tip },
                    ].map(s => s.value ? (
                      <div key={s.label} style={{ marginBottom:10, padding:"12px 14px", background:"rgba(255,255,255,0.05)", borderRadius:10, border:"1px solid rgba(255,255,255,0.1)" }}>
                        <p style={{ fontWeight:600, fontSize:11, color:"rgba(255,255,255,0.35)", margin:"0 0 6px", textTransform:"uppercase", letterSpacing:"0.07em" }}>{s.label}</p>
                        <p style={{ fontSize:14, margin:0, lineHeight:1.65, whiteSpace:"pre-line", color:"rgba(255,255,255,0.85)" }}>{s.value}</p>
                      </div>
                    ) : null)}
                    {rewritten.skills_to_add?.length > 0 && (
                      <div style={{ marginBottom:10, padding:"12px 14px", background:"rgba(255,255,255,0.05)", borderRadius:10, border:"1px solid rgba(255,255,255,0.1)" }}>
                        <p style={{ fontWeight:600, fontSize:11, color:"rgba(255,255,255,0.35)", margin:"0 0 8px", textTransform:"uppercase", letterSpacing:"0.07em" }}>Skills to add</p>
                        <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
                          {rewritten.skills_to_add.map(k => <span key={k} style={{ fontSize:12, padding:"3px 12px", borderRadius:12, background:"rgba(129,140,248,0.2)", color:"#A5B4FC", border:"1px solid rgba(129,140,248,0.3)" }}>{k}</span>)}
                        </div>
                      </div>
                    )}
                    {rewritten.keywords?.length > 0 && (
                      <div style={{ padding:"12px 14px", background:"rgba(255,255,255,0.05)", borderRadius:10, border:"1px solid rgba(255,255,255,0.1)" }}>
                        <p style={{ fontWeight:600, fontSize:11, color:"rgba(255,255,255,0.35)", margin:"0 0 8px", textTransform:"uppercase", letterSpacing:"0.07em" }}>ATS keywords</p>
                        <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
                          {rewritten.keywords.map(k => <span key={k} style={{ fontSize:12, padding:"3px 12px", borderRadius:12, background:"rgba(16,185,129,0.15)", color:"#6EE7B7", border:"1px solid rgba(16,185,129,0.25)" }}>{k}</span>)}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* ── DASHBOARD ── */}
        {view === "dashboard" && (
          <div className="fade-up">
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"1.5rem" }}>
              <div>
                <h2 style={{ fontSize:20, fontWeight:600, margin:"0 0 4px" }}>
                  {user ? `Welcome back, ${user.name.split(" ")[0]} 👋` : "Your dashboard"}
                </h2>
                {user && <p style={{ fontSize:13, color:"rgba(255,255,255,0.45)", margin:0 }}>{user.email}</p>}
              </div>
              <button onClick={() => setView("app")} className="glow-btn" style={{ fontSize:13, padding:"8px 18px", borderRadius:8, background:"linear-gradient(135deg,#818CF8,#C084FC)", color:"#fff", border:"none", cursor:"pointer", fontWeight:600 }}>
                + New analysis
              </button>
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:12, marginBottom:"1.5rem" }}>
              {[
                { label:"Credits remaining", value:credits, color:"#A5B4FC" },
                { label:"Profiles analyzed", value:history.length, color:"#67E8F9" },
                { label:"Profiles rewritten", value:history.filter(h=>h.status==="rewritten").length, color:"#6EE7B7" },
              ].map(s => (
                <div key={s.label} style={{ ...card, textAlign:"center" }}>
                  <p style={{ fontSize:12, color:"rgba(255,255,255,0.45)", margin:"0 0 6px" }}>{s.label}</p>
                  <p style={{ fontSize:30, fontWeight:700, margin:0, color:s.color }}>{s.value}</p>
                </div>
              ))}
            </div>
            <p style={{ fontSize:14, fontWeight:600, margin:"0 0 10px" }}>Analysis history</p>
            <div style={{ border:"1px solid rgba(255,255,255,0.1)", borderRadius:12, overflow:"hidden" }}>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 80px 100px 80px", padding:"9px 14px", background:"rgba(255,255,255,0.05)", borderBottom:"1px solid rgba(255,255,255,0.08)" }}>
                {["Platform","Date","Score","Status",""].map(h => <span key={h} style={{ fontSize:12, fontWeight:600, color:"rgba(255,255,255,0.4)" }}>{h}</span>)}
              </div>
              {history.length===0 && <div style={{ padding:"2rem", textAlign:"center", color:"rgba(255,255,255,0.35)", fontSize:14 }}>No analyses yet.</div>}
              {history.map((item,i) => (
                <div key={item.id} style={{ display:"grid", gridTemplateColumns:"1fr 1fr 80px 100px 80px", padding:"12px 14px", borderTop: i>0?"1px solid rgba(255,255,255,0.06)":"none", alignItems:"center" }}>
                  <span style={{ fontSize:13, fontWeight:500 }}>{item.platform}</span>
                  <span style={{ fontSize:13, color:"rgba(255,255,255,0.45)" }}>{item.date}</span>
                  <span style={{ fontSize:13, fontWeight:700, color:scoreColor(item.score) }}>{item.score}</span>
                  <span style={{ fontSize:12, padding:"3px 10px", borderRadius:10, background:item.status==="rewritten"?"rgba(16,185,129,0.15)":"rgba(129,140,248,0.15)", color:item.status==="rewritten"?"#6EE7B7":"#A5B4FC", display:"inline-block" }}>
                    {item.status==="rewritten"?"Rewritten":"Analyzed"}
                  </span>
                  <button onClick={() => setView("app")} style={{ fontSize:12, padding:"4px 10px", borderRadius:6, border:"1px solid rgba(255,255,255,0.12)", background:"transparent", cursor:"pointer", color:"rgba(255,255,255,0.5)" }}>View →</button>
                </div>
              ))}
            </div>
            {credits===0 && (
              <div style={{ marginTop:"1.5rem", ...card, background:"rgba(129,140,248,0.1)", border:"1px solid rgba(129,140,248,0.25)", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                <div>
                  <p style={{ fontWeight:600, fontSize:14, margin:"0 0 3px" }}>Out of credits?</p>
                  <p style={{ fontSize:13, color:"rgba(255,255,255,0.5)", margin:0 }}>Get 5 rewrites for just $39</p>
                </div>
                <button onClick={() => setShowCredits(true)} className="glow-btn" style={{ padding:"9px 20px", background:"linear-gradient(135deg,#818CF8,#C084FC)", color:"#fff", border:"none", borderRadius:8, fontSize:13, fontWeight:600, cursor:"pointer" }}>
                  Buy credits
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Credits modal */}
      {showCredits && (
        <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.7)", display:"flex", alignItems:"center", justifyContent:"center", zIndex:200 }} onClick={() => setShowCredits(false)}>
          <div style={{ background:"#1a1040", borderRadius:16, padding:"1.75rem", width:"min(400px,92vw)", border:"1px solid rgba(255,255,255,0.12)" }} onClick={e => e.stopPropagation()}>
            <h3 style={{ margin:"0 0 4px", fontWeight:700, fontSize:18 }}>Buy credits</h3>
            <p style={{ fontSize:13, color:"rgba(255,255,255,0.5)", margin:"0 0 1.25rem" }}>1 credit = 1 complete profile rewrite</p>
            <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
              {PLANS.map(p => (
                <div key={p.credits} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"12px 14px", borderRadius:10, border:p.popular?"1px solid rgba(129,140,248,0.5)":"1px solid rgba(255,255,255,0.1)", background:p.popular?"rgba(129,140,248,0.12)":"rgba(255,255,255,0.04)" }}>
                  <div>
                    <span style={{ fontWeight:600, fontSize:14 }}>{p.label}</span>
                    <span style={{ fontSize:13, color:"rgba(255,255,255,0.45)", marginLeft:8 }}>{p.rewrites}</span>
                    {p.popular && <span style={{ fontSize:11, marginLeft:8, background:"linear-gradient(135deg,#818CF8,#C084FC)", color:"#fff", padding:"1px 8px", borderRadius:8, fontWeight:600 }}>best value</span>}
                  </div>
                  <button onClick={() => { setCredits(c => c+p.credits); setShowCredits(false); }} className="glow-btn" style={{ padding:"7px 18px", background:"linear-gradient(135deg,#818CF8,#C084FC)", color:"#fff", border:"none", borderRadius:8, fontSize:13, fontWeight:600, cursor:"pointer" }}>
                    ${p.price}
                  </button>
                </div>
              ))}
            </div>
            <button onClick={() => setShowCredits(false)} style={{ marginTop:"1rem", width:"100%", padding:"9px", borderRadius:10, border:"1px solid rgba(255,255,255,0.1)", background:"transparent", cursor:"pointer", fontSize:13, color:"rgba(255,255,255,0.4)" }}>Cancel</button>
          </div>
        </div>
      )}

      {/* Auth modal */}
      {showAuth && (
        <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.75)", display:"flex", alignItems:"center", justifyContent:"center", zIndex:200 }} onClick={() => setShowAuth(false)}>
          <div style={{ background:"#1a1040", borderRadius:16, padding:"1.75rem", width:"min(380px,92vw)", border:"1px solid rgba(255,255,255,0.12)" }} onClick={e => e.stopPropagation()}>
            <h3 style={{ margin:"0 0 4px", fontWeight:700, fontSize:18 }}>Sign in to ProfileAI</h3>
            <p style={{ fontSize:13, color:"rgba(255,255,255,0.5)", margin:"0 0 1.5rem" }}>Save your history and credits across sessions</p>

            {/* Google sign-in (simulated) */}
            <button onClick={() => { setUser({ name:"Google User", email:"you@gmail.com", initials:"GU" }); setShowAuth(false); }} style={{ width:"100%", padding:"11px", borderRadius:10, background:"#fff", color:"#1e1e2e", border:"none", cursor:"pointer", fontSize:14, fontWeight:600, display:"flex", alignItems:"center", justifyContent:"center", gap:10, marginBottom:"1rem" }}>
              <svg width="18" height="18" viewBox="0 0 48 48"><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.31-8.16 2.31-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/></svg>
              Continue with Google
            </button>

            <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:"1rem" }}>
              <div style={{ flex:1, height:1, background:"rgba(255,255,255,0.1)" }}/>
              <span style={{ fontSize:12, color:"rgba(255,255,255,0.35)" }}>or sign in with email</span>
              <div style={{ flex:1, height:1, background:"rgba(255,255,255,0.1)" }}/>
            </div>

            <input type="text" value={authName} onChange={e => setAuthName(e.target.value)} placeholder="Full name"
              style={{ width:"100%", padding:"10px 12px", borderRadius:8, border:"1px solid rgba(255,255,255,0.15)", background:"rgba(255,255,255,0.06)", color:"#fff", fontSize:14, marginBottom:10, boxSizing:"border-box", outline:"none" }}
            />
            <input type="email" value={authEmail} onChange={e => setAuthEmail(e.target.value)} placeholder="Email address"
              style={{ width:"100%", padding:"10px 12px", borderRadius:8, border:"1px solid rgba(255,255,255,0.15)", background:"rgba(255,255,255,0.06)", color:"#fff", fontSize:14, marginBottom:"1rem", boxSizing:"border-box", outline:"none" }}
            />
            <button onClick={signIn} className="glow-btn" style={{ width:"100%", padding:"11px", borderRadius:10, background:"linear-gradient(135deg,#818CF8,#C084FC)", color:"#fff", border:"none", cursor:"pointer", fontSize:14, fontWeight:600, marginBottom:10 }}>
              Sign in
            </button>
            <button onClick={() => setShowAuth(false)} style={{ width:"100%", padding:"9px", borderRadius:10, border:"1px solid rgba(255,255,255,0.1)", background:"transparent", cursor:"pointer", fontSize:13, color:"rgba(255,255,255,0.4)" }}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}
