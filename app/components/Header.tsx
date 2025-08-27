"use client";

import Link from "next/link";

const navItems = [
  { name: "About", href: "#about" },
  { name: "How to Buy", href: "#how-to-buy" },
  { name: "Tokenomics", href: "#tokenomics" },
  { name: "Roadmap", href: "#roadmap" },
  { name: "Gallery", href: "#gallery" },
  { name: "Treasury", href: "#treasury" },
];

export default function Header() {
  return (
    <header className="fixed top-0 left-0 w-full bg-navbar text-text shadow-md z-50">
      <div className="container flex items-center justify-between py-4">
        <Link href="/" className="text-xl font-bold text-button-bg">
          MACHO
        </Link>
        <nav className="hidden md:flex gap-6">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="hover:text-button-bg transition"
            >
              {item.name}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
