'use client';

import { useState } from 'react';
import { submitLead } from '@/lib/api';

export function LeadForm({ propertyId, source = 'general_form' }: { propertyId?: string; source?: string }) {
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');
  const [message, setMessage] = useState('');

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('sending');
    const form = new FormData(e.currentTarget);
    try {
      const result = await submitLead({
        source,
        propertyId,
        name: String(form.get('name') || ''),
        phone: String(form.get('phone') || ''),
        email: String(form.get('email') || '') || undefined,
        intent: String(form.get('intent') || 'buy'),
        message: String(form.get('message') || '') || undefined,
        preferredChannel: String(form.get('preferredChannel') || 'phone'),
        preferredTime: 'anytime',
        consentAccepted: true,
        pageUrl: typeof window !== 'undefined' ? window.location.href : undefined,
        website: '',
      });
      setMessage(result.message.th);
      setStatus('done');
      (e.target as HTMLFormElement).reset();
    } catch {
      setStatus('error');
      setMessage('ส่งข้อมูลไม่สำเร็จ กรุณาลองใหม่อีกครั้ง');
    }
  }

  if (status === 'done') {
    return <p className="text-red-bright font-thai-display text-lg py-8">{message}</p>;
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <input name="name" required placeholder="ชื่อ–นามสกุล"
               className="bg-transparent border border-white/20 px-3 py-3 text-sm focus:border-red outline-none" />
        <input name="phone" required placeholder="เบอร์โทรศัพท์"
               className="bg-transparent border border-white/20 px-3 py-3 text-sm focus:border-red outline-none" />
      </div>
      <input name="email" type="email" placeholder="อีเมล (ถ้ามี)"
             className="w-full bg-transparent border border-white/20 px-3 py-3 text-sm focus:border-red outline-none" />
      <select name="intent" className="w-full bg-ink border border-white/20 px-3 py-3 text-sm focus:border-red outline-none">
        <option value="buy">ต้องการซื้อ</option>
        <option value="rent">ต้องการเช่า</option>
        <option value="sell">ฝากขาย</option>
        <option value="invest">ลงทุน</option>
      </select>
      <textarea name="message" rows={3} placeholder="รายละเอียดเพิ่มเติม"
                className="w-full bg-transparent border border-white/20 px-3 py-3 text-sm focus:border-red outline-none" />
      <button type="submit" disabled={status === 'sending'}
              className="w-full bg-red hover:bg-red-bright text-white uppercase tracking-[.16em] text-xs py-3.5 transition-colors disabled:opacity-60">
        {status === 'sending' ? 'กำลังส่ง...' : 'ส่งข้อมูลให้ทีมงาน'}
      </button>
      {status === 'error' && <p className="text-red-bright text-sm">{message}</p>}
    </form>
  );
}
