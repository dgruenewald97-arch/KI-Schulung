/* ============================================================
   ROLLEN
   ------------------------------------------------------------
   Jede Rolle bringt mit:
   - label   : Anzeigename im Rollen-Picker
   - ctx      : Kontext-Satz, der in die Werkstatt als Startwert
                und in die Prompts der eigenen Szenarien einfliesst
   - zielTipp : ein konkreter Beispiel-Vorschlag fuers Ziel-Feld
                der Werkstatt (Station 4) – damit niemand vor dem
                leeren Feld sitzt
   Die passenden Duell-Szenarien je Rolle stehen in duels.js.
   ============================================================ */
export const ROLES = [
  {
    id: "beratung",
    label: "Beratung / Kundenkontakt",
    ctx: "Ich arbeite in der Kundenberatung einer Agentur und bin viel im direkten Austausch mit Kunden – per Mail, Telefon und im Termin.",
    zielTipp: "z.B. Eine freundliche Antwort auf eine kritische Kundenrückmeldung formulieren",
  },
  {
    id: "kreation",
    label: "Kreation / Content",
    ctx: "Ich arbeite im Kreations- und Content-Team einer Agentur und texte & gestalte für Kampagnen.",
    zielTipp: "z.B. 8 Headline-Varianten für eine Kampagne entwickeln",
  },
  {
    id: "pm",
    label: "Projektmanagement",
    ctx: "Ich bin Projektmanager:in in einer Agentur und koordiniere Teams, Timings und Kunden.",
    zielTipp: "z.B. Aus Meeting-Notizen ein sauberes Protokoll mit To-Dos machen",
  },
  {
    id: "social",
    label: "Social Media / Marketing",
    ctx: "Ich arbeite im Social-Media- und Marketing-Team einer Agentur und bespiele Kanäle wie LinkedIn und Instagram.",
    zielTipp: "z.B. Aus einer Kernbotschaft einen LinkedIn-Post mit Hook & CTA bauen",
  },
  {
    id: "analyse",
    label: "Analyse / Daten",
    ctx: "Ich arbeite mit Daten, Tracking und Reportings in einer Agentur und bereite Zahlen für Kunden & Team auf.",
    zielTipp: "z.B. Aus nackten Reporting-Zahlen eine verständliche Management-Summary machen",
  },
  {
    id: "andere",
    label: "Etwas anderes",
    ctx: "Ich arbeite in einer Agentur und habe viel mit interner Organisation, Abstimmung und Kommunikation zu tun.",
    zielTipp: "z.B. Eine trockene interne Info-Mail freundlicher und klarer umformulieren",
  },
];
