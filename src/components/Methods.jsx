import React, { useState } from "react";
import {
  Check,
  ClipboardList,
  Copy,
  FileText,
  Lightbulb,
  MessageSquareText,
  SearchCheck,
  ShieldCheck,
  UsersRound,
  Zap,
} from "lucide-react";
import { buildPromptContext } from "../data/brand.js";

const METHODS = [
  {
    id: "potential",
    label: "Potenzial-Check",
    ico: <SearchCheck size={17} />,
    title: "KI-Potenziale im Job identifizieren",
    use: "Wenn jemand noch nicht weiß, wo KI im Alltag wirklich helfen kann.",
    learn: "Grundlage aus Modul 1: KI wird nützlich, wenn die Aufgabe klar, wiederkehrend und prüfbar ist. Tools allein reichen nicht.",
    prompt: (role) =>
`Kopiere diesen Prompt in Langdock und ersetze die Platzhalter in [eckigen Klammern].

# Aufgabe
Analysiere meinen Arbeitsalltag und finde konkrete KI-Potenziale.

# Kontext
${buildPromptContext(role)}

# Meine typischen Aufgaben
[Liste 5-10 Aufgaben, die regelmäßig vorkommen: z.B. Briefings, Reporting, Recherche, Textentwürfe, Zusammenfassungen, QA, Kundenkommunikation]

# Bitte liefere
1. Eine Tabelle mit: Aufgabe | KI-Potenzial | Warum geeignet | Risiko | erster Test.
2. Die Top 3 Aufgaben, mit denen ich diese Woche starten sollte.
3. Für jede Top-Aufgabe einen ersten Copy-Paste-Prompt.

# Prüfregeln
- Bevorzuge kleine, wiederkehrende Aufgaben statt riesiger Projekte.
- Markiere Aufgaben, bei denen Datenschutz, Kundendaten oder Faktenprüfung besonders wichtig sind.
- Keine Tool-Werbung. Es geht um brauchbare Arbeitsabläufe.`,
    check: ["Ist der Use Case klein genug für einen ersten Test?", "Kann ich das Ergebnis fachlich prüfen?", "Sind Kundendaten und Freigaben berücksichtigt?"],
  },
  {
    id: "before-after",
    label: "Vorher/Nachher",
    ico: <Zap size={17} />,
    title: "Der Vorher-Nachher-Effekt",
    use: "Wenn gezeigt werden soll, warum Kontext, Ziel und Format bessere Ergebnisse machen.",
    learn: "Grundlage: Shit in, shit out. Ein unklarer Prompt produziert oft generische Antworten, ein guter Prompt gibt Ziel, Kontext, Material und Grenzen mit.",
    prompt: (role) =>
`Kopiere diesen Prompt in Langdock und ersetze die Platzhalter in [eckigen Klammern].

# Aufgabe
Zeige mir den Unterschied zwischen einem schwachen und einem starken Prompt.

# Kontext
${buildPromptContext(role)}

# Thema oder Aufgabe
[Beschreibe kurz die Aufgabe, z.B. LinkedIn-Post, Kundenmail, Zusammenfassung, Kampagnenidee, Reporting-Kommentar]

# Material
[Füge Rohtext, Stichpunkte oder ein kurzes Kundenbriefing ein]

# Bitte arbeite in 3 Schritten
1. Erstelle zuerst einen bewusst schwachen Prompt und erkläre, warum er schwach ist.
2. Erstelle danach einen starken Prompt mit Ziel, Kontext, Material, Format und Prüfregeln.
3. Zeige, wie sich das erwartete Ergebnis dadurch verbessert.

# Prüfregeln
- Keine neuen Fakten erfinden.
- Annahmen sichtbar markieren.
- Ergebnis muss kundentauglich und direkt weiterverwendbar sein.`,
    check: ["Kann man den starken Prompt sofort kopieren?", "Sind die fehlenden Infos sichtbar?", "Ist der Nutzen des besseren Promptings klar erkennbar?"],
  },
  {
    id: "architect",
    label: "Prompt-Architekt",
    ico: <MessageSquareText size={17} />,
    title: "Gemeinsam mit der KI zum Ziel",
    use: "Wenn die Aufgabe noch unscharf ist und erst geklärt werden muss.",
    learn: "Grundlage: Gute Prompts entstehen oft im Dialog. Erst Rückfragen, dann Prompt, dann Ergebnis prüfen.",
    prompt: (role) =>
`Kopiere diesen Prompt in Langdock und ersetze die Platzhalter in [eckigen Klammern].

# Rolle
Du bist mein Prompt-Architekt. Hilf mir, aus einer groben Aufgabe einen präzisen, kundentauglichen Prompt zu bauen.

# Kontext
${buildPromptContext(role)}

# Grobe Aufgabe
[Beschreibe in 1-2 Sätzen, was du erreichen willst]

# Vorgehen
1. Stelle mir zuerst maximal 5 Rückfragen zu Ziel, Zielgruppe, Kanal, Material und gewünschtem Ergebnis.
2. Warte auf meine Antworten.
3. Formuliere danach einen fertigen Copy-Paste-Prompt.
4. Erkläre kurz, warum der Prompt so aufgebaut ist.
5. Ergänze eine Prüfliste für Fakten, Tonalität, Datenschutz und Kundentauglichkeit.

# Prüfregeln
- Wenn Informationen fehlen, frage nach statt zu raten.
- Markiere Annahmen.
- Keine vertraulichen Daten verlangen, wenn sie für die Aufgabe nicht nötig sind.`,
    check: ["Wurden zuerst Rückfragen gestellt?", "Ist der fertige Prompt klar gegliedert?", "Gibt es eine Prüfliste für die Freigabe?"],
  },
  {
    id: "brainstorming",
    label: "Brainstorming",
    ico: <Lightbulb size={17} />,
    title: "Brainstorming mit KI",
    use: "Wenn schnell mehrere Optionen gebraucht werden, aber nicht beliebige Standardideen.",
    learn: "Grundlage: KI ist stark in Varianten. Qualität entsteht durch klare Kriterien und anschließende Bewertung.",
    prompt: (role) =>
`Kopiere diesen Prompt in Langdock und ersetze die Platzhalter in [eckigen Klammern].

# Aufgabe
Entwickle Ideen für ein konkretes Kunden- oder Teamthema.

# Kontext
${buildPromptContext(role)}

# Thema
[Worum geht es? Kunde, Zielgruppe, Kanal, Ziel und Einschränkungen ergänzen]

# Bitte liefere
1. Falls wichtige Infos fehlen: maximal 3 Rückfragen.
2. Danach 12 unterschiedliche Ideen.
3. Cluster nach Richtung, Nutzen oder Zielgruppe.
4. Bewertung der besten 5 Ideen nach Wirkung, Aufwand, Risiko und Passung zur Marke.
5. Eine Empfehlung: Welche 2 Ideen sollten wir zuerst testen und warum?

# Prüfregeln
- Keine generischen Standardideen.
- Jede Idee muss sichtbar zu Kunde, Zielgruppe und Kanal passen.
- Annahmen und Risiken offen benennen.`,
    check: ["Sind die Ideen unterschiedlich genug?", "Gibt es Bewertungskriterien?", "Sind Risiken und Annahmen klar?"],
  },
  {
    id: "summary",
    label: "Zusammenfassung",
    ico: <FileText size={17} />,
    title: "KI-gestützte Zusammenfassungen",
    use: "Wenn aus Transkript, Briefing, Meetingnotizen oder Recherche schnell ein nutzbarer Überblick werden soll.",
    learn: "Grundlage: Zusammenfassungen werden besser, wenn Zielgruppe und Verwendungszweck klar sind. Nicht alles kürzen, sondern relevant verdichten.",
    prompt: (role) =>
`Kopiere diesen Prompt in Langdock und ersetze die Platzhalter in [eckigen Klammern].

# Aufgabe
Erstelle eine professionelle Zusammenfassung für den Arbeitskontext.

# Kontext
${buildPromptContext(role)}

# Verwendungszweck
[Für wen ist die Zusammenfassung? z.B. internes Team, Kunde, Projektleitung, Social-Team, Management]

# Material
[Füge Transkript, Notizen, Briefing, Recherchetext oder Stichpunkte ein]

# Ausgabeformat
1. Kurzfazit in 3 Sätzen.
2. Wichtigste Punkte als Bulletpoints.
3. Offene Fragen.
4. Risiken, Annahmen oder fehlende Informationen.
5. Nächste Schritte mit Verantwortlichkeit, falls ableitbar.

# Prüfregeln
- Keine Inhalte hinzufügen, die nicht im Material stehen.
- Unsichere Punkte als Annahme markieren.
- Kunden- oder personenbezogene Daten nicht unnötig wiederholen.`,
    check: ["Ist die Zusammenfassung für die Zielgruppe brauchbar?", "Sind offene Fragen sichtbar?", "Wurde nichts erfunden?"],
  },
  {
    id: "stakeholder",
    label: "Stakeholder",
    ico: <UsersRound size={17} />,
    title: "Stakeholder-Perspektiven mit KI",
    use: "Wenn ein Entwurf vor Kundentermin, Freigabe oder Umsetzung kritisch geprüft werden soll.",
    learn: "Grundlage: KI kann Perspektiven simulieren, ersetzt aber keine fachliche Entscheidung. Sie hilft, blinde Flecken früher zu sehen.",
    prompt: (role) =>
`Kopiere diesen Prompt in Langdock und ersetze die Platzhalter in [eckigen Klammern].

# Aufgabe
Prüfe meinen Entwurf aus mehreren Stakeholder-Perspektiven.

# Kontext
${buildPromptContext(role)}

# Entwurf
[Füge Text, Kampagnenidee, Reporting-Kommentar, Präsentationsstruktur, Agenda oder Entscheidung ein]

# Perspektiven
Bewerte aus Sicht von:
1. Kund:in / Auftraggeber
2. Zielgruppe
3. Mobility-Minds-Team / Umsetzung
4. Kanal oder Format
5. Risiko: Fakten, Datenschutz, Tonalität, Budget, Freigabe

# Ausgabeformat
Tabelle mit: Perspektive | Was ist stark? | Was ist unklar oder riskant? | Konkrete Verbesserung.

# Prüfregeln
- Sei kritisch, aber konstruktiv.
- Markiere Annahmen.
- Erfinde keine Kundendetails oder Zahlen.`,
    check: ["Sind echte Risiken sichtbar?", "Sind die Verbesserungen konkret?", "Bleibt klar, was Annahme und was Fakt ist?"],
  },
];

const PRINCIPLES = [
  { ico: <ClipboardList size={18} />, h: "Ziel", p: "Was soll am Ende konkret entstehen?" },
  { ico: <MessageSquareText size={18} />, h: "Kontext", p: "Für wen, in welcher Situation, mit welchem Kundenbezug?" },
  { ico: <FileText size={18} />, h: "Material", p: "Womit soll die KI arbeiten, statt zu raten?" },
  { ico: <ShieldCheck size={18} />, h: "Prüfung", p: "Fakten, Annahmen, Datenschutz, Ton und Freigabe checken." },
];

export default function Methods({ role }) {
  const [active, setActive] = useState(METHODS[0].id);
  const [copied, setCopied] = useState("");
  const method = METHODS.find((m) => m.id === active) || METHODS[0];
  const prompt = method.prompt(role);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(prompt);
      setCopied(method.id);
      setTimeout(() => setCopied(""), 1800);
    } catch {
      setCopied("");
    }
  };

  return (
    <section className="sec">
      <span className="eyebrow"><Zap size={14} /> Promptbibliothek</span>
      <h2 style={{ fontSize: 30, marginTop: 18 }}>Sechs Übungen, direkt zum Kopieren.</h2>
      <p className="lede">
        Die Grundlagen bleiben drin, aber jedes Thema endet in einem nutzbaren Prompt.
        So wird aus Wissen direkt ein Arbeitsmuster für Langdock.
      </p>

      <div className="grid g4" style={{ marginTop: 24 }}>
        {PRINCIPLES.map((p) => (
          <div key={p.h} className="card mini">
            <div className="lc-ico">{p.ico}</div>
            <h3>{p.h}</h3>
            <p>{p.p}</p>
          </div>
        ))}
      </div>

      <div className="method-tabs" style={{ marginTop: 24 }}>
        {METHODS.map((m) => (
          <button key={m.id} className={`method-tab ${active === m.id ? "on" : ""}`} onClick={() => setActive(m.id)}>
            {m.ico}<span>{m.label}</span>
          </button>
        ))}
      </div>

      <div className="card method-card" style={{ marginTop: 18 }}>
        <div>
          <h3>{method.title}</h3>
          <p><b>Wann nutzen:</b> {method.use}</p>
          <p><b>Grundlage:</b> {method.learn}</p>
        </div>

        <div className="prompt-template">{prompt}</div>

        <div className="method-pitfalls">
          <div className="mp-head"><Check size={14} /> Ergebnis prüfen</div>
          <ul>
            {method.check.map((p) => <li key={p}>{p}</li>)}
          </ul>
        </div>

        <div className="method-footer">
          <span><ShieldCheck size={15} /> In Langdock nutzen. Keine vertraulichen Daten in private KI-Tools.</span>
          <button className="btn btn-ghost" onClick={copy}>
            {copied === method.id ? <><Check size={16} /> Kopiert</> : <><Copy size={16} /> Prompt kopieren</>}
          </button>
        </div>
      </div>
    </section>
  );
}
