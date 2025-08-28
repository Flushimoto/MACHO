import Image from 'next/image';
import BuyButton from '../BuyButton';
import ContractAddress from '../ContractAddress';

export default function Hero() {
  return (
    <section
      id="home"
      className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 overflow-hidden"
    >
      <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
        <div className="text-center md:text-left">
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-tight">
            The Right Hook<br /> that Shook <span className="text-macho-red">Solana.</span>
          </h1>
          <p className="mt-4 text-lg text-gray-300 max-w-xl mx-auto md:mx-0">
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

        <div className="flex justify-center">
          <Image
            src="/hero.png"
            alt="Macho Dog - Right-Hook Meme"
            width={500}
            height={500}
            className="rounded-lg object-cover transform transition-transform duration-500 hover:scale-105"
            sizes="(max-width: 768px) 80vw, (max-width: 1200px) 40vw, 500px"
            style={{ maxWidth: "100%", height: "auto" }}
            priority
          />
        </div>
      </div>
    </section>
  );
}
