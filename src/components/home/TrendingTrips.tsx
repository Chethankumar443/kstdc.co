import React, { useState, useEffect } from 'react';
import { Clock, MapPin, Building, Star, ArrowRight } from 'lucide-react';
import { TRIPS_DATA } from '../../data/tripsData';
import { getStoredLanguage } from '../../lib/bookingStore';
import { TRANSLATIONS } from '../../data/translations';
import type { Language, TripCategory } from '../../types/travel';

export const TrendingTrips: React.FC = () => {
  const [lang, setLang] = useState<Language>('en');
  const [selectedFilter, setSelectedFilter] = useState<'all' | TripCategory>('all');

  useEffect(() => {
    setLang(getStoredLanguage());
    const handler = (e: any) => setLang(e.detail);
    window.addEventListener('kstdc_lang_changed', handler);
    return () => window.removeEventListener('kstdc_lang_changed', handler);
  }, []);

  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  const filteredTrips = selectedFilter === 'all'
    ? TRIPS_DATA
    : TRIPS_DATA.filter((trip) => trip.category === selectedFilter);

  return (
    <section className="py-12 sm:py-18 bg-canvas border-t border-hairline-soft">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Section Header with Pill Category Filter */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-1">
            <span className="text-xs uppercase tracking-wider font-bold text-primary-cobalt block">
              Conducted Tour Packages
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-ink-deep">
              Curated Escapes from Bengaluru
            </h2>
            <p className="text-xs sm:text-sm text-steel max-w-xl">
              All packages include Volvo AC transport, certified guides, and Hotel Mayura stays with 100% price transparency.
            </p>
          </div>

          {/* Pill Filter Tabs (DESIGN-meta button-pill-tab) */}
          <div className="flex flex-wrap gap-2 bg-surface-soft p-1 rounded-full border border-hairline-soft">
            {[
              { id: 'all', label: t.filterAll },
              { id: 'nature', label: t.filterNature },
              { id: 'heritage', label: t.filterHeritage },
              { id: 'beach', label: t.filterBeach },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setSelectedFilter(f.id as any)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  selectedFilter === f.id
                    ? 'bg-black text-white shadow-sm'
                    : 'text-charcoal hover:text-ink hover:bg-canvas'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Trips Grid: 32px rounding, crisp 1px hairline border, cobalt buy pill */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTrips.map((trip) => (
            <div
              key={trip.id}
              className="bg-canvas rounded-[28px] overflow-hidden border border-hairline-soft hover:border-steel/40 transition-all flex flex-col justify-between"
            >
              {/* Image Frame */}
              <div className="relative aspect-[16/10] overflow-hidden bg-surface-soft">
                <img
                  src={trip.heroImage}
                  alt={trip.title}
                  loading="lazy"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/hero/hero-1.jpeg';
                  }}
                  className="w-full h-full object-cover"
                />
                
                {trip.badge && (
                  <div className="absolute top-3.5 left-3.5">
                    <span className="px-3 py-1 rounded-full bg-black/80 backdrop-blur-sm text-white text-[11px] font-bold">
                      {trip.badge}
                    </span>
                  </div>
                )}

                <div className="absolute bottom-3.5 right-3.5 bg-white/95 px-2.5 py-1 rounded-full text-xs font-bold text-ink flex items-center gap-1 shadow-sm">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>{trip.rating}</span>
                  <span className="text-steel font-normal text-[11px]">({trip.reviewsCount})</span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between gap-5">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs text-steel font-medium">
                    <MapPin className="w-3.5 h-3.5 text-primary-cobalt" />
                    <span>{trip.origin} → {trip.destination}</span>
                    <span>•</span>
                    <Clock className="w-3.5 h-3.5 text-primary-cobalt" />
                    <span>{trip.durationDays} {trip.durationDays === 1 ? t.dayTour : t.daysTour}</span>
                  </div>

                  <h3 className="text-xl font-bold text-ink-deep leading-snug">
                    {trip.title}
                  </h3>

                  <p className="text-xs text-steel line-clamp-2 leading-relaxed">
                    {trip.tagline}
                  </p>

                  {/* Mayura Hotel Tag */}
                  {trip.hotel && (
                    <div className="flex items-center gap-2 text-xs text-ink font-semibold bg-surface-soft px-3 py-2 rounded-xl border border-hairline-soft">
                      <Building className="w-3.5 h-3.5 text-primary-cobalt shrink-0" />
                      <span className="truncate">{trip.hotel.name}</span>
                      <span className="text-[10px] text-primary-cobalt font-bold ml-auto shrink-0 uppercase tracking-wider">
                        Included
                      </span>
                    </div>
                  )}
                </div>

                {/* Price & Action: Cobalt Blue Buy Pill (DESIGN-meta button-buy-cta) */}
                <div className="pt-4 border-t border-hairline-soft flex items-center justify-between">
                  <div>
                    <span className="text-[11px] text-steel block font-medium">From</span>
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl font-bold text-ink-deep">
                        ₹{trip.pricePerPerson.toLocaleString('en-IN')}
                      </span>
                      <span className="text-xs text-steel">/ person</span>
                    </div>
                  </div>

                  <a
                    href={`/trips/${trip.slug}`}
                    className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-primary-cobalt hover:bg-primary-deep text-white font-bold text-xs shadow-sm transition-all"
                  >
                    <span>View Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
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
