import React, { useState, useEffect, useRef } from 'react';
import {
  Globe, Menu, X, Search, PhoneCall, Moon, Sun,
  Ticket, Bus, Building2, Car, Compass, ArrowRight
} from 'lucide-react';
import { getStoredLanguage, setStoredLanguage, getStoredBookings } from '../../lib/bookingStore';
import { TRANSLATIONS } from '../../data/translations';
import { TRIPS_DATA } from '../../data/tripsData';
import { HOTELS_DATA } from '../../data/hotelsData';
import { CABS_DATA } from '../../data/cabsData';
import { ACTIVITIES_DATA } from '../../data/activitiesData';
import { AiTripPlannerModal } from '../home/AiTripPlannerModal';
import type { Language } from '../../types/travel';

interface Props {
  currentPath?: string;
}

// Precise path normalizer helper to prevent hydration mismatches and layout flicker
const normalizePath = (p?: string): string => {
  if (!p) return '/';
  const cleaned = p.split('?')[0].replace(/\/$/, '') || '/';
  return cleaned;
};

export const HeaderNav: React.FC<Props> = ({ currentPath: initialPath = '' }) => {
  const [lang, setLang] = useState<Language>('en');
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const langContainerRef = useRef<HTMLDivElement>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [plannerOpen, setPlannerOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activePath, setActivePath] = useState(() => normalizePath(initialPath));
  const [bookingsCount, setBookingsCount] = useState(0);

  // Global Quick Search Bar state
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setLang(getStoredLanguage());
    if (typeof window !== 'undefined') {
      const cleanP = normalizePath(window.location.pathname);
      setActivePath(cleanP);
      const updateCount = () => {
        setBookingsCount(getStoredBookings().length);
      };
      updateCount();

      const langHandler = (e: any) => setLang(e.detail);
      const bookingsHandler = (e: any) => setBookingsCount(e.detail?.length || 0);

      window.addEventListener('kstdc_lang_changed', langHandler);
      window.addEventListener('kstdc_bookings_changed', bookingsHandler);

      // Close search and menus on Escape
      const keyHandler = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          setSearchOpen(false);
          setLangMenuOpen(false);
          setMobileMenuOpen(false);
        }
      };
      window.addEventListener('keydown', keyHandler);

      // Close popovers when clicking outside
      const clickOutsideHandler = (e: MouseEvent) => {
        if (searchContainerRef.current && !searchContainerRef.current.contains(e.target as Node)) {
          setSearchOpen(false);
        }
        if (langContainerRef.current && !langContainerRef.current.contains(e.target as Node)) {
          setLangMenuOpen(false);
        }
      };
      document.addEventListener('mousedown', clickOutsideHandler);

      return () => {
        window.removeEventListener('kstdc_lang_changed', langHandler);
        window.removeEventListener('kstdc_bookings_changed', bookingsHandler);
        window.removeEventListener('keydown', keyHandler);
        document.removeEventListener('mousedown', clickOutsideHandler);
      };
    }
  }, [initialPath]);

  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchOpen]);

  const handleLanguageChange = (newLang: Language) => {
    setLang(newLang);
    setStoredLanguage(newLang);
    setLangMenuOpen(false);
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('kstdc_theme');
      const isDark = savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches);
      setIsDarkMode(isDark);
      if (isDark) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  }, []);

  const toggleTheme = () => {
    const nextDark = !isDarkMode;
    setIsDarkMode(nextDark);
    if (nextDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('kstdc_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('kstdc_theme', 'light');
    }
  };

  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  // Search Results Filtering
  const cleanQ = searchQuery.toLowerCase().trim();
  const searchTripResults = cleanQ
    ? TRIPS_DATA.filter((t) => t.title.toLowerCase().includes(cleanQ) || t.destination.toLowerCase().includes(cleanQ)).slice(0, 3)
    : [];
  const searchHotelResults = cleanQ
    ? HOTELS_DATA.filter((h) => h.name.toLowerCase().includes(cleanQ) || h.destination.toLowerCase().includes(cleanQ)).slice(0, 2)
    : [];
  const searchCabResults = cleanQ
    ? CABS_DATA.filter((c) => c.name.toLowerCase().includes(cleanQ) || 'airport taxi cabs car'.includes(cleanQ)).slice(0, 2)
    : [];
  const searchActResults = cleanQ
    ? ACTIVITIES_DATA.filter((a) => a.title.toLowerCase().includes(cleanQ) || a.city.toLowerCase().includes(cleanQ)).slice(0, 2)
    : [];

  const totalResultsCount =
    searchTripResults.length +
    searchHotelResults.length +
    searchCabResults.length +
    searchActResults.length;

  const isHome = activePath === '/';
  const isTrips = activePath === '/trips' || activePath.startsWith('/trips/') || activePath.startsWith('/book');
  const isStays = activePath === '/stays' || activePath.startsWith('/stays/');
  const isCabs = activePath === '/cabs' || activePath.startsWith('/cabs/');
  const isActivities = activePath === '/activities' || activePath.startsWith('/activities/');
  const isDestinations = activePath === '/destinations' || activePath.startsWith('/destinations/');

  const navLinks = [
    { href: '/', label: lang === 'kn' ? 'ಮುಖಪುಟ' : 'Home', active: isHome },
    { href: '/trips', label: t.navTrips || 'Tours', active: isTrips },
    { href: '/stays', label: t.navStays || 'Hotels', active: isStays },
    { href: '/cabs', label: t.navCabs || 'Airport Taxi', active: isCabs },
    { href: '/activities', label: t.navActivities || 'Activities', active: isActivities },
    { href: '/destinations', label: t.navDestinations || 'Destinations', active: isDestinations },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 bg-white dark:bg-[#0c1322] border-b border-slate-200 dark:border-slate-800 shadow-xs transition-colors">
        
        {/* TOP MICRO UTILITY & ACCESSIBILITY BAR */}
        <div className="bg-slate-950 text-slate-300 text-[11px] font-medium border-b border-slate-800 py-1.5 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
            
            {/* Government Undertaking & Public Helpline */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 text-white font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="hidden sm:inline">{t.govtUndertaking || 'Government of Karnataka Undertaking'} ·</span>
                <span>{t.portalTitle || 'KSTDC Portal'}</span>
              </div>
              <span className="hidden md:inline text-slate-700">|</span>
              <a
                href="tel:18004253333"
                className="hidden md:flex items-center gap-1 text-slate-300 hover:text-white transition-colors"
                title="Toll-Free Tourist Helpline"
              >
                <PhoneCall className="w-3 h-3 text-emerald-400" />
                <span>{t.tollFreeText || 'Toll-Free'}: <strong>1800 425 3333</strong> / 080-4334 4334</span>
              </a>
            </div>

            {/* Leadership Avatars on Desktop */}
            <div className="hidden md:flex items-center gap-2">
              <div className="flex -space-x-1.5">
                <img
                  src="/leadership/siddaramaiah.jpeg"
                  alt="Sri Siddaramaiah - Hon'ble Chief Minister"
                  title="Sri Siddaramaiah (Hon'ble Chief Minister of Karnataka)"
                  className="inline-block w-6 h-6 rounded-full ring-2 ring-slate-800 object-cover object-top hover:scale-125 transition-transform z-10 hover:z-20 cursor-pointer"
                />
                <img
                  src="/leadership/dk-shivakumar.jpeg"
                  alt="Sri D. K. Shivakumar - Hon'ble Deputy Chief Minister"
                  title="Sri D. K. Shivakumar (Hon'ble Deputy Chief Minister)"
                  className="inline-block w-6 h-6 rounded-full ring-2 ring-slate-800 object-cover object-top hover:scale-125 transition-transform z-10 hover:z-20 cursor-pointer"
                />
                <img
                  src="/leadership/h-k-patil.jpeg"
                  alt="Sri H. K. Patil - Hon'ble Minister for Tourism"
                  title="Sri H. K. Patil (Hon'ble Minister for Tourism)"
                  className="inline-block w-6 h-6 rounded-full ring-2 ring-slate-800 object-cover object-top hover:scale-125 transition-transform z-10 hover:z-20 cursor-pointer"
                />
                <img
                  src="/leadership/g-parameshwara.jpeg"
                  alt="Dr. G. Parameshwara - Hon'ble Home Minister"
                  title="Dr. G. Parameshwara (Hon'ble Home Minister)"
                  className="inline-block w-6 h-6 rounded-full ring-2 ring-slate-800 object-cover object-top hover:scale-125 transition-transform z-10 hover:z-20 cursor-pointer"
                />
              </div>
              <span className="text-[10px] text-slate-400 font-medium">{t.leadershipLabel || 'State Leadership'}</span>
            </div>

            {/* Right Tools: Theme Toggle + Language */}
            <div className="flex items-center gap-2.5 ml-auto">
              
              {/* Single-Click Dark / Light Mode Theme Toggle Button */}
              <button
                type="button"
                onClick={toggleTheme}
                title={isDarkMode ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
                className="flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-full px-2.5 py-1 text-[11px] font-medium text-white transition-colors cursor-pointer"
                aria-label="Toggle Dark/Light Mode"
              >
                {isDarkMode ? (
                  <>
                    <Sun className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span className="hidden xs:inline text-[11px] font-medium">Light</span>
                  </>
                ) : (
                  <>
                    <Moon className="w-3.5 h-3.5 text-blue-300 shrink-0" />
                    <span className="hidden xs:inline text-[11px] font-medium">Dark</span>
                  </>
                )}
              </button>

              {/* Custom Language Selector Popover (Only English & Kannada) */}
              <div className="relative" ref={langContainerRef}>
                <button
                  type="button"
                  onClick={() => setLangMenuOpen(!langMenuOpen)}
                  className="flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-full px-2.5 py-1 text-[11px] font-medium text-white transition-colors cursor-pointer"
                  aria-label="Language Selector"
                >
                  <Globe className="w-3 h-3 text-slate-400 shrink-0" />
                  <span className="font-semibold">{lang === 'en' ? 'English' : 'ಕನ್ನಡ'}</span>
                  <span className="text-[9px] text-slate-400">▾</span>
                </button>

                {langMenuOpen && (
                  <div className="absolute right-0 top-full mt-2 w-32 bg-slate-900 rounded-2xl border border-slate-800 shadow-xl p-1.5 z-50 animate-fade-in text-xs">
                    <button
                      type="button"
                      onClick={() => {
                        handleLanguageChange('en');
                        setLangMenuOpen(false);
                      }}
                      className={`w-full px-2.5 py-1.5 rounded-xl text-left font-medium transition-colors flex items-center justify-between cursor-pointer ${
                        lang === 'en' ? 'bg-blue-600 text-white font-bold' : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                      }`}
                    >
                      <span>English</span>
                      {lang === 'en' && <span className="text-[10px]">✓</span>}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        handleLanguageChange('kn');
                        setLangMenuOpen(false);
                      }}
                      className={`w-full px-2.5 py-1.5 rounded-xl text-left font-medium transition-colors flex items-center justify-between cursor-pointer ${
                        lang === 'kn' ? 'bg-blue-600 text-white font-bold' : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                      }`}
                    >
                      <span>ಕನ್ನಡ</span>
                      {lang === 'kn' && <span className="text-[10px]">✓</span>}
                    </button>
                  </div>
                )}
              </div>

            </div>

          </div>
        </div>

        {/* MAIN NAVIGATION BAR */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-[68px] sm:h-[72px] flex items-center justify-between gap-4">
          
          {/* Official KSTDC & Karnataka Tourism Logos */}
          <a href="/" className="flex items-center gap-2.5 sm:gap-3.5 shrink-0 group">
            <img
              src="/kstdc-logo.png"
              alt="Official KSTDC Karnataka Logo"
              className="w-9 h-9 sm:w-10 sm:h-10 object-contain group-hover:scale-105 transition-transform"
            />
            <div className="h-7 w-px bg-slate-200 dark:bg-slate-800 hidden sm:block" />
            <img
              src="/karnataka-tourism-logo.png"
              alt="Karnataka Department of Tourism Logo"
              className="h-7 sm:h-8 object-contain group-hover:scale-105 transition-transform hidden xs:block"
            />
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-base sm:text-lg tracking-tight text-slate-950 dark:text-white">KSTDC</span>
                <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/80 text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                  Karnataka
                </span>
              </div>
              <span className="text-[10px] sm:text-[11px] text-slate-500 dark:text-slate-400 font-medium hidden sm:inline -mt-0.5">
                Karnataka State Tourism Development Corporation
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links with Active Indicator */}
          <nav className="hidden lg:flex items-center gap-1 bg-slate-100/90 dark:bg-slate-800/90 p-1.5 rounded-full border border-slate-200/80 dark:border-slate-700">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-150 ${
                  link.active
                    ? 'bg-slate-950 dark:bg-white text-white dark:text-slate-950 shadow-xs font-bold'
                    : 'text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-white dark:hover:bg-slate-700'
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Clean Integrated Search Bar (Desktop & Tablet) */}
          <div className="relative hidden md:block flex-1 max-w-xs lg:max-w-sm" ref={searchContainerRef}>
            <div
              onClick={() => setSearchOpen(true)}
              className="flex items-center w-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200/70 dark:hover:bg-slate-700/70 border border-slate-200 dark:border-slate-700 rounded-full px-3.5 py-2 text-xs text-slate-500 dark:text-slate-300 cursor-pointer transition-all focus-within:ring-2 focus-within:ring-slate-950 dark:focus-within:ring-white focus-within:bg-white dark:focus-within:bg-slate-900"
            >
              <Search className="w-3.5 h-3.5 text-slate-400 shrink-0 mr-2" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setSearchOpen(true);
                }}
                placeholder="Search destinations, tours, hotels..."
                className="bg-transparent text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none w-full text-xs font-medium"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSearchQuery('');
                  }}
                  className="text-slate-400 hover:text-slate-700 p-0.5 ml-1"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Redesigned Spacious & Clean Search Results Dropdown Overlay */}
            {searchOpen && (
              <div className="absolute top-full left-0 mt-2 w-[420px] max-w-[92vw] bg-white rounded-2xl border border-slate-200 shadow-2xl p-4 space-y-3 z-50 animate-fade-in max-h-[440px] overflow-y-auto overflow-x-hidden">
                
                {/* Dropdown Header */}
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    {searchQuery.trim() ? `Search Results (${totalResultsCount})` : 'Popular Destinations & Services'}
                  </span>
                  <button
                    onClick={() => setSearchOpen(false)}
                    className="text-slate-400 hover:text-slate-700 p-1 rounded-full hover:bg-slate-100 transition-colors"
                    aria-label="Close search"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Suggestions when input is empty */}
                {!searchQuery.trim() && (
                  <div className="space-y-2.5 py-1">
                    <span className="text-xs text-slate-500 font-medium block">Quick Suggestions:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {[
                        { label: 'Coorg Mist Tour', query: 'Coorg' },
                        { label: 'Hampi Heritage', query: 'Hampi' },
                        { label: 'Mysuru Royal Express', query: 'Mysuru' },
                        { label: 'Gokarna Beach', query: 'Gokarna' },
                        { label: 'Airport Taxi BLR', query: 'Airport' },
                        { label: 'Ambaari Double Decker', query: 'Ambaari' },
                      ].map((item) => (
                        <button
                          key={item.query}
                          type="button"
                          onClick={() => {
                            setSearchQuery(item.query);
                            setSearchOpen(true);
                          }}
                          className="px-3 py-1.5 rounded-full bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-800 text-xs font-semibold transition-all hover:border-slate-300 text-left"
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Structured Results List */}
                {totalResultsCount > 0 && (
                  <div className="space-y-3.5">
                    
                    {/* Tour Packages Results */}
                    {searchTripResults.length > 0 && (
                      <div className="space-y-1.5">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block px-1">
                          Conducted Tour Packages
                        </span>
                        {searchTripResults.map((trip) => (
                          <a
                            key={trip.id}
                            href={`/trips/${trip.slug}`}
                            onClick={() => setSearchOpen(false)}
                            className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-200 transition-all group"
                          >
                            <div className="flex items-center gap-2.5 min-w-0">
                              <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                                <Bus className="w-4 h-4" />
                              </div>
                              <div className="min-w-0">
                                <span className="font-bold text-xs text-slate-900 group-hover:text-blue-600 truncate block">
                                  {trip.title}
                                </span>
                                <span className="text-[11px] text-slate-500 truncate block">
                                  {trip.durationDays} Days · {trip.destination}
                                </span>
                              </div>
                            </div>
                            <span className="text-xs font-bold text-slate-900 shrink-0 ml-3 bg-slate-100 px-2 py-0.5 rounded-md">
                              ₹{trip.pricePerPerson.toLocaleString('en-IN')}
                            </span>
                          </a>
                        ))}
                      </div>
                    )}

                    {/* Hotel Mayura Results */}
                    {searchHotelResults.length > 0 && (
                      <div className="space-y-1.5">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block px-1">
                          Hotel Mayura Stays
                        </span>
                        {searchHotelResults.map((h) => (
                          <a
                            key={h.id}
                            href="/stays"
                            onClick={() => setSearchOpen(false)}
                            className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-200 transition-all group"
                          >
                            <div className="flex items-center gap-2.5 min-w-0">
                              <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                                <Building2 className="w-4 h-4" />
                              </div>
                              <div className="min-w-0">
                                <span className="font-bold text-xs text-slate-900 group-hover:text-amber-600 truncate block">
                                  {h.name}
                                </span>
                                <span className="text-[11px] text-slate-500 truncate block">
                                  {h.destination} · {h.category}
                                </span>
                              </div>
                            </div>
                            <span className="text-xs font-bold text-slate-900 shrink-0 ml-3 bg-slate-100 px-2 py-0.5 rounded-md">
                              ₹{h.pricePerNight.toLocaleString('en-IN')}/n
                            </span>
                          </a>
                        ))}
                      </div>
                    )}

                    {/* Activities Results */}
                    {searchActResults.length > 0 && (
                      <div className="space-y-1.5">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block px-1">
                          City Sightseeing & Ambaari
                        </span>
                        {searchActResults.map((act) => (
                          <a
                            key={act.id}
                            href="/activities"
                            onClick={() => setSearchOpen(false)}
                            className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-200 transition-all group"
                          >
                            <div className="flex items-center gap-2.5 min-w-0">
                              <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                                <Compass className="w-4 h-4" />
                              </div>
                              <div className="min-w-0">
                                <span className="font-bold text-xs text-slate-900 group-hover:text-emerald-600 truncate block">
                                  {act.title}
                                </span>
                                <span className="text-[11px] text-slate-500 truncate block">
                                  {act.city} · {act.duration}
                                </span>
                              </div>
                            </div>
                            <span className="text-xs font-bold text-slate-900 shrink-0 ml-3 bg-slate-100 px-2 py-0.5 rounded-md">
                              ₹{act.price}
                            </span>
                          </a>
                        ))}
                      </div>
                    )}

                    {/* Airport Cabs Results */}
                    {searchCabResults.length > 0 && (
                      <div className="space-y-1.5">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block px-1">
                          Airport Taxi Transfers
                        </span>
                        {searchCabResults.map((c) => (
                          <a
                            key={c.id}
                            href="/cabs"
                            onClick={() => setSearchOpen(false)}
                            className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-200 transition-all group"
                          >
                            <div className="flex items-center gap-2.5 min-w-0">
                              <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
                                <Car className="w-4 h-4" />
                              </div>
                              <div className="min-w-0">
                                <span className="font-bold text-xs text-slate-900 group-hover:text-purple-600 truncate block">
                                  {c.name}
                                </span>
                                <span className="text-[11px] text-slate-500 truncate block">
                                  Prepaid Airport Rate · {c.type}
                                </span>
                              </div>
                            </div>
                            <span className="text-xs font-bold text-slate-900 shrink-0 ml-3 bg-slate-100 px-2 py-0.5 rounded-md">
                              ₹{c.airportDropPrice.toLocaleString('en-IN')}
                            </span>
                          </a>
                        ))}
                      </div>
                    )}

                  </div>
                )}

                {/* No results fallback */}
                {searchQuery.trim() && totalResultsCount === 0 && (
                  <div className="text-center py-6 px-4 bg-slate-50 rounded-xl space-y-2">
                    <p className="text-xs font-semibold text-slate-700">
                      No exact matches found for "{searchQuery}".
                    </p>
                    <p className="text-[11px] text-slate-500">
                      Explore all available options in our catalog:
                    </p>
                    <div className="flex items-center justify-center gap-2 pt-1">
                      <a
                        href="/trips"
                        onClick={() => setSearchOpen(false)}
                        className="px-3 py-1 rounded-full bg-slate-950 text-white font-bold text-[11px]"
                      >
                        All Tours
                      </a>
                      <a
                        href="/destinations"
                        onClick={() => setSearchOpen(false)}
                        className="px-3 py-1 rounded-full bg-white border border-slate-200 text-slate-800 font-bold text-[11px]"
                      >
                        Destinations
                      </a>
                    </div>
                  </div>
                )}

              </div>
            )}
          </div>

          {/* Right Action Hub: My Bookings + Plan My Trip CTA */}
          <div className="flex items-center gap-2.5">
            
            {/* My Bookings Wallet Link */}
            <a
              href="/my-bookings"
              className={`relative inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-bold border transition-all ${
                activePath.startsWith('/my-bookings')
                  ? 'bg-slate-950 text-white border-slate-950 shadow-xs'
                  : 'bg-slate-50 hover:bg-slate-100 text-slate-800 border-slate-200'
              }`}
              title="Citizen Travel Wallet & Stored Tickets"
            >
              <Ticket className="w-3.5 h-3.5 text-blue-600" />
              <span className="hidden sm:inline">{t.navMyBookings || 'My Bookings'}</span>
              {bookingsCount > 0 && (
                <span className="w-4 h-4 rounded-full bg-blue-600 text-white text-[10px] font-extrabold flex items-center justify-center -mr-1">
                  {bookingsCount}
                </span>
              )}
            </a>

            {/* Plan My Trip CTA (Clean Executive Government Style) */}
            <button
              onClick={() => setPlannerOpen(true)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-slate-950 hover:bg-black text-white font-bold text-xs shadow-sm active:scale-98 transition-all cursor-pointer"
            >
              <span>{t.navPlanMyTrip}</span>
            </button>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>

        {/* MOBILE NAVIGATION DRAWER */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 p-5 space-y-4 shadow-xl animate-fade-in">
            
            {/* Mobile Search Input Bar */}
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={lang === 'kn' ? 'ತಾಣಗಳು, ಪ್ರವಾಸಗಳು, ಹೋಟೆಲ್‌ಗಳು...' : 'Search destinations, tours, hotels...'}
                className="w-full pl-9.5 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-xs text-slate-900 dark:text-white font-medium focus:outline-none focus:ring-2 focus:ring-slate-950 dark:focus:ring-blue-500"
              />
            </div>

            {/* Nav Links Grid */}
            <nav className="grid grid-cols-2 gap-2 text-xs font-bold">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className={`p-3 rounded-2xl transition-colors flex items-center justify-between ${
                    link.active
                      ? 'bg-slate-950 dark:bg-white text-white dark:text-slate-950'
                      : 'bg-slate-50 dark:bg-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-900 dark:text-slate-100 border border-slate-100 dark:border-slate-700'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span>{link.label}</span>
                  {link.active && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />}
                </a>
              ))}
            </nav>

            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-2">
              <a
                href="/my-bookings"
                className="w-full py-2.5 px-4 rounded-2xl bg-blue-50 dark:bg-blue-950/80 text-blue-900 dark:text-blue-200 border border-blue-200 dark:border-blue-800 font-bold text-xs flex items-center justify-between"
                onClick={() => setMobileMenuOpen(false)}
              >
                <div className="flex items-center gap-2">
                  <Ticket className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  <span>{t.navMyBookings || 'My Bookings'}</span>
                </div>
                {bookingsCount > 0 && (
                  <span className="px-2 py-0.5 rounded-full bg-blue-600 text-white text-[10px] font-bold">
                    {bookingsCount} Active
                  </span>
                )}
              </a>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setPlannerOpen(true);
                }}
                className="w-full py-3 rounded-2xl bg-slate-950 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm"
              >
                <span>{t.navPlanMyTrip}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </header>

      {/* AI Trip Planner Modal */}
      {plannerOpen && (
        <AiTripPlannerModal isOpen={plannerOpen} onClose={() => setPlannerOpen(false)} />
      )}
    </>
  );
};
