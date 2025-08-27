"use client";

import { useRef, useState, useEffect } from "react";
import Header from "./components/Header";
import Hero from "./components/sections/Hero";
import About from "./components/sections/About";
import HowToBuy from "./components/sections/HowToBuy";
import Tokenomics from "./components/sections/Tokenomics";
import Roadmap from "./components/sections/Roadmap";
import Gallery from "./components/sections/Gallery";
import Treasury from "./components/sections/Treasury";
import Footer from "./components/Footer";
import { useScrollDirection } from "./hooks/useScrollDirection";
import { useOnScreen } from "./hooks/useOnScreen";
import BuyButton from "./components/BuyButton";

export default function Home() {
  const scrollDirection = useScrollDirection();
  const heroRef = useRef<HTMLDivElement>(null);
  const isHeroVisible = useOnScreen(heroRef);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);

  useEffect(() => {
    setIsHeaderVisible(scrollDirection === "up" || isHeroVisible);
  }, [scrollDirection, isHeroVisible]);

  const showStickyButton = !isHeaderVisible && !isHeroVisible;

  return (
    <div className="flex min-h-screen flex-col">
      <Header isVisible={isHeaderVisible} />

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

      {/* Sticky Buy button for mobile */}
      <div
        className={`fixed bottom-4 left-1/2 -translate-x-1/2 z-40 transition-transform duration-300 ease-in-out md:hidden ${
          showStickyButton ? "translate-y-0" : "translate-y-24"
        }`}
      >
        <BuyButton variant="primary" size="large" />
      </div>
    </div>
  );
}
