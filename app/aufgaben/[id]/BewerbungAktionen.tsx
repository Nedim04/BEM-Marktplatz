"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface Props {
  bewerbungId: string;
  currentStatus: string;
}

export default function BewerbungAktionen({ bewerbungId, currentStatus }: Props) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  if (currentStatus !== "ausstehend") return null;

  async function updateStatus(status: "angenommen" | "abgelehnt") {
    setLoading(true);
    await fetch(`/api/bewerbungen/${bewerbungId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    router.refresh();
    setLoading(false);
  }

  return (
    <div className="flex gap-2 mt-3">
      <button
        onClick={() => updateStatus("angenommen")}
        disabled={loading}
        className="text-xs px-3 py-1.5 bg-green-50 text-green-700 hover:bg-green-100 rounded-lg font-medium transition-colors disabled:opacity-50"
      >
        Annehmen
      </button>
      <button
        onClick={() => updateStatus("abgelehnt")}
        disabled={loading}
        className="text-xs px-3 py-1.5 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg font-medium transition-colors disabled:opacity-50"
      >
        Ablehnen
      </button>
    </div>
  );
}
