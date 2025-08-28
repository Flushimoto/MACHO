import Image from 'next/image';
import BuyButton from '../BuyButton';
import ContractAddress from '../ContractAddress';

export default function Hero() {
  return (
    <section
      id="home"
      // Mobile-first container that won't overflow on phones
      className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 py-16 md:py-24"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8 md:gap-12">
        {/* Copy/text side */}
        <div className="text-center md:text-left">
          {/* Clamp heading size; tighter leading prevents wrap overflow */}
          <h1 className="font-black uppercase tracking-tight leading-[1.05] text-[clamp(2rem,7vw,3.75rem)]">
            The Right Hook<br /> that Shook <span className="text-macho-red">Solana.</span>
          </h1>

          <p className="mt-4 text-base sm:text-lg text-gray-300 max-w-xl mx-auto md:mx-0">
            Forget the barks, it's time for the bite. $MACHO is the undisputed
            enforcer of meme coins, delivering knockout blows to the competition.
          </p>

          {/* Buttons: stack on mobile, row on tablet+; full-width on phone so they don't overflow */}
          <div className="mt-8 flex flex-col sm:flex-row items-center md:justify-start gap-3 sm:gap-4 w-full">
            <div className="w-full sm:w-auto">
              <BuyButton variant="primary" size="large" className="w-full sm:w-auto" />
            </div>
            <a
              href="#about"
              className="w-full sm:w-auto text-center px-8 py-4 text-lg font-bold uppercase border-2 border-macho-orange text-macho-orange transition-all duration-200 hover:bg-macho-orange hover:text-ink rounded-md"
            >
              Learn More
            </a>
          </div>

          <div className="mt-6">
            <ContractAddress />
          </div>
        </div>

        {/* Image side: reserve space to stop layout jump, constrain width so it never overflows */}
        <div className="flex justify-center md:justify-end">
          <div className="relative w-full max-w-[520px] aspect-square">
            <Image
              // IMPORTANT: this file must exist at public/hero.png
              // If your repo has it under /public/images/hero.png, change the src to "/images/hero.png"
              src="/images/hero.png"
              alt="Macho Dog - Right-Hook Meme"
              fill
              sizes="(max-width: 640px) 85vw, (max-width: 1024px) 45vw, 520px"
              className="rounded-lg object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
