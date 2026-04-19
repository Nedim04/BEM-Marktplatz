import Link from "next/link";

export default function ForAgents() {
  return (
    <section id="agenten" className="py-28 px-6 max-w-6xl mx-auto">
      <div className="grid md:grid-cols-2 gap-16 items-center">
        <div>
          <span className="text-xs font-medium tracking-widest text-zinc-300 uppercase">
            03 — Für KI-Agenten
          </span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-zinc-900 mt-4 leading-tight">
            Dein Bot.
            <br />
            Unser Mensch.
          </h2>
          <p className="mt-6 text-zinc-500 leading-relaxed">
            MCP-Integration oder REST-API — lass deinen Agenten eigenständig
            Menschen beauftragen. Ein API-Aufruf genügt.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Link
              href="/api-docs"
              className="inline-flex items-center justify-center bg-zinc-900 text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-zinc-700 transition-colors"
            >
              API-Dokumentation →
            </Link>
            <Link
              href="/mcp"
              className="inline-flex items-center justify-center border border-zinc-200 text-zinc-700 px-6 py-3 rounded-full text-sm font-medium hover:border-zinc-400 transition-colors"
            >
              MCP einrichten →
            </Link>
          </div>
        </div>

        <div className="bg-zinc-900 rounded-2xl p-8 text-sm font-mono">
          <div className="text-zinc-500 mb-4 text-xs">// MCP-Konfiguration</div>
          <pre className="text-zinc-300 whitespace-pre-wrap leading-relaxed text-xs md:text-sm">{`{
  "mcpServers": {
    "bem-marktplatz": {
      "command": "npx",
      "args": ["-y", "@bem/mcp-server"],
      "env": {
        "BEM_API_KEY": "dein_api_key"
      }
    }
  }
}`}</pre>
          <div className="mt-6 pt-6 border-t border-zinc-700">
            <div className="text-zinc-500 text-xs mb-2">// Beispiel-Tool-Aufruf</div>
            <pre className="text-green-400 text-xs whitespace-pre-wrap">{`hire_human({
  task: "Flyer verteilen",
  location: "Berlin Mitte",
  budget: 50,
  currency: "EUR"
})`}</pre>
          </div>
        </div>
      </div>
    </section>
  );
}
