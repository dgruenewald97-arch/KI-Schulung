import React, { useState } from "react";
import { Trophy, RotateCcw, Copy, Check, ClipboardList } from "lucide-react";
import { BRAND } from "../data/brand.js";

const CHEAT =
`PROMPT-SPICKZETTEL · ${BRAND.name}

5 Bausteine eines guten Prompts:
• Ziel – was soll konkret rauskommen? (Verb + Ergebnis)
• Kontext – Rolle, Zielgruppe, Situation
• Material – Rohtext, Stichpunkte, Beispiel, Daten
• Format – Länge, Struktur, Form
• Ton & Richtlinien – Tonfall + klare Grenzen ("keine Fakten erfinden")

Marken-Ton: ${BRAND.voice}.

Techniken bei Bedarf:
• Beispiel vorgeben (Few-Shot)   • Rolle zuweisen
• Schritt für Schritt denken     • Format erzwingen

Methode je Situation:
• Klar → Basis-Briefing          • Unklar → Reverse Prompting
• Ideen → Brainstorming          • Prüfen → Kritischer Stakeholder

Vor dem Verwenden prüfen:
Fakten? Quellen? Ton? Annahmen sichtbar? Kundentauglich? Würde ich das freigeben?

Im Job: in Langdock arbeiten – keine vertraulichen Daten in private Tools.`;

const STARTERS = [
  "Einen bestehenden Text klarer, freundlicher oder kürzer machen",
  "Aus Stichpunkten eine Agenda, Mail oder Zusammenfassung bauen",
  "Mit KI Ideen brainstormen, clustern und die besten Optionen bewerten",
  "Einen Entwurf aus Kund:innen-, PM-, Kreations- und Compliance-Sicht prüfen",
  "Mit Reverse Prompting aus einer groben Idee einen guten Prompt bauen",
];

export default function Finish({ restart }) {
  const [cases, setCases] = useState("");
  const [copied, setCopied] = useState(false);
  const addStarter = (starter) => {
    setCases((current) => {
      if (!current.trim()) return starter;
      return `${current}${current.endsWith("\n") ? "" : "\n"}${starter}`;
    });
  };
  const copyCheat = async () => {
    try {
      await navigator.clipboard.writeText(CHEAT);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch { /* Clipboard nicht verfügbar – Text steht sichtbar da */ }
  };

  return (
    <section className="sec" style={{ paddingTop: 64, textAlign: "center" }}>
      <div className="medal"><Trophy size={36} color="#06120b" /></div>
      <h2 style={{ fontSize: 34 }}>Geschafft.</h2>
      <p className="lede" style={{ margin: "14px auto 0" }}>
        Du hast jetzt vier praktische Muster: sauber briefen, mit Reverse Prompting klären,
        Ideen brainstormen und Ergebnisse aus mehreren Perspektiven prüfen.
      </p>

      <div className="card" style={{ marginTop: 30, textAlign: "left" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
          <h3 style={{ fontSize: 17, margin: 0, display: "flex", alignItems: "center", gap: 8 }}><ClipboardList size={18} /> Prompt-Spickzettel</h3>
          <button className="btn btn-ghost" onClick={copyCheat}>
            {copied ? <><Check size={16} /> Kopiert!</> : <><Copy size={16} /> Spickzettel kopieren</>}
          </button>
        </div>
        <p style={{ color: "var(--muted)", fontSize: 13.5, margin: "8px 0 14px" }}>
          Zum Mitnehmen: alles Wichtige auf einen Blick. Kopier ihn dir z.B. in deine Notizen oder pinn ihn ans Board.
        </p>
        <div className="assembled">{CHEAT}</div>
      </div>

      <div className="card" style={{ marginTop: 18, textAlign: "left" }}>
        <h3 style={{ fontSize: 17, marginBottom: 4 }}>Deine Use Cases für den Start</h3>
        <p style={{ color: "var(--muted)", fontSize: 13.5, margin: "0 0 14px" }}>
          Wähle keine riesigen Projekte. Starte mit Aufgaben, die regelmäßig vorkommen und bei denen du das Ergebnis gut prüfen kannst.
        </p>
        <div className="starter-list">
          {STARTERS.map((starter) => (
            <button key={starter} className="starter" onClick={() => addStarter(starter)}>{starter}</button>
          ))}
        </div>
        <textarea className="ta" rows={5} value={cases} onChange={(e) => setCases(e.target.value)} placeholder={"Use Case einfügen oder selbst schreiben ..."} />
        <p style={{ color: "var(--faint)", fontSize: 12, margin: "10px 0 0" }}>Tipp: Gute Use Cases sind klein genug zum Ausprobieren und wichtig genug, dass Zeitersparnis spürbar wird.</p>
      </div>

      <div className="card" style={{ marginTop: 18, textAlign: "left" }}>
        <h3 style={{ fontSize: 17, marginBottom: 8 }}>Die vier Teamregeln</h3>
        <div className="rule"><span className="n">1</span> <span>Bei klaren Aufgaben: Ziel, Kontext, Material, Format und Grenzen angeben.</span></div>
        <div className="rule"><span className="n">2</span> <span>Bei unklaren Aufgaben: Reverse Prompting nutzen und erst Rückfragen beantworten.</span></div>
        <div className="rule"><span className="n">3</span> <span>Bei wichtigen Ergebnissen: kritische Stakeholder-Perspektiven einholen.</span></div>
        <div className="rule"><span className="n">4</span> <span>Im Job Langdock nutzen und Outputs prüfen: Fakten, Quellen, Zahlen, Bias, Tonalität und Kundentauglichkeit.</span></div>
      </div>

      <div className="card quality-card" style={{ marginTop: 18, textAlign: "left" }}>
        <h3 style={{ fontSize: 17, marginBottom: 8 }}>Qualitätscheck vor dem Verwenden</h3>
        <div className="quality-grid">
          <span>Fakten stimmen?</span>
          <span>Quellen geprüft?</span>
          <span>Ton passend?</span>
          <span>Annahmen sichtbar?</span>
          <span>Keine erfundenen Details?</span>
          <span>Würde ich das so freigeben?</span>
        </div>
      </div>

      <div className="notice" style={{ marginTop: 18, textAlign: "left" }}>
        <span>
          Wenn du nicht weißt, wie du eine Aufgabe an KI geben sollst: Frag die KI selbst.
          Bitte sie, dir beim Prompt zu helfen, Rückfragen zu stellen, Annahmen offenzulegen und Quellen oder Gegenargumente mitzudenken.
          Danach prüfst du kritisch, was davon für deinen Kontext wirklich passt.
        </span>
      </div>

      <div style={{ marginTop: 30 }}>
        <button className="btn btn-ghost" onClick={restart}><RotateCcw size={16} /> Nochmal von vorn</button>
      </div>
    </section>
  );
}
