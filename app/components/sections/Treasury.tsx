import { BarChart2, Twitter, Send, Github } from 'lucide-react';

const socialLinks = [
  { icon: BarChart2, href: '#', label: 'Dexscreener' },
  { icon: Twitter, href: 'https://x.com', label: 'X (Twitter)' },
  { icon: Send, href: 'https://telegram.org', label: 'Telegram' },
  { icon: Github, href: 'https://github.com', label: 'GitHub' },
];

export default function Treasury() {
  return (
    <section id="treasury" className="py-16 md:py-24">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter mb-4">
          Join the <span className="text-macho-red">Fight</span>
        </h2>
        <p className="max-w-2xl mx-auto text-gray-400 mb-8">
          Follow our socials, join the community, and let's take $MACHO to the moon.
        </p>
        <div className="flex justify-center items-center gap-4">
          {socialLinks.map((link) => (
            <a 
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.label}
              className="p-3 bg-ink border border-ink-secondary rounded-full text-off-white hover:text-macho-red hover:border-macho-red transition-all"
            >
              <link.icon size={24} />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
