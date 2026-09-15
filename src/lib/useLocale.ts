'use client';

import { useEffect, useState } from 'react';
import type { Locale } from './locale';

/**
 * ใช้ในหน้าที่เป็น client component ล้วน (ไม่มี server parent ให้เรียก getLocale() ได้)
 * เริ่มที่ 'th' เสมอเพื่อไม่ให้ hydration ไม่ตรงกับ HTML ที่ server render มา
 * แล้วค่อยอ่านคุกกี้จริงหลัง mount
 */
export function useLocale(): Locale {
  const [locale, setLocale] = useState<Locale>('th');
  useEffect(() => {
    if (document.cookie.split('; ').some((c) => c === 'locale=en')) setLocale('en');
  }, []);
  return locale;
}
