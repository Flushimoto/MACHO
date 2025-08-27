"use client";

import BuyButton from "../BuyButton";

export default function Hero() {
  return (
    <section id="hero" className="section bg-hero text-text">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          
          {/* Text Side */}
          <div>
            <div className="inline-block rounded-xl border border-navbar bg-navbar/40 px-3 py-1 text-xs text-text">
              The Right-Hook Dog
            </div>

            <h1 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tightest leading-[1.05]">
              <span className="text-text">Macho Coin</span>{" "}
              <span className="text-button-bg">($MACHO)</span>
            </h1>

            <p className="mt-5 text-base sm:text-lg text-text/80 max-w-prose">
              Unapologetic meme energy on Solana—community momentum and a knockout narrative.
            </p>

            {/* Buttons (desktop/tablet inline, mobile stacks below image) */}
            <div className="mt-7 hidden md:flex flex-wrap items-center gap-3">
              <BuyButton size="large" />
              <a
                href="#how-to-buy"
                className="inline-flex items-center justify-center rounded-2xl border border-navbar bg-navbar/40 px-5 py-2.5 text-text hover:border-button-bg transition"
              >
                How to Buy
              </a>
            </div>
          </div>

          {/* Image Side */}
          <div className="relative w-full rounded-2xl bg-navbar shadow-card overflow-hidden">
            <img
              src="/images/hero.png"
              alt="Macho Hero"
              className="w-full h-auto object-contain"
            />
          </div>

          {/* Mobile-only buttons below the image */}
          <div className="md:hidden mt-7 flex flex-wrap items-center gap-3">
            <BuyButton size="large" />
            <a
              href="#how-to-buy"
              className="inline-flex items-center justify-center rounded-2xl border border-navbar bg-navbar/40 px-5 py-2.5 text-text hover:border-button-bg transition"
            >
              How to Buy
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
