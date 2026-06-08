/* Station 8 · Mini-Quiz */
export const QUIZ = [
  {
    q: "Welche Methode passt, wenn die Aufgabe noch unscharf ist?",
    opts: [
      "Reverse Prompting",
      "Direkt finalen Text verlangen",
      "Quellencheck",
    ],
    correct: 0,
    ex: "Reverse Prompting hilft bei der leeren Seite: Die KI klärt mit dir Ziel, Kontext, Format und Grenzen, bevor sie den eigentlichen Prompt formuliert.",
  },
  {
    q: "Wie nutzt du KI sinnvoll fürs Brainstorming?",
    opts: [
      "Eine einzige Idee verlangen und direkt übernehmen",
      "Viele Optionen erzeugen lassen, clustern und die besten kritisch bewerten",
      "Ohne Kontext möglichst zufällige Ideen sammeln",
    ],
    correct: 1,
    ex: "Brainstorming wird besser, wenn KI mehrere Richtungen entwickelt, sie sortiert und nach Wirkung, Aufwand und Risiko bewertet.",
  },
  {
    q: "Wofür nutzt du die KI als kritischen Stakeholder?",
    opts: [
      "Um einen Entwurf aus verschiedenen Perspektiven auf Risiken und Verbesserungen zu prüfen",
      "Um interne Regeln zu umgehen",
      "Um Kund:innen automatisch final zu ersetzen",
    ],
    correct: 0,
    ex: "Perspektiven wie Kund:in, PM, Kreation, Compliance oder Geschäftsführung machen blinde Flecken sichtbar.",
  },
  {
    q: "Wo bearbeitest du echte Aufgaben mit Kundendaten oder Projektkontext?",
    opts: [
      "In einem privaten ChatGPT-/KI-Account",
      "In irgendeinem frei gewählten KI-Tool",
      "In Langdock",
    ],
    correct: 2,
    ex: "Langdock ist euer Arbeitstool für KI-Aufgaben im Job. Private oder frei gewählte KI-Tools nutzt ihr dafür nicht.",
  },
  {
    q: "Was machst du, wenn ein KI-Output Fakten oder Quellen enthält?",
    opts: [
      "Quelle anzeigen lassen, öffnen, Datum prüfen und gegenchecken",
      "Direkt übernehmen, wenn die Formulierung sicher klingt",
      "Nur fragen, ob die KI sich sicher ist",
    ],
    correct: 0,
    ex: "KI kann Quellen falsch darstellen oder Inhalte erfinden. Öffnen, Datum prüfen und mit einer zweiten Quelle gegenchecken.",
  },
  {
    q: "Was ist eine gute Folgefrage, wenn ein Output fast passt?",
    opts: [
      "Mach irgendwas anderes",
      "Mach es konkreter für diese Zielgruppe und kürze es um 30 %",
      "Vergiss alles und starte neu",
    ],
    correct: 1,
    ex: "Gute Folgefragen geben konkretes Feedback: Zielgruppe, Ton, Länge, Struktur oder fehlende Annahmen.",
  },
];
