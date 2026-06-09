import React, { useState } from "react";
import { Check, Copy, Cpu, Loader2, Play, Shield, Sparkles, Wand2, X } from "lucide-react";
import { callClaude } from "../api/callClaude.js";
import { BRAND, buildPromptContext } from "../data/brand.js";

const USE_CASES = [
  {
    id: "potential",
    label: "Potenzial-Check",
    ziel: "Analysiere meinen Arbeitsalltag und finde 3 konkrete KI-Use-Cases, die klein, wiederkehrend und gut prüfbar sind.",
    format: "Tabelle: Aufgabe | KI-Potenzial | Warum geeignet | Risiko | erster Test. Danach Top-3-Empfehlung.",
    ton: "Praktisch, kritisch und konkret. Datenschutz- oder Freigaberisiken sichtbar markieren.",
  },
  {
    id: "before-after",
    label: "Vorher/Nachher",
    ziel: "Zeige mir den Unterschied zwischen einem schwachen und einem starken Prompt für diese Aufgabe.",
    format: "1 schwacher Prompt + kurze Kritik, 1 starker Prompt mit Ziel/Kontext/Material/Format/Prüfung, erwartete Ergebnisverbesserung.",
    ton: "Erklärend, direkt und praxisnah. Keine neuen Fakten erfinden.",
  },
  {
    id: "architect",
    label: "Prompt-Architekt",
    ziel: "Hilf mir, aus einer groben Kundenaufgabe einen präzisen Copy-Paste-Prompt zu bauen. Stelle zuerst maximal 5 Rückfragen.",
    format: "Erst Rückfragen, danach fertiger Prompt, danach kurze Prüfliste für Fakten, Tonalität, Datenschutz und Kundentauglichkeit.",
    ton: "Strukturiert, fragend und kritisch. Fehlende Kundendetails sichtbar markieren.",
  },
  {
    id: "brainstorming",
    label: "Brainstorming",
    ziel: "Entwickle mehrere Ideen oder Ansätze für einen konkreten Kunden und hilf mir, die besten Optionen auszuwählen.",
    format: "Erst kurze Rückfragen, dann 12 Ideen, danach Cluster und Top-5-Bewertung nach Wirkung, Aufwand, Risiko und Markenpassung.",
    ton: "Kreativ, konkret, aber nicht beliebig. Jede Idee muss zum Kunden, zur Zielgruppe und zum Kanal passen.",
  },
  {
    id: "summary",
    label: "Zusammenfassung",
    ziel: "Erstelle aus meinem Material eine professionelle Zusammenfassung für den Arbeitskontext.",
    format: "Kurzfazit in 3 Sätzen, wichtigste Punkte, offene Fragen, Risiken/Annahmen, nächste Schritte.",
    ton: "Klar, neutral und verwertbar. Keine Inhalte ergänzen, die nicht im Material stehen.",
  },
  {
    id: "stakeholder",
    label: "Stakeholder",
    ziel: "Prüfe meinen Kundenentwurf aus mehreren Perspektiven und zeige konkrete Verbesserungen.",
    format: "Tabelle mit Perspektive, Stärke, Risiko/Unklarheit und konkreter Empfehlung.",
    ton: "Kritisch, konstruktiv, konkret. Annahmen und fehlende Kundendetails sichtbar machen.",
  },
];

export default function Workshop({ role }) {
  const [selected, setSelected] = useState(USE_CASES[0].id);
  const initial = USE_CASES[0];
  const [ziel, setZiel] = useState(initial.ziel);
  const [kontext, setKontext] = useState(buildPromptContext(role));
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

  const addBrandVoice = () => {
    setTon((t) => (t.includes(BRAND.voice) ? t : `${t.trim() ? t.trim() + " " : ""}Marken-Ton: ${BRAND.voice}.`));
  };
  const resetContext = () => {
    setKontext(buildPromptContext(role));
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
${ton || "... Tonfall, Do's & Don'ts, Prüfhinweise"}

# Prüfregeln
- Keine Fakten erfinden.
- Annahmen sichtbar markieren.
- Ergebnis auf Kundentauglichkeit, Tonalität, Datenschutz und Freigabe prüfen.`;

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
      <span className="eyebrow"><Wand2 size={14} /> Geführte Werkstatt</span>
      <h2 style={{ fontSize: 30, marginTop: 18 }}>Baue deinen Prompt mit Leitplanken.</h2>
      <p className="lede">
        Wähle zuerst eine Übung. Dann ergänzt du Kunde, Zielgruppe, Kanal und Material.
        Erst dadurch wird der Prompt wirklich brauchbar.
      </p>

      <div className="card usecase-card" style={{ marginTop: 24 }}>
        <div className="label" style={{ padding: 0, marginBottom: 12 }}>Übung wählen</div>
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
          <label>
            2. Kontext <span className="hint">- Firma, Kunde, Zielgruppe, Situation</span>
            <button type="button" className="link-add" onClick={resetContext}>+ Kontext-Vorlage</button>
          </label>
          <textarea className="ta" rows={8} value={kontext} onChange={(e) => setKontext(e.target.value)} />
        </div>
        <div className="field">
          <label>3. Material <span className="hint">- Rohtext, Stichpunkte, Transkript oder Idee</span></label>
          <textarea className="ta" rows={3} value={material} onChange={(e) => setMaterial(e.target.value)} placeholder="z.B. Kundenbriefing, Mail, Landingpage-Text, Kampagnenidee, Zielgruppen-Notizen oder Entwurf zur Prüfung" />
        </div>
        <div className="field">
          <label>4. Format <span className="hint">- wie soll die Antwort aussehen?</span></label>
          <textarea className="ta" rows={2} value={format} onChange={(e) => setFormat(e.target.value)} />
        </div>
        <div className="field" style={{ marginBottom: 0 }}>
          <label>
            5. Ton & Richtlinien <span className="hint">- Grenzen, Prüfung, Do's & Don'ts</span>
            <button type="button" className="link-add" onClick={addBrandVoice}>+ Marken-Ton</button>
          </label>
          <textarea className="ta" rows={2} value={ton} onChange={(e) => setTon(e.target.value)} />
        </div>
      </div>

      <div className="workshop-tip">
        <Sparkles size={16} />
        <span>Grundregel aus Modul 1: KI schätzt wahrscheinlich passende Antworten. Je klarer Kontext, Material und Prüfregeln sind, desto weniger muss sie raten.</span>
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

      <div className="card" style={{ marginTop: 18 }}>
        <h3 style={{ fontSize: 17, margin: "0 0 4px", display: "flex", alignItems: "center", gap: 9 }}>
          <Cpu size={18} style={{ color: "var(--acc)" }} /> In Langdock: das richtige Modell wählen
        </h3>
        <p style={{ color: "var(--muted)", fontSize: 13.5, margin: "0 0 14px" }}>
          Wenn du den Prompt rüberkopierst, entscheidet auch das Modell über die Qualität.
        </p>
        <div className="grid g2">
          <div className="card mini" style={{ margin: 0 }}>
            <h3>Schnelle Antwort</h3>
            <p>Einfache, alltägliche Aufgaben und kreative Texte. Geringe Latenz, hohe Geschwindigkeit.</p>
          </div>
          <div className="card mini" style={{ margin: 0 }}>
            <h3>Think Deeper / Smart</h3>
            <p>Das Modell denkt länger nach. Am besten für komplexe Themen, Analysen und mehrstufige Aufgaben.</p>
          </div>
        </div>
        <div className="workshop-tip" style={{ marginTop: 14 }}>
          <Sparkles size={16} />
          <span>
            Faustregel aus Modul 1: KI besucht URLs <b>nicht</b> wie ein Browser – lieber den Text rauskopieren und einfügen,
            dann arbeitet sie mit exakten Daten. Dateien (CSV, Word, PowerPoint) kann sie erzeugen, die Qualität schwankt aber je nach Format.
          </span>
        </div>
      </div>

      <div className="notice" style={{ marginTop: 18 }}>
        <Shield size={16} />
        <span>Wichtig: Für echte Aufgaben und Kundendaten nutzt ihr <b>Langdock</b>. Keine privaten KI-Tools nebenbei verwenden.</span>
      </div>
    </section>
  );
}
