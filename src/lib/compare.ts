export interface CompareProperty {
  id: string; slug: string; title: string; coverUrl?: string; price?: number; code?: string;
  propertyType?: string; listingType?: string;
  spec?: { bedrooms?: number; bathrooms?: number; parking?: number };
  area?: { usableSqm?: number };
  location?: { zone?: string; zoneEn?: string };
}

const STORAGE_KEY = 'd1-compare';
const CHANGE_EVENT = 'd1-compare-changed';
export const MAX_COMPARE = 4;

export function readCompare(): CompareProperty[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function writeCompare(items: CompareProperty[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    window.dispatchEvent(new Event(CHANGE_EVENT));
  } catch { /* พื้นที่จัดเก็บเต็มหรือถูกปิด — ไม่ใช่เรื่องคอขวด ปล่อยผ่าน */ }
}

export function isComparing(id: string): boolean {
  return readCompare().some((c) => c.id === id);
}

/** คืนค่า { added, atLimit } — atLimit true แปลว่าเต็มแล้วและไม่ได้เพิ่มให้ */
export function toggleCompare(property: CompareProperty): { added: boolean; atLimit: boolean } {
  const current = readCompare();
  const exists = current.some((c) => c.id === property.id);
  if (exists) {
    writeCompare(current.filter((c) => c.id !== property.id));
    return { added: false, atLimit: false };
  }
  if (current.length >= MAX_COMPARE) return { added: false, atLimit: true };
  writeCompare([...current, property]);
  return { added: true, atLimit: false };
}

export function removeFromCompare(id: string) {
  writeCompare(readCompare().filter((c) => c.id !== id));
}

export function clearCompare() {
  writeCompare([]);
}

export function onCompareChange(cb: () => void) {
  window.addEventListener(CHANGE_EVENT, cb);
  window.addEventListener('storage', cb);
  return () => {
    window.removeEventListener(CHANGE_EVENT, cb);
    window.removeEventListener('storage', cb);
  };
}
