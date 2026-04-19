"use client";
import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";

export default function BountiesFilter({
  kategorien,
  current,
}: {
  kategorien: string[];
  current: { kategorie?: string; standort?: string; max?: string };
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [standort, setStandort] = useState(current.standort ?? "");
  const [max, setMax] = useState(current.max ?? "");

  function apply(overrides: Record<string, string>) {
    const p = new URLSearchParams();
    const vals = { kategorie: current.kategorie ?? "", standort, max, ...overrides };
    if (vals.kategorie && vals.kategorie !== "Alle") p.set("kategorie", vals.kategorie);
    if (vals.standort) p.set("standort", vals.standort);
    if (vals.max) p.set("max", vals.max);
    router.push(`${pathname}?${p.toString()}`);
  }

  return (
    <div className="space-y-4">
      {/* Kategorie-Tabs */}
      <div className="flex flex-wrap gap-2">
        {kategorien.map((k) => (
          <button
            key={k}
            onClick={() => apply({ kategorie: k })}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              (current.kategorie ?? "Alle") === k
                ? "bg-zinc-900 text-white"
                : "bg-white border border-zinc-200 text-zinc-600 hover:border-zinc-400"
            }`}
          >
            {k}
          </button>
        ))}
      </div>

      {/* Standort + Budget */}
      <div className="flex flex-wrap gap-3">
        <input
          type="text"
          placeholder="Standort filtern…"
          value={standort}
          onChange={(e) => setStandort(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && apply({})}
          className="border border-zinc-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900"
        />
        <input
          type="number"
          placeholder="Max. Budget (€)"
          value={max}
          onChange={(e) => setMax(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && apply({})}
          className="border border-zinc-200 rounded-xl px-4 py-2 text-sm w-40 focus:outline-none focus:ring-2 focus:ring-zinc-900"
        />
        <button
          onClick={() => apply({})}
          className="bg-zinc-900 text-white px-5 py-2 rounded-xl text-sm font-medium hover:bg-zinc-700 transition-colors"
        >
          Filtern →
        </button>
        {(current.kategorie || current.standort || current.max) && (
          <button
            onClick={() => { setStandort(""); setMax(""); router.push(pathname); }}
            className="text-sm text-zinc-400 hover:text-zinc-700 transition-colors px-2"
          >
            Zurücksetzen
          </button>
        )}
      </div>
    </div>
  );
}
