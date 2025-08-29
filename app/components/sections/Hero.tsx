import Image from '/images/hero.png';
import ContractAddress from '../ContractAddress';

const RAYDIUM_LINK = "https://raydium.io/swap/?inputCurrency=sol&outputCurrency=GJZJsDnJaqGuGxgARRYNhzBWEzfST4sngHKLP2nppump";

export default function Hero() {
  return (
    <section id="home" className="container mx-auto px-6 py-16 md:py-24 overflow-hidden">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div className="text-center lg:text-left order-2 lg:order-1">
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
              className="px-8 py-4 text-lg text-center font-bold uppercase tracking-wider rounded-md bg-macho-red text-white shadow-macho transform transition-transform hover:scale-105"
            >
              Buy $MACHO
            </a>
            <a href="#about" className="px-8 py-4 text-lg text-center font-bold uppercase tracking-wider rounded-md border-2 border-macho-orange text-macho-orange hover:bg-macho-orange hover:text-ink transition-colors">
              Learn More
            </a>
          </div>
          <ContractAddress />
        </div>
        <div className="flex justify-center order-1 lg:order-2">
          <div className="w-full max-w-md lg:max-w-full">
             <Image
              src="/hero.png"
              alt="Macho Dog - Right-Hook Meme"
              width={500}
              height={500}
              className="rounded-lg object-cover w-full h-auto transform transition-transform duration-500 hover:scale-105"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
