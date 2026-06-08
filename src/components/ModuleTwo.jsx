import React from "react";
import { ArrowLeft, CalendarDays, Layers3 } from "lucide-react";

export default function ModuleTwo({ back }) {
  return (
    <section className="sec module-two">
      <span className="eyebrow"><Layers3 size={14} /> Modul 2 · Fortsetzung</span>
      <h1 style={{ fontSize: 42, marginTop: 22 }}>Modul 2 kommt als nächstes.</h1>
      <p className="lede">
        Modul 1 legt das Fundament: Langdock, gute Prompts, Reverse Prompting, Brainstorming
        und kritische Prüfung. Modul 2 baut darauf auf und wird nach der nächsten Schulung ergänzt.
      </p>

      <div className="card module-preview" style={{ marginTop: 28 }}>
        <div className="module-preview-head">
          <CalendarDays size={19} />
          <div>
            <h2>Geplant für Mittwoch</h2>
            <p>Hier entsteht der zweite Teil, sobald die Inhalte aus der Schulung feststehen.</p>
          </div>
        </div>
      </div>

      <div style={{ marginTop: 28 }}>
        <button className="btn btn-ghost" onClick={back}><ArrowLeft size={17} /> Zurück zu Modul 1</button>
      </div>
    </section>
  );
}
