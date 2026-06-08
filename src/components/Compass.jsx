import React from "react";
import { Compass as CompassIcon } from "lucide-react";
import { COMPASS } from "../data/compass.js";

export default function Compass() {
  return (
    <section className="sec">
      <span className="eyebrow"><CompassIcon size={14} /> Station 5 · KI-Kompass</span>
      <h2 style={{ fontSize: 30, marginTop: 18 }}>Welche Methode passt gerade?</h2>
      <p className="lede">
        Bevor du promptest, entscheide kurz, welche Art Hilfe du brauchst. Dann wird aus KI kein Ratespiel, sondern ein Werkzeug.
      </p>

      <div className="compass-list" style={{ marginTop: 26 }}>
        {COMPASS.map((item) => {
          const Icon = item.icon;
          return (
            <div className="compass-item" key={item.need}>
              <div className="compass-ico"><Icon size={18} /></div>
              <div>
                <div className="compass-need">{item.need}</div>
                <div className="compass-method">{item.method}</div>
                <p>{item.hint}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
