import BuyButton from "../BuyButton";

const steps = [
  { title: "Get a Solana Wallet", description: "Install Phantom or Solflare and create a wallet." },
  { title: "Fund with SOL", description: "Send SOL to your wallet from an exchange." },
  { title: "Swap for $MACHO", description: "Click Buy $MACHO to open Jupiter and swap instantly." },
];

export default function HowToBuy() {
  return (
    <section id="how-to-buy" className="w-full bg-ink">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-off-white">How to Buy</h2>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((s, i) => (
            <div key={i} className="rounded-xl border border-ink-secondary bg-background p-4">
              <div className="text-macho-orange font-mono text-sm mb-2">Step {i + 1}</div>
              <h3 className="text-lg font-bold text-off-white mb-1">{s.title}</h3>
              <p className="text-gray-400">{s.description}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 text-center">
          <BuyButton variant="primary" size="large" />
        </div>
      </div>
    </section>
  );
}
