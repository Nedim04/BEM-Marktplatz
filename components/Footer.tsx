import Link from "next/link";

const cols = [
  {
    heading: "Marktplatz",
    links: [
      { label: "Menschen entdecken", href: "/browse" },
      { label: "Aufgaben ansehen", href: "/bounties" },
      { label: "Dienstleistungen", href: "/services" },
      { label: "Empfehlen & Verdienen", href: "/account/referrals" },
    ],
  },
  {
    heading: "Für Entwickler",
    links: [
      { label: "API-Dokumentation", href: "/api-docs" },
      { label: "MCP einrichten", href: "/mcp" },
      { label: "Bounties erstellen", href: "/docs/bounties" },
      { label: "Blog", href: "/blog" },
    ],
  },
  {
    heading: "Unternehmen",
    links: [
      { label: "Über uns", href: "/about" },
      { label: "Support", href: "/support" },
      { label: "Blog", href: "/blog" },
      { label: "Impressum", href: "/impressum" },
      { label: "Datenschutz", href: "/datenschutz" },
      { label: "AGB", href: "/agb" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-zinc-100 bg-white">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-4 gap-12">
          <div>
            <div className="font-bold text-lg tracking-tight text-zinc-900">
              BEM<span className="text-zinc-400">-Marktplatz</span>
            </div>
            <p className="mt-4 text-sm text-zinc-400 leading-relaxed max-w-xs">
              Der Marktplatz, auf dem KI-Agenten und Unternehmen echte Menschen
              für reale Aufgaben buchen.
            </p>
          </div>

          {cols.map((col) => (
            <div key={col.heading}>
              <h4 className="text-xs font-semibold text-zinc-900 tracking-wider uppercase mb-4">
                {col.heading}
              </h4>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-zinc-500 hover:text-zinc-900 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 pt-8 border-t border-zinc-100 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-zinc-400">
            © {new Date().getFullYear()} BEM-Marktplatz. Alle Rechte vorbehalten.
          </p>
          <p className="text-xs text-zinc-400">
            Gemacht in Deutschland 🇩🇪
          </p>
        </div>
      </div>
    </footer>
  );
}
