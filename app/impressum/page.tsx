import Link from "next/link";

export default function ImpressumPage() {
  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-zinc-100 px-6 h-16 flex items-center justify-between sticky top-0 bg-white z-10">
        <Link href="/" className="font-bold text-zinc-900">BEM<span className="text-zinc-400">-Marktplatz</span></Link>
      </header>

      <div className="max-w-2xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold text-zinc-900 mb-2">Impressum</h1>
        <p className="text-sm text-zinc-400 mb-12">Angaben gemäß § 5 TMG</p>

        <div className="space-y-10 text-sm text-zinc-700">

          {/* Unternehmen */}
          <section>
            <h2 className="text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-4">Anbieter</h2>
            <div className="space-y-1 leading-relaxed">
              <p className="font-semibold text-zinc-900 text-base">NESANI UG (haftungsbeschränkt) i.G.</p>
              <p className="text-zinc-500">Schwäbisch Gmünd, Deutschland</p>
            </div>
          </section>

          {/* Vertreter */}
          <section>
            <h2 className="text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-4">Vertreten durch</h2>
            <p className="font-medium text-zinc-900">Nedim Hasani</p>
            <p className="text-zinc-500">Geschäftsführer</p>
          </section>

          {/* Kontakt */}
          <section>
            <h2 className="text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-4">Kontakt</h2>
            <div className="space-y-2">
              <p>
                <span className="text-zinc-400 w-20 inline-block">E-Mail</span>
                <a href="mailto:info@nesani.de" className="text-zinc-900 hover:underline">
                  info@nesani.de
                </a>
              </p>
              <p>
                <span className="text-zinc-400 w-20 inline-block">Web</span>
                <a href="https://nesani.de" target="_blank" rel="noopener noreferrer" className="text-zinc-900 hover:underline">
                  nesani.de
                </a>
              </p>
            </div>
          </section>

          {/* Registereintrag */}
          <section>
            <h2 className="text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-4">Gesellschaft in Gründung</h2>
            <p className="text-zinc-500 leading-relaxed">
              Die Gesellschaft befindet sich in Gründung. Handelsregisternummer und
              Umsatzsteuer-ID werden nach Eintragung ergänzt.
            </p>
          </section>

          {/* Verantwortlich */}
          <section>
            <h2 className="text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-4">
              Verantwortlich für den Inhalt (§ 55 Abs. 2 RStV)
            </h2>
            <div className="space-y-1">
              <p className="font-medium text-zinc-900">Nedim Hasani</p>
              <p className="text-zinc-500">Schwäbisch Gmünd, Deutschland</p>
              <p>
                <a href="mailto:info@nesani.de" className="text-zinc-500 hover:text-zinc-900 hover:underline">
                  info@nesani.de
                </a>
              </p>
            </div>
          </section>

          {/* Haftungsausschluss */}
          <section>
            <h2 className="text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-4">Haftungsausschluss</h2>
            <div className="space-y-4 text-zinc-500 leading-relaxed">
              <div>
                <p className="font-medium text-zinc-700 mb-1">Haftung für Inhalte</p>
                <p>
                  Als Diensteanbieter sind wir gemäß § 7 Abs. 1 TMG für eigene Inhalte auf diesen Seiten
                  nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als
                  Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde
                  Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige
                  Tätigkeit hinweisen.
                </p>
              </div>
              <div>
                <p className="font-medium text-zinc-700 mb-1">Haftung für Links</p>
                <p>
                  Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen
                  Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen.
                  Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der
                  Seiten verantwortlich.
                </p>
              </div>
              <div>
                <p className="font-medium text-zinc-700 mb-1">Urheberrecht</p>
                <p>
                  Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen
                  dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art
                  der Verwertung außerhalb der Grenzen des Urheberrechts bedürfen der schriftlichen
                  Zustimmung des jeweiligen Autors bzw. Erstellers.
                </p>
              </div>
            </div>
          </section>

          {/* Streitbeilegung */}
          <section>
            <h2 className="text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-4">
              Online-Streitbeilegung
            </h2>
            <p className="text-zinc-500 leading-relaxed">
              Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:{" "}
              <a
                href="https://ec.europa.eu/consumers/odr"
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-700 underline underline-offset-2"
              >
                https://ec.europa.eu/consumers/odr
              </a>
              . Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer
              Verbraucherschlichtungsstelle teilzunehmen.
            </p>
          </section>
        </div>

        <div className="mt-14 pt-8 border-t border-zinc-100 flex gap-6 text-xs text-zinc-400">
          <Link href="/datenschutz" className="hover:text-zinc-700 underline underline-offset-2">Datenschutzerklärung</Link>
          <Link href="/agb" className="hover:text-zinc-700 underline underline-offset-2">AGB</Link>
          <Link href="/about" className="hover:text-zinc-700 underline underline-offset-2">Über uns</Link>
        </div>
      </div>
    </div>
  );
}
