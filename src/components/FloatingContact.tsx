export function FloatingContact({ settings }: { settings?: any }) {
  const cc = settings?.contactChannels ?? {};
  const phone = cc.phone || '02-123-4567';
  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 items-end">
      {cc.lineUrl && (
        <a href={cc.lineUrl} target="_blank" rel="noreferrer"
           className="bg-ink-soft border border-line text-sm px-4 py-2.5 hover:border-red transition-colors">
          LINE
        </a>
      )}
      <a href={`tel:${phone}`}
         className="bg-red hover:bg-red-bright text-white text-sm px-5 py-3 uppercase tracking-[.1em]">
        โทรเลย
      </a>
    </div>
  );
}
