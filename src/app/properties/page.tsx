import { listProperties } from '@/lib/api';
import { PropertyCard } from '@/components/PropertyCard';
import { PROPERTY_TYPE_LABEL } from '@/lib/format';

export const metadata = { title: 'ทรัพย์ทั้งหมด' };

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

  return (
    <div className="max-w-container mx-auto px-5 py-14">
      <p className="eyebrow mb-2">Properties</p>
      <h1 className="font-thai-display text-3xl font-light mb-8">ทรัพย์ทั้งหมด</h1>

      <form className="flex flex-wrap gap-3 mb-10 text-sm" method="get">
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
        <button className="bg-red hover:bg-red-bright text-white px-6 py-2 uppercase text-xs tracking-[.14em]">
          ค้นหา
        </button>
      </form>

      {items.length === 0 ? (
        <p className="text-muted py-20 text-center">ไม่พบทรัพย์ที่ตรงกับเงื่อนไข</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((p: any) => <PropertyCard key={p.id} p={p} />)}
        </div>
      )}
      {meta && <p className="text-muted text-xs mt-10 text-center">พบทั้งหมด {meta.total} รายการ</p>}
    </div>
  );
}
