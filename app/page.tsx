'use client'

import { useRef, useState, useEffect } from 'react';
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

const RAYDIUM_LINK = "https://raydium.io/swap/?inputCurrency=sol&outputCurrency=GJZJsDnJaqGuGxgARRYNhzBWEzfST4sngHKLP2nppump";

const BuyLink = ({ size = 'normal' }: { size?: 'normal' | 'large' }) => {
  const baseClasses = "font-bold uppercase tracking-wider rounded-md transition-all duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:ring-macho-orange bg-macho-red text-white hover:bg-red-500 shadow-macho block text-center";
  const sizeClasses = {
    normal: "px-5 py-2.5 text-sm",
    large: "px-8 py-4 text-lg",
  };
  
  return (
    <a 
      href={RAYDIUM_LINK}
      target="_blank"
      rel="noopener noreferrer"
      className={`${baseClasses} ${sizeClasses[size]}`}
    >
      Buy $MACHO
    </a>
  );
};

export default function Home() {
  const scrollDirection = useScrollDirection();
  const heroRef = useRef<HTMLDivElement>(null);
  const isHeroVisible = useOnScreen(heroRef);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);

  useEffect(() => {
    setIsHeaderVisible(scrollDirection === 'up' || isHeroVisible);
  }, [scrollDirection, isHeroVisible]);
  
  const showStickyButton = !isHeaderVisible && !isHeroVisible;

  return (
    <div className="flex min-h-screen flex-col">
      <Header isVisible={isHeaderVisible} />
      
      <main className="flex-grow">
        <div ref={heroRef}><Hero /></div>
        <About />
        <HowToBuy />
        <Tokenomics />
        <Roadmap />
        <Gallery />
        <Treasury />
      </main>

      <Footer />
      
      <div 
        className={`fixed bottom-4 left-1/2 -translate-x-1/2 z-40 w-11/12 max-w-xs transition-transform duration-300 ease-in-out md:hidden ${
          showStickyButton ? 'translate-y-0' : 'translate-y-24'
        }`}
      >
        <BuyLink size="large" />
      </div>
    </div>
  );
}
