const ALLOC = [
  { label: "Liquidity", value: 60 },
  { label: "Community", value: 30 },
  { label: "Treasury", value: 10 }
];
const total = ALLOC.reduce((a, b) => a + b.value, 0);

export default function Tokenomics() {
  return (
    <section id="tokenomics" className="section">
      <div className="container">
        <h2 className="text-3xl sm:text-4xl font-extrabold">Tokenomics</h2>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          {ALLOC.map((x, i) => (
            <div key={i} className="rounded-2xl border border-ink-secondary bg-ink p-5">
              <div className="text-gray-400 text-sm">{x.label}</div>
              <div className="text-off-white text-3xl font-extrabold">{x.value}%</div>
            </div>
          ))}
        </div>
        {total !== 100 && (
          <p className="mt-4 text-macho-orange">Warning: allocations total {total}% (should be 100%).</p>
        )}
      </div>
    </section>
  );
}
