"use client";

import Image from "next/image";
import BuyButton from "../BuyButton";

export default function Hero() {
  return (
    <section id="hero" className="section">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* LEFT SIDE: Text */}
          <div>
            <div className="inline-block rounded-xl border border-ink-secondary bg-ink px-3 py-1 text-xs text-gray-400">
              The Right-Hook Dog
            </div>
            <h1 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tightest leading-[1.05]">
              <span className="text-off-white">Macho Coin</span>{" "}
              <span className="text-macho-orange">($MACHO)</span>
            </h1>
            <p className="mt-5 text-base sm:text-lg text-gray-300 max-w-prose">
              Unapologetic meme energy on Solana—community momentum and a knockout narrative.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <BuyButton size="large" />
              <a
                href="#how-to-buy"
                className="inline-flex items-center justify-center rounded-2xl border border-ink-secondary bg-ink px-5 py-2.5 text-off-white hover:border-macho-orange transition"
              >
                How to Buy
              </a>
            </div>
          </div>

          {/* RIGHT SIDE: Hero Image */}
          <div className="relative w-full h-64 sm:h-80 md:h-[24rem] rounded-2xl bg-ink border border-ink-secondary shadow-card overflow-hidden">
            <Image
              src="/images/hero.png" // 👈 put your image in /public/images/hero.png
              alt="Macho Coin Hero"
              fill
              priority
              className="object-cover"
            />
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/30 to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
}
