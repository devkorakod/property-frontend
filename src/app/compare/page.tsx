'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { readCompare, removeFromCompare, onCompareChange, type CompareProperty } from '@/lib/compare';
import { formatPrice, formatSqm, PROPERTY_TYPE_LABEL } from '@/lib/format';

export default function ComparePage() {
  const [items, setItems] = useState<CompareProperty[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setItems(readCompare());
    setLoaded(true);
    return onCompareChange(() => setItems(readCompare()));
  }, []);

  const rows: { label: string; render: (p: CompareProperty) => React.ReactNode }[] = [
    { label: 'ราคา', render: (p) => <span className="text-red-bright font-display">{formatPrice(p.price)}</span> },
    { label: 'ประเภท', render: (p) => PROPERTY_TYPE_LABEL[p.propertyType ?? ''] ?? p.propertyType ?? '—' },
    { label: 'ทำเล', render: (p) => p.location?.zone || '—' },
    { label: 'ห้องนอน', render: (p) => p.spec?.bedrooms ?? '—' },
    { label: 'ห้องน้ำ', render: (p) => p.spec?.bathrooms ?? '—' },
    { label: 'ที่จอดรถ', render: (p) => p.spec?.parking ?? '—' },
    { label: 'พื้นที่ใช้สอย', render: (p) => (p.area?.usableSqm ? formatSqm(p.area.usableSqm) : '—') },
  ];

  return (
    <div className="max-w-container mx-auto px-5 py-14">
      <p className="eyebrow mb-2">Compare</p>
      <h1 className="font-thai-display text-3xl font-light mb-10">เปรียบเทียบทรัพย์</h1>

      {!loaded ? null : items.length < 2 ? (
        <p className="text-muted py-20 text-center">
          เลือกทรัพย์อย่างน้อย 2 รายการเพื่อเปรียบเทียบ — กดปุ่ม &quot;เทียบ&quot; ที่การ์ดทรัพย์
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse min-w-[600px]">
            <thead>
              <tr>
                <th className="w-32" />
                {items.map((p) => (
                  <th key={p.id} className="p-3 align-top text-left border-b border-white/10 min-w-[200px]">
                    <Link href={`/properties/${p.slug}`} className="block group">
                      <div className="aspect-[3/2] bg-ink-soft mb-3 overflow-hidden relative">
                        {p.coverUrl ? (
                          <Image src={p.coverUrl} alt={p.title} fill sizes="200px"
                                 className="object-cover group-hover:scale-105 transition-transform duration-500" />
                        ) : null}
                      </div>
                      <p className="text-xs text-muted">{p.code}</p>
                      <h3 className="font-thai-display text-base line-clamp-2 group-hover:text-red">{p.title}</h3>
                    </Link>
                    <button onClick={() => removeFromCompare(p.id)}
                            className="text-[11px] text-muted hover:text-red underline mt-2">
                      เอาออก
                    </button>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.label}>
                  <td className="p-3 text-sm text-muted border-b border-white/5 align-top">{row.label}</td>
                  {items.map((p) => (
                    <td key={p.id} className="p-3 text-sm border-b border-white/5 align-top">{row.render(p)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
