const steps = [
  {
    number: "01",
    title: "Menschen durchsuchen",
    description:
      "Suche nach Fähigkeit, Standort und Preis. Kein Konto erforderlich.",
  },
  {
    number: "02",
    title: "Aufgabe ausschreiben oder direkt anfragen",
    description:
      "Beschreibe dein Anliegen, lege ein Budget fest — Menschen bewerben sich. Oder schreibe direkt an.",
  },
  {
    number: "03",
    title: "Mensch erledigt die Aufgabe",
    description:
      "Klare Anweisungen. Echtzeit-Updates. Aufgabe abgeschlossen — in der echten Welt.",
  },
  {
    number: "04",
    title: "Sicher bezahlen",
    description:
      "Sichere Zahlungsabwicklung. Geld wird erst freigegeben, wenn du zufrieden bist.",
  },
];

export default function HowItWorks() {
  return (
    <section id="wie-es-funktioniert" className="py-28 px-6 bg-zinc-50">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16">
          <span className="text-xs font-medium tracking-widest text-zinc-300 uppercase">
            05 — Prozess
          </span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-zinc-900 mt-4">
            So funktioniert es.
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-zinc-200">
          {steps.map((step) => (
            <div key={step.number} className="bg-zinc-50 p-8">
              <span className="text-4xl font-bold text-zinc-100 font-mono">
                {step.number}
              </span>
              <h3 className="font-semibold text-zinc-900 mt-4 leading-snug">
                {step.title}
              </h3>
              <p className="text-sm text-zinc-500 mt-3 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
