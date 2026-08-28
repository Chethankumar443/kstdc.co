import React, { useState, useEffect } from 'react';
import { MapPin, Star, ArrowRight } from 'lucide-react';
import { HOTELS_DATA } from '../../data/hotelsData';
import { getStoredLanguage } from '../../lib/bookingStore';
import { TRANSLATIONS } from '../../data/translations';
import type { Language } from '../../types/travel';

export const MayuraStaysStrip: React.FC = () => {
  const [lang, setLang] = useState<Language>('en');

  useEffect(() => {
    setLang(getStoredLanguage());
    const handler = (e: any) => setLang(e.detail);
    window.addEventListener('kstdc_lang_changed', handler);
    return () => window.removeEventListener('kstdc_lang_changed', handler);
  }, []);

  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  return (
    <section className="py-12 sm:py-18 bg-canvas border-t border-hairline-soft">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-1">
            <span className="text-xs uppercase tracking-wider font-bold text-primary-cobalt block">
              Government-Run Hospitality
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-ink-deep">
              {t.staysTitle}
            </h2>
            <p className="text-xs sm:text-sm text-steel max-w-xl">
              {t.staysSubtitle}
            </p>
          </div>

          <a
            href="/stays"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-primary-cobalt hover:underline self-start md:self-end"
          >
            <span>Explore All Mayura Properties</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Stays Grid with 28px card rounding */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {HOTELS_DATA.slice(0, 3).map((hotel) => (
            <div
              key={hotel.id}
              className="bg-canvas rounded-[28px] overflow-hidden border border-hairline-soft hover:border-steel/40 transition-all flex flex-col justify-between"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-surface-soft">
                <img
                  src={hotel.image}
                  alt={hotel.name}
                  loading="lazy"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/hero/hero-2.jpeg';
                  }}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3.5 left-3.5 bg-black/80 backdrop-blur-sm text-white px-3 py-1 rounded-full text-[11px] font-bold">
                  {hotel.category}
                </div>
                <div className="absolute bottom-3.5 right-3.5 bg-white/95 px-2.5 py-1 rounded-full text-xs font-bold text-ink flex items-center gap-1 shadow-sm">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>{hotel.rating}</span>
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between gap-4">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-1 text-xs text-steel">
                    <MapPin className="w-3.5 h-3.5 text-primary-cobalt" />
                    <span>{hotel.destination}</span>
                  </div>
                  <h3 className="text-xl font-bold text-ink-deep">
                    {hotel.name}
                  </h3>
                  <p className="text-xs text-steel line-clamp-2 leading-relaxed">
                    {hotel.tagline}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {hotel.highlights.slice(0, 2).map((h, i) => (
                      <span key={i} className="text-[11px] px-2.5 py-0.5 rounded-full bg-surface-soft text-charcoal border border-hairline-soft font-medium">
                        ✓ {h}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-hairline-soft flex items-center justify-between">
                  <div>
                    <span className="text-[11px] text-steel block font-medium">Direct Citizen Tariff</span>
                    <span className="text-xl font-bold text-ink-deep">
                      ₹{hotel.pricePerNight.toLocaleString('en-IN')}
                      <span className="text-xs font-normal text-steel"> / night</span>
                    </span>
                  </div>

                  <a
                    href="/stays"
                    className="px-4 py-2 rounded-full bg-surface-soft hover:bg-neutral-200 text-ink font-bold text-xs border border-hairline-soft transition-colors"
                  >
                    View Property →
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
