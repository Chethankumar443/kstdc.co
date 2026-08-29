import React, { useState, useEffect } from 'react';
import { Search, MapPin, Clock, Building, Star, ArrowRight, SlidersHorizontal } from 'lucide-react';
import { TRIPS_DATA } from '../../data/tripsData';
import { AiTripPlannerModal } from '../home/AiTripPlannerModal';

export const TripsExplorer: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDuration, setSelectedDuration] = useState<string>('all');
  const [maxPrice, setMaxPrice] = useState<number>(10000);
  const [plannerOpen, setPlannerOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const cat = params.get('category');
      const dur = params.get('duration');
      const dest = params.get('destination') || params.get('search') || params.get('q');
      if (cat) setSelectedCategory(cat);
      if (dur) setSelectedDuration(dur);
      if (dest) setSearchQuery(dest);
    }
  }, []);

  const filteredTrips = TRIPS_DATA.filter((trip) => {
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const match =
        trip.title.toLowerCase().includes(q) ||
        trip.destination.toLowerCase().includes(q) ||
        trip.tagline.toLowerCase().includes(q);
      if (!match) return false;
    }

    if (selectedCategory !== 'all' && trip.category !== selectedCategory) {
      return false;
    }

    if (selectedDuration !== 'all') {
      const durNum = parseInt(selectedDuration, 10);
      if (durNum === 1 && trip.durationDays !== 1) return false;
      if (durNum === 2 && trip.durationDays !== 2) return false;
      if (durNum === 3 && trip.durationDays < 3) return false;
    }

    if (trip.pricePerPerson > maxPrice) {
      return false;
    }

    return true;
  });

  return (
    <div className="py-8 sm:py-14 bg-canvas min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Page Header Strip */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-slate-900 dark:bg-slate-950 p-8 sm:p-10 rounded-[32px] text-white border border-slate-800 shadow-md">
          <div className="space-y-1.5 max-w-xl">
            <span className="text-xs uppercase tracking-wider font-bold text-blue-400 block">
              Official Conducted Tours
            </span>
            <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-white">
              All Curated Tour Packages
            </h1>
            <p className="text-xs sm:text-sm text-slate-300">
              Filter by time, destination or budget. Complete route transparency with Volvo transport and Hotel Mayura stays.
            </p>
          </div>

          <button
            onClick={() => setPlannerOpen(true)}
            className="self-start md:self-center px-6 py-3 rounded-full bg-white hover:bg-slate-100 text-slate-950 font-bold text-xs shadow-md transition-all flex items-center gap-2 shrink-0 cursor-pointer"
          >
            <span>Plan My Trip</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Filters and Search Container */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-[24px] border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
          
          {/* Search Input */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by destination (e.g. Coorg, Hampi, Mysuru, Beach, Hills)..."
              className="w-full pl-11 pr-16 py-3 rounded-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 text-xs sm:text-sm font-semibold"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 cursor-pointer"
              >
                Clear
              </button>
            )}
          </div>

          {/* Category & Duration Pill Tabs */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
            
            {/* Categories */}
            <div className="flex flex-wrap items-center gap-1.5 bg-slate-100 dark:bg-slate-800 p-1 rounded-full border border-slate-200 dark:border-slate-700">
              {[
                { id: 'all', label: 'All Curated Trips' },
                { id: 'nature', label: 'Nature & Hills' },
                { id: 'heritage', label: 'Heritage & History' },
                { id: 'beach', label: 'Coastal & Beaches' },
                { id: 'adventure', label: 'Peaks & Treks' },
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                    selectedCategory === cat.id
                      ? 'bg-slate-950 dark:bg-white text-white dark:text-slate-950 shadow-sm'
                      : 'text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-white dark:hover:bg-slate-700'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Duration */}
            <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-full border border-slate-200 dark:border-slate-700">
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium pl-2 pr-1">Duration:</span>
              {[
                { id: 'all', label: 'All' },
                { id: '1', label: '1 Day' },
                { id: '2', label: '2 Days' },
                { id: '3', label: '3+ Days' },
              ].map((d) => (
                <button
                  key={d.id}
                  onClick={() => setSelectedDuration(d.id)}
                  className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                    selectedDuration === d.id
                      ? 'bg-slate-950 dark:bg-white text-white dark:text-slate-950 shadow-sm'
                      : 'text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-white dark:hover:bg-slate-700'
                  }`}
                >
                  {d.label}
                </button>
              ))}
            </div>

          </div>

          {/* Budget Range Slider */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span className="font-semibold text-slate-900 dark:text-white">
                Max Budget per Person:
              </span>
              <span className="font-bold text-blue-600 dark:text-blue-400 text-sm">₹{maxPrice.toLocaleString('en-IN')}</span>
            </div>
            <div className="w-full sm:w-64 flex items-center gap-3">
              <span className="text-slate-500 dark:text-slate-400 text-[11px]">₹1k</span>
              <input
                type="range"
                min="1000"
                max="10000"
                step="500"
                value={maxPrice}
                onChange={(e) => setMaxPrice(parseInt(e.target.value, 10))}
                className="w-full accent-blue-600 cursor-pointer"
              />
              <span className="text-slate-500 dark:text-slate-400 text-[11px]">₹10k</span>
            </div>
          </div>

        </div>

        {/* Counter */}
        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 px-1">
          <span>
            Showing <strong>{filteredTrips.length}</strong> tour packages
          </span>
          <span>Verified Government Tariffs</span>
        </div>

        {/* Trips Grid */}
        {filteredTrips.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTrips.map((trip) => (
              <div
                key={trip.id}
                className="bg-white dark:bg-slate-800/90 rounded-[28px] overflow-hidden border border-slate-200 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-500 transition-all flex flex-col justify-between shadow-xs"
              >
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
        ) : (
          <div className="text-center py-16 bg-slate-50 dark:bg-slate-900 rounded-[32px] border border-slate-200 dark:border-slate-800 p-8 space-y-4">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              No tours match your current filters
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 max-w-md mx-auto">
              Try resetting search criteria or opening the trip planner.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setSelectedDuration('all');
                setMaxPrice(10000);
              }}
              className="px-6 py-2.5 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-xs cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>

      {plannerOpen && (
        <AiTripPlannerModal isOpen={plannerOpen} onClose={() => setPlannerOpen(false)} />
      )}
    </div>
  );
};
