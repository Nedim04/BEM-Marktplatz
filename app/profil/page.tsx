export const dynamic = "force-dynamic";

import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import ProfilFormular from "./ProfilFormular";

export default async function ProfilPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  return (
    <div className="min-h-screen bg-zinc-50">
      <header className="bg-white border-b border-zinc-100 px-6 h-16 flex items-center justify-between sticky top-0 z-10">
        <Link href="/" className="font-bold text-zinc-900">BEM<span className="text-zinc-400">-Marktplatz</span></Link>
        <Link href="/dashboard" className="text-sm text-zinc-500 hover:text-zinc-900">← Dashboard</Link>
      </header>

      <div className="max-w-xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold text-zinc-900 mb-2">Mein Profil</h1>
        <p className="text-zinc-500 text-sm mb-8">Je vollständiger dein Profil, desto mehr Vertrauen bekommst du.</p>
        <ProfilFormular profile={profile} email={user.email ?? ""} />
      </div>
    </div>
  );
}
