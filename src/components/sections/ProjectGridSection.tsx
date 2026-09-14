import Link from 'next/link';

export interface ProjectGridData { eyebrow?: string; heading?: string }

export function ProjectGridSection({ data, items }: { data: ProjectGridData; items: any[] }) {
  if (items.length === 0) return null;
  return (
    <section className="max-w-container mx-auto px-5 py-16 border-t border-white/10">
      {data.eyebrow && <p className="eyebrow mb-2">{data.eyebrow}</p>}
      {data.heading && <h2 className="font-thai-display text-3xl font-light mb-10">{data.heading}</h2>}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {items.map((pr: any) => (
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
  );
}
