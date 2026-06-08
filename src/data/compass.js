import { FileText, HelpCircle, Lightbulb, SearchCheck, ShieldCheck } from "lucide-react";

export const COMPASS = [
  {
    icon: FileText,
    need: "Ich brauche einen Entwurf",
    method: "Basis-Briefing",
    hint: "Ziel, Kontext, Material, Format und Ton angeben.",
  },
  {
    icon: HelpCircle,
    need: "Ich weiß nicht, wie ich anfangen soll",
    method: "Reverse Prompting",
    hint: "Die KI stellt Rückfragen und baut daraus den besseren Prompt.",
  },
  {
    icon: Lightbulb,
    need: "Ich brauche Ideen",
    method: "Brainstorming",
    hint: "Viele Optionen erzeugen, clustern und die besten bewerten.",
  },
  {
    icon: ShieldCheck,
    need: "Ich muss ein Ergebnis prüfen",
    method: "Kritischer Stakeholder",
    hint: "Aus Kund:innen-, PM-, Kreations- und Compliance-Sicht prüfen lassen.",
  },
  {
    icon: SearchCheck,
    need: "Ich brauche Fakten oder Quellen",
    method: "Quellencheck",
    hint: "Quellen verlangen, öffnen, Datum prüfen und gegenchecken.",
  },
];
