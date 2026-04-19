-- ============================================================
-- BEM-Marktplatz — Supabase Datenbankschema
-- Ausführen in: Supabase Dashboard → SQL Editor
-- ============================================================

-- 1. Profile (ergänzt auth.users)
create table if not exists public.profiles (
  id          uuid references auth.users(id) on delete cascade primary key,
  rolle       text not null default 'anbieter'
                check (rolle in ('auftraggeber', 'anbieter', 'admin')),
  vollname    text,
  bio         text,
  standort    text,
  avatar_url  text,
  verifiziert boolean default false,
  bewertung   numeric(3,2) default 0,
  bewertungen_anzahl integer default 0,
  erstellt_am timestamptz default now()
);

alter table public.profiles enable row level security;

create policy "Profile öffentlich lesbar"
  on public.profiles for select using (true);

create policy "Eigenes Profil bearbeitbar"
  on public.profiles for update using (auth.uid() = id);

-- Automatisch Profil beim Signup anlegen
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, vollname, rolle)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'vollname', split_part(new.email, '@', 1)),
    coalesce(new.raw_user_meta_data->>'rolle', 'anbieter')
  );
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- 2. Aufgaben (Tasks / Bounties)
create table if not exists public.aufgaben (
  id              uuid default gen_random_uuid() primary key,
  erstellt_von    uuid references public.profiles(id) on delete cascade not null,
  titel           text not null,
  beschreibung    text not null,
  kategorie       text not null,
  standort        text not null,
  budget          numeric(10,2) not null check (budget > 0),
  waehrung        text default 'EUR',
  status          text default 'offen'
                    check (status in ('offen', 'zugewiesen', 'abgeschlossen', 'abgebrochen')),
  deadline        timestamptz,
  vermittlungsgebuehr numeric(10,2) default 0,
  erstellt_am     timestamptz default now(),
  aktualisiert_am timestamptz default now()
);

alter table public.aufgaben enable row level security;

create policy "Aufgaben öffentlich lesbar"
  on public.aufgaben for select using (true);

create policy "Auftraggeber kann eigene Aufgaben erstellen"
  on public.aufgaben for insert
  with check (auth.uid() = erstellt_von);

create policy "Auftraggeber kann eigene Aufgaben bearbeiten"
  on public.aufgaben for update
  using (auth.uid() = erstellt_von);

-- Timestamp automatisch aktualisieren
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.aktualisiert_am = now();
  return new;
end;
$$;

create trigger aufgaben_updated_at
  before update on public.aufgaben
  for each row execute function public.set_updated_at();

-- 3. Bewerbungen (Worker-Angebote auf Aufgaben)
create table if not exists public.bewerbungen (
  id           uuid default gen_random_uuid() primary key,
  aufgabe_id   uuid references public.aufgaben(id) on delete cascade not null,
  anbieter_id  uuid references public.profiles(id) on delete cascade not null,
  nachricht    text,
  status       text default 'ausstehend'
                 check (status in ('ausstehend', 'angenommen', 'abgelehnt')),
  erstellt_am  timestamptz default now(),
  unique(aufgabe_id, anbieter_id)
);

alter table public.bewerbungen enable row level security;

create policy "Bewerbungen lesbar für Beteiligte"
  on public.bewerbungen for select
  using (
    auth.uid() = anbieter_id
    or auth.uid() in (select erstellt_von from public.aufgaben where id = aufgabe_id)
  );

create policy "Anbieter kann sich bewerben"
  on public.bewerbungen for insert
  with check (auth.uid() = anbieter_id);

create policy "Auftraggeber kann Bewerbungsstatus ändern"
  on public.bewerbungen for update
  using (
    auth.uid() in (select erstellt_von from public.aufgaben where id = aufgabe_id)
  );

-- 4. Hilfsfunktion: Aufgaben mit Profil-Infos
create or replace view public.aufgaben_mit_profil as
  select
    a.*,
    p.vollname as ersteller_name,
    p.verifiziert as ersteller_verifiziert,
    p.bewertung as ersteller_bewertung,
    (select count(*) from public.bewerbungen b where b.aufgabe_id = a.id) as bewerbungen_anzahl
  from public.aufgaben a
  join public.profiles p on p.id = a.erstellt_von;

-- 5. Beispieldaten (optional, zum Testen)
-- Wird nur eingefügt wenn die Tabelle leer ist
-- insert into public.aufgaben (erstellt_von, titel, beschreibung, kategorie, standort, budget)
-- select id, 'Testaufgabe', 'Beschreibung', 'Marketing', 'Berlin', 45
-- from auth.users limit 1;
