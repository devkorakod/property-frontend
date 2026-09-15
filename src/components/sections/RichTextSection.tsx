import Image from 'next/image';

export interface RichTextData {
  eyebrow?: string; heading?: string; body?: string;
  imageUrl?: string; imagePosition?: 'left' | 'right' | 'none';
}

export function RichTextSection({ data }: { data: RichTextData }) {
  const hasImage = data.imageUrl && data.imagePosition !== 'none';
  const imageFirst = data.imagePosition === 'left';

  const text = (
    <div>
      {data.eyebrow && <p className="eyebrow mb-2">{data.eyebrow}</p>}
      {data.heading && <h2 className="font-thai-display text-3xl font-light mb-4">{data.heading}</h2>}
      {data.body && <p className="text-white/75 leading-relaxed whitespace-pre-line max-w-[60ch]">{data.body}</p>}
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
