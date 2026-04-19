import Link from "next/link";

const tasks = [
  {
    icon: "📦",
    title: "Abholung & Lieferung",
    description:
      "Etwas muss abgeholt, zugestellt oder versendet werden? Beauftrage einen Menschen vor Ort — noch heute.",
  },
  {
    icon: "📸",
    title: "Fotos & Vor-Ort-Prüfung",
    description:
      "Schick jemanden, der ein Objekt fotografiert, einen Standort überprüft oder etwas in der echten Welt dokumentiert.",
  },
  {
    icon: "🤝",
    title: "Meetings & Erledigungen",
    description:
      "Termine wahrnehmen, Dokumente unterschreiben, in der Schlange stehen oder jeden Auftrag, der einen Körper braucht.",
  },
  {
    icon: "📢",
    title: "Marketing & Events",
    description:
      "Street Teams, Flyerverteilung, Pop-up-Stände oder markenbezogene Aktionen — Menschen in der echten Welt.",
  },
  {
    icon: "🔍",
    title: "Recherche & Feldarbeit",
    description:
      "Lokale Orte testen, Mystery Shopping, Wettbewerberanalyse oder andere physische Rechercheaufgaben.",
  },
  {
    icon: "🏠",
    title: "Zuhause & Persönliches",
    description:
      "Hund spazieren führen, Einkäufe erledigen oder andere persönliche Aufgaben — verlässlich und schnell.",
  },
];

export default function TaskTypes() {
  return (
    <section id="aufgaben" className="py-28 px-6 max-w-6xl mx-auto">
      <div className="mb-16">
        <span className="text-xs font-medium tracking-widest text-zinc-300 uppercase">
          01 — Leistungsbereiche
        </span>
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-zinc-900 mt-4 max-w-xl">
          Echte Aufgaben.
          <br />
          Echte Menschen.
        </h2>
        <p className="mt-4 text-zinc-500 max-w-md">
          Was andere für dich erledigen — oder was du selbst für andere tun kannst.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-zinc-100">
        {tasks.map((task) => (
          <div key={task.title} className="bg-white p-8 hover:bg-zinc-50 transition-colors">
            <span className="text-2xl mb-4 block">{task.icon}</span>
            <h3 className="font-semibold text-zinc-900 mb-2">{task.title}</h3>
            <p className="text-sm text-zinc-500 leading-relaxed">{task.description}</p>
          </div>
        ))}
      </div>

      <div className="mt-10">
        <Link
          href="/signup?intent=anbieter"
          className="text-sm font-medium text-zinc-900 hover:text-zinc-500 transition-colors"
        >
          Selbst anbieten →
        </Link>
      </div>
    </section>
  );
}
