import Link from 'next/link';
import Image from 'next/image';
import { formatPrice, formatSqm, localized, PROPERTY_TYPE_LABEL } from '@/lib/format';
import { FavoriteQuickButton } from '@/components/FavoriteQuickButton';
import { CompareQuickButton } from '@/components/CompareQuickButton';
import type { Locale } from '@/lib/locale';

export function PropertyCard({ p, locale = 'th' }: { p: any; locale?: Locale }) {
  const price = p.price?.hidePrice ? 'ติดต่อสอบถาม'
    : formatPrice(p.promotion?.finalPrice ?? p.price?.sale ?? p.price?.rentMonthly);
  return (
    <Link href={`/properties/${p.slug}`} className="group block">
      <div className="aspect-[3/2] bg-ink-soft relative overflow-hidden">
        {p.coverImage?.url ? (
          <Image src={p.coverImage.url} alt={localized(p.coverImage.alt, locale)} fill
                 sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                 className="object-cover group-hover:scale-105 transition-transform duration-500" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted text-xs">ไม่มีรูปภาพ</div>
        )}
        {p.isFeatured && (
          <span className="absolute top-0 left-0 bg-red text-white text-[11px] tracking-[.14em] uppercase px-3 py-1.5">
            แนะนำ
          </span>
        )}
        <FavoriteQuickButton property={{
          id: p.id, slug: p.slug, title: localized(p.title, locale), coverUrl: p.coverImage?.url,
          price: p.promotion?.finalPrice ?? p.price?.sale ?? p.price?.rentMonthly, code: p.code,
        }} />
        <CompareQuickButton property={{
          id: p.id, slug: p.slug, title: localized(p.title, locale), coverUrl: p.coverImage?.url,
          price: p.promotion?.finalPrice ?? p.price?.sale ?? p.price?.rentMonthly, code: p.code,
          propertyType: p.propertyType, listingType: p.listingType, spec: p.spec, area: p.area,
          location: { zone: p.location?.zone },
        }} />
      </div>
      <div className="pt-4">
        <p className="text-xs text-muted">{p.location?.zone} · {p.code}</p>
        <h3 className="font-thai-display text-lg mt-1 line-clamp-1">{localized(p.title, locale)}</h3>
        <p className="text-xs text-muted mt-1">
          {PROPERTY_TYPE_LABEL[p.propertyType] ?? p.propertyType}
          {p.spec?.bedrooms ? ` · ${p.spec.bedrooms} นอน` : ''}
          {p.area?.usableSqm ? ` · ${formatSqm(p.area.usableSqm)}` : ''}
        </p>
        <p className="font-display text-red-bright text-xl mt-2">{price}</p>
      </div>
    </Link>
  );
}
