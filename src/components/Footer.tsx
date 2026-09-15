import { getLocale } from '@/lib/locale';
import { t } from '@/lib/i18n';
import { propertyTypeLabel } from '@/lib/format';

export function Footer({ settings }: { settings?: any }) {
  const cc = settings?.contactChannels ?? {};
  const locale = getLocale();
  return (
    <footer className="border-t border-white/10 mt-24">
      <div className="max-w-container mx-auto px-5 py-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="font-display text-lg tracking-[.28em]">
            D1<span className="text-red">·</span>LANDANDHOUSE
          </div>
          <p className="text-muted text-sm mt-4 max-w-[34ch]">
            {t(locale, 'footer_tagline')}
          </p>
        </div>
        <div>
          <h4 className="eyebrow mb-3">{t(locale, 'footer_propertiesHeading')}</h4>
          <ul className="text-sm text-muted space-y-1.5">
            <li>{propertyTypeLabel('house', locale)}</li>
            <li>{propertyTypeLabel('condo', locale)}</li>
            <li>{propertyTypeLabel('land', locale)}</li>
            <li>{propertyTypeLabel('commercial', locale)}</li>
          </ul>
        </div>
        <div>
          <h4 className="eyebrow mb-3">{t(locale, 'footer_servicesHeading')}</h4>
          <ul className="text-sm text-muted space-y-1.5">
            <li>{t(locale, 'footer_service_listing')}</li>
            <li>{t(locale, 'footer_service_advisory')}</li>
            <li>{t(locale, 'footer_service_foreign')}</li>
          </ul>
        </div>
        <div>
          <h4 className="eyebrow mb-3">{t(locale, 'footer_contactHeading')}</h4>
          <ul className="text-sm text-muted space-y-1.5">
            {cc.phone && <li>{cc.phone}</li>}
            {cc.lineId && <li>LINE {cc.lineId}</li>}
            {cc.email && <li>{cc.email}</li>}
          </ul>
        </div>
      </div>
      <div className="max-w-container mx-auto px-5 pb-8 text-xs text-muted flex gap-6 flex-wrap">
        <span>© {new Date().getFullYear()} D1 Land and House Co., Ltd.</span>
        <span>{t(locale, 'footer_privacyPolicy')}</span>
        <span>{t(locale, 'footer_terms')}</span>
      </div>
    </footer>
  );
}
