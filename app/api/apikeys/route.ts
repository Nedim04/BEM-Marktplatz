import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

function generateApiKey(): { key: string; prefix: string } {
  const bytes = new Uint8Array(24);
  crypto.getRandomValues(bytes);
  const key = "bem_" + Array.from(bytes).map((b) => b.toString(16).padStart(2, "0")).join("");
  return { key, prefix: key.slice(0, 12) };
}

export async function GET() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Nicht angemeldet" }, { status: 401 });

  const { data, error } = await supabase
    .from("api_keys")
    .select("id, name, prefix, aktiv, erstellt_am, zuletzt_genutzt_am")
    .eq("user_id", user.id)
    .order("erstellt_am", { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data ?? []);
}

export async function POST(req: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Nicht angemeldet" }, { status: 401 });

  const body = await req.json() as { name?: string };
  const name = body.name?.trim();
  if (!name) return NextResponse.json({ error: "Name erforderlich" }, { status: 400 });

  const { key, prefix } = generateApiKey();

  const { data, error } = await supabase
    .from("api_keys")
    .insert({ user_id: user.id, name, key_value: key, prefix })
    .select("id, name, prefix, erstellt_am")
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ ...data, key }, { status: 201 });
}

export async function DELETE(req: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Nicht angemeldet" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ error: "ID fehlt" }, { status: 400 });

  const { error } = await supabase
    .from("api_keys")
    .delete()
    .eq("id", id)
    .eq("user_id", user.id);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
