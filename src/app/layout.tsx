import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { FloatingContact } from '@/components/FloatingContact';
import { getSettings } from '@/lib/api';

export const metadata: Metadata = {
  title: { default: 'D1LANDANDHOUSE', template: '%s | D1LANDANDHOUSE' },
  description: 'ที่ปรึกษาอสังหาริมทรัพย์ ซื้อ ขาย เช่า บ้าน คอนโด ที่ดิน ทั่วประเทศไทย',
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const settings = await getSettings().catch(() => null);
  return (
    <html lang="th">
      <head>
        <link rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500&family=Noto+Serif+Thai:wght@300;400;500&family=IBM+Plex+Sans+Thai:wght@300;400;500;600&display=swap" />
      </head>
      <body>
        <Header settings={settings} />
        <main>{children}</main>
        <Footer settings={settings} />
        <FloatingContact settings={settings} />
      </body>
    </html>
  );
}
