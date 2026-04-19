const outlets = [
  "WIRED", "Forbes", "Gründerszene", "t3n", "Heise", "Futurism", "Mashable", "TechCrunch",
  "WIRED", "Forbes", "Gründerszene", "t3n", "Heise", "Futurism", "Mashable", "TechCrunch",
];

export default function PressBar() {
  return (
    <section className="border-y border-zinc-100 py-8 overflow-hidden">
      <p className="text-center text-xs tracking-widest text-zinc-300 uppercase mb-6">
        Bekannt aus
      </p>
      <div className="relative flex overflow-hidden">
        <div className="flex gap-16 animate-marquee whitespace-nowrap">
          {outlets.map((name, i) => (
            <span
              key={i}
              className="text-zinc-300 text-sm font-semibold tracking-wider uppercase"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
