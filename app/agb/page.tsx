import Link from "next/link";

export default function AgbPage() {
  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-zinc-100 px-6 h-16 flex items-center justify-between sticky top-0 bg-white z-10">
        <Link href="/" className="font-bold text-zinc-900">BEM<span className="text-zinc-400">-Marktplatz</span></Link>
      </header>

      <div className="max-w-2xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold text-zinc-900 mb-2">Allgemeine Geschäftsbedingungen</h1>
        <p className="text-sm text-zinc-400 mb-10">Stand: April 2026</p>

        {[
          {
            title: "§ 1 Geltungsbereich",
            text: `Diese Allgemeinen Geschäftsbedingungen (AGB) gelten für die Nutzung der Plattform BEM-Marktplatz (nachfolgend „Plattform"), betrieben von BEM-Marktplatz UG (in Gründung), Deutschland.

Mit der Registrierung auf der Plattform akzeptiert der Nutzer diese AGB vollumfänglich.`,
          },
          {
            title: "§ 2 Leistungsgegenstand",
            text: `Die Plattform vermittelt zwischen Auftraggebern (natürliche oder juristische Personen, die Aufgaben ausschreiben) und Anbietern (natürliche Personen, die Aufgaben übernehmen).

BEM-Marktplatz ist kein Arbeitgeber und schließt keinen Arbeitsvertrag mit Nutzern ab. Die Plattform stellt lediglich die technische Infrastruktur zur Verfügung.`,
          },
          {
            title: "§ 3 Registrierung und Nutzerkonto",
            text: `Die Nutzung erfordert eine Registrierung mit korrekten Angaben. Jede Person darf nur ein Konto anlegen. Das Konto ist nicht übertragbar.

Der Nutzer ist verpflichtet, seine Zugangsdaten geheim zu halten und BEM-Marktplatz unverzüglich zu informieren, wenn er Kenntnis von einem Missbrauch erlangt.`,
          },
          {
            title: "§ 4 Aufgaben und Bewerbungen",
            text: `Auftraggeber sind für den Inhalt ihrer Aufgaben verantwortlich. Verbotene Aufgabenkategorien (gemäß § 7) dürfen nicht ausgeschrieben werden.

Anbieter, die eine Aufgabe übernehmen, sind verpflichtet, die vereinbarten Leistungen vollständig und nachweisbar zu erbringen.`,
          },
          {
            title: "§ 5 Zahlung und Gebühren",
            text: `Das Budget einer Aufgabe wird bei Erstellung treuhänderisch reserviert. Die Freigabe erfolgt nach Bestätigung durch den Auftraggeber.

BEM-Marktplatz erhebt eine Plattformgebühr von 24% des Aufgabenbudgets. Diese wird automatisch bei der Auszahlung einbehalten.

Auszahlungen erfolgen innerhalb von 1–3 Werktagen nach Freigabe.`,
          },
          {
            title: "§ 6 Streitbeilegung",
            text: `Bei Streitigkeiten zwischen Auftraggeber und Anbieter kann das BEM-Marktplatz-Team als Vermittler eingeschaltet werden. Die Entscheidung des Teams ist für beide Parteien bindend.

Vor Einleitung rechtlicher Schritte ist ein Schlichtungsversuch über den Support zwingend.`,
          },
          {
            title: "§ 7 Verbotene Inhalte und Nutzungen",
            text: `Folgende Aufgaben sind ausdrücklich verboten: politische Aktivitäten, sexuelle Dienstleistungen, Überwachung, Einschüchterung, illegale Botengänge, medizinische Handlungen sowie alle Aufgaben, die gegen deutsches Recht verstoßen.

Verstöße führen zur sofortigen Sperrung des Kontos und gegebenenfalls zur Anzeige.`,
          },
          {
            title: "§ 8 Haftungsbeschränkung",
            text: `BEM-Marktplatz haftet nicht für die tatsächliche Ausführung von Aufgaben, da es sich um eine reine Vermittlungsplattform handelt.

Die Haftung für einfache Fahrlässigkeit ist ausgeschlossen, soweit keine Verletzung wesentlicher Vertragspflichten vorliegt.`,
          },
          {
            title: "§ 9 Änderungen der AGB",
            text: `BEM-Marktplatz behält sich vor, diese AGB jederzeit zu ändern. Nutzer werden per E-Mail über wesentliche Änderungen informiert. Die weitere Nutzung der Plattform nach Inkrafttreten der Änderungen gilt als Zustimmung.`,
          },
          {
            title: "§ 10 Anwendbares Recht und Gerichtsstand",
            text: `Es gilt deutsches Recht unter Ausschluss des UN-Kaufrechts.

Gerichtsstand für alle Streitigkeiten aus diesem Vertragsverhältnis ist, soweit gesetzlich zulässig, Deutschland.`,
          },
        ].map((s) => (
          <section key={s.title} className="mb-8">
            <h2 className="text-lg font-bold text-zinc-900 mb-3">{s.title}</h2>
            <p className="text-sm text-zinc-600 leading-relaxed whitespace-pre-line">{s.text}</p>
          </section>
        ))}

        <div className="mt-10 pt-8 border-t border-zinc-100 text-sm text-zinc-400">
          Bei Fragen: <a href="mailto:legal@bem-marktplatz.de" className="underline">legal@bem-marktplatz.de</a> · <Link href="/datenschutz" className="underline">Datenschutzerklärung</Link>
        </div>
      </div>
    </div>
  );
}
