'use client';

import { useState } from 'react';
import Image from 'next/image';

interface GalleryImage { url: string; alt?: { th?: string; en?: string } }

export function PropertyGallery({ cover, gallery }: { cover?: GalleryImage; gallery?: GalleryImage[] }) {
  const images = [cover, ...(gallery ?? [])].filter((img): img is GalleryImage => !!img?.url);
  const [active, setActive] = useState(0);

  if (images.length === 0) {
    return <div className="aspect-[3/2] bg-ink-soft mb-8" />;
  }

  return (
    <div className="mb-8">
      <div className="aspect-[3/2] bg-ink-soft overflow-hidden relative">
        <Image src={images[active].url} alt={images[active].alt?.th ?? ''} fill priority
               sizes="(max-width: 1024px) 100vw, 1024px" className="object-cover" />
      </div>
      {images.length > 1 && (
        <div className="flex gap-2 mt-2 overflow-x-auto pb-1">
          {images.map((img, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActive(i)}
              className={`relative shrink-0 w-20 aspect-[3/2] overflow-hidden border transition-opacity ${
                i === active ? 'border-red opacity-100' : 'border-transparent opacity-60 hover:opacity-100'
              }`}
            >
              <Image src={img.url} alt="" fill sizes="80px" className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
