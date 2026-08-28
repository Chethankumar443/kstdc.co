import React, { useState, useEffect } from 'react';
import { ArrowRight, Search, MapPin, X } from 'lucide-react';
import { DESTINATIONS_DATA } from '../../data/destinationsData';
import { getStoredLanguage } from '../../lib/bookingStore';
import { TRANSLATIONS } from '../../data/translations';
import type { Language } from '../../types/travel';

export const DestinationsExplorer: React.FC = () => {
  const [lang, setLang] = useState<Language>('en');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<string>('all');

  useEffect(() => {
    setLang(getStoredLanguage());
    const handler = (e: any) => setLang(e.detail);
    window.addEventListener('kstdc_lang_changed', handler);
    return () => window.removeEventListener('kstdc_lang_changed', handler);
  }, []);

  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  const filteredDestinations = DESTINATIONS_DATA.filter((dest) => {
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const match =
        dest.name.toLowerCase().includes(q) ||
        dest.tagline.toLowerCase().includes(q) ||
        dest.description.toLowerCase().includes(q) ||
        dest.experiences.some((exp) => exp.toLowerCase().includes(q));
      if (!match) return false;
    }

    if (selectedRegion !== 'all' && dest.region !== selectedRegion) {
      return false;
    }

    return true;
  });

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

        {/* Search & Region Filter Bar */}
        <div className="bg-white p-5 rounded-[28px] border border-slate-200 shadow-sm space-y-4">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search destination, experiences (e.g. waterfalls, coffee, temples, rainforest, beaches)..."
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-full text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-100">
            <div className="flex flex-wrap items-center gap-1.5 bg-slate-100 p-1 rounded-full border border-slate-200">
              {['all', 'Western Ghats', 'Deccan Plateau', 'Coastal Karnataka', 'Southern Plains'].map((reg) => (
                <button
                  key={reg}
                  onClick={() => setSelectedRegion(reg)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                    selectedRegion === reg
                      ? 'bg-slate-950 text-white shadow-xs'
                      : 'text-slate-700 hover:text-slate-950 hover:bg-white'
                  }`}
                >
                  {reg === 'all' ? 'All Regions' : reg}
                </button>
              ))}
            </div>

            <span className="text-xs text-slate-500 font-medium">
              Showing <strong>{filteredDestinations.length}</strong> verified state destinations
            </span>
          </div>
        </div>

        {/* Destination Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredDestinations.map((dest) => (
            <div
              key={dest.id}
              className="bg-white rounded-[28px] overflow-hidden border border-slate-200 hover:border-slate-400 transition-all flex flex-col justify-between shadow-xs"
            >
              <div className="relative aspect-[16/9] overflow-hidden bg-slate-100">
                <img
                  src={dest.heroImage}
                  alt={dest.name}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3.5 left-3.5 bg-slate-950/80 backdrop-blur-sm text-white px-3 py-1 rounded-full text-[11px] font-bold">
                  {dest.region}
                </div>
                <div className="absolute bottom-3.5 right-3.5 bg-white/95 px-3 py-1 rounded-full text-xs font-bold text-slate-900">
                  {dest.tripsCount} Conducted Tours
                </div>
              </div>

              <div className="p-6 sm:p-7 space-y-4">
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-slate-950">
                      {dest.name}
                    </h2>
                    <span className="text-xs font-bold text-blue-600">
                      {dest.kannadaName}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {dest.description}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-slate-700">
                  <div>
                    <span className="text-slate-500 text-[11px] block">Travel Time from BLR</span>
                    <span className="font-bold text-slate-900">{dest.travelDurationFromBlr}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 text-[11px] block">Best Season</span>
                    <span className="font-bold text-slate-900">{dest.bestTimeToVisit}</span>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <span className="text-xs font-bold text-slate-900 block">Key Experiences:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {dest.experiences.map((exp, i) => (
                      <span key={i} className="text-[11px] px-3 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200 font-medium">
                        {exp}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs text-slate-600 font-semibold">
                    Stay: {dest.featuredStay}
                  </span>

                  <a
                    href={`/trips?destination=${encodeURIComponent(dest.name)}`}
                    className="inline-flex items-center gap-1.5 px-5 py-2 rounded-full bg-slate-950 hover:bg-black text-white font-bold text-xs shadow-sm transition-all"
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
