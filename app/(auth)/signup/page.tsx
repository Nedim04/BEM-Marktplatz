"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function SignupPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    vollname: "",
    email: "",
    password: "",
    rolle: "anbieter" as "anbieter" | "auftraggeber",
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  function set(key: string, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (form.password.length < 8) {
      setError("Passwort muss mindestens 8 Zeichen haben.");
      return;
    }
    setLoading(true);
    setError(null);

    const supabase = createClient();
    const { error } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
      options: {
        data: { vollname: form.vollname, rolle: form.rolle },
      },
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    router.push("/dashboard");
    router.refresh();
  }

  return (
    <div className="w-full max-w-sm">
      <h1 className="text-2xl font-bold text-zinc-900 mb-1">Konto erstellen</h1>
      <p className="text-sm text-zinc-500 mb-8">
        Schon registriert?{" "}
        <Link href="/login" className="text-zinc-900 underline underline-offset-2">
          Anmelden →
        </Link>
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Rolle wählen */}
        <div className="grid grid-cols-2 gap-3">
          {([
            { value: "anbieter", label: "Ich biete an", sub: "Aufgaben übernehmen" },
            { value: "auftraggeber", label: "Ich buche", sub: "Menschen beauftragen" },
          ] as const).map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => set("rolle", opt.value)}
              className={`border rounded-xl p-3 text-left transition-all ${
                form.rolle === opt.value
                  ? "border-zinc-900 bg-zinc-900 text-white"
                  : "border-zinc-200 hover:border-zinc-400"
              }`}
            >
              <div className={`text-sm font-medium ${form.rolle === opt.value ? "text-white" : "text-zinc-900"}`}>
                {opt.label}
              </div>
              <div className={`text-xs mt-0.5 ${form.rolle === opt.value ? "text-zinc-300" : "text-zinc-400"}`}>
                {opt.sub}
              </div>
            </button>
          ))}
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-700 mb-1.5">Name</label>
          <input
            type="text"
            required
            value={form.vollname}
            onChange={(e) => set("vollname", e.target.value)}
            className="w-full border border-zinc-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900"
            placeholder="Max Mustermann"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-700 mb-1.5">E-Mail</label>
          <input
            type="email"
            required
            value={form.email}
            onChange={(e) => set("email", e.target.value)}
            className="w-full border border-zinc-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900"
            placeholder="deine@email.de"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-700 mb-1.5">Passwort</label>
          <input
            type="password"
            required
            value={form.password}
            onChange={(e) => set("password", e.target.value)}
            className="w-full border border-zinc-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900"
            placeholder="Mindestens 8 Zeichen"
          />
        </div>

        {error && (
          <p className="text-sm text-red-500 bg-red-50 rounded-xl px-4 py-3">{error}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-zinc-900 text-white py-3 rounded-xl text-sm font-medium hover:bg-zinc-700 transition-colors disabled:opacity-50"
        >
          {loading ? "Wird erstellt…" : "Konto erstellen →"}
        </button>

        <p className="text-xs text-zinc-400 text-center">
          Mit der Registrierung akzeptierst du unsere{" "}
          <Link href="/agb" className="underline">AGB</Link> und{" "}
          <Link href="/datenschutz" className="underline">Datenschutzerklärung</Link>.
        </p>
      </form>
    </div>
  );
}
