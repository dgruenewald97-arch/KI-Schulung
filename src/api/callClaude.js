/* ------------------------------------------------------------------
   WERKSTATT-FEEDBACK (Station 9)
   ------------------------------------------------------------------
   Dieses Tool läuft bewusst komplett offline: Es ist kein echtes
   KI-Modell angebunden. Die Werkstatt übt nur, aus einer Aufgabe einen
   klaren Prompt mit Ziel, Kontext, Material, Format und Richtlinien zu bauen.

   Den fertigen Auftrag nimmt man dann mit ins Arbeitstool Langdock.
   Diese Funktion gibt nur eine lokale, strukturelle Rückmeldung zurück –
   sie prüft jeden Baustein EINZELN (keine generierte Antwort).
------------------------------------------------------------------ */

/* Zerlegt den zusammengebauten Prompt in seine "# Überschrift"-Abschnitte.
   Liefert eine Map { "ziel": "...", "kontext": "...", ... } mit getrimmtem
   Inhalt je Abschnitt – so kann jeder Baustein unabhängig geprüft werden. */
function parseSections(prompt) {
  const sections = {};
  for (const part of prompt.split(/^#\s+/m)) {
    if (!part.trim()) continue;
    const nl = part.indexOf("\n");
    const head = (nl === -1 ? part : part.slice(0, nl)).trim().toLowerCase();
    const body = (nl === -1 ? "" : part.slice(nl + 1)).trim();
    sections[head] = body;
  }
  return sections;
}

/* Ein Baustein gilt als ausgefüllt, wenn Inhalt da ist und es nicht der
   Platzhalter ist (die Platzhalter beginnen in der Werkstatt mit "..."). */
const isFilled = (body) => !!body && !body.startsWith("...");

export async function callClaude(prompt) {
  await new Promise((r) => setTimeout(r, 400));

  const s = parseSections(prompt);
  const bausteine = [
    { key: "ziel", name: "Ziel", body: s["ziel"], tipp: "Sag konkret, was am Ende rauskommen soll (Verb + Ergebnis), nicht nur das Thema." },
    { key: "kontext", name: "Kontext", body: s["kontext"], tipp: "Ergänze Rolle, Zielgruppe und Situation, damit das Ergebnis zu dir passt." },
    { key: "material", name: "Material", body: s["material"], tipp: "Füge Rohtext, Stichpunkte oder ein Beispiel ein – sonst rät die KI." },
    { key: "format", name: "Format", body: s["format"], tipp: "Gib Länge, Struktur oder Form an (z.B. „max. 120 Wörter, 3 Bullets“)." },
    { key: "ton & richtlinien", name: "Ton & Richtlinien", body: s["ton & richtlinien"], tipp: "Definiere Tonfall und Grenzen (z.B. „Sie-Ansprache, keine Fakten erfinden“)." },
  ];

  const gefuellt = bausteine.filter((b) => isFilled(b.body));
  const fehlend = bausteine.filter((b) => !isFilled(b.body));
  // Nur echten Inhalt zählen, nicht die Platzhalter der leeren Bausteine.
  const woerter = gefuellt.reduce((n, b) => n + b.body.split(/\s+/).filter(Boolean).length, 0);

  // Zeile je Baustein: ✓ wenn da, sonst konkreter Tipp – jeder unabhängig geprüft.
  const zeilen = bausteine.map((b) =>
    isFilled(b.body) ? `✓ ${b.name}: vorhanden` : `– ${b.name}: fehlt noch. ${b.tipp}`
  );

  // Leichte Qualitäts-Hinweise (rein strukturell, keine echte Bewertung).
  const extras = [];
  if (isFilled(s["ziel"]) && s["ziel"].split(/\s+/).filter(Boolean).length < 4) {
    extras.push("Dein Ziel ist sehr knapp – je konkreter, desto brauchbarer das Ergebnis.");
  }
  if (isFilled(s["format"]) && !/\d/.test(s["format"]) && !/(wort|wörter|satz|sätze|bullet|absatz|tabelle|zeile|punkt)/i.test(s["format"])) {
    extras.push("Beim Format hilft eine messbare Vorgabe (Länge, Anzahl, Struktur).");
  }

  const kopf = `Offline-Check (keine echte KI): ${gefuellt.length} von 5 Bausteinen ausgefüllt · ${woerter} Wörter.`;

  const fazit = fehlend.length === 0
    ? "Stark – alle Bausteine sind drin. Das ist ein sauberer Arbeitsauftrag."
    : fehlend.some((b) => b.key === "ziel")
      ? "Ohne Ziel fehlt das Herzstück – ergänze als Erstes, was rauskommen soll."
      : "Solide Basis. Die fehlenden Bausteine machen das Ergebnis deutlich präziser.";

  return [
    kopf,
    "",
    ...zeilen,
    ...(extras.length ? ["", ...extras.map((e) => `! ${e}`)] : []),
    "",
    fazit,
    "",
    "Weiter: Auftrag kopieren und in Langdock ausprobieren. Ergebnis danach fachlich, sprachlich und auf Kundentauglichkeit prüfen.",
  ].join("\n");
}
