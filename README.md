# KI-Mitmach-Guide · Mobility Minds

Ein self-paced, interaktives Web-Tool, das die Inhalte aus dem snipKI
KI-Führerschein (Modul 1) fürs ganze Team aufbereitet – jede:r wählt die
eigene Rolle, und die Beispiele in den Stationen passen sich an.

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

## Projektstruktur

```
src/
  main.jsx              Entry-Point (React + styles.css)
  App.jsx               Navigation über die 6 Stationen
  styles.css            gesamtes UI
  api/callClaude.js     Backend-Stub für Station 4
  data/                 Inhalte: roles, duels, myths, learn, quiz
  components/           eine Komponente je Station
```

## Komplett offline – keine echte KI

Das Tool läuft **bewusst ohne KI-Anbindung**:

- **Stationen 1–3, 5, 6** laufen komplett offline.
- **Station 3 (Prompt-Duell)** zeigt vorbereitete, **rollenspezifische**
  Beispielantworten – der Aha-Moment funktioniert ohne Backend.
- **Station 4 (Werkstatt)** dient dem Üben: man baut den Prompt aus
  Ziel · Kontext · Format · Ton zusammen, bekommt einen kurzen
  **Offline-Check** und kopiert den fertigen Prompt für **Langdock**.
  Es ist absichtlich **kein** KI-Modell angebunden.

## Auf GitHub Pages veröffentlichen

Das passiert automatisch: Bei jedem Push auf `main` baut der Workflow
`.github/workflows/deploy.yml` die App und veröffentlicht sie.

Einmalig im Repo aktivieren: **Settings → Pages → Build and deployment →
Source: „GitHub Actions“**. Danach erscheint die Seite unter
`https://dgruenewald97-arch.github.io/KI-Schulung/`.

Hinweis: Der Pfad `/KI-Schulung/` ist in `vite.config.js` als `base`
hinterlegt. Heißt das Repo mal anders, dort anpassen.

## Inhaltlich erweitern

- Rollen: `ROLES` in `src/data/roles.js`
- Duell-Szenarien je Rolle: `SCENARIOS` in `src/data/duels.js`
- Mythen / Lernkarten / Quiz: `src/data/myths.js`, `learn.jsx`, `quiz.js`

Jede Rolle hat **eigene** Duell-Szenarien – neue Beispiele einfach unter
der passenden Rollen-ID in `SCENARIOS` ergänzen.

## Kontext für Claude Code

Siehe `CLAUDE.md` – dort stehen Projektkontext, Struktur und offene To-Dos.
