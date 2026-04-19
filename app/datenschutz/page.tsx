import Link from "next/link";

export default function DatenschutzPage() {
  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-zinc-100 px-6 h-16 flex items-center justify-between sticky top-0 bg-white z-10">
        <Link href="/" className="font-bold text-zinc-900">BEM<span className="text-zinc-400">-Marktplatz</span></Link>
      </header>

      <div className="max-w-2xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold text-zinc-900 mb-2">Datenschutzerklärung</h1>
        <p className="text-sm text-zinc-400 mb-10">Stand: April 2026 · gemäß DSGVO</p>

        {[
          {
            title: "1. Verantwortlicher",
            text: `BEM-Marktplatz UG (in Gründung)
Deutschland
E-Mail: datenschutz@bem-marktplatz.de`,
          },
          {
            title: "2. Erhobene Daten und Zwecke",
            text: `Wir verarbeiten folgende personenbezogene Daten:

• Stammdaten: Name, E-Mail-Adresse (bei Registrierung)
• Standortdaten: Nur bei Aufgabenausführung, mit ausdrücklicher Zustimmung
• Nutzungsdaten: IP-Adresse, Seitenaufrufe, Gerätedaten (anonymisiert)
• Zahlungsdaten: Abrechnungsrelevante Informationen via Zahlungsdienstleister

Zweck: Vertragsabwicklung, Sicherheit der Plattform, gesetzliche Pflichten.`,
          },
          {
            title: "3. Rechtsgrundlagen",
            text: `Die Verarbeitung erfolgt auf Basis von:
• Art. 6 Abs. 1 lit. b DSGVO (Vertragserfüllung)
• Art. 6 Abs. 1 lit. c DSGVO (gesetzliche Verpflichtung)
• Art. 6 Abs. 1 lit. f DSGVO (berechtigte Interessen)`,
          },
          {
            title: "4. Drittanbieter und Hosting",
            text: `Wir nutzen folgende Drittanbieter:

• Supabase (Authentifizierung und Datenbank) — Server in der EU
• Vercel Inc. (Hosting) — Server in Frankfurt, DE
• Stripe (Zahlungsabwicklung, geplant) — gemäß eigener Datenschutzerklärung

Alle Anbieter haben wir vertraglich zur DSGVO-konformen Verarbeitung verpflichtet.`,
          },
          {
            title: "5. Speicherdauer",
            text: `Wir speichern personenbezogene Daten nur so lange, wie es für den jeweiligen Zweck erforderlich ist oder gesetzlich vorgeschrieben.

Kontodaten: Bis zur Löschung durch den Nutzer oder 2 Jahre nach letzter Aktivität.
Transaktionsdaten: 10 Jahre gemäß Steuerrecht (HGB § 257).`,
          },
          {
            title: "6. Deine Rechte",
            text: `Du hast folgende Rechte gegenüber uns:

• Auskunft (Art. 15 DSGVO)
• Berichtigung (Art. 16 DSGVO)
• Löschung (Art. 17 DSGVO)
• Einschränkung der Verarbeitung (Art. 18 DSGVO)
• Datenübertragbarkeit (Art. 20 DSGVO)
• Widerspruch (Art. 21 DSGVO)

Anfragen an: datenschutz@bem-marktplatz.de`,
          },
          {
            title: "7. Cookies",
            text: `Wir verwenden ausschließlich technisch notwendige Cookies (Session-Cookie für die Authentifizierung). Tracking- oder Marketing-Cookies werden nicht eingesetzt.`,
          },
          {
            title: "8. Beschwerderecht",
            text: `Du hast das Recht, dich bei der zuständigen Datenschutzaufsichtsbehörde zu beschweren. Für Deutschland ist dies der Bundesbeauftragte für den Datenschutz und die Informationsfreiheit (BfDI).`,
          },
        ].map((s) => (
          <section key={s.title} className="mb-8">
            <h2 className="text-lg font-bold text-zinc-900 mb-3">{s.title}</h2>
            <p className="text-sm text-zinc-600 leading-relaxed whitespace-pre-line">{s.text}</p>
          </section>
        ))}

        <div className="mt-10 pt-8 border-t border-zinc-100 text-sm text-zinc-400">
          <Link href="/impressum" className="underline">Impressum</Link> · <Link href="/agb" className="underline">AGB</Link> · <Link href="/support" className="underline">Support</Link>
        </div>
      </div>
    </div>
  );
}
