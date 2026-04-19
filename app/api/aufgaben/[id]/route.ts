import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("aufgaben")
    .select("*, profiles(vollname, verifiziert, bewertung, standort)")
    .eq("id", id)
    .single();

  if (error || !data) return NextResponse.json({ error: "Nicht gefunden" }, { status: 404 });
  return NextResponse.json(data);
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return NextResponse.json({ error: "Nicht angemeldet" }, { status: 401 });

  const body = await req.json();

  // Nur Eigentümer darf Status + Felder ändern
  const { data: aufgabe } = await supabase
    .from("aufgaben")
    .select("erstellt_von")
    .eq("id", id)
    .single();

  if (!aufgabe || aufgabe.erstellt_von !== user.id) {
    return NextResponse.json({ error: "Keine Berechtigung" }, { status: 403 });
  }

  const erlaubteFelder = ["status", "titel", "beschreibung", "budget", "deadline"];
  const update: Record<string, unknown> = {};
  for (const key of erlaubteFelder) {
    if (body[key] !== undefined) update[key] = body[key];
  }

  const { data, error } = await supabase
    .from("aufgaben")
    .update(update)
    .eq("id", id)
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}
