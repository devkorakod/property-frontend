export function PropertyMap({ coordinates }: { coordinates: [number, number] }) {
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
          title="ทำเลที่ตั้งทรัพย์"
        />
      </div>
      <a href={googleMapsUrl} target="_blank" rel="noreferrer"
         className="text-xs text-muted hover:text-red underline mt-2 inline-block">
        เปิดดูใน Google Maps
      </a>
    </div>
  );
}
