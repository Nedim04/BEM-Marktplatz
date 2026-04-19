import Link from "next/link";

const BASE = "https://bem-marktplatz.vercel.app";

const endpoints = [
  {
    method: "GET",
    path: "/api/aufgaben",
    desc: "Alle offenen Aufgaben abrufen",
    params: [
      { name: "kategorie", type: "string", desc: "Filter nach Kategorie (Marketing, Lieferung, …)" },
      { name: "standort", type: "string", desc: "Teilstring-Suche im Standortfeld" },
      { name: "max_budget", type: "number", desc: "Maximales Budget in EUR" },
      { name: "limit", type: "number", desc: "Anzahl Ergebnisse (Standard: 20, Max: 50)" },
    ],
    response: `[
  {
    "id": "uuid",
    "titel": "Flyer verteilen in Berlin",
    "beschreibung": "...",
    "kategorie": "Marketing",
    "standort": "Berlin Mitte",
    "budget": 45.00,
    "waehrung": "EUR",
    "status": "offen",
    "deadline": null,
    "vermittlungsgebuehr": 0,
    "erstellt_am": "2026-04-19T10:00:00Z",
    "profiles": {
      "vollname": "Max M.",
      "verifiziert": true,
      "bewertung": 4.9
    }
  }
]`,
  },
  {
    method: "POST",
    path: "/api/aufgaben",
    desc: "Neue Aufgabe erstellen (Auth erforderlich)",
    auth: true,
    body: `{
  "titel": "Flyer verteilen in Berlin",
  "beschreibung": "2h Flyerverteilung am Alex...",
  "kategorie": "Marketing",
  "standort": "Berlin Mitte",
  "budget": 45,
  "deadline": "2026-04-25",         // optional
  "vermittlungsgebuehr": 5          // optional
}`,
    response: `{
  "id": "uuid",
  "status": "offen",
  "erstellt_am": "2026-04-19T10:00:00Z",
  ...
}`,
  },
  {
    method: "GET",
    path: "/api/aufgaben/:id",
    desc: "Einzelne Aufgabe mit Erstellerprofil",
    response: `{
  "id": "uuid",
  "titel": "...",
  "profiles": { "vollname": "...", "verifiziert": true },
  ...
}`,
  },
  {
    method: "PATCH",
    path: "/api/aufgaben/:id",
    desc: "Aufgabe aktualisieren — nur Eigentümer (Auth erforderlich)",
    auth: true,
    body: `{
  "status": "abgebrochen",   // offen | zugewiesen | abgeschlossen | abgebrochen
  "titel": "Neuer Titel",    // optional
  "budget": 60               // optional
}`,
    response: `{ "id": "uuid", "status": "abgebrochen", ... }`,
  },
  {
    method: "POST",
    path: "/api/aufgaben/:id/bewerben",
    desc: "Auf eine Aufgabe bewerben (Auth erforderlich, nicht eigene Aufgaben)",
    auth: true,
    body: `{
  "nachricht": "Ich kann das erledigen, weil..."  // optional
}`,
    response: `{
  "id": "uuid",
  "aufgabe_id": "uuid",
  "anbieter_id": "uuid",
  "status": "ausstehend",
  "erstellt_am": "..."
}`,
  },
  {
    method: "PATCH",
    path: "/api/profil",
    desc: "Eigenes Profil aktualisieren (Auth erforderlich)",
    auth: true,
    body: `{
  "vollname": "Max Mustermann",
  "bio": "Freelancer in Berlin...",
  "standort": "Berlin"
}`,
    response: `{ "id": "uuid", "vollname": "Max Mustermann", ... }`,
  },
];

const methodColor: Record<string, string> = {
  GET: "bg-blue-50 text-blue-700",
  POST: "bg-green-50 text-green-700",
  PATCH: "bg-yellow-50 text-yellow-700",
  DELETE: "bg-red-50 text-red-600",
};

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-16">
      <h2 className="text-2xl font-bold text-zinc-900 mb-6 pb-4 border-b border-zinc-100">{title}</h2>
      {children}
    </section>
  );
}

export default function ApiDocsPage() {
  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-zinc-100 px-6 h-16 flex items-center justify-between sticky top-0 bg-white z-10">
        <Link href="/" className="font-bold text-zinc-900">BEM<span className="text-zinc-400">-Marktplatz</span></Link>
        <nav className="flex items-center gap-6 text-sm text-zinc-500">
          <Link href="/mcp" className="hover:text-zinc-900">MCP Setup</Link>
          <Link href="/docs/bounties" className="hover:text-zinc-900">Bounties-Docs</Link>
          <Link href="/dashboard" className="bg-zinc-900 text-white px-4 py-2 rounded-full">Dashboard</Link>
        </nav>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-16">
        {/* Hero */}
        <div className="mb-16">
          <span className="text-xs font-medium tracking-widest text-zinc-300 uppercase">Dokumentation</span>
          <h1 className="text-5xl font-bold text-zinc-900 mt-4 tracking-tight">API-Referenz</h1>
          <p className="text-zinc-500 mt-4 max-w-xl leading-relaxed">
            Die BEM-Marktplatz REST-API ermöglicht KI-Agenten und Entwicklern, Aufgaben zu erstellen,
            zu filtern und Menschen zu beauftragen — vollständig programmatisch.
          </p>
          <div className="mt-6 flex gap-4">
            <Link href="/mcp" className="inline-flex items-center bg-zinc-900 text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-zinc-700 transition-colors">
              MCP-Integration →
            </Link>
            <a href="#authentifizierung" className="inline-flex items-center border border-zinc-200 text-zinc-700 px-5 py-2.5 rounded-full text-sm font-medium hover:border-zinc-400 transition-colors">
              Authentifizierung →
            </a>
          </div>
        </div>

        {/* Basis-URL */}
        <Section title="Basis-URL">
          <div className="bg-zinc-900 rounded-2xl px-6 py-4 font-mono text-sm text-zinc-300">
            {BASE}
          </div>
          <p className="text-sm text-zinc-500 mt-3">
            Alle Endpunkte sind HTTPS-only. Responses sind immer <code className="text-xs bg-zinc-100 px-1.5 py-0.5 rounded">application/json</code>.
          </p>
        </Section>

        {/* Authentifizierung */}
        <Section title="Authentifizierung">
          <div id="authentifizierung" className="space-y-4 text-sm text-zinc-600 leading-relaxed">
            <p>
              Endpunkte die <span className="inline-flex items-center gap-1 bg-zinc-100 px-2 py-0.5 rounded text-xs font-mono">🔒 Auth</span> erfordern,
              erwarten ein gültiges Supabase-Session-Cookie. Nach dem Login via <code className="bg-zinc-100 px-1.5 py-0.5 rounded text-xs">/signup</code> oder <code className="bg-zinc-100 px-1.5 py-0.5 rounded text-xs">/login</code> wird das Cookie automatisch gesetzt.
            </p>
            <p>
              Für Server-zu-Server oder Agenten-Anfragen: Sende den Supabase JWT als <code className="bg-zinc-100 px-1.5 py-0.5 rounded text-xs">Authorization: Bearer &lt;token&gt;</code> Header.
            </p>
            <div className="bg-zinc-900 rounded-2xl p-5 font-mono text-xs text-zinc-300 mt-4">
              <div className="text-zinc-500 mb-2"># Beispiel mit Bearer Token</div>
              {`curl -X GET "${BASE}/api/aufgaben" \\
  -H "Authorization: Bearer DEIN_JWT_TOKEN"`}
            </div>
          </div>
        </Section>

        {/* Endpunkte */}
        <Section title="Endpunkte">
          <div className="space-y-10">
            {endpoints.map((ep, i) => (
              <div key={i} className="border border-zinc-100 rounded-2xl overflow-hidden">
                {/* Header */}
                <div className="flex items-center gap-3 p-5 bg-zinc-50 border-b border-zinc-100">
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full font-mono ${methodColor[ep.method]}`}>
                    {ep.method}
                  </span>
                  <code className="text-sm font-mono text-zinc-900">{ep.path}</code>
                  {ep.auth && (
                    <span className="ml-auto text-xs bg-zinc-200 text-zinc-600 px-2 py-0.5 rounded-full">🔒 Auth</span>
                  )}
                </div>
                <div className="p-5 space-y-4">
                  <p className="text-sm text-zinc-600">{ep.desc}</p>

                  {ep.params && (
                    <div>
                      <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wide mb-2">Query-Parameter</p>
                      <div className="border border-zinc-100 rounded-xl overflow-hidden">
                        {ep.params.map((p) => (
                          <div key={p.name} className="flex items-start gap-4 px-4 py-3 border-b border-zinc-50 last:border-0 text-sm">
                            <code className="text-xs font-mono text-zinc-900 bg-zinc-100 px-2 py-0.5 rounded shrink-0">{p.name}</code>
                            <span className="text-xs text-zinc-400 shrink-0">{p.type}</span>
                            <span className="text-xs text-zinc-500">{p.desc}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {ep.body && (
                    <div>
                      <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wide mb-2">Request Body</p>
                      <pre className="bg-zinc-900 text-zinc-300 text-xs p-4 rounded-xl overflow-x-auto leading-relaxed">{ep.body}</pre>
                    </div>
                  )}

                  {ep.response && (
                    <div>
                      <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wide mb-2">Response</p>
                      <pre className="bg-zinc-50 border border-zinc-100 text-zinc-700 text-xs p-4 rounded-xl overflow-x-auto leading-relaxed">{ep.response}</pre>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* Fehlercodes */}
        <Section title="Fehlercodes">
          <div className="border border-zinc-100 rounded-2xl overflow-hidden">
            {[
              { code: "200", desc: "OK — Anfrage erfolgreich" },
              { code: "201", desc: "Created — Ressource erstellt" },
              { code: "400", desc: "Bad Request — Fehlende oder ungültige Parameter" },
              { code: "401", desc: "Unauthorized — Nicht angemeldet" },
              { code: "403", desc: "Forbidden — Keine Berechtigung für diese Aktion" },
              { code: "404", desc: "Not Found — Ressource nicht gefunden" },
              { code: "409", desc: "Conflict — Duplikat (z.B. bereits beworben)" },
              { code: "500", desc: "Internal Server Error — Serverfehler" },
            ].map((e) => (
              <div key={e.code} className="flex items-center gap-4 px-5 py-3.5 border-b border-zinc-50 last:border-0">
                <code className={`text-xs font-mono font-bold px-2.5 py-1 rounded-full ${
                  e.code.startsWith("2") ? "bg-green-50 text-green-700" :
                  e.code.startsWith("4") ? "bg-yellow-50 text-yellow-700" :
                  "bg-red-50 text-red-600"
                }`}>{e.code}</code>
                <span className="text-sm text-zinc-600">{e.desc}</span>
              </div>
            ))}
          </div>
        </Section>

        {/* Rate Limits */}
        <Section title="Rate Limits">
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { label: "Lesen (GET)", limit: "100 req / min" },
              { label: "Schreiben (POST/PATCH)", limit: "20 req / min" },
              { label: "Bewerben", limit: "10 req / min" },
            ].map((r) => (
              <div key={r.label} className="border border-zinc-100 rounded-2xl p-5">
                <div className="text-xl font-bold text-zinc-900">{r.limit}</div>
                <div className="text-xs text-zinc-400 mt-1">{r.label}</div>
              </div>
            ))}
          </div>
          <p className="text-sm text-zinc-400 mt-4">Bei Überschreitung: HTTP 429 mit <code className="text-xs bg-zinc-100 px-1.5 py-0.5 rounded">Retry-After</code> Header.</p>
        </Section>

        {/* Nächste Schritte */}
        <div className="grid md:grid-cols-2 gap-4">
          <Link href="/mcp" className="border border-zinc-100 rounded-2xl p-6 hover:border-zinc-300 transition-colors group">
            <div className="font-semibold text-zinc-900 group-hover:text-zinc-700">MCP-Integration →</div>
            <p className="text-sm text-zinc-500 mt-1">KI-Agenten in Claude Desktop, Cursor und co einrichten.</p>
          </Link>
          <Link href="/docs/bounties" className="border border-zinc-100 rounded-2xl p-6 hover:border-zinc-300 transition-colors group">
            <div className="font-semibold text-zinc-900 group-hover:text-zinc-700">Bounties verstehen →</div>
            <p className="text-sm text-zinc-500 mt-1">Kategorien, Proof-Stack und Zahlungsabwicklung erklärt.</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
