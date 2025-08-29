import Image from 'next/image';
import BuyButton from '../BuyButton';
import ContractAddress from '../ContractAddress';

export default function Hero() {
  return (
    // Clip any accidental horizontal overflow on small screens; leaves desktop unchanged
    <section id="home" className="container mx-auto px-6 py-16 md:py-24 overflow-x-clip">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        {/* Left column: title, copy, buttons, contract (unchanged layout) */}
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
              className="inline-flex items-center justify-center rounded-xl border px-6 py-3 font-semibold tracking-wide
                         text-amber-400 border-amber-400 bg-transparent
                         hover:bg-amber-400 hover:text-black
                         transition-colors"
            >
              LEARN MORE
            </a>
          </div>

          <div className="mt-6">
            <ContractAddress />
          </div>
        </div>

        {/* Right column: image (desktop stays 500px; small screens scale down without overflow) */}
        <div className="flex justify-center">
          <div className="w-full max-w-[500px]">
            <Image
              src="/images/hero.png"   // file at /public/images/hero.png
              alt="Macho Dog - Right-Hook Meme"
              width={500}
              height={500}
              sizes="(max-width: 768px) 85vw, 500px"
              className="rounded-lg object-cover w-full h-auto transition-transform duration-500 md:hover:scale-105"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
