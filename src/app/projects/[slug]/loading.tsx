import { Spinner } from '@/components/Spinner';

export default function Loading() {
  return (
    <div className="max-w-container mx-auto px-5 py-12">
      <Spinner />
      <div className="animate-pulse">
        <div className="h-3 w-40 bg-white/10 mb-4" />
        <div className="h-8 w-2/3 bg-white/10 mb-6" />
        <div className="aspect-[16/9] bg-ink-soft mb-10" />
        <div className="space-y-4 max-w-2xl">
          <div className="h-4 w-full bg-white/5" />
          <div className="h-4 w-full bg-white/5" />
          <div className="h-4 w-2/3 bg-white/5" />
        </div>
      </div>
    </div>
  );
}
