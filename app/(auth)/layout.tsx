import Link from "next/link";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-zinc-50 flex flex-col">
      <header className="px-6 py-5 border-b border-zinc-100 bg-white">
        <Link href="/" className="font-bold text-zinc-900">
          BEM<span className="text-zinc-400">-Marktplatz</span>
        </Link>
      </header>
      <main className="flex-1 flex items-center justify-center px-6 py-16">
        {children}
      </main>
    </div>
  );
}
