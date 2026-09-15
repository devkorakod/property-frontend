import type { Locale } from '@/lib/locale';
import { t } from '@/lib/i18n';

export function PropertyMap({ coordinates, locale = 'th' }: { coordinates: [number, number]; locale?: Locale }) {
  const [lng, lat] = coordinates;
  const delta = 0.006;
  const bbox = [lng - delta, lat - delta, lng + delta, lat + delta].join('%2C');
  const embedUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat}%2C${lng}`;
  const googleMapsUrl = `https://www.google.com/maps?q=${lat},${lng}`;

  return (
    <div className="mb-6">
      <div className="aspect-[16/9] border border-white/10 overflow-hidden">
        <iframe
          src={embedUrl}
          className="w-full h-full grayscale-[.2] contrast-[1.05]"
          loading="lazy"
          title={t(locale, 'map_title')}
        />
      </div>
      <a href={googleMapsUrl} target="_blank" rel="noreferrer"
         className="text-xs text-muted hover:text-red underline mt-2 inline-block">
        {t(locale, 'map_openInGoogle')}
      </a>
    </div>
  );
}
