import React from "react";
import { Brain } from "lucide-react";
import { LEARN } from "../data/learn.jsx";

export default function Learn() {
  return (
    <section className="sec">
      <span className="eyebrow"><Brain size={14} /> Station 4 · Sicher und wirksam nutzen</span>
      <h2 style={{ fontSize: 30, marginTop: 18 }}>Acht Regeln für gute KI-Arbeit.</h2>
      <p className="lede">
        Diese Punkte helfen dir, KI produktiv einzusetzen, ohne Verantwortung, Daten oder Qualität aus der Hand zu geben.
      </p>

      <div className="grid g2" style={{ marginTop: 26 }}>
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
