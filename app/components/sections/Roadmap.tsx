const items = [
  { q: "Q1", goals: ["Launch", "Website", "Community Bootstrap"] },
  { q: "Q2", goals: ["Listings", "Marketing Push", "Partnerships"] },
  { q: "Q3", goals: ["Ecosystem Tools", "Merch", "Events"] }
];

export default function Roadmap() {
  return (
    <section id="roadmap" className="w-full bg-ink">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-off-white">Roadmap</h2>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map((x, idx) => (
            <div key={idx} className="rounded-xl border border-ink-secondary bg-background p-4">
              <div className="text-macho-orange font-mono text-sm mb-2">{x.q}</div>
              <ul className="list-disc list-inside text-gray-300 space-y-1">
                {x.goals.map((g, i) => <li key={i}>{g}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
