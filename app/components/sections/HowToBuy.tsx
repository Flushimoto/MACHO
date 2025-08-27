import BuyButton from "../BuyButton";

const steps = [
  { title: "Get a Solana Wallet", description: "Install Phantom or Solflare and create a wallet." },
  { title: "Fund with SOL", description: "Send SOL to your wallet from an exchange." },
  { title: "Swap for $MACHO", description: "Click Buy $MACHO to open Jupiter, then swap." },
];

export default function HowToBuy() {
  return (
    <section id="how-to-buy" className="section bg-ink">
      <div className="container">
        <h2 className="text-3xl sm:text-4xl font-extrabold">How to Buy</h2>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((s, i) => (
            <div key={i} className="rounded-2xl border border-ink-secondary bg-background p-5">
              <div className="text-macho-orange font-mono text-sm mb-2">Step {i + 1}</div>
              <h3 className="text-lg font-bold mb-1">{s.title}</h3>
              <p className="text-gray-400">{s.description}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 text-center">
          <BuyButton size="large" />
        </div>
      </div>
    </section>
  );
}
