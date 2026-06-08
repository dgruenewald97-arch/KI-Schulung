import React from "react";
import { Sparkles, ArrowRight } from "lucide-react";
import { ROLES } from "../data/roles.js";

export default function Intro({ role, setRole, next }) {
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
          Danach richten sich die Beispiele in den Stationen 3 & 4 – passend zu deinem Alltag, nicht zu irgendeiner Rolle.
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
