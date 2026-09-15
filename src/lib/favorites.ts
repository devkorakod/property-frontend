export interface FavoriteProperty {
  id: string; slug: string; title: string; coverUrl?: string; price?: number; code?: string;
}

const STORAGE_KEY = 'd1-favorites';
const CHANGE_EVENT = 'd1-favorites-changed';

export function readFavorites(): FavoriteProperty[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function writeFavorites(items: FavoriteProperty[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    window.dispatchEvent(new Event(CHANGE_EVENT));
  } catch { /* พื้นที่จัดเก็บเต็มหรือถูกปิด — ไม่ใช่เรื่องคอขวด ปล่อยผ่าน */ }
}

export function isFavorite(id: string): boolean {
  return readFavorites().some((f) => f.id === id);
}

export function toggleFavorite(property: FavoriteProperty): boolean {
  const current = readFavorites();
  const exists = current.some((f) => f.id === property.id);
  writeFavorites(exists ? current.filter((f) => f.id !== property.id) : [...current, property]);
  return !exists;
}

export function onFavoritesChange(cb: () => void) {
  window.addEventListener(CHANGE_EVENT, cb);
  window.addEventListener('storage', cb);
  return () => {
    window.removeEventListener(CHANGE_EVENT, cb);
    window.removeEventListener('storage', cb);
  };
}
