export function Spinner({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center py-10 ${className}`}>
      <div className="w-8 h-8 border-2 border-white/15 border-t-red rounded-full animate-spin" />
    </div>
  );
}
