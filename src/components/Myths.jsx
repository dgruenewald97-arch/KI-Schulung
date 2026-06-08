import React, { useState } from "react";
import { Shield, RotateCcw } from "lucide-react";
import { MYTHS } from "../data/myths.js";

export default function Myths() {
  const [open, setOpen] = useState({});
  return (
    <section className="sec">
      <span className="eyebrow"><Shield size={14} /> Station 3 · Mythen-Check</span>
      <h2 style={{ fontSize: 30, marginTop: 18 }}>Erwartungen geradeziehen.</h2>
      <p className="lede">Vier typische Gedanken zu KI und was im Arbeitsalltag wirklich daraus folgt.</p>

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
                <span className="myth-tag" style={{ color: "var(--acc)" }}>Einordnung</span>
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
