import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id: aufgabeId } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return NextResponse.json({ error: "Nicht angemeldet" }, { status: 401 });

  const { nachricht } = await req.json();

  // Aufgabe prüfen
  const { data: aufgabe } = await supabase
    .from("aufgaben")
    .select("erstellt_von, status")
    .eq("id", aufgabeId)
    .single();

  if (!aufgabe) return NextResponse.json({ error: "Aufgabe nicht gefunden" }, { status: 404 });
  if (aufgabe.erstellt_von === user.id) {
    return NextResponse.json({ error: "Du kannst dich nicht auf deine eigene Aufgabe bewerben" }, { status: 400 });
  }
  if (aufgabe.status !== "offen") {
    return NextResponse.json({ error: "Aufgabe ist nicht mehr offen" }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("bewerbungen")
    .insert({ aufgabe_id: aufgabeId, anbieter_id: user.id, nachricht: nachricht?.trim() ?? null })
    .select()
    .single();

  if (error) {
    if (error.code === "23505") {
      return NextResponse.json({ error: "Du hast dich bereits beworben" }, { status: 409 });
    }
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data, { status: 201 });
}
