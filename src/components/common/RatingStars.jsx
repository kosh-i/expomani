import React from 'react';
import { Star } from 'lucide-react';

export default function RatingStars({ rating, count }) {
  return (
    <div className="flex items-center gap-1 text-xs">
      <div className="flex items-center text-amber-400">
        <Star className="w-3.5 h-3.5 fill-amber-400" />
        <span className="ml-1 font-bold text-slate-100">{rating}</span>
      </div>
      {count !== undefined && (
        <span className="text-slate-400 text-[11px]">({count})</span>
      )}
    </div>
  );
}
