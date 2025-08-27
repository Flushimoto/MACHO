"use client";

import BuyButton from "./BuyButton";

export default function Footer() {
  return (
    <footer className="bg-navbar py-8 text-text">
      <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
        <p className="text-sm">&copy; {new Date().getFullYear()} MACHO. All rights reserved.</p>
        <div className="flex gap-6 items-center">
          <a href="#" className="text-gray-400 hover:text-button-bg">
            Twitter/X
          </a>
          <a href="#" className="text-gray-400 hover:text-button-bg">
            Telegram
          </a>
          <BuyButton variant="primary" />
        </div>
      </div>
    </footer>
  );
}
