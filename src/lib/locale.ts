import { cookies } from 'next/headers';

export type Locale = 'th' | 'en';

/** เว็บนี้ให้ Thai เป็นค่าเริ่มต้นเสมอ — คุกกี้ locale=en คือทางเลือกของผู้ใช้เท่านั้น */
export function getLocale(): Locale {
  return cookies().get('locale')?.value === 'en' ? 'en' : 'th';
}
