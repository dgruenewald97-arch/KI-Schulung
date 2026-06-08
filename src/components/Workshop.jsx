import React, { useState } from "react";
import { Check, Copy, Loader2, Play, Shield, Sparkles, Wand2, X } from "lucide-react";
import { callClaude } from "../api/callClaude.js";

const USE_CASES = [
  {
    id: "rewrite",
    label: "Text verbessern",
    ziel: "Formuliere eine trockene interne Info-Mail freundlicher, klarer und handlungsorientierter um.",
    format: "Betreff + 2 kurze Absätze + klare Info, was die Empfänger:innen tun müssen.",
    ton: "Warm, professionell, direkte Sprache. Keine Floskeln, keine neuen Fakten erfinden.",
  },
  {
    id: "reverse",
    label: "Reverse Prompting",
    ziel: "Hilf mir, aus einer groben Idee einen präzisen Prompt zu bauen. Stelle zuerst maximal 5 Rückfragen.",
    format: "Erst Rückfragen, danach fertiger Prompt, danach kurze Prüfliste für das Ergebnis.",
    ton: "Strukturiert, fragend, kritisch. Markiere fehlende Informationen klar.",
  },
  {
    id: "brainstorming",
    label: "Brainstorming",
    ziel: "Entwickle mehrere Ideen oder Ansätze zu meinem Thema und hilf mir, die besten Optionen auszuwählen.",
    format: "Erst kurze Rückfragen, dann 10 Ideen, danach Cluster und Top-3-Bewertung nach Wirkung, Aufwand und Risiko.",
    ton: "Kreativ, konkret, aber nicht beliebig. Keine generischen Standardideen, sondern passend zum Kontext.",
  },
  {
    id: "stakeholder",
    label: "Kritische Prüfung",
    ziel: "Prüfe meinen Entwurf aus mehreren Stakeholder-Perspektiven und zeige konkrete Verbesserungen.",
    format: "Tabelle mit Perspektive, Stärke, Risiko/Unklarheit und konkreter Empfehlung.",
    ton: "Kritisch, konstruktiv, konkret. Keine pauschalen Aussagen, Annahmen sichtbar machen.",
  },
  {
    id: "agenda",
    label: "Meeting strukturieren",
    ziel: "Erstelle aus losen Stichpunkten eine klare Meeting-Agenda mit Ziel, Zeitboxen und Verantwortlichkeiten.",
    format: "Tabelle: Thema, Ziel, Zeit, Verantwortlich, gewünschtes Ergebnis.",
    ton: "Knapp, praktisch, entscheidungsorientiert. Punkte ohne Ziel als Rückfrage markieren.",
  },
];

export default function Workshop({ role }) {
  const [selected, setSelected] = useState(USE_CASES[0].id);
  const initial = USE_CASES[0];
  const [ziel, setZiel] = useState(initial.ziel);
  const [kontext, setKontext] = useState(role.ctx);
  const [format, setFormat] = useState(initial.format);
  const [ton, setTon] = useState(initial.ton);
  const [material, setMaterial] = useState("");
  const [loading, setLoading] = useState(false);
  const [out, setOut] = useState("");
  const [err, setErr] = useState("");
  const [copied, setCopied] = useState(false);

  const applyUseCase = (id) => {
    const useCase = USE_CASES.find((u) => u.id === id) || USE_CASES[0];
    setSelected(id);
    setZiel(useCase.ziel);
    setFormat(useCase.format);
    setTon(useCase.ton);
    setErr("");
    setOut("");
  };

  const assembled =
`# Ziel
${ziel || "... was soll genau rauskommen?"}

# Kontext
${kontext || "... wer bist du, worum geht es?"}

# Material
${material || "... füge hier Stichpunkte, Beispieltext oder eine grobe Idee ein"}

# Format
${format || "... Länge, Struktur, Form"}

# Ton & Richtlinien
${ton || "... Tonfall, Do's & Don'ts, Prüfhinweise"}`;

  const run = async () => {
    if (!ziel.trim()) { setErr("Gib zumindest ein Ziel ein - das ist das Herz des Arbeitsauftrags."); return; }
    setLoading(true); setErr(""); setOut("");
    try { setOut(await callClaude(assembled)); }
    catch { setErr("Da ging etwas schief - gleich nochmal versuchen."); }
    finally { setLoading(false); }
  };

  const copy = async () => {
    if (!ziel.trim()) { setErr("Füll zumindest das Ziel aus, dann lohnt sich das Kopieren."); return; }
    setErr("");
    try {
      await navigator.clipboard.writeText(assembled);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch { setErr("Kopieren hat nicht geklappt - markier den Arbeitsauftrag oben einfach von Hand."); }
  };

  return (
    <section className="sec">
      <span className="eyebrow"><Wand2 size={14} /> Station 9 · Geführte Werkstatt</span>
      <h2 style={{ fontSize: 30, marginTop: 18 }}>Baue deinen Prompt mit Leitplanken.</h2>
      <p className="lede">
        Wähle zuerst einen Use Case. Die Felder werden vorbefüllt, und du passt sie an deine echte Aufgabe an.
      </p>

      <div className="card usecase-card" style={{ marginTop: 24 }}>
        <div className="label" style={{ padding: 0, marginBottom: 12 }}>Use Case wählen</div>
        <div className="chips">
          {USE_CASES.map((u) => (
            <button key={u.id} className={`chip ${selected === u.id ? "on" : ""}`} onClick={() => applyUseCase(u.id)}>
              {u.label}
            </button>
          ))}
        </div>
      </div>

      <div className="card" style={{ marginTop: 16 }}>
        <div className="field">
          <label>1. Ziel <span className="hint">- was soll konkret rauskommen?</span></label>
          <textarea className="ta" rows={2} value={ziel} onChange={(e) => setZiel(e.target.value)} />
        </div>
        <div className="field">
          <label>2. Kontext <span className="hint">- Rolle, Zielgruppe, Situation</span></label>
          <textarea className="ta" rows={2} value={kontext} onChange={(e) => setKontext(e.target.value)} />
        </div>
        <div className="field">
          <label>3. Material <span className="hint">- Beispieltext, Stichpunkte oder grobe Idee</span></label>
          <textarea className="ta" rows={3} value={material} onChange={(e) => setMaterial(e.target.value)} placeholder="z.B. Mail, Meeting-Stichpunkte, grobe Kampagnenidee oder ein Entwurf zur Prüfung" />
        </div>
        <div className="field">
          <label>4. Format <span className="hint">- wie soll die Antwort aussehen?</span></label>
          <textarea className="ta" rows={2} value={format} onChange={(e) => setFormat(e.target.value)} />
        </div>
        <div className="field" style={{ marginBottom: 0 }}>
          <label>5. Ton & Richtlinien <span className="hint">- Grenzen, Prüfung, Do's & Don'ts</span></label>
          <textarea className="ta" rows={2} value={ton} onChange={(e) => setTon(e.target.value)} />
        </div>
      </div>

      <div className="workshop-tip">
        <Sparkles size={16} />
        <span>Stärker wird der Prompt, wenn du Material ergänzt: Rohtext, Stichpunkte, Zielgruppe, No-Gos oder ein Beispiel für den gewünschten Ton.</span>
      </div>

      <div className="label" style={{ padding: "20px 0 8px" }}>Dein fertiger Prompt</div>
      <div className="assembled">{assembled}</div>

      <div style={{ display: "flex", gap: 12, marginTop: 18, flexWrap: "wrap" }}>
        <button className="btn btn-primary" onClick={run} disabled={loading}>
          {loading ? <><Loader2 size={17} className="spin" /> Prüft ...</> : <><Play size={17} /> Prompt prüfen</>}
        </button>
        <button className="btn btn-ghost" onClick={copy} disabled={loading}>
          {copied ? <><Check size={17} /> Kopiert!</> : <><Copy size={17} /> Prompt kopieren</>}
        </button>
      </div>

      {err && <div className="notice" style={{ marginTop: 16 }}><X size={16} /> {err}</div>}

      {out && (
        <div className="card" style={{ marginTop: 18, borderColor: "rgba(62,224,143,.28)" }}>
          <div className="label" style={{ padding: 0, marginBottom: 10 }}>Offline-Check deines Prompts</div>
          <div style={{ whiteSpace: "pre-wrap", fontSize: 14.5 }}>{out}</div>
        </div>
      )}

      <div className="notice" style={{ marginTop: 18 }}>
        <Shield size={16} />
        <span>Wichtig: Für echte Aufgaben und Kundendaten nutzt ihr <b>Langdock</b>. Keine privaten KI-Tools nebenbei verwenden.</span>
      </div>
    </section>
  );
}
