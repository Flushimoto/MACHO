"use client";

import Link from "next/link";

interface HeaderProps {
  isVisible: boolean;
}

export default function Header({ isVisible }: HeaderProps) {
  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-transform duration-300 bg-navbar shadow-md ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="container flex items-center justify-between py-4">
        <Link href="/" className="text-xl font-bold text-text">
          MACHO
        </Link>
        <nav className="flex items-center gap-6">
          <Link href="#about" className="text-text hover:text-button-bg">
            About
          </Link>
          <Link href="#how-to-buy" className="text-text hover:text-button-bg">
            How to Buy
          </Link>
          <Link href="#tokenomics" className="text-text hover:text-button-bg">
            Tokenomics
          </Link>
          <Link href="#roadmap" className="text-text hover:text-button-bg">
            Roadmap
          </Link>
          <Link href="#gallery" className="text-text hover:text-button-bg">
            Gallery
          </Link>
          <Link href="#treasury" className="text-text hover:text-button-bg">
            Treasury
          </Link>
        </nav>
      </div>
    </header>
  );
}
