import React, { useState } from "react";
import { Zap, Play, Loader2, Check, X, Shield } from "lucide-react";
import { SCENARIOS } from "../data/duels.js";

export default function Duel({ role }) {
  // Jede Rolle bringt ihre eigenen Szenarien mit. Fallback: "andere".
  const list = SCENARIOS[role.id] || SCENARIOS.andere;

  const [taskId, setTaskId] = useState(list[0].id);
  const [loading, setLoading] = useState(false);
  const [shown, setShown] = useState(false);

  const d = list.find((s) => s.id === taskId) || list[0];

  const run = async () => {
    setLoading(true); setShown(false);
    await new Promise((r) => setTimeout(r, 650));
    setShown(true); setLoading(false);
  };

  const pick = (id) => { setTaskId(id); setShown(false); };

  return (
    <section className="sec">
      <span className="eyebrow"><Zap size={14} /> Station 3 · Das Prompt-Duell</span>
      <h2 style={{ fontSize: 30, marginTop: 18 }}>Gleiche Aufgabe. Anderer Prompt.</h2>
      <p className="lede">
        Hier siehst du Aufgaben aus dem Alltag von <b style={{ color: "var(--acc)" }}>{role.label}</b>.
        Wähl eine, schau dir <b>beide</b> Prompts an – und sieh den Unterschied im Ergebnis schwarz auf grün.
      </p>

      <div className="chips" style={{ marginTop: 22 }}>
        {list.map((s) => (
          <button key={s.id} className={`chip ${taskId === s.id ? "on" : ""}`} onClick={() => pick(s.id)}>{s.label}</button>
        ))}
      </div>

      <p style={{ color: "var(--muted)", fontSize: 13.5, marginTop: 16, whiteSpace: "pre-wrap" }}>{d.scenario}</p>

      <div style={{ margin: "18px 0 22px" }}>
        <button className="btn btn-primary" onClick={run} disabled={loading}>
          {loading ? <><Loader2 size={17} className="spin" /> Vergleich läuft …</> : <><Play size={17} /> Ergebnisse zeigen</>}
        </button>
      </div>

      <div className="duel">
        <div className="col bad">
          <div className="col-h"><X size={16} /> Der faule Prompt</div>
          <div className="prompt-box">{d.bad}</div>
          <div className="label">Ergebnis</div>
          <div className="out">{shown ? d.badOut : <span className="out-empty">{loading ? "…" : "Noch nichts – oben auf „Ergebnisse zeigen“ tippen."}</span>}</div>
        </div>
        <div className="col good">
          <div className="col-h"><Check size={16} /> Der starke Prompt</div>
          <div className="prompt-box">{d.good(role.ctx)}</div>
          <div className="label">Ergebnis</div>
          <div className="out">{shown ? d.goodOut : <span className="out-empty">{loading ? "…" : "Hier landet das deutlich bessere Ergebnis."}</span>}</div>
        </div>
      </div>

      <div className="notice" style={{ marginTop: 18 }}>
        <Shield size={16} />
        <span>Merksatz: Der Unterschied kommt nicht vom Tool, sondern von <b>Ziel · Kontext · Format · Ton</b>. Die baust du gleich selbst.</span>
      </div>
    </section>
  );
}
