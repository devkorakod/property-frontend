import { notFound } from 'next/navigation';
import Image from 'next/image';
import { getProject } from '@/lib/api';
import { PropertyCard } from '@/components/PropertyCard';
import { localized } from '@/lib/format';
import { ApiClientError } from '@/lib/api';
import { getLocale } from '@/lib/locale';
import { t } from '@/lib/i18n';

export default async function ProjectDetailPage({ params }: { params: { slug: string } }) {
  let project;
  try {
    project = await getProject(params.slug);
  } catch (e) {
    if (e instanceof ApiClientError && e.status === 404) notFound();
    throw e;
  }
  const locale = getLocale();

  return (
    <div className="max-w-container mx-auto px-5 py-12">
      <p className="eyebrow mb-2">{localized(project.developer, locale)}</p>
      <h1 className="font-thai-display text-3xl font-light mb-6">{localized(project.name, locale)}</h1>

      <div className="aspect-[21/9] bg-ink-soft mb-10 overflow-hidden relative">
        {project.coverImage?.url && (
          <Image src={project.coverImage.url} alt="" fill priority sizes="100vw" className="object-cover" />
        )}
      </div>

      {project.description && (
        <p className="text-white/80 leading-relaxed max-w-3xl mb-10">{localized(project.description, locale)}</p>
      )}

      <h2 className="font-thai-display text-2xl font-light mb-6">{t(locale, 'projectDetail_unitsHeading')}</h2>
      {project.units?.length ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {project.units.map((u: any) => <PropertyCard key={u._id ?? u.slug} p={u} locale={locale} />)}
        </div>
      ) : (
        <p className="text-muted">{t(locale, 'projectDetail_noUnits')}</p>
      )}
    </div>
  );
}
