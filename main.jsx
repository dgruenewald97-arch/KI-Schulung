import React, { useState } from "react";
import {
  Sparkles, ArrowRight, ArrowLeft, Check, X, Lightbulb, Brain,
  Shield, Wand2, Play, Loader2, Trophy, RotateCcw, Zap,
} from "lucide-react";

/* ============================================================
   KI-Mitmach-Guide  ·  Mobility Minds
   Self-paced Onboarding fürs Team auf Basis snipKI Modul 1.

   Läuft komplett offline:  npm install && npm run dev
   - Station 3 (Prompt-Duell) nutzt vorbereitete Beispielantworten
     und braucht KEIN Backend -> der Aha-Moment funktioniert sofort.
   - Station 4 (Werkstatt) ruft callClaude() auf. Das ist aktuell
     ein Stub -> hier später Langdock / eigenen Proxy anbinden
     (siehe callClaude() weiter unten und README / CLAUDE.md).
   ============================================================ */

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400..800&family=Hanken+Grotesk:wght@400;500;600;700&display=swap');

html,body,#root{height:100%;margin:0}
:root{
  --bg:#0a0e0d; --bg2:#101614; --bg3:#16201c;
  --line:rgba(255,255,255,.08); --line2:rgba(255,255,255,.14);
  --txt:#e9f0ea; --muted:#8b978f; --faint:#5d6b63;
  --acc:#3ee08f; --acc2:#2bbf78; --accsoft:rgba(62,224,143,.12);
  --warn:#e0b15e; --warnsoft:rgba(224,177,94,.12);
  --danger:#e07a6a;
}
*{box-sizing:border-box}
.kg{
  font-family:'Hanken Grotesk',sans-serif;
  background:
    radial-gradient(900px 500px at 80% -10%, rgba(62,224,143,.10), transparent 60%),
    radial-gradient(700px 500px at -10% 110%, rgba(62,224,143,.06), transparent 55%),
    var(--bg);
  color:var(--txt); min-height:100%; width:100%;
  padding:0; line-height:1.55; -webkit-font-smoothing:antialiased;
}
.kg h1,.kg h2,.kg h3,.kg .disp{font-family:'Bricolage Grotesque',sans-serif;letter-spacing:-.02em;line-height:1.08}
.wrap{max-width:760px;margin:0 auto;padding:0 22px 90px}

.topbar{position:sticky;top:0;z-index:20;backdrop-filter:blur(14px);
  background:rgba(10,14,13,.72);border-bottom:1px solid var(--line)}
.topbar-in{max-width:760px;margin:0 auto;padding:14px 22px;display:flex;align-items:center;gap:14px}
.logo{display:flex;align-items:center;gap:9px;font-family:'Bricolage Grotesque';font-weight:700;font-size:15px}
.logo .dot{width:9px;height:9px;border-radius:50%;background:var(--acc);box-shadow:0 0 14px var(--acc)}
.steps{margin-left:auto;font-size:12.5px;color:var(--muted);font-variant-numeric:tabular-nums}
.pbar{height:3px;background:rgba(255,255,255,.06)}
.pfill{height:100%;background:linear-gradient(90deg,var(--acc2),var(--acc));transition:width .5s cubic-bezier(.4,0,.2,1);box-shadow:0 0 12px rgba(62,224,143,.5)}

.sec{animation:rise .5s cubic-bezier(.16,1,.3,1) both;padding-top:42px}
@keyframes rise{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:none}}
.eyebrow{display:inline-flex;align-items:center;gap:7px;font-size:12px;font-weight:600;
  letter-spacing:.12em;text-transform:uppercase;color:var(--acc);
  background:var(--accsoft);padding:6px 12px;border-radius:999px;border:1px solid rgba(62,224,143,.2)}
.lede{color:var(--muted);font-size:16.5px;margin-top:14px;max-width:60ch}

.card{background:linear-gradient(180deg,var(--bg2),var(--bg3));border:1px solid var(--line);
  border-radius:18px;padding:22px}
.grid{display:grid;gap:14px}
@media(min-width:620px){.g2{grid-template-columns:1fr 1fr}}

.btn{font-family:'Hanken Grotesk';font-weight:600;font-size:15px;cursor:pointer;border:none;
  border-radius:12px;padding:13px 20px;display:inline-flex;align-items:center;gap:9px;
  transition:transform .12s ease,filter .2s ease,background .2s ease;color:#06120b}
.btn:active{transform:translateY(1px) scale(.99)}
.btn-primary{background:linear-gradient(180deg,var(--acc),var(--acc2));box-shadow:0 8px 24px -10px rgba(62,224,143,.6)}
.btn-primary:hover{filter:brightness(1.06)}
.btn-ghost{background:transparent;color:var(--txt);border:1px solid var(--line2)}
.btn-ghost:hover{background:rgba(255,255,255,.04)}
.btn:disabled{opacity:.5;cursor:not-allowed}
.nav{display:flex;justify-content:space-between;align-items:center;margin-top:40px;gap:12px}

.chips{display:flex;flex-wrap:wrap;gap:10px;margin-top:8px}
.chip{font-family:'Hanken Grotesk';font-size:14px;font-weight:500;cursor:pointer;
  padding:10px 15px;border-radius:11px;border:1px solid var(--line2);background:var(--bg2);
  color:var(--txt);transition:all .16s ease}
.chip:hover{border-color:var(--acc);color:var(--acc)}
.chip.on{background:var(--accsoft);border-color:var(--acc);color:var(--acc);font-weight:600}

.myth{position:relative;cursor:pointer;min-height:168px;perspective:1200px}
.myth-in{position:relative;width:100%;height:100%;min-height:168px;transition:transform .6s cubic-bezier(.4,0,.2,1);transform-style:preserve-3d}
.myth.flip .myth-in{transform:rotateY(180deg)}
.face{position:absolute;inset:0;backface-visibility:hidden;border-radius:18px;padding:22px;
  border:1px solid var(--line);display:flex;flex-direction:column;justify-content:space-between}
.face.front{background:linear-gradient(180deg,var(--bg2),var(--bg3))}
.face.back{background:linear-gradient(180deg,#0e1c15,#0b1611);border-color:rgba(62,224,143,.28);transform:rotateY(180deg)}
.myth-q{font-family:'Bricolage Grotesque';font-weight:600;font-size:18px}
.myth-tag{font-size:11.5px;font-weight:700;letter-spacing:.1em;text-transform:uppercase}
.tap{font-size:12.5px;color:var(--faint);display:flex;align-items:center;gap:6px}

.lc-ico{width:42px;height:42px;border-radius:12px;display:grid;place-items:center;
  background:var(--accsoft);color:var(--acc);margin-bottom:14px}
.lc h3{font-size:18px;margin:0 0 8px}
.lc p{color:var(--muted);font-size:14.5px;margin:0}

.duel{display:grid;gap:14px}
@media(min-width:680px){.duel{grid-template-columns:1fr 1fr}}
.col{border-radius:18px;border:1px solid var(--line);overflow:hidden}
.col-h{padding:14px 18px;font-family:'Bricolage Grotesque';font-weight:600;font-size:15px;
  display:flex;align-items:center;gap:9px;border-bottom:1px solid var(--line)}
.col.bad .col-h{background:var(--warnsoft);color:var(--warn)}
.col.good .col-h{background:var(--accsoft);color:var(--acc)}
.prompt-box{padding:16px 18px;font-family:'Hanken Grotesk';font-size:13px;color:var(--muted);
  white-space:pre-wrap;border-bottom:1px solid var(--line);background:rgba(0,0,0,.18);
  max-height:230px;overflow:auto}
.out{padding:16px 18px;font-size:14px;white-space:pre-wrap;min-height:90px}
.out-empty{color:var(--faint);font-style:italic;font-size:13.5px}
.label{font-size:11px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--faint);padding:12px 18px 0}

.field{margin-bottom:16px}
.field label{display:block;font-size:13.5px;font-weight:600;margin-bottom:7px}
.field .hint{color:var(--faint);font-weight:400}
.inp,.ta{width:100%;font-family:'Hanken Grotesk';font-size:14.5px;color:var(--txt);
  background:var(--bg);border:1px solid var(--line2);border-radius:11px;padding:12px 14px;resize:vertical}
.inp:focus,.ta:focus{outline:none;border-color:var(--acc);box-shadow:0 0 0 3px var(--accsoft)}
.assembled{background:rgba(0,0,0,.25);border:1px dashed var(--line2);border-radius:12px;
  padding:16px;font-size:13px;white-space:pre-wrap;color:var(--muted)}

.opt{width:100%;text-align:left;font-family:'Hanken Grotesk';font-size:14.5px;cursor:pointer;
  background:var(--bg2);border:1px solid var(--line2);border-radius:12px;padding:14px 16px;
  margin-bottom:10px;color:var(--txt);transition:all .14s ease;display:flex;align-items:center;gap:11px}
.opt:hover:not(:disabled){border-color:var(--acc)}
.opt:disabled{cursor:default}
.opt.correct{background:var(--accsoft);border-color:var(--acc);color:var(--acc)}
.opt.wrong{background:rgba(224,122,106,.12);border-color:var(--danger);color:var(--danger)}
.opt .mk{width:22px;height:22px;border-radius:50%;border:1.5px solid var(--line2);
  display:grid;place-items:center;flex-shrink:0}
.opt.correct .mk{border-color:var(--acc);background:var(--acc);color:#06120b}
.opt.wrong .mk{border-color:var(--danger);background:var(--danger);color:#fff}
.explain{background:rgba(0,0,0,.22);border-left:3px solid var(--acc);border-radius:0 10px 10px 0;
  padding:13px 16px;font-size:13.5px;color:var(--muted);margin-top:6px}

.notice{display:flex;gap:11px;align-items:flex-start;background:var(--warnsoft);
  border:1px solid rgba(224,177,94,.25);border-radius:12px;padding:13px 15px;font-size:13px;color:#e8d3a8;margin-top:14px}
.notice svg{flex-shrink:0;color:var(--warn);margin-top:1px}

.hero-badge{font-size:13px;color:var(--muted);display:flex;align-items:center;gap:8px;margin-top:18px}
.dotsep{width:3px;height:3px;border-radius:50%;background:var(--faint)}

.medal{width:84px;height:84px;border-radius:50%;display:grid;place-items:center;margin:0 auto 22px;
  background:radial-gradient(circle at 30% 30%,var(--acc),var(--acc2));
  box-shadow:0 14px 40px -12px rgba(62,224,143,.7);animation:pop .6s cubic-bezier(.16,1,.3,1) both}
@keyframes pop{from{transform:scale(.5);opacity:0}to{transform:scale(1);opacity:1}}
.rule{display:flex;gap:11px;padding:13px 0;border-bottom:1px solid var(--line);font-size:14.5px}
.rule:last-child{border:none}
.rule .n{color:var(--acc);font-family:'Bricolage Grotesque';font-weight:700}
.spin{animation:sp 1s linear infinite}@keyframes sp{to{transform:rotate(360deg)}}
.kbd{font-family:'Bricolage Grotesque';font-size:13px;color:var(--acc);background:var(--accsoft);
  padding:2px 8px;border-radius:6px;border:1px solid rgba(62,224,143,.2)}
`;

/* ------------------------------------------------------------------
   BACKEND-ANBINDUNG (Station 4 / Werkstatt)
   ------------------------------------------------------------------
   Aktuell ein Stub: gibt einen Platzhalter zurück, damit die App
   ohne Backend läuft. Zum Live-Schalten hier einen Aufruf an euren
   Langdock-Endpoint oder einen kleinen Proxy einbauen, z. B.:

     const res = await fetch("/api/ask", {
       method: "POST",
       headers: { "Content-Type": "application/json" },
       body: JSON.stringify({ prompt }),
     });
     const data = await res.json();
     return data.answer;

   Den API-Key NIE im Frontend ablegen -> immer über einen Server-Proxy.
------------------------------------------------------------------ */
async function callClaude(prompt) {
  await new Promise((r) => setTimeout(r, 700));
  return (
    "🔌 Demo-Modus: Hier erscheint später die echte KI-Antwort.\n\n" +
    "Sobald der Langdock-Endpoint in callClaude() angebunden ist, " +
    "läuft dein Prompt wirklich durch die KI.\n\n" +
    "Dein Prompt war übrigens " +
    prompt.trim().split(/\s+/).length +
    " Wörter lang – schon ein guter, strukturierter Start."
  );
}

const ROLES = [
  { id: "beratung", label: "Beratung / Kundenkontakt", ctx: "Ich arbeite in der Kundenberatung einer Agentur und bin viel im Austausch mit Kunden." },
  { id: "kreation", label: "Kreation / Content", ctx: "Ich arbeite im Kreations- und Content-Team einer Agentur und texte & gestalte für Kampagnen." },
  { id: "pm", label: "Projektmanagement", ctx: "Ich bin Projektmanager:in in einer Agentur und koordiniere Teams, Timings und Kunden." },
  { id: "social", label: "Social Media / Marketing", ctx: "Ich arbeite im Social-Media- und Marketing-Team einer Agentur." },
  { id: "analyse", label: "Analyse / Daten", ctx: "Ich arbeite mit Daten, Tracking und Reportings in einer Agentur." },
  { id: "andere", label: "Etwas anderes", ctx: "Ich arbeite in einer Agentur." },
];

const MYTHS = [
  { tag: "Mythos", q: "„KI nimmt mir den Job weg.“", t: "Eher nicht die KI – sondern jemand, der sie beherrscht.", a: "Wie Scott Galloway sagt: „Nicht die KI nimmt dir den Job, sondern jemand, der KI versteht.“ Wer jetzt lernt, sie als Werkzeug zu nutzen, wird schneller und unverzichtbarer – nicht ersetzt." },
  { tag: "Mythos", q: "„Ich muss dafür programmieren können.“", t: "Nein – du musst nur klar formulieren.", a: "Prompting ist Sprache, kein Code. Du beschreibst der KI in normalen Sätzen, was du willst. Je klarer du sagst, was rauskommen soll, desto besser das Ergebnis. Kein einziger Technik-Skill nötig." },
  { tag: "Mythos", q: "„Was die KI schreibt, stimmt schon.“", t: "Vorsicht – sie rät nur clever.", a: "Ein Sprachmodell „weiß“ nichts. Es berechnet das statistisch wahrscheinlichste nächste Wort. Das klingt oft überzeugend, kann aber komplett falsch sein („Halluzination“). Bei allem Wichtigen: gegenchecken." },
  { tag: "Mythos", q: "„Ich kann einfach alles reinkippen.“", t: "Nein – Datenschutz zuerst.", a: "Keine vertraulichen Kunden-, Personen- oder Finanzdaten in private/kostenlose KI-Tools. Im Job nutzen wir Langdock – lizenziert und datenschutzkonform. Im Zweifel: IT oder Datenschutz fragen." },
];

const LEARN = [
  { ico: <Lightbulb size={20} />, h: "Kontext ist König", p: "Die KI kennt weder dich noch eure Kunden. Je mehr relevanten Kontext du gibst (deine Rolle, dein Ziel, das Format), desto präziser die Antwort. „Shit in, shit out.“" },
  { ico: <Brain size={20} />, h: "KI schätzt, sie weiß nicht", p: "Beeindruckend, aber fehleranfällig. Du bleibst der „Human in the Loop“: Du prüfst, wählst aus und entscheidest. Die KI liefert den Entwurf, nicht die Wahrheit." },
  { ico: <Zap size={20} />, h: "Das richtige Modell", p: "„Schnelle Antwort“ für Alltag, kurze Texte & schnelle Tasks. „Think Deeper / Smart“ für komplexe Analysen und mehrstufige Aufgaben – das Modell denkt dann länger nach." },
];

/* Station 3 läuft offline mit vorbereiteten Beispielantworten.
   So funktioniert der Aha-Moment ohne Backend. */
const DUELS = {
  email: {
    label: "E-Mail schreiben",
    scenario: "Szenario: Du musst einem geschätzten Kunden einen bereits vereinbarten Termin kurzfristig verschieben.",
    bad: "Schreib eine E-Mail wegen der Terminverschiebung.",
    good: (ctx) =>
`# Ziel
Formuliere eine freundliche, professionelle E-Mail, die einen vereinbarten Termin verschiebt, kurz um Verständnis bittet und zwei konkrete Ersatztermine vorschlägt.

# Kontext
${ctx} Es geht um einen geschätzten Kunden – die Beziehung ist gut und soll es bleiben.

# Format
Max. 120 Wörter, mit Betreffzeile, klarer Struktur, eine konkrete Handlungsaufforderung am Ende.

# Ton & Richtlinien
Verbindlich und wertschätzend, kein Floskel-Deutsch, Sie-Ansprache.`,
    badOut:
`Sehr geehrte Damen und Herren,

leider müssen wir den Termin verschieben. Bitte teilen Sie uns mit, wann es Ihnen passt.

Mit freundlichen Grüßen`,
    goodOut:
`Betreff: Terminverschiebung – kurz Ihre Wahl?

Sehr geehrte Frau Berg,

leider muss ich unseren Termin am Donnerstag kurzfristig verschieben und bitte das vielmals zu entschuldigen. Mir ist wichtig, dass wir zeitnah weitermachen – daher zwei Vorschläge:

• Montag, 14:00 Uhr
• Dienstag, 10:30 Uhr

Sagen Sie mir gern, was besser passt, dann bestätige ich sofort.

Beste Grüße`,
  },
  brainstorm: {
    label: "Ideen brainstormen",
    scenario: "Szenario: Du brauchst frische Ideen für ein internes Team-Event.",
    bad: "Gib mir Ideen für ein Team-Event.",
    good: (ctx) =>
`# Ziel
Schlag mir 6 kreative, aber realistisch umsetzbare Ideen für ein internes Team-Event vor.

# Kontext
${ctx} Team von ca. 12 Personen, gemischte Interessen, Budget pro Person eher knapp, Ziel ist Zusammenhalt und Spaß – nicht das 10. Bowling.

# Format
Nummerierte Liste. Pro Idee: ein Satz Beschreibung + warum sie zum Ziel passt + grobe Aufwand-Einschätzung.

# Richtlinien
Keine Standard-Klischees. Mische drinnen/draußen und aktiv/entspannt.`,
    badOut:
`- Bowling
- Grillen
- Escape Room
- Essen gehen
- Kino`,
    goodOut:
`1. Kochduell in der Mietküche – Teams kochen gegeneinander; verbindet, weil alle zusammen Hände schmutzig machen. Aufwand: mittel.
2. Stadt-Rallye mit Foto-Challenges – draußen, aktiv, gemischte Teams; fördert Reden über Abteilungen hinweg. Aufwand: gering.
3. Mini-Workshop „Skill-Tausch“ – jede:r bringt 15 Min. zu einem Hobby; entspannt & überraschend persönlich. Aufwand: gering.
4. Gemeinsamer Freiwilligen-Vormittag – Sinn + Teamgefühl; gutes Gewissen inklusive. Aufwand: mittel.
5. Quiz-Abend „Wer kennt die Firma?“ – locker, lacht-garantiert, drinnen. Aufwand: gering.
6. Kanu-Tour mit Picknick – draußen, aktiv, aber entspannt; klares „raus aus dem Alltag“. Aufwand: höher.`,
  },
  umformulieren: {
    label: "Text umformulieren",
    scenario: "Szenario: Diese trockene Info-Nachricht soll freundlicher & klarer werden:\n„Wir teilen mit, dass das Update am 12. erfolgt. Bei Rückfragen melden.“",
    bad: "Mach das schöner: „Wir teilen mit, dass das Update am 12. erfolgt. Bei Rückfragen melden.“",
    good: (ctx) =>
`# Ziel
Formuliere diese Nachricht freundlicher, klarer und nahbarer um:
„Wir teilen mit, dass das Update am 12. erfolgt. Bei Rückfragen melden.“

# Kontext
${ctx} Die Nachricht geht an Kolleg:innen und soll informieren, ohne steif zu wirken.

# Format
2–3 kurze Sätze, gerne mit einer freundlichen Einleitung und klarem Hinweis, wo man Fragen loswird.

# Ton & Richtlinien
Warm, professionell, Du-Ansprache. Keine Behördensprache.`,
    badOut:
`Hiermit möchten wir Sie darüber in Kenntnis setzen, dass das Update am 12. durchgeführt wird. Für Rückfragen stehen wir zur Verfügung.`,
    goodOut:
`Kleine Info für euch: Am 12. spielen wir das Update ein – ihr müsst nichts tun.

Falls danach etwas hakt oder ihr Fragen habt, meldet euch einfach kurz bei mir. 🙂`,
  },
  zusammenfassen: {
    label: "Notizen zusammenfassen",
    scenario: "Szenario: Diese chaotischen Meeting-Notizen sollen verwertbar werden:\n„Call mit Kunde, neue LP bis KW so 20?, Maria macht Texte, Design fehlt noch, Budget ok aber nochmal bestätigen, Tracking-Frage offen.“",
    bad: "Fass das zusammen: Call mit Kunde, neue LP bis KW so 20?, Maria macht Texte, Design fehlt noch, Budget ok aber nochmal bestätigen, Tracking-Frage offen.",
    good: (ctx) =>
`# Ziel
Erstelle aus diesen Roh-Notizen eine saubere, weiterleitbare Zusammenfassung:
„Call mit Kunde, neue LP bis KW so 20?, Maria macht Texte, Design fehlt noch, Budget ok aber nochmal bestätigen, Tracking-Frage offen.“

# Kontext
${ctx} Die Zusammenfassung geht ans Team und soll sofort handlungsfähig machen.

# Format
Drei Blöcke: (1) Kurz-Summary in 2 Sätzen, (2) To-Dos mit „Wer macht was“, (3) Offene Fragen.

# Richtlinien
Nur was in den Notizen steht, nichts erfinden. Unklares als offene Frage markieren.`,
    badOut:
`Es gab einen Call mit dem Kunden. Eine neue Landingpage soll bis KW 20 entstehen. Maria macht die Texte, das Design fehlt noch und das Budget ist ok. Die Tracking-Frage ist offen.`,
    goodOut:
`Kurz-Summary
Im Kundencall ging es um eine neue Landingpage, Zieltermin grob KW 20. Texte sind verteilt, Design und ein paar Freigaben sind noch offen.

To-Dos
• Maria: Texte für die Landingpage
• Design: noch offen – Verantwortliche:n festlegen
• Budget: vorhanden, muss aber nochmal bestätigt werden

Offene Fragen
• Ist KW 20 ein fixer oder grober Termin?
• Tracking-Frage: was genau ist hier zu klären?`,
  },
};

const QUIZ = [
  { q: "Was macht ein Sprachmodell technisch, wenn es dir antwortet?", opts: ["Es schlägt im Internet die Wahrheit nach", "Es berechnet das wahrscheinlichste nächste Wort", "Es kopiert eine gespeicherte Antwort"], correct: 1, ex: "Genau deshalb kann es überzeugend klingen und trotzdem falsch liegen. Wichtiges immer gegenchecken." },
  { q: "Was ist der größte Hebel für ein gutes Ergebnis?", opts: ["Das teuerste KI-Tool", "Ein klarer Prompt mit Kontext, Ziel & Format", "Möglichst viele Tools parallel"], correct: 1, ex: "Gutes Prompting schlägt Tool-Vielfalt. Die KI kennt dich nicht – der Kontext muss von dir kommen." },
  { q: "Welche Daten gehören NICHT in ein nicht-freigegebenes KI-Tool?", opts: ["Vertrauliche Kunden- & Personendaten", "Eine erfundene Beispiel-Aufgabe", "Eine öffentliche Pressemitteilung"], correct: 0, ex: "Im Job nutzen wir Langdock – lizenziert & datenschutzkonform. Im Zweifel IT/Datenschutz fragen." },
  { q: "Wann lohnt sich ein „Think Deeper / Smart“-Modell?", opts: ["Bei einer schnellen, simplen Frage", "Bei komplexen, mehrstufigen Analysen", "Nie, ist nur teurer"], correct: 1, ex: "Für Alltagstexte reicht das schnelle Modell. Komplexe Denk-Aufgaben profitieren vom längeren Nachdenken." },
  { q: "Was tust du mit einem KI-Output bei einer wichtigen Entscheidung?", opts: ["Direkt übernehmen, spart Zeit", "Kritisch prüfen und gegenchecken", "Sofort an den Kunden schicken"], correct: 1, ex: "Du bleibst der „Human in the Loop“. Die KI liefert den Entwurf – die Verantwortung bleibt bei dir." },
];

export default function App() {
  const [step, setStep] = useState(0);
  const [role, setRole] = useState(ROLES[0]);

  const sections = ["intro", "myths", "learn", "duel", "workshop", "quiz", "finish"];
  const total = sections.length;
  const cur = sections[step];
  const go = (d) => setStep((s) => Math.min(total - 1, Math.max(0, s + d)));

  return (
    <div className="kg">
      <style>{CSS}</style>

      <div className="topbar">
        <div className="topbar-in">
          <div className="logo"><span className="dot" /> KI-Mitmach-Guide</div>
          <div className="steps">{step + 1} / {total}</div>
        </div>
        <div className="pbar"><div className="pfill" style={{ width: `${((step + 1) / total) * 100}%` }} /></div>
      </div>

      <div className="wrap">
        {cur === "intro" && <Intro role={role} setRole={setRole} next={() => go(1)} />}
        {cur === "myths" && <Myths />}
        {cur === "learn" && <Learn />}
        {cur === "duel" && <Duel role={role} />}
        {cur === "workshop" && <Workshop role={role} />}
        {cur === "quiz" && <Quiz />}
        {cur === "finish" && <Finish restart={() => setStep(0)} />}

        {cur !== "intro" && cur !== "finish" && (
          <div className="nav">
            <button className="btn btn-ghost" onClick={() => go(-1)}><ArrowLeft size={17} /> Zurück</button>
            <button className="btn btn-primary" onClick={() => go(1)}>Weiter <ArrowRight size={17} /></button>
          </div>
        )}
      </div>
    </div>
  );
}

function Intro({ role, setRole, next }) {
  return (
    <section className="sec" style={{ paddingTop: 70 }}>
      <span className="eyebrow"><Sparkles size={14} /> Mobility Minds · Modul 1</span>
      <h1 style={{ fontSize: 44, marginTop: 22 }}>Vom Zuschauer<br />zum KI-Anwender.</h1>
      <p className="lede">
        Ein kleiner Mitmach-Guide aus dem KI-Führerschein – in ~15 Minuten, in deinem Tempo.
        Kein Vortrag: du baust selbst Prompts und siehst <b style={{ color: "var(--acc)" }}>den Unterschied sofort</b>. Versprochen schmerzfrei.
      </p>

      <div className="card" style={{ marginTop: 30 }}>
        <label style={{ fontSize: 14, fontWeight: 600, display: "block", marginBottom: 4 }}>Womit arbeitest du am meisten?</label>
        <p style={{ color: "var(--muted)", fontSize: 13.5, margin: "0 0 14px" }}>
          Damit passen die Beispiele später zu deinem Alltag – nicht zu irgendeiner Rolle.
        </p>
        <div className="chips">
          {ROLES.map((r) => (
            <button key={r.id} className={`chip ${role.id === r.id ? "on" : ""}`} onClick={() => setRole(r)}>
              {r.label}
            </button>
          ))}
        </div>
      </div>

      <div className="hero-badge">
        <span>6 Stationen</span><span className="dotsep" /><span>Selbst ausprobieren</span><span className="dotsep" /><span>1 Mini-Quiz</span>
      </div>

      <div style={{ marginTop: 34 }}>
        <button className="btn btn-primary" onClick={next}>Los geht's <ArrowRight size={18} /></button>
      </div>
    </section>
  );
}

function Myths() {
  const [open, setOpen] = useState({});
  return (
    <section className="sec">
      <span className="eyebrow"><Shield size={14} /> Station 1 · Mythen-Check</span>
      <h2 style={{ fontSize: 30, marginTop: 18 }}>Erstmal aufräumen.</h2>
      <p className="lede">Vier Sätze, die fast jede:r zu KI im Kopf hat. Tipp drauf und dreh sie um.</p>

      <div className="grid g2" style={{ marginTop: 26 }}>
        {MYTHS.map((m, i) => (
          <div key={i} className={`myth ${open[i] ? "flip" : ""}`} onClick={() => setOpen((o) => ({ ...o, [i]: !o[i] }))}>
            <div className="myth-in">
              <div className="face front">
                <span className="myth-tag" style={{ color: "var(--warn)" }}>{m.tag}</span>
                <div className="myth-q">{m.q}</div>
                <span className="tap"><RotateCcw size={13} /> antippen zum Aufdecken</span>
              </div>
              <div className="face back">
                <span className="myth-tag" style={{ color: "var(--acc)" }}>Realität</span>
                <div>
                  <div className="myth-q" style={{ color: "var(--acc)", fontSize: 16, marginBottom: 8 }}>{m.t}</div>
                  <p style={{ color: "var(--muted)", fontSize: 13.5, margin: 0 }}>{m.a}</p>
                </div>
                <span className="tap"><RotateCcw size={13} /> zurückdrehen</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Learn() {
  return (
    <section className="sec">
      <span className="eyebrow"><Brain size={14} /> Station 2 · So tickt KI</span>
      <h2 style={{ fontSize: 30, marginTop: 18 }}>Drei Dinge, die alles erklären.</h2>
      <p className="lede">Mehr Grundverständnis brauchst du für den Anfang nicht.</p>

      <div className="grid" style={{ marginTop: 26 }}>
        {LEARN.map((l, i) => (
          <div key={i} className="card lc">
            <div className="lc-ico">{l.ico}</div>
            <h3>{l.h}</h3>
            <p>{l.p}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Duel({ role }) {
  const [task, setTask] = useState("email");
  const [loading, setLoading] = useState(false);
  const [shown, setShown] = useState(false);
  const d = DUELS[task];

  const run = async () => {
    setLoading(true); setShown(false);
    await new Promise((r) => setTimeout(r, 650));
    setShown(true); setLoading(false);
  };

  const pick = (t) => { setTask(t); setShown(false); };

  return (
    <section className="sec">
      <span className="eyebrow"><Zap size={14} /> Station 3 · Das Prompt-Duell</span>
      <h2 style={{ fontSize: 30, marginTop: 18 }}>Gleiche Aufgabe. Anderer Prompt.</h2>
      <p className="lede">Wähl eine Aufgabe, schau dir <b>beide</b> Prompts an – und sieh den Unterschied im Ergebnis schwarz auf grün.</p>

      <div className="chips" style={{ marginTop: 22 }}>
        {Object.entries(DUELS).map(([k, v]) => (
          <button key={k} className={`chip ${task === k ? "on" : ""}`} onClick={() => pick(k)}>{v.label}</button>
        ))}
      </div>

      <p style={{ color: "var(--muted)", fontSize: 13.5, marginTop: 16, whiteSpace: "pre-wrap" }}>{d.scenario}</p>

      <div style={{ margin: "18px 0 22px" }}>
        <button className="btn btn-primary" onClick={run} disabled={loading}>
          {loading ? <><Loader2 size={17} className="spin" /> Vergleich läuft …</> : <><Play size={17} /> Ergebnisse zeigen</>}
        </button>
      </div>

      <div className="duel">
        <div className="col bad">
          <div className="col-h"><X size={16} /> Der faule Prompt</div>
          <div className="prompt-box">{d.bad}</div>
          <div className="label">Ergebnis</div>
          <div className="out">{shown ? d.badOut : <span className="out-empty">{loading ? "…" : "Noch nichts – oben auf „Ergebnisse zeigen“ tippen."}</span>}</div>
        </div>
        <div className="col good">
          <div className="col-h"><Check size={16} /> Der starke Prompt</div>
          <div className="prompt-box">{d.good(role.ctx)}</div>
          <div className="label">Ergebnis</div>
          <div className="out">{shown ? d.goodOut : <span className="out-empty">{loading ? "…" : "Hier landet das deutlich bessere Ergebnis."}</span>}</div>
        </div>
      </div>

      <div className="notice" style={{ marginTop: 18 }}>
        <Shield size={16} />
        <span>Merksatz: Der Unterschied kommt nicht vom Tool, sondern von <b>Ziel · Kontext · Format · Ton</b>. Die baust du gleich selbst.</span>
      </div>
    </section>
  );
}

function Workshop({ role }) {
  const [ziel, setZiel] = useState("");
  const [kontext, setKontext] = useState(role.ctx);
  const [format, setFormat] = useState("");
  const [ton, setTon] = useState("");
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState("");
  const [out, setOut] = useState("");
  const [err, setErr] = useState("");

  const assembled =
`# Ziel
${ziel || "… was soll genau rauskommen?"}

# Kontext
${kontext || "… wer bist du, worum geht's?"}

# Format
${format || "… Länge, Struktur, Form (optional)"}

# Ton & Richtlinien
${ton || "… Tonfall, Do's & Don'ts (optional)"}`;

  const run = async () => {
    if (!ziel.trim()) { setErr("Gib zumindest ein Ziel ein – das ist das Herz des Prompts."); return; }
    setLoading(true); setMode("test"); setErr(""); setOut("");
    try { setOut(await callClaude(assembled)); }
    catch { setErr("Da ging etwas schief – gleich nochmal versuchen."); }
    finally { setLoading(false); }
  };

  const improve = async () => {
    if (!ziel.trim()) { setErr("Füll zumindest das Ziel aus, dann poliert die KI deinen Prompt."); return; }
    setLoading(true); setMode("improve"); setErr(""); setOut("");
    try {
      const meta = `Du bist ein Prompt-Coach. Hier ist der Prompt-Entwurf einer Kollegin/eines Kollegen:\n\n"""${assembled}"""\n\nVerbessere ihn: behalte die Struktur (Ziel, Kontext, Format, Ton), mach ihn präziser und konkreter, und erkläre in 2-3 Stichpunkten, was du warum geändert hast. Antworte auf Deutsch.`;
      setOut(await callClaude(meta));
    } catch { setErr("Da ging etwas schief – gleich nochmal versuchen."); }
    finally { setLoading(false); }
  };

  return (
    <section className="sec">
      <span className="eyebrow"><Wand2 size={14} /> Station 4 · Prompt-Werkstatt</span>
      <h2 style={{ fontSize: 30, marginTop: 18 }}>Jetzt du.</h2>
      <p className="lede">Bau deinen ersten starken Prompt aus 4 Bausteinen. Nimm eine echte Aufgabe von dir – aber mit <b>erfundenen</b> Beispieldaten.</p>

      <div className="card" style={{ marginTop: 24 }}>
        <div className="field">
          <label>1. Ziel <span className="hint">– was soll konkret rauskommen?</span></label>
          <input className="inp" value={ziel} onChange={(e) => setZiel(e.target.value)} placeholder="z.B. Eine kurze, freundliche Absage für eine Anfrage formulieren" />
        </div>
        <div className="field">
          <label>2. Kontext <span className="hint">– wer bist du, worum geht's?</span></label>
          <textarea className="ta" rows={2} value={kontext} onChange={(e) => setKontext(e.target.value)} />
        </div>
        <div className="field">
          <label>3. Format <span className="hint">– Länge, Struktur (optional)</span></label>
          <input className="inp" value={format} onChange={(e) => setFormat(e.target.value)} placeholder="z.B. Max. 4 Sätze, freundlicher Schluss" />
        </div>
        <div className="field" style={{ marginBottom: 0 }}>
          <label>4. Ton & Richtlinien <span className="hint">– Tonfall, Do's & Don'ts (optional)</span></label>
          <input className="inp" value={ton} onChange={(e) => setTon(e.target.value)} placeholder="z.B. Warm & professionell, keine Floskeln, Du-Ansprache" />
        </div>
      </div>

      <div className="label" style={{ padding: "20px 0 8px" }}>Dein zusammengebauter Prompt</div>
      <div className="assembled">{assembled}</div>

      <div style={{ display: "flex", gap: 12, marginTop: 18, flexWrap: "wrap" }}>
        <button className="btn btn-primary" onClick={run} disabled={loading}>
          {loading && mode === "test" ? <><Loader2 size={17} className="spin" /> Testet …</> : <><Play size={17} /> Prompt testen</>}
        </button>
        <button className="btn btn-ghost" onClick={improve} disabled={loading}>
          {loading && mode === "improve" ? <><Loader2 size={17} className="spin" /> Poliert …</> : <><Sparkles size={17} /> KI verbessert meinen Prompt</>}
        </button>
      </div>

      {err && <div className="notice" style={{ marginTop: 16 }}><X size={16} /> {err}</div>}

      {out && (
        <div className="card" style={{ marginTop: 18, borderColor: "rgba(62,224,143,.28)" }}>
          <div className="label" style={{ padding: 0, marginBottom: 10 }}>{mode === "improve" ? "Verbesserter Prompt + Begründung" : "Antwort auf deinen Prompt"}</div>
          <div style={{ whiteSpace: "pre-wrap", fontSize: 14.5 }}>{out}</div>
        </div>
      )}

      <div className="notice" style={{ marginTop: 18 }}>
        <Shield size={16} />
        <span>Wichtig: Hier nur unkritische Beispiele eingeben – <b>keine echten Kunden- oder Personendaten</b>. Im Job läuft sowas über Langdock.</span>
      </div>
    </section>
  );
}

function Quiz() {
  const [answers, setAnswers] = useState({});
  const answered = Object.keys(answers).length;
  const score = QUIZ.reduce((s, q, i) => s + (answers[i] === q.correct ? 1 : 0), 0);
  const choose = (qi, oi) => { if (answers[qi] != null) return; setAnswers((a) => ({ ...a, [qi]: oi })); };

  return (
    <section className="sec">
      <span className="eyebrow"><Trophy size={14} /> Station 5 · Mini-Quiz</span>
      <h2 style={{ fontSize: 30, marginTop: 18 }}>Sitzt es?</h2>
      <p className="lede">Fünf kurze Fragen, Sofort-Feedback. Kein Druck – reines Hirn-Kitzeln.</p>

      {answered === QUIZ.length && (
        <div className="card" style={{ marginTop: 22, borderColor: "rgba(62,224,143,.3)", textAlign: "center" }}>
          <div className="disp" style={{ fontSize: 34, color: "var(--acc)" }}>{score} / {QUIZ.length}</div>
          <p style={{ color: "var(--muted)", margin: "6px 0 0", fontSize: 14.5 }}>
            {score === QUIZ.length ? "Sauber – alles richtig! Du bist bereit." : score >= 3 ? "Stark! Das Fundament sitzt." : "Kein Stress – scroll nochmal durch die Erklärungen."}
          </p>
        </div>
      )}

      <div style={{ marginTop: 24 }}>
        {QUIZ.map((q, qi) => {
          const picked = answers[qi];
          const done = picked != null;
          return (
            <div key={qi} style={{ marginBottom: 26 }}>
              <h3 style={{ fontSize: 17, marginBottom: 14 }}>{qi + 1}. {q.q}</h3>
              {q.opts.map((o, oi) => {
                let cls = "opt";
                if (done && oi === q.correct) cls += " correct";
                else if (done && oi === picked) cls += " wrong";
                return (
                  <button key={oi} className={cls} disabled={done} onClick={() => choose(qi, oi)}>
                    <span className="mk">{done && oi === q.correct ? <Check size={13} /> : done && oi === picked ? <X size={13} /> : ""}</span>
                    {o}
                  </button>
                );
              })}
              {done && <div className="explain">{q.ex}</div>}
            </div>
          );
        })}
      </div>
    </section>
  );
}

function Finish({ restart }) {
  const [cases, setCases] = useState("");
  return (
    <section className="sec" style={{ paddingTop: 64, textAlign: "center" }}>
      <div className="medal"><Trophy size={36} color="#06120b" /></div>
      <h2 style={{ fontSize: 34 }}>Geschafft. 🎉</h2>
      <p className="lede" style={{ margin: "14px auto 0" }}>
        Du hast den Dreh raus: Kontext gibt den Ton an, du bleibst der Chef im Kopf, und ein starker Prompt schlägt jedes Tool.
      </p>

      <div className="card" style={{ marginTop: 30, textAlign: "left" }}>
        <h3 style={{ fontSize: 17, marginBottom: 4 }}>Deine 3 Use Cases</h3>
        <p style={{ color: "var(--muted)", fontSize: 13.5, margin: "0 0 14px" }}>
          Letzter Schritt aus dem Führerschein: notier 3 Aufgaben aus deinem Alltag, bei denen du KI ab jetzt einsetzt.
        </p>
        <textarea className="ta" rows={4} value={cases} onChange={(e) => setCases(e.target.value)} placeholder={"1. …\n2. …\n3. …"} />
        <p style={{ color: "var(--faint)", fontSize: 12, margin: "10px 0 0" }}>Tipp: kopier dir die Liste raus – sie ist dein Startpunkt für Langdock.</p>
      </div>

      <div className="card" style={{ marginTop: 18, textAlign: "left" }}>
        <h3 style={{ fontSize: 17, marginBottom: 8 }}>Die goldenen Regeln</h3>
        <div className="rule"><span className="n">1</span> <span>Gib Kontext – die KI kennt dich & eure Kunden nicht.</span></div>
        <div className="rule"><span className="n">2</span> <span>Bau Prompts aus <span className="kbd">Ziel · Kontext · Format · Ton</span>.</span></div>
        <div className="rule"><span className="n">3</span> <span>Prüf das Ergebnis – die KI schätzt, sie weiß nicht.</span></div>
        <div className="rule"><span className="n">4</span> <span>Keine vertraulichen Daten in private Tools – im Job: Langdock.</span></div>
      </div>

      <div style={{ marginTop: 30 }}>
        <button className="btn btn-ghost" onClick={restart}><RotateCcw size={16} /> Nochmal von vorn</button>
      </div>
    </section>
  );
}
