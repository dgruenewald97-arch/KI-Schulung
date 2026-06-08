import React, { useState } from "react";
import { Swords, Eye, RotateCcw, Sparkles } from "lucide-react";
import { SCENARIOS } from "../data/duels.js";

export default function Duel({ role }) {
  const scenarios = SCENARIOS[role.id] || [];
  const [active, setActive] = useState(scenarios[0]?.id);
  const [revealed, setRevealed] = useState(false);
  const sc = scenarios.find((s) => s.id === active) || scenarios[0];

  if (!sc) return null;

  const choose = (id) => {
    setActive(id);
    setRevealed(false);
  };

  return (
    <section className="sec">
      <span className="eyebrow"><Swords size={14} /> Station 7 · Prompt-Duell</span>
      <h2 style={{ fontSize: 30, marginTop: 18 }}>Gleiche Aufgabe, zwei Prompts.</h2>
      <p className="lede">
        Derselbe Job, einmal faul und einmal sauber gebrieft. Schau dir die Prompts an,
        rate kurz, was rauskommt – und deck dann die Ergebnisse auf.
      </p>

      {scenarios.length > 1 && (
        <div className="chips" style={{ marginTop: 22 }}>
          {scenarios.map((s) => (
            <button key={s.id} className={`chip ${active === s.id ? "on" : ""}`} onClick={() => choose(s.id)}>
              {s.label}
            </button>
          ))}
        </div>
      )}

      <div className="card" style={{ marginTop: 16 }}>
        <div style={{ whiteSpace: "pre-wrap", fontSize: 14.5, color: "var(--muted)" }}>{sc.scenario}</div>
      </div>

      <div className="duel" style={{ marginTop: 16 }}>
        <div className="col bad">
          <div className="col-h"><Swords size={15} /> Fauler Prompt</div>
          <div className="prompt-box">{sc.bad}</div>
          <div className="label">Ergebnis</div>
          {revealed
            ? <div className="out">{sc.badOut}</div>
            : <div className="out out-empty">Noch verdeckt – erst raten, dann aufdecken.</div>}
        </div>

        <div className="col good">
          <div className="col-h"><Sparkles size={15} /> Starker Prompt</div>
          <div className="prompt-box">{sc.good(role.ctx)}</div>
          <div className="label">Ergebnis</div>
          {revealed
            ? <div className="out">{sc.goodOut}</div>
            : <div className="out out-empty">Noch verdeckt – erst raten, dann aufdecken.</div>}
        </div>
      </div>

      <div style={{ display: "flex", gap: 12, marginTop: 18, flexWrap: "wrap" }}>
        {!revealed
          ? <button className="btn btn-primary" onClick={() => setRevealed(true)}><Eye size={17} /> Ergebnisse aufdecken</button>
          : <button className="btn btn-ghost" onClick={() => setRevealed(false)}><RotateCcw size={16} /> Wieder verdecken</button>}
      </div>

      {revealed && (
        <div className="workshop-tip" style={{ marginTop: 18 }}>
          <Sparkles size={16} />
          <span>
            Der Unterschied ist nicht „mehr Wörter“, sondern <b>Ziel, Kontext, Format und Ton</b>. Beim starken Prompt
            steckt dein Arbeitskontext sichtbar drin – genau das holt die KI aus dem Allgemeinen ins Konkrete.
          </span>
        </div>
      )}
    </section>
  );
}
