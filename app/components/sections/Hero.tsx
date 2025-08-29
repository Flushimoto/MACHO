'use client';

import Image from 'next/image';
import BuyButton from '../BuyButton';
import ContractAddress from '../ContractAddress';

export default function Hero() {
  return (
    // Prevent any accidental sideways scroll from this section
    <section id="home" className="text-off-white overflow-x-hidden">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        {/* md+: two columns; mobile = Title → Image → Actions+Contract */}
        <div className="grid md:grid-cols-2 md:items-center md:gap-12">

          {/* 1) Title / copy — mobile first */}
          <div className="order-1 md:order-none md:col-start-1 md:row-start-1 text-center md:text-left">
            <h1 className="font-extrabold leading-tight tracking-[-0.02em] text-4xl sm:text-5xl lg:text-6xl">
              THE RIGHT HOOK
              <br />
              THAT SHOOK <span className="text-macho-red">SOLANA</span>
            </h1>
            <p className="mt-5 text-off-white/80 text-lg sm:text-xl max-w-prose mx-auto md:mx-0">
              Forget the barks, it&apos;s time for the bite. $MACHO is the undisputed enforcer of meme coins, delivering knockout blows to the competition.
            </p>
          </div>

          {/* 2) Image — mobile second; desktop right column */}
          <div className="order-2 md:order-none md:col-start-2 md:row-start-1 md:row-span-2 mt-8 md:mt-0">
            {/* Centered, smaller on phones/tablets; never wider than viewport minus horizontal padding */}
            <div
              className="
                relative mx-auto aspect-square w-full
                max-w-[calc(100vw-2rem)]   /* <= prevents overflow with px-4 (2rem) */
                sm:max-w-[340px]
                md:max-w-[380px]
                lg:max-w-[520px]
              "
            >
              <Image
                src="/images/hero.png"   // file at /public/images/hero.png
                alt="Macho Dog - Right-Hook Meme"
                fill
                sizes="(max-width: 640px) 70vw, (max-width: 1024px) 40vw, 520px"
                className="rounded-lg object-cover"
                priority
              />
            </div>
          </div>

          {/* 3) Actions + Contract — mobile third; desktop left bottom */}
          <div className="order-3 md:order-none md:col-start-1 md:row-start-2 mt-8 md:mt-6 flex flex-col items-center md:items-start gap-6">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
              <BuyButton />
              <a
                href="#about"
                className="inline-flex items-center justify-center rounded-xl border border-ink-secondary px-6 py-3 font-semibold tracking-wide text-off-white hover:text-macho-red transition-colors"
              >
                LEARN MORE
              </a>
            </div>

            {/* Use your existing ContractAddress component exactly as before */}
            <div className="w-full max-w-md">
              <ContractAddress />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
