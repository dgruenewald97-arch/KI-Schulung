/* ============================================================
   PROMPT-DUELL · Szenarien je Rolle  (Station 3)
   ------------------------------------------------------------
   Läuft komplett offline mit vorbereiteten Beispielantworten –
   so funktioniert der Aha-Moment ohne Backend.

   Aufbau:
   SCENARIOS = { <rollen-id>: [ szenario, szenario ] }

   Jedes Szenario:
   - id        : eindeutig innerhalb der Rolle
   - label     : Text auf dem Auswahl-Chip
   - scenario  : die Ausgangslage ("So sieht dein Alltag aus")
   - bad       : der faule Prompt
   - good(ctx) : der starke Prompt – baut den Rollen-Kontext (ctx)
                 sichtbar mit ein (Lerneffekt: Kontext gehört rein)
   - badOut    : typisches schwaches Ergebnis
   - goodOut   : das deutlich bessere Ergebnis

   Jede Rolle hat ihre EIGENEN Szenarien, damit sich wirklich
   jede:r abgeholt fühlt – nicht ein generisches Beispiel für alle.
   ============================================================ */
export const SCENARIOS = {
  /* ---------------------------------------------------------- */
  beratung: [
    {
      id: "termin",
      label: "Termin verschieben",
      scenario:
        "Szenario: Du musst einem geschätzten Kunden einen bereits vereinbarten Termin kurzfristig verschieben – ohne dass die Beziehung leidet.",
      bad: "Schreib eine E-Mail wegen der Terminverschiebung.",
      good: (ctx) =>
`# Ziel
Formuliere eine freundliche, professionelle E-Mail, die einen vereinbarten Termin verschiebt, kurz um Verständnis bittet und zwei konkrete Ersatztermine vorschlägt.

# Kontext
${ctx} Es geht um einen geschätzten Kunden – die Beziehung ist gut und soll es bleiben.

# Format
Max. 120 Wörter, mit Betreffzeile, klarer Struktur, eine konkrete Handlungsaufforderung am Ende.

# Ton & Richtlinien
Verbindlich und wertschätzend, kein Floskel-Deutsch, Sie-Ansprache.`,
      badOut:
`Sehr geehrte Damen und Herren,

leider müssen wir den Termin verschieben. Bitte teilen Sie uns mit, wann es Ihnen passt.

Mit freundlichen Grüßen`,
      goodOut:
`Betreff: Terminverschiebung – kurz Ihre Wahl?

Sehr geehrte Frau Berg,

leider muss ich unseren Termin am Donnerstag kurzfristig verschieben und bitte das vielmals zu entschuldigen. Mir ist wichtig, dass wir zeitnah weitermachen – daher zwei Vorschläge:

• Montag, 14:00 Uhr
• Dienstag, 10:30 Uhr

Sagen Sie mir gern, was besser passt, dann bestätige ich sofort.

Beste Grüße`,
    },
    {
      id: "feedback",
      label: "Kritik beantworten",
      scenario:
        "Szenario: Ein Kunde ist mit dem ersten Entwurf unzufrieden und schreibt eine gereizte Mail. Du willst deeskalieren, ohne dich kleinzumachen.",
      bad: "Antworte dem Kunden, dass uns das leid tut und wir es ändern.",
      good: (ctx) =>
`# Ziel
Formuliere eine ruhige, lösungsorientierte Antwort auf eine kritische Kundenrückmeldung: Verständnis zeigen, das Anliegen ernst nehmen, einen konkreten nächsten Schritt anbieten.

# Kontext
${ctx} Der Kunde ist mit dem ersten Entwurf unzufrieden und etwas gereizt. Die Zusammenarbeit soll weitergehen – wir wollen weder beschwichtigen noch uns rechtfertigen.

# Format
Kurze Mail, max. 130 Wörter: 1 Satz Verständnis, 1–2 Sätze Einordnung, ein klarer Vorschlag (z.B. kurzes Call-Angebot), freundlicher Abschluss.

# Ton & Richtlinien
Souverän, partnerschaftlich, lösungsorientiert. Keine Schuldzuweisung, keine leeren Entschuldigungsfloskeln, Sie-Ansprache.`,
      badOut:
`Sehr geehrter Herr Klein,

das tut uns sehr leid. Wir ändern das selbstverständlich und melden uns.

Mit freundlichen Grüßen`,
      goodOut:
`Betreff: Ihr Feedback zum Entwurf – lassen Sie uns kurz draufschauen

Sehr geehrter Herr Klein,

danke, dass Sie so klar sagen, was noch nicht passt – genau das hilft uns weiter. Ich verstehe, dass der Entwurf den Markenton noch nicht trifft.

Damit wir nicht aneinander vorbei arbeiten, würde ich die zwei, drei Knackpunkte gern kurz mit Ihnen durchgehen: Passt ein 15-Minuten-Call morgen Vormittag? Danach liefere ich eine überarbeitete Fassung.

Beste Grüße`,
    },
  ],

  /* ---------------------------------------------------------- */
  kreation: [
    {
      id: "headlines",
      label: "Headlines entwickeln",
      scenario:
        "Szenario: Für eine Kampagne eines regionalen Fahrrad-Leasing-Anbieters brauchst du schnell mehrere Headline-Richtungen zum Aussortieren.",
      bad: "Gib mir ein paar Headlines für eine Fahrrad-Leasing-Kampagne.",
      good: (ctx) =>
`# Ziel
Entwickle 8 Headline-Varianten für eine Kampagne zum Thema Fahrrad-Leasing über den Arbeitgeber.

# Kontext
${ctx} Zielgruppe sind Berufstätige 30–50, die pendeln. Markenton ist nahbar, optimistisch, leicht augenzwinkernd – kein Behörden-Deutsch.

# Format
Nummerierte Liste. Mische drei Richtungen: (a) Nutzen/Ersparnis, (b) Lebensgefühl/Freiheit, (c) augenzwinkernd. Pro Headline max. 8 Wörter, dahinter in Klammern die Richtung.

# Richtlinien
Keine abgegriffenen Wortspiele ("In die Pedale!"), keine Ausrufezeichen-Flut. Deutsch.`,
      badOut:
`- Jetzt Fahrrad leasen!
- Spare Geld mit dem Dienstrad
- Radfahren ist gesund
- Steig um aufs Bike!
- Dein neues Fahrrad wartet`,
      goodOut:
`1. Dein Arbeitsweg, jetzt mit Rückenwind. (Lebensgefühl)
2. Bis zu 40 % sparen – auf zwei Rädern. (Nutzen)
3. Das Auto kann auch mal stehen bleiben. (augenzwinkernd)
4. Pendeln, das sich wie Freizeit anfühlt. (Lebensgefühl)
5. Ein Rad. Über die Firma. Clever finanziert. (Nutzen)
6. Stau? Kennen wir nur vom Hörensagen. (augenzwinkernd)
7. Mehr Bewegung, weniger Tankquittungen. (Nutzen)
8. Morgens ankommen, schon wach. (Lebensgefühl)`,
    },
    {
      id: "landingtext",
      label: "Einstiegstext schreiben",
      scenario:
        "Szenario: Die Landingpage zur Kampagne braucht einen kurzen Einstiegstext, der erklärt und Lust macht – nicht nur Stichworte.",
      bad: "Schreib einen Text für die Landingpage zum Fahrrad-Leasing.",
      good: (ctx) =>
`# Ziel
Schreibe den Einstiegstext (Intro) für die Landingpage zur Fahrrad-Leasing-Kampagne: erklärt in wenigen Sätzen, was das Angebot bringt, und führt zum Button.

# Kontext
${ctx} Zielgruppe sind pendelnde Berufstätige. Das Leasing läuft über den Arbeitgeber, die Rate wird vom Brutto abgezogen. Markenton: nahbar, optimistisch, klar.

# Format
Eine Überschrift (max. 7 Wörter) + 2 kurze Absätze (zusammen max. 80 Wörter) + ein knackiger Button-Text.

# Ton & Richtlinien
Du-Ansprache, konkret und greifbar. Kein Marketing-Blabla, keine Superlative ("das beste Angebot aller Zeiten").`,
      badOut:
`Fahrrad-Leasing

Mit unserem Fahrrad-Leasing können Sie ein Fahrrad leasen. Es ist günstig und gut für die Umwelt. Jetzt informieren und profitieren Sie von vielen Vorteilen.

Mehr erfahren`,
      goodOut:
`Dein Rad. Übers Büro. Clever bezahlt.

Such dir dein Wunschrad aus – die Rate läuft bequem über deinen Arbeitgeber und direkt vom Brutto. Heißt: spürbar günstiger als der Kauf auf einen Schlag.

Und nebenbei? Entspannter pendeln, mehr Bewegung, weniger Tankstellenbesuche.

Wunschrad finden`,
    },
  ],

  /* ---------------------------------------------------------- */
  pm: [
    {
      id: "protokoll",
      label: "Notizen zu Protokoll",
      scenario:
        "Szenario: Diese chaotischen Meeting-Notizen sollen ein verwertbares Protokoll werden:\n„Call mit Kunde, neue LP bis KW so 20?, Maria macht Texte, Design fehlt noch, Budget ok aber nochmal bestätigen, Tracking-Frage offen.“",
      bad: "Fass das zusammen: Call mit Kunde, neue LP bis KW so 20?, Maria macht Texte, Design fehlt noch, Budget ok aber nochmal bestätigen, Tracking-Frage offen.",
      good: (ctx) =>
`# Ziel
Erstelle aus diesen Roh-Notizen eine saubere, weiterleitbare Zusammenfassung:
„Call mit Kunde, neue LP bis KW so 20?, Maria macht Texte, Design fehlt noch, Budget ok aber nochmal bestätigen, Tracking-Frage offen.“

# Kontext
${ctx} Die Zusammenfassung geht ans Team und soll sofort handlungsfähig machen.

# Format
Drei Blöcke: (1) Kurz-Summary in 2 Sätzen, (2) To-Dos mit „Wer macht was“, (3) Offene Fragen.

# Richtlinien
Nur was in den Notizen steht, nichts erfinden. Unklares als offene Frage markieren.`,
      badOut:
`Es gab einen Call mit dem Kunden. Eine neue Landingpage soll bis KW 20 entstehen. Maria macht die Texte, das Design fehlt noch und das Budget ist ok. Die Tracking-Frage ist offen.`,
      goodOut:
`Kurz-Summary
Im Kundencall ging es um eine neue Landingpage, Zieltermin grob KW 20. Texte sind verteilt, Design und ein paar Freigaben sind noch offen.

To-Dos
• Maria: Texte für die Landingpage
• Design: noch offen – Verantwortliche:n festlegen
• Budget: vorhanden, muss aber nochmal bestätigt werden

Offene Fragen
• Ist KW 20 ein fixer oder grober Termin?
• Tracking-Frage: was genau ist hier zu klären?`,
    },
    {
      id: "statusupdate",
      label: "Statusupdate an Kunde",
      scenario:
        "Szenario: Der Kunde will wissen, wie das Projekt steht. Du hast nur lose Stichpunkte und willst daraus ein klares, vertrauensbildendes Update machen.",
      bad: "Schreib ein Statusupdate für den Kunden, Projekt läuft gut.",
      good: (ctx) =>
`# Ziel
Formuliere ein kompaktes Status-Update an den Kunden auf Basis dieser Stichpunkte: Konzept abgenommen, Design zu 80 % fertig, Texte in Freigabe, Launch weiterhin Ende des Monats geplant, eine offene Abhängigkeit (Bildmaterial vom Kunden fehlt noch).

# Kontext
${ctx} Der Kunde ist gut informiert, will aber Verlässlichkeit spüren und klar wissen, was von ihm gebraucht wird.

# Format
Kurze Mail: 1 Satz Gesamtstand (Ampel grün/gelb), dann 3–4 Bullet-Punkte zu den Arbeitspaketen, dann ein klar markierter Punkt „Wir brauchen von Ihnen“. Max. 140 Wörter.

# Ton & Richtlinien
Sachlich, verbindlich, transparent. Probleme nicht verstecken, aber lösungsorientiert formulieren. Sie-Ansprache.`,
      badOut:
`Sehr geehrte Frau Sommer,

das Projekt läuft gut und wir liegen im Zeitplan. Wir melden uns, wenn es Neuigkeiten gibt.

Mit freundlichen Grüßen`,
      goodOut:
`Betreff: Statusupdate Projekt Website – alles auf Kurs

Sehr geehrte Frau Sommer,

kurzes Update: Wir liegen im Plan, Launch weiterhin Ende des Monats. 🟢

• Konzept: von Ihnen abgenommen ✓
• Design: zu rund 80 % fertig, Feinschliff läuft
• Texte: aktuell bei Ihnen in Freigabe
• Technik: vorbereitet, wartet auf finale Inhalte

Wir brauchen von Ihnen:
das angekündigte Bildmaterial bis spätestens Freitag – sonst wird der Launch-Termin eng.

Bei Fragen jederzeit gern.

Beste Grüße`,
    },
  ],

  /* ---------------------------------------------------------- */
  social: [
    {
      id: "linkedin",
      label: "LinkedIn-Post bauen",
      scenario:
        "Szenario: Aus einer Kernbotschaft („Unser Kunde hat seine Ladezeit halbiert und damit 18 % mehr Conversions“) soll ein LinkedIn-Post werden, der gelesen wird.",
      bad: "Schreib einen LinkedIn-Post darüber, dass ein Kunde mehr Conversions hat.",
      good: (ctx) =>
`# Ziel
Schreibe einen LinkedIn-Post aus dieser Kernbotschaft: Ein Kunde hat die Ladezeit seiner Website halbiert und dadurch 18 % mehr Conversions erzielt.

# Kontext
${ctx} Wir wollen Kompetenz zeigen, ohne anzugeben. Zielgruppe: Marketing- und E-Commerce-Verantwortliche.

# Format
Starker Hook in Zeile 1 (max. 1 Satz, kein Clickbait), dann 3–4 kurze Absätze mit Luft dazwischen, am Ende eine offene Frage als CTA. 3–4 passende Hashtags. Insgesamt unter 130 Wörtern.

# Ton & Richtlinien
Persönlich, klar, kein Buzzword-Bingo. Keine Emoji-Flut (max. 2). Keine konkreten Kundennamen – anonymisiert.`,
      badOut:
`Wir freuen uns, einen tollen Erfolg mit einem unserer Kunden zu teilen! 🚀🎉 Durch unsere Arbeit konnten wir die Conversions um 18 % steigern. Das zeigt, wie wichtig gutes Marketing ist! #marketing #success #agency #conversion #digital`,
      goodOut:
`Eine halbe Sekunde hat 18 % mehr Umsatz gebracht.

Klingt übertrieben, war aber genau so: Bei einem Kunden im E-Commerce war die Website schlicht zu langsam. Jede Verzögerung kostet Geduld – und Geduld kostet Käufe.

Wir haben die Ladezeit halbiert. Mehr nicht. Das Ergebnis: 18 % mehr Conversions, ohne einen Cent mehr Werbebudget.

Performance ist selten das Spannendste auf der To-do-Liste. Aber oft das Günstigste mit dem grössten Hebel.

Wie schnell lädt eure wichtigste Seite – habt ihr das zuletzt gemessen?

#Ecommerce #WebPerformance #ConversionOptimierung`,
    },
    {
      id: "ideen",
      label: "Content-Ideen finden",
      scenario:
        "Szenario: Der Redaktionsplan für den Firmen-Account ist leer und dir fällt gerade nichts ein. Du brauchst Ideen mit Substanz, keine Lückenfüller.",
      bad: "Gib mir Ideen für Social-Media-Posts.",
      good: (ctx) =>
`# Ziel
Schlag mir 6 Content-Ideen für die nächsten zwei Wochen auf LinkedIn vor – mit echtem Mehrwert für die Zielgruppe.

# Kontext
${ctx} Der Account gehört einer Agentur. Zielgruppe: Marketing-Entscheider:innen in mittelständischen Unternehmen. Wir wollen als hilfreich und kompetent wahrgenommen werden, nicht als Selbstdarsteller.

# Format
Nummerierte Liste. Pro Idee: ein Aufhänger-Titel + ein Satz, worum es geht + das passende Format (z.B. Karussell, kurzer Text, Umfrage).

# Richtlinien
Mische lehrreich, Behind-the-Scenes und meinungsstark. Keine reinen Werbe-Posts, keine generischen „5 Tipps für mehr Reichweite“-Klischees.`,
      badOut:
`1. Ein Post über unsere Dienstleistungen
2. Ein Motivations-Zitat am Montag
3. 5 Tipps für mehr Reichweite
4. Ein Foto vom Team
5. Frohe Feiertage wünschen
6. Ein Post über Trends`,
      goodOut:
`1. „Der teuerste Fehler im Website-Relaunch“ – ein konkreter Fehler, den wir oft sehen, und wie man ihn vermeidet. Format: kurzer Text mit klarer Pointe.
2. „So entsteht eine Kampagne bei uns“ – der Weg von Briefing bis Go-live in 5 Schritten. Format: Karussell.
3. „Branded oder generisch?“ – zwei Werbetexte gegenübergestellt, die Community rät. Format: Umfrage.
4. Meinungsstück: „Warum mehr Reichweite selten euer eigentliches Problem ist.“ Format: Textpost.
5. Behind-the-Scenes: ein Tag in der Kreation, ehrlich inkl. Sackgassen. Format: kurzer Text + Foto.
6. „Frag die Agentur“ – wir sammeln Fragen der Community und beantworten die häufigste. Format: Umfrage → Folgepost.`,
    },
  ],

  /* ---------------------------------------------------------- */
  analyse: [
    {
      id: "summary",
      label: "Zahlen verständlich machen",
      scenario:
        "Szenario: Du hast nackte Reporting-Zahlen und musst sie für eine Kundin aufbereiten, die keine Analystin ist – sie will wissen, was das für ihr Geschäft heißt.",
      bad: "Fass diese Kampagnen-Zahlen zusammen: 142.000 Impressions, CTR 1,8 %, 2.560 Klicks, 73 Conversions, CPA 41 €.",
      good: (ctx) =>
`# Ziel
Übersetze diese Kampagnen-Zahlen in eine verständliche Management-Summary für eine Kundin ohne Analyse-Hintergrund:
142.000 Impressions, CTR 1,8 %, 2.560 Klicks, 73 Conversions, CPA 41 €. Vormonat: CPA 58 €.

# Kontext
${ctx} Die Kundin will keine Fachbegriffe-Schlacht, sondern wissen: Läuft es gut? Was heißt das fürs Geschäft? Was empfehlen wir?

# Format
Drei kurze Blöcke: (1) Fazit in einem Satz, (2) die wichtigsten 2–3 Zahlen in Klartext übersetzt, (3) eine konkrete Empfehlung.

# Ton & Richtlinien
Klar und nicht-technisch. Fachbegriffe nur, wenn sofort erklärt. Keine erfundenen Zahlen – nur interpretieren, was dasteht.`,
      badOut:
`Die Kampagne hatte 142.000 Impressions bei einer CTR von 1,8 %, was zu 2.560 Klicks führte. Daraus ergaben sich 73 Conversions bei einem CPA von 41 €, gegenüber 58 € im Vormonat.`,
      goodOut:
`Fazit
Die Kampagne läuft spürbar effizienter als im Vormonat – jede Neukundin kostet uns jetzt deutlich weniger.

Was die Zahlen heißen
• 142.000 Mal wurde Ihre Anzeige gesehen, gut 2.560 Menschen haben geklickt.
• Davon haben 73 tatsächlich gekauft/angefragt (Conversions).
• Kosten pro Abschluss: 41 € – im Vormonat waren es noch 58 €. Das sind rund 29 % günstiger.

Empfehlung
Da die Kosten pro Abschluss sinken, lohnt es sich, das Budget hier behutsam zu erhöhen und zu beobachten, ob die Effizienz hält.`,
    },
    {
      id: "auffaelligkeit",
      label: "Auffälligkeiten einordnen",
      scenario:
        "Szenario: In den Wochendaten ist etwas seltsam – die Absprungrate auf einer Seite ist plötzlich hoch. Du willst saubere Hypothesen formulieren, statt vorschnell eine Ursache zu behaupten.",
      bad: "Warum ist die Absprungrate auf der Seite so hoch?",
      good: (ctx) =>
`# Ziel
Hilf mir, mögliche Erklärungen für eine plötzlich gestiegene Absprungrate sauber zu strukturieren – als prüfbare Hypothesen, nicht als feststehende Antwort.

# Kontext
${ctx} Beobachtung: Auf einer Landingpage ist die Absprungrate in einer Woche von ~45 % auf ~72 % gestiegen. Gleichzeitig kam neuer Traffic über eine neue Anzeigenkampagne. Sonst keine bekannten Änderungen.

# Format
Liste von 4–6 Hypothesen. Pro Hypothese: kurze These + wie ich sie konkret prüfen könnte (welche Daten/Schritt).

# Ton & Richtlinien
Nüchtern und methodisch. Keine Ursache als sicher darstellen – es sind Hypothesen. Wenn Infos fehlen, das benennen.`,
      badOut:
`Die hohe Absprungrate liegt wahrscheinlich daran, dass die Seite zu langsam lädt oder der Inhalt nicht gut ist. Sie sollten die Seite überarbeiten.`,
      goodOut:
`Wichtig vorab: Das sind Hypothesen – keine davon ist belegt, bis sie geprüft ist.

1. Falsche Erwartung durch die neue Anzeige. These: Die Anzeige verspricht etwas anderes als die Seite zeigt. Prüfen: Anzeigentext vs. Seiteninhalt vergleichen, Absprungrate nur für Anzeigen-Traffic isolieren.
2. Schlechter passende Zielgruppe. These: Die neue Kampagne bringt weniger relevante Besucher. Prüfen: Absprungrate alter vs. neuer Quelle gegenüberstellen.
3. Technisches Problem auf bestimmten Geräten. These: Seite lädt z.B. auf Mobil fehlerhaft. Prüfen: Absprungrate nach Gerät/Browser aufschlüsseln.
4. Messfehler/Tracking. These: Doppeltes oder geändertes Tracking verfälscht die Zahl. Prüfen: Tag-Setup und ob zeitgleich etwas am Tracking geändert wurde.
5. Ladezeit. These: Mehr Traffic = langsamere Seite. Prüfen: Ladezeit im betroffenen Zeitraum messen.

Was mir zur Einordnung noch fehlt: Verlief der Anstieg parallel zum Kampagnenstart, und gilt er für alle Quellen oder nur die neue?`,
    },
  ],

  /* ---------------------------------------------------------- */
  andere: [
    {
      id: "infomail",
      label: "Info-Mail umformulieren",
      scenario:
        "Szenario: Diese trockene Info-Nachricht soll freundlicher & klarer werden:\n„Wir teilen mit, dass das Update am 12. erfolgt. Bei Rückfragen melden.“",
      bad: "Mach das schöner: „Wir teilen mit, dass das Update am 12. erfolgt. Bei Rückfragen melden.“",
      good: (ctx) =>
`# Ziel
Formuliere diese Nachricht freundlicher, klarer und nahbarer um:
„Wir teilen mit, dass das Update am 12. erfolgt. Bei Rückfragen melden.“

# Kontext
${ctx} Die Nachricht geht an Kolleg:innen und soll informieren, ohne steif zu wirken.

# Format
2–3 kurze Sätze, gerne mit einer freundlichen Einleitung und klarem Hinweis, wo man Fragen loswird.

# Ton & Richtlinien
Warm, professionell, Du-Ansprache. Keine Behördensprache.`,
      badOut:
`Hiermit möchten wir Sie darüber in Kenntnis setzen, dass das Update am 12. durchgeführt wird. Für Rückfragen stehen wir zur Verfügung.`,
      goodOut:
`Kleine Info für euch: Am 12. spielen wir das Update ein – ihr müsst nichts tun.

Falls danach etwas hakt oder ihr Fragen habt, meldet euch einfach kurz bei mir. 🙂`,
    },
    {
      id: "agenda",
      label: "Meeting-Agenda bauen",
      scenario:
        "Szenario: Für ein Team-Meeting hast du nur lose Punkte im Kopf. Daraus soll eine Agenda werden, die das Meeting wirklich strukturiert.",
      bad: "Mach eine Agenda fürs Team-Meeting: Projektstand, Urlaub, neues Tool, Sonstiges.",
      good: (ctx) =>
`# Ziel
Erstelle aus diesen losen Punkten eine klare Meeting-Agenda: Projektstand besprechen, Urlaubsplanung Sommer, Einführung eines neuen Tools, Sonstiges.

# Kontext
${ctx} Das Meeting dauert 45 Minuten, 6 Personen, einmal pro Woche. Es soll fokussiert bleiben und nicht ausufern.

# Format
Tabellarische Agenda: pro Punkt ein Titel, ein Ziel (Info / Diskussion / Entscheidung), eine grobe Zeitangabe und wer es vorstellt (als Platzhalter). Am Ende ein 5-Minuten-Puffer.

# Ton & Richtlinien
Knapp und übersichtlich. Die Zeitangaben sollen realistisch in 45 Minuten passen. Du-Ansprache.`,
      badOut:
`Agenda Team-Meeting

1. Projektstand
2. Urlaub
3. Neues Tool
4. Sonstiges`,
      goodOut:
`Agenda · Team-Meeting (45 Min)

1. Projektstand – 12 Min · Diskussion · [Lead je Projekt]
   Kurzer Stand pro Projekt, nur Blocker & Entscheidungen.

2. Urlaubsplanung Sommer – 8 Min · Entscheidung · [PM]
   Überschneidungen klären, Abdeckung sicherstellen.

3. Neues Tool einführen – 12 Min · Info + Diskussion · [Vorstellende:r]
   Kurze Demo, offene Fragen, nächste Schritte.

4. Sonstiges – 8 Min · offen · [alle]

Puffer – 5 Min

Tipp: Punkte ohne Entscheidung lieber asynchron klären.`,
    },
  ],
};
