/* ------------------------------------------------------------------
   WERKSTATT-FEEDBACK (Station 4)
   ------------------------------------------------------------------
   Dieses Tool läuft BEWUSST komplett offline – es ist kein echtes
   KI-Modell angebunden und soll auch keins bekommen. Station 4 dient
   dem Üben: den Prompt aus Ziel · Kontext · Format · Ton zusammenbauen
   und ein Gefühl für gute Struktur entwickeln.

   Den fertigen Prompt nimmt man dann mit ins echte Tool (Langdock).
   Diese Funktion gibt deshalb nur eine kurze, lokale Rückmeldung zum
   gebauten Prompt zurück – keine generierte Antwort.
------------------------------------------------------------------ */
export async function callClaude(prompt) {
  await new Promise((r) => setTimeout(r, 500));
  const woerter = prompt.trim().split(/\s+/).length;
  const hatKontext = /#\s*Kontext[\s\S]*\S/.test(prompt) && !/…/.test(prompt.split(/#\s*Kontext/)[1] || "");
  return (
    "✅ Offline-Übung: Dein Prompt ist gebaut – die KI läuft hier bewusst nicht mit.\n\n" +
    `Länge: ${woerter} Wörter. ${hatKontext ? "Stark – du hast echten Kontext mitgegeben." : "Tipp: Je konkreter dein Kontext, desto besser das Ergebnis."}\n\n` +
    "So geht's weiter: Kopier dir den Prompt oben raus und probier ihn im echten Tool (Langdock) aus. " +
    "Dort entsteht die eigentliche Antwort – datenschutzkonform und mit deinen Daten."
  );
}
