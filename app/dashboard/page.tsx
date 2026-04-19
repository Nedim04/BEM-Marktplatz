export const dynamic = "force-dynamic";

import { redirect } from "next/navigation";
import Link from "next/link";

// Supabase wird lazy importiert, damit fehlende Env-Vars einen klaren Fehler zeigen
async function getSupabase() {
  const { createClient } = await import("@/lib/supabase/server");
  return createClient();
}

async function signOut() {
  "use server";
  const { createClient } = await import("@/lib/supabase/server");
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/");
}

export default async function DashboardPage() {
  const supabase = await getSupabase();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  const rolle = profile?.rolle ?? "anbieter";
  const isAuftraggeber = rolle === "auftraggeber";

  // Aufgaben laden
  const { data: meineAufgaben } = isAuftraggeber
    ? await supabase
        .from("aufgaben")
        .select("*")
        .eq("erstellt_von", user.id)
        .order("erstellt_am", { ascending: false })
        .limit(10)
    : await supabase
        .from("bewerbungen")
        .select("*, aufgaben(*)")
        .eq("anbieter_id", user.id)
        .order("erstellt_am", { ascending: false })
        .limit(10);

  const { data: offeneAufgaben } = await supabase
    .from("aufgaben")
    .select("*, profiles(vollname)")
    .eq("status", "offen")
    .order("erstellt_am", { ascending: false })
    .limit(6);

  const statusFarbe: Record<string, string> = {
    offen: "bg-green-50 text-green-700",
    zugewiesen: "bg-blue-50 text-blue-700",
    abgeschlossen: "bg-zinc-100 text-zinc-500",
    abgebrochen: "bg-red-50 text-red-600",
    ausstehend: "bg-yellow-50 text-yellow-700",
    angenommen: "bg-green-50 text-green-700",
    abgelehnt: "bg-red-50 text-red-600",
  };

  return (
    <div className="min-h-screen bg-zinc-50">
      {/* Nav */}
      <header className="bg-white border-b border-zinc-100 px-6 h-16 flex items-center justify-between sticky top-0 z-10">
        <Link href="/" className="font-bold text-zinc-900">
          BEM<span className="text-zinc-400">-Marktplatz</span>
        </Link>
        <div className="flex items-center gap-4">
          <span className="text-sm text-zinc-500">{profile?.vollname ?? user.email}</span>
          <form action={signOut}>
            <button type="submit" className="text-sm text-zinc-400 hover:text-zinc-700">
              Abmelden
            </button>
          </form>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-10">
        {/* Begrüßung */}
        <div className="mb-10 flex items-end justify-between">
          <div>
            <p className="text-xs text-zinc-400 uppercase tracking-widest mb-1">
              {isAuftraggeber ? "Auftraggeber" : "Anbieter"}
            </p>
            <h1 className="text-3xl font-bold text-zinc-900">
              Hallo, {profile?.vollname?.split(" ")[0] ?? "dort"}
            </h1>
          </div>
          {isAuftraggeber && (
            <Link
              href="/aufgaben/neu"
              className="bg-zinc-900 text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-zinc-700 transition-colors"
            >
              + Neue Aufgabe
            </Link>
          )}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Linke Spalte: eigene Aktivität */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl border border-zinc-100 p-6">
              <h2 className="font-semibold text-zinc-900 mb-4">
                {isAuftraggeber ? "Meine Aufgaben" : "Meine Bewerbungen"}
              </h2>

              {!meineAufgaben || meineAufgaben.length === 0 ? (
                <div className="text-center py-10">
                  <p className="text-zinc-400 text-sm mb-4">
                    {isAuftraggeber
                      ? "Du hast noch keine Aufgaben erstellt."
                      : "Du hast dich noch auf keine Aufgabe beworben."}
                  </p>
                  {isAuftraggeber ? (
                    <Link
                      href="/aufgaben/neu"
                      className="text-sm bg-zinc-900 text-white px-4 py-2 rounded-full"
                    >
                      Erste Aufgabe erstellen →
                    </Link>
                  ) : (
                    <Link
                      href="/bounties"
                      className="text-sm bg-zinc-900 text-white px-4 py-2 rounded-full"
                    >
                      Aufgaben entdecken →
                    </Link>
                  )}
                </div>
              ) : (
                <div className="space-y-3">
                  {meineAufgaben.map((item: Record<string, unknown>) => {
                    const aufgabe = isAuftraggeber ? item : (item.aufgaben as Record<string, unknown>);
                    const status = isAuftraggeber
                      ? (item.status as string)
                      : (item.status as string);
                    if (!aufgabe) return null;
                    return (
                      <Link
                        key={item.id as string}
                        href={`/aufgaben/${(aufgabe as Record<string, unknown>).id ?? item.id}`}
                        className="flex items-center justify-between p-4 rounded-xl border border-zinc-100 hover:border-zinc-300 transition-colors group"
                      >
                        <div>
                          <p className="text-sm font-medium text-zinc-900 group-hover:text-zinc-700">
                            {(aufgabe as Record<string, unknown>).titel as string}
                          </p>
                          <p className="text-xs text-zinc-400 mt-0.5">
                            {(aufgabe as Record<string, unknown>).standort as string} · {(aufgabe as Record<string, unknown>).budget as number} €
                          </p>
                        </div>
                        <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${statusFarbe[status] ?? "bg-zinc-100 text-zinc-500"}`}>
                          {status}
                        </span>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Rechte Spalte: offene Aufgaben */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-zinc-100 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold text-zinc-900">Offene Aufgaben</h2>
                <Link href="/bounties" className="text-xs text-zinc-400 hover:text-zinc-700">
                  Alle →
                </Link>
              </div>
              <div className="space-y-3">
                {(offeneAufgaben ?? []).map((a) => (
                  <Link
                    key={a.id}
                    href={`/aufgaben/${a.id}`}
                    className="block p-3 rounded-xl border border-zinc-100 hover:border-zinc-300 transition-colors"
                  >
                    <p className="text-sm font-medium text-zinc-900 leading-snug">{a.titel}</p>
                    <div className="flex items-center justify-between mt-1.5">
                      <span className="text-xs text-zinc-400">{a.standort}</span>
                      <span className="text-xs font-semibold text-zinc-700">{a.budget} €</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Profil-Vollständigkeit */}
            <div className="bg-zinc-900 rounded-2xl p-6 text-white">
              <h3 className="font-semibold mb-2">Profil vervollständigen</h3>
              <p className="text-xs text-zinc-400 mb-4">
                Mehr Infos = mehr Vertrauen = mehr Buchungen.
              </p>
              <Link
                href="/profil"
                className="inline-block text-xs bg-white text-zinc-900 px-4 py-2 rounded-full font-medium hover:bg-zinc-100 transition-colors"
              >
                Profil bearbeiten →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
