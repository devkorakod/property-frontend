import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { getProperty, getSettings } from '@/lib/api';
import { LeadForm } from '@/components/LeadForm';
import { PropertyCard } from '@/components/PropertyCard';
import { PropertyGallery } from '@/components/PropertyGallery';
import { LoanCalculator } from '@/components/LoanCalculator';
import { FavoriteButton } from '@/components/FavoriteButton';
import { ShareButtons } from '@/components/ShareButtons';
import { PropertyMap } from '@/components/PropertyMap';
import {
  formatPrice, formatSqm, formatThaiArea, localized, propertyTypeLabel, listingTypeLabel,
} from '@/lib/format';
import { ApiClientError } from '@/lib/api';
import { getLocale } from '@/lib/locale';
import { t } from '@/lib/i18n';

async function loadProperty(slug: string) {
  try {
    return await getProperty(slug);
  } catch (e) {
    if (e instanceof ApiClientError && e.status === 404) return null;
    throw e;
  }
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const p = await loadProperty(params.slug);
  if (!p) return {};
  const locale = getLocale();
  return {
    title: localized(p.seo?.metaTitle, locale) || localized(p.title, locale),
    description: localized(p.seo?.metaDescription, locale) || localized(p.description, locale)?.slice(0, 160),
  };
}

export default async function PropertyDetailPage({ params }: { params: { slug: string } }) {
  const [p, settings] = await Promise.all([
    loadProperty(params.slug),
    getSettings().catch(() => null),
  ]);
  if (!p) notFound();
  const locale = getLocale();
  const loanDefaults = settings?.loanDefaults ?? { interestRate: 3.5, termYears: 30, downPaymentPercent: 10 };

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'RealEstateListing',
    name: localized(p.title, locale),
    image: [p.coverImage?.url, ...(p.gallery ?? []).map((g: any) => g.url)].filter(Boolean),
    ...(p.price?.sale && !p.price?.hidePrice ? {
      offers: { '@type': 'Offer', price: p.promotion?.finalPrice ?? p.price.sale, priceCurrency: 'THB' },
    } : {}),
  };

  return (
    <div className="max-w-container mx-auto px-5 py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <p className="eyebrow mb-2">
        {propertyTypeLabel(p.propertyType, locale)} · {listingTypeLabel(p.listingType, locale)} · {p.code}
      </p>
      <div className="flex items-start justify-between gap-4 mb-6 flex-wrap">
        <h1 className="font-thai-display text-3xl font-light">{localized(p.title, locale)}</h1>
        <div className="flex items-center gap-3">
          <FavoriteButton locale={locale} property={{
            id: p.id, slug: p.slug, title: localized(p.title, locale), coverUrl: p.coverImage?.url,
            price: p.promotion?.finalPrice ?? p.price?.sale ?? p.price?.rentMonthly, code: p.code,
          }} />
          <ShareButtons title={localized(p.title, locale)} locale={locale} />
        </div>
      </div>

      <PropertyGallery cover={p.coverImage} gallery={p.gallery} />

      <div className="grid lg:grid-cols-[1fr_360px] gap-12">
        <div>
          <p className="font-display text-red-bright text-3xl mb-6">
            {p.price?.hidePrice ? t(locale, 'propertyDetail_contactForPrice') : formatPrice(p.promotion?.finalPrice ?? p.price?.sale ?? p.price?.rentMonthly, locale)}
          </p>

          <div className="flex gap-6 flex-wrap text-sm text-muted border-y border-white/10 py-4 mb-6">
            {p.spec?.bedrooms != null && <span>{p.spec.bedrooms} {t(locale, 'propertyDetail_bedroomsSuffix')}</span>}
            {p.spec?.bathrooms != null && <span>{p.spec.bathrooms} {t(locale, 'propertyDetail_bathroomsSuffix')}</span>}
            {p.spec?.parking != null && <span>{p.spec.parking} {t(locale, 'propertyDetail_parkingSuffix')}</span>}
            {p.area?.usableSqm ? <span>{formatSqm(p.area.usableSqm, locale)}</span> : null}
            {p.area?.landRai || p.area?.landNgan || p.area?.landWah ? (
              <span>{formatThaiArea(p.area.landRai, p.area.landNgan, p.area.landWah, locale)}</span>
            ) : null}
          </div>

          {p.description && (
            <p className="text-white/80 leading-relaxed whitespace-pre-line mb-8">{localized(p.description, locale)}</p>
          )}

          {p.highlights?.length > 0 && (
            <ul className="space-y-2 mb-8">
              {p.highlights.map((h: any, i: number) => (
                <li key={i} className="flex gap-3 text-sm">
                  <span className="text-red">—</span>{localized(h, locale)}
                </li>
              ))}
            </ul>
          )}

          {p.location?.address && (
            <p className="text-sm text-muted mb-6">
              {t(locale, 'propertyDetail_zonePrefix')}: {localized(p.location.address, locale)} {p.location.zone ? `(${p.location.zone})` : ''}
            </p>
          )}

          {p.location?.geo?.coordinates && <PropertyMap coordinates={p.location.geo.coordinates} locale={locale} />}

          {p.listingType === 'sale' && p.price?.sale && !p.price?.hidePrice && (
            <div className="mt-10 pt-10 border-t border-white/10">
              <h2 className="font-thai-display text-xl font-light mb-6">{t(locale, 'loan_propertyDetailHeading')}</h2>
              <LoanCalculator defaults={loanDefaults} initialPrice={p.promotion?.finalPrice ?? p.price.sale} compact locale={locale} />
            </div>
          )}
        </div>

        <aside className="lg:sticky lg:top-6 h-fit bg-ink-soft p-6">
          {p.agent && (
            <div className="mb-6 pb-6 border-b border-white/10">
              <p className="text-xs text-muted mb-1">{t(locale, 'agent_manager')}</p>
              <p className="font-thai-display text-lg">{p.agent.name}</p>
              {p.agent.phone && <a href={`tel:${p.agent.phone}`} className="text-red text-sm block">{p.agent.phone}</a>}
              <Link href={`/agents/${p.agent.id}`} className="text-xs text-muted hover:text-red underline">
                {t(locale, 'agent_viewAllProperties')}
              </Link>
            </div>
          )}
          <LeadForm propertyId={p.id} source="property_form" locale={locale} />
        </aside>
      </div>

      {p.relatedProperties?.length > 0 && (
        <div className="mt-16 pt-12 border-t border-white/10">
          <p className="eyebrow mb-2">{t(locale, 'propertyDetail_relatedEyebrow')}</p>
          <h2 className="font-thai-display text-2xl font-light mb-8">{t(locale, 'propertyDetail_relatedHeading')}</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {p.relatedProperties.map((rp: any) => <PropertyCard key={rp.id} p={rp} locale={locale} />)}
          </div>
        </div>
      )}
    </div>
  );
}
