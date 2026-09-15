import type { Locale } from './locale';

export function formatPrice(value?: number | null, locale: Locale = 'th'): string {
  if (value == null) return locale === 'en' ? 'Contact for price' : 'ติดต่อสอบถาม';
  return new Intl.NumberFormat(locale === 'en' ? 'en-US' : 'th-TH', {
    style: 'currency', currency: 'THB', maximumFractionDigits: 0,
  }).format(value);
}

export function formatPriceShort(value?: number | null, locale: Locale = 'th'): string {
  if (value == null) return locale === 'en' ? 'Contact for price' : 'ติดต่อสอบถาม';
  if (value >= 1_000_000) return `${trim(value / 1_000_000)}${locale === 'en' ? 'M' : ' ล้าน'}`;
  if (value >= 1_000) return `${trim(value / 1_000)}${locale === 'en' ? 'K' : ' พัน'}`;
  return value.toLocaleString(locale === 'en' ? 'en-US' : 'th-TH');
}

const trim = (n: number) => Number(n.toFixed(2)).toString();

export function formatSqm(sqm?: number | null, locale: Locale = 'th'): string {
  if (!sqm) return '-';
  const n = new Intl.NumberFormat(locale === 'en' ? 'en-US' : 'th-TH', { maximumFractionDigits: 2 }).format(sqm);
  return `${n} ${locale === 'en' ? 'sqm' : 'ตร.ม.'}`;
}

export function formatThaiArea(rai = 0, ngan = 0, wah = 0, locale: Locale = 'th'): string {
  const units = locale === 'en'
    ? { rai: 'rai', ngan: 'ngan', wah: 'sq.wah' }
    : { rai: 'ไร่', ngan: 'งาน', wah: 'ตร.ว.' };
  const parts: string[] = [];
  if (rai) parts.push(`${rai} ${units.rai}`);
  if (ngan) parts.push(`${ngan} ${units.ngan}`);
  if (wah) parts.push(`${wah} ${units.wah}`);
  return parts.join(' ') || '-';
}

type Localizable = string | { th?: string; en?: string } | undefined | null;

/**
 * รับได้ทั้ง {th,en} และ string เดี่ยวแบบเก่า (เช่น Page section data ที่บันทึกไว้ก่อนรองรับ EN)
 * — string เดี่ยวถือเป็น fallback แสดงเหมือนกันทุกภาษา จนกว่าจะมีคนแก้ผ่านหลังบ้านอีกที
 */
export function localized(v: Localizable, locale: 'th' | 'en' = 'th'): string {
  if (!v) return '';
  if (typeof v === 'string') return v;
  return ((locale === 'en' && v.en) ? v.en : v.th) ?? '';
}

export function zoneLabel(location: { zone?: string; zoneEn?: string } | undefined | null, locale: Locale = 'th'): string {
  if (!location) return '';
  return (locale === 'en' && location.zoneEn) ? location.zoneEn : (location.zone ?? '');
}

const PROPERTY_TYPE_LABELS: Record<Locale, Record<string, string>> = {
  th: {
    house: 'บ้านเดี่ยว', condo: 'คอนโดมิเนียม', land: 'ที่ดิน', townhouse: 'ทาวน์เฮาส์',
    commercial: 'อาคารพาณิชย์', apartment: 'อพาร์ตเมนต์', villa: 'วิลล่า',
    office: 'สำนักงาน', warehouse: 'โกดัง', hotel: 'โรงแรม',
  },
  en: {
    house: 'House', condo: 'Condominium', land: 'Land', townhouse: 'Townhouse',
    commercial: 'Commercial Building', apartment: 'Apartment', villa: 'Villa',
    office: 'Office', warehouse: 'Warehouse', hotel: 'Hotel',
  },
};

const LISTING_TYPE_LABELS: Record<Locale, Record<string, string>> = {
  th: { sale: 'ขาย', rent: 'เช่า', sale_rent: 'ขาย/เช่า' },
  en: { sale: 'Sale', rent: 'Rent', sale_rent: 'Sale/Rent' },
};

export function propertyTypeLabel(type: string | undefined, locale: Locale = 'th'): string {
  if (!type) return '';
  return PROPERTY_TYPE_LABELS[locale][type] ?? PROPERTY_TYPE_LABELS.th[type] ?? type;
}

export function propertyTypeLabels(locale: Locale = 'th'): Record<string, string> {
  return PROPERTY_TYPE_LABELS[locale];
}

export function listingTypeLabel(type: string | undefined, locale: Locale = 'th'): string {
  if (!type) return '';
  return LISTING_TYPE_LABELS[locale][type] ?? LISTING_TYPE_LABELS.th[type] ?? type;
}
