const TokenomicCard = ({ title, value }: { title: string, value: string }) => (
  <div className="bg-ink border border-ink-secondary rounded-lg p-6 text-center shadow-lg transform transition-transform hover:-translate-y-1">
    <h3 className="text-sm uppercase font-bold tracking-wider text-macho-orange mb-2">{title}</h3>
    <p className="text-2xl font-bold text-off-white">{value}</p>
  </div>
);

export default function Tokenomics() {
  return (
    <section id="tokenomics" className="py-16 md:py-24 bg-ink border-y border-ink-secondary">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-black text-center uppercase tracking-tighter mb-12">
          Tokenomics
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          <TokenomicCard title="Ticker" value="$MACHO" />
          <TokenomicCard title="Total Supply" value="1 Billion" />
          <TokenomicCard title="Tax" value="0% Buy / 0% Sell" />
          <TokenomicCard title="Liquidity" value="Burned" />
        </div>
      </div>
    </section>
  );
}
