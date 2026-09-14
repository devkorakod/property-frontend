export function formatPrice(value?: number | null): string {
  if (value == null) return 'ติดต่อสอบถาม';
  return new Intl.NumberFormat('th-TH', {
    style: 'currency', currency: 'THB', maximumFractionDigits: 0,
  }).format(value);
}

export function formatPriceShort(value?: number | null): string {
  if (value == null) return 'ติดต่อสอบถาม';
  if (value >= 1_000_000) return `${trim(value / 1_000_000)} ล้าน`;
  if (value >= 1_000) return `${trim(value / 1_000)} พัน`;
  return value.toLocaleString('th-TH');
}

const trim = (n: number) => Number(n.toFixed(2)).toString();

export function formatSqm(sqm?: number | null): string {
  if (!sqm) return '-';
  return `${new Intl.NumberFormat('th-TH', { maximumFractionDigits: 2 }).format(sqm)} ตร.ม.`;
}

export function formatThaiArea(rai = 0, ngan = 0, wah = 0): string {
  const parts: string[] = [];
  if (rai) parts.push(`${rai} ไร่`);
  if (ngan) parts.push(`${ngan} งาน`);
  if (wah) parts.push(`${wah} ตร.ว.`);
  return parts.join(' ') || '-';
}

export function localized(v: { th: string; en?: string } | undefined | null, locale: 'th' | 'en' = 'th') {
  if (!v) return '';
  return (locale === 'en' && v.en) ? v.en : v.th;
}

export const PROPERTY_TYPE_LABEL: Record<string, string> = {
  house: 'บ้านเดี่ยว', condo: 'คอนโดมิเนียม', land: 'ที่ดิน', townhouse: 'ทาวน์เฮาส์',
  commercial: 'อาคารพาณิชย์', apartment: 'อพาร์ตเมนต์', villa: 'วิลล่า',
  office: 'สำนักงาน', warehouse: 'โกดัง', hotel: 'โรงแรม',
};

export const LISTING_TYPE_LABEL: Record<string, string> = {
  sale: 'ขาย', rent: 'เช่า', sale_rent: 'ขาย/เช่า',
};
