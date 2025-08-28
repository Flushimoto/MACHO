const SectionWrapper = ({ children, id }: { children: React.ReactNode; id: string }) => (
  <section id={id} className="py-16 md:py-24 bg-ink border-y border-ink-secondary">
    <div className="container mx-auto px-6">
      {children}
    </div>
  </section>
);

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h2 className="text-3xl md:text-4xl font-black text-center uppercase tracking-tighter mb-8">
    {children}
  </h2>
);

export default function About() {
  return (
    <SectionWrapper id="about">
      <SectionTitle>What is <span className="text-macho-red">$MACHO</span>?</SectionTitle>
      <div className="max-w-3xl mx-auto text-center text-gray-300 space-y-4">
        <p>
          Born from the legendary 'Right-Hook Dog' meme that took the internet by storm, Macho Coin embodies raw, unfiltered power and underdog spirit. It's not just a coin; it's a movement.
        </p>
        <p>
          We're a community of fighters, creators, and meme lords united by a love for high-energy culture and the thrill of the crypto space. $MACHO is 100% community-driven, built on the fast and secure Solana blockchain. No fluff, no false promises—just pure, concentrated macho energy ready to land a punch.
        </p>
      </div>
    </SectionWrapper>
  );
}
