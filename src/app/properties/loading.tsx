import { Spinner } from '@/components/Spinner';

export default function Loading() {
  return (
    <div className="max-w-container mx-auto px-5 py-12">
      <Spinner />
      <div className="animate-pulse">
        <div className="h-3 w-24 bg-white/10 mb-4" />
        <div className="h-8 w-52 bg-white/10 mb-8" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i}>
              <div className="aspect-[3/2] bg-ink-soft mb-4" />
              <div className="h-3 w-2/3 bg-white/10 mb-2" />
              <div className="h-4 w-1/2 bg-white/10" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
