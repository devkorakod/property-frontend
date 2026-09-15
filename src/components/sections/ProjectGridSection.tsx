import Link from 'next/link';
import Image from 'next/image';
import { localized, zoneLabel } from '@/lib/format';
import { getLocale } from '@/lib/locale';

type Text = string | { th?: string; en?: string };
export interface ProjectGridData { eyebrow?: Text; heading?: Text }

export function ProjectGridSection({ data, items }: { data: ProjectGridData; items: any[] }) {
  if (items.length === 0) return null;
  const locale = getLocale();
  const eyebrow = localized(data.eyebrow, locale);
  const heading = localized(data.heading, locale);
  return (
    <section className="max-w-container mx-auto px-5 py-16 border-t border-white/10">
      {eyebrow && <p className="eyebrow mb-2">{eyebrow}</p>}
      {heading && <h2 className="font-thai-display text-3xl font-light mb-10">{heading}</h2>}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {items.map((pr: any) => (
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
    </section>
  );
}
