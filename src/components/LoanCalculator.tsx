'use client';

import { useMemo, useState } from 'react';
import { formatPrice, localized } from '@/lib/format';
import type { Locale } from '@/lib/locale';
import { t } from '@/lib/i18n';

export interface LoanDefaults {
  interestRate: number; termYears: number; downPaymentPercent: number;
  disclaimer?: { th?: string; en?: string };
}

export function LoanCalculator({ defaults, initialPrice, compact = false, locale = 'th' }: {
  defaults: LoanDefaults; initialPrice?: number; compact?: boolean; locale?: Locale;
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
        <Field label={t(locale, 'loan_priceLabel')}>
          <input type="number" min={0} step={10000} value={price}
                 onChange={(e) => setPrice(Number(e.target.value))}
                 className="bg-ink-soft border border-white/20 px-3 py-2 w-full" />
        </Field>
        <Field label={t(locale, 'loan_downPaymentLabel', { pct: downPaymentPercent })}>
          <input type="range" min={0} max={50} step={5} value={downPaymentPercent}
                 onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                 className="w-full" />
        </Field>
        <Field label={t(locale, 'loan_interestLabel', { rate: interestRate })}>
          <input type="range" min={0} max={10} step={0.1} value={interestRate}
                 onChange={(e) => setInterestRate(Number(e.target.value))}
                 className="w-full" />
        </Field>
        <Field label={t(locale, 'loan_termLabel', { years: termYears })}>
          <input type="range" min={5} max={35} step={1} value={termYears}
                 onChange={(e) => setTermYears(Number(e.target.value))}
                 className="w-full" />
        </Field>
      </div>

      <div className="bg-ink-soft border border-white/10 p-5 grid sm:grid-cols-3 gap-4 text-center">
        <div>
          <p className="text-muted text-xs mb-1">{t(locale, 'loan_downPayment')}</p>
          <p className="font-display text-lg">{formatPrice(downPayment, locale)}</p>
        </div>
        <div>
          <p className="text-muted text-xs mb-1">{t(locale, 'loan_loanAmount')}</p>
          <p className="font-display text-lg">{formatPrice(loanAmount, locale)}</p>
        </div>
        <div>
          <p className="text-muted text-xs mb-1">{t(locale, 'loan_monthlyPayment')}</p>
          <p className="font-display text-lg text-red-bright">{formatPrice(monthlyPayment, locale)}</p>
        </div>
      </div>

      {defaults.disclaimer?.th && (
        <p className="text-muted text-xs mt-4">{localized(defaults.disclaimer, locale)}</p>
      )}
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <label className="block text-sm"><span className="block text-muted mb-1 text-xs">{label}</span>{children}</label>;
}
