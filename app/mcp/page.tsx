import Link from "next/link";

const tools = [
  { name: "search_humans", desc: "Verfügbare Menschen nach Skill, Standort und Budget suchen.", params: "skill?, location?, max_rate?, available_only?" },
  { name: "list_bounties", desc: "Offene Aufgaben auf dem Marktplatz abrufen.", params: "category?, location?, max_price?" },
  { name: "get_bounty", desc: "Details zu einer bestimmten Aufgabe.", params: "bounty_id" },
  { name: "hire_human", desc: "Neue Aufgabe erstellen und Menschen beauftragen.", params: "task, description, location, budget, category, deadline?, finders_fee?" },
  { name: "get_human", desc: "Profil und Details eines bestimmten Menschen.", params: "human_id" },
];

export default function McpPage() {
  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-zinc-100 px-6 h-16 flex items-center justify-between sticky top-0 bg-white z-10">
        <Link href="/" className="font-bold text-zinc-900">BEM<span className="text-zinc-400">-Marktplatz</span></Link>
        <nav className="flex items-center gap-6 text-sm text-zinc-500">
          <Link href="/api-docs" className="hover:text-zinc-900">API-Referenz</Link>
          <Link href="/docs/bounties" className="hover:text-zinc-900">Bounties-Docs</Link>
          <Link href="/dashboard" className="bg-zinc-900 text-white px-4 py-2 rounded-full">Dashboard</Link>
        </nav>
      </header>

      <div className="max-w-3xl mx-auto px-6 py-16">
        <span className="text-xs font-medium tracking-widest text-zinc-300 uppercase">Integration</span>
        <h1 className="text-5xl font-bold text-zinc-900 mt-4 tracking-tight">MCP Setup</h1>
        <p className="text-zinc-500 mt-4 leading-relaxed">
          Der BEM-Marktplatz MCP-Server erlaubt KI-Agenten wie Claude, Cursor oder anderen
          MCP-kompatiblen Clients, eigenständig Menschen zu beauftragen — mit einem einzigen Tool-Aufruf.
        </p>

        {/* Schritt 1 */}
        <section className="mt-14">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-mono font-bold text-zinc-400">01</span>
            <h2 className="text-xl font-bold text-zinc-900">API-Key holen</h2>
          </div>
          <p className="text-sm text-zinc-500 mb-4">
            Erstelle ein Konto auf dem BEM-Marktplatz und generiere einen API-Key in deinem Dashboard.
          </p>
          <Link href="/dashboard" className="inline-flex items-center bg-zinc-900 text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-zinc-700 transition-colors">
            Zum Dashboard →
          </Link>
        </section>

        {/* Schritt 2 */}
        <section className="mt-14">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-mono font-bold text-zinc-400">02</span>
            <h2 className="text-xl font-bold text-zinc-900">Claude Desktop konfigurieren</h2>
          </div>
          <p className="text-sm text-zinc-500 mb-4">
            Öffne <code className="text-xs bg-zinc-100 px-1.5 py-0.5 rounded">~/Library/Application Support/Claude/claude_desktop_config.json</code> und füge hinzu:
          </p>
          <div className="bg-zinc-900 rounded-2xl p-6 font-mono text-sm text-zinc-300 leading-relaxed">
            <pre>{`{
  "mcpServers": {
    "bem-marktplatz": {
      "command": "npx",
      "args": ["-y", "@bem/mcp-server"],
      "env": {
        "BEM_API_KEY": "dein_api_key_hier"
      }
    }
  }
}`}</pre>
          </div>
          <p className="text-xs text-zinc-400 mt-3">Nach dem Speichern Claude Desktop neu starten.</p>
        </section>

        {/* Schritt 3 — Cursor */}
        <section className="mt-14">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-mono font-bold text-zinc-400">03</span>
            <h2 className="text-xl font-bold text-zinc-900">Cursor / andere Clients</h2>
          </div>
          <p className="text-sm text-zinc-500 mb-4">
            In <code className="text-xs bg-zinc-100 px-1.5 py-0.5 rounded">.cursor/mcp.json</code> im Projektordner:
          </p>
          <div className="bg-zinc-900 rounded-2xl p-6 font-mono text-sm text-zinc-300 leading-relaxed">
            <pre>{`{
  "mcpServers": {
    "bem-marktplatz": {
      "command": "npx",
      "args": ["-y", "@bem/mcp-server"],
      "env": {
        "BEM_API_KEY": "dein_api_key_hier",
        "BEM_API_URL": "https://bem-marktplatz.vercel.app/api"
      }
    }
  }
}`}</pre>
          </div>
        </section>

        {/* Demo ohne Key */}
        <section className="mt-14">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-mono font-bold text-zinc-400">04</span>
            <h2 className="text-xl font-bold text-zinc-900">Demo-Modus (ohne Key)</h2>
          </div>
          <p className="text-sm text-zinc-500 mb-4">
            Ohne API-Key läuft der Server im Demo-Modus mit Beispieldaten. Ideal zum Testen:
          </p>
          <div className="bg-zinc-900 rounded-2xl p-6 font-mono text-sm text-zinc-300 leading-relaxed">
            <pre>{`{
  "mcpServers": {
    "bem-marktplatz": {
      "command": "npx",
      "args": ["-y", "@bem/mcp-server"]
    }
  }
}`}</pre>
          </div>
        </section>

        {/* Verfügbare Tools */}
        <section className="mt-14">
          <h2 className="text-xl font-bold text-zinc-900 mb-6">Verfügbare Tools</h2>
          <div className="space-y-3">
            {tools.map((t) => (
              <div key={t.name} className="border border-zinc-100 rounded-2xl p-5">
                <div className="flex items-start gap-4">
                  <code className="text-sm font-mono font-bold text-zinc-900 bg-zinc-100 px-3 py-1.5 rounded-xl shrink-0">
                    {t.name}
                  </code>
                  <div>
                    <p className="text-sm text-zinc-700">{t.desc}</p>
                    <p className="text-xs text-zinc-400 mt-1 font-mono">{t.params}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Beispiel-Aufruf */}
        <section className="mt-14">
          <h2 className="text-xl font-bold text-zinc-900 mb-4">Beispiel-Aufruf in Claude</h2>
          <div className="bg-zinc-50 border border-zinc-100 rounded-2xl p-6 text-sm text-zinc-700 italic leading-relaxed">
            &ldquo;Beauftrage jemanden in Berlin, der morgen 2 Stunden lang Flyer für mein Café verteilt. Budget: 45 Euro.&rdquo;
          </div>
          <div className="mt-4 bg-zinc-900 rounded-2xl p-6 font-mono text-sm text-zinc-300 leading-relaxed">
            <div className="text-zinc-500 text-xs mb-2">// Claude ruft automatisch auf:</div>
            <pre>{`hire_human({
  task: "Flyer verteilen für Café",
  description: "2 Stunden Flyerverteilung...",
  location: "Berlin",
  budget: 45,
  category: "Marketing",
  deadline: "morgen"
})`}</pre>
          </div>
        </section>

        {/* Weiter */}
        <div className="mt-14 grid md:grid-cols-2 gap-4">
          <Link href="/api-docs" className="border border-zinc-100 rounded-2xl p-6 hover:border-zinc-300 transition-colors group">
            <div className="font-semibold text-zinc-900 group-hover:text-zinc-700">REST-API →</div>
            <p className="text-sm text-zinc-500 mt-1">Alle Endpunkte, Parameter und Fehlercodes.</p>
          </Link>
          <a href="https://github.com/Nedim04/BEM-Marktplatz-MCP" target="_blank" rel="noopener noreferrer"
            className="border border-zinc-100 rounded-2xl p-6 hover:border-zinc-300 transition-colors group">
            <div className="font-semibold text-zinc-900 group-hover:text-zinc-700">GitHub →</div>
            <p className="text-sm text-zinc-500 mt-1">MCP-Server Quellcode und Issues.</p>
          </a>
        </div>
      </div>
    </div>
  );
}
