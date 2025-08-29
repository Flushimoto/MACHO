const RoadmapCard = ({ title, status, children }: { title: string, status: 'Done' | 'In Progress' | 'Planned', children: React.ReactNode }) => {
  const statusClasses = {
    'Done': 'bg-green-500/20 text-green-400',
    'In Progress': 'bg-yellow-500/20 text-yellow-400',
    'Planned': 'bg-gray-500/20 text-gray-400'
  };

  return (
    <div className="bg-ink border border-ink-secondary rounded-lg p-6 flex flex-col h-full shadow-lg">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-bold text-off-white">{title}</h3>
        <span className={`px-2 py-1 text-xs font-bold rounded ${statusClasses[status]}`}>{status}</span>
      </div>
      <div className="text-gray-400 flex-grow">{children}</div>
    </div>
  );
}

export default function Roadmap() {
  return (
    <section id="roadmap" className="py-16 md:py-24">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-black text-center uppercase tracking-tighter mb-12">
          Roadmap
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <RoadmapCard title="Phase 1: Launch" status="Done">
            <ul className="list-disc list-inside space-y-2">
              <li>Fair Launch on Raydium</li>
              <li>Website & Socials Deployment</li>
              <li>Liquidity Pool Burned</li>
              <li>Initial Community Building</li>
            </ul>
          </RoadmapCard>
          <RoadmapCard title="Phase 2: Growth" status="In Progress">
             <ul className="list-disc list-inside space-y-2">
              <li>CoinGecko & CMC Listings</li>
              <li>Marketing Campaigns</li>
              <li>Meme Contests & Giveaways</li>
              <li>1,000 Holders</li>
            </ul>
          </RoadmapCard>
           <RoadmapCard title="Phase 3: Domination" status="Planned">
             <ul className="list-disc list-inside space-y-2">
              <li>CEX Listing Applications</li>
              <li>Macho Merch Store</li>
              <li>Community DAO Formation</li>
              <li>Global Meme Supremacy</li>
            </ul>
          </RoadmapCard>
        </div>
      </div>
    </section>
  );
}
