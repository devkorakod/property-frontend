import Link from 'next/link';
import { getLocale } from '@/lib/locale';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';

export function Header({ settings }: { settings?: any }) {
  const phone = settings?.contactChannels?.phone || '02-123-4567';
  const locale = getLocale();
  return (
    <header className="border-b border-white/10">
      <div className="max-w-container mx-auto px-5 py-5 flex items-center gap-8 flex-wrap">
        <Link href="/" className="font-display text-xl tracking-[.28em]">
          D1<span className="text-red">·</span>LAND AND HOUSE
        </Link>
        <nav className="flex gap-6 text-sm flex-wrap">
          <Link href="/properties?listingType=sale" className="hover:text-red transition-colors">ซื้อ</Link>
          <Link href="/properties?listingType=rent" className="hover:text-red transition-colors">เช่า</Link>
          <Link href="/projects" className="hover:text-red transition-colors">โครงการ</Link>
          <Link href="/loan-calculator" className="hover:text-red transition-colors">คำนวณสินเชื่อ</Link>
          <Link href="/favorites" className="hover:text-red transition-colors">รายการโปรด</Link>
          <Link href="/contact" className="hover:text-red transition-colors">ติดต่อเรา</Link>
        </nav>
        <div className="ml-auto flex items-center gap-4">
          <LanguageSwitcher current={locale} />
          <a
            href={`tel:${phone}`}
            className="flex items-center gap-2 text-sm border border-line px-4 py-2 text-red hover:border-red hover:text-red-bright transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            {phone}
          </a>
        </div>
      </div>
    </header>
  );
}
