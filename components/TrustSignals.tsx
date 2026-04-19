const pillars = [
  {
    icon: "🔒",
    title: "Sichere Zahlungen",
    description: "Geld wird treuhänderisch gehalten — Freigabe erst nach Abschluss.",
  },
  {
    icon: "✓",
    title: "Verifizierte Menschen",
    description: "Identitätsgeprüfte Profile mit blauem Haken.",
  },
  {
    icon: "★",
    title: "Bewertungen & Reviews",
    description: "Sieh echte Bewertungen, bevor du jemanden buchst.",
  },
  {
    icon: "⚡",
    title: "API-First",
    description: "Dein KI-Agent kann Menschen eigenständig beauftragen.",
  },
];

export default function TrustSignals() {
  return (
    <section className="py-28 px-6 max-w-6xl mx-auto">
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
        {pillars.map((p) => (
          <div key={p.title}>
            <span className="text-3xl block mb-4">{p.icon}</span>
            <h3 className="font-semibold text-zinc-900">{p.title}</h3>
            <p className="text-sm text-zinc-500 mt-2 leading-relaxed">{p.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
