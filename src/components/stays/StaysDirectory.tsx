import React, { useState, useEffect } from 'react';
import { MapPin, Star, Check, ArrowRight } from 'lucide-react';
import { HOTELS_DATA } from '../../data/hotelsData';
import { getStoredLanguage } from '../../lib/bookingStore';
import { TRANSLATIONS } from '../../data/translations';
import type { Language } from '../../types/travel';

export const StaysDirectory: React.FC = () => {
  const [lang, setLang] = useState<Language>('en');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    setLang(getStoredLanguage());
    const handler = (e: any) => setLang(e.detail);
    window.addEventListener('kstdc_lang_changed', handler);
    return () => window.removeEventListener('kstdc_lang_changed', handler);
  }, []);

  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  const filteredHotels = selectedCategory === 'all'
    ? HOTELS_DATA
    : HOTELS_DATA.filter((h) => h.category === selectedCategory);

  return (
    <div className="py-8 sm:py-14 bg-canvas min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="bg-ink-deep p-8 sm:p-12 rounded-[32px] text-white space-y-2">
          <span className="text-xs uppercase tracking-wider font-bold text-white/70 block">
            Government-Run Hospitality
          </span>
          <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-white">
            Stay with Hotel Mayura
          </h1>
          <p className="text-xs sm:text-sm text-white/80 max-w-2xl leading-relaxed">
            Heritage properties, hilltop view lodges, and coastal retreats situated right next to Karnataka's prime monuments, peaks and waterfalls.
          </p>
        </div>

        {/* Filter Chips (DESIGN-meta button-pill-tab) */}
        <div className="flex flex-wrap items-center gap-2 bg-surface-soft p-1 rounded-full border border-hairline-soft w-fit">
          {['all', 'Scenic Retreat', 'Heritage', 'Premium', 'Budget Comfort'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                selectedCategory === cat
                  ? 'bg-black text-white shadow-sm'
                  : 'text-charcoal hover:text-ink hover:bg-canvas'
              }`}
            >
              {cat === 'all' ? 'All Properties' : cat}
            </button>
          ))}
        </div>

        {/* Stays Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredHotels.map((hotel) => (
            <div
              key={hotel.id}
              className="bg-canvas rounded-[28px] overflow-hidden border border-hairline-soft hover:border-steel/40 transition-all flex flex-col justify-between"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-surface-soft">
                <img
                  src={hotel.image}
                  alt={hotel.name}
                  loading="lazy"
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

                  <h2 className="text-xl font-bold text-ink-deep">
                    {hotel.name}
                  </h2>

                  <p className="text-xs text-steel line-clamp-2 leading-relaxed">
                    {hotel.description}
                  </p>

                  <div className="space-y-1 pt-2">
                    {hotel.highlights.slice(0, 3).map((hl, i) => (
                      <div key={i} className="text-xs text-charcoal flex items-center gap-1.5 font-medium">
                        <Check className="w-3.5 h-3.5 text-primary-cobalt shrink-0" />
                        <span className="truncate">{hl}</span>
                      </div>
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
                    href="/trips"
                    className="px-4 py-2 rounded-full bg-primary-cobalt hover:bg-primary-deep text-white font-bold text-xs shadow-sm transition-all"
                  >
                    View Tours →
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
