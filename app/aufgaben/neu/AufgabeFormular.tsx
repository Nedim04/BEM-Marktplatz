"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const KATEGORIEN = ["Marketing", "Lieferung", "Recherche", "Events", "Fotografie", "Haushalt", "Sonstiges"];

const KATEGORIEN_INFO: Record<string, string> = {
  Marketing: "Flyer, Schild halten, Street Team, Promo-Aktionen",
  Lieferung: "Abholen, Zustellen, Botengänge",
  Recherche: "Vor-Ort-Check, Mystery Shopping, Preisvergleich",
  Events: "Aufbau, Betreuung, Dokumentation",
  Fotografie: "Fotos vor Ort, Zeitraffer, Kurzclips",
  Haushalt: "Hund spazieren, Einkauf, persönliche Erledigungen",
  Sonstiges: "Alles andere",
};

export default function AufgabeFormular() {
  const router = useRouter();
  const [form, setForm] = useState({
    titel: "",
    beschreibung: "",
    kategorie: "",
    standort: "",
    budget: "",
    deadline: "",
    vermittlungsgebuehr: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  function set(key: string, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const res = await fetch("/api/aufgaben", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        budget: parseFloat(form.budget),
        vermittlungsgebuehr: form.vermittlungsgebuehr ? parseFloat(form.vermittlungsgebuehr) : 0,
        deadline: form.deadline || null,
      }),
    });

    if (!res.ok) {
      const data = await res.json();
      setError(data.error ?? "Fehler beim Erstellen");
      setLoading(false);
      return;
    }

    const aufgabe = await res.json();
    router.push(`/aufgaben/${aufgabe.id}`);
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-zinc-100 p-8 space-y-6">
      {/* Titel */}
      <div>
        <label className="block text-sm font-medium text-zinc-700 mb-1.5">
          Aufgabentitel <span className="text-red-400">*</span>
        </label>
        <input
          type="text"
          required
          value={form.titel}
          onChange={(e) => set("titel", e.target.value)}
          placeholder="z.B. Flyer in der Berliner Innenstadt verteilen"
          className="w-full border border-zinc-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900"
        />
      </div>

      {/* Kategorie */}
      <div>
        <label className="block text-sm font-medium text-zinc-700 mb-2">
          Kategorie <span className="text-red-400">*</span>
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {KATEGORIEN.map((k) => (
            <button
              key={k}
              type="button"
              onClick={() => set("kategorie", k)}
              className={`text-left border rounded-xl px-3 py-2.5 transition-all ${
                form.kategorie === k
                  ? "border-zinc-900 bg-zinc-900 text-white"
                  : "border-zinc-200 hover:border-zinc-400"
              }`}
            >
              <div className={`text-sm font-medium ${form.kategorie === k ? "text-white" : "text-zinc-900"}`}>{k}</div>
              <div className={`text-xs mt-0.5 leading-tight ${form.kategorie === k ? "text-zinc-400" : "text-zinc-400"}`}>
                {KATEGORIEN_INFO[k]}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Beschreibung */}
      <div>
        <label className="block text-sm font-medium text-zinc-700 mb-1.5">
          Beschreibung <span className="text-red-400">*</span>
        </label>
        <textarea
          required
          rows={5}
          value={form.beschreibung}
          onChange={(e) => set("beschreibung", e.target.value)}
          placeholder="Was genau soll getan werden? Welche Anforderungen gibt es? Wie wird Erledigung nachgewiesen?"
          className="w-full border border-zinc-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900 resize-none"
        />
      </div>

      {/* Standort + Budget */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-zinc-700 mb-1.5">
            Standort <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            required
            value={form.standort}
            onChange={(e) => set("standort", e.target.value)}
            placeholder="Berlin Mitte oder Remote"
            className="w-full border border-zinc-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-zinc-700 mb-1.5">
            Budget (€) <span className="text-red-400">*</span>
          </label>
          <input
            type="number"
            required
            min="1"
            step="0.01"
            value={form.budget}
            onChange={(e) => set("budget", e.target.value)}
            placeholder="z.B. 45"
            className="w-full border border-zinc-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900"
          />
        </div>
      </div>

      {/* Deadline + Vermittlungsgebühr */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-zinc-700 mb-1.5">Deadline</label>
          <input
            type="date"
            value={form.deadline}
            onChange={(e) => set("deadline", e.target.value)}
            className="w-full border border-zinc-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-zinc-700 mb-1.5">
            Vermittlungsgebühr (€)
          </label>
          <input
            type="number"
            min="0"
            step="0.01"
            value={form.vermittlungsgebuehr}
            onChange={(e) => set("vermittlungsgebuehr", e.target.value)}
            placeholder="Optional, z.B. 5"
            className="w-full border border-zinc-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900"
          />
          <p className="text-xs text-zinc-400 mt-1">Betrag für Empfehlungen</p>
        </div>
      </div>

      {error && (
        <p className="text-sm text-red-500 bg-red-50 rounded-xl px-4 py-3">{error}</p>
      )}

      <button
        type="submit"
        disabled={loading || !form.kategorie}
        className="w-full bg-zinc-900 text-white py-3.5 rounded-xl text-sm font-medium hover:bg-zinc-700 transition-colors disabled:opacity-50"
      >
        {loading ? "Wird erstellt…" : "Aufgabe veröffentlichen →"}
      </button>
    </form>
  );
}
