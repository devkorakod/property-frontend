'use client';

import { useState } from 'react';

interface GalleryImage { url: string; alt?: { th?: string; en?: string } }

export function PropertyGallery({ cover, gallery }: { cover?: GalleryImage; gallery?: GalleryImage[] }) {
  const images = [cover, ...(gallery ?? [])].filter((img): img is GalleryImage => !!img?.url);
  const [active, setActive] = useState(0);

  if (images.length === 0) {
    return <div className="aspect-[3/2] bg-ink-soft mb-8" />;
  }

  return (
    <div className="mb-8">
      <div className="aspect-[3/2] bg-ink-soft overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={images[active].url} alt={images[active].alt?.th ?? ''} className="w-full h-full object-cover" />
      </div>
      {images.length > 1 && (
        <div className="flex gap-2 mt-2 overflow-x-auto pb-1">
          {images.map((img, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActive(i)}
              className={`shrink-0 w-20 aspect-[3/2] overflow-hidden border transition-opacity ${
                i === active ? 'border-red opacity-100' : 'border-transparent opacity-60 hover:opacity-100'
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={img.url} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
