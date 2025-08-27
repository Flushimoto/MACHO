const ALLOC = [
  { label: "Liquidity", value: 60 },
  { label: "Community", value: 30 },
  { label: "Treasury", value: 10 }
];
const total = ALLOC.reduce((a, b) => a + b.value, 0);

export default function Tokenomics() {
  return (
    <section id="tokenomics" className="w-full">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-off-white">Tokenomics</h2>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          {ALLOC.map((x, i) => (
            <div key={i} className="rounded-xl border border-ink-secondary bg-ink p-4">
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
