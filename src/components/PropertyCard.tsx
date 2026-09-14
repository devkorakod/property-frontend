import Link from 'next/link';
import { formatPrice, formatSqm, localized, PROPERTY_TYPE_LABEL } from '@/lib/format';

export function PropertyCard({ p }: { p: any }) {
  const price = p.price?.hidePrice ? 'ติดต่อสอบถาม'
    : formatPrice(p.promotion?.finalPrice ?? p.price?.sale ?? p.price?.rentMonthly);
  return (
    <Link href={`/properties/${p.slug}`} className="group block">
      <div className="aspect-[3/2] bg-ink-soft relative overflow-hidden">
        {p.coverImage?.url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={p.coverImage.url} alt={localized(p.coverImage.alt)}
               className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted text-xs">ไม่มีรูปภาพ</div>
        )}
        {p.isFeatured && (
          <span className="absolute top-0 left-0 bg-red text-white text-[11px] tracking-[.14em] uppercase px-3 py-1.5">
            แนะนำ
          </span>
        )}
      </div>
      <div className="pt-4">
        <p className="text-xs text-muted">{p.location?.zone} · {p.code}</p>
        <h3 className="font-thai-display text-lg mt-1 line-clamp-1">{localized(p.title)}</h3>
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
