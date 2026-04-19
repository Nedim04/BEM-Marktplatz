"use client";
import { useState } from "react";

type Profile = {
  vollname?: string | null;
  bio?: string | null;
  standort?: string | null;
  rolle?: string | null;
} | null;

export default function ProfilFormular({ profile, email }: { profile: Profile; email: string }) {
  const [form, setForm] = useState({
    vollname: profile?.vollname ?? "",
    bio: profile?.bio ?? "",
    standort: profile?.standort ?? "",
  });
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<{ type: "ok" | "err"; text: string } | null>(null);

  function set(key: string, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setMsg(null);
    const res = await fetch("/api/profil", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setSaving(false);
    if (res.ok) setMsg({ type: "ok", text: "Profil gespeichert." });
    else setMsg({ type: "err", text: "Fehler beim Speichern." });
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-zinc-100 p-8 space-y-5">
      <div>
        <label className="block text-sm font-medium text-zinc-700 mb-1.5">E-Mail</label>
        <input value={email} disabled className="w-full border border-zinc-100 rounded-xl px-4 py-3 text-sm text-zinc-400 bg-zinc-50 cursor-not-allowed" />
      </div>

      <div>
        <label className="block text-sm font-medium text-zinc-700 mb-1.5">Rolle</label>
        <div className="px-4 py-3 border border-zinc-100 rounded-xl text-sm text-zinc-500 bg-zinc-50">
          {profile?.rolle === "auftraggeber" ? "Auftraggeber (Ich buche Menschen)" : "Anbieter (Ich übernehme Aufgaben)"}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-zinc-700 mb-1.5">Name</label>
        <input
          type="text"
          value={form.vollname}
          onChange={(e) => set("vollname", e.target.value)}
          className="w-full border border-zinc-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900"
          placeholder="Max Mustermann"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-zinc-700 mb-1.5">Standort</label>
        <input
          type="text"
          value={form.standort}
          onChange={(e) => set("standort", e.target.value)}
          className="w-full border border-zinc-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900"
          placeholder="z.B. Berlin"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-zinc-700 mb-1.5">Über mich</label>
        <textarea
          rows={4}
          value={form.bio}
          onChange={(e) => set("bio", e.target.value)}
          className="w-full border border-zinc-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900 resize-none"
          placeholder="Kurze Beschreibung deiner Fähigkeiten und Erfahrungen…"
        />
      </div>

      {msg && (
        <p className={`text-sm px-4 py-3 rounded-xl ${msg.type === "ok" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-600"}`}>
          {msg.text}
        </p>
      )}

      <button
        type="submit"
        disabled={saving}
        className="w-full bg-zinc-900 text-white py-3 rounded-xl text-sm font-medium hover:bg-zinc-700 transition-colors disabled:opacity-50"
      >
        {saving ? "Wird gespeichert…" : "Profil speichern →"}
      </button>
    </form>
  );
}
