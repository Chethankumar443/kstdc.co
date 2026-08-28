import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { getStoredLanguage } from '../../lib/bookingStore';
import { TRANSLATIONS } from '../../data/translations';
import type { Language } from '../../types/travel';

export const DisclaimerBanner: React.FC = () => {
  const [lang, setLang] = useState<Language>('en');
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    setLang(getStoredLanguage());
    const handler = (e: any) => setLang(e.detail);
    window.addEventListener('kstdc_lang_changed', handler);
    return () => window.removeEventListener('kstdc_lang_changed', handler);
  }, []);

  if (dismissed) return null;

  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  return (
    <aside aria-label="Prototype Disclosure" className="bg-slate-950 text-white text-xs px-4 py-2.5 border-b border-slate-800">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 overflow-hidden text-ellipsis whitespace-nowrap">
          <span className="px-2 py-0.5 rounded-full bg-white/20 text-white text-[10px] font-bold uppercase tracking-wider shrink-0">
            Prototype
          </span>
          <span className="text-white/90 font-medium text-xs truncate">
            {t.prototypeNotice}
          </span>
        </div>
        <button
          onClick={() => setDismissed(true)}
          className="text-white/70 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors shrink-0"
          aria-label="Dismiss banner"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </aside>
  );
};
