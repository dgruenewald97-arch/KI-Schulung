import React, { useState } from "react";
import { Check, Copy, Lightbulb, MessageSquareText, SearchCheck, UsersRound, Zap, AlertTriangle, Quote, Drama, ListOrdered, Table } from "lucide-react";

const METHODS = [
  {
    id: "briefing",
    label: "Basis-Briefing",
    ico: <MessageSquareText size={17} />,
    title: "Wenn du schon weißt, was rauskommen soll",
    intro: "Das ist der Standard für gute Ergebnisse: Du gibst nicht nur die Aufgabe, sondern auch Kontext, Material, Format und Ton.",
    why: "Die KI kennt deinen Kontext nicht. Die fünf Bausteine geben ihr die Leitplanken, die du auch einer neuen Kollegin geben würdest.",
    pitfalls: ["Nur das Thema nennen statt das konkrete Ergebnis", "Kein Material mitgeben – dann erfindet die KI Details", "Format vergessen → Fließtext statt nutzbarer Struktur"],
    prompt: (role) =>
`Ich möchte eine Aufgabe mit KI bearbeiten.

Ziel:
[Was soll am Ende entstehen?]

Kontext:
${role.ctx}
[Worum geht es, wer ist die Zielgruppe, was ist wichtig?]

Material:
[Rohtext, Stichpunkte, Beispiel oder Daten – das, womit die KI arbeiten soll]

Format:
[z.B. Mail, Agenda, LinkedIn-Post, Tabelle, 5 Bulletpoints]

Ton & Richtlinien:
[z.B. professionell, klar, keine neuen Fakten erfinden, Annahmen kennzeichnen]

Wenn dir für ein gutes Ergebnis etwas fehlt, frag lieber kurz nach, statt zu raten.`,
    takeaway: "Gut für: Texte, Zusammenfassungen, erste Entwürfe, Struktur, Varianten.",
  },
  {
    id: "reverse",
    label: "Reverse Prompting",
    ico: <SearchCheck size={17} />,
    title: "Wenn du noch nicht weißt, wie du prompten sollst",
    intro: "Lass dir zuerst helfen, den Auftrag zu klären. Die KI stellt Rückfragen und baut daraus den besseren Prompt.",
    why: "Bei unscharfen Aufgaben rätst du sonst selbst. Lässt du die KI erst fragen, holt sie genau die Infos, die einen präzisen Prompt ausmachen.",
    pitfalls: ["Zu früh ein fertiges Ergebnis verlangen", "Die Rückfragen nur halb beantworten", "Alles in einem Schwung wollen statt zu klären"],
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
    why: "KI ist stark im Erzeugen von Breite. Erst Menge, dann Bewertung – so trennst du gute Optionen von Lückenfüllern.",
    pitfalls: ["Die erste Idee direkt nehmen", "Kein Bewertungskriterium nennen (Wirkung/Aufwand/Risiko)", "Kontext weglassen → generische Ideen"],
    prompt: (role) =>
`Hilf mir beim Brainstorming zu folgender Aufgabe.

Mein Kontext:
${role.ctx}

Aufgabe / Thema:
[Worum geht es? Für welchen Kunden, welches Projekt oder welches Ziel?]

Bitte arbeite so:
1. Stelle mir zuerst bis zu 3 kurze Rückfragen, falls wichtige Infos fehlen, und warte auf meine Antwort.
2. Entwickle danach 10 unterschiedliche Ideen oder Ansätze.
3. Cluster die Ideen nach Richtung oder Nutzen.
4. Bewerte die besten 3 nach Wirkung, Aufwand und Risiko.

Wichtig: Keine generischen Standardideen. Erkläre kurz, warum die Top-Ideen passen.`,
    takeaway: "Gut für: Kampagnenideen, Headlines, Workshop-Ansätze, Content-Formate, Problemlösungen.",
  },
  {
    id: "stakeholder",
    label: "Kritischer Stakeholder",
    ico: <UsersRound size={17} />,
    title: "Wenn du ein Ergebnis prüfen willst",
    intro: "Die KI kann verschiedene Perspektiven simulieren und Schwachstellen sichtbar machen, bevor etwas an Kund:innen oder ins Team geht.",
    why: "Mehrere Perspektiven decken blinde Flecken auf, bevor etwas rausgeht – wie ein internes Review, nur in Sekunden.",
    pitfalls: ["Nur loben lassen statt Risiken suchen", "Annahmen der KI für Fakten halten", "Zu viele Perspektiven → bleibt oberflächlich"],
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

/* Zusatz-Techniken, die sich mit jeder Methode kombinieren lassen. */
const TECHNIQUES = [
  {
    ico: <Quote size={18} />,
    h: "Beispiel vorgeben (Few-Shot)",
    p: "Zeig ein Beispiel fürs gewünschte Ergebnis – die KI ahmt Stil und Struktur nach.",
    ex: "„So soll es klingen: <Beispiel>. Jetzt dasselbe für <neuen Fall>.“",
  },
  {
    ico: <Drama size={18} />,
    h: "Rolle zuweisen",
    p: "Gib der KI eine Rolle – das schärft Perspektive, Fachblick und Tonfall.",
    ex: "„Du bist erfahrene:r Social-Media-Redakteur:in …“",
  },
  {
    ico: <ListOrdered size={18} />,
    h: "Schritt für Schritt",
    p: "Erst denken oder planen lassen, dann ausführen – das senkt Flüchtigkeitsfehler.",
    ex: "„Geh in Schritten vor: erst Gliederung, dann ausformulieren.“",
  },
  {
    ico: <Table size={18} />,
    h: "Format erzwingen",
    p: "Schreib die Form genau vor (Tabelle, Bullets, Vorlage) – spart Nacharbeit.",
    ex: "„Antworte als Tabelle mit Spalten: Thema | Ziel | Zeit.“",
  },
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
      <span className="eyebrow"><Zap size={14} /> Station 8 · Richtig prompten</span>
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

        <div className="method-why"><Lightbulb size={15} /> <span><b>Warum das wirkt:</b> {method.why}</span></div>

        <div className="prompt-template">{prompt}</div>

        <div className="method-pitfalls">
          <div className="mp-head"><AlertTriangle size={14} /> Typische Fehler</div>
          <ul>
            {method.pitfalls.map((p) => <li key={p}>{p}</li>)}
          </ul>
        </div>

        <div className="method-footer">
          <span><Check size={15} /> {method.takeaway}</span>
          <button className="btn btn-ghost" onClick={copy}>
            {copied === method.id ? <><Check size={16} /> Kopiert</> : <><Copy size={16} /> Vorlage kopieren</>}
          </button>
        </div>
      </div>

      <div className="label" style={{ padding: "26px 0 4px" }}>Profi-Techniken zum Kombinieren</div>
      <p className="lede" style={{ marginTop: 0, fontSize: 15 }}>
        Diese vier Kniffe lassen sich mit jeder Methode oben mischen – sie machen jeden Prompt schärfer.
      </p>
      <div className="grid g2" style={{ marginTop: 16 }}>
        {TECHNIQUES.map((t) => (
          <div key={t.h} className="card lc">
            <div className="lc-ico">{t.ico}</div>
            <h3>{t.h}</h3>
            <p>{t.p}</p>
            <div className="tech-ex">{t.ex}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
