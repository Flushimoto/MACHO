'use client';

import { useState } from 'react';
import { Menu, X, Dog } from 'lucide-react';

const RAYDIUM_LINK = "https://raydium.io/swap/?inputCurrency=sol&outputCurrency=GJZJsDnJaqGuGxgARRYNhzBWEzfST4sngHKLP2nppump";

const navLinks = [
  { name: 'About', href: '#about' },
  { name: 'Tokenomics', href: '#tokenomics' },
  { name: 'Roadmap', href: '#roadmap' },
  { name: 'Gallery', href: '#gallery' },
];

const BuyLink = () => (
   <a 
      href={RAYDIUM_LINK}
      target="_blank"
      rel="noopener noreferrer"
      className="px-5 py-2.5 text-sm font-bold uppercase tracking-wider rounded-md transition-all duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:ring-macho-orange bg-macho-red text-white hover:bg-red-500 shadow-macho"
    >
      Buy $MACHO
    </a>
);

export default function Header({ isVisible }: { isVisible: boolean }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className={`sticky top-0 z-50 transition-transform duration-300 ease-in-out ${isVisible ? 'translate-y-0' : '-translate-y-full'} bg-ink/80 backdrop-blur-sm border-b border-ink-secondary`}>
      <nav className="container mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2 text-xl font-black text-macho-red uppercase">
          <Dog />
          <span>Macho Coin</span>
        </a>

        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} className="text-sm font-bold uppercase tracking-wider text-off-white hover:text-macho-red transition-colors">
              {link.name}
            </a>
          ))}
          <BuyLink />
        </div>

        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      <div className={`absolute top-full left-0 w-full bg-ink border-t border-ink-secondary transition-transform duration-300 ease-in-out md:hidden ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex flex-col items-center gap-6 py-8">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} onClick={() => setIsMenuOpen(false)} className="text-lg font-bold uppercase tracking-wider">
              {link.name}
            </a>
          ))}
           <a 
              href={RAYDIUM_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 text-lg font-bold uppercase tracking-wider rounded-md bg-macho-red text-white shadow-macho"
            >
              Buy $MACHO
            </a>
        </div>
      </div>
    </header>
  );
}
