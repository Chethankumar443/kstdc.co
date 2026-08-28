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
    <section className="py-12 sm:py-16 bg-slate-50/60 border-y border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-1.5 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-800 text-xs font-bold border border-blue-200">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Executive Leadership & Governance</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-950">
              Government of Karnataka & KSTDC Leadership
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Guiding Karnataka's tourism infrastructure, citizen-first digital access, and world heritage conservation.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold text-slate-600 bg-white px-3.5 py-2 rounded-2xl border border-slate-200 shadow-2xs">
            <img src="/kstdc-logo.png" alt="KSTDC" className="w-5 h-5 object-contain" />
            <span>Official State Enterprise</span>
          </div>
        </div>

        {/* 4 Dignitaries Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {LEADERSHIP_DATA.map((leader, i) => (
            <div
              key={i}
              className="bg-white rounded-3xl border border-slate-200 p-5 shadow-xs hover:shadow-md transition-all hover:border-slate-300 flex flex-col items-center text-center space-y-4 group"
            >
              {/* Photo Frame */}
              <div className="relative">
                <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl overflow-hidden bg-slate-100 border-2 border-slate-100 shadow-sm group-hover:scale-103 transition-transform">
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

              {/* Dignitary Details */}
              <div className="space-y-1 w-full">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 inline-block">
                  {leader.role}
                </span>
                <h3 className="font-bold text-base text-slate-950 pt-1">
                  {leader.name}
                </h3>
                <p className="text-xs font-semibold text-blue-700">
                  {leader.title}
                </p>
                <p className="text-[11px] text-slate-500 line-clamp-1">
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
