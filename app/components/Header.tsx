"use client";

import BuyButton from "./BuyButton";

export default function Header({ isVisible = true }: { isVisible?: boolean }) {
  return (
    <header
      className={`sticky top-0 z-40 bg-background/75 backdrop-blur border-b border-ink-secondary transition-transform duration-300 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <a href="#" className="text-macho-orange font-extrabold tracking-wide">MACHO</a>
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <a href="#about" className="hover:text-macho-orange">About</a>
          <a href="#tokenomics" className="hover:text-macho-orange">Tokenomics</a>
          <a href="#roadmap" className="hover:text-macho-orange">Roadmap</a>
          <a href="#gallery" className="hover:text-macho-orange">Gallery</a>
          <a href="#how-to-buy" className="hover:text-macho-orange">How to Buy</a>
        </nav>
        <div className="flex items-center gap-3">
          <BuyButton variant="primary" size="normal" />
        </div>
      </div>
    </header>
  );
}
