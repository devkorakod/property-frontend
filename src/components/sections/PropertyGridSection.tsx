import Link from 'next/link';
import { PropertyCard } from '@/components/PropertyCard';
import { getLocale } from '@/lib/locale';
import { t } from '@/lib/i18n';

export interface PropertyGridData { eyebrow?: string; heading?: string }

export function PropertyGridSection({ data, items, moreHref = '/properties', bordered = false }: {
  data: PropertyGridData; items: any[]; moreHref?: string; bordered?: boolean;
}) {
  if (items.length === 0) return null;
  const locale = getLocale();
  return (
    <section className={`max-w-container mx-auto px-5 py-16 ${bordered ? 'border-t border-white/10' : ''}`}>
      <div className="flex items-end gap-6 flex-wrap mb-10">
        <div>
          {data.eyebrow && <p className="eyebrow mb-2">{data.eyebrow}</p>}
          {data.heading && <h2 className="font-thai-display text-3xl font-light">{data.heading}</h2>}
        </div>
        <Link href={moreHref} className="ml-auto text-xs uppercase tracking-[.14em] text-red border-b border-line pb-1">
          {t(locale, 'sectionGrid_viewAll')}
        </Link>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {items.map((p: any) => <PropertyCard key={p.id} p={p} locale={locale} />)}
      </div>
    </section>
  );
}
