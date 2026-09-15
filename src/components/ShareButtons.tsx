'use client';

import { useState } from 'react';
import type { Locale } from '@/lib/locale';
import { t } from '@/lib/i18n';

export function ShareButtons({ title, locale = 'th' }: { title: string; locale?: Locale }) {
  const [copied, setCopied] = useState(false);

  function currentUrl() {
    return typeof window !== 'undefined' ? window.location.href : '';
  }

  function openShare(url: string) {
    window.open(url, '_blank', 'noopener,noreferrer,width=600,height=500');
  }

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(currentUrl());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch { /* clipboard ไม่พร้อมใช้งาน (สิทธิ์/บริบทไม่รองรับ) — เงียบไว้ */ }
  }

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => openShare(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl())}`)}
        title={t(locale, 'share_toFacebook')}
        className="border border-line text-white/70 hover:border-red hover:text-red px-3 py-2"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06C2 17.08 5.66 21.21 10.44 22v-7.03H7.9v-2.91h2.54V9.85c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.23.2 2.23.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.44 2.91h-2.34V22C18.34 21.21 22 17.08 22 12.06z" /></svg>
      </button>
      <button
        onClick={() => openShare(`https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(currentUrl())}&text=${encodeURIComponent(title)}`)}
        title={t(locale, 'share_toLine')}
        className="border border-line text-white/70 hover:border-red hover:text-red px-3 py-2"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 5.66 2 10.2c0 4.08 3.58 7.5 8.4 8.14.33.07.77.22.88.5.1.26.07.66.03.92l-.14.86c-.04.26-.2 1 .88.55s5.8-3.42 7.92-5.85C21.4 13.6 22 12 22 10.2 22 5.66 17.52 2 12 2z" /></svg>
      </button>
      <button onClick={copyLink} title={t(locale, 'share_copyLink')}
              className="border border-line text-white/70 hover:border-red hover:text-red px-3 py-2 text-xs">
        {copied ? t(locale, 'share_copied') : t(locale, 'share_copyLink')}
      </button>
    </div>
  );
}
