# Projekt-Kontext für Claude Code

## Was das ist
Ein self-paced, interaktives Web-Tool fürs Agentur-Team (Mobility Minds),
das die Inhalte des snipKI KI-Führerscheins **Modul 1** vermittelt:
Grundlagen, Prompting, eigene Prompts bauen, Berührungsängste abbauen.

Stack: **Vite + React**. Sprache der Oberfläche: **informelles Deutsch**.

## Aufbau (6 Stationen)
1. Mythen-Check (Flip-Karten)
2. So tickt KI (3 Lernkarten)
3. Prompt-Duell (fauler vs. starker Prompt, mit Beispielantworten – läuft offline)
4. Prompt-Werkstatt (eigenen Prompt bauen → testen → von KI verbessern lassen)
5. Mini-Quiz
6. Abschluss + eigene Use Cases

## Projektstruktur
```
index.html              · Vite-Einstieg
vite.config.js          · Vite + React-Plugin
src/
  main.jsx              · React-Entry, lädt App + styles.css
  App.jsx               · Stepper/Navigation, verteilt auf die Stationen
  styles.css            · gesamtes UI (dunkel, snipKI-Grün)
  api/callClaude.js     · Backend-Stub für Station 4 (noch nicht live)
  data/
    roles.js            · ROLES (Rolle, Kontext, Werkstatt-Tipp)
    duels.js            · SCENARIOS – Duell-Szenarien JE ROLLE
    myths.js            · MYTHS (Station 1)
    learn.jsx           · LEARN (Station 2, mit Icons)
    quiz.js             · QUIZ (Station 5)
  components/           · Intro, Myths, Learn, Duel, Workshop, Quiz, Finish
```

## Rollen-Logik (wichtig)
Jede Rolle (Beratung, Kreation, PM, Social, Analyse, Sonstiges) hat in
`src/data/duels.js` **eigene, passende Szenarien** mit eigenen Beispiel-
Outputs – kein generisches Beispiel für alle. Der Rollen-Kontext (`ctx`
aus `roles.js`) wird in den „starken“ Prompt sichtbar eingebaut, damit
der Lerneffekt „Kontext gehört rein“ greift. Neue Szenarien immer unter
der passenden Rollen-ID in `SCENARIOS` ergänzen.

## Offene To-Dos (Priorität von oben)
1. **Werkstatt live schalten.** `callClaude()` in `src/api/callClaude.js`
   ist ein Stub. An einen eigenen Backend-Proxy / Langdock anbinden.
   API-Key NIE ins Frontend.
2. Optional: weitere Szenarien je Rolle ergänzen.
3. Optional: Hosting (statisches Deployment des `dist`-Ordners).

## Designprinzipien
- Dunkles UI, snipKI-Grün als Akzent, bewusst **kein** generisches
  „AI-Grau“.
- Datenschutz-Hinweise an Eingabestellen behalten (Botschaft aus Modul 1:
  keine vertraulichen Daten in private Tools, im Job Langdock nutzen).
- Umlaute als echtes UTF-8 (keine \uXXXX-Escapes).

## Quelle der Inhalte
Das Modul-1-Playbook (PDF) liefert die fachlichen Inhalte.
