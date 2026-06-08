import React from "react";
import { Lightbulb, Brain, Zap } from "lucide-react";

/* Station 2 · So tickt KI (3 Lernkarten) */
export const LEARN = [
  {
    ico: <Lightbulb size={20} />,
    h: "Kontext ist König",
    p: "Die KI kennt weder dich noch eure Kunden. Je mehr relevanten Kontext du gibst (deine Rolle, dein Ziel, das Format), desto präziser die Antwort. „Shit in, shit out.“",
  },
  {
    ico: <Brain size={20} />,
    h: "KI schätzt, sie weiß nicht",
    p: "Beeindruckend, aber fehleranfällig. Du bleibst der „Human in the Loop“: Du prüfst, wählst aus und entscheidest. Die KI liefert den Entwurf, nicht die Wahrheit.",
  },
  {
    ico: <Zap size={20} />,
    h: "Das richtige Modell",
    p: "„Schnelle Antwort“ für Alltag, kurze Texte & schnelle Tasks. „Think Deeper / Smart“ für komplexe Analysen und mehrstufige Aufgaben – das Modell denkt dann länger nach.",
  },
];
