import Link from 'next/link';
import { listProperties, listProjects } from '@/lib/api';
import { PropertyCard } from '@/components/PropertyCard';
import { LeadForm } from '@/components/LeadForm';

export default async function HomePage() {
  const [featuredRes, latestRes, projectsRes] = await Promise.all([
    listProperties({ isFeatured: 'true', limit: 4 }).catch(() => ({ items: [] })),
    listProperties({ sort: 'newest', limit: 8 }).catch(() => ({ items: [] })),
    listProjects().catch(() => []),
  ]);
  const featured = featuredRes.items;
  const latest = latestRes.items;
  const projects = projectsRes;

  return (
    <>
      <section className="relative min-h-[70vh] flex items-end pb-24 overflow-hidden bg-ink-soft">
        <div className="max-w-container mx-auto px-5 relative z-10 max-w-2xl">
          <p className="eyebrow mb-4">D1LANDANDHOUSE</p>
          <h1 className="font-thai-display font-light text-[clamp(34px,5.6vw,62px)] leading-tight mb-5">
            บ้าน คอนโด และที่ดิน<br /><em className="not-italic text-red-bright">คัดสรรเพื่อคุณ</em>
          </h1>
          <p className="text-white/75 max-w-[52ch] mb-8">
            ที่ปรึกษาอสังหาริมทรัพย์ครบวงจร ซื้อ ขาย เช่า และลงทุน ทั่วประเทศไทย
          </p>
          <div className="flex gap-3 flex-wrap">
            <Link href="/properties" className="bg-red hover:bg-red-bright text-white px-8 py-3.5 text-xs uppercase tracking-[.16em]">
              ดูทรัพย์ทั้งหมด
            </Link>
            <Link href="/contact" className="border border-red text-red-bright hover:bg-red hover:text-white px-8 py-3.5 text-xs uppercase tracking-[.16em] transition-colors">
              ติดต่อทีมงาน
            </Link>
          </div>
        </div>
      </section>

      {featured.length > 0 && (
        <section className="max-w-container mx-auto px-5 py-16">
          <div className="flex items-end gap-6 flex-wrap mb-10">
            <div>
              <p className="eyebrow mb-2">Featured</p>
              <h2 className="font-thai-display text-3xl font-light">ทรัพย์แนะนำ</h2>
            </div>
            <Link href="/properties" className="ml-auto text-xs uppercase tracking-[.14em] text-red border-b border-line pb-1">
              ดูทั้งหมด
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featured.map((p: any) => <PropertyCard key={p.id} p={p} />)}
          </div>
        </section>
      )}

      {projects.length > 0 && (
        <section className="max-w-container mx-auto px-5 py-16 border-t border-white/10">
          <p className="eyebrow mb-2">Projects</p>
          <h2 className="font-thai-display text-3xl font-light mb-10">โครงการแนะนำ</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.slice(0, 3).map((pr: any) => (
              <Link key={pr.id} href={`/projects/${pr.slug}`} className="group block">
                <div className="aspect-[3/2] bg-ink-soft overflow-hidden">
                  {pr.coverImage?.url && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={pr.coverImage.url} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  )}
                </div>
                <h3 className="font-thai-display text-lg mt-4">{pr.name?.th}</h3>
                <p className="text-xs text-muted mt-1">{pr.location?.zone}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {latest.length > 0 && (
        <section className="max-w-container mx-auto px-5 py-16 border-t border-white/10">
          <p className="eyebrow mb-2">New</p>
          <h2 className="font-thai-display text-3xl font-light mb-10">ทรัพย์ประกาศใหม่</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {latest.map((p: any) => <PropertyCard key={p.id} p={p} />)}
          </div>
        </section>
      )}

      <section className="bg-white text-ink py-16">
        <div className="max-w-container mx-auto px-5 grid lg:grid-cols-2 gap-12">
          <div>
            <p className="eyebrow mb-2">Let us find it for you</p>
            <h2 className="font-thai-display text-3xl font-light mb-4">บอกสิ่งที่คุณกำลังมองหา ให้เราหาให้</h2>
            <p className="text-black/60 max-w-[52ch]">
              ทรัพย์บางรายการไม่ได้ประกาศบนเว็บไซต์ ฝากความต้องการไว้กับเรา
              ที่ปรึกษาจะติดต่อกลับพร้อมตัวเลือกที่ตรงกับคุณภายใน 24 ชั่วโมง
            </p>
          </div>
          <div className="text-white">
            <div className="bg-ink p-6">
              <LeadForm source="general_form" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
