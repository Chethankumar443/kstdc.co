import React from 'react';
import { Award, Bus, Building2, BadgePercent } from 'lucide-react';

export const WhyKstdcTrust: React.FC = () => {
  const trustPillars = [
    {
      icon: <Award className="w-6 h-6 text-blue-600 dark:text-blue-400" />,
      title: 'State-Certified Guides',
      description: 'Official archaeological and cultural guides accompanying all heritage and circuit tours.',
    },
    {
      icon: <Bus className="w-6 h-6 text-blue-600 dark:text-blue-400" />,
      title: 'Volvo AC Luxury Fleet',
      description: 'Sanitized pushback Volvo multi-axle coaches operated by vetted state drivers.',
    },
    {
      icon: <Building2 className="w-6 h-6 text-blue-600 dark:text-blue-400" />,
      title: 'Official Mayura Stays',
      description: 'Guaranteed government-owned hillside and heritage properties at prime locations.',
    },
    {
      icon: <BadgePercent className="w-6 h-6 text-blue-600 dark:text-blue-400" />,
      title: 'Transparent Pricing',
      description: 'Zero hidden platform surcharges or dynamic price surges. What you see is what you pay.',
    },
  ];

  return (
    <section className="py-14 sm:py-20 bg-slate-50 dark:bg-slate-900/40 border-y border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-xs uppercase tracking-wider font-bold text-blue-600 dark:text-blue-400 block">
            Public Service Assurance
          </span>
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
            Why Book with KSTDC?
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            The safety and predictability of state-conducted tourism combined with modern travel standards.
          </p>
        </div>

        {/* 4-Up Feature Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trustPillars.map((pillar, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-slate-800/90 p-6 sm:p-7 rounded-[22px] border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col justify-between space-y-4"
            >
              <div className="w-12 h-12 rounded-2xl bg-slate-50 dark:bg-slate-700/60 flex items-center justify-center border border-slate-200/60 dark:border-slate-600">
                {pillar.icon}
              </div>

              <div className="space-y-1.5">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  {pillar.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {pillar.description}
                </p>
              </div>

              <span className="text-[11px] font-bold text-blue-600 dark:text-blue-400 block pt-1">
                Verified Public Standard
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
