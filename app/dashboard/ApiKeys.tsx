"use client";

import { useState } from "react";

interface ApiKey {
  id: string;
  name: string;
  prefix: string;
  aktiv: boolean;
  erstellt_am: string;
}

interface Props {
  initialKeys: ApiKey[];
}

export default function ApiKeys({ initialKeys }: Props) {
  const [keys, setKeys] = useState<ApiKey[]>(initialKeys);
  const [name, setName] = useState("");
  const [newKey, setNewKey] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function createKey(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;
    setLoading(true);
    setError("");
    setNewKey(null);

    const res = await fetch("/api/apikeys", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });

    const data = await res.json() as { key?: string; id: string; name: string; prefix: string; erstellt_am: string; error?: string };

    if (!res.ok) {
      setError(data.error ?? "Fehler");
    } else {
      setNewKey(data.key ?? null);
      setKeys((prev) => [{ id: data.id, name: data.name, prefix: data.prefix, aktiv: true, erstellt_am: data.erstellt_am }, ...prev]);
      setName("");
    }
    setLoading(false);
  }

  async function deleteKey(id: string) {
    await fetch(`/api/apikeys?id=${id}`, { method: "DELETE" });
    setKeys((prev) => prev.filter((k) => k.id !== id));
  }

  return (
    <div className="bg-white rounded-2xl border border-zinc-100 p-6">
      <h2 className="font-semibold text-zinc-900 mb-1">API Keys</h2>
      <p className="text-xs text-zinc-400 mb-5">Für KI-Agenten und Drittanbieter-Integrationen.</p>

      {newKey && (
        <div className="mb-4 p-4 bg-green-50 rounded-xl border border-green-100">
          <p className="text-xs font-medium text-green-700 mb-1">Schlüssel — nur jetzt sichtbar:</p>
          <code className="text-xs break-all text-green-800 font-mono">{newKey}</code>
        </div>
      )}

      <form onSubmit={createKey} className="flex gap-2 mb-5">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name (z.B. Claude Agent)"
          className="flex-1 text-sm border border-zinc-200 rounded-lg px-3 py-2 focus:outline-none focus:border-zinc-400"
        />
        <button
          type="submit"
          disabled={loading}
          className="text-sm bg-zinc-900 text-white px-4 py-2 rounded-lg hover:bg-zinc-700 transition-colors disabled:opacity-50"
        >
          Erstellen
        </button>
      </form>

      {error && <p className="text-xs text-red-500 mb-3">{error}</p>}

      {keys.length === 0 ? (
        <p className="text-sm text-zinc-400">Noch keine API Keys.</p>
      ) : (
        <div className="space-y-2">
          {keys.map((k) => (
            <div key={k.id} className="flex items-center justify-between p-3 rounded-xl border border-zinc-100">
              <div>
                <p className="text-sm font-medium text-zinc-900">{k.name}</p>
                <p className="text-xs text-zinc-400 font-mono">{k.prefix}••••••••</p>
              </div>
              <button
                onClick={() => deleteKey(k.id)}
                className="text-xs text-zinc-400 hover:text-red-500 transition-colors"
              >
                Löschen
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
