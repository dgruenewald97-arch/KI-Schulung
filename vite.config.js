# KI-Mitmach-Guide · Mobility Minds

Ein self-paced, interaktives Web-Tool, das die Inhalte aus dem snipKI
KI-Führerschein (Modul 1) fürs ganze Team aufbereitet – jede:r wählt die
eigene Rolle, die Beispiele passen sich an.

## Schnellstart

Voraussetzung: Node.js 18+ (https://nodejs.org, LTS-Version).

```bash
npm install
npm run dev
```

Dann die angezeigte Adresse öffnen (meist http://localhost:5173).

Build für später:

```bash
npm run build      # erzeugt /dist
npm run preview    # baut + zeigt die Produktionsversion lokal
```

## Was läuft schon, was kommt noch

- **Stationen 1, 2, 3, 5, 6** laufen komplett offline.
- **Station 3 (Prompt-Duell)** zeigt vorbereitete Beispielantworten –
  der Aha-Moment funktioniert ohne Backend.
- **Station 4 (Werkstatt)** ruft `callClaude()` in `src/App.jsx` auf.
  Das ist aktuell ein **Stub** (Platzhalter), damit alles ohne Server läuft.

## Live schalten (Werkstatt mit echter KI)

In `src/App.jsx` die Funktion `callClaude()` anpassen, sodass sie einen
**eigenen Backend-Endpoint / Langdock** aufruft. Den API-Key NIE im
Frontend ablegen – immer über einen kleinen Server-Proxy. Im Code steht
ein kommentiertes Beispiel an der Funktion.

## Inhaltlich erweitern

- Rollen: `ROLES` in `src/App.jsx`
- Mythen / Lernkarten / Quiz: `MYTHS`, `LEARN`, `QUIZ`
- Duell-Szenarien inkl. Beispielantworten: `DUELS`

## Nächste Schritte (für Claude Code)

Siehe `CLAUDE.md` – dort steht der Kontext und ein vorbereiteter Auftrag.
