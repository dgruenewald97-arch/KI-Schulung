import React, { useState } from "react";
import { Check, ClipboardList, Copy, RotateCcw, Trophy } from "lucide-react";
import { BRAND } from "../data/brand.js";

const CHEAT =
`KOPIER-VORLAGE · ${BRAND.name}

Nutze diese Struktur in Langdock und ersetze die Platzhalter:

# Ziel
[Was soll am Ende konkret entstehen? Verb + Ergebnis, z.B. "Erstelle eine Management-Zusammenfassung"]

# Kontext
[Firma, Kunde, Projekt, Zielgruppe, Kanal, Situation]
[Unser Stil: ${BRAND.voice}]

# Material
[Rohtext, Transkript, Stichpunkte, Kundenbriefing, Beispiel, Daten]

# Ausgabeformat
[Tabelle, Mail, Agenda, 5 Bulletpoints, Kurzfazit, Varianten, Prüfliste]

# Ton & Richtlinien
[Kundenton, Do's & Don'ts, Länge, Sprache, Freigabehinweise]

# Prüfregeln
- Keine Fakten erfinden.
- Annahmen sichtbar markieren.
- Datenschutz beachten: keine vertraulichen Daten in private KI-Tools.
- Ergebnis auf Fakten, Ton, Marke, Zielgruppe und Kundentauglichkeit prüfen.

Wenn wichtige Informationen fehlen:
Stelle mir zuerst maximal 5 Rückfragen und warte auf meine Antwort.`;

const STARTERS = [
  "Potenzial-Check: Welche 3 Aufgaben in meinem Alltag eignen sich diese Woche für einen KI-Test?",
  "Vorher/Nachher: Baue aus einem schwachen Prompt eine starke Version mit Ziel, Kontext, Material und Prüfregeln.",
  "Prompt-Architekt: Stelle mir Rückfragen und formuliere danach einen fertigen Copy-Paste-Prompt.",
  "Brainstorming: Entwickle 12 Ideen, clustere sie und bewerte die besten nach Wirkung, Aufwand und Risiko.",
  "Zusammenfassung: Verdichte mein Material in Kurzfazit, wichtigste Punkte, offene Fragen und nächste Schritte.",
  "Stakeholder: Prüfe meinen Entwurf aus Kunden-, Zielgruppen-, Team-, Kanal- und Risiko-Sicht.",
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
    } catch { /* Clipboard nicht verfügbar - Text steht sichtbar da */ }
  };

  return (
    <section className="sec" style={{ paddingTop: 64, textAlign: "center" }}>
      <div className="medal"><Trophy size={36} color="#06120b" /></div>
      <h2 style={{ fontSize: 34 }}>Geschafft.</h2>
      <p className="lede" style={{ margin: "14px auto 0" }}>
        Du hast jetzt die Grundlagen aus Modul 1 und sechs Arbeitsmuster:
        Potenziale finden, Prompts verbessern, Aufgaben klären, brainstormen,
        zusammenfassen und kritisch prüfen.
      </p>

      <div className="card" style={{ marginTop: 30, textAlign: "left" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
          <h3 style={{ fontSize: 17, margin: 0, display: "flex", alignItems: "center", gap: 8 }}><ClipboardList size={18} /> Copy-Paste-Spickzettel</h3>
          <button className="btn btn-ghost" onClick={copyCheat}>
            {copied ? <><Check size={16} /> Kopiert!</> : <><Copy size={16} /> Vorlage kopieren</>}
          </button>
        </div>
        <p style={{ color: "var(--muted)", fontSize: 13.5, margin: "8px 0 14px" }}>
          Das ist die eine Vorlage, die immer funktioniert: Ziel, Kontext, Material, Format, Richtlinien und Prüfung.
        </p>
        <div className="assembled">{CHEAT}</div>
      </div>

      <div className="card" style={{ marginTop: 18, textAlign: "left" }}>
        <h3 style={{ fontSize: 17, marginBottom: 4 }}>Deine ersten Use Cases</h3>
        <p style={{ color: "var(--muted)", fontSize: 13.5, margin: "0 0 14px" }}>
          Wähle kleine Aufgaben, die regelmäßig vorkommen und bei denen du das Ergebnis fachlich prüfen kannst.
        </p>
        <div className="starter-list">
          {STARTERS.map((starter) => (
            <button key={starter} className="starter" onClick={() => addStarter(starter)}>{starter}</button>
          ))}
        </div>
        <textarea className="ta" rows={5} value={cases} onChange={(e) => setCases(e.target.value)} placeholder={"Use Case einfügen oder selbst schreiben ..."} />
        <p style={{ color: "var(--faint)", fontSize: 12, margin: "10px 0 0" }}>Tipp: Lieber einen echten kleinen Prozess verbessern als ein riesiges KI-Projekt planen.</p>
      </div>

      <div className="card" style={{ marginTop: 18, textAlign: "left" }}>
        <h3 style={{ fontSize: 17, marginBottom: 8 }}>Teamregeln für den Alltag</h3>
        <div className="rule"><span className="n">1</span> <span>KI ist kein Wissensspeicher: Outputs kritisch prüfen, besonders Zahlen, Quellen und Kundendetails.</span></div>
        <div className="rule"><span className="n">2</span> <span>Gute Prompts brauchen Ziel, Kontext, Material, Format und Prüfregeln.</span></div>
        <div className="rule"><span className="n">3</span> <span>Bei unklaren Aufgaben erst Rückfragen stellen lassen, dann den Prompt bauen.</span></div>
        <div className="rule"><span className="n">4</span> <span>Für echte Arbeit Langdock nutzen und keine sensiblen Daten in private Tools kopieren.</span></div>
      </div>

      <div className="card quality-card" style={{ marginTop: 18, textAlign: "left" }}>
        <h3 style={{ fontSize: 17, marginBottom: 8 }}>Qualitätscheck vor dem Verwenden</h3>
        <div className="quality-grid">
          <span>Fakten stimmen?</span>
          <span>Quellen geprüft?</span>
          <span>Ton passend?</span>
          <span>Annahmen sichtbar?</span>
          <span>Datenschutz okay?</span>
          <span>Würde ich das so freigeben?</span>
        </div>
      </div>

      <div className="notice" style={{ marginTop: 18, textAlign: "left" }}>
        <span>
          Merksatz aus Modul 1: Prompt Engineering verbessert die Anfrage.
          Context Engineering verbessert die Wissensbasis. Für gute Ergebnisse brauchst du meistens beides.
        </span>
      </div>

      <div style={{ marginTop: 30 }}>
        <button className="btn btn-ghost" onClick={restart}><RotateCcw size={16} /> Nochmal von vorn</button>
      </div>
    </section>
  );
}
