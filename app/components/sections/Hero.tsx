import Image from 'next/image';
import ContractAddress from '../ContractAddress';

const RAYDIUM_LINK = "https://raydium.io/swap/?inputCurrency=sol&outputCurrency=GJZJsDnJaqGuGxgARRYNhzBWEzfST4sngHKLP2nppump";

export default function Hero() {
  return (
    <section
      id="home"
      className="container mx-auto px-6 py-16 md:py-24 overflow-x-clip overflow-y-visible" // <-- stop horizontal bleed
    >
      <div className="grid lg:grid-cols-2 gap-10 md:gap-12 items-center">
        {/* Copy */}
        <div className="text-center lg:text-left order-2 lg:order-1 min-w-0"> {/* <-- allow shrink */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tighter leading-tight">
            The Right Hook<br /> that Shook <span className="text-macho-red">Solana.</span>
          </h1>

          <p className="mt-4 text-lg text-gray-300 max-w-xl mx-auto lg:mx-0">
            Forget the barks, it's time for the bite. $MACHO is the apex predator of meme coins, delivering knockout blows.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-stretch justify-center lg:justify-start gap-4">
            <a 
              href={RAYDIUM_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 text-lg text-center font-bold uppercase tracking-wider rounded-md bg-macho-red text-white shadow-macho transform transition-transform md:hover:scale-105" // <-- no scale on mobile
            >
              Buy $MACHO
            </a>
            <a
              href="#about"
              className="px-8 py-4 text-lg text-center font-bold uppercase tracking-wider rounded-md border-2 border-macho-orange text-macho-orange hover:bg-macho-orange hover:text-ink transition-colors"
            >
              Learn More
            </a>
          </div>

          {/* Wrap the address so it can never force overflow */}
          <div className="mt-6 max-w-full break-words break-all overflow-hidden">
            <ContractAddress />
          </div>
        </div>

        {/* Art */}
        <div className="order-1 lg:order-2 flex justify-center lg:justify-end min-w-0"> {/* <-- allow shrink */}
          <div className="
            w-full
            max-w-[260px]      /* phones */
            sm:max-w-[320px]   /* small tablets */
            md:max-w-[360px]   /* tablets */
            lg:max-w-[420px]   /* laptops */
            xl:max-w-[480px]   /* large desktops */
          ">
            <Image
              src="/images/hero.png"
              alt="Macho Dog - Right-Hook Meme"
              width={1200}
              height={1200}
              priority
              className="block w-full h-auto rounded-lg object-contain select-none"
              sizes="(min-width:1280px) 480px,
                     (min-width:1024px) 420px,
                     (min-width:768px) 360px,
                     (min-width:640px) 320px,
                     260px"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
