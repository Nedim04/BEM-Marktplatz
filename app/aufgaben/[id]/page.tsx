export const dynamic = "force-dynamic";

import { notFound } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import BewerbungsFormular from "./BewerbungsFormular";

export default async function AufgabeDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: aufgabe } = await supabase
    .from("aufgaben")
    .select("*, profiles(vollname, verifiziert, bewertung, standort)")
    .eq("id", id)
    .single();

  if (!aufgabe) notFound();

  const { data: { user } } = await supabase.auth.getUser();

  const { data: existierendeBewerbung } = user
    ? await supabase
        .from("bewerbungen")
        .select("id, status")
        .eq("aufgabe_id", id)
        .eq("anbieter_id", user.id)
        .single()
    : { data: null };

  const istEigentümer = user?.id === aufgabe.erstellt_von;

  const { data: bewerbungen } = istEigentümer
    ? await supabase
        .from("bewerbungen")
        .select("*, profiles(vollname, standort, bewertung)")
        .eq("aufgabe_id", id)
        .order("erstellt_am", { ascending: false })
    : { data: null };

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
          {user ? (
            <Link href="/dashboard" className="text-sm text-zinc-600 hover:text-zinc-900">Dashboard</Link>
          ) : (
            <Link href="/login" className="text-sm bg-zinc-900 text-white px-4 py-2 rounded-full">Anmelden</Link>
          )}
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-10">
        <Link href="/bounties" className="text-sm text-zinc-400 hover:text-zinc-700 mb-6 inline-block">
          ← Alle Aufgaben
        </Link>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Hauptinhalt */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl border border-zinc-100 p-8">
              <div className="flex items-start justify-between gap-4 mb-6">
                <div>
                  <span className="text-xs text-zinc-400 uppercase tracking-wide">
                    {kategorieEmoji[aufgabe.kategorie] ?? "✏️"} {aufgabe.kategorie}
                  </span>
                  <h1 className="text-2xl font-bold text-zinc-900 mt-2 leading-tight">
                    {aufgabe.titel}
                  </h1>
                </div>
                <span className={`text-xs px-3 py-1.5 rounded-full font-medium shrink-0 ${
                  aufgabe.status === "offen"
                    ? "bg-green-50 text-green-700"
                    : "bg-zinc-100 text-zinc-500"
                }`}>
                  {aufgabe.status}
                </span>
              </div>

              <p className="text-zinc-600 leading-relaxed whitespace-pre-wrap">
                {aufgabe.beschreibung}
              </p>
            </div>

            {/* Bewerbungen (nur für Eigentümer) */}
            {istEigentümer && bewerbungen && (
              <div className="bg-white rounded-2xl border border-zinc-100 p-6">
                <h2 className="font-semibold text-zinc-900 mb-4">
                  Bewerbungen ({bewerbungen.length})
                </h2>
                {bewerbungen.length === 0 ? (
                  <p className="text-sm text-zinc-400">Noch keine Bewerbungen.</p>
                ) : (
                  <div className="space-y-3">
                    {bewerbungen.map((b) => (
                      <div key={b.id} className="border border-zinc-100 rounded-xl p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <p className="font-medium text-zinc-900 text-sm">
                              {(b.profiles as Record<string, unknown>)?.vollname as string ?? "Anonym"}
                            </p>
                            <p className="text-xs text-zinc-400">
                              ⭐ {String((b.profiles as Record<string, unknown>)?.bewertung ?? "Neu")} · {(b.profiles as Record<string, unknown>)?.standort as string ?? "—"}
                            </p>
                          </div>
                          <span className={`text-xs px-2.5 py-1 rounded-full ${
                            b.status === "ausstehend" ? "bg-yellow-50 text-yellow-700" :
                            b.status === "angenommen" ? "bg-green-50 text-green-700" :
                            "bg-red-50 text-red-600"
                          }`}>
                            {b.status}
                          </span>
                        </div>
                        {b.nachricht && (
                          <p className="text-sm text-zinc-500 mt-2 italic">&ldquo;{b.nachricht}&rdquo;</p>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Budget-Card */}
            <div className="bg-white rounded-2xl border border-zinc-100 p-6">
              <div className="text-3xl font-bold text-zinc-900 mb-1">
                {aufgabe.budget.toFixed(0)} €
              </div>
              <p className="text-xs text-zinc-400 mb-4">Festpreis</p>

              <div className="space-y-2 text-sm border-t border-zinc-100 pt-4">
                <div className="flex justify-between">
                  <span className="text-zinc-500">Standort</span>
                  <span className="text-zinc-900 font-medium">📍 {aufgabe.standort}</span>
                </div>
                {aufgabe.deadline && (
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Deadline</span>
                    <span className="text-zinc-900 font-medium">
                      {new Date(aufgabe.deadline).toLocaleDateString("de-DE")}
                    </span>
                  </div>
                )}
                {aufgabe.vermittlungsgebuehr > 0 && (
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Vermittlungsgebühr</span>
                    <span className="text-green-700 font-medium">+{aufgabe.vermittlungsgebuehr} €</span>
                  </div>
                )}
              </div>
            </div>

            {/* Auftraggeber-Card */}
            <div className="bg-white rounded-2xl border border-zinc-100 p-6">
              <p className="text-xs text-zinc-400 mb-2">Auftraggeber</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-zinc-100 flex items-center justify-center text-sm font-bold text-zinc-600">
                  {((aufgabe.profiles as Record<string, unknown>)?.vollname as string ?? "?")[0].toUpperCase()}
                </div>
                <div>
                  <p className="font-medium text-zinc-900 text-sm">
                    {(aufgabe.profiles as Record<string, unknown>)?.vollname as string ?? "Anonym"}
                  </p>
                  {Boolean((aufgabe.profiles as Record<string, unknown>)?.verifiziert) && (
                    <p className="text-xs text-blue-600">✓ Verifiziert</p>
                  )}
                </div>
              </div>
            </div>

            {/* Bewerbungs-Formular oder Status */}
            {!istEigentümer && aufgabe.status === "offen" && (
              <BewerbungsFormular
                aufgabeId={id}
                user={user}
                existierendeBewerbung={existierendeBewerbung}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
