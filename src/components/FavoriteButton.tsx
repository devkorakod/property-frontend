'use client';

import { useEffect, useState } from 'react';
import { isFavorite, toggleFavorite, onFavoritesChange, type FavoriteProperty } from '@/lib/favorites';
import type { Locale } from '@/lib/locale';
import { t } from '@/lib/i18n';

export function FavoriteButton({ property, locale = 'th' }: { property: FavoriteProperty; locale?: Locale }) {
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setSaved(isFavorite(property.id));
    return onFavoritesChange(() => setSaved(isFavorite(property.id)));
  }, [property.id]);

  return (
    <button onClick={() => setSaved(toggleFavorite(property))} aria-pressed={saved}
            title={saved ? t(locale, 'favorite_remove') : t(locale, 'favorite_add')}
            className={`flex items-center gap-2 border px-4 py-2 text-sm transition-colors ${
              saved ? 'border-red bg-red text-white' : 'border-line text-white/70 hover:border-red hover:text-red'
            }`}>
      <svg width="16" height="16" viewBox="0 0 24 24" fill={saved ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
      {saved ? t(locale, 'favorite_saved') : t(locale, 'favorite_save')}
    </button>
  );
}
