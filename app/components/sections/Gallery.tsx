export default function Gallery() {
  return (
    <section id="gallery" className="section">
      <div className="container">
        <h2 className="text-3xl sm:text-4xl font-extrabold">Gallery</h2>
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          {/* Replace placeholders with your images */}
          <div className="aspect-square rounded-2xl bg-ink border border-ink-secondary"></div>
          <div className="aspect-square rounded-2xl bg-ink border border-ink-secondary"></div>
          <div className="aspect-square rounded-2xl bg-ink border border-ink-secondary"></div>
          <div className="aspect-square rounded-2xl bg-ink border border-ink-secondary"></div>
        </div>
      </div>
    </section>
  );
}
