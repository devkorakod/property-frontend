import { notFound } from 'next/navigation';
import { getProject } from '@/lib/api';
import { PropertyCard } from '@/components/PropertyCard';
import { localized } from '@/lib/format';
import { ApiClientError } from '@/lib/api';

export default async function ProjectDetailPage({ params }: { params: { slug: string } }) {
  let project;
  try {
    project = await getProject(params.slug);
  } catch (e) {
    if (e instanceof ApiClientError && e.status === 404) notFound();
    throw e;
  }

  return (
    <div className="max-w-container mx-auto px-5 py-12">
      <p className="eyebrow mb-2">{localized(project.developer)}</p>
      <h1 className="font-thai-display text-3xl font-light mb-6">{localized(project.name)}</h1>

      <div className="aspect-[21/9] bg-ink-soft mb-10 overflow-hidden">
        {project.coverImage?.url && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={project.coverImage.url} alt="" className="w-full h-full object-cover" />
        )}
      </div>

      {project.description && (
        <p className="text-white/80 leading-relaxed max-w-3xl mb-10">{localized(project.description)}</p>
      )}

      <h2 className="font-thai-display text-2xl font-light mb-6">ยูนิตที่ว่าง</h2>
      {project.units?.length ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {project.units.map((u: any) => <PropertyCard key={u._id ?? u.slug} p={u} />)}
        </div>
      ) : (
        <p className="text-muted">ยังไม่มียูนิตที่เผยแพร่ในขณะนี้</p>
      )}
    </div>
  );
}
