import React from 'react';
import { Leaf } from 'lucide-react';

export default function EcoBadge({ score, size = 'md' }) {
  const getScoreColor = (s) => {
    if (s >= 95) return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 eco-glow';
    if (s >= 85) return 'bg-teal-500/20 text-teal-300 border-teal-500/40';
    return 'bg-amber-500/20 text-amber-300 border-amber-500/40';
  };

  const isSmall = size === 'sm';

  return (
    <div
      className={`inline-flex items-center gap-1.5 rounded-full border font-semibold tracking-wide ${
        isSmall ? 'px-2 py-0.5 text-[10px]' : 'px-2.5 py-1 text-xs'
      } ${getScoreColor(score)}`}
      title={`Eco-Tourism Impact Score: ${score}/100 based on community benefit, carbon offset, and local host retention`}
    >
      <Leaf className={`${isSmall ? 'w-3 h-3' : 'w-3.5 h-3.5'} text-emerald-400`} />
      <span>Eco {score}/100</span>
    </div>
  );
}
