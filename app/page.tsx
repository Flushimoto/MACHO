'use client';

import { useRef } from 'react';
import Header from "./components/Header";
import Hero from "./components/sections/Hero";
import About from "./components/sections/About";
import HowToBuy from "./components/sections/HowToBuy";
import Tokenomics from "./components/sections/Tokenomics";
import Roadmap from "./components/sections/Roadmap";
import Gallery from "./components/sections/Gallery";
import Treasury from "./components/sections/Treasury";
import Footer from "./components/Footer";
import { useScrollDirection } from './hooks/useScrollDirection';
import { useOnScreen } from './hooks/useOnScreen';
import BuyButton from './components/BuyButton';

export default function Page() {
  const scrollDirection = useScrollDirection(); // 'up' | 'down' | null
  const heroRef = useRef<HTMLDivElement | null>(null);
  const heroVisible = useOnScreen(heroRef as any, "-10% 0px -40% 0px"); // visible near top

  // Show sticky CTA only when user has scrolled past the hero AND is scrolling down
  const showStickyButton = !heroVisible && scrollDirection === 'down';

  return (
    <div className="min-h-screen flex flex-col">
      <Header isVisible={scrollDirection !== 'down'} />

      <main className="flex-grow">
        <div ref={heroRef}>
          <Hero />
        </div>
        <About />
        <HowToBuy />
        <Tokenomics />
        <Roadmap />
        <Gallery />
        <Treasury />
      </main>

      <Footer />

      {/* Sticky "Buy $MACHO" button for mobile (fully hides when off) */}
      <div
        className={`fixed bottom-4 left-1/2 -translate-x-1/2 z-40 md:hidden
          transition-all duration-300 ease-in-out
          ${showStickyButton ? 'translate-y-0 opacity-100 pointer-events-auto' : 'translate-y-[200%] opacity-0 pointer-events-none'}`}
      >
        {/* Smaller on mobile so it can hide completely */}
        <BuyButton variant="primary" size="normal" />
      </div>
    </div>
  );
}
