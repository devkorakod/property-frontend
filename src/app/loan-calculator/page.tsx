import { getSettings } from '@/lib/api';
import { LoanCalculator } from '@/components/LoanCalculator';

export const metadata = { title: 'คำนวณสินเชื่อ' };

export default async function LoanCalculatorPage() {
  const settings = await getSettings().catch(() => null);
  const defaults = settings?.loanDefaults ?? { interestRate: 3.5, termYears: 30, downPaymentPercent: 10 };

  return (
    <div className="max-w-container mx-auto px-5 py-14">
      <p className="eyebrow mb-2 text-center">Loan Calculator</p>
      <h1 className="font-thai-display text-3xl font-light mb-10 text-center">คำนวณสินเชื่อเบื้องต้น</h1>
      <LoanCalculator defaults={defaults} />
    </div>
  );
}
