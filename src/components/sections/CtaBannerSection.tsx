import Link from 'next/link';

export interface CtaBannerData {
  heading?: string; body?: string; buttonLabel?: string; buttonHref?: string;
}

export function CtaBannerSection({ data }: { data: CtaBannerData }) {
  return (
    <section className="bg-white text-ink py-16">
      <div className="max-w-container mx-auto px-5 text-center max-w-2xl">
        {data.heading && <h2 className="font-thai-display text-3xl font-light mb-4">{data.heading}</h2>}
        {data.body && <p className="text-black/60 mb-8">{data.body}</p>}
        {data.buttonLabel && (
          <Link href={data.buttonHref || '#'} className="inline-block bg-red hover:bg-red-bright text-white px-8 py-3.5 text-xs uppercase tracking-[.16em]">
            {data.buttonLabel}
          </Link>
        )}
      </div>
    </section>
  );
}
