'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Copy, Check } from 'lucide-react';
import BuyButton from '../BuyButton';

const TOKEN_MINT = 'GJZJsDnJaqGuGxgARRYNhzBWEzfST4sngHKLP2nppump';

export default function Hero() {
  const [copied, setCopied] = useState(false);

  async function copyAddress() {
    const text = TOKEN_MINT;
    try {
      if ('clipboard' in navigator) {
        await navigator.clipboard.writeText(text);
      } else {
        const ta = document.createElement('textarea');
        ta.value = text;
        ta.style.position = 'fixed';
        ta.style.left = '-9999px';
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // no-op
    }
  }

  return (
    // Inherit site background color
    <section id="home" className="text-off-white">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
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
            {/* ~35% smaller on phones/tablets, centered; desktop keeps 520px cap */}
            <div className="relative mx-auto w-full max-w-[320px] sm:max-w-[340px] md:max-w-[380px] lg:max-w-[520px] aspect-square">
              <Image
                src="/images/hero.png"
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
            {/* Buttons */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
              <BuyButton variant="primary" />
              <a
                href="#about"
                className="inline-flex items-center justify-center rounded-xl border border-ink-secondary px-6 py-3 font-semibold tracking-wide text-off-white hover:text-macho-red transition-colors"
              >
                LEARN MORE
              </a>
            </div>

            {/* Contract address (single-line + overlaid copy icon) */}
            <div className="w-full max-w-md">
              <div className="text-center md:text-left text-sm font-semibold tracking-widest text-off-white/70">
                CONTRACT ADDRESS
              </div>

              {/* The whole box is a button to copy; icon is overlaid so it doesn't reduce width */}
              <button
                type="button"
                onClick={copyAddress}
                className="relative mt-2 w-full rounded-xl border border-ink-secondary bg-black/30 px-4 py-3 text-left group"
                title={copied ? 'Copied' : 'Copy contract address'}
                aria-label={copied ? 'Copied' : 'Copy contract address'}
              >
                <span
                  id="contract-address"
                  className="block font-mono text-xs sm:text-sm text-amber-300 whitespace-nowrap overflow-hidden truncate pr-10"
                >
                  {TOKEN_MINT}
                </span>

                {/* Icon overlay (no layout impact) */}
                <span className="absolute right-2 top-1/2 -translate-y-1/2 text-off-white/80 group-hover:text-macho-red transition-colors">
                  {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                </span>
              </button>

              {/* SR-only live region for a11y */}
              <div className="sr-only" aria-live="polite">
                {copied ? 'Copied' : ''}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
