import Link from 'next/link';
import { listProjects } from '@/lib/api';

export const metadata = { title: 'โครงการทั้งหมด' };

export default async function ProjectsPage() {
  const projects = await listProjects().catch(() => []);
  return (
    <div className="max-w-container mx-auto px-5 py-14">
      <p className="eyebrow mb-2">Projects</p>
      <h1 className="font-thai-display text-3xl font-light mb-10">โครงการทั้งหมด</h1>
      {projects.length === 0 ? (
        <p className="text-muted py-20 text-center">ยังไม่มีโครงการที่เผยแพร่</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((pr: any) => (
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
      )}
    </div>
  );
}
