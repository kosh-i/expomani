import React from 'react';
import { ShieldCheck } from 'lucide-react';

export default function VerifiedBadge({ name, license }) {
  return (
    <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-blue-500/10 border border-blue-500/30 text-blue-300 text-xs font-medium" title={`Government & Platform Verified Agency (Lic: ${license || 'Verified'})`}>
      <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
      <span>{name || 'Verified Agency'}</span>
    </div>
  );
}
