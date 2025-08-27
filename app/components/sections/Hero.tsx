"use client";

import BuyButton from "../BuyButton";

export default function Hero() {
  return (
    <section id="hero" className="w-full bg-background">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="text-left">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight text-off-white">
              The Right-Hook Dog
            </h1>
            <p className="mt-4 text-base sm:text-lg text-gray-300 max-w-prose">
              Macho Coin ($MACHO) brings unapologetic meme energy to Solana—community momentum with a knockout narrative.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <BuyButton variant="primary" size="large" />
              <a
                href="#how-to-buy"
                className="inline-flex items-center justify-center rounded-lg border border-ink-secondary bg-ink px-4 py-2 text-off-white hover:border-macho-orange transition"
              >
                How to Buy
              </a>
            </div>
          </div>
          <div className="relative w-full h-64 sm:h-80 md:h-[22rem] lg:h-[26rem] rounded-xl bg-ink border border-ink-secondary flex items-center justify-center overflow-hidden">
            {/* Replace with your original hero image/art */}
            <span className="text-macho-orange/80 text-2xl md:text-3xl select-none">$MACHO</span>
          </div>
        </div>
      </div>
    </section>
  );
}
