import React, { useState } from "react";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { ROLES } from "./data/roles.js";
import Intro from "./components/Intro.jsx";
import Basics from "./components/Basics.jsx";
import Myths from "./components/Myths.jsx";
import Learn from "./components/Learn.jsx";
import Compass from "./components/Compass.jsx";
import RoleSelect from "./components/RoleSelect.jsx";
import Duel from "./components/Duel.jsx";
import Workshop from "./components/Workshop.jsx";
import Quiz from "./components/Quiz.jsx";
import Finish from "./components/Finish.jsx";
import ModuleTwo from "./components/ModuleTwo.jsx";

/* ============================================================
   KI-Mitmach-Guide  ·  Mobility Minds
   Self-paced Onboarding fürs Team auf Basis snipKI Modul 1.

   Läuft komplett offline:  npm install && npm run dev
   - Station 3 (Prompt-Duell) nutzt vorbereitete, rollenspezifische
     Beispielantworten und braucht KEIN Backend -> Aha-Moment sofort.
   - Station 4 (Werkstatt) ruft callClaude() auf. Das ist aktuell
     ein Stub -> hier später Langdock / eigenen Proxy anbinden
     (siehe src/api/callClaude.js und README / CLAUDE.md).
   ============================================================ */
export default function App() {
  const [step, setStep] = useState(0);
  const [role, setRole] = useState(ROLES[0]);
  const [module, setModule] = useState("mod1");

  const sections = ["intro", "basics", "myths", "learn", "compass", "role", "duel", "workshop", "quiz", "finish"];
  const total = sections.length;
  const cur = sections[step];
  const go = (d) => setStep((s) => Math.min(total - 1, Math.max(0, s + d)));
  const chooseModule = (nextModule) => {
    setModule(nextModule);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="kg">
      <div className="topbar">
        <div className="topbar-in">
          <div className="logo"><span className="dot" /> KI-Mitmach-Guide</div>
          <div className="module-switch" aria-label="Modul wählen">
            <button className={module === "mod1" ? "on" : ""} onClick={() => chooseModule("mod1")}>Modul 1</button>
            <button className={module === "mod2" ? "on" : ""} onClick={() => chooseModule("mod2")}>Modul 2</button>
          </div>
          {module === "mod1" && <div className="steps">{step + 1} / {total}</div>}
        </div>
        {module === "mod1" && <div className="pbar"><div className="pfill" style={{ width: `${((step + 1) / total) * 100}%` }} /></div>}
      </div>

      <div className="wrap">
        {module === "mod2" && <ModuleTwo back={() => chooseModule("mod1")} />}

        {module === "mod1" && cur === "intro" && <Intro next={() => go(1)} />}
        {module === "mod1" && cur === "basics" && <Basics />}
        {module === "mod1" && cur === "myths" && <Myths />}
        {module === "mod1" && cur === "learn" && <Learn />}
        {module === "mod1" && cur === "compass" && <Compass />}
        {module === "mod1" && cur === "role" && <RoleSelect role={role} setRole={setRole} />}
        {module === "mod1" && cur === "duel" && <Duel key={role.id} role={role} />}
        {module === "mod1" && cur === "workshop" && <Workshop key={role.id} role={role} />}
        {module === "mod1" && cur === "quiz" && <Quiz />}
        {module === "mod1" && cur === "finish" && <Finish restart={() => setStep(0)} />}

        {module === "mod1" && cur !== "intro" && cur !== "finish" && (
          <div className="nav">
            <button className="btn btn-ghost" onClick={() => go(-1)}><ArrowLeft size={17} /> Zurück</button>
            <button className="btn btn-primary" onClick={() => go(1)}>Weiter <ArrowRight size={17} /></button>
          </div>
        )}
      </div>
    </div>
  );
}
