import Image from 'next/image';
import BuyButton from '../BuyButton';
import ContractAddress from '../ContractAddress';

export default function Hero() {
  return (
    <section
      id="home"
      // Use max-w container instead of Tailwind "container" (avoids custom container widths that can overflow)
      className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 py-16 md:py-24 overflow-hidden"
    >
      <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
        <div className="text-center md:text-left">
          {/* Scales smoothly on mobile; tight leading prevents wrap overflow */}
          <h1 className="font-black uppercase tracking-tight leading-[1.1] text-[clamp(2rem,7vw,3.75rem)]">
            The Right Hook<br /> that Shook <span className="text-macho-red">Solana.</span>
          </h1>

          <p className="mt-4 text-base sm:text-lg text-gray-300 max-w-xl mx-auto md:mx-0">
            Forget the barks, it's time for the bite. $MACHO is the undisputed
            enforcer of meme coins, delivering knockout blows to the competition.
          </p>

          <div className="mt-8 flex items-center justify-center md:justify-start gap-4">
            <BuyButton variant="primary" size="large" />
            <a
              href="#about"
              className="px-8 py-4 text-lg font-bold uppercase border-2 border-macho-orange text-macho-orange transition-all duration-200 hover:bg-macho-orange hover:text-ink rounded-md"
            >
              Learn More
            </a>
          </div>

          <ContractAddress />
        </div>

        {/* Image never exceeds column; pre-sized to avoid layout shift */}
        <div className="flex justify-center">
          <div className="w-full max-w-[500px]">
            <Image
              src="/hero.png"
              alt="Macho Dog - Right-Hook Meme"
              width={500}
              height={500}
              className="rounded-lg object-cover"
              sizes="(max-width: 640px) 85vw, (max-width: 1024px) 45vw, 500px"
              style={{ width: "100%", height: "auto" }}
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
