import React from "react";
import { Bot, Workflow, Layers3, Puzzle, Wrench, Clock, Sparkles } from "lucide-react";

const TEASERS = [
  {
    icon: Bot,
    title: "KI-Agenten verstehen",
    text: "Vom einzelnen Prompt zum mitdenkenden Helfer: Was ein Agent ist, wann er Aufgaben eigenständig in Schritten löst und wo der Mensch die Kontrolle behält.",
    points: ["Prompt vs. Agent", "Ziele statt Einzelanweisungen", "Grenzen und Freigaben"],
  },
  {
    icon: Puzzle,
    title: "Skills sinnvoll einsetzen",
    text: "Wiederverwendbare Fähigkeiten statt jedes Mal bei null anzufangen: eigene Skills bauen, sammeln und im Team teilen.",
    points: ["Skills anlegen", "im Team wiederverwenden", "Qualität sichern"],
  },
  {
    icon: Workflow,
    title: "Workflows automatisieren",
    text: "Wiederkehrende Abläufe verketten: Recherche, Entwurf, Prüfung und Freigabe als sauberer Prozess statt loser Einzelschritte.",
    points: ["Schritte verketten", "Übergaben planen", "Prüfpunkte einbauen"],
  },
  {
    icon: Layers3,
    title: "Kontext clever anbinden",
    text: "Agenten arbeiten nur so gut wie ihr Wissen. Wie du Dokumente, Beispiele und Tools andockst, ohne Datenschutz zu vergessen.",
    points: ["Wissensquellen andocken", "Tools verbinden", "Datenschutz mitdenken"],
  },
];

export default function ModuleTwo() {
  return (
    <section className="sec" style={{ paddingTop: 56 }}>
      <span className="eyebrow"><Sparkles size={14} /> Modul 2 · Vorschau</span>
      <h2 style={{ fontSize: 32, marginTop: 18 }}>Der nächste Schritt: Agenten &amp; Skills.</h2>
      <p className="lede">
        Modul 1 hat dir gezeigt, wie du gute Prompts baust. Im nächsten Modul geht es weiter:
        Wie aus einzelnen Prompts mitdenkende KI-Agenten werden, wie du Skills wiederverwendest
        und ganze Arbeitsabläufe automatisierst.
      </p>

      <div className="notice" style={{ marginTop: 20, background: "var(--accsoft)", borderColor: "rgba(62,224,143,.25)", color: "var(--muted)" }}>
        <Clock size={16} style={{ color: "var(--acc)" }} />
        <span>Dieses Modul ist in Arbeit. Hier siehst du schon mal, was dich erwartet.</span>
      </div>

      <div className="grid g2 foundation-grid" style={{ marginTop: 24 }}>
        {TEASERS.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.title} className="card basics-card foundation-card">
              <div className="lc-ico"><Icon size={18} /></div>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
              <ul>
                {item.points.map((point) => (
                  <li key={point}><span>{point}</span></li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>

      <div className="card module-preview" style={{ marginTop: 18 }}>
        <div className="module-preview-head">
          <Wrench size={20} />
          <div>
            <h2>So bauen wir es auf</h2>
            <p>Wieder interaktiv, in kurzen Schritten und mit Beispielen aus eurem Agentur-Alltag.</p>
          </div>
        </div>
        <div className="preview-list">
          <span>Erst verstehen: Was kann ein Agent wirklich, was nicht?</span>
          <span>Dann ausprobieren: einen kleinen Workflow selbst zusammenstecken</span>
          <span>Zum Schluss: ein eigener Skill, den du im Team weiterverwendest</span>
        </div>
      </div>

      <div className="notice" style={{ marginTop: 18 }}>
        <span>
          Datenschutz bleibt auch hier die Regel: keine vertraulichen Daten in private KI-Tools,
          im Job mit Langdock arbeiten.
        </span>
      </div>
    </section>
  );
}
