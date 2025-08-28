'use client';

import { useEffect, useState } from 'react';
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

  const closeMenu = () => setIsMenuOpen(false);
  const toggleMenu = () => setIsMenuOpen(v => !v);

  // Close on ESC
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') closeMenu(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // Lock body scroll when menu open
  useEffect(() => {
    if (!isMenuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, [isMenuOpen]);

  return (
    <header
      className={`sticky top-0 z-50 bg-ink/90 backdrop-blur border-b border-ink-secondary transition-transform duration-300 ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}
    >
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <a href="#home" className="flex items-center gap-2 font-extrabold tracking-wider text-macho-red">
          <Dog className="w-6 h-6" aria-hidden="true" />
          <span>MACHO COIN</span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="font-semibold tracking-wider text-off-white hover:text-macho-red transition-colors"
            >
              {link.name}
            </a>
          ))}
          <BuyButton variant="primary" />
        </nav>

        {/* Mobile Toggle */}
        <button
          type="button"
          className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-off-white hover:text-macho-red focus:outline-none"
          aria-controls="mobile-menu"
          aria-expanded={isMenuOpen}
          onClick={toggleMenu}
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          <span className="sr-only">Toggle menu</span>
        </button>
      </div>

      {/* Backdrop + Panel (z-index above header; any tap outside closes) */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 z-[11000] md:hidden"
          onClick={closeMenu}
          onTouchStart={closeMenu}
          aria-hidden="true"
        >
          <div
            id="mobile-menu"
            className="absolute top-16 inset-x-0 mx-4 rounded-xl bg-ink border border-ink-secondary shadow-lg p-6 flex flex-col items-center gap-6"
            onClick={(e) => e.stopPropagation()}
            onTouchStart={(e) => e.stopPropagation()}
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={closeMenu}
                className="w-full text-center font-semibold tracking-wider text-off-white hover:text-macho-red transition-colors"
              >
                {link.name}
              </a>
            ))}
            <BuyButton variant="primary" size="large" />
          </div>
        </div>
      )}
    </header>
  );
}
