import Link from "next/link";

export default function FindersFee() {
  return (
    <section className="py-28 px-6 bg-zinc-900 text-white">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        <div>
          <span className="text-xs font-medium tracking-widest text-zinc-400 uppercase">
            04 — Vermittlungsgebühr
          </span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mt-4 leading-tight">
            Verdiene Geld,
            <br />
            indem du weitersagst.
          </h2>
          <p className="mt-6 text-zinc-400 leading-relaxed">
            Dein Netzwerk ist bares Geld wert — und du hast es bisher
            verschenkt. Teile eine Aufgabe. Wenn die Person, die du empfohlen
            hast, gebucht wird, kassierst du die Vermittlungsgebühr.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Link
              href="/bounties?findersFeeOnly=true"
              className="inline-flex items-center justify-center bg-white text-zinc-900 px-6 py-3 rounded-full text-sm font-medium hover:bg-zinc-100 transition-colors"
            >
              Aufgaben zum Teilen →
            </Link>
            <Link
              href="/bounties/erstellen"
              className="inline-flex items-center justify-center border border-zinc-700 text-zinc-300 px-6 py-3 rounded-full text-sm font-medium hover:border-zinc-400 transition-colors"
            >
              Mit Gebühr ausschreiben →
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {[
            {
              step: "01",
              title: "Aufgabe entdecken",
              desc: "Finde eine offene Aufgabe mit Vermittlungsgebühr.",
            },
            {
              step: "02",
              title: "Jemanden empfehlen",
              desc: "Teile die Aufgabe mit dem passenden Menschen aus deinem Umfeld.",
            },
            {
              step: "03",
              title: "Gebühr kassieren",
              desc: "Sobald die Person gebucht wird, landet die Gebühr auf deinem Konto.",
            },
          ].map((item) => (
            <div
              key={item.step}
              className="border border-zinc-700 rounded-xl p-6 hover:border-zinc-500 transition-colors"
            >
              <span className="text-xs text-zinc-500 font-mono">{item.step}</span>
              <h3 className="font-semibold text-white mt-2">{item.title}</h3>
              <p className="text-sm text-zinc-400 mt-1 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
