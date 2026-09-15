import type { Locale } from './locale';

const dict = {
  nav_buy: { th: 'ซื้อ', en: 'Buy' },
  nav_rent: { th: 'เช่า', en: 'Rent' },
  nav_projects: { th: 'โครงการ', en: 'Projects' },
  nav_loanCalculator: { th: 'คำนวณสินเชื่อ', en: 'Loan Calculator' },
  nav_favorites: { th: 'รายการโปรด', en: 'Favorites' },
  nav_contact: { th: 'ติดต่อเรา', en: 'Contact' },

  footer_tagline: { th: 'ที่ปรึกษาอสังหาริมทรัพย์ ให้บริการซื้อ ขาย เช่า และการลงทุนทั่วประเทศไทย', en: 'Real estate advisory for buying, selling, renting, and investing across Thailand.' },
  footer_propertiesHeading: { th: 'ทรัพย์สิน', en: 'Properties' },
  footer_servicesHeading: { th: 'บริการ', en: 'Services' },
  footer_service_listing: { th: 'ฝากขาย–ฝากเช่า', en: 'List for sale / rent' },
  footer_service_advisory: { th: 'ที่ปรึกษาการลงทุน', en: 'Investment advisory' },
  footer_service_foreign: { th: 'บริการลูกค้าต่างชาติ', en: 'Foreign client services' },
  footer_contactHeading: { th: 'ติดต่อ', en: 'Contact' },
  footer_privacyPolicy: { th: 'นโยบายความเป็นส่วนตัว', en: 'Privacy Policy' },
  footer_terms: { th: 'ข้อกำหนดการใช้งาน', en: 'Terms of Use' },

  floatingContact_callNow: { th: 'โทรเลย', en: 'Call now' },

  share_toFacebook: { th: 'แชร์ไป Facebook', en: 'Share to Facebook' },
  share_toLine: { th: 'แชร์ไป LINE', en: 'Share to LINE' },
  share_copyLink: { th: 'คัดลอกลิงก์', en: 'Copy link' },
  share_copied: { th: 'คัดลอกแล้ว', en: 'Copied' },

  propertyCard_noImage: { th: 'ไม่มีรูปภาพ', en: 'No image' },
  propertyCard_featured: { th: 'แนะนำ', en: 'Featured' },
  propertyCard_bedroomsSuffix: { th: 'นอน', en: 'bed' },

  favorite_remove: { th: 'ลบออกจากรายการโปรด', en: 'Remove from favorites' },
  favorite_add: { th: 'บันทึกไว้ดูทีหลัง', en: 'Save for later' },
  favorite_saved: { th: 'บันทึกแล้ว', en: 'Saved' },
  favorite_save: { th: 'บันทึก', en: 'Save' },

  compare_bar_label: { th: 'เปรียบเทียบ', en: 'Compare' },
  compare_bar_view: { th: 'ดูเปรียบเทียบ', en: 'View comparison' },
  compare_bar_clear: { th: 'ล้าง', en: 'Clear' },
  compare_quick_remove: { th: 'เอาออกจากรายการเปรียบเทียบ', en: 'Remove from comparison' },
  compare_quick_add: { th: 'เพิ่มไปเปรียบเทียบ', en: 'Add to comparison' },
  compare_quick_active: { th: 'เทียบอยู่', en: 'Comparing' },
  compare_quick_default: { th: 'เทียบ', en: 'Compare' },
  compare_quick_limit: { th: 'เทียบได้สูงสุด {n} รายการ', en: 'Compare up to {n} listings' },
  compare_page_title: { th: 'เปรียบเทียบทรัพย์', en: 'Compare Properties' },
  compare_page_empty: { th: 'เลือกทรัพย์อย่างน้อย 2 รายการเพื่อเปรียบเทียบ — กดปุ่ม "เทียบ" ที่การ์ดทรัพย์', en: 'Select at least 2 listings to compare — click the "Compare" button on a property card' },
  compare_page_removeRow: { th: 'เอาออก', en: 'Remove' },
  compare_row_price: { th: 'ราคา', en: 'Price' },
  compare_row_type: { th: 'ประเภท', en: 'Type' },
  compare_row_zone: { th: 'ทำเล', en: 'Zone' },
  compare_row_bedrooms: { th: 'ห้องนอน', en: 'Bedrooms' },
  compare_row_bathrooms: { th: 'ห้องน้ำ', en: 'Bathrooms' },
  compare_row_parking: { th: 'ที่จอดรถ', en: 'Parking' },
  compare_row_usableArea: { th: 'พื้นที่ใช้สอย', en: 'Usable area' },

  leadForm_namePlaceholder: { th: 'ชื่อ–นามสกุล', en: 'Full name' },
  leadForm_phonePlaceholder: { th: 'เบอร์โทรศัพท์', en: 'Phone number' },
  leadForm_emailPlaceholder: { th: 'อีเมล (ถ้ามี)', en: 'Email (optional)' },
  leadForm_intent_buy: { th: 'ต้องการซื้อ', en: 'Looking to buy' },
  leadForm_intent_rent: { th: 'ต้องการเช่า', en: 'Looking to rent' },
  leadForm_intent_sell: { th: 'ฝากขาย', en: 'Sell with us' },
  leadForm_intent_invest: { th: 'ลงทุน', en: 'Investing' },
  leadForm_messagePlaceholder: { th: 'รายละเอียดเพิ่มเติม', en: 'Additional details' },
  leadForm_sending: { th: 'กำลังส่ง...', en: 'Sending...' },
  leadForm_submit: { th: 'ส่งข้อมูลให้ทีมงาน', en: 'Send to our team' },
  leadForm_error: { th: 'ส่งข้อมูลไม่สำเร็จ กรุณาลองใหม่อีกครั้ง', en: 'Failed to send. Please try again.' },

  alertForm_eyebrow: { th: 'Property Alert', en: 'Property Alert' },
  alertForm_heading: { th: 'แจ้งเตือนเมื่อมีทรัพย์ใหม่ตรงใจ', en: 'Get notified about new matching listings' },
  alertForm_body_withCriteria: { th: 'ฝากอีเมลไว้ เราจะแจ้งทันทีที่มีทรัพย์ใหม่ตรงเงื่อนไขการค้นหาด้านบน', en: "Leave your email and we'll notify you as soon as a new listing matches your search above." },
  alertForm_body_default: { th: 'ฝากอีเมลไว้ เราจะแจ้งทันทีที่มีทรัพย์ใหม่ลงประกาศ', en: "Leave your email and we'll notify you as soon as a new listing goes live." },
  alertForm_emailPlaceholder: { th: 'อีเมลของคุณ', en: 'Your email' },
  alertForm_sending: { th: 'กำลังส่ง...', en: 'Sending...' },
  alertForm_submit: { th: 'แจ้งเตือนฉัน', en: 'Notify me' },
  alertForm_error: { th: 'ส่งไม่สำเร็จ ลองใหม่อีกครั้ง', en: 'Failed to submit. Please try again.' },
  alertForm_genericError: { th: 'ผิดพลาด', en: 'Something went wrong' },

  loan_priceLabel: { th: 'ราคาทรัพย์ (บาท)', en: 'Property price (THB)' },
  loan_downPaymentLabel: { th: 'เงินดาวน์ ({pct}%)', en: 'Down payment ({pct}%)' },
  loan_interestLabel: { th: 'ดอกเบี้ย ({rate}% ต่อปี)', en: 'Interest ({rate}% / year)' },
  loan_termLabel: { th: 'ระยะเวลาผ่อน ({years} ปี)', en: 'Loan term ({years} years)' },
  loan_downPayment: { th: 'เงินดาวน์', en: 'Down payment' },
  loan_loanAmount: { th: 'ยอดกู้', en: 'Loan amount' },
  loan_monthlyPayment: { th: 'ผ่อนต่อเดือน (ประมาณ)', en: 'Est. monthly payment' },
  loan_pageTitle: { th: 'คำนวณสินเชื่อเบื้องต้น', en: 'Loan Calculator' },
  loan_propertyDetailHeading: { th: 'คำนวณสินเชื่อเบื้องต้น', en: 'Estimate your loan' },

  agent_metaSuffix: { th: '— ตัวแทนอสังหาริมทรัพย์', en: '— Real Estate Agent' },
  agent_metaFallback: { th: 'ตัวแทน', en: 'Agent' },
  agent_eyebrow: { th: 'ตัวแทนอสังหาริมทรัพย์', en: 'Real Estate Agent' },
  agent_propertiesHeading: { th: 'ทรัพย์ที่ดูแล ({n})', en: 'Listings managed ({n})' },
  agent_noProperties: { th: 'ยังไม่มีทรัพย์ที่เผยแพร่', en: 'No published listings yet' },
  agent_viewAllProperties: { th: 'ดูทรัพย์ทั้งหมดของตัวแทนนี้', en: "View this agent's full listings" },
  agent_manager: { th: 'ผู้ดูแลทรัพย์', en: 'Listing agent' },

  contact_metaTitle: { th: 'ติดต่อเรา', en: 'Contact Us' },
  contact_heading: { th: 'ติดต่อทีมงาน', en: 'Get in touch' },
  contact_phone: { th: 'โทร', en: 'Phone' },
  contact_email: { th: 'อีเมล', en: 'Email' },
  contact_officeHours: { th: 'เวลาทำการ', en: 'Office hours' },

  favorites_pageTitle: { th: 'รายการโปรดของฉัน', en: 'My Favorites' },
  favorites_empty: { th: 'ยังไม่มีทรัพย์ที่บันทึกไว้ — กดไอคอนรูปหัวใจที่การ์ดทรัพย์เพื่อบันทึกไว้ดูทีหลัง', en: 'No saved listings yet — tap the heart icon on a property card to save it for later.' },
  favorites_removeButton: { th: 'ลบ', en: 'Remove' },

  properties_metaTitle: { th: 'ทรัพย์ทั้งหมด', en: 'All Properties' },
  properties_pageHeading: { th: 'ทรัพย์ทั้งหมด', en: 'All Properties' },
  properties_keywordPlaceholder: { th: 'ค้นหาชื่อทรัพย์ โครงการ คำอธิบาย...', en: 'Search by name, project, description...' },
  properties_allTypes: { th: 'ทุกประเภท', en: 'All types' },
  properties_saleOrRent: { th: 'ขาย/เช่า', en: 'Sale/Rent' },
  properties_zonePlaceholder: { th: 'ทำเล เช่น ทองหล่อ', en: 'Zone, e.g. Thonglor' },
  properties_minPricePlaceholder: { th: 'ราคาต่ำสุด', en: 'Min price' },
  properties_maxPricePlaceholder: { th: 'ราคาสูงสุด', en: 'Max price' },
  properties_search: { th: 'ค้นหา', en: 'Search' },
  properties_empty: { th: 'ไม่พบทรัพย์ที่ตรงกับเงื่อนไข', en: 'No properties match your search' },
  properties_totalFound: { th: 'พบทั้งหมด {n} รายการ', en: '{n} listings found' },
  properties_sort_newest: { th: 'ใหม่ล่าสุด', en: 'Newest' },
  properties_sort_featured: { th: 'แนะนำ', en: 'Featured' },
  properties_sort_priceAsc: { th: 'ราคา: ต่ำ-สูง', en: 'Price: low to high' },
  properties_sort_priceDesc: { th: 'ราคา: สูง-ต่ำ', en: 'Price: high to low' },
  pagination_prev: { th: 'ก่อนหน้า', en: 'Previous' },
  pagination_next: { th: 'ถัดไป', en: 'Next' },

  propertyDetail_contactForPrice: { th: 'ติดต่อสอบถาม', en: 'Contact for price' },
  propertyDetail_bedroomsSuffix: { th: 'ห้องนอน', en: 'bedrooms' },
  propertyDetail_bathroomsSuffix: { th: 'ห้องน้ำ', en: 'bathrooms' },
  propertyDetail_parkingSuffix: { th: 'ที่จอดรถ', en: 'parking' },
  propertyDetail_zonePrefix: { th: 'ทำเล', en: 'Zone' },
  propertyDetail_relatedEyebrow: { th: 'Related', en: 'Related' },
  propertyDetail_relatedHeading: { th: 'ทรัพย์ใกล้เคียงที่น่าสนใจ', en: 'Related properties nearby' },

  map_title: { th: 'ทำเลที่ตั้งทรัพย์', en: 'Property location' },
  map_openInGoogle: { th: 'เปิดดูใน Google Maps', en: 'Open in Google Maps' },

  projects_metaTitle: { th: 'โครงการทั้งหมด', en: 'All Projects' },
  projects_pageHeading: { th: 'โครงการทั้งหมด', en: 'All Projects' },
  projects_empty: { th: 'ยังไม่มีโครงการที่เผยแพร่', en: 'No published projects yet' },
  projectDetail_unitsHeading: { th: 'ยูนิตที่ว่าง', en: 'Available units' },
  projectDetail_noUnits: { th: 'ยังไม่มียูนิตที่เผยแพร่ในขณะนี้', en: 'No units published yet' },

  sectionGrid_viewAll: { th: 'ดูทั้งหมด', en: 'View all' },
} as const;

export type DictKey = keyof typeof dict;

export function t(locale: Locale, key: DictKey, vars?: Record<string, string | number>): string {
  let out: string = dict[key][locale] ?? dict[key].th;
  if (vars) {
    for (const [k, v] of Object.entries(vars)) out = out.replaceAll(`{${k}}`, String(v));
  }
  return out;
}
