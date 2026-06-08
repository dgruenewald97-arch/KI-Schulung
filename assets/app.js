const brand = {
  name: "Mobility Minds",
  positioning: "Agentur für Mobilitäts- und Marketingthemen",
  voice: "nahbar, klar und optimistisch; konkret statt Buzzword-Bingo; lieber eine gute Idee zu viel als eine Floskel",
};

const roles = [
  { id: "beratung", label: "Beratung / Kundenkontakt", ctx: "Ich arbeite in Beratung und Kundenkontakt. Ich muss klar, verbindlich und beziehungsstark kommunizieren." },
  { id: "kreation", label: "Kreation / Content", ctx: "Ich arbeite in Kreation und Content. Ich brauche Ideen, Tonalität, Varianten und markengerechte Texte." },
  { id: "pm", label: "Projektmanagement", ctx: "Ich arbeite im Projektmanagement. Ich brauche Struktur, klare nächste Schritte, Timings und Verantwortlichkeiten." },
  { id: "social", label: "Social Media / Marketing", ctx: "Ich arbeite mit Social Media und Marketing. Ich brauche kanalpassende Inhalte, Hooks, Redaktionsideen und saubere CTA." },
  { id: "analyse", label: "Analyse / Reporting", ctx: "Ich arbeite mit Daten und Reporting. Ich brauche verständliche Einordnungen, Hypothesen und Empfehlungen ohne Scheingenauigkeit." },
  { id: "orga", label: "Organisation / Intern", ctx: "Ich arbeite an interner Organisation und Kommunikation. Ich brauche klare, freundliche und wiederverwendbare Informationen." },
];

const clients = [
  {
    id: "leasing",
    label: "Fahrrad-Leasing",
    ctx: "Kunde: Anbieter für Fahrrad-Leasing über Arbeitgeber. Zielgruppe: Berufstätige Pendler:innen. Ziel: verständlich erklären, Hürde senken, Lust auf Dienstrad machen. Ton: leicht, praktisch, positiv, nicht belehrend.",
  },
  {
    id: "oepnv",
    label: "ÖPNV / Stadtmobilität",
    ctx: "Kunde: Mobilitätsanbieter im öffentlichen Nahverkehr. Zielgruppe: Stadtbewohner:innen, Pendler:innen, Gelegenheitsnutzer:innen. Ziel: Nutzung erleichtern, Vertrauen stärken, Vorteile konkret machen. Ton: zugänglich, serviceorientiert, lokal.",
  },
  {
    id: "autohaus",
    label: "Autohaus / Service",
    ctx: "Kunde: Autohaus oder Mobilitätsservice. Zielgruppe: Privat- und Gewerbekund:innen. Ziel: Beratung, Service-Termine, Angebote und Vertrauen stärken. Ton: zuverlässig, persönlich, klar, ohne Verkaufsdruck.",
  },
  {
    id: "ecommerce",
    label: "E-Commerce / Performance",
    ctx: "Kunde: E-Commerce- oder Performance-Projekt. Zielgruppe: kaufbereite Nutzer:innen und Marketing-Verantwortliche. Ziel: Conversion, Verständlichkeit und Entscheidungsfreude steigern. Ton: präzise, nutzenorientiert, messbar.",
  },
  {
    id: "b2b",
    label: "B2B-Service",
    ctx: "Kunde: B2B-Service oder erklärungsbedürftiges Angebot. Zielgruppe: Entscheider:innen, Fachabteilungen, Einkauf. Ziel: Komplexität reduzieren, Nutzen belegen, nächsten Schritt erleichtern. Ton: souverän, konkret, fachlich klar.",
  },
];

const basics = [
  { title: "Was KI gut kann", items: ["Entwürfe und Varianten erzeugen", "Rohmaterial strukturieren", "Perspektiven simulieren", "Routinekommunikation beschleunigen"] },
  { title: "Was KI nicht garantiert", items: ["Wahrheit und Quellen", "Kundentauglichkeit", "Markenpassung ohne Briefing", "Verantwortung oder Freigabe"] },
  { title: "Was immer in den Prompt gehört", items: ["Ziel", "Kunde und Zielgruppe", "Material", "Format", "Ton, Grenzen und Prüfauftrag"] },
  { title: "Was geschützt bleibt", items: ["Vertrauliche Daten", "Kundennamen, falls nicht nötig", "interne Zahlen", "personenbezogene Daten"] },
];

const compass = [
  { need: "Ich weiß genau, was rauskommen soll.", method: "Basis-Briefing", hint: "Ziel, Kontext, Material, Format und Ton sauber angeben." },
  { need: "Die Aufgabe ist noch unscharf.", method: "Reverse Prompting", hint: "KI zuerst Rückfragen stellen lassen, dann finalen Prompt bauen." },
  { need: "Ich brauche Ideen oder Richtungen.", method: "Brainstorming", hint: "Viele Optionen erzeugen, clustern und nach Wirkung/Aufwand/Risiko bewerten." },
  { need: "Ein Entwurf muss besser werden.", method: "Kritische Prüfung", hint: "Aus Kundensicht, Zielgruppe, Marke, Kanal, Risiko und Umsetzbarkeit prüfen lassen." },
];

const methodTemplates = [
  {
    id: "briefing",
    label: "Basis-Briefing",
    title: "Wenn du das Ergebnis schon kennst",
    intro: "Der Standard für kundentaugliche KI-Arbeit: ein Mini-Briefing statt nur eine Aufgabe.",
    prompt: (ctx) => `Ich möchte eine Kundenaufgabe mit KI vorbereiten.

# Ziel
[Was soll am Ende für den Kunden oder das Team entstehen?]

# Agentur- und Kundenkontext
${ctx}

# Material
[Kundenbriefing, Rohtext, Stichpunkte, Zahlen, Entwurf oder Beispiel einfügen]

# Format
[z.B. Mail, Landingpage-Intro, LinkedIn-Post, Agenda, Tabelle, 5 Varianten]

# Ton & Richtlinien
- Ton muss zur Kundenmarke passen.
- Keine neuen Fakten erfinden.
- Annahmen klar markieren.
- Wenn Kundendetails fehlen, zuerst Rückfragen stellen.
- Ergebnis am Ende kurz auf Kundentauglichkeit prüfen.`,
  },
  {
    id: "reverse",
    label: "Reverse Prompting",
    title: "Wenn du noch nicht weißt, wie du briefen sollst",
    intro: "Die KI baut mit dir erst den Auftrag, bevor sie ein Ergebnis erzeugt.",
    prompt: (ctx) => `Hilf mir, aus einer groben Kundenaufgabe einen präzisen Prompt zu bauen.

# Agentur- und Kundenkontext
${ctx}

# Grobe Aufgabe
[In 1-2 Sätzen beschreiben, was du machen willst]

Bitte stelle zuerst maximal 5 Rückfragen zu:
1. Kundenziel
2. Zielgruppe
3. Kanal / Format
4. Tonalität / No-Gos
5. vorhandenem Material

Wenn ich geantwortet habe, erstelle:
1. einen fertigen Prompt,
2. eine kurze Begründung der Prompt-Struktur,
3. eine Prüfliste für Fakten, Marke, Ton, Datenschutz und Kundentauglichkeit.`,
  },
  {
    id: "brainstorming",
    label: "Brainstorming",
    title: "Wenn du gute Optionen brauchst",
    intro: "Für Kampagnen, Headlines, Content-Ideen und Lösungsrichtungen.",
    prompt: (ctx) => `Entwickle Ideen für eine Kundenaufgabe.

# Agentur- und Kundenkontext
${ctx}

# Aufgabe / Thema
[Worum geht es? Für welchen Kunden, welches Projekt, welchen Kanal?]

Arbeite so:
1. Stelle bis zu 3 Rückfragen, falls wichtige Details fehlen.
2. Entwickle 10 unterschiedliche Ideen.
3. Cluster die Ideen nach Richtung oder Nutzen.
4. Bewerte die Top 3 nach Wirkung, Aufwand, Risiko und Markenpassung.
5. Erkläre kurz, warum diese Ideen zur Zielgruppe passen.

Wichtig:
Keine generischen Standardideen. Jede Idee muss sichtbar zum Kunden, zur Zielgruppe und zum Kanal passen.`,
  },
  {
    id: "review",
    label: "Kritische Prüfung",
    title: "Wenn ein Entwurf kundentauglich werden soll",
    intro: "Für Texte, Kampagnen, Präsentationen, Entscheidungen und Freigaben.",
    prompt: (ctx) => `Prüfe den folgenden Entwurf kritisch.

# Agentur- und Kundenkontext
${ctx}

# Entwurf
[Text, Idee, Agenda, Kampagne oder Entscheidung einfügen]

Bewerte aus diesen Perspektiven:
1. Kund:in / Zielgruppe
2. Kundenmarke / Tonalität
3. Mobility-Minds-Team / Umsetzbarkeit
4. Kanal / Format
5. Risiken: Fakten, Datenschutz, Budget, Freigabe

Format:
Tabelle mit Spalten: Perspektive | Stark | Risiko/Unklarheit | konkrete Verbesserung.

Wichtig:
Nicht nur loben. Annahmen markieren. Keine Fakten erfinden. Am Ende die 3 wichtigsten Änderungen nennen.`,
  },
];

const quiz = [
  {
    q: "Was macht einen Prompt für Kundenarbeit besser?",
    opts: ["Mehr Wörter", "Konkreter Kundenkontext, Zielgruppe, Material und Format", "Ein besonders kreativer Einstieg"],
    correct: 1,
    ex: "Nicht Länge entscheidet, sondern ob die KI weiß, für wen, wofür, in welchem Ton und mit welchem Material sie arbeitet.",
  },
  {
    q: "Was tun, wenn Kundendetails fehlen?",
    opts: ["Die KI soll plausible Details ergänzen", "Erst Rückfragen stellen lassen", "Den Prompt komplett löschen"],
    correct: 1,
    ex: "Fehlende Details sind kein Problem, solange sie als Rückfrage oder Annahme sichtbar bleiben.",
  },
  {
    q: "Wo gehören vertrauliche Kundendaten hin?",
    opts: ["In private KI-Tools, wenn es schneller ist", "Gar nicht in externe private Tools; im Job Langdock nutzen", "In jeden Prompt, damit er besser wird"],
    correct: 1,
    ex: "Schnelligkeit schlägt nicht Datenschutz. Für echte Aufgaben im Job ist Langdock der vorgesehene Ort.",
  },
  {
    q: "Was ist ein guter Prüfauftrag?",
    opts: ["Mach es schöner", "Prüfe Fakten, Ton, Zielgruppe, Kanal, Annahmen und Kundentauglichkeit", "Schreibe zehn Emojis dazu"],
    correct: 1,
    ex: "Ein Prüfauftrag muss sagen, worauf geprüft werden soll. Sonst bekommst du meist nur oberflächliche Verbesserung.",
  },
];

const screens = ["start", "basics", "compass", "context", "duel", "methods", "quiz", "workshop", "finish"];
const names = ["Start", "Grundlagen", "Kompass", "Kontext", "Vergleich", "Vorlagen", "Quiz", "Werkstatt", "Abschluss"];
let step = 0;
let selectedRole = roles[0];
let selectedClient = clients[0];
let selectedMethod = methodTemplates[0];
let quizAnswers = {};

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => Array.from(document.querySelectorAll(selector));

function buildContext() {
  return [
    `Agentur: ${brand.name} - ${brand.positioning}.`,
    `Mobility-Minds-Stil: ${brand.voice}.`,
    `Arbeitsrolle: ${selectedRole.ctx}`,
    selectedClient.ctx,
    "Wichtig: Keine vertraulichen Daten in private KI-Tools. Fehlende Kundendetails als Rückfrage oder Annahme markieren. Ergebnis auf Fakten, Ton, Marke, Kanal und Kundentauglichkeit prüfen.",
  ].join("\n");
}

function duelPrompt() {
  const ctx = buildContext();
  return {
    title: `Beispiel: ${selectedClient.label}`,
    scenario: "Aus einer echten Kundenaufgabe soll ein Ergebnis entstehen, das nicht generisch klingt und direkt weiterverwendbar ist.",
    bad: "Schreib mir einen guten Text für den Kunden.",
    good: `# Ziel
Erstelle einen konkreten, kundentauglichen Entwurf für die nächste Kommunikationsaufgabe.

# Agentur- und Kundenkontext
${ctx}

# Material
[Hier Kundenbriefing, Rohtext, Angebot, Kampagnenidee oder Stichpunkte einfügen]

# Format
Erstelle 3 Varianten:
1. sachlich-klar
2. nahbar-aktivierend
3. mutiger Vorschlag
Je Variante: Headline + kurzer Text + CTA.

# Ton & Richtlinien
Zur Kundenmarke passend, konkret, ohne Buzzwords. Keine Fakten erfinden. Annahmen markieren. Am Ende kurz sagen, welche Variante für Zielgruppe und Kanal am stärksten ist.`,
  };
}

function workshopDefaults() {
  return {
    goal: "Erstelle einen kundentauglichen Entwurf für eine konkrete Kommunikationsaufgabe.",
    context: buildContext(),
    material: "",
    format: "Headline + kurzer Text + klare Handlungsaufforderung. Zusätzlich 2 alternative Varianten.",
    tone: "Passend zur Kundenmarke, nahbar und konkret. Keine Floskeln, keine neuen Fakten erfinden. Annahmen markieren und Ergebnis auf Kundentauglichkeit prüfen.",
  };
}

function renderBasics() {
  $("#basicsGrid").innerHTML = basics.map((group) => `
    <article class="card">
      <h3>${group.title}</h3>
      <ul class="list-clean">${group.items.map((item) => `<li>${item}</li>`).join("")}</ul>
    </article>
  `).join("");
}

function renderCompass() {
  $("#compassGrid").innerHTML = compass.map((item) => `
    <article class="compass-item">
      <b>${item.method}</b>
      <h3>${item.need}</h3>
      <p class="muted">${item.hint}</p>
    </article>
  `).join("");
}

function renderContext() {
  $("#roleChips").innerHTML = roles.map((role) => `<button class="chip ${role.id === selectedRole.id ? "active" : ""}" data-role="${role.id}">${role.label}</button>`).join("");
  $("#clientChips").innerHTML = clients.map((client) => `<button class="chip ${client.id === selectedClient.id ? "active" : ""}" data-client="${client.id}">${client.label}</button>`).join("");
  $("#contextPreview").textContent = buildContext();
}

function renderDuel() {
  const duel = duelPrompt();
  $("#duelTitle").textContent = duel.title;
  $("#duelScenario").textContent = duel.scenario;
  $("#badPrompt").textContent = duel.bad;
  $("#goodPrompt").textContent = duel.good;
}

function renderMethods() {
  $("#methodTabs").innerHTML = methodTemplates.map((method) => `<button class="tab-btn ${method.id === selectedMethod.id ? "active" : ""}" data-method="${method.id}">${method.label}</button>`).join("");
  $("#methodTitle").textContent = selectedMethod.title;
  $("#methodIntro").textContent = selectedMethod.intro;
  $("#methodPrompt").textContent = selectedMethod.prompt(buildContext());
}

function renderQuiz() {
  $("#quizWrap").innerHTML = quiz.map((item, qi) => {
    const answered = quizAnswers[qi];
    return `
      <article class="card quiz-question">
        <h3>${qi + 1}. ${item.q}</h3>
        ${item.opts.map((opt, oi) => {
          let cls = "option";
          if (answered != null && oi === item.correct) cls += " correct";
          else if (answered === oi) cls += " wrong";
          return `<button class="${cls}" data-q="${qi}" data-o="${oi}" ${answered != null ? "disabled" : ""}>${opt}</button>`;
        }).join("")}
        ${answered != null ? `<div class="explain">${item.ex}</div>` : ""}
      </article>
    `;
  }).join("");
  const answeredCount = Object.keys(quizAnswers).length;
  const score = quiz.reduce((sum, item, i) => sum + (quizAnswers[i] === item.correct ? 1 : 0), 0);
  $("#quizResult").classList.toggle("hidden", answeredCount !== quiz.length);
  $("#quizResult").innerHTML = answeredCount === quiz.length ? `<h3>${score} / ${quiz.length}</h3><p class="muted">${score >= 3 ? "Gute Basis. Wichtig ist: immer mit Kundenkontext arbeiten." : "Schau dir die Hinweise nochmal an. Der wichtigste Punkt ist der konkrete Kundenkontext."}</p>` : "";
}

function assembledPrompt() {
  return `# Ziel
${$("#fieldGoal").value.trim() || "..."}

# Kontext
${$("#fieldContext").value.trim() || "..."}

# Material
${$("#fieldMaterial").value.trim() || "..."}

# Format
${$("#fieldFormat").value.trim() || "..."}

# Ton & Richtlinien
${$("#fieldTone").value.trim() || "..."}`;
}

function renderWorkshop(reset = false) {
  if (reset || !$("#fieldContext").value) {
    const defaults = workshopDefaults();
    $("#fieldGoal").value = defaults.goal;
    $("#fieldContext").value = defaults.context;
    $("#fieldMaterial").value = defaults.material;
    $("#fieldFormat").value = defaults.format;
    $("#fieldTone").value = defaults.tone;
  }
  updatePrompt();
}

function updatePrompt() {
  $("#assembledPrompt").textContent = assembledPrompt();
  const checks = [
    ["Ziel ausgefüllt", $("#fieldGoal").value.trim().length > 8],
    ["Kundenkontext enthalten", /Kunde|Zielgruppe|Kund/i.test($("#fieldContext").value)],
    ["Material ergänzt", $("#fieldMaterial").value.trim().length > 12],
    ["Format konkret", $("#fieldFormat").value.trim().length > 8],
    ["Ton und Grenzen klar", /kein|nicht|Annahmen|Fakten|Ton|Marke/i.test($("#fieldTone").value)],
  ];
  $("#promptCheck").innerHTML = checks.map(([label, ok]) => `<div class="${ok ? "ok" : "warn"}">${ok ? "✓" : "!"} ${label}</div>`).join("");
}

function renderCheatSheet() {
  $("#cheatSheet").textContent = `PROMPT-SPICKZETTEL · ${brand.name}

1. Ziel
Was soll konkret entstehen? Für wen? Wofür?

2. Kundenkontext
Kunde, Branche, Zielgruppe, Kundenziel, Kanal, Tonalität.

3. Material
Briefing, Rohtext, Stichpunkte, Zahlen, Entwurf, Beispiele.

4. Format
Länge, Struktur, Varianten, Tabelle, CTA, Prüfliste.

5. Ton & Grenzen
Kundenmarke beachten. Keine Fakten erfinden. Annahmen markieren. Keine vertraulichen Daten in private KI-Tools.

6. Prüfung
Fakten? Zielgruppe? Ton? Kanal? Kundentauglichkeit? Datenschutz?`;
}

function render() {
  $$(".screen").forEach((screen) => screen.classList.toggle("active", screen.dataset.screen === screens[step]));
  $("#sectionName").textContent = names[step];
  $("#stepCount").textContent = `${step + 1} / ${screens.length}`;
  $("#progressFill").style.width = `${((step + 1) / screens.length) * 100}%`;
  $("#prevBtn").disabled = step === 0;
  $("#nextBtn").textContent = step === screens.length - 1 ? "Zum Start" : `Weiter zu ${names[step + 1]}`;

  renderContext();
  renderDuel();
  renderMethods();
  renderQuiz();
  if (screens[step] === "workshop") renderWorkshop(false);
  renderCheatSheet();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

document.addEventListener("click", async (event) => {
  const roleBtn = event.target.closest("[data-role]");
  const clientBtn = event.target.closest("[data-client]");
  const methodBtn = event.target.closest("[data-method]");
  const optionBtn = event.target.closest("[data-q]");
  const copyBtn = event.target.closest("[data-copy-target]");

  if (roleBtn) {
    selectedRole = roles.find((role) => role.id === roleBtn.dataset.role) || roles[0];
    renderWorkshop(true);
    render();
  }
  if (clientBtn) {
    selectedClient = clients.find((client) => client.id === clientBtn.dataset.client) || clients[0];
    renderWorkshop(true);
    render();
  }
  if (methodBtn) {
    selectedMethod = methodTemplates.find((method) => method.id === methodBtn.dataset.method) || methodTemplates[0];
    renderMethods();
  }
  if (optionBtn) {
    const qi = Number(optionBtn.dataset.q);
    const oi = Number(optionBtn.dataset.o);
    if (quizAnswers[qi] == null) quizAnswers[qi] = oi;
    renderQuiz();
  }
  if (copyBtn) {
    const target = document.getElementById(copyBtn.dataset.copyTarget);
    try {
      await navigator.clipboard.writeText(target.textContent);
      const old = copyBtn.textContent;
      copyBtn.textContent = "Kopiert";
      setTimeout(() => { copyBtn.textContent = old; }, 1400);
    } catch {
      copyBtn.textContent = "Bitte manuell markieren";
    }
  }
});

$("#prevBtn").addEventListener("click", () => {
  step = Math.max(0, step - 1);
  render();
});

$("#nextBtn").addEventListener("click", () => {
  step = step === screens.length - 1 ? 0 : step + 1;
  render();
});

["fieldGoal", "fieldContext", "fieldMaterial", "fieldFormat", "fieldTone"].forEach((id) => {
  document.addEventListener("input", (event) => {
    if (event.target.id === id) updatePrompt();
  });
});

renderBasics();
renderCompass();
renderWorkshop(true);
render();
