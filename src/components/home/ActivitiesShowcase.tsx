import React from 'react';
import { Compass, Clock, MapPin, ArrowRight } from 'lucide-react';
import { ACTIVITIES_DATA } from '../../data/activitiesData';

export const ActivitiesShowcase: React.FC = () => {
  return (
    <section className="py-12 sm:py-18 bg-canvas border-t border-hairline-soft transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
              <Compass className="w-4 h-4" />
              <span>City Experiences & Heritage Walks</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
              KSTDC Conducted Activities
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-xl">
              Open-top double decker Ambaari tours in Mysuru, official Vidhana Soudha heritage walks, and Sharavathi river water sports.
            </p>
          </div>

          <a
            href="/activities"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline self-start md:self-end"
          >
            <span>Explore All Activities</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Activities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {ACTIVITIES_DATA.map((act) => (
            <div
              key={act.id}
              className="bg-white dark:bg-slate-800/90 rounded-[28px] overflow-hidden border border-slate-200 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-500 transition-all flex flex-col justify-between shadow-xs"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-slate-100 dark:bg-slate-700">
                <img
                  src={act.heroImage}
                  alt={act.title}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3.5 left-3.5 bg-slate-900 dark:bg-black text-white px-3 py-1 rounded-full text-[11px] font-bold">
                  {act.city}
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 font-medium">
                    <Clock className="w-3.5 h-3.5 text-slate-900 dark:text-white" />
                    <span>{act.duration}</span>
                    <span>•</span>
                    <span>{act.category}</span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 dark:text-white leading-snug">
                    {act.title}
                  </h3>

                  <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
                    {act.tagline}
                  </p>

                  <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300">
                    <span className="font-semibold block text-slate-900 dark:text-white">Schedule:</span>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400">{act.schedule}</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 block font-medium">Ticket from</span>
                    <span className="text-xl font-bold text-slate-900 dark:text-white">
                      ₹{act.price.toLocaleString('en-IN')}
                      <span className="text-xs font-normal text-slate-500 dark:text-slate-400"> / person</span>
                    </span>
                  </div>

                  <a
                    href="/activities"
                    className="px-5 py-2.5 rounded-full bg-slate-900 dark:bg-blue-600 hover:bg-black dark:hover:bg-blue-700 text-white font-bold text-xs shadow-xs transition-all"
                  >
                    Book Ticket →
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
