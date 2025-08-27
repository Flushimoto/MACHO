export default function Gallery() {
  return (
    <section id="gallery" className="w-full">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-off-white">Gallery</h2>
        {/* Replace placeholders with your actual images */}
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="aspect-square rounded-xl bg-ink border border-ink-secondary"></div>
          <div className="aspect-square rounded-xl bg-ink border border-ink-secondary"></div>
          <div className="aspect-square rounded-xl bg-ink border border-ink-secondary"></div>
          <div className="aspect-square rounded-xl bg-ink border border-ink-secondary"></div>
        </div>
      </div>
    </section>
  );
}
