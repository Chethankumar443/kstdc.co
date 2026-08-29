import React from 'react';
import { Car, Check, ArrowRight } from 'lucide-react';
import { CABS_DATA } from '../../data/cabsData';

export const AirportTaxiSection: React.FC = () => {
  return (
    <section className="py-12 sm:py-18 bg-surface-soft dark:bg-slate-900/40 border-t border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">
              <Car className="w-4 h-4" />
              <span>Official KSTDC Transport</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
              KSTDC Airport Taxi & Chauffeur Fleet
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-xl">
              24x7 prepaid airport taxi counters at Bengaluru Airport (BLR) & sanitized outstation chauffeur services with fixed government tariffs.
            </p>
          </div>

          <a
            href="/cabs"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline self-start md:self-end"
          >
            <span>View All Fleet & Rates</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Cabs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CABS_DATA.map((cab) => (
            <div
              key={cab.id}
              className="bg-white dark:bg-slate-800/90 rounded-[28px] overflow-hidden border border-slate-200 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-500 transition-all flex flex-col justify-between shadow-xs"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-slate-100 dark:bg-slate-700">
                <img
                  src={cab.image}
                  alt={cab.name}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3.5 left-3.5 bg-slate-900 dark:bg-black text-white px-3 py-1 rounded-full text-[11px] font-bold">
                  {cab.type}
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between gap-5">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-medium">
                    <span>{cab.seating}</span>
                    <span>•</span>
                    <span>{cab.luggage}</span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                    {cab.name}
                  </h3>

                  <div className="space-y-1.5 pt-1 text-xs text-slate-600 dark:text-slate-400">
                    {cab.features.slice(0, 3).map((f, i) => (
                      <div key={i} className="flex items-center gap-1.5">
                        <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 block font-medium">
                      Airport Transfer From
                    </span>
                    <span className="text-xl font-bold text-slate-900 dark:text-white">
                      ₹{cab.airportDropPrice.toLocaleString('en-IN')}
                    </span>
                  </div>

                  <a
                    href="/cabs"
                    className="px-5 py-2.5 rounded-full bg-slate-900 dark:bg-blue-600 hover:bg-black dark:hover:bg-blue-700 text-white font-bold text-xs shadow-xs transition-all"
                  >
                    Book Cab →
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
