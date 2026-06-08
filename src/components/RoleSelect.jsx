import React from "react";
import { UsersRound } from "lucide-react";
import { ROLES } from "../data/roles.js";

export default function RoleSelect({ role, setRole }) {
  return (
    <section className="sec">
      <span className="eyebrow"><UsersRound size={14} /> Station 5 · Praxisbezug</span>
      <h2 style={{ fontSize: 30, marginTop: 18 }}>Jetzt wird es konkreter.</h2>
      <p className="lede">
        Die nächsten Übungen nutzen Beispiele aus deinem Arbeitsbereich. Wähle aus, womit du am meisten zu tun hast.
      </p>

      <div className="card" style={{ marginTop: 26 }}>
        <label style={{ fontSize: 14, fontWeight: 600, display: "block", marginBottom: 4 }}>Dein Arbeitsbereich</label>
        <p style={{ color: "var(--muted)", fontSize: 13.5, margin: "0 0 14px" }}>
          Die Auswahl verändert nur die Praxisbeispiele. Die Grundregeln gelten für alle.
        </p>
        <div className="chips">
          {ROLES.map((r) => (
            <button key={r.id} className={`chip ${role.id === r.id ? "on" : ""}`} onClick={() => setRole(r)}>
              {r.label}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
