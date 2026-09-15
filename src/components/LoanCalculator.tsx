'use client';

import { useMemo, useState } from 'react';
import { formatPrice } from '@/lib/format';

export interface LoanDefaults {
  interestRate: number; termYears: number; downPaymentPercent: number;
  disclaimer?: { th?: string; en?: string };
}

export function LoanCalculator({ defaults, initialPrice, compact = false }: {
  defaults: LoanDefaults; initialPrice?: number; compact?: boolean;
}) {
  const [price, setPrice] = useState(initialPrice ?? 3_000_000);
  const [downPaymentPercent, setDownPaymentPercent] = useState(defaults.downPaymentPercent);
  const [interestRate, setInterestRate] = useState(defaults.interestRate);
  const [termYears, setTermYears] = useState(defaults.termYears);

  const { downPayment, loanAmount, monthlyPayment } = useMemo(() => {
    const dp = (price * downPaymentPercent) / 100;
    const principal = Math.max(0, price - dp);
    const monthlyRate = interestRate / 100 / 12;
    const months = termYears * 12;
    const payment = monthlyRate === 0
      ? principal / months
      : (principal * monthlyRate * (1 + monthlyRate) ** months) / ((1 + monthlyRate) ** months - 1);
    return { downPayment: dp, loanAmount: principal, monthlyPayment: payment || 0 };
  }, [price, downPaymentPercent, interestRate, termYears]);

  return (
    <div className={compact ? '' : 'max-w-2xl mx-auto'}>
      <div className="grid sm:grid-cols-2 gap-4 mb-6">
        <Field label="ราคาทรัพย์ (บาท)">
          <input type="number" min={0} step={10000} value={price}
                 onChange={(e) => setPrice(Number(e.target.value))}
                 className="bg-ink-soft border border-white/20 px-3 py-2 w-full" />
        </Field>
        <Field label={`เงินดาวน์ (${downPaymentPercent}%)`}>
          <input type="range" min={0} max={50} step={5} value={downPaymentPercent}
                 onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                 className="w-full" />
        </Field>
        <Field label={`ดอกเบี้ย (${interestRate}% ต่อปี)`}>
          <input type="range" min={0} max={10} step={0.1} value={interestRate}
                 onChange={(e) => setInterestRate(Number(e.target.value))}
                 className="w-full" />
        </Field>
        <Field label={`ระยะเวลาผ่อน (${termYears} ปี)`}>
          <input type="range" min={5} max={35} step={1} value={termYears}
                 onChange={(e) => setTermYears(Number(e.target.value))}
                 className="w-full" />
        </Field>
      </div>

      <div className="bg-ink-soft border border-white/10 p-5 grid sm:grid-cols-3 gap-4 text-center">
        <div>
          <p className="text-muted text-xs mb-1">เงินดาวน์</p>
          <p className="font-display text-lg">{formatPrice(downPayment)}</p>
        </div>
        <div>
          <p className="text-muted text-xs mb-1">ยอดกู้</p>
          <p className="font-display text-lg">{formatPrice(loanAmount)}</p>
        </div>
        <div>
          <p className="text-muted text-xs mb-1">ผ่อนต่อเดือน (ประมาณ)</p>
          <p className="font-display text-lg text-red-bright">{formatPrice(monthlyPayment)}</p>
        </div>
      </div>

      {defaults.disclaimer?.th && (
        <p className="text-muted text-xs mt-4">{defaults.disclaimer.th}</p>
      )}
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <label className="block text-sm"><span className="block text-muted mb-1 text-xs">{label}</span>{children}</label>;
}
