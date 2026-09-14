import { getPage } from '@/lib/api';
import { renderSections } from '@/components/sections/SectionRenderer';

export default async function HomePage() {
  const page = await getPage('home').catch(() => ({ sections: [] as any[] }));
  const rendered = await renderSections(page.sections);
  return <>{rendered}</>;
}
