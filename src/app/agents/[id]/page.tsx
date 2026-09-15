import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getAgent, ApiClientError } from '@/lib/api';
import { PropertyCard } from '@/components/PropertyCard';

async function loadAgent(id: string) {
  try {
    return await getAgent(id);
  } catch (e) {
    if (e instanceof ApiClientError && e.status === 404) return null;
    throw e;
  }
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const agent = await loadAgent(params.id);
  return { title: agent ? `${agent.name} — ตัวแทนอสังหาริมทรัพย์` : 'ตัวแทน' };
}

export default async function AgentPage({ params }: { params: { id: string } }) {
  const agent = await loadAgent(params.id);
  if (!agent) notFound();

  return (
    <div className="max-w-container mx-auto px-5 py-14">
      <div className="flex items-center gap-5 mb-12 pb-10 border-b border-white/10">
        <div className="w-20 h-20 rounded-full bg-ink-soft overflow-hidden shrink-0">
          {agent.avatarUrl && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={agent.avatarUrl} alt={agent.name} className="w-full h-full object-cover" />
          )}
        </div>
        <div>
          <p className="eyebrow mb-1">ตัวแทนอสังหาริมทรัพย์</p>
          <h1 className="font-thai-display text-2xl font-light">{agent.name}</h1>
          <div className="flex gap-4 mt-2 text-sm">
            {agent.phone && <a href={`tel:${agent.phone}`} className="text-red hover:text-red-bright">{agent.phone}</a>}
            {agent.lineId && <span className="text-muted">LINE: {agent.lineId}</span>}
          </div>
          {agent.bio?.th && <p className="text-muted text-sm mt-3 max-w-2xl">{agent.bio.th}</p>}
        </div>
      </div>

      <h2 className="font-thai-display text-xl font-light mb-8">
        ทรัพย์ที่ดูแล ({agent.properties.length})
      </h2>
      {agent.properties.length === 0 ? (
        <p className="text-muted py-10 text-center">ยังไม่มีทรัพย์ที่เผยแพร่</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {agent.properties.map((p: any) => <PropertyCard key={p.id} p={p} />)}
        </div>
      )}
    </div>
  );
}
