import React from 'react';
import { ArrowRight } from 'lucide-react';
import { DESTINATIONS_DATA } from '../../data/destinationsData';

export const DestinationsShowcase: React.FC = () => {
  return (
    <section className="py-12 sm:py-18 bg-canvas transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-1">
            <span className="text-xs uppercase tracking-wider font-bold text-blue-600 dark:text-blue-400 block">
              Destination Atlas
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
              Explore by Destination
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-xl">
              Start with the places you want to experience, then browse conducted routes and stays.
            </p>
          </div>

          <a
            href="/destinations"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline self-start md:self-end"
          >
            <span>View All Destinations</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Edge-to-Edge Photo Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {DESTINATIONS_DATA.map((dest) => (
            <a
              key={dest.id}
              href={`/trips?destination=${encodeURIComponent(dest.name)}`}
              className="group relative rounded-[28px] overflow-hidden aspect-[4/3] bg-slate-100 dark:bg-slate-800 shadow-sm hover:shadow-md transition-all flex flex-col justify-end p-6 text-white border border-slate-200 dark:border-slate-700"
            >
              <img
                src={dest.heroImage}
                alt={dest.name}
                loading="lazy"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/hero/hero-1.jpeg';
                }}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-103 transition-transform duration-500 z-0"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent z-0" />

              <div className="relative z-10 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-[10px] font-bold uppercase tracking-wider text-white">
                    {dest.region}
                  </span>
                  <span className="text-xs text-white/90 font-semibold">
                    {dest.tripsCount} Tours
                  </span>
                </div>

                <h3 className="text-2xl font-bold tracking-tight text-white">
                  {dest.name}
                </h3>

                <p className="text-xs text-white/80 line-clamp-2 leading-relaxed font-normal">
                  {dest.tagline}
                </p>

                <div className="pt-2 flex items-center justify-between text-xs text-white font-semibold">
                  <span>Stay: {dest.featuredStay}</span>
                  <span className="group-hover:translate-x-1 transition-transform">
                    Explore →
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>

      </div>
    </section>
  );
};
