import React, { useState } from 'react';
import { X } from 'lucide-react';

export const DisclaimerBanner: React.FC = () => {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <aside aria-label="Portal Notice" className="bg-slate-950 text-white text-xs px-4 py-2.5 border-b border-slate-800">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 overflow-hidden text-ellipsis whitespace-nowrap">
          <span className="px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 text-[10px] font-bold uppercase tracking-wider shrink-0">
            Official Portal
          </span>
          <span className="text-white/90 font-medium text-xs truncate">
            Official citizen tourism portal for the Government of Karnataka. Verified routes & Hotel Mayura bookings.
          </span>
        </div>
        <button
          onClick={() => setDismissed(true)}
          className="text-white/70 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors shrink-0 cursor-pointer"
          aria-label="Dismiss banner"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </aside>
  );
};
