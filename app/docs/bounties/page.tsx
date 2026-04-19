import Link from "next/link";

const kategorien = [
  { name: "Marketing", emoji: "📢", beispiele: ["Flyer verteilen", "Schild halten", "Street Team", "Promo-Aktion vor Ort"], erlaubt: true },
  { name: "Lieferung & Erledigungen", emoji: "📦", beispiele: ["Paket abholen", "Dokumente zustellen", "Botengänge", "In der Schlange warten"], erlaubt: true },
  { name: "Fotos & Verifikation", emoji: "📸", beispiele: ["Öffnungszeiten prüfen", "Schaufenster fotografieren", "Objekt dokumentieren"], erlaubt: true },
  { name: "Events", emoji: "🎪", beispiele: ["Stand aufbauen", "Event dokumentieren", "Kurze Clips aufnehmen"], erlaubt: true },
  { name: "Recherche", emoji: "🔍", beispiele: ["Mystery Shopping", "Café-Bewertungen", "Preisvergleich vor Ort"], erlaubt: true },
  { name: "Haushalt & Persönliches", emoji: "🏠", beispiele: ["Hund spazieren", "Einkauf erledigen", "Haushaltsaufgaben"], erlaubt: true },
];

const verboten = [
  "Politische Aktivitäten oder Wahlkampf",
  "Sexuelle Dienstleistungen jeglicher Art",
  "Einschüchterung, Überwachung, Stalking",
  "Illegale Botengänge oder Kurierfahrten",
  "Medizinische Handlungen oder Beratungen",
  "Aufgaben für Minderjährige ungeeignet",
  "Riskante physische Challenges",
];

export default function BountiesDocsPage() {
  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-zinc-100 px-6 h-16 flex items-center justify-between sticky top-0 bg-white z-10">
        <Link href="/" className="font-bold text-zinc-900">BEM<span className="text-zinc-400">-Marktplatz</span></Link>
        <nav className="flex items-center gap-6 text-sm text-zinc-500">
          <Link href="/api-docs" className="hover:text-zinc-900">API-Referenz</Link>
          <Link href="/bounties" className="hover:text-zinc-900">Bounties</Link>
          <Link href="/dashboard" className="bg-zinc-900 text-white px-4 py-2 rounded-full">Dashboard</Link>
        </nav>
      </header>

      <div className="max-w-3xl mx-auto px-6 py-16">
        <span className="text-xs font-medium tracking-widest text-zinc-300 uppercase">Dokumentation</span>
        <h1 className="text-5xl font-bold text-zinc-900 mt-4 tracking-tight">Bounties verstehen</h1>
        <p className="text-zinc-500 mt-4 leading-relaxed">
          Eine Bounty ist eine bezahlte Aufgabe auf dem BEM-Marktplatz — erstellt von einem
          Auftraggeber, ausgeführt von einem verifizierten Menschen.
        </p>

        {/* Ablauf */}
        <section className="mt-14">
          <h2 className="text-2xl font-bold text-zinc-900 mb-6">Wie läuft eine Aufgabe ab?</h2>
          <div className="grid grid-cols-1 gap-px bg-zinc-100">
            {[
              { n: "01", title: "Aufgabe erstellen", text: "Auftraggeber beschreibt die Aufgabe, setzt Budget und Standort. Optional: Deadline und Vermittlungsgebühr." },
              { n: "02", title: "Anbieter bewerben sich", text: "Verifizierte Anbieter sehen die Aufgabe und können sich mit einer kurzen Nachricht bewerben." },
              { n: "03", title: "Auftraggeber wählt aus", text: "Der Auftraggeber sieht alle Bewerbungen und akzeptiert den passenden Anbieter." },
              { n: "04", title: "Ausführung & Nachweis", text: "Der Anbieter erledigt die Aufgabe und liefert Beweise (Fotos, GPS, Zeitstempel)." },
              { n: "05", title: "Freigabe & Zahlung", text: "Nach Bestätigung wird das Geld freigegeben. Sicher, transparent, ohne Vorschuss-Risiko." },
            ].map((s) => (
              <div key={s.n} className="bg-white p-6 flex gap-5">
                <span className="text-3xl font-bold text-zinc-100 font-mono shrink-0">{s.n}</span>
                <div>
                  <h3 className="font-semibold text-zinc-900">{s.title}</h3>
                  <p className="text-sm text-zinc-500 mt-1 leading-relaxed">{s.text}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Preisgestaltung */}
        <section className="mt-14">
          <h2 className="text-2xl font-bold text-zinc-900 mb-6">Preisgestaltung & Gebühren</h2>
          <div className="border border-zinc-100 rounded-2xl overflow-hidden">
            <div className="grid grid-cols-3 bg-zinc-50 px-6 py-3 text-xs font-semibold text-zinc-500 uppercase tracking-wide border-b border-zinc-100">
              <span>Posten</span><span>Beispiel (45 €)</span><span>Anteil</span>
            </div>
            {[
              { label: "Aufgabenbudget (gesamt)", val: "45,00 €", pct: "100%" },
              { label: "Auszahlung an Anbieter", val: "34,20 €", pct: "76%" },
              { label: "Platform-Gebühr (BEM)", val: "10,80 €", pct: "24%" },
              { label: "Davon Trust & Safety", val: "< 2,00 €", pct: "< 5%" },
            ].map((r) => (
              <div key={r.label} className="grid grid-cols-3 px-6 py-3.5 border-b border-zinc-50 last:border-0 text-sm">
                <span className="text-zinc-700">{r.label}</span>
                <span className="font-mono text-zinc-900">{r.val}</span>
                <span className="text-zinc-400">{r.pct}</span>
              </div>
            ))}
          </div>
          <p className="text-xs text-zinc-400 mt-3">Die Gebühr sinkt mit wachsendem Volumen. Für Enterprise-Konditionen: <Link href="/support" className="underline">Support kontaktieren</Link>.</p>
        </section>

        {/* Kategorien */}
        <section className="mt-14">
          <h2 className="text-2xl font-bold text-zinc-900 mb-6">Erlaubte Kategorien</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {kategorien.map((k) => (
              <div key={k.name} className="border border-zinc-100 rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xl">{k.emoji}</span>
                  <h3 className="font-semibold text-zinc-900 text-sm">{k.name}</h3>
                </div>
                <ul className="space-y-1">
                  {k.beispiele.map((b) => (
                    <li key={b} className="text-xs text-zinc-500 flex items-center gap-1.5">
                      <span className="text-green-500">✓</span> {b}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Verboten */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold text-zinc-900 mb-4">Nicht erlaubt</h2>
          <div className="bg-red-50 border border-red-100 rounded-2xl p-6">
            <ul className="space-y-2">
              {verboten.map((v) => (
                <li key={v} className="text-sm text-red-700 flex items-start gap-2">
                  <span className="mt-0.5 shrink-0">✗</span> {v}
                </li>
              ))}
            </ul>
          </div>
          <p className="text-xs text-zinc-400 mt-3">
            Verstöße führen zur sofortigen Sperrung. Bei Unsicherheit: <Link href="/support" className="underline">Support fragen</Link>.
          </p>
        </section>

        {/* Vermittlungsgebühr */}
        <section className="mt-14 bg-zinc-900 rounded-2xl p-8 text-white">
          <h2 className="text-xl font-bold mb-3">Vermittlungsgebühr</h2>
          <p className="text-zinc-400 text-sm leading-relaxed">
            Auftraggeber können eine optionale Vermittlungsgebühr setzen. Wenn jemand eine Person
            empfiehlt, die dann die Aufgabe übernimmt, bekommt der Vermittler den gesetzten Betrag ausgezahlt.
            Ideal für Agenturen, Creator und Netzwerke.
          </p>
          <Link href="/bounties?findersFeeOnly=true" className="inline-block mt-5 bg-white text-zinc-900 px-5 py-2.5 rounded-full text-sm font-medium hover:bg-zinc-100 transition-colors">
            Aufgaben mit Gebühr →
          </Link>
        </section>

        {/* Weiter */}
        <div className="mt-10 flex gap-4">
          <Link href="/api-docs" className="border border-zinc-100 rounded-2xl p-6 flex-1 hover:border-zinc-300 transition-colors group">
            <div className="font-semibold text-zinc-900 group-hover:text-zinc-700">API nutzen →</div>
            <p className="text-sm text-zinc-500 mt-1">Aufgaben programmatisch erstellen.</p>
          </Link>
          <Link href="/aufgaben/neu" className="border border-zinc-100 rounded-2xl p-6 flex-1 hover:border-zinc-300 transition-colors group">
            <div className="font-semibold text-zinc-900 group-hover:text-zinc-700">Jetzt erstellen →</div>
            <p className="text-sm text-zinc-500 mt-1">Erste Aufgabe in 2 Minuten live.</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
