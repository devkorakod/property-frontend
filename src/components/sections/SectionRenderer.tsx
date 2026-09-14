import { HeroSection } from './HeroSection';
import { RichTextSection } from './RichTextSection';
import { CtaBannerSection } from './CtaBannerSection';
import { LeadFormBannerSection } from './LeadFormBannerSection';
import { PropertyGridSection } from './PropertyGridSection';
import { ProjectGridSection } from './ProjectGridSection';
import { listProperties, listProjects } from '@/lib/api';

export interface Section { _id?: string; type: string; visible?: boolean; data: any }

/**
 * ★ หัวใจของ Page Builder ฝั่งหน้าบ้าน — สั่งซ่อน/แสดง/เรียงลำดับ/แก้เนื้อหาได้จากหลังบ้าน
 * โดยไม่ต้อง deploy โค้ดใหม่ ชนิด section ที่ยังไม่รู้จักถูกข้ามไปเงียบๆ ไม่ทำให้ทั้งหน้าพัง
 */
export async function renderSection(section: Section, i: number) {
  if (section.visible === false) return null;
  const data = section.data ?? {};

  switch (section.type) {
    case 'hero':
      return <HeroSection key={i} data={data} />;

    case 'richText':
      return <RichTextSection key={i} data={data} />;

    case 'ctaBanner':
      return <CtaBannerSection key={i} data={data} />;

    case 'leadForm':
      return <LeadFormBannerSection key={i} data={data} />;

    case 'featuredProperties': {
      const { items } = await listProperties({ isFeatured: 'true', limit: data.limit ?? 4 }).catch(() => ({ items: [] as any[] }));
      return <PropertyGridSection key={i} data={data} items={items} />;
    }

    case 'latestProperties': {
      const { items } = await listProperties({ sort: 'newest', limit: data.limit ?? 8 }).catch(() => ({ items: [] as any[] }));
      return <PropertyGridSection key={i} data={data} items={items} bordered />;
    }

    case 'featuredProjects': {
      const projects = await listProjects().catch(() => [] as any[]);
      return <ProjectGridSection key={i} data={data} items={projects.slice(0, data.limit ?? 3)} />;
    }

    default:
      if (process.env.NODE_ENV !== 'production') {
        console.warn(`[SectionRenderer] ไม่รู้จัก section type "${section.type}"`);
      }
      return null;
  }
}

export async function renderSections(sections: Section[]) {
  return Promise.all(sections.map((s, i) => renderSection(s, i)));
}
