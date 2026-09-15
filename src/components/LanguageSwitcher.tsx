'use client';

import { useRouter } from 'next/navigation';
import type { Locale } from '@/lib/locale';

export function LanguageSwitcher({ current }: { current: Locale }) {
  const router = useRouter();

  function setLocale(locale: Locale) {
    document.cookie = `locale=${locale}; path=/; max-age=${60 * 60 * 24 * 365}`;
    router.refresh();
  }

  return (
    <div className="flex items-center gap-1 text-xs">
      <button onClick={() => setLocale('th')}
              className={current === 'th' ? 'text-red-bright' : 'text-white/50 hover:text-white'}>
        TH
      </button>
      <span className="text-white/30">/</span>
      <button onClick={() => setLocale('en')}
              className={current === 'en' ? 'text-red-bright' : 'text-white/50 hover:text-white'}>
        EN
      </button>
    </div>
  );
}
