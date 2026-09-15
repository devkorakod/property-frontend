'use client';

import { useEffect, useState } from 'react';
import { isFavorite, toggleFavorite, onFavoritesChange, type FavoriteProperty } from '@/lib/favorites';
import type { Locale } from '@/lib/locale';
import { t } from '@/lib/i18n';

/** ปุ่มหัวใจเล็กมุมขวาบนของการ์ดทรัพย์ในหน้ารายการ — กดแล้วต้องไม่พาไปหน้ารายละเอียด */
export function FavoriteQuickButton({ property, locale = 'th' }: { property: FavoriteProperty; locale?: Locale }) {
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setSaved(isFavorite(property.id));
    return onFavoritesChange(() => setSaved(isFavorite(property.id)));
  }, [property.id]);

  function onClick(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    setSaved(toggleFavorite(property));
  }

  return (
    <button onClick={onClick} aria-pressed={saved} title={saved ? t(locale, 'favorite_remove') : t(locale, 'favorite_add')}
            className="absolute top-2 right-2 z-10 w-9 h-9 flex items-center justify-center bg-ink/70 backdrop-blur-sm hover:bg-ink/90 transition-colors">
      <svg width="16" height="16" viewBox="0 0 24 24" fill={saved ? '#E5453A' : 'none'} stroke={saved ? '#E5453A' : 'white'} strokeWidth="2">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    </button>
  );
}
