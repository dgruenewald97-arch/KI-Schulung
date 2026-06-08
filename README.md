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

## Aufbau (Modul 1)

Der Guide führt in 11 Schritten durch Modul 1 (Reihenfolge in `App.jsx`):

1. Intro
2. KI im Arbeitsalltag (`Basics`)
3. Mythen-Check (`Myths`)
4. Sicher & wirksam nutzen (`Learn`)
5. KI-Kompass (`Compass`)
6. Rollenwahl (`RoleSelect`)
7. Prompt-Duell – fauler vs. starker Prompt je Rolle (`Duel`)
8. Richtig prompten – 4 Methoden (`Methods`)
9. Geführte Werkstatt (`Workshop`)
10. Mini-Quiz (`Quiz`)
11. Abschluss + eigene Use Cases (`Finish`)

Über den Modul-Switch in der Topbar gibt es zusätzlich einen
**Modul-2**-Platzhalter (`ModuleTwo`).

## Projektstruktur

```
src/
  main.jsx              Entry-Point (React + styles.css)
  App.jsx               Stepper-Navigation + Modul-Switch
  styles.css            gesamtes UI
  api/callClaude.js     Offline-Check für die Werkstatt (kein echtes KI-Modell)
  data/                 Inhalte: basics, myths, learn, compass, roles, duels, quiz
  components/           eine Komponente je Station
```

## Komplett offline – keine echte KI

Das Tool läuft **bewusst ohne KI-Anbindung** – alle Stationen funktionieren
ohne Backend:

- **Prompt-Duell (Station 7)** zeigt vorbereitete, **rollenspezifische**
  Beispielantworten – der Aha-Moment funktioniert ohne Backend.
- **Werkstatt (Station 9)** dient dem Üben: man baut den Prompt aus
  Ziel · Kontext · Material · Format · Ton zusammen und bekommt einen
  **Offline-Check**, der jeden Baustein einzeln prüft. Den fertigen Prompt
  kopiert man für **Langdock**. Es ist absichtlich **kein** KI-Modell
  angebunden.

## Auf GitHub Pages veröffentlichen

Bei jedem Push auf `main` **baut** der Workflow
`.github/workflows/deploy.yml` die App frisch (`npm ci && npm run build`)
und veröffentlicht `dist/`. Es werden keine Build-Artefakte ins Repo
committet.

Einmalig im Repo aktivieren: **Settings → Pages → Build and deployment →
Source: „GitHub Actions“**. Danach erscheint die Seite unter
`https://dgruenewald97-arch.github.io/KI-Schulung/`.

Hinweis: Der Pfad `/KI-Schulung/` ist in `vite.config.js` als `base`
hinterlegt. Heißt das Repo mal anders, dort anpassen.

## Inhaltlich erweitern

- Rollen: `ROLES` in `src/data/roles.js`
- Duell-Szenarien je Rolle: `SCENARIOS` in `src/data/duels.js`
- Mythen / Lernkarten / Kompass / Quiz: `src/data/myths.js`, `learn.jsx`,
  `compass.js`, `quiz.js`
- Methoden-Vorlagen: `METHODS` in `src/components/Methods.jsx`
- Werkstatt-Use-Cases: `USE_CASES` in `src/components/Workshop.jsx`

Jede Rolle hat **eigene** Duell-Szenarien – neue Beispiele einfach unter
der passenden Rollen-ID in `SCENARIOS` ergänzen.

## Kontext für Claude Code

Siehe `CLAUDE.md` – dort stehen Projektkontext, Struktur und offene To-Dos.
