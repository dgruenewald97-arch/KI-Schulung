/* ============================================================
   MARKEN- UND KUNDENKONTEXT · Mobility Minds
   ------------------------------------------------------------
   Hier stehen nur wiederverwendbare, nicht-vertrauliche Leitplanken.
   Konkrete Kundennamen, Zahlen oder sensible Projektdetails gehören erst
   in Langdock in den finalen Prompt.
   ============================================================ */
export const BRAND = {
  name: "Mobility Minds",
  positioning: "Agentur rund um Mobilitäts- und Marketingthemen",
  voice: "nahbar, klar und optimistisch - konkret statt Buzzword-Bingo, lieber eine gute Idee zu viel als eine Floskel",
  dos: ["konkret und nahbar", "aktive Sprache", "ehrlich statt übertrieben"],
  donts: ["Buzzword-Bingo", "Superlative ohne Beleg", "Behördendeutsch"],
  clientFocus:
    "Wir arbeiten für Kund:innen aus Mobilität, Marketing, Kommunikation und serviceorientierten Angeboten. Gute Ergebnisse müssen zur Marke des Kunden, zur Zielgruppe und zum konkreten Kanal passen.",
};

export function buildPromptContext(role) {
  return [
    `Agentur: ${BRAND.name} - ${BRAND.positioning}.`,
    `Unser Stil: ${BRAND.voice}.`,
    `Arbeitsrolle: ${role.ctx}`,
    "",
    "Kunde/Projekt:",
    "[Kundenname oder Projekt hier eintragen]",
    "[Branche/Angebot: z.B. Mobilität, Fahrrad-Leasing, ÖPNV, Autohaus, E-Commerce, B2B-Service]",
    "[Zielgruppe: wer soll reagieren, verstehen oder überzeugt werden?]",
    "[Kundenziel: z.B. informieren, verkaufen, Vertrauen stärken, Rückfragen reduzieren]",
    "[Kunden-Ton: eher sachlich, mutig, premium, nahbar, technisch, lokal?]",
    "",
    "Wichtig:",
    "- Keine vertraulichen Daten in private KI-Tools.",
    "- Annahmen markieren, wenn Kundendetails fehlen.",
    "- Ergebnis immer auf Fakten, Ton, Marke und Kundentauglichkeit prüfen.",
  ].join("\n");
}
