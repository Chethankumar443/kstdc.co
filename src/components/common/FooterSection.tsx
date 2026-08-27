import React, { useState, useEffect } from 'react';
import { PhoneCall, ShieldCheck } from 'lucide-react';
import { getStoredLanguage } from '../../lib/bookingStore';
import { TRANSLATIONS } from '../../data/translations';
import type { Language } from '../../types/travel';

export const FooterSection: React.FC = () => {
  const [lang, setLang] = useState<Language>('en');

  useEffect(() => {
    setLang(getStoredLanguage());
    const handler = (e: any) => setLang(e.detail);
    window.addEventListener('kstdc_lang_changed', handler);
    return () => window.removeEventListener('kstdc_lang_changed', handler);
  }, []);

  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  return (
    <footer className="bg-canvas text-steel border-t border-hairline-soft pt-14 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Top 5-Column Grid (DESIGN-meta footer-region) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Brand & Purpose */}
          <div className="lg:col-span-2 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center font-bold text-sm">
                K
              </div>
              <div>
                <span className="font-bold text-base text-ink-deep tracking-tight">KSTDC</span>
                <span className="block text-[11px] text-steel">Karnataka State Tourism Development Corporation</span>
              </div>
            </div>
            <p className="text-xs text-steel leading-relaxed max-w-sm">
              An official citizen-first digital portal designed to make exploring Karnataka’s heritage, misty hills and coastline transparent, reliable, and straightforward.
            </p>
            <div className="flex items-center gap-2 p-3 rounded-2xl bg-surface-soft border border-hairline-soft text-xs text-ink-deep font-semibold">
              <PhoneCall className="w-4 h-4 text-primary-cobalt shrink-0" />
              <span>{t.helplineText}</span>
            </div>
          </div>

          {/* Quick Circuits */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-ink-deep">
              Curated Circuits
            </h4>
            <ul className="space-y-2 text-xs text-steel font-medium">
              <li><a href="/trips/coorg-mist-and-waterfalls" className="hover:text-ink-deep transition-colors">Coorg 2-Day Nature Tour</a></li>
              <li><a href="/trips/hampi-the-golden-empire" className="hover:text-ink-deep transition-colors">Hampi UNESCO World Heritage</a></li>
              <li><a href="/trips/mysuru-royal-heritage-express" className="hover:text-ink-deep transition-colors">Mysuru 1-Day Royal Express</a></li>
              <li><a href="/trips/gokarna-murudeshwar-coastal-escape" className="hover:text-ink-deep transition-colors">Gokarna Coastal Escape</a></li>
              <li><a href="/trips/nandi-hills-sunrise-and-vineyards" className="hover:text-ink-deep transition-colors">Nandi Hills Sunrise Tour</a></li>
            </ul>
          </div>

          {/* Hotel Mayura */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-ink-deep">
              Stay with Mayura
            </h4>
            <ul className="space-y-2 text-xs text-steel font-medium">
              <li><a href="/stays" className="hover:text-ink-deep transition-colors">Hotel Mayura Valley View (Coorg)</a></li>
              <li><a href="/stays" className="hover:text-ink-deep transition-colors">Hotel Mayura Bhuvaneshwari (Hampi)</a></li>
              <li><a href="/stays" className="hover:text-ink-deep transition-colors">Hotel Mayura Hoysala (Mysuru)</a></li>
              <li><a href="/stays" className="hover:text-ink-deep transition-colors">Hotel Mayura Samudra (Gokarna)</a></li>
              <li><a href="/stays" className="hover:text-ink-deep transition-colors">Hotel Mayura Gerusoppa (Jog Falls)</a></li>
            </ul>
          </div>

          {/* Policies & Verification */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-ink-deep">
              Citizen Charter
            </h4>
            <ul className="space-y-2 text-xs text-steel font-medium">
              <li><a href="/terms" className="hover:text-ink-deep transition-colors">Terms & Conditions</a></li>
              <li><a href="/privacy" className="hover:text-ink-deep transition-colors">Privacy Policy</a></li>
              <li className="flex items-center gap-1.5 text-ink-deep"><ShieldCheck className="w-3.5 h-3.5 text-primary-cobalt" /> Verified Public Tariffs</li>
              <li className="flex items-center gap-1.5 text-ink-deep"><ShieldCheck className="w-3.5 h-3.5 text-primary-cobalt" /> 48h Full Refund Window</li>
            </ul>
          </div>

        </div>

        {/* Bottom Legal Disclosure */}
        <div className="pt-8 border-t border-hairline-soft flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-steel">
          <div className="text-center sm:text-left">
            <span>© 2026 Karnataka Tourism · Build What Moves India. </span>
            <span className="text-stone">Prototype concept not affiliated with live Govt servers.</span>
          </div>

          <div className="flex items-center gap-5 text-xs font-medium">
            <a href="/terms" className="hover:text-ink-deep transition-colors">Terms</a>
            <a href="/privacy" className="hover:text-ink-deep transition-colors">Privacy</a>
            <a href="/trips" className="hover:text-ink-deep transition-colors">Tours</a>
            <a href="/my-bookings" className="hover:text-ink-deep transition-colors">My Bookings</a>
          </div>
        </div>

      </div>
    </footer>
  );
};
