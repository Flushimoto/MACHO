'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { X } from 'lucide-react';

const memeImages = [
  '/memes/meme1.jpg', '/memes/meme2.jpg', '/memes/meme3.jpg',
  '/memes/meme4.jpg', '/memes/meme5.jpg', '/memes/meme6.jpg',
];

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const openModal = (src: string) => setSelectedImage(src);
  const closeModal = () => setSelectedImage(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeModal();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <section id="gallery" className="py-16 md:py-24 bg-ink border-y border-ink-secondary">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-black text-center uppercase tracking-tighter mb-12">
          Meme Gallery
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {memeImages.map((src, index) => (
            <button
              key={index}
              className="aspect-square relative rounded-lg overflow-hidden border-2 border-ink-secondary shadow-lg group focus:outline-none focus-visible:ring-2 focus-visible:ring-macho-orange"
              onClick={() => openModal(src)}
              aria-label={`View meme ${index + 1}`}
            >
              <Image
                src={src} alt={`Macho meme ${index + 1}`} fill sizes="(max-width: 768px) 50vw, 33vw"
                style={{ objectFit: 'cover' }}
                className="transform transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
            </button>
          ))}
        </div>
      </div>

      {selectedImage && (
        <div
          className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn"
          onClick={closeModal} role="dialog" aria-modal="true"
        >
          <div className="relative w-full max-w-3xl max-h-[90vh] animate-zoomIn" onClick={e => e.stopPropagation()}>
            <Image
              src={selectedImage} alt="Expanded meme" width={1200} height={1200}
              style={{ width: 'auto', height: 'auto', maxHeight: '90vh', maxWidth: '100%', margin: '0 auto' }}
              className="rounded-lg shadow-2xl"
            />
          </div>
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 text-white bg-black/50 rounded-full p-2 hover:bg-black/75 transition-colors"
            aria-label="Close image viewer"
          >
            <X size={28} />
          </button>
        </div>
      )}
    </section>
  );
}
