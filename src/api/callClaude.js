/* ------------------------------------------------------------------
   WERKSTATT-FEEDBACK (Station 9)
   ------------------------------------------------------------------
   Dieses Tool läuft bewusst komplett offline: Es ist kein echtes
   KI-Modell angebunden. Die Werkstatt übt nur, aus einer Aufgabe einen
   klaren Prompt mit Ziel, Kontext, Material, Format und Richtlinien zu bauen.

   Den fertigen Auftrag nimmt man dann mit ins Arbeitstool Langdock.
   Diese Funktion gibt nur eine lokale Rückmeldung zurück (keine generierte
   Antwort). Sie prüft jeden Baustein EINZELN auf zwei Ebenen:
   - Vollständigkeit: ist der Baustein überhaupt ausgefüllt?
   - Schärfe (Heuristik): wirkt er konkret genug? (z.B. vages Ziel,
     knapper Kontext, Format ohne messbare Vorgabe, Ton ohne Grenze)
   Bewusst KEINE echte inhaltliche Bewertung – die passiert in Langdock.
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

  // Schärfe-Heuristik: prüft ausgefüllte Bausteine auf typische Schwächen.
  // Deterministisch und bewusst konservativ (lieber kein Hinweis als ein
  // falscher) – keine echte inhaltliche Bewertung.
  const ziel = s["ziel"] || "";
  const kontext = s["kontext"] || "";
  const format = s["format"] || "";
  const ton = s["ton & richtlinien"] || "";
  const woerterIn = (t) => t.split(/\s+/).filter(Boolean).length;

  const extras = [];
  if (isFilled(ziel)) {
    const vage = ziel.match(/\b(irgendwas|etwas|so|halt|mal eben|schön|schöner|besser)\b/i);
    if (woerterIn(ziel) < 4) {
      extras.push("Ziel ist sehr knapp – nenne Verb + konkretes Ergebnis (z.B. „erstelle eine 5-Punkte-Agenda“).");
    } else if (vage) {
      extras.push(`Ziel wirkt unscharf („${vage[0]}“) – sag genauer, was am Ende rauskommen soll.`);
    }
  }
  if (isFilled(kontext) && woerterIn(kontext) < 8) {
    extras.push("Kontext ist knapp – ergänze Zielgruppe, Kunde/Projekt und worum es konkret geht.");
  }
  if (isFilled(format) && !/\d/.test(format) && !/(wort|wörter|satz|sätze|bullet|absatz|tabelle|zeile|punkt|liste|spalte)/i.test(format)) {
    extras.push("Format hat keine messbare Vorgabe – nenne Länge, Anzahl oder Struktur.");
  }
  if (isFilled(ton) && !/(kein|nicht|vermeide|grenz|maximal|\bnur\b|annahme|markier|kennzeichn)/i.test(ton)) {
    extras.push("Ton & Richtlinien nennen noch keine Grenze – ergänze ein klares Don't (z.B. „keine Fakten erfinden“).");
  }

  const kopf = `Offline-Check (keine echte KI): ${gefuellt.length} von 5 Bausteinen ausgefüllt · ${woerter} Wörter Inhalt.`;

  const fazit = fehlend.length > 0
    ? (fehlend.some((b) => b.key === "ziel")
        ? "Ohne Ziel fehlt das Herzstück – ergänze als Erstes, was rauskommen soll."
        : "Solide Basis. Die fehlenden Bausteine machen das Ergebnis deutlich präziser.")
    : extras.length > 0
      ? "Vollständig – aber an den markierten Stellen kannst du noch schärfer werden."
      : "Stark – vollständig und konkret. Das ist ein sauberer Arbeitsauftrag.";

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
