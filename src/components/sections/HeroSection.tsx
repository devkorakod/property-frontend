import Link from 'next/link';

export interface HeroData {
  eyebrow?: string; title?: string; titleEm?: string; subtitle?: string;
  primaryCtaLabel?: string; primaryCtaHref?: string;
  secondaryCtaLabel?: string; secondaryCtaHref?: string;
  imageUrl?: string;
}

export function HeroSection({ data }: { data: HeroData }) {
  return (
    <section className="relative min-h-[70vh] flex items-end pb-24 overflow-hidden bg-ink-soft">
      {data.imageUrl && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={data.imageUrl} alt="" className="absolute inset-0 w-full h-full object-cover opacity-60" />
      )}
      <div className="max-w-container mx-auto px-5 relative z-10 max-w-2xl">
        {data.eyebrow && <p className="eyebrow mb-4">{data.eyebrow}</p>}
        <h1 className="font-thai-display font-light text-[clamp(34px,5.6vw,62px)] leading-tight mb-5">
          {data.title}
          {data.titleEm && <><br /><em className="not-italic text-red-bright">{data.titleEm}</em></>}
        </h1>
        {data.subtitle && <p className="text-white/75 max-w-[52ch] mb-8">{data.subtitle}</p>}
        <div className="flex gap-3 flex-wrap">
          {data.primaryCtaLabel && (
            <Link href={data.primaryCtaHref || '#'} className="bg-red hover:bg-red-bright text-white px-8 py-3.5 text-xs uppercase tracking-[.16em]">
              {data.primaryCtaLabel}
            </Link>
          )}
          {data.secondaryCtaLabel && (
            <Link href={data.secondaryCtaHref || '#'} className="border border-red text-red-bright hover:bg-red hover:text-white px-8 py-3.5 text-xs uppercase tracking-[.16em] transition-colors">
              {data.secondaryCtaLabel}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
