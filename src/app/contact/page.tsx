import { getSettings } from '@/lib/api';
import { LeadForm } from '@/components/LeadForm';

export const metadata = { title: 'ติดต่อเรา' };

export default async function ContactPage() {
  const settings = await getSettings().catch(() => null);
  const cc = settings?.contactChannels ?? {};

  return (
    <div className="max-w-container mx-auto px-5 py-14 grid lg:grid-cols-2 gap-12">
      <div>
        <p className="eyebrow mb-2">Contact</p>
        <h1 className="font-thai-display text-3xl font-light mb-6">ติดต่อทีมงาน</h1>
        <ul className="space-y-3 text-sm text-white/80">
          {cc.phone && <li>โทร: <a href={`tel:${cc.phone}`} className="text-red">{cc.phone}</a></li>}
          {cc.lineId && <li>LINE: {cc.lineId}</li>}
          {cc.email && <li>อีเมล: <a href={`mailto:${cc.email}`} className="text-red">{cc.email}</a></li>}
          {cc.officeHours && <li>เวลาทำการ: {cc.officeHours}</li>}
        </ul>
      </div>
      <div className="bg-ink-soft p-6">
        <LeadForm source="general_form" />
      </div>
    </div>
  );
}
