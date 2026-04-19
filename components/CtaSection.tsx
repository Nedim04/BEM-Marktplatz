import Link from "next/link";

export default function CtaSection() {
  return (
    <section className="py-28 px-6 max-w-6xl mx-auto text-center">
      <span className="text-xs font-medium tracking-widest text-zinc-300 uppercase">
        Jetzt starten
      </span>
      <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-zinc-900 mt-6 leading-tight">
        Deinen Menschen
        <br />
        finden.
      </h2>
      <p className="mt-6 text-zinc-500 max-w-md mx-auto leading-relaxed">
        12.000+ verifizierte Menschen in 38 Ländern. Jede Fähigkeit, die du
        brauchst.
      </p>

      <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
        <Link
          href="/bounties/erstellen"
          className="inline-flex items-center justify-center bg-zinc-900 text-white px-8 py-4 rounded-full text-sm font-medium hover:bg-zinc-700 transition-colors"
        >
          Menschen entdecken →
        </Link>
        <Link
          href="/signup?intent=anbieter"
          className="inline-flex items-center justify-center border border-zinc-200 text-zinc-700 px-8 py-4 rounded-full text-sm font-medium hover:border-zinc-400 hover:text-zinc-900 transition-colors"
        >
          Selbst anbieten →
        </Link>
      </div>
    </section>
  );
}
