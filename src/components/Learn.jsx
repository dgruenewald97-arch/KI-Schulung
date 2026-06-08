import React from "react";
import { Brain } from "lucide-react";
import { LEARN } from "../data/learn.jsx";

export default function Learn() {
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
