# KI-Mitmach-Guide · Mobility Minds

Statische KI-Schulung für Mobility Minds. Keine React-App, kein Vite, kein Build.
GitHub Pages kann die Dateien direkt ausliefern.

## Struktur

```text
index.html
assets/
  styles.css
  app.js
  favicon.svg
```

## Lokal öffnen

Die Schulung funktioniert direkt im Browser:

```text
index.html öffnen
```

Optional mit einem kleinen lokalen Server:

```bash
npx serve .
```

## Inhalte bearbeiten

Die meisten Inhalte liegen in `assets/app.js`:

- Rollen: `roles`
- Kundentypen: `clients`
- Grundlagen: `basics`
- Kompass: `compass`
- Prompt-Vorlagen: `methodTemplates`
- Quizfragen: `quiz`
- Werkstatt-Defaults: `workshopDefaults()`

Das Styling liegt in `assets/styles.css`.

## GitHub Pages

Der Workflow `.github/workflows/deploy.yml` lädt die statischen Dateien direkt hoch.
Es gibt keinen Build-Schritt und damit auch kein Vite-`base`-Problem.

Live-URL:

```text
https://dgruenewald97-arch.github.io/KI-Schulung/
```
