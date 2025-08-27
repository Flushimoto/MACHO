const items = [
  { q: "Q1", goals: ["Launch", "Website", "Community Bootstrap"] },
  { q: "Q2", goals: ["Listings", "Marketing Push", "Partnerships"] },
  { q: "Q3", goals: ["Ecosystem Tools", "Merch", "Events"] }
];

export default function Roadmap() {
  return (
    <section id="roadmap" className="section bg-ink">
      <div className="container">
        <h2 className="text-3xl sm:text-4xl font-extrabold">Roadmap</h2>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map((x, idx) => (
            <div key={idx} className="rounded-2xl border border-ink-secondary bg-background p-5">
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
