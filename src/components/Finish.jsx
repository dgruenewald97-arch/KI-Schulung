import React, { useState } from "react";
import { Trophy, RotateCcw } from "lucide-react";

export default function Finish({ restart }) {
  const [cases, setCases] = useState("");
  return (
    <section className="sec" style={{ paddingTop: 64, textAlign: "center" }}>
      <div className="medal"><Trophy size={36} color="#06120b" /></div>
      <h2 style={{ fontSize: 34 }}>Geschafft. 🎉</h2>
      <p className="lede" style={{ margin: "14px auto 0" }}>
        Du hast den Dreh raus: Kontext gibt den Ton an, du bleibst der Chef im Kopf, und ein starker Prompt schlägt jedes Tool.
      </p>

      <div className="card" style={{ marginTop: 30, textAlign: "left" }}>
        <h3 style={{ fontSize: 17, marginBottom: 4 }}>Deine 3 Use Cases</h3>
        <p style={{ color: "var(--muted)", fontSize: 13.5, margin: "0 0 14px" }}>
          Letzter Schritt aus dem Führerschein: notier 3 Aufgaben aus deinem Alltag, bei denen du KI ab jetzt einsetzt.
        </p>
        <textarea className="ta" rows={4} value={cases} onChange={(e) => setCases(e.target.value)} placeholder={"1. …\n2. …\n3. …"} />
        <p style={{ color: "var(--faint)", fontSize: 12, margin: "10px 0 0" }}>Tipp: kopier dir die Liste raus – sie ist dein Startpunkt für Langdock.</p>
      </div>

      <div className="card" style={{ marginTop: 18, textAlign: "left" }}>
        <h3 style={{ fontSize: 17, marginBottom: 8 }}>Die goldenen Regeln</h3>
        <div className="rule"><span className="n">1</span> <span>Gib Kontext – die KI kennt dich & eure Kunden nicht.</span></div>
        <div className="rule"><span className="n">2</span> <span>Bau Prompts aus <span className="kbd">Ziel · Kontext · Format · Ton</span>.</span></div>
        <div className="rule"><span className="n">3</span> <span>Prüf das Ergebnis – die KI schätzt, sie weiß nicht.</span></div>
        <div className="rule"><span className="n">4</span> <span>Keine vertraulichen Daten in private Tools – im Job: Langdock.</span></div>
      </div>

      <div style={{ marginTop: 30 }}>
        <button className="btn btn-ghost" onClick={restart}><RotateCcw size={16} /> Nochmal von vorn</button>
      </div>
    </section>
  );
}
