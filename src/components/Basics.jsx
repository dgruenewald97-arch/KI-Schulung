import React from "react";
import { ClipboardCheck, CheckCircle2 } from "lucide-react";
import { BASICS } from "../data/basics.js";

export default function Basics() {
  return (
    <section className="sec">
      <span className="eyebrow"><ClipboardCheck size={14} /> Station 2 · KI im Arbeitsalltag</span>
      <h2 style={{ fontSize: 30, marginTop: 18 }}>Erst das gemeinsame Fundament.</h2>
      <p className="lede">
        KI ist kein Orakel und kein Ersatz für Fachurteil. Sie ist ein Arbeitsmittel:
        stark bei Entwürfen, Struktur und Varianten, aber nur zuverlässig, wenn du sie bewusst einsetzt.
      </p>

      <div className="grid g2" style={{ marginTop: 26 }}>
        {BASICS.map((group) => (
          <div key={group.title} className="card basics-card">
            <h3>{group.title}</h3>
            <ul>
              {group.items.map((item) => (
                <li key={item}><CheckCircle2 size={15} /> <span>{item}</span></li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="notice" style={{ marginTop: 18 }}>
        <ClipboardCheck size={16} />
        <span>
          Merksatz: Je wichtiger das Ergebnis, desto mehr Kontext, Prüfung und menschliche Freigabe braucht es.
        </span>
      </div>
    </section>
  );
}
