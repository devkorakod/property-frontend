import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { FloatingContact } from '@/components/FloatingContact';
import { CompareBar } from '@/components/CompareBar';
import { GoogleAnalytics } from '@/components/GoogleAnalytics';
import { getSettings } from '@/lib/api';
import { getLocale } from '@/lib/locale';

export async function generateMetadata(): Promise<Metadata> {
  const locale = getLocale();
  return {
    title: { default: 'D1LANDANDHOUSE', template: '%s | D1LANDANDHOUSE' },
    description: locale === 'en'
      ? 'Real estate advisory — buy, sell, rent houses, condos, and land across Thailand.'
      : 'ที่ปรึกษาอสังหาริมทรัพย์ ซื้อ ขาย เช่า บ้าน คอนโด ที่ดิน ทั่วประเทศไทย',
  };
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const settings = await getSettings().catch(() => null);
  const locale = getLocale();
  return (
    <html lang={locale}>
      <head>
        <link rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500&family=Noto+Serif+Thai:wght@300;400;500&family=IBM+Plex+Sans+Thai:wght@300;400;500;600&display=swap" />
      </head>
      <body>
        <GoogleAnalytics />
        <Header settings={settings} />
        <main>{children}</main>
        <Footer settings={settings} />
        <FloatingContact settings={settings} />
        <CompareBar locale={locale} />
      </body>
    </html>
  );
}
