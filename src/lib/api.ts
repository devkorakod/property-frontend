const BASE = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000/api/v1';

interface FetchOptions extends RequestInit {
  /** วินาทีที่ให้ Next.js cache หน้า (ISR) — 0 = ไม่ cache */
  revalidate?: number;
  tags?: string[];
}

export class ApiClientError extends Error {
  constructor(public code: string, message: string, public status: number) {
    super(message);
  }
}

async function rawFetch(path: string, opts: FetchOptions = {}) {
  const { revalidate, tags, ...init } = opts;
  const res = await fetch(`${BASE}${path}`, {
    ...init,
    headers: { 'Content-Type': 'application/json', ...(init.headers ?? {}) },
    next: revalidate === 0 ? { revalidate: 0 } : { revalidate: revalidate ?? 60, tags },
  });

  const json = await res.json().catch(() => null);
  if (!res.ok || !json?.success) {
    throw new ApiClientError(
      json?.error?.code ?? 'INTERNAL_ERROR',
      json?.error?.message ?? 'เกิดข้อผิดพลาดในการเชื่อมต่อ',
      res.status,
    );
  }
  return json;
}

export async function apiFetch<T>(path: string, opts: FetchOptions = {}): Promise<T> {
  return (await rawFetch(path, opts)).data as T;
}

export interface PageMeta { page: number; limit: number; total: number; totalPages: number }
export interface Paginated<T> { items: T[]; meta?: PageMeta }

export async function apiFetchPaginated<T>(path: string, opts: FetchOptions = {}): Promise<Paginated<T>> {
  const json = await rawFetch(path, opts);
  return { items: json.data as T[], meta: json.meta as PageMeta | undefined };
}

export const getSettings = () => apiFetch<any>('/public/settings', { revalidate: 300, tags: ['settings'] });

export const listProperties = (params: Record<string, string | number | undefined> = {}) => {
  const qs = new URLSearchParams(
    Object.entries(params).filter(([, v]) => v !== undefined && v !== '') as [string, string][],
  ).toString();
  return apiFetchPaginated<any>(`/public/properties${qs ? `?${qs}` : ''}`, { revalidate: 60 });
};

export const getProperty = (slug: string) =>
  apiFetch<any>(`/public/properties/${slug}`, { revalidate: 60, tags: [`property:${slug}`] });

export const listProjects = () => apiFetch<any[]>('/public/projects', { revalidate: 300 });

export const getProject = (slug: string) =>
  apiFetch<any>(`/public/projects/${slug}`, { revalidate: 300, tags: [`project:${slug}`] });

export const listActivePromotions = () => apiFetch<any[]>('/public/promotions', { revalidate: 60 });

export interface LeadPayload {
  source: string; name: string; phone: string; email?: string; intent: string;
  message?: string; propertyId?: string; projectId?: string;
  preferredChannel?: string; preferredTime?: string; consentAccepted: true;
  pageUrl?: string; website?: string;
}

export const submitLead = (payload: LeadPayload) =>
  apiFetch<{ refNo: string; message: { th: string; en: string } }>('/public/leads', {
    method: 'POST', body: JSON.stringify(payload), revalidate: 0,
  });
