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
        <div className="bg-slate-900 dark:bg-slate-950 p-8 sm:p-12 rounded-[32px] text-white border border-slate-800 shadow-md space-y-2">
          <span className="text-xs uppercase tracking-wider font-bold text-emerald-400 block">
            {t.destinationsTag || 'Karnataka State Atlas'}
          </span>
          <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-white">
            {t.destinationsTitle || 'Discover Karnataka’s Destinations'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
            {t.destinationsSubtitle || 'From the misty rainforest slopes of the Western Ghats to the ancient granite boulders of the Deccan, plan your next getaway destination-first.'}
          </p>
        </div>

        {/* Search & Region Filter Bar */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-[28px] border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={lang === 'kn' ? 'ತಾಣ, ಜಲಪಾತ, ದೇವಸ್ಥಾನ, ಕರಾವಳಿ ಹುಡುಕಿ...' : 'Search destination, experiences (e.g. waterfalls, coffee, temples, rainforest, beaches)...'}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full text-xs font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-slate-900"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-100 dark:border-slate-800">
            <div className="flex flex-wrap items-center gap-1.5 bg-slate-100 dark:bg-slate-800 p-1 rounded-full border border-slate-200 dark:border-slate-700">
              {[
                { id: 'all', label: lang === 'kn' ? 'ಎಲ್ಲಾ ಪ್ರಾಂತ್ಯಗಳು' : 'All Regions' },
                { id: 'Western Ghats', label: lang === 'kn' ? 'ಪಶ್ಚಿಮ ಘಟ್ಟಗಳು' : 'Western Ghats' },
                { id: 'Deccan Plateau', label: lang === 'kn' ? 'ದಖನ್ ಪ್ರಸ್ಥಭೂಮಿ' : 'Deccan Plateau' },
                { id: 'Coastal Karnataka', label: lang === 'kn' ? 'ಕರಾವಳಿ ಕರ್ನಾಟಕ' : 'Coastal Karnataka' },
                { id: 'Southern Plains', label: lang === 'kn' ? 'ದಕ್ಷಿಣ ಬಯಲು ಪ್ರದೇಶ' : 'Southern Plains' },
              ].map((reg) => (
                <button
                  key={reg.id}
                  onClick={() => setSelectedRegion(reg.id)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                    selectedRegion === reg.id
                      ? 'bg-slate-950 dark:bg-white text-white dark:text-slate-950 shadow-xs'
                      : 'text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-white dark:hover:bg-slate-700'
                  }`}
                >
                  {reg.label}
                </button>
              ))}
            </div>

            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              {lang === 'kn' ? (
                <>ಲಭ್ಯವಿರುವ <strong>{filteredDestinations.length}</strong> ಅಧಿಕೃತ ತಾಣಗಳು</>
              ) : (
                <>Showing <strong>{filteredDestinations.length}</strong> verified state destinations</>
              )}
            </span>
          </div>
        </div>

        {/* Destination Cards */}
        {filteredDestinations.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredDestinations.map((dest) => (
              <div
                key={dest.id}
                className="bg-white dark:bg-slate-800/90 rounded-[28px] overflow-hidden border border-slate-200 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-500 transition-all flex flex-col justify-between shadow-xs"
              >
                <div className="relative aspect-[16/9] overflow-hidden bg-slate-100 dark:bg-slate-700">
                  <img
                    src={dest.heroImage}
                    alt={dest.name}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3.5 left-3.5 bg-slate-950/80 backdrop-blur-sm text-white px-3 py-1 rounded-full text-[11px] font-bold">
                    {dest.region}
                  </div>
                  <div className="absolute bottom-3.5 right-3.5 bg-white/95 dark:bg-slate-900/95 px-3 py-1 rounded-full text-xs font-bold text-slate-900 dark:text-white">
                    {dest.tripsCount} {lang === 'kn' ? 'ಪ್ರವಾಸಗಳು' : 'Conducted Tours'}
                  </div>
                </div>

                <div className="p-6 sm:p-7 space-y-4">
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <h2 className="text-2xl font-bold text-slate-950 dark:text-white">
                        {dest.name}
                      </h2>
                      <span className="text-xs font-bold text-blue-600 dark:text-blue-400">
                        {dest.kannadaName}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                      {dest.description}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-700/60 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-300">
                    <div>
                      <span className="text-slate-500 dark:text-slate-400 text-[11px] block">
                        {lang === 'kn' ? 'ಬೆಂಗಳೂರಿನಿಂದ ಪ್ರಯಾಣದ ಸಮಯ' : 'Travel Time from BLR'}
                      </span>
                      <span className="font-bold text-slate-900 dark:text-white">{dest.travelDurationFromBlr}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 dark:text-slate-400 text-[11px] block">
                        {lang === 'kn' ? 'ಉತ್ತಮ ಭೇಟಿ ಸಮಯ' : 'Best Season'}
                      </span>
                      <span className="font-bold text-slate-900 dark:text-white">{dest.bestTimeToVisit}</span>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <span className="text-xs font-bold text-slate-900 dark:text-white block">
                      {lang === 'kn' ? 'ಪ್ರಮುಖ ಅನುಭವಗಳು:' : 'Key Experiences:'}
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {dest.experiences.map((exp, i) => (
                        <span key={i} className="text-[11px] px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-600 font-medium">
                          {exp}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between">
                    <span className="text-xs text-slate-600 dark:text-slate-400 font-semibold">
                      {lang === 'kn' ? 'ವಾಸ್ತವ್ಯ:' : 'Stay:'} {dest.featuredStay}
                    </span>

                    <a
                      href={`/trips?destination=${encodeURIComponent(dest.name)}`}
                      className="inline-flex items-center gap-1.5 px-5 py-2 rounded-full bg-slate-950 dark:bg-blue-600 hover:bg-black dark:hover:bg-blue-700 text-white font-bold text-xs shadow-sm transition-all"
                    >
                      <span>{lang === 'kn' ? 'ಪ್ರವಾಸ ವೀಕ್ಷಿಸಿ' : 'View Tours'}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-[32px] border border-slate-200 dark:border-slate-800 p-8 space-y-4">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              {lang === 'kn' ? 'ಯಾವುದೇ ತಾಣ ಕಂಡುಬಂದಿಲ್ಲ' : 'No destinations match your search'}
            </h3>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedRegion('all');
              }}
              className="px-6 py-2.5 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-xs cursor-pointer"
            >
              {lang === 'kn' ? 'ಮರುಹೊಂದಿಸಿ' : 'Reset Search'}
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
