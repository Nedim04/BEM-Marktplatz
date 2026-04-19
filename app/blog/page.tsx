import Link from "next/link";

const posts = [
  {
    slug: "ki-braucht-echte-welt",
    datum: "19. April 2026",
    kategorie: "Produkt",
    titel: "Warum KI die echte Welt braucht",
    auszug: "Sprachmodelle können heute planen, schreiben und entscheiden — aber nicht handeln. BEM schließt diese Lücke zwischen digitaler Intelligenz und physischer Realität.",
  },
  {
    slug: "germany-first-strategie",
    datum: "15. April 2026",
    kategorie: "Strategie",
    titel: "Warum wir mit Deutschland starten",
    auszug: "Klarer Rechtsraum, hohe Zahlungsbereitschaft, urbane Dichte — Deutschland ist der ideale Beachhead-Markt für einen transaktionssicheren Human-Marketplace.",
  },
  {
    slug: "trust-ist-produkt",
    datum: "10. April 2026",
    kategorie: "Trust & Safety",
    titel: "Trust ist kein Kostenblock — es ist das Produkt",
    auszug: "Gerade in Deutschland gewinnt nicht das wildeste Produkt, sondern das vertrauenswürdigste. Wie wir Compliance als Wettbewerbsvorteil bauen.",
  },
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-zinc-100 px-6 h-16 flex items-center justify-between sticky top-0 bg-white z-10">
        <Link href="/" className="font-bold text-zinc-900">BEM<span className="text-zinc-400">-Marktplatz</span></Link>
        <Link href="/dashboard" className="text-sm bg-zinc-900 text-white px-4 py-2 rounded-full">Dashboard</Link>
      </header>

      <div className="max-w-3xl mx-auto px-6 py-16">
        <span className="text-xs font-medium tracking-widest text-zinc-300 uppercase">Gedanken</span>
        <h1 className="text-5xl font-bold text-zinc-900 mt-4 tracking-tight">Blog</h1>
        <p className="text-zinc-500 mt-4">Produkt, Strategie und Einblicke aus dem Aufbau von BEM.</p>

        <div className="mt-12 divide-y divide-zinc-100">
          {posts.map((p) => (
            <article key={p.slug} className="py-8 group">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-xs font-medium text-zinc-400 bg-zinc-100 px-2.5 py-1 rounded-full">
                  {p.kategorie}
                </span>
                <span className="text-xs text-zinc-400">{p.datum}</span>
              </div>
              <h2 className="text-xl font-bold text-zinc-900 group-hover:text-zinc-600 transition-colors">
                {p.titel}
              </h2>
              <p className="text-zinc-500 text-sm mt-2 leading-relaxed">{p.auszug}</p>
              <span className="inline-block mt-4 text-sm text-zinc-400 group-hover:text-zinc-700 transition-colors">
                Weiterlesen →
              </span>
            </article>
          ))}
        </div>

        <div className="mt-12 bg-zinc-50 rounded-2xl p-8 text-center">
          <h3 className="font-bold text-zinc-900 mb-2">Neue Artikel per E-Mail</h3>
          <p className="text-zinc-500 text-sm mb-5">Kein Spam. Nur wenn wir etwas Wichtiges zu sagen haben.</p>
          <div className="flex gap-3 max-w-sm mx-auto">
            <input
              type="email"
              placeholder="deine@email.de"
              className="flex-1 border border-zinc-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900"
            />
            <button className="bg-zinc-900 text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-zinc-700 transition-colors">
              Abonnieren
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
