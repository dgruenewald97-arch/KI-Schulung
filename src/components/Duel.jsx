import React, { useState } from "react";
import { Check, Copy, Lightbulb, MessageSquareText, SearchCheck, UsersRound, Zap } from "lucide-react";

const METHODS = [
  {
    id: "briefing",
    label: "Basis-Briefing",
    ico: <MessageSquareText size={17} />,
    title: "Wenn du schon weißt, was rauskommen soll",
    intro: "Das ist der Standard für gute Ergebnisse: Du gibst nicht nur die Aufgabe, sondern auch Kontext, Format, Ton und Grenzen.",
    prompt: (role) =>
`Ich möchte eine Aufgabe mit KI bearbeiten.

Ziel:
[Was soll am Ende entstehen?]

Kontext:
${role.ctx}
[Worum geht es, wer ist die Zielgruppe, was ist wichtig?]

Format:
[z.B. Mail, Agenda, LinkedIn-Post, Tabelle, 5 Bulletpoints]

Ton & Grenzen:
[z.B. professionell, klar, keine neuen Fakten erfinden, im Job Langdock nutzen]`,
    takeaway: "Gut für: Texte, Zusammenfassungen, erste Entwürfe, Struktur, Varianten.",
  },
  {
    id: "reverse",
    label: "Reverse Prompting",
    ico: <SearchCheck size={17} />,
    title: "Wenn du noch nicht weißt, wie du prompten sollst",
    intro: "Lass dir zuerst helfen, den Auftrag zu klären. Die KI stellt Rückfragen und baut daraus den besseren Prompt.",
    prompt: (role) =>
`Hilf mir, einen guten Prompt für meine Aufgabe zu bauen.

Meine grobe Aufgabe:
[Beschreibe in 1-2 Sätzen, was du machen willst.]

Mein Arbeitskontext:
${role.ctx}

Bitte stelle mir zuerst maximal 5 Rückfragen, die du brauchst, um daraus einen präzisen Prompt zu machen.
Wenn ich geantwortet habe, formuliere daraus:
1. einen fertigen Prompt,
2. eine kurze Erklärung, warum der Prompt so aufgebaut ist,
3. eine Checkliste, worauf ich das Ergebnis prüfen sollte.`,
    takeaway: "Gut für: unscharfe Aufgaben, neue Themen, leere Seite, komplexe Briefings.",
  },
  {
    id: "brainstorming",
    label: "Brainstorming",
    ico: <Lightbulb size={17} />,
    title: "Wenn du erst einmal gute Optionen brauchst",
    intro: "KI ist stark, wenn sie nicht nur eine Antwort liefern soll, sondern viele Richtungen, Varianten und Bewertungskriterien.",
    prompt: (role) =>
`Hilf mir beim Brainstorming zu folgender Aufgabe.

Mein Kontext:
${role.ctx}

Aufgabe / Thema:
[Worum geht es? Für welchen Kunden, welches Projekt oder welches Ziel?]

Bitte arbeite in 4 Schritten:
1. Stelle mir zuerst 3 kurze Rückfragen, falls wichtige Infos fehlen.
2. Entwickle 10 unterschiedliche Ideen oder Ansätze.
3. Cluster die Ideen nach Richtung oder Nutzen.
4. Bewerte die besten 3 Ideen nach Wirkung, Aufwand und Risiko.

Wichtig: Keine generischen Standardideen. Erkläre kurz, warum die Top-Ideen passen.`,
    takeaway: "Gut für: Kampagnenideen, Headlines, Workshop-Ansätze, Content-Formate, Problemlösungen.",
  },
  {
    id: "stakeholder",
    label: "Kritischer Stakeholder",
    ico: <UsersRound size={17} />,
    title: "Wenn du ein Ergebnis prüfen willst",
    intro: "Die KI kann verschiedene Perspektiven simulieren und Schwachstellen sichtbar machen, bevor etwas an Kund:innen oder ins Team geht.",
    prompt: (role) =>
`Prüfe den folgenden Entwurf kritisch aus mehreren Perspektiven.

Mein Kontext:
${role.ctx}

Entwurf:
[Text, Idee, Agenda, Kampagne oder Entscheidung einfügen]

Bitte bewerte aus diesen Rollen:
1. Kund:in / Zielgruppe
2. Projektmanagement
3. Kreation / Marke
4. Interne Regeln / Compliance
5. Geschäftsführung / Budget

Für jede Rolle:
- Was ist stark?
- Was ist unklar oder riskant?
- Welche konkrete Verbesserung empfiehlst du?

Wichtig: Erfinde keine Fakten. Markiere Annahmen klar als Annahmen.`,
    takeaway: "Gut für: Kundentexte, Kampagnenideen, Präsentationen, Entscheidungen, Freigaben.",
  },
];

export default function Duel({ role }) {
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
      <span className="eyebrow"><Zap size={14} /> Station 7 · Richtig prompten</span>
      <h2 style={{ fontSize: 30, marginTop: 18 }}>Vier Methoden, die wirklich helfen.</h2>
      <p className="lede">
        Prompting ist kein Zauberspruch. Du entscheidest erst, welche Art Hilfe du brauchst:
        Briefing schreiben, Aufgabe klären, Ideen entwickeln oder Ergebnis kritisch prüfen.
      </p>

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
          <p>{method.intro}</p>
        </div>
        <div className="prompt-template">{prompt}</div>
        <div className="method-footer">
          <span><Check size={15} /> {method.takeaway}</span>
          <button className="btn btn-ghost" onClick={copy}>
            {copied === method.id ? <><Check size={16} /> Kopiert</> : <><Copy size={16} /> Vorlage kopieren</>}
          </button>
        </div>
      </div>
    </section>
  );
}
