import Link from 'next/link';
import { localized } from '@/lib/format';
import { getLocale } from '@/lib/locale';

type Text = string | { th?: string; en?: string };

export interface CtaBannerData {
  heading?: Text; body?: Text; buttonLabel?: Text; buttonHref?: string;
}

export function CtaBannerSection({ data }: { data: CtaBannerData }) {
  const locale = getLocale();
  const heading = localized(data.heading, locale);
  const body = localized(data.body, locale);
  const buttonLabel = localized(data.buttonLabel, locale);

  return (
    <section className="bg-white text-ink py-16">
      <div className="max-w-container mx-auto px-5 text-center max-w-2xl">
        {heading && <h2 className="font-thai-display text-3xl font-light mb-4">{heading}</h2>}
        {body && <p className="text-black/60 mb-8">{body}</p>}
        {buttonLabel && (
          <Link href={data.buttonHref || '#'} className="inline-block bg-red hover:bg-red-bright text-white px-8 py-3.5 text-xs uppercase tracking-[.16em]">
            {buttonLabel}
          </Link>
        )}
      </div>
    </section>
  );
}
