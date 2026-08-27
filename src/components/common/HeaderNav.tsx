import React, { useState, useEffect } from 'react';
import { Globe, Menu, X, Eye, Zap, ArrowRight } from 'lucide-react';
import { getStoredLanguage, setStoredLanguage } from '../../lib/bookingStore';
import { TRANSLATIONS } from '../../data/translations';
import { AiTripPlannerModal } from '../home/AiTripPlannerModal';
import type { Language } from '../../types/travel';

export const HeaderNav: React.FC = () => {
  const [lang, setLang] = useState<Language>('en');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [plannerOpen, setPlannerOpen] = useState(false);
  const [isHighContrast, setIsHighContrast] = useState(false);
  const [isLowBandwidth, setIsLowBandwidth] = useState(false);
  const [fontScale, setFontScale] = useState<'normal' | 'lg' | 'xl'>('normal');

  useEffect(() => {
    setLang(getStoredLanguage());
    const handler = (e: any) => setLang(e.detail);
    window.addEventListener('kstdc_lang_changed', handler);
    return () => window.removeEventListener('kstdc_lang_changed', handler);
  }, []);

  const handleLanguageChange = (newLang: Language) => {
    setLang(newLang);
    setStoredLanguage(newLang);
  };

  const toggleHighContrast = () => {
    const next = !isHighContrast;
    setIsHighContrast(next);
    if (next) {
      document.documentElement.classList.add('high-contrast');
    } else {
      document.documentElement.classList.remove('high-contrast');
    }
  };

  const toggleLowBandwidth = () => {
    const next = !isLowBandwidth;
    setIsLowBandwidth(next);
    if (next) {
      document.documentElement.classList.add('low-bandwidth');
    } else {
      document.documentElement.classList.remove('low-bandwidth');
    }
  };

  const cycleFontScale = () => {
    if (fontScale === 'normal') {
      setFontScale('lg');
      document.documentElement.classList.add('font-scale-lg');
      document.documentElement.classList.remove('font-scale-xl');
    } else if (fontScale === 'lg') {
      setFontScale('xl');
      document.documentElement.classList.remove('font-scale-lg');
      document.documentElement.classList.add('font-scale-xl');
    } else {
      setFontScale('normal');
      document.documentElement.classList.remove('font-scale-lg', 'font-scale-xl');
    }
  };

  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 sm:h-20 flex items-center justify-between gap-6">
          
          {/* Clean Logo Branding */}
          <a href="/" className="flex items-center gap-3 shrink-0 group">
            <div className="w-10 h-10 rounded-2xl bg-black text-white flex items-center justify-center font-bold text-lg shadow-sm group-hover:scale-105 transition-transform">
              K
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg sm:text-xl tracking-tight text-slate-900">KSTDC</span>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                  Karnataka
                </span>
              </div>
              <span className="text-[11px] text-slate-500 font-medium hidden sm:inline -mt-0.5">
                Official Tourism & Conducted Stays
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-100/70 p-1.5 rounded-full border border-slate-200/60">
            <a
              href="/"
              className="px-3.5 py-1.5 rounded-full text-xs font-semibold text-slate-700 hover:text-slate-900 hover:bg-white transition-all"
            >
              Home
            </a>
            <a
              href="/trips"
              className="px-3.5 py-1.5 rounded-full text-xs font-semibold text-slate-700 hover:text-slate-900 hover:bg-white transition-all"
            >
              Tours
            </a>
            <a
              href="/stays"
              className="px-3.5 py-1.5 rounded-full text-xs font-semibold text-slate-700 hover:text-slate-900 hover:bg-white transition-all"
            >
              Hotels
            </a>
            <a
              href="/cabs"
              className="px-3.5 py-1.5 rounded-full text-xs font-semibold text-slate-700 hover:text-slate-900 hover:bg-white transition-all"
            >
              Airport Taxi
            </a>
            <a
              href="/activities"
              className="px-3.5 py-1.5 rounded-full text-xs font-semibold text-slate-700 hover:text-slate-900 hover:bg-white transition-all"
            >
              Activities
            </a>
            <a
              href="/destinations"
              className="px-3.5 py-1.5 rounded-full text-xs font-semibold text-slate-700 hover:text-slate-900 hover:bg-white transition-all"
            >
              Destinations
            </a>
            <a
              href="/my-bookings"
              className="px-3.5 py-1.5 rounded-full text-xs font-semibold text-slate-700 hover:text-slate-900 hover:bg-white transition-all"
            >
              My Bookings
            </a>
          </nav>

          {/* Right Action Tools */}
          <div className="flex items-center gap-2.5">
            
            {/* Minimalist Accessibility Micro-controls */}
            <div className="hidden lg:flex items-center gap-1 bg-slate-100 p-1 rounded-full border border-slate-200/80 text-xs">
              <button
                onClick={toggleHighContrast}
                title="Toggle High Contrast"
                className={`p-1.5 rounded-full transition-colors ${
                  isHighContrast ? 'bg-black text-white' : 'text-slate-600 hover:text-slate-900'
                }`}
                aria-label="High Contrast Toggle"
              >
                <Eye className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={toggleLowBandwidth}
                title="Toggle Low Bandwidth Mode"
                className={`p-1.5 rounded-full transition-colors ${
                  isLowBandwidth ? 'bg-black text-white' : 'text-slate-600 hover:text-slate-900'
                }`}
                aria-label="Low Bandwidth Mode"
              >
                <Zap className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={cycleFontScale}
                title="Text Size Zoom"
                className="px-2 py-0.5 rounded-full text-[11px] font-bold text-slate-700 hover:bg-white transition-colors"
                aria-label="Font Zoom"
              >
                {fontScale === 'normal' ? 'A' : fontScale === 'lg' ? 'A+' : 'A++'}
              </button>
            </div>

            {/* Language Selector Pill */}
            <div className="relative flex items-center bg-slate-100 border border-slate-200/80 rounded-full px-3 py-1.5 text-xs font-semibold text-slate-800">
              <Globe className="w-3.5 h-3.5 text-slate-600 mr-1.5 shrink-0" />
              <select
                value={lang}
                onChange={(e) => handleLanguageChange(e.target.value as Language)}
                className="bg-transparent text-slate-900 font-semibold focus:outline-none cursor-pointer pr-1 text-xs"
                aria-label="Select Language"
              >
                <option value="en">English</option>
                <option value="kn">ಕನ್ನಡ</option>
                <option value="hi">हिन्दी</option>
              </select>
            </div>

            {/* Primary Action Button (Plan My Trip) */}
            <button
              onClick={() => setPlannerOpen(true)}
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-black hover:bg-neutral-800 text-white font-bold text-xs shadow-sm active:scale-98 transition-all"
            >
              <span>{t.navPlanMyTrip}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2.5 rounded-full bg-slate-100 border border-slate-200 text-slate-900 hover:bg-slate-200 transition-colors"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-slate-200 p-5 space-y-4 shadow-xl animate-fade-in">
            <nav className="flex flex-col gap-1.5">
              <a
                href="/"
                className="p-3 rounded-2xl bg-slate-50 text-sm font-bold text-slate-900"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </a>
              <a
                href="/trips"
                className="p-3 rounded-2xl bg-slate-50 text-sm font-bold text-slate-900"
                onClick={() => setMobileMenuOpen(false)}
              >
                Tours & Circuits
              </a>
              <a
                href="/stays"
                className="p-3 rounded-2xl bg-slate-50 text-sm font-bold text-slate-900"
                onClick={() => setMobileMenuOpen(false)}
              >
                Hotel Mayura Stays
              </a>
              <a
                href="/cabs"
                className="p-3 rounded-2xl bg-slate-50 text-sm font-bold text-slate-900"
                onClick={() => setMobileMenuOpen(false)}
              >
                Airport Taxi & Cabs
              </a>
              <a
                href="/activities"
                className="p-3 rounded-2xl bg-slate-50 text-sm font-bold text-slate-900"
                onClick={() => setMobileMenuOpen(false)}
              >
                Activities & Ambaari Tours
              </a>
              <a
                href="/destinations"
                className="p-3 rounded-2xl bg-slate-50 text-sm font-bold text-slate-900"
                onClick={() => setMobileMenuOpen(false)}
              >
                Destinations Atlas
              </a>
              <a
                href="/my-bookings"
                className="p-3 rounded-2xl bg-slate-50 text-sm font-bold text-slate-900"
                onClick={() => setMobileMenuOpen(false)}
              >
                My Bookings & Tickets
              </a>
            </nav>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setPlannerOpen(true);
              }}
              className="w-full py-3.5 rounded-full bg-black text-white font-bold text-sm shadow-md"
            >
              {t.navPlanMyTrip}
            </button>
          </div>
        )}
      </header>

      {plannerOpen && (
        <AiTripPlannerModal isOpen={plannerOpen} onClose={() => setPlannerOpen(false)} />
      )}
    </>
  );
};
