export const dynamic = "force-dynamic";

import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import BountiesFilter from "./BountiesFilter";

const KATEGORIEN = ["Alle", "Marketing", "Lieferung", "Recherche", "Events", "Fotografie", "Haushalt", "Sonstiges"];

export default async function BountiesPage({
  searchParams,
}: {
  searchParams: Promise<{ kategorie?: string; standort?: string; max?: string }>;
}) {
  const params = await searchParams;
  const supabase = await createClient();

  let query = supabase
    .from("aufgaben")
    .select("*, profiles(vollname, verifiziert)")
    .eq("status", "offen")
    .order("erstellt_am", { ascending: false });

  if (params.kategorie && params.kategorie !== "Alle") query = query.eq("kategorie", params.kategorie);
  if (params.standort) query = query.ilike("standort", `%${params.standort}%`);
  if (params.max) query = query.lte("budget", parseFloat(params.max));

  const { data: aufgaben, error } = await query.limit(50);

  const kategorieEmoji: Record<string, string> = {
    Marketing: "📢", Lieferung: "📦", Recherche: "🔍",
    Events: "🎪", Fotografie: "📸", Haushalt: "🏠", Sonstiges: "✏️",
  };

  return (
    <div className="min-h-screen bg-zinc-50">
      <header className="bg-white border-b border-zinc-100 px-6 h-16 flex items-center justify-between sticky top-0 z-10">
        <Link href="/" className="font-bold text-zinc-900">
          BEM<span className="text-zinc-400">-Marktplatz</span>
        </Link>
        <div className="flex items-center gap-4">
          <Link href="/aufgaben/neu" className="text-sm text-zinc-500 hover:text-zinc-900">Aufgabe erstellen</Link>
          <Link href="/dashboard" className="text-sm bg-zinc-900 text-white px-4 py-2 rounded-full">Dashboard</Link>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="mb-10">
          <span className="text-xs text-zinc-400 uppercase tracking-widest">Marktplatz</span>
          <h1 className="text-4xl font-bold text-zinc-900 mt-2">Offene Aufgaben</h1>
          <p className="text-zinc-500 mt-2 text-sm">
            {aufgaben?.length ?? 0} Aufgaben verfügbar
          </p>
        </div>

        {/* Filterleiste */}
        <BountiesFilter kategorien={KATEGORIEN} current={params} />

        {/* Ergebnisse */}
        {error ? (
          <div className="text-center py-20 text-zinc-400 text-sm">
            Fehler beim Laden. Bitte Seite neu laden.
          </div>
        ) : !aufgaben || aufgaben.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-zinc-400 text-sm mb-4">Keine Aufgaben gefunden.</p>
            <Link href="/bounties" className="text-sm text-zinc-900 underline underline-offset-2">Filter zurücksetzen</Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
            {aufgaben.map((a) => (
              <Link
                key={a.id}
                href={`/aufgaben/${a.id}`}
                className="group bg-white border border-zinc-100 rounded-2xl p-6 hover:border-zinc-300 hover:shadow-sm transition-all"
              >
                <div className="flex items-start justify-between gap-2 mb-3">
                  <span className="text-xs font-medium text-zinc-400 uppercase tracking-wide">
                    {kategorieEmoji[a.kategorie] ?? "✏️"} {a.kategorie}
                  </span>
                  {Boolean((a.profiles as Record<string, unknown>)?.verifiziert) && (
                    <span className="text-xs text-blue-500">✓</span>
                  )}
                </div>

                <h3 className="font-semibold text-zinc-900 leading-snug group-hover:text-zinc-700 transition-colors">
                  {a.titel}
                </h3>

                <p className="text-xs text-zinc-400 mt-2 line-clamp-2 leading-relaxed">
                  {a.beschreibung}
                </p>

                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-zinc-900">{a.budget} €</span>
                    {a.vermittlungsgebuehr > 0 && (
                      <span className="text-xs text-green-600 font-medium">+{a.vermittlungsgebuehr} € Tipp</span>
                    )}
                  </div>
                  <span className="text-xs text-zinc-400">📍 {a.standort}</span>
                </div>

                {a.deadline && (
                  <p className="text-xs text-zinc-300 mt-2">
                    Deadline: {new Date(a.deadline).toLocaleDateString("de-DE")}
                  </p>
                )}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
