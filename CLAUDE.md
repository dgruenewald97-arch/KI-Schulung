# Projekt-Kontext für Claude Code

## Was das ist
Ein self-paced, interaktives Web-Tool fürs Agentur-Team (Mobility Minds),
das die Inhalte des snipKI KI-Führerscheins **Modul 1** vermittelt:
Grundlagen, Prompting, eigene Prompts bauen, Berührungsängste abbauen.

Stack: **Vite + React**. Sprache der Oberfläche: **informelles Deutsch**.

## Aufbau (Modul 1 · 11 Schritte, Reihenfolge in `App.jsx`)
1. Intro (Start)
2. **Station 2** · KI im Arbeitsalltag (`Basics`)
3. **Station 3** · Mythen-Check (Flip-Karten, `Myths`)
4. **Station 4** · Sicher & wirksam nutzen (8 Lernkarten, `Learn`)
5. **Station 5** · KI-Kompass (welche Methode passt, `Compass`)
6. **Station 6** · Rollenwahl / Praxisbezug (`RoleSelect`)
7. **Station 7** · Prompt-Duell (fauler vs. starker Prompt, Beispielantworten JE ROLLE, Aufdeck-Interaktion, offline – `Duel`)
8. **Station 8** · Richtig prompten (4 Methoden: Basis-Briefing, Reverse Prompting, Brainstorming, Kritischer Stakeholder – `Methods`)
9. **Station 9** · Geführte Werkstatt (Prompt aus 5 Bausteinen bauen → Offline-Check → kopieren für Langdock – `Workshop`)
10. **Station 10** · Mini-Quiz (`Quiz`)
11. Abschluss + eigene Use Cases (`Finish`)

Daneben gibt es einen **Modul-2**-Platzhalter (`ModuleTwo`), umschaltbar
über den Modul-Switch in der Topbar.

> Hinweis: Die „Station X“-Nummern stehen hardcodiert im jeweiligen
> Komponenten-Eyebrow. Beim Umsortieren der `sections` in `App.jsx`
> die Nummern dort mitziehen.

## Projektstruktur
```
index.html              · Vite-Einstieg (lädt /src/main.jsx)
vite.config.js          · Vite + React-Plugin, base "/KI-Schulung/" beim Build
src/
  main.jsx              · React-Entry, lädt App + styles.css
  App.jsx               · Stepper/Navigation + Modul-Switch, verteilt auf die Stationen
  styles.css            · gesamtes UI (dunkel, snipKI-Grün)
  api/callClaude.js     · Offline-Check für Station 9 (bewusst KEINE echte KI)
  data/
    basics.js           · BASICS (Station 2)
    myths.js            · MYTHS (Station 3)
    learn.jsx           · LEARN (Station 4, mit Icons)
    compass.js          · COMPASS (Station 5)
    roles.js            · ROLES (Rolle + Kontext-Satz `ctx`)
    duels.js            · SCENARIOS – Duell-Szenarien JE ROLLE (Station 7)
    quiz.js             · QUIZ (Station 10)
  components/           · Intro, Basics, Myths, Learn, Compass, RoleSelect,
                          Duel, Methods, Workshop, Quiz, Finish, ModuleTwo
```

## Rollen-Logik (wichtig)
Jede Rolle (Beratung, Kreation, PM, Social, Analyse, Sonstiges) hat in
`src/data/duels.js` **eigene, passende Szenarien** mit eigenen Beispiel-
Outputs – kein generisches Beispiel für alle. Der Rollen-Kontext (`ctx`
aus `roles.js`) wird in den „starken“ Prompt sichtbar eingebaut, damit
der Lerneffekt „Kontext gehört rein“ greift. Neue Szenarien immer unter
der passenden Rollen-ID in `SCENARIOS` ergänzen.

Der Rollen-`ctx` fließt außerdem in die Methoden-Vorlagen (Station 8,
`Methods`) und als Start-Kontext in die Werkstatt (Station 9) ein.
`Duel`, `Methods` und `Workshop` werden in `App.jsx` mit `key={role.id}`
gerendert, damit ein Rollenwechsel ihren lokalen State sauber zurücksetzt.

## Bewusste Entscheidung: keine echte KI im Tool
Die Werkstatt (Station 9) läuft absichtlich **komplett offline**. Es wird
**kein** KI-Modell angebunden. Sie dient dem Üben (Prompt aus
Ziel · Kontext · Material · Format · Ton bauen); den fertigen Prompt
nimmt man dann mit ins echte Tool (Langdock). `src/api/callClaude.js`
parst den gebauten Prompt in seine Bausteine und gibt eine rein
**strukturelle** Rückmeldung je Baustein zurück (ausgefüllt? Tipp?) –
keine generierte Antwort. Jeder Baustein wird unabhängig geprüft.

## Deployment
GitHub Pages über `.github/workflows/deploy.yml` bei jedem Push auf `main`.
Der Workflow **baut die App frisch** (`npm ci && npm run build`) und
deployt `dist/` – es werden **keine** Build-Artefakte mehr ins Repo
committet (`/assets/` und `dist/` sind in `.gitignore`). `vite.config.js`
setzt beim Build `base: "/KI-Schulung/"` (Repo-Name) – beim Umbenennen
des Repos hier anpassen.

## Offene To-Dos (optional)
1. Weitere Szenarien je Rolle ergänzen (in `SCENARIOS`).
2. Inhalte aus späteren Modulen einbauen.

## Designprinzipien
- Dunkles UI, snipKI-Grün als Akzent, bewusst **kein** generisches
  „AI-Grau“.
- Datenschutz-Hinweise an Eingabestellen behalten (Botschaft aus Modul 1:
  keine vertraulichen Daten in private Tools, im Job Langdock nutzen).
- Umlaute als echtes UTF-8 (keine \uXXXX-Escapes).

## Quelle der Inhalte
Das Modul-1-Playbook (PDF) liefert die fachlichen Inhalte.
