import Link from 'next/link';
import { listProperties } from '@/lib/api';
import { PropertyCard } from '@/components/PropertyCard';
import { PropertyAlertForm } from '@/components/PropertyAlertForm';
import { PROPERTY_TYPE_LABEL } from '@/lib/format';
import { getLocale } from '@/lib/locale';

export const metadata = { title: 'ทรัพย์ทั้งหมด' };

const SORT_OPTIONS: Record<string, string> = {
  newest: 'ใหม่ล่าสุด',
  featured: 'แนะนำ',
  price_asc: 'ราคา: ต่ำ-สูง',
  price_desc: 'ราคา: สูง-ต่ำ',
};

export default async function PropertiesPage({
  searchParams,
}: { searchParams: Record<string, string | undefined> }) {
  const { items = [], meta } = await listProperties({
    propertyType: searchParams.propertyType,
    listingType: searchParams.listingType,
    zone: searchParams.zone,
    minPrice: searchParams.minPrice,
    maxPrice: searchParams.maxPrice,
    bedrooms: searchParams.bedrooms,
    keyword: searchParams.keyword,
    sort: searchParams.sort,
    page: searchParams.page,
  }).catch(() => ({ items: [] as any[], meta: undefined }));
  const locale = getLocale();

  return (
    <div className="max-w-container mx-auto px-5 py-14">
      <p className="eyebrow mb-2">Properties</p>
      <h1 className="font-thai-display text-3xl font-light mb-8">ทรัพย์ทั้งหมด</h1>

      <form className="flex flex-wrap gap-3 mb-10 text-sm" method="get">
        <input name="keyword" defaultValue={searchParams.keyword ?? ''} placeholder="ค้นหาชื่อทรัพย์ โครงการ คำอธิบาย..."
               className="bg-ink-soft border border-white/20 px-3 py-2 flex-1 min-w-[200px]" />
        <select name="propertyType" defaultValue={searchParams.propertyType ?? ''}
                className="bg-ink-soft border border-white/20 px-3 py-2">
          <option value="">ทุกประเภท</option>
          {Object.entries(PROPERTY_TYPE_LABEL).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
        </select>
        <select name="listingType" defaultValue={searchParams.listingType ?? ''}
                className="bg-ink-soft border border-white/20 px-3 py-2">
          <option value="">ขาย/เช่า</option>
          <option value="sale">ขาย</option>
          <option value="rent">เช่า</option>
        </select>
        <input name="zone" defaultValue={searchParams.zone ?? ''} placeholder="ทำเล เช่น ทองหล่อ"
               className="bg-ink-soft border border-white/20 px-3 py-2" />
        <input name="minPrice" type="number" min={0} step={1000} defaultValue={searchParams.minPrice ?? ''}
               placeholder="ราคาต่ำสุด" className="bg-ink-soft border border-white/20 px-3 py-2 w-36" />
        <input name="maxPrice" type="number" min={0} step={1000} defaultValue={searchParams.maxPrice ?? ''}
               placeholder="ราคาสูงสุด" className="bg-ink-soft border border-white/20 px-3 py-2 w-36" />
        <select name="sort" defaultValue={searchParams.sort ?? 'featured'}
                className="bg-ink-soft border border-white/20 px-3 py-2">
          {Object.entries(SORT_OPTIONS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
        </select>
        <button className="bg-red hover:bg-red-bright text-white px-6 py-2 uppercase text-xs tracking-[.14em]">
          ค้นหา
        </button>
      </form>

      {items.length === 0 ? (
        <p className="text-muted py-20 text-center">ไม่พบทรัพย์ที่ตรงกับเงื่อนไข</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((p: any) => <PropertyCard key={p.id} p={p} locale={locale} />)}
        </div>
      )}
      {meta && <p className="text-muted text-xs mt-10 text-center">พบทั้งหมด {meta.total} รายการ</p>}
      {meta && meta.totalPages > 1 && (
        <Pagination page={meta.page} totalPages={meta.totalPages} searchParams={searchParams} />
      )}

      <div className="mt-16 pt-10 border-t border-white/10">
        <PropertyAlertForm criteria={{
          propertyType: searchParams.propertyType, listingType: searchParams.listingType,
          zone: searchParams.zone, minPrice: searchParams.minPrice, maxPrice: searchParams.maxPrice,
        }} />
      </div>
    </div>
  );
}

function Pagination({ page, totalPages, searchParams }: {
  page: number; totalPages: number; searchParams: Record<string, string | undefined>;
}) {
  const hrefFor = (p: number) => {
    const qs = new URLSearchParams(
      Object.entries({ ...searchParams, page: String(p) })
        .filter(([, v]) => v !== undefined && v !== '') as [string, string][],
    );
    return `/properties?${qs.toString()}`;
  };
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex justify-center items-center gap-2 mt-6 text-sm">
      <Link href={hrefFor(Math.max(1, page - 1))} aria-disabled={page <= 1}
            className={`px-3 py-1.5 border border-white/20 ${page <= 1 ? 'pointer-events-none opacity-30' : 'hover:border-red hover:text-red'}`}>
        ก่อนหน้า
      </Link>
      {pages.map((p) => (
        <Link key={p} href={hrefFor(p)}
              className={`px-3 py-1.5 border ${p === page ? 'bg-red border-red text-white' : 'border-white/20 hover:border-red hover:text-red'}`}>
          {p}
        </Link>
      ))}
      <Link href={hrefFor(Math.min(totalPages, page + 1))} aria-disabled={page >= totalPages}
            className={`px-3 py-1.5 border border-white/20 ${page >= totalPages ? 'pointer-events-none opacity-30' : 'hover:border-red hover:text-red'}`}>
        ถัดไป
      </Link>
    </div>
  );
}
