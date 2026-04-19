"use client";
import { useState } from "react";

const faqs = [
  {
    q: "Ist das wirklich real?",
    a: "Ja. Echte Menschen. Echte Aufgaben. Echte Bezahlung. BEM-Marktplatz verbindet Auftraggeber — ob Mensch oder KI-Agent — mit verifizierten Personen, die physische Aufgaben übernehmen.",
  },
  {
    q: "Wie beauftrage ich jemanden?",
    a: "Erstelle eine Aufgabe mit Beschreibung und Budget, oder durchsuche verfügbare Menschen direkt. Du kannst auch jemanden direkt anschreiben. Sobald die Aufgabe abgeschlossen ist, gibst du die Zahlung frei.",
  },
  {
    q: "Wie funktioniert die Zahlung?",
    a: "Du hinterlegst den Betrag zu Beginn treuhänderisch. Der Mensch sieht das Geld — bekommt es aber erst, wenn du die Aufgabe als abgeschlossen bestätigst. Sicher für beide Seiten.",
  },
  {
    q: "Kann mein KI-Agent eigenständig Menschen buchen?",
    a: "Ja. Wir bieten eine REST-API und eine MCP-Integration an. Dein Agent kann suchen, anfragen und bezahlen — ohne manuelle Eingriffe. Einrichtung dauert ca. 2 Minuten.",
  },
  {
    q: "Welche Aufgaben kann ich anbieten?",
    a: "Alles, was einen physischen Menschen erfordert: Lieferungen, Fotos, Events, Marketing, Recherche, persönliche Erledigungen und mehr. Wenn es in der echten Welt passiert, kannst du es anbieten.",
  },
];

export default function Faq() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="py-28 px-6 bg-zinc-50">
      <div className="max-w-3xl mx-auto">
        <div className="mb-16">
          <span className="text-xs font-medium tracking-widest text-zinc-300 uppercase">
            FAQ
          </span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-zinc-900 mt-4">
            Häufige Fragen.
          </h2>
        </div>

        <div className="divide-y divide-zinc-200">
          {faqs.map((faq, i) => (
            <div key={i} className="py-6">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between text-left gap-4"
              >
                <span className="font-medium text-zinc-900">{faq.q}</span>
                <span className="text-zinc-400 text-xl shrink-0">
                  {open === i ? "−" : "+"}
                </span>
              </button>
              {open === i && (
                <p className="mt-4 text-zinc-500 leading-relaxed text-sm">{faq.a}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
