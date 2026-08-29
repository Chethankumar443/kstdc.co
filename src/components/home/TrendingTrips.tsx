import React, { useState } from 'react';
import { Clock, MapPin, Building, Star, ArrowRight } from 'lucide-react';
import { TRIPS_DATA } from '../../data/tripsData';
import type { TripCategory } from '../../types/travel';

export const TrendingTrips: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<'all' | TripCategory>('all');

  const filteredTrips = selectedFilter === 'all'
    ? TRIPS_DATA
    : TRIPS_DATA.filter((trip) => trip.category === selectedFilter);

  return (
    <section className="py-12 sm:py-18 bg-canvas border-t border-hairline-soft">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Section Header with Pill Category Filter */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-1">
            <span className="text-xs uppercase tracking-wider font-bold text-blue-600 dark:text-blue-400 block">
              Conducted Tour Packages
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
              Curated Escapes from Bengaluru
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-xl">
              All packages include Volvo AC transport, certified guides, and Hotel Mayura stays with 100% price transparency.
            </p>
          </div>

          {/* Pill Filter Tabs */}
          <div className="flex flex-wrap gap-2 bg-slate-100 dark:bg-slate-800/80 p-1 rounded-full border border-slate-200 dark:border-slate-700">
            {[
              { id: 'all', label: 'All Curated Trips' },
              { id: 'nature', label: 'Nature & Hills' },
              { id: 'heritage', label: 'Heritage & History' },
              { id: 'beach', label: 'Coastal & Beaches' },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setSelectedFilter(f.id as any)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  selectedFilter === f.id
                    ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-sm'
                    : 'text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-white dark:hover:bg-slate-700'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Trips Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTrips.map((trip) => (
            <div
              key={trip.id}
              className="bg-white dark:bg-slate-800/90 rounded-[28px] overflow-hidden border border-slate-200 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-500 transition-all flex flex-col justify-between shadow-xs"
            >
              {/* Image Frame */}
              <div className="relative aspect-[16/10] overflow-hidden bg-slate-100 dark:bg-slate-700">
                <img
                  src={trip.heroImage}
                  alt={trip.title}
                  loading="lazy"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/hero/hero-1.jpeg';
                  }}
                  className="w-full h-full object-cover"
                />
                
                {trip.badge && (
                  <div className="absolute top-3.5 left-3.5">
                    <span className="px-3 py-1 rounded-full bg-black/80 backdrop-blur-sm text-white text-[11px] font-bold">
                      {trip.badge}
                    </span>
                  </div>
                )}

                <div className="absolute bottom-3.5 right-3.5 bg-white/95 dark:bg-slate-900/95 px-2.5 py-1 rounded-full text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1 shadow-sm">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>{trip.rating}</span>
                  <span className="text-slate-400 font-normal text-[11px]">({trip.reviewsCount})</span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between gap-5">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 font-medium">
                    <MapPin className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                    <span>{trip.origin} → {trip.destination}</span>
                    <span>•</span>
                    <Clock className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                    <span>{trip.durationDays} {trip.durationDays === 1 ? 'Day Tour' : 'Days Tour'}</span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 dark:text-white leading-snug">
                    {trip.title}
                  </h3>

                  <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
                    {trip.tagline}
                  </p>

                  {/* Mayura Hotel Tag */}
                  {trip.hotel && (
                    <div className="flex items-center gap-2 text-xs text-slate-800 dark:text-slate-200 font-semibold bg-slate-50 dark:bg-slate-700/60 px-3 py-2 rounded-xl border border-slate-200/60 dark:border-slate-700">
                      <Building className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0" />
                      <span className="truncate">{trip.hotel.name}</span>
                      <span className="text-[10px] text-blue-600 dark:text-blue-400 font-bold ml-auto shrink-0 uppercase tracking-wider">
                        Included
                      </span>
                    </div>
                  )}
                </div>

                {/* Price & Action */}
                <div className="pt-4 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 block font-medium">
                      From
                    </span>
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl font-bold text-slate-900 dark:text-white">
                        ₹{trip.pricePerPerson.toLocaleString('en-IN')}
                      </span>
                      <span className="text-xs text-slate-500 dark:text-slate-400">/ person</span>
                    </div>
                  </div>

                  <a
                    href={`/trips/${trip.slug}`}
                    className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-slate-900 dark:bg-blue-600 hover:bg-black dark:hover:bg-blue-700 text-white font-bold text-xs shadow-sm transition-all"
                  >
                    <span>View Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
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
