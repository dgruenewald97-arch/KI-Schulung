import React from "react";
import { AlertTriangle, Brain, ClipboardCheck, Layers3, ShieldCheck, Sparkles } from "lucide-react";

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
    takeaways: ["kein klarer Plan", "keine echten Use Cases", "Unsicherheit bei Datenschutz", "zu wenig Transfer in den Alltag"],
  },
  {
    icon: Brain,
    title: "Was generative KI wirklich macht",
    text: "Sprachmodelle wissen nicht im menschlichen Sinn. Sie berechnen wahrscheinliche nächste Wörter auf Basis von Mustern im Trainingsmaterial und deinem Kontext.",
    takeaways: ["GPT = Generative Pre-trained Transformer", "stark bei Sprache, Struktur, Varianten", "nicht automatisch wahr oder vollständig"],
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

export default function Basics() {
  return (
    <section className="sec">
      <span className="eyebrow"><ClipboardCheck size={14} /> Grundlagen</span>
      <h2 style={{ fontSize: 30, marginTop: 18 }}>Erst verstehen, dann kopieren.</h2>
      <p className="lede">
        Diese Seite ist der kurze Unterbau aus Modul 1: warum KI relevant ist, wo sie Grenzen hat
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
