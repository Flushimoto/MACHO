import Image from 'next/image';

const memeImages = [
  '/memes/meme1.jpg',
  '/memes/meme2.jpg',
  '/memes/meme3.jpg',
  '/memes/meme4.jpg',
  '/memes/meme5.jpg',
  '/memes/meme6.jpg',
];

export default function Gallery() {
  return (
    <section id="gallery" className="py-16 md:py-24 bg-ink border-y border-ink-secondary">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-black text-center uppercase tracking-tighter mb-12">
          Meme Gallery
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {memeImages.map((src, index) => (
            <div key={index} className="aspect-square relative rounded-lg overflow-hidden border-2 border-ink-secondary shadow-lg">
              <Image
                src={src}
                alt={`Macho meme ${index + 1}`}
                layout="fill"
                objectFit="cover"
                className="transform transition-transform duration-300 hover:scale-110"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
