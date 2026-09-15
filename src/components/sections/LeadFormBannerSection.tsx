import { LeadForm } from '@/components/LeadForm';
import { getLocale } from '@/lib/locale';

export interface LeadFormBannerData { eyebrow?: string; heading?: string; body?: string }

export function LeadFormBannerSection({ data }: { data: LeadFormBannerData }) {
  const locale = getLocale();
  return (
    <section className="bg-white text-ink py-16">
      <div className="max-w-container mx-auto px-5 grid lg:grid-cols-2 gap-12">
        <div>
          {data.eyebrow && <p className="eyebrow mb-2">{data.eyebrow}</p>}
          {data.heading && <h2 className="font-thai-display text-3xl font-light mb-4">{data.heading}</h2>}
          {data.body && <p className="text-black/60 max-w-[52ch]">{data.body}</p>}
        </div>
        <div className="text-white">
          <div className="bg-ink p-6">
            <LeadForm source="general_form" locale={locale} />
          </div>
        </div>
      </div>
    </section>
  );
}
