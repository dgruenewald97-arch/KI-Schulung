import React, { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { ROLES } from "./data/roles.js";
import Intro from "./components/Intro.jsx";
import Basics from "./components/Basics.jsx";
import Compass from "./components/Compass.jsx";
import RoleSelect from "./components/RoleSelect.jsx";
import Duel from "./components/Duel.jsx";
import Methods from "./components/Methods.jsx";
import Workshop from "./components/Workshop.jsx";
import Finish from "./components/Finish.jsx";

const STEPS = [
  { id: "intro", title: "Start" },
  { id: "basics", title: "Grundlagen" },
  { id: "compass", title: "Kompass" },
  { id: "role", title: "Rolle" },
  { id: "duel", title: "Vergleich" },
  { id: "methods", title: "Promptbibliothek" },
  { id: "workshop", title: "Werkstatt" },
  { id: "finish", title: "Abschluss" },
];

export default function App() {
  const [step, setStep] = useState(0);
  const [role, setRole] = useState(ROLES[0]);

  const total = STEPS.length;
  const current = STEPS[step];
  const next = STEPS[Math.min(step + 1, total - 1)];
  const go = (delta) => {
    setStep((currentStep) => Math.min(total - 1, Math.max(0, currentStep + delta)));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const restart = () => {
    setStep(0);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="kg">
      <div className="topbar">
        <div className="topbar-in">
          <div className="logo"><span className="dot" /> KI-Mitmach-Guide</div>
          <div className="top-step">
            <span>{current.title}</span>
            <strong>{step + 1} / {total}</strong>
          </div>
        </div>
        <div className="pbar"><div className="pfill" style={{ width: `${((step + 1) / total) * 100}%` }} /></div>
      </div>

      <div className="wrap">
        {current.id === "intro" && <Intro next={() => go(1)} />}
        {current.id === "basics" && <Basics />}
        {current.id === "compass" && <Compass />}
        {current.id === "role" && <RoleSelect role={role} setRole={setRole} />}
        {current.id === "duel" && <Duel key={role.id} role={role} />}
        {current.id === "methods" && <Methods key={role.id} role={role} />}
        {current.id === "workshop" && <Workshop key={role.id} role={role} />}
        {current.id === "finish" && <Finish restart={restart} />}

        {current.id !== "intro" && current.id !== "finish" && (
          <div className="nav">
            <button className="btn btn-ghost" onClick={() => go(-1)}><ArrowLeft size={17} /> Zurück</button>
            <button className="btn btn-primary" onClick={() => go(1)}>Weiter zu {next.title} <ArrowRight size={17} /></button>
          </div>
        )}
      </div>
    </div>
  );
}
