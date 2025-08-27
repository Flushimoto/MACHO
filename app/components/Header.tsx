"use client";

import Link from "next/link";
import BuyButton from "./BuyButton";

type HeaderProps = {
  isVisible?: boolean;
};

export default function Header({ isVisible = true }: HeaderProps) {
  return (
    <header
      className={[
        "sticky top-0 z-50 bg-navbar text-text border-b border-navbar/60 backdrop-blur",
        "transition-transform duration-300",
        isVisible ? "translate-y-0" : "-translate-y-full",
      ].join(" ")}
    >
      <div className="container flex items-center justify-between py-4">
        <Link href="/" className="text-xl font-extrabold tracking-tight">
          <span className="text-button-bg">MACHO</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm">
          <a href="#about" className="hover:text-button-bg transition">About</a>
          <a href="#how-to-buy" className="hover:text-button-bg transition">How to Buy</a>
          <a href="#tokenomics" className="hover:text-button-bg transition">Tokenomics</a>
          <a href="#roadmap" className="hover:text-button-bg transition">Roadmap</a>
          <a href="#gallery" className="hover:text-button-bg transition">Gallery</a>
          <a href="#treasury" className="hover:text-button-bg transition">Treasury</a>
        </nav>

        <div className="hidden md:block">
          <BuyButton />
        </div>
      </div>
    </header>
  );
}
