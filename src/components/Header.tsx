import Link from 'next/link';

export function Header({ settings }: { settings?: any }) {
  const phone = settings?.contactChannels?.phone || '02-123-4567';
  return (
    <header className="border-b border-white/10">
      <div className="max-w-container mx-auto px-5 py-5 flex items-center gap-8 flex-wrap">
        <Link href="/" className="font-display text-xl tracking-[.28em]">
          D1<span className="text-red">·</span>LANDANDHOUSE
        </Link>
        <nav className="flex gap-6 text-sm flex-wrap">
          <Link href="/properties?listingType=sale" className="hover:text-red transition-colors">ซื้อ</Link>
          <Link href="/properties?listingType=rent" className="hover:text-red transition-colors">เช่า</Link>
          <Link href="/projects" className="hover:text-red transition-colors">โครงการ</Link>
          <Link href="/contact" className="hover:text-red transition-colors">ติดต่อเรา</Link>
        </nav>
        <div className="ml-auto text-sm text-muted">
          <a href={`tel:${phone}`} className="hover:text-red-bright text-red">{phone}</a>
        </div>
      </div>
    </header>
  );
}
