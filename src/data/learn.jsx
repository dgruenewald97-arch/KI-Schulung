import React from "react";
import { FileQuestion, MessageSquareText, ShieldCheck, SearchCheck, RefreshCw, UserCheck } from "lucide-react";

/* Station 4 · Sicher und wirksam nutzen */
export const LEARN = [
  {
    ico: <FileQuestion size={20} />,
    h: "Wähle die richtige Aufgabe",
    p: "KI lohnt sich besonders für Entwürfe, Zusammenfassungen, Struktur, Ideen und Vorbereitung. Für Freigaben, Strategie und sensible Aussagen bleibt dein Urteil zentral.",
  },
  {
    ico: <MessageSquareText size={20} />,
    h: "Briefing statt Zauberspruch",
    p: "Ein guter Prompt ist ein guter Arbeitsauftrag: Ziel, relevanter Kontext, gewünschtes Format, Tonalität und klare Grenzen.",
  },
  {
    ico: <ShieldCheck size={20} />,
    h: "Langdock ist der Arbeitsort",
    p: "Für echte Aufgaben, Kundendaten und Projektkontext nutzt ihr Langdock. Private KI-Tools oder persönliche Accounts gehören nicht in den Arbeitsprozess.",
  },
  {
    ico: <SearchCheck size={20} />,
    h: "Output gegenchecken",
    p: "KI kann plausible Fehler machen. Prüfe Fakten, Quellen, Zahlen, Tonalität, Bias und ob das Ergebnis wirklich zum Kunden oder Projekt passt.",
  },
  {
    ico: <RefreshCw size={20} />,
    h: "Iterieren ist normal",
    p: "Die erste Antwort ist oft nur der Start. Gib Feedback, schärfe den Kontext, verlange Alternativen oder bitte um eine bessere Struktur.",
  },
  {
    ico: <UserCheck size={20} />,
    h: "Du bleibst verantwortlich",
    p: "KI liefert Vorschläge. Du entscheidest, was genutzt, angepasst, verworfen oder freigegeben wird.",
  },
];
