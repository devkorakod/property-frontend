import type { Metadata } from 'next';
import { getSettings } from '@/lib/api';
import { LoanCalculator } from '@/components/LoanCalculator';
import { getLocale } from '@/lib/locale';
import { t } from '@/lib/i18n';

export async function generateMetadata(): Promise<Metadata> {
  return { title: t(getLocale(), 'nav_loanCalculator') };
}

export default async function LoanCalculatorPage() {
  const settings = await getSettings().catch(() => null);
  const defaults = settings?.loanDefaults ?? { interestRate: 3.5, termYears: 30, downPaymentPercent: 10 };
  const locale = getLocale();

  return (
    <div className="max-w-container mx-auto px-5 py-14">
      <p className="eyebrow mb-2 text-center">Loan Calculator</p>
      <h1 className="font-thai-display text-3xl font-light mb-10 text-center">{t(locale, 'loan_pageTitle')}</h1>
      <LoanCalculator defaults={defaults} locale={locale} />
    </div>
  );
}
