import type { Metadata } from 'next';
import { getSettings } from '@/lib/api';
import { LeadForm } from '@/components/LeadForm';
import { getLocale } from '@/lib/locale';
import { t } from '@/lib/i18n';

export async function generateMetadata(): Promise<Metadata> {
  return { title: t(getLocale(), 'contact_metaTitle') };
}

export default async function ContactPage() {
  const settings = await getSettings().catch(() => null);
  const cc = settings?.contactChannels ?? {};
  const locale = getLocale();

  return (
    <div className="max-w-container mx-auto px-5 py-14 grid lg:grid-cols-2 gap-12">
      <div>
        <p className="eyebrow mb-2">Contact</p>
        <h1 className="font-thai-display text-3xl font-light mb-6">{t(locale, 'contact_heading')}</h1>
        <ul className="space-y-3 text-sm text-white/80">
          {cc.phone && <li>{t(locale, 'contact_phone')}: <a href={`tel:${cc.phone}`} className="text-red">{cc.phone}</a></li>}
          {cc.lineId && <li>LINE: {cc.lineId}</li>}
          {cc.email && <li>{t(locale, 'contact_email')}: <a href={`mailto:${cc.email}`} className="text-red">{cc.email}</a></li>}
          {cc.officeHours && <li>{t(locale, 'contact_officeHours')}: {cc.officeHours}</li>}
        </ul>
      </div>
      <div className="bg-ink-soft p-6">
        <LeadForm source="general_form" locale={locale} />
      </div>
    </div>
  );
}
