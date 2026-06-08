import React from "react";
import { Sparkles, ArrowRight } from "lucide-react";
import { BRAND } from "../data/brand.js";

export default function Intro({ next }) {
  return (
    <section className="sec" style={{ paddingTop: 70 }}>
      <span className="eyebrow"><Sparkles size={14} /> {BRAND.name} · Modul 1</span>
      <h1 style={{ fontSize: 44, marginTop: 22 }}>KI sicher und sinnvoll im Agenturalltag nutzen.</h1>
      <p className="lede">
        Ein kurzer Mitmach-Guide für alle im Team: Was KI gut kann, wo Vorsicht nötig ist
        und wie aus einer Aufgabe ein guter Arbeitsauftrag wird.
      </p>
      <p style={{ color: "var(--faint)", fontSize: 14, marginTop: 8 }}>
        {BRAND.name} · {BRAND.positioning}
      </p>

      <div className="card intro-card" style={{ marginTop: 30 }}>
        <h2>Worum es hier geht</h2>
        <p>
          KI-Kompetenz heißt nicht, jedes Tool zu kennen. Es heißt, KI informiert einzusetzen:
          Chancen erkennen, Grenzen verstehen, Langdock nutzen und Ergebnisse prüfen.
        </p>
        <p>
          Danach übst du an Beispielen aus deinem Arbeitsbereich, damit das Ganze nicht abstrakt bleibt.
        </p>
      </div>

      <div className="hero-badge">
        <span>15-20 Minuten</span><span className="dotsep" /><span>Grundlagen zuerst</span><span className="dotsep" /><span>Praxis danach</span>
      </div>

      <div style={{ marginTop: 34 }}>
        <button className="btn btn-primary" onClick={next}>Starten <ArrowRight size={18} /></button>
      </div>
    </section>
  );
}
