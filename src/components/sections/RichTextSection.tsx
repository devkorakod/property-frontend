import Image from 'next/image';
import { localized } from '@/lib/format';
import { getLocale } from '@/lib/locale';

type Text = string | { th?: string; en?: string };

export interface RichTextData {
  eyebrow?: Text; heading?: Text; body?: Text;
  imageUrl?: string; imagePosition?: 'left' | 'right' | 'none';
}

export function RichTextSection({ data }: { data: RichTextData }) {
  const locale = getLocale();
  const eyebrow = localized(data.eyebrow, locale);
  const heading = localized(data.heading, locale);
  const body = localized(data.body, locale);
  const hasImage = data.imageUrl && data.imagePosition !== 'none';
  const imageFirst = data.imagePosition === 'left';

  const text = (
    <div>
      {eyebrow && <p className="eyebrow mb-2">{eyebrow}</p>}
      {heading && <h2 className="font-thai-display text-3xl font-light mb-4">{heading}</h2>}
      {body && <p className="text-white/75 leading-relaxed whitespace-pre-line max-w-[60ch]">{body}</p>}
    </div>
  );

  const image = hasImage ? (
    <div className="relative w-full aspect-[4/3]">
      <Image src={data.imageUrl!} alt="" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
    </div>
  ) : null;

  return (
    <section className="max-w-container mx-auto px-5 py-16 border-t border-white/10">
      {hasImage ? (
        <div className="grid md:grid-cols-2 gap-10 items-center">
          {imageFirst ? <>{image}{text}</> : <>{text}{image}</>}
        </div>
      ) : text}
    </section>
  );
}
