'use client';

import { useState } from 'react';
import { BASE } from '@/lib/api';

export interface AlertCriteria {
  propertyType?: string; listingType?: string; zone?: string;
  minPrice?: string; maxPrice?: string;
}

export function PropertyAlertForm({ criteria = {} }: { criteria?: AlertCriteria }) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'busy' | 'done' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const hasCriteria = Object.values(criteria).some(Boolean);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('busy');
    try {
      const res = await fetch(`${BASE}/public/property-alerts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, ...criteria }),
      });
      const json = await res.json();
      if (!res.ok || !json.success) throw new Error(json?.error?.message ?? 'ผิดพลาด');
      setMessage(json.data.message.th);
      setStatus('done');
      setEmail('');
    } catch {
      setStatus('error');
      setMessage('ส่งไม่สำเร็จ ลองใหม่อีกครั้ง');
    }
  }

  return (
    <div className="max-w-lg mx-auto text-center">
      <p className="eyebrow mb-2">Property Alert</p>
      <h2 className="font-thai-display text-2xl font-light mb-2">แจ้งเตือนเมื่อมีทรัพย์ใหม่ตรงใจ</h2>
      <p className="text-muted text-sm mb-6">
        {hasCriteria
          ? 'ฝากอีเมลไว้ เราจะแจ้งทันทีที่มีทรัพย์ใหม่ตรงเงื่อนไขการค้นหาด้านบน'
          : 'ฝากอีเมลไว้ เราจะแจ้งทันทีที่มีทรัพย์ใหม่ลงประกาศ'}
      </p>
      {status === 'done' ? (
        <p className="text-green-500 text-sm">{message}</p>
      ) : (
        <form onSubmit={submit} className="flex gap-3 flex-wrap justify-center">
          <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                 placeholder="อีเมลของคุณ" disabled={status === 'busy'}
                 className="bg-ink-soft border border-white/20 px-3 py-2 text-sm flex-1 min-w-[220px]" />
          <button disabled={status === 'busy'}
                  className="bg-red hover:bg-red-bright text-white px-6 py-2 uppercase text-xs tracking-[.14em] disabled:opacity-60">
            {status === 'busy' ? 'กำลังส่ง...' : 'แจ้งเตือนฉัน'}
          </button>
        </form>
      )}
      {status === 'error' && <p className="text-red text-sm mt-2">{message}</p>}
    </div>
  );
}
