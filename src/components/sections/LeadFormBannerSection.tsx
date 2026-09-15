import { LeadForm } from '@/components/LeadForm';
import { getLocale } from '@/lib/locale';
import { localized } from '@/lib/format';

type Text = string | { th?: string; en?: string };

export interface LeadFormBannerData { eyebrow?: Text; heading?: Text; body?: Text }

export function LeadFormBannerSection({ data }: { data: LeadFormBannerData }) {
  const locale = getLocale();
  const eyebrow = localized(data.eyebrow, locale);
  const heading = localized(data.heading, locale);
  const body = localized(data.body, locale);
  return (
    <section className="bg-white text-ink py-16">
      <div className="max-w-container mx-auto px-5 grid lg:grid-cols-2 gap-12">
        <div>
          {eyebrow && <p className="eyebrow mb-2">{eyebrow}</p>}
          {heading && <h2 className="font-thai-display text-3xl font-light mb-4">{heading}</h2>}
          {body && <p className="text-black/60 max-w-[52ch]">{body}</p>}
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
