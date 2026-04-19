import Link from "next/link";

const faqs = [
  { q: "Wie lange dauert es bis ich eine Antwort bekomme?", a: "In der Regel innerhalb von 24 Stunden. Dringende Anliegen bitte mit dem Betreff [DRINGEND] markieren." },
  { q: "Ich habe eine Aufgabe erstellt aber noch keine Bewerbungen.", a: "Überprüfe, ob dein Budget marktüblich ist und die Beschreibung klar genug ist. Aufgaben mit Vermittlungsgebühr erhalten oft mehr Bewerbungen." },
  { q: "Wie erhalte ich meine Auszahlung?", a: "Nach Freigabe der Aufgabe durch den Auftraggeber wird der Betrag innerhalb von 1-3 Werktagen auf das hinterlegte Konto überwiesen." },
  { q: "Kann ich eine Aufgabe stornieren?", a: "Ja. Offene Aufgaben können jederzeit abgebrochen werden. Bereits angenommene Aufgaben können nur nach Rücksprache storniert werden." },
  { q: "Mein Anbieter hat die Aufgabe nicht erfüllt. Was nun?", a: "Öffne einen Dispute über das Dashboard. Das BEM-Team prüft den Sachverhalt und entscheidet innerhalb von 48 Stunden." },
  { q: "Wie funktioniert die Verifizierung?", a: "Die Identitätsverifizierung erfolgt über einen Ausweis-Upload. Verifizierte Profile erhalten einen blauen Haken und werden bevorzugt in den Suchergebnissen angezeigt." },
];

export default function SupportPage() {
  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-zinc-100 px-6 h-16 flex items-center justify-between sticky top-0 bg-white z-10">
        <Link href="/" className="font-bold text-zinc-900">BEM<span className="text-zinc-400">-Marktplatz</span></Link>
        <Link href="/dashboard" className="text-sm bg-zinc-900 text-white px-4 py-2 rounded-full">Dashboard</Link>
      </header>

      <div className="max-w-3xl mx-auto px-6 py-16">
        <span className="text-xs font-medium tracking-widest text-zinc-300 uppercase">Hilfe</span>
        <h1 className="text-5xl font-bold text-zinc-900 mt-4 tracking-tight">Support</h1>
        <p className="text-zinc-500 mt-4 leading-relaxed">
          Wir helfen dir gerne weiter. Schau zuerst in die häufigen Fragen — oder schreib uns direkt.
        </p>

        {/* Kontakt-Karten */}
        <div className="mt-10 grid md:grid-cols-2 gap-4">
          <a href="mailto:support@bem-marktplatz.de"
            className="border border-zinc-100 rounded-2xl p-6 hover:border-zinc-300 transition-colors group">
            <div className="text-2xl mb-3">✉️</div>
            <div className="font-semibold text-zinc-900 group-hover:text-zinc-700">E-Mail</div>
            <p className="text-sm text-zinc-500 mt-1">support@bem-marktplatz.de<br />Antwort innerhalb 24h</p>
          </a>
          <Link href="/docs/bounties"
            className="border border-zinc-100 rounded-2xl p-6 hover:border-zinc-300 transition-colors group">
            <div className="text-2xl mb-3">📖</div>
            <div className="font-semibold text-zinc-900 group-hover:text-zinc-700">Dokumentation</div>
            <p className="text-sm text-zinc-500 mt-1">Bounties, Zahlungen und Kategorien erklärt.</p>
          </Link>
        </div>

        {/* FAQ */}
        <section className="mt-14">
          <h2 className="text-2xl font-bold text-zinc-900 mb-6">Häufige Fragen</h2>
          <div className="divide-y divide-zinc-100">
            {faqs.map((f) => (
              <div key={f.q} className="py-5">
                <h3 className="font-medium text-zinc-900 text-sm">{f.q}</h3>
                <p className="text-sm text-zinc-500 mt-2 leading-relaxed">{f.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Weitere Links */}
        <section className="mt-14 border-t border-zinc-100 pt-8">
          <h2 className="text-sm font-semibold text-zinc-900 mb-4">Weitere Ressourcen</h2>
          <div className="flex flex-wrap gap-3">
            <Link href="/docs/bounties" className="text-sm text-zinc-600 border border-zinc-200 px-4 py-2 rounded-full hover:border-zinc-400 transition-colors">Bounties-Dokumentation</Link>
            <Link href="/api-docs" className="text-sm text-zinc-600 border border-zinc-200 px-4 py-2 rounded-full hover:border-zinc-400 transition-colors">API-Referenz</Link>
            <Link href="/agb" className="text-sm text-zinc-600 border border-zinc-200 px-4 py-2 rounded-full hover:border-zinc-400 transition-colors">AGB</Link>
            <Link href="/datenschutz" className="text-sm text-zinc-600 border border-zinc-200 px-4 py-2 rounded-full hover:border-zinc-400 transition-colors">Datenschutz</Link>
          </div>
        </section>
      </div>
    </div>
  );
}
