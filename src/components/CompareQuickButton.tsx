'use client';

import { useEffect, useState } from 'react';
import { isComparing, toggleCompare, onCompareChange, MAX_COMPARE, type CompareProperty } from '@/lib/compare';

export function CompareQuickButton({ property }: { property: CompareProperty }) {
  const [active, setActive] = useState(false);
  const [atLimit, setAtLimit] = useState(false);

  useEffect(() => {
    setActive(isComparing(property.id));
    return onCompareChange(() => setActive(isComparing(property.id)));
  }, [property.id]);

  function onClick(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    const result = toggleCompare(property);
    if (result.atLimit) {
      setAtLimit(true);
      setTimeout(() => setAtLimit(false), 2500);
      return;
    }
    setActive(result.added);
  }

  return (
    <div className="absolute bottom-2 left-2 z-10">
      <button onClick={onClick} aria-pressed={active}
              title={active ? 'เอาออกจากรายการเปรียบเทียบ' : 'เพิ่มไปเปรียบเทียบ'}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-[11px] uppercase tracking-[.08em] transition-colors ${
                active ? 'bg-red text-white' : 'bg-ink/70 backdrop-blur-sm text-white/80 hover:bg-ink/90'
              }`}>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 3v18h18M18 17V9M12 17V5M6 17v-3" />
        </svg>
        {active ? 'เทียบอยู่' : 'เทียบ'}
      </button>
      {atLimit && (
        <p className="absolute top-full left-0 mt-1 bg-ink text-red-bright text-[10px] px-2 py-1 whitespace-nowrap">
          เทียบได้สูงสุด {MAX_COMPARE} รายการ
        </p>
      )}
    </div>
  );
}
