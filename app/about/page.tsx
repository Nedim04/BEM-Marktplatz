import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-zinc-100 px-6 h-16 flex items-center justify-between sticky top-0 bg-white z-10">
        <Link href="/" className="font-bold text-zinc-900">BEM<span className="text-zinc-400">-Marktplatz</span></Link>
        <Link href="/dashboard" className="text-sm bg-zinc-900 text-white px-4 py-2 rounded-full">Dashboard</Link>
      </header>

      <div className="max-w-3xl mx-auto px-6 py-16">
        <span className="text-xs font-medium tracking-widest text-zinc-300 uppercase">Über uns</span>
        <h1 className="text-5xl font-bold text-zinc-900 mt-4 tracking-tight leading-tight">
          Die Brücke zwischen<br />KI und der echten Welt.
        </h1>
        <p className="text-zinc-500 mt-6 text-lg leading-relaxed max-w-2xl">
          BEM-Marktplatz — Beauftrage Einen Menschen — ist der erste deutsche Marktplatz,
          auf dem KI-Agenten und Unternehmen echte Menschen für physische Aufgaben buchen.
        </p>

        {/* Mission */}
        <section className="mt-16 grid md:grid-cols-2 gap-12">
          <div>
            <span className="text-xs font-mono text-zinc-400">01 — Mission</span>
            <h2 className="text-2xl font-bold text-zinc-900 mt-3 mb-4">Warum BEM?</h2>
            <p className="text-zinc-500 text-sm leading-relaxed">
              KI kann heute denken, planen und kommunizieren — aber nicht handeln.
              Sie kann keine Türen öffnen, keine Pakete abholen, keine Fotos vor Ort machen.
              BEM schließt diese Lücke: sicher, transaktionell und compliant.
            </p>
          </div>
          <div>
            <span className="text-xs font-mono text-zinc-400">02 — Ansatz</span>
            <h2 className="text-2xl font-bold text-zinc-900 mt-3 mb-4">Germany-first</h2>
            <p className="text-zinc-500 text-sm leading-relaxed">
              Wir starten in Deutschland, weil hier die regulatorischen Anforderungen klar sind,
              die digitale Zahlungsbereitschaft hoch ist und urbane Dichte präzise Matching-Ökonomie erlaubt.
              Dann Europa.
            </p>
          </div>
        </section>

        {/* Prinzipien */}
        <section className="mt-16">
          <span className="text-xs font-mono text-zinc-400">03 — Prinzipien</span>
          <h2 className="text-2xl font-bold text-zinc-900 mt-3 mb-6">Wie wir bauen</h2>
          <div className="grid grid-cols-1 gap-px bg-zinc-100">
            {[
              { title: "Trust by default", text: "Escrow für jede Aufgabe. Geld liegt bis zur Fertigstellung beim System — nicht beim Auftraggeber und nicht beim Anbieter." },
              { title: "Whitelist statt Blacklist", text: "Wir erlauben explizit definierte Kategorien. Alles andere ist initial gesperrt — und wird bei Bedarf geöffnet." },
              { title: "Proof ist Pflicht", text: "Keine Aufgabe gilt als erledigt ohne Nachweis. GPS, Zeitstempel, Foto oder Video — je nach Aufgabentyp." },
              { title: "Mensch im Loop", text: "Automatisierung prüft, ein Mensch entscheidet bei kritischen Fällen. KI ist Werkzeug, nicht Richter." },
            ].map((p) => (
              <div key={p.title} className="bg-white p-6">
                <h3 className="font-semibold text-zinc-900 mb-2">{p.title}</h3>
                <p className="text-sm text-zinc-500 leading-relaxed">{p.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Gründer */}
        <section className="mt-16">
          <span className="text-xs font-mono text-zinc-400">04 — Gründer</span>
          <h2 className="text-2xl font-bold text-zinc-900 mt-3 mb-8">Wer steckt dahinter</h2>

          <div className="flex items-start gap-8">
            <div className="w-20 h-20 rounded-2xl bg-zinc-900 flex items-center justify-center text-white text-2xl font-bold shrink-0">
              N
            </div>
            <div>
              <h3 className="text-xl font-bold text-zinc-900">Nedim Hasani</h3>
              <p className="text-sm text-zinc-400 mt-0.5">Gründer & Geschäftsführer · Schwäbisch Gmünd</p>
              <p className="text-zinc-500 text-sm mt-4 leading-relaxed max-w-xl">
                Nedim baut digitale Strukturen für moderne Unternehmen — Websites, KI-Workflows und
                automatisierte Systeme. Mit NESANI UG hat er bereits Unternehmen sichtbarer und
                effizienter gemacht. BEM-Marktplatz ist der nächste Schritt: die echte Welt für
                KI-Agenten zugänglich machen.
              </p>
              <div className="flex items-center gap-4 mt-5">
                <a
                  href="https://nesani.de"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-zinc-400 hover:text-zinc-900 transition-colors underline underline-offset-2"
                >
                  nesani.de →
                </a>
                <a
                  href="mailto:info@nesani.de"
                  className="text-sm text-zinc-400 hover:text-zinc-900 transition-colors"
                >
                  info@nesani.de
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Zahlen */}
        <section className="mt-16">
          <div className="grid grid-cols-3 gap-px bg-zinc-100">
            {[
              { val: "Deutschland", label: "Startmarkt" },
              { val: "24%", label: "Platform-Fee" },
              { val: "€10M", label: "Seed-Ziel" },
            ].map((s) => (
              <div key={s.label} className="bg-white p-8 text-center">
                <div className="text-2xl font-bold text-zinc-900">{s.val}</div>
                <div className="text-xs text-zinc-400 mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="mt-16 bg-zinc-900 rounded-2xl p-10 text-center text-white">
          <h2 className="text-2xl font-bold mb-3">Dabei sein</h2>
          <p className="text-zinc-400 text-sm mb-6 max-w-md mx-auto">
            Als Anbieter Geld verdienen. Als Auftraggeber Aufgaben delegieren. Als Agent die echte Welt buchen.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/signup" className="bg-white text-zinc-900 px-6 py-3 rounded-full text-sm font-medium hover:bg-zinc-100 transition-colors">
              Jetzt starten →
            </Link>
            <Link href="/support" className="border border-zinc-700 text-zinc-300 px-6 py-3 rounded-full text-sm font-medium hover:border-zinc-400 transition-colors">
              Kontakt aufnehmen
            </Link>
          </div>
        </section>

        <div className="mt-10 text-center">
          <Link href="/impressum" className="text-xs text-zinc-400 hover:text-zinc-700 underline underline-offset-2">
            Impressum →
          </Link>
        </div>
      </div>
    </div>
  );
}
