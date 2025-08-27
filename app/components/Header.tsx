'use client';

import { useState } from 'react';
import { Menu, X, Dog } from 'lucide-react';
import BuyButton from './BuyButton';

const navLinks = [
  { name: 'About', href: '#about' },
  { name: 'Tokenomics', href: '#tokenomics' },
  { name: 'Roadmap', href: '#roadmap' },
  { name: 'Gallery', href: '#gallery' },
];

export default function Header({ isVisible }: { isVisible: boolean }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className={`sticky top-0 z-50 transition-transform duration-300 ease-in-out ${isVisible ? 'translate-y-0' : '-translate-y-full'} bg-ink/80 backdrop-blur-sm border-b border-ink-secondary`}>
      <nav className="container mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2 text-xl font-black text-macho-red uppercase">
          <Dog />
          <span>Macho Coin</span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} className="text-sm font-bold uppercase tracking-wider text-off-white hover:text-macho-red transition-colors">
              {link.name}
            </a>
          ))}
          <BuyButton variant="primary" />
        </div>

        {/* Mobile Burger Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-ink absolute w-full left-0 top-full flex flex-col items-center gap-6 py-8 border-t border-ink-secondary">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} onClick={() => setIsMenuOpen(false)} className="text-lg font-bold uppercase tracking-wider text-off-white hover:text-macho-red transition-colors">
              {link.name}
            </a>
          ))}
          <BuyButton variant="primary" size="large" />
        </div>
      )}
    </header>
  );
}
