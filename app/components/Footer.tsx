import BuyButton from "./BuyButton";

export default function Footer() {
  return (
    <footer className="border-t border-ink-secondary">
      <div className="container py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-gray-400">© {new Date().getFullYear()} Macho Coin. All rights reserved.</p>
        <div className="flex items-center gap-4">
          <a href="#" className="text-gray-400 hover:text-macho-orange">Twitter/X</a>
          <a href="#" className="text-gray-400 hover:text-macho-orange">Telegram</a>
          <BuyButton variant="secondary" />
        </div>
      </div>
    </footer>
  );
}
