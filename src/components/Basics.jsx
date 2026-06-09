import React from "react";
import { AlertTriangle, Brain, ClipboardCheck, Database, Gauge, GraduationCap, Layers3, ListOrdered, ShieldCheck, Sparkles } from "lucide-react";

const FOUNDATIONS = [
  {
    icon: Sparkles,
    title: "Warum KI-Kompetenz jetzt zählt",
    text: "KI verändert Arbeitsrollen bereits heute. Tools zu kennen reicht nicht: Gute Ergebnisse entstehen durch Anwendungskompetenz, klares Briefing und kritisches Prüfen.",
    takeaways: ["Routineaufgaben werden schneller", "Prompting schlägt Tool-Hopping", "EU AI Act fordert KI-Kompetenz im Unternehmen"],
  },
  {
    icon: AlertTriangle,
    title: "Warum KI-Starts oft scheitern",
    text: "Viele Teams testen viel, aber bauen keinen roten Faden auf. Dann bleibt KI Spielerei statt Arbeitsroutine.",
    takeaways: ["kein klarer Plan", "Wissen bleibt oberflächlich", "keine echten Use Cases", "Unsicherheit bei Datenschutz", "KI als Bedrohung statt Werkzeug", "zu wenig Transfer in den Alltag"],
  },
  {
    icon: GraduationCap,
    title: "Wie Maschinen lernen",
    text: "Hinter heutigen KI-Systemen stecken drei Lernarten. Generative Sprachmodelle sind vor allem ein Ergebnis aus überwachtem Lernen plus Feedback.",
    takeaways: ["Überwacht: lernt aus gelabelten Beispielen", "Unüberwacht: findet Muster ohne Labels", "Bestärkend: lernt durch Belohnung und Strafe"],
  },
  {
    icon: Brain,
    title: "Was generative KI wirklich macht",
    text: "Sprachmodelle wissen nicht im menschlichen Sinn. Sie berechnen wahrscheinliche nächste Wörter auf Basis von Mustern im Trainingsmaterial und deinem Kontext.",
    takeaways: ["GPT = Generative Pre-trained Transformer", "stark bei Sprache, Struktur, Varianten", "nicht automatisch wahr oder vollständig"],
  },
  {
    icon: Gauge,
    title: "Warum KI gerade so schnell wird",
    text: "Die Entwicklung läuft rasant, weil mehrere Treiber gleichzeitig wirken. Gleichzeitig verschmelzen die Medienwelten: Text, Bild, Code, Video und Audio in einem System.",
    takeaways: ["stärkere Hardware (GPUs, KI-Chips)", "Modelle werden in kurzen Zyklen besser", "mehr Anbieter, mehr Wettbewerb", "Kosten pro Token sinken Richtung null"],
  },
  {
    icon: ShieldCheck,
    title: "Grenzen: Bias, Halluzinationen, Datenschutz",
    text: "KI kann plausibel klingen und trotzdem falsch liegen. Deshalb braucht jedes wichtige Ergebnis menschliche Prüfung.",
    takeaways: ["Fakten und Quellen prüfen", "Annahmen sichtbar machen", "keine vertraulichen Kundendaten in private Tools", "im Job Langdock nutzen"],
  },
  {
    icon: ClipboardCheck,
    title: "Prompt Engineering",
    text: "Du optimierst die Anweisung: Ziel, Rolle, Aufgabe, Format, Ton, Beispiele und Regeln. Je klarer der Input, desto brauchbarer der Output.",
    takeaways: ["Ziel konkret nennen", "Format vorgeben", "Material mitgeben", "No-Gos und Prüfkriterien ergänzen"],
  },
  {
    icon: Layers3,
    title: "Context Engineering",
    text: "Du optimierst die Wissensbasis: Dokumente, Transkripte, Kundenbriefing, Beispiele und Verlauf. Das macht Antworten spezifisch statt generisch.",
    takeaways: ["Build: gute Beispiele sammeln", "Add: Kontext anhängen", "Reuse: Prompt mit Kontext wiederverwenden"],
  },
];

const SIX_STEPS = [
  { t: "Zuerst nachdenken", d: "Ziel, Kontext, Zielgruppe und relevante Infos festlegen – ruhig als Stichpunkte auf Papier." },
  { t: "Meta-Prompt erstellen", d: "Die KI bitten, dir beim Bau des perfekten Prompts zu helfen – Kontext und Beispiele mitgeben." },
  { t: "Informationen bereitstellen", d: "Die klärenden Rückfragen der KI beantworten, um den Prompt zu schärfen." },
  { t: "Prompt generieren lassen", d: "Die KI einen gut strukturierten, detaillierten Prompt erstellen lassen." },
  { t: "Testen und ausführen", d: "Neues Chatfenster öffnen und den generierten Prompt verwenden." },
  { t: "Bewerten und verfeinern", d: "Ergebnis kritisch prüfen, Korrektheit beurteilen und den Prompt weiterentwickeln." },
];

const CONTEXT_LEVELS = [
  { t: "Deine Anweisung", d: "Rolle, Aufgabe, Format und Ton definieren – das klassische Prompt Engineering." },
  { t: "Deine Dokumente", d: "Vertrag, Tabelle, Bericht oder Mail als Datei anhängen." },
  { t: "Dein Gespräch", d: "Transkripte, Protokolle oder Mail-Verläufe einbeziehen." },
  { t: "Abgerufenes Wissen", d: "Datenbank, CRM oder interne Wissensbasis verknüpfen." },
];

export default function Basics() {
  return (
    <section className="sec">
      <span className="eyebrow"><ClipboardCheck size={14} /> Grundlagen</span>
      <h2 style={{ fontSize: 30, marginTop: 18 }}>Erst verstehen, dann kopieren.</h2>
      <p className="lede">
        Diese Seite ist der kurze Unterbau aus Modul 1: warum KI relevant ist, wie sie lernt, wo sie Grenzen hat
        und warum gute Prompts immer aus Ziel, Kontext, Material, Format und Prüfung bestehen.
      </p>

      <div className="grid g2 foundation-grid" style={{ marginTop: 26 }}>
        {FOUNDATIONS.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.title} className="card basics-card foundation-card">
              <div className="lc-ico"><Icon size={18} /></div>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
              <ul>
                {item.takeaways.map((takeaway) => (
                  <li key={takeaway}><span>{takeaway}</span></li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>

      <div className="card" style={{ marginTop: 18 }}>
        <h3 style={{ fontSize: 18, margin: "0 0 4px", display: "flex", alignItems: "center", gap: 9 }}>
          <ListOrdered size={18} style={{ color: "var(--acc)" }} /> Die 6-Stufen-Methode für knifflige Prompts
        </h3>
        <p style={{ color: "var(--muted)", fontSize: 14, margin: "0 0 10px" }}>
          Für komplexe Aufgaben lohnt es sich, den Prompt gemeinsam mit der KI zu bauen, statt alles auf einmal zu wollen.
        </p>
        {SIX_STEPS.map((s, i) => (
          <div className="rule" key={s.t}>
            <span className="n">{i + 1}</span>
            <span><b>{s.t}.</b> {s.d}</span>
          </div>
        ))}
      </div>

      <div className="card" style={{ marginTop: 18 }}>
        <h3 style={{ fontSize: 18, margin: "0 0 4px", display: "flex", alignItems: "center", gap: 9 }}>
          <Database size={18} style={{ color: "var(--acc)" }} /> Die vier Kontextebenen
        </h3>
        <p style={{ color: "var(--muted)", fontSize: 14, margin: "0 0 10px" }}>
          Context Engineering heißt: Du fütterst die KI mit dem, was sie über dich und den Fall noch nicht weiß – von der reinen Anweisung bis zur angebundenen Wissensbasis.
        </p>
        {CONTEXT_LEVELS.map((c, i) => (
          <div className="rule" key={c.t}>
            <span className="n">{i + 1}</span>
            <span><b>{c.t}.</b> {c.d}</span>
          </div>
        ))}
      </div>

      <div className="notice" style={{ marginTop: 18 }}>
        <ClipboardCheck size={16} />
        <span>
          Merksatz aus Modul 1: Shit in, shit out. Je wichtiger das Ergebnis, desto mehr Kontext,
          Prüfung und menschliche Freigabe braucht es.
        </span>
      </div>
    </section>
  );
}
