import BuyButton from "./components/BuyButton";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen">
      <section className="flex flex-col items-center justify-center text-center py-24 px-6">
        <h1 className="text-5xl font-bold text-macho-orange">Macho Coin ($MACHO)</h1>
        <p className="mt-4 max-w-2xl text-lg text-gray-300">
          The meme coin with knockout energy. Built on Solana, powered by the community.
        </p>
        <div className="mt-6 flex gap-4">
          <BuyButton size="large" />
          <a href="#how-to-buy" className="px-6 py-3 rounded-lg border border-macho-orange text-off-white hover:bg-macho-orange hover:text-black transition">
            How to Buy
          </a>
        </div>
      </section>

      <section id="how-to-buy" className="py-20 bg-ink text-off-white text-center">
        <h2 className="text-3xl font-bold mb-4">How to Buy</h2>
        <p>Connect your wallet, swap SOL for $MACHO through the Jupiter Modal.</p>
      </section>
    </main>
  );
}
