import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(req: NextRequest) {
  const supabase = await createClient();
  const { searchParams } = new URL(req.url);

  let query = supabase
    .from("aufgaben")
    .select("*, profiles(vollname, verifiziert, bewertung)")
    .eq("status", "offen")
    .order("erstellt_am", { ascending: false });

  const kategorie = searchParams.get("kategorie");
  const standort = searchParams.get("standort");
  const maxBudget = searchParams.get("max_budget");

  if (kategorie) query = query.eq("kategorie", kategorie);
  if (standort) query = query.ilike("standort", `%${standort}%`);
  if (maxBudget) query = query.lte("budget", parseFloat(maxBudget));

  const limit = parseInt(searchParams.get("limit") ?? "20");
  query = query.limit(limit);

  const { data, error } = await query;

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return NextResponse.json({ error: "Nicht angemeldet" }, { status: 401 });

  const body = await req.json();
  const { titel, beschreibung, kategorie, standort, budget, deadline, vermittlungsgebuehr } = body;

  if (!titel || !beschreibung || !kategorie || !standort || !budget) {
    return NextResponse.json({ error: "Pflichtfelder fehlen" }, { status: 400 });
  }

  if (budget <= 0 || budget > 100000) {
    return NextResponse.json({ error: "Ungültiges Budget" }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("aufgaben")
    .insert({
      erstellt_von: user.id,
      titel: titel.trim(),
      beschreibung: beschreibung.trim(),
      kategorie,
      standort: standort.trim(),
      budget: parseFloat(budget),
      deadline: deadline || null,
      vermittlungsgebuehr: parseFloat(vermittlungsgebuehr ?? 0),
    })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data, { status: 201 });
}
