"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type User = { id: string; email?: string } | null;
type Bewerbung = { id: string; status: string } | null;

export default function BewerbungsFormular({
  aufgabeId,
  user,
  existierendeBewerbung,
}: {
  aufgabeId: string;
  user: User;
  existierendeBewerbung: Bewerbung;
}) {
  const router = useRouter();
  const [nachricht, setNachricht] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [erfolg, setErfolg] = useState(false);

  if (!user) {
    return (
      <div className="bg-zinc-900 rounded-2xl p-6 text-white text-center">
        <p className="text-sm mb-4">Anmelden um dich zu bewerben</p>
        <Link
          href="/login"
          className="inline-block bg-white text-zinc-900 px-5 py-2.5 rounded-full text-sm font-medium hover:bg-zinc-100 transition-colors"
        >
          Jetzt anmelden →
        </Link>
      </div>
    );
  }

  if (existierendeBewerbung) {
    return (
      <div className="bg-white rounded-2xl border border-zinc-100 p-6 text-center">
        <p className="text-2xl mb-2">✓</p>
        <p className="font-medium text-zinc-900 text-sm">Beworben</p>
        <p className="text-xs text-zinc-400 mt-1">Status: {existierendeBewerbung.status}</p>
      </div>
    );
  }

  if (erfolg) {
    return (
      <div className="bg-green-50 rounded-2xl border border-green-100 p-6 text-center">
        <p className="text-2xl mb-2">🎉</p>
        <p className="font-medium text-green-900 text-sm">Bewerbung gesendet!</p>
        <p className="text-xs text-green-600 mt-1">Du wirst benachrichtigt, wenn der Auftraggeber antwortet.</p>
      </div>
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const res = await fetch(`/api/aufgaben/${aufgabeId}/bewerben`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nachricht }),
    });

    if (!res.ok) {
      const data = await res.json();
      setError(data.error ?? "Fehler beim Bewerben");
      setLoading(false);
      return;
    }

    setErfolg(true);
    router.refresh();
  }

  return (
    <div className="bg-white rounded-2xl border border-zinc-100 p-6">
      <h3 className="font-semibold text-zinc-900 mb-4">Jetzt bewerben</h3>
      <form onSubmit={handleSubmit} className="space-y-3">
        <textarea
          value={nachricht}
          onChange={(e) => setNachricht(e.target.value)}
          placeholder="Kurze Nachricht: Warum bist du der Richtige? (optional)"
          rows={3}
          className="w-full border border-zinc-200 rounded-xl px-4 py-3 text-sm text-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-900 resize-none"
        />
        {error && (
          <p className="text-xs text-red-500 bg-red-50 rounded-lg px-3 py-2">{error}</p>
        )}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-zinc-900 text-white py-3 rounded-xl text-sm font-medium hover:bg-zinc-700 transition-colors disabled:opacity-50"
        >
          {loading ? "Wird gesendet…" : "Bewerben →"}
        </button>
      </form>
    </div>
  );
}
