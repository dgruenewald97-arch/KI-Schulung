import React from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { BRAND } from "../data/brand.js";

export default function Intro({ next }) {
  return (
    <section className="sec" style={{ paddingTop: 70 }}>
      <span className="eyebrow"><Sparkles size={14} /> {BRAND.name} · KI-Grundlagen</span>
      <h1 style={{ fontSize: 44, marginTop: 22 }}>KI im Alltag nutzen, ohne den Überblick zu verlieren.</h1>
      <p className="lede">
        Ein kurzer Durchlauf für das Team: erst verstehen, wann KI hilft, dann eine Methode wählen,
        danach einen eigenen Prompt bauen.
      </p>
      <p style={{ color: "var(--faint)", fontSize: 14, marginTop: 8 }}>
        {BRAND.name} · {BRAND.positioning}
      </p>

      <div className="card intro-card" style={{ marginTop: 30 }}>
        <h2>So läuft es ab</h2>
        <p>
          Du gehst durch acht kurze Schritte. Jeder Schritt hat genau eine Aufgabe:
          verstehen, auswählen, vergleichen, ausprobieren.
        </p>
        <p>
          Am Ende hast du einen fertigen Prompt, den du in Langdock weiterverwenden kannst.
        </p>
      </div>

      <div className="hero-badge">
        <span>8 Schritte</span><span className="dotsep" /><span>15 Minuten</span><span className="dotsep" /><span>eigener Prompt am Ende</span>
      </div>

      <div style={{ marginTop: 34 }}>
        <button className="btn btn-primary" onClick={next}>Loslegen <ArrowRight size={18} /></button>
      </div>
    </section>
  );
}
