import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Nicht angemeldet" }, { status: 401 });

  const body = await req.json();
  const { status } = body as { status: string };

  if (!["angenommen", "abgelehnt"].includes(status)) {
    return NextResponse.json({ error: "Ungültiger Status" }, { status: 400 });
  }

  const { data: bewerbung } = await supabase
    .from("bewerbungen")
    .select("*, aufgaben(erstellt_von)")
    .eq("id", id)
    .single();

  if (!bewerbung) return NextResponse.json({ error: "Nicht gefunden" }, { status: 404 });

  const aufgabe = bewerbung.aufgaben as { erstellt_von: string } | null;
  if (aufgabe?.erstellt_von !== user.id) {
    return NextResponse.json({ error: "Keine Berechtigung" }, { status: 403 });
  }

  const { data, error } = await supabase
    .from("bewerbungen")
    .update({ status })
    .eq("id", id)
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  if (status === "angenommen") {
    await supabase
      .from("aufgaben")
      .update({ status: "zugewiesen" })
      .eq("id", bewerbung.aufgabe_id);
  }

  return NextResponse.json(data);
}
