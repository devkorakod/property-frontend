'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { readFavorites, toggleFavorite, onFavoritesChange, type FavoriteProperty } from '@/lib/favorites';
import { formatPrice } from '@/lib/format';
import { useLocale } from '@/lib/useLocale';
import { t } from '@/lib/i18n';

export default function FavoritesPage() {
  const [items, setItems] = useState<FavoriteProperty[]>([]);
  const [loaded, setLoaded] = useState(false);
  const locale = useLocale();

  useEffect(() => {
    setItems(readFavorites());
    setLoaded(true);
    return onFavoritesChange(() => setItems(readFavorites()));
  }, []);

  return (
    <div className="max-w-container mx-auto px-5 py-14">
      <p className="eyebrow mb-2">Favorites</p>
      <h1 className="font-thai-display text-3xl font-light mb-10">{t(locale, 'favorites_pageTitle')}</h1>

      {!loaded ? null : items.length === 0 ? (
        <p className="text-muted py-20 text-center">
          {t(locale, 'favorites_empty')}
        </p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((f) => (
            <div key={f.id} className="group relative">
              <Link href={`/properties/${f.slug}`} className="block">
                <div className="aspect-[3/2] bg-ink-soft overflow-hidden relative">
                  {f.coverUrl ? (
                    <Image src={f.coverUrl} alt={f.title} fill
                           sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                           className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  ) : null}
                </div>
                <div className="pt-4">
                  <p className="text-xs text-muted">{f.code}</p>
                  <h3 className="font-thai-display text-lg mt-1 line-clamp-1">{f.title}</h3>
                  <p className="font-display text-red-bright text-lg mt-2">{formatPrice(f.price, locale)}</p>
                </div>
              </Link>
              <button onClick={() => toggleFavorite(f)}
                      className="absolute top-2 right-2 bg-ink/70 backdrop-blur-sm text-xs px-3 py-1.5 hover:bg-red transition-colors">
                {t(locale, 'favorites_removeButton')}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
