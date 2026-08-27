import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { DESTINATIONS_DATA } from '../../data/destinationsData';
import { getStoredLanguage } from '../../lib/bookingStore';
import { TRANSLATIONS } from '../../data/translations';
import type { Language } from '../../types/travel';

export const DestinationsExplorer: React.FC = () => {
  const [lang, setLang] = useState<Language>('en');

  useEffect(() => {
    setLang(getStoredLanguage());
    const handler = (e: any) => setLang(e.detail);
    window.addEventListener('kstdc_lang_changed', handler);
    return () => window.removeEventListener('kstdc_lang_changed', handler);
  }, []);

  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  return (
    <div className="py-8 sm:py-14 bg-canvas min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="bg-ink-deep p-8 sm:p-12 rounded-[32px] text-white space-y-2">
          <span className="text-xs uppercase tracking-wider font-bold text-white/70 block">
            Karnataka State Atlas
          </span>
          <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-white">
            Discover Karnataka’s Destinations
          </h1>
          <p className="text-xs sm:text-sm text-white/80 max-w-2xl leading-relaxed">
            From the misty rainforest slopes of the Western Ghats to the ancient granite boulders of the Deccan, plan your next getaway destination-first.
          </p>
        </div>

        {/* Destination Cards with 28px rounding */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {DESTINATIONS_DATA.map((dest) => (
            <div
              key={dest.id}
              className="bg-canvas rounded-[28px] overflow-hidden border border-hairline-soft hover:border-steel/40 transition-all flex flex-col justify-between"
            >
              <div className="relative aspect-[16/9] overflow-hidden bg-surface-soft">
                <img
                  src={dest.heroImage}
                  alt={dest.name}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3.5 left-3.5 bg-black/80 backdrop-blur-sm text-white px-3 py-1 rounded-full text-[11px] font-bold">
                  {dest.region}
                </div>
                <div className="absolute bottom-3.5 right-3.5 bg-white/95 px-3 py-1 rounded-full text-xs font-bold text-ink-deep">
                  {dest.tripsCount} Conducted Tours
                </div>
              </div>

              <div className="p-6 sm:p-7 space-y-4">
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-ink-deep">
                      {dest.name}
                    </h2>
                    <span className="text-xs font-bold text-primary-cobalt">
                      {dest.kannadaName}
                    </span>
                  </div>
                  <p className="text-xs text-steel leading-relaxed">
                    {dest.description}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs p-3.5 rounded-2xl bg-surface-soft border border-hairline-soft text-charcoal">
                  <div>
                    <span className="text-steel text-[11px] block">Travel Time from BLR</span>
                    <span className="font-bold text-ink-deep">{dest.travelDurationFromBlr}</span>
                  </div>
                  <div>
                    <span className="text-steel text-[11px] block">Best Season</span>
                    <span className="font-bold text-ink-deep">{dest.bestTimeToVisit}</span>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <span className="text-xs font-bold text-ink-deep block">Key Experiences:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {dest.experiences.map((exp, i) => (
                      <span key={i} className="text-[11px] px-3 py-1 rounded-full bg-surface-soft text-charcoal border border-hairline-soft font-medium">
                        ✦ {exp}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-hairline-soft flex items-center justify-between">
                  <span className="text-xs text-charcoal font-semibold">
                    Stay: {dest.featuredStay}
                  </span>

                  <a
                    href={`/trips?destination=${encodeURIComponent(dest.name)}`}
                    className="inline-flex items-center gap-1.5 px-5 py-2 rounded-full bg-primary-cobalt hover:bg-primary-deep text-white font-bold text-xs shadow-sm transition-all"
                  >
                    <span>View Tours</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
