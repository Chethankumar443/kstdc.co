import React, { useState, useEffect } from 'react';
import { Award, Bus, Building2, BadgePercent } from 'lucide-react';
import { getStoredLanguage } from '../../lib/bookingStore';
import { TRANSLATIONS } from '../../data/translations';
import type { Language } from '../../types/travel';

export const WhyKstdcTrust: React.FC = () => {
  const [lang, setLang] = useState<Language>('en');

  useEffect(() => {
    setLang(getStoredLanguage());
    const handler = (e: any) => setLang(e.detail);
    window.addEventListener('kstdc_lang_changed', handler);
    return () => window.removeEventListener('kstdc_lang_changed', handler);
  }, []);

  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  const trustPillars = [
    {
      icon: <Award className="w-6 h-6 text-primary-cobalt" />,
      title: 'State-Certified Guides',
      description: 'Official archaeological and cultural guides accompanying all heritage and circuit tours.',
    },
    {
      icon: <Bus className="w-6 h-6 text-primary-cobalt" />,
      title: 'Volvo AC Luxury Fleet',
      description: 'Sanitized pushback Volvo multi-axle coaches operated by vetted state drivers.',
    },
    {
      icon: <Building2 className="w-6 h-6 text-primary-cobalt" />,
      title: 'Official Mayura Stays',
      description: 'Guaranteed government-owned hillside and heritage properties at prime locations.',
    },
    {
      icon: <BadgePercent className="w-6 h-6 text-primary-cobalt" />,
      title: 'Transparent Pricing',
      description: 'Zero hidden platform surcharges or dynamic price surges. What you see is what you pay.',
    },
  ];

  return (
    <section className="py-14 sm:py-20 bg-surface-soft border-y border-hairline-soft">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-xs uppercase tracking-wider font-bold text-primary-cobalt block">
            Public Service Assurance
          </span>
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-ink-deep">
            Why Book with KSTDC?
          </h2>
          <p className="text-xs sm:text-sm text-steel">
            The safety and predictability of state-conducted tourism combined with modern travel standards.
          </p>
        </div>

        {/* 4-Up Feature Grid (DESIGN-meta feature-icon-row / why-buy-tile) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trustPillars.map((pillar, idx) => (
            <div
              key={idx}
              className="bg-canvas p-6 sm:p-7 rounded-[22px] border border-hairline-soft shadow-sm flex flex-col justify-between space-y-4"
            >
              <div className="w-12 h-12 rounded-2xl bg-surface-soft flex items-center justify-center border border-hairline-soft">
                {pillar.icon}
              </div>

              <div className="space-y-1.5">
                <h3 className="text-lg font-bold text-ink-deep">
                  {pillar.title}
                </h3>
                <p className="text-xs sm:text-sm text-steel leading-relaxed">
                  {pillar.description}
                </p>
              </div>

              <span className="text-[11px] font-bold text-primary-cobalt block pt-1">
                Verified Public Standard
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
