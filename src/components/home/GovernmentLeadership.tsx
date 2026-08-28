import React from 'react';
import { ShieldCheck, Award, Building } from 'lucide-react';

const LEADERSHIP_DATA = [
  {
    name: 'Sri D. K. Shivakumar',
    title: "Hon'ble Deputy Chief Minister",
    portfolio: 'Government of Karnataka',
    image: '/leadership/dk-shivakumar.jpeg',
    role: 'State Executive Leadership',
  },
  {
    name: 'Dr. G. Parameshwara',
    title: "Hon'ble Minister for Home Affairs",
    portfolio: 'Government of Karnataka',
    image: '/leadership/g-parameshwara.jpeg',
    role: 'Cabinet Ministry',
  },
  {
    name: 'Sri K. J. George',
    title: "Hon'ble Minister for Energy",
    portfolio: 'Government of Karnataka',
    image: '/leadership/kj-george.jpeg',
    role: 'Cabinet Ministry',
  },
  {
    name: 'Chairman & Board of Directors',
    title: 'Chairman, KSTDC',
    portfolio: 'Karnataka State Tourism Development Corporation',
    image: '/leadership/chairman-kstdc.jpeg',
    role: 'Corporation Leadership',
  },
];

export const GovernmentLeadership: React.FC = () => {
  return (
    <section className="py-12 sm:py-16 bg-slate-50/60 dark:bg-slate-900/40 border-y border-slate-200/80 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-1.5 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/80 text-blue-800 dark:text-blue-300 text-xs font-bold border border-blue-200 dark:border-blue-800">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Executive Leadership & Governance</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-950 dark:text-white">
              Government of Karnataka & KSTDC Leadership
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              Guiding Karnataka's tourism infrastructure, citizen-first digital access, and world heritage conservation.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-800 px-3.5 py-2 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-2xs">
            <img src="/kstdc-logo.png" alt="KSTDC" className="w-5 h-5 object-contain" />
            <span>Official State Enterprise</span>
          </div>
        </div>

        {/* 4 Dignitaries Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {LEADERSHIP_DATA.map((leader, i) => (
            <div
              key={i}
              className="bg-white dark:bg-slate-800/90 rounded-3xl border border-slate-200 dark:border-slate-700 p-5 shadow-xs hover:shadow-md transition-all hover:border-slate-300 dark:hover:border-slate-600 flex flex-col items-center text-center space-y-4 group"
            >
              {/* Photo Frame */}
              <div className="relative">
                <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-700 border-2 border-slate-100 dark:border-slate-700 shadow-sm group-hover:scale-103 transition-transform">
                  <img
                    src={leader.image}
                    alt={leader.name}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div className="absolute -bottom-2 -right-2 w-7 h-7 rounded-full bg-slate-950 text-white flex items-center justify-center shadow-sm">
                  <Award className="w-3.5 h-3.5 text-amber-400" />
                </div>
              </div>

              {/* Identity & Portfolio */}
              <div className="space-y-1 w-full">
                <span className="text-[10px] font-bold text-slate-400 dark:text-slate-400 uppercase tracking-wider block">
                  {leader.role}
                </span>
                <h3 className="font-bold text-base text-slate-950 dark:text-white leading-snug">
                  {leader.name}
                </h3>
                <p className="text-xs font-semibold text-blue-700 dark:text-blue-400">
                  {leader.title}
                </p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                  {leader.portfolio}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
