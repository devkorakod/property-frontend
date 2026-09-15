import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { listProjects } from '@/lib/api';
import { localized, zoneLabel } from '@/lib/format';
import { getLocale } from '@/lib/locale';
import { t } from '@/lib/i18n';

export async function generateMetadata(): Promise<Metadata> {
  return { title: t(getLocale(), 'projects_metaTitle') };
}

export default async function ProjectsPage() {
  const projects = await listProjects().catch(() => []);
  const locale = getLocale();
  return (
    <div className="max-w-container mx-auto px-5 py-14">
      <p className="eyebrow mb-2">Projects</p>
      <h1 className="font-thai-display text-3xl font-light mb-10">{t(locale, 'projects_pageHeading')}</h1>
      {projects.length === 0 ? (
        <p className="text-muted py-20 text-center">{t(locale, 'projects_empty')}</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((pr: any) => (
            <Link key={pr.id} href={`/projects/${pr.slug}`} className="group block">
              <div className="aspect-[3/2] bg-ink-soft overflow-hidden relative">
                {pr.coverImage?.url && (
                  <Image src={pr.coverImage.url} alt="" fill
                         sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                         className="object-cover group-hover:scale-105 transition-transform duration-500" />
                )}
              </div>
              <h3 className="font-thai-display text-lg mt-4">{localized(pr.name, locale)}</h3>
              <p className="text-xs text-muted mt-1">{zoneLabel(pr.location, locale)}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
