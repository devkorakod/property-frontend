'use client';

import type { Locale } from '@/lib/locale';

export function LanguageSwitcher({ current }: { current: Locale }) {
  function setLocale(locale: Locale) {
    if (locale === current) return;
    document.cookie = `locale=${locale}; path=/; max-age=${60 * 60 * 24 * 365}`;
    // full reload so every server- and client-rendered piece of the page (including
    // client-only pages like /compare that can't read the cookie via next/headers) picks it up
    window.location.reload();
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
