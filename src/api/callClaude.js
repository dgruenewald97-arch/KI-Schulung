/* ------------------------------------------------------------------
   BACKEND-ANBINDUNG (Station 4 / Werkstatt)
   ------------------------------------------------------------------
   Aktuell ein Stub: gibt einen Platzhalter zurück, damit die App
   ohne Backend läuft. Zum Live-Schalten hier einen Aufruf an euren
   Langdock-Endpoint oder einen kleinen Proxy einbauen, z. B.:

     const res = await fetch("/api/ask", {
       method: "POST",
       headers: { "Content-Type": "application/json" },
       body: JSON.stringify({ prompt }),
     });
     const data = await res.json();
     return data.answer;

   Den API-Key NIE im Frontend ablegen -> immer über einen Server-Proxy.
------------------------------------------------------------------ */
export async function callClaude(prompt) {
  await new Promise((r) => setTimeout(r, 700));
  return (
    "🔌 Demo-Modus: Hier erscheint später die echte KI-Antwort.\n\n" +
    "Sobald der Langdock-Endpoint in callClaude() angebunden ist, " +
    "läuft dein Prompt wirklich durch die KI.\n\n" +
    "Dein Prompt war übrigens " +
    prompt.trim().split(/\s+/).length +
    " Wörter lang – schon ein guter, strukturierter Start."
  );
}
