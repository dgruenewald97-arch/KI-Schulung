/* ------------------------------------------------------------------
   WERKSTATT-FEEDBACK (Station 7)
   ------------------------------------------------------------------
   Dieses Tool läuft bewusst komplett offline: Es ist kein echtes
   KI-Modell angebunden. Die Werkstatt übt nur, aus einer Aufgabe einen
   klaren Prompt mit Ziel, Kontext, Material, Format und Richtlinien zu bauen.

   Den fertigen Auftrag nimmt man dann mit ins Arbeitstool Langdock.
   Diese Funktion gibt nur eine lokale Rückmeldung zur Struktur zurück.
------------------------------------------------------------------ */
export async function callClaude(prompt) {
  await new Promise((r) => setTimeout(r, 500));
  const woerter = prompt.trim().split(/\s+/).length;
  const hatKontext = /#\s*Kontext[\s\S]*\S/.test(prompt) && !/\.\.\./.test(prompt.split(/#\s*Kontext/)[1] || "");
  const hatMaterial = /#\s*Material[\s\S]*\S/.test(prompt) && !/\.\.\./.test(prompt.split(/#\s*Material/)[1] || "");
  const hatRichtlinien = /#\s*Ton & Richtlinien[\s\S]*\S/.test(prompt) && !/\.\.\./.test(prompt.split(/#\s*Ton & Richtlinien/)[1] || "");

  return (
    "Offline-Übung: Dein Prompt ist gebaut - hier läuft bewusst keine echte KI mit.\n\n" +
    `Länge: ${woerter} Wörter. ${hatKontext ? "Gut: Du hast Kontext mitgegeben." : "Tipp: Ergänze konkreteren Kontext, damit das Ergebnis besser passt."}\n` +
    `${hatMaterial ? "Gut: Du hast Material oder Stichpunkte ergänzt." : "Tipp: Ergänze Beispielmaterial, Rohtext oder Stichpunkte, damit die KI konkreter arbeiten kann."}\n` +
    `${hatRichtlinien ? "Gut: Du hast Ton oder Grenzen definiert." : "Tipp: Ergänze Ton, Do's & Don'ts oder Prüfhinweise."}\n\n` +
    "So geht es weiter: Kopiere den Auftrag und probiere ihn in Langdock aus. " +
    "Prüfe das Ergebnis danach fachlich, sprachlich und mit Blick auf Kundentauglichkeit."
  );
}
