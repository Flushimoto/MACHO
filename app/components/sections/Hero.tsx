import Image from 'next/image';
import BuyButton from '../BuyButton';
import ContractAddress from '../ContractAddress';

export default function Hero() {
  return (
    <section id="home" className="container mx-auto px-6 py-16 md:py-24">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        {/* Left column: title, copy, buttons, contract (unchanged) */}
        <div className="text-center md:text-left">
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-tight">
            The Right Hook<br /> that Shook <span className="text-macho-red">Solana.</span>
          </h1>

          <p className="mt-4 text-lg text-gray-300 max-w-xl mx-auto md:mx-0">
            Forget the barks, it's time for the bite. $MACHO is the undisputed enforcer of meme coins,
            delivering knockout blows to the competition.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center md:justify-start gap-4">
            <BuyButton />
            <a
              href="#about"
              className="inline-flex items-center justify-center rounded-xl border border-ink-secondary px-6 py-3 font-semibold tracking-wide text-off-white hover:text-macho-red transition-colors"
            >
              LEARN MORE
            </a>
          </div>

          <div className="mt-6">
            <ContractAddress />
          </div>
        </div>

        {/* Right column: image (same look, path updated to /images/hero.png) */}
        <div className="flex justify-center">
          <Image
            src="/images/hero.png"
            alt="Macho Dog - Right-Hook Meme"
            width={500}
            height={500}
            className="rounded-lg object-cover transform transition-transform duration-500 hover:scale-105"
            priority
          />
        </div>
      </div>
    </section>
  );
}
