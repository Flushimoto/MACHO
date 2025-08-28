'use client';

import { useEffect, useRef, useState } from 'react';
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
  const panelRef = useRef<HTMLDivElement | null>(null);
  const toggleRef = useRef<HTMLButtonElement | null>(null);

  const closeMenu = () => setIsMenuOpen(false);
  const toggleMenu = () => setIsMenuOpen(v => !v);

  // ESC closes
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') closeMenu(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // Click/tap outside closes (document-level so it's bulletproof)
  useEffect(() => {
    if (!isMenuOpen) return;
    const onDown = (e: MouseEvent | TouchEvent) => {
      const t = e.target as Node | null;
      const insidePanel = !!panelRef.current && panelRef.current.contains(t);
      const onToggle = !!toggleRef.current && toggleRef.current.contains(t);
      if (!insidePanel && !onToggle) closeMenu();
    };
    document.addEventListener('mousedown', onDown);
    document.addEventListener('touchstart', onDown, { passive: true });
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('touchstart', onDown);
    };
  }, [isMenuOpen]);

  // Lock body scroll while open (mobile)
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
          ref={toggleRef}
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

      {/* Mobile Menu Panel (no backdrop; we close via document listener) */}
      <div
        id="mobile-menu"
        ref={panelRef}
        className={`md:hidden fixed top-16 inset-x-0 z-[10001] transition-all duration-200 ${
          isMenuOpen ? 'opacity-100 translate-y-0' : 'pointer-events-none opacity-0 -translate-y-1'
        }`}
      >
        <div className="mx-4 rounded-xl bg-ink border border-ink-secondary shadow-lg p-6 flex flex-col items-center gap-6">
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
    </header>
  );
}
