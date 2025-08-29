const RAYDIUM_LINK = "https://raydium.io/swap/?inputCurrency=sol&outputCurrency=GJZJsDnJaqGuGxgARRYNhzBWEzfST4sngHKLP2nppump";

const steps = [
  {
    title: "Get a Solana Wallet",
    description: "Download a wallet like Phantom or Solflare. For desktop, the browser extension is best."
  },
  {
    title: "Fund Your Wallet",
    description: "Buy SOL from an exchange (like Coinbase or Binance) and send it to your new Solana wallet."
  },
  {
    title: "Swap for $MACHO",
    description: "Click the 'Buy $MACHO' button on our site to go to the swap terminal. Connect your wallet and confirm."
  }
];

export default function HowToBuy() {
  return (
    <section id="how-to-buy" className="py-16 md:py-24">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-black text-center uppercase tracking-tighter mb-12">
          How to Buy
        </h2>
        <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-macho-red rounded-full flex items-center justify-center text-2xl font-black text-white mb-4 shadow-macho">
                {index + 1}
              </div>
              <h3 className="text-xl font-bold mb-2">{step.title}</h3>
              <p className="text-gray-400">{step.description}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
            <a 
              href={RAYDIUM_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-4 text-lg font-bold uppercase tracking-wider rounded-md bg-macho-red text-white shadow-macho transform transition-transform hover:scale-105"
            >
              Buy $MACHO
            </a>
        </div>
      </div>
    </section>
  );
}
