import BuyButton from "./BuyButton";

export default function Footer() {
  return (
    <footer className="border-t border-ink-secondary">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-gray-400">© {new Date().getFullYear()} Macho Coin. All rights reserved.</p>
        <div className="flex items-center gap-4">
          {/* Replace with real social links */}
          <a href="#" className="text-gray-400 hover:text-macho-orange">Twitter/X</a>
          <a href="#" className="text-gray-400 hover:text-macho-orange">Telegram</a>
          <BuyButton variant="secondary" size="normal" />
        </div>
      </div>
    </footer>
  );
}
