'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { readCompare, onCompareChange, clearCompare } from '@/lib/compare';
import type { Locale } from '@/lib/locale';
import { t } from '@/lib/i18n';

export function CompareBar({ locale = 'th' }: { locale?: Locale }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    setCount(readCompare().length);
    return onCompareChange(() => setCount(readCompare().length));
  }, []);

  if (count < 2) return null;

  return (
    <div className="fixed bottom-5 left-5 z-50 bg-ink border border-red flex items-center gap-3 px-4 py-3 text-sm">
      <span>{t(locale, 'compare_bar_label')} ({count})</span>
      <Link href="/compare" className="bg-red hover:bg-red-bright text-white px-4 py-1.5 text-xs uppercase tracking-[.1em]">
        {t(locale, 'compare_bar_view')}
      </Link>
      <button onClick={clearCompare} className="text-muted hover:text-red text-xs underline">{t(locale, 'compare_bar_clear')}</button>
    </div>
  );
}
