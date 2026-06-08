# KI-Mitmach-Guide · Mobility Minds

Ein interaktives Web-Tool für eine kurze KI-Grundlagenschulung im Team.
Der Guide läuft komplett offline und hilft dabei, aus einer echten Kundenaufgabe einen brauchbaren Prompt für Langdock zu bauen.

## Schnellstart

Voraussetzung: Node.js 18+.

```bash
npm install
npm run dev
```

Dann die angezeigte Adresse öffnen, meist `http://localhost:5173`.

Für die Produktionsversion:

```bash
npm run build
npm run preview
```

## Ablauf

Der Guide besteht aus 8 Schritten:

1. Start
2. Grundlagen: Was KI im Arbeitsalltag leisten kann
3. Kompass: Welche Methode passt zur Aufgabe?
4. Rolle wählen: Beispiele an den eigenen Arbeitsbereich anpassen
5. Prompt-Vergleich: schwacher Prompt vs. guter Prompt mit Agentur- und Kundenkontext
6. Methoden: Briefing, Reverse Prompting, Brainstorming, kritische Prüfung
7. Werkstatt: eigenen Kundenprompt bauen und offline prüfen
8. Abschluss: Spickzettel und eigene Use Cases

## Projektstruktur

```text
src/
  main.jsx              React-Einstieg
  App.jsx               8-Schritte-Navigation
  styles.css            UI-Styling
  api/callClaude.js     lokaler Offline-Check, kein echtes KI-Modell
  data/                 Inhalte: basics, compass, roles, duels, brand
  components/           eine Komponente je sichtbarem Schritt
```

## Keine echte KI-Anbindung

Das Tool ist bewusst offline:

- Der Prompt-Vergleich nutzt vorbereitete Beispielantworten.
- Die Werkstatt prüft nur lokal, ob Ziel, Kundenkontext, Material, Format und Ton ausgefüllt sind.
- Den fertigen Prompt kopiert man anschließend in Langdock.

## GitHub Pages

Bei jedem Push auf `main` baut `.github/workflows/deploy.yml` die App und veröffentlicht `dist/` über GitHub Pages.

Einmalig aktivieren:
`Settings -> Pages -> Build and deployment -> Source: GitHub Actions`

Die Seite liegt dann unter:
`https://dgruenewald97-arch.github.io/KI-Schulung/`

Der Pfad `/KI-Schulung/` ist in `vite.config.js` als `base` hinterlegt.

## Inhalte erweitern

- Rollen: `ROLES` in `src/data/roles.js`
- Prompt-Vergleich je Rolle: `SCENARIOS` in `src/data/duels.js`
- Kompass: `src/data/compass.js`
- Agentur- und Kundenkontext: `buildPromptContext` in `src/data/brand.js`
- Methoden-Vorlagen: `METHODS` in `src/components/Methods.jsx`
- Werkstatt-Use-Cases: `USE_CASES` in `src/components/Workshop.jsx`
