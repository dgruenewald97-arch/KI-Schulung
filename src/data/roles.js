/* ============================================================
   ROLLEN
   ------------------------------------------------------------
   Jede Rolle bringt mit:
   - label : Anzeigename im Rollen-Picker
   - ctx   : Kontext-Satz, der als Startwert in die Werkstatt,
             in die Methoden-Vorlagen und sichtbar in die "starken"
             Duell-Prompts einfliesst.
   Die passenden Duell-Szenarien je Rolle stehen in duels.js.
   ============================================================ */
export const ROLES = [
  {
    id: "beratung",
    label: "Beratung / Kundenkontakt",
    ctx: "Ich arbeite in der Kundenberatung einer Agentur und bin viel im direkten Austausch mit Kunden – per Mail, Telefon und im Termin.",
  },
  {
    id: "kreation",
    label: "Kreation / Content",
    ctx: "Ich arbeite im Kreations- und Content-Team einer Agentur und texte & gestalte für Kampagnen.",
  },
  {
    id: "pm",
    label: "Projektmanagement",
    ctx: "Ich bin Projektmanager:in in einer Agentur und koordiniere Teams, Timings und Kunden.",
  },
  {
    id: "social",
    label: "Social Media / Marketing",
    ctx: "Ich arbeite im Social-Media- und Marketing-Team einer Agentur und bespiele Kanäle wie LinkedIn und Instagram.",
  },
  {
    id: "analyse",
    label: "Analyse / Daten",
    ctx: "Ich arbeite mit Daten, Tracking und Reportings in einer Agentur und bereite Zahlen für Kunden & Team auf.",
  },
  {
    id: "andere",
    label: "Etwas anderes",
    ctx: "Ich arbeite in einer Agentur und habe viel mit interner Organisation, Abstimmung und Kommunikation zu tun.",
  },
];
