"use client";
import { useState } from "react";
import Link from "next/link";

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-zinc-100">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="font-bold text-lg tracking-tight text-zinc-900">
          BEM<span className="text-zinc-400">-Marktplatz</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm text-zinc-600">
          <Link href="#aufgaben" className="hover:text-zinc-900 transition-colors">Aufgaben</Link>
          <Link href="#bounties" className="hover:text-zinc-900 transition-colors">Bounties</Link>
          <Link href="#agenten" className="hover:text-zinc-900 transition-colors">Für Agenten</Link>
          <Link href="#wie-es-funktioniert" className="hover:text-zinc-900 transition-colors">So funktionierts</Link>
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <Link
            href="/login"
            className="text-sm text-zinc-600 hover:text-zinc-900 transition-colors"
          >
            Anmelden
          </Link>
          <Link
            href="/signup"
            className="text-sm bg-zinc-900 text-white px-4 py-2 rounded-full hover:bg-zinc-700 transition-colors"
          >
            Registrieren →
          </Link>
        </div>

        <button
          className="md:hidden p-2"
          onClick={() => setOpen(!open)}
          aria-label="Menü öffnen"
        >
          <span className="block w-5 h-px bg-zinc-900 mb-1.5" />
          <span className="block w-5 h-px bg-zinc-900 mb-1.5" />
          <span className="block w-5 h-px bg-zinc-900" />
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-zinc-100 bg-white px-6 py-4 flex flex-col gap-4 text-sm text-zinc-700">
          <Link href="#aufgaben" onClick={() => setOpen(false)}>Aufgaben</Link>
          <Link href="#bounties" onClick={() => setOpen(false)}>Bounties</Link>
          <Link href="#agenten" onClick={() => setOpen(false)}>Für Agenten</Link>
          <Link href="#wie-es-funktioniert" onClick={() => setOpen(false)}>So funktionierts</Link>
          <Link href="/signup" className="bg-zinc-900 text-white px-4 py-2 rounded-full text-center">
            Registrieren →
          </Link>
        </div>
      )}
    </header>
  );
}
