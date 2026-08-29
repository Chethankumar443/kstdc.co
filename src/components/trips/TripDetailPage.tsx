import React, { useState } from 'react';
import {
  MapPin, Clock, Star, ShieldCheck, Check, X as XIcon, Building, Bus,
  ChevronDown, ChevronUp, ArrowRight,
  Coffee, Utensils, Mountain, Camera, Landmark, PhoneCall
} from 'lucide-react';
import type { TripPackage } from '../../types/travel';

interface Props {
  trip: TripPackage;
}

export const TripDetailPage: React.FC<Props> = ({ trip }) => {
  const [selectedDate, setSelectedDate] = useState<string>(trip.departureSchedule.availableDates[0] || '2026-08-29');
  const [activeDay, setActiveDay] = useState<number>(1);
  const [openAccordion, setOpenAccordion] = useState<string | null>('cancellation');

  const toggleAccordion = (key: string) => {
    setOpenAccordion(openAccordion === key ? null : key);
  };

  const getEventIcon = (iconName: string) => {
    switch (iconName) {
      case 'bus': return <Bus className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />;
      case 'hotel': return <Building className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />;
      case 'camera': return <Camera className="w-3.5 h-3.5 text-amber-600" />;
      case 'coffee': return <Coffee className="w-3.5 h-3.5 text-amber-700" />;
      case 'mountain': return <Mountain className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />;
      case 'temple': return <Landmark className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />;
      case 'utensils': return <Utensils className="w-3.5 h-3.5 text-amber-600" />;
      default: return <MapPin className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />;
    }
  };

  return (
    <div className="py-6 sm:py-10 bg-canvas min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Breadcrumb */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-2 font-medium">
            <a href="/" className="hover:text-slate-900 dark:hover:text-white">Home</a>
            <span>›</span>
            <a href="/trips" className="hover:text-slate-900 dark:hover:text-white">Tours</a>
            <span>›</span>
            <span className="text-slate-900 dark:text-white font-bold">{trip.title}</span>
          </div>
          <div className="flex items-center gap-1.5 text-blue-600 dark:text-blue-400 font-bold">
            <ShieldCheck className="w-4 h-4" />
            <span>Official KSTDC Conducted Tour</span>
          </div>
        </div>

        {/* Header & Gallery Section */}
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                <MapPin className="w-3.5 h-3.5" />
                <span>{trip.origin} → {trip.destination}</span>
                <span>•</span>
                <Clock className="w-3.5 h-3.5" />
                <span>{trip.durationDays} Days / {trip.durationNights} Night</span>
              </div>
              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 dark:text-white">
                {trip.title}
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-3xl leading-relaxed">
                {trip.tagline}
              </p>
            </div>

            <div className="flex items-center gap-3 bg-white dark:bg-slate-800 p-3 rounded-2xl border border-slate-200 dark:border-slate-700 self-start md:self-end">
              <div className="flex items-center gap-1 text-amber-500 font-bold text-sm">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span>{trip.rating}</span>
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400 border-l border-slate-200 dark:border-slate-700 pl-3">
                <span className="font-bold text-slate-900 dark:text-white block">{trip.reviewsCount} Reviews</span>
                <span className="text-[11px]">Verified Travellers</span>
              </div>
            </div>
          </div>

          {/* Photo Gallery Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 rounded-[32px] overflow-hidden aspect-[16/9] md:aspect-[21/9] bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
            <div className="md:col-span-2 relative h-full">
              <img
                src={trip.heroImage}
                alt={trip.title}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/hero/hero-1.jpeg';
                }}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-bold">
                {trip.vehicleType}
              </div>
            </div>
            <div className="hidden md:grid grid-rows-2 gap-3 h-full">
              {trip.galleryImages.slice(1, 3).map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={`${trip.title} gallery ${i}`}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = i === 0 ? '/hero/hero-2.jpeg' : '/hero/hero-3.jpeg';
                  }}
                  className="w-full h-full object-cover rounded-2xl"
                />
              ))}
            </div>
          </div>
        </div>

        {/* 2-Column Split: Content + Sticky Right Purchase Rail */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column Content */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Pacing Breakdown Card */}
            <div className="bg-white dark:bg-slate-900 p-6 sm:p-7 rounded-[28px] border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider block">
                Trip Characteristics
              </span>
              
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                Why this trip is right for you
              </h2>
              
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                {trip.explainWhy.suitability}
              </p>

              {/* Visual Balance Bar */}
              <div className="pt-2 space-y-2">
                <div className="flex h-3 rounded-full overflow-hidden text-xs bg-slate-100 dark:bg-slate-800">
                  <div style={{ width: '30%' }} className="bg-blue-600" title="Travel Time" />
                  <div style={{ width: '45%' }} className="bg-slate-700 dark:bg-slate-400" title="Sightseeing Time" />
                  <div style={{ width: '25%' }} className="bg-emerald-600" title="Leisure & Rest" />
                </div>

                <div className="grid grid-cols-3 gap-2 text-xs pt-1">
                  <div className="flex items-center gap-1.5 text-blue-600 dark:text-blue-400 font-bold">
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-600 dark:bg-blue-400 shrink-0" />
                    <span>{trip.explainWhy.travelTimeHours}h Travel</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300 font-bold">
                    <span className="w-2.5 h-2.5 rounded-full bg-slate-700 dark:bg-slate-400 shrink-0" />
                    <span>{trip.explainWhy.sightseeingTimeHours}h Sightseeing</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-bold">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 shrink-0" />
                    <span>{trip.explainWhy.leisureTimeHours}h Leisure</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Visual Route Timeline */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                    Your Journey Itinerary
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Hour-by-hour itinerary with scheduled stops, meals, and viewpoints.
                  </p>
                </div>

                {trip.itinerary.length > 1 && (
                  <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-full border border-slate-200 dark:border-slate-700">
                    {trip.itinerary.map((it) => (
                      <button
                        key={it.day}
                        onClick={() => setActiveDay(it.day)}
                        className={`px-4 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                          activeDay === it.day
                            ? 'bg-slate-950 dark:bg-white text-white dark:text-slate-950 shadow-sm'
                            : 'text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white'
                        }`}
                      >
                        Day {it.day}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Timeline Events */}
              {trip.itinerary
                .filter((it) => (trip.itinerary.length > 1 ? it.day === activeDay : true))
                .map((dayPlan) => (
                  <div key={dayPlan.day} className="bg-white dark:bg-slate-900 p-6 sm:p-7 rounded-[28px] border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
                    <div className="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
                      <span className="px-3 py-1 rounded-full bg-slate-950 dark:bg-white text-white dark:text-slate-950 text-xs font-bold">
                        Day {dayPlan.day}
                      </span>
                      <h3 className="text-base font-bold text-slate-900 dark:text-white">
                        {dayPlan.title}
                      </h3>
                    </div>

                    <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200 dark:before:bg-slate-700">
                      {dayPlan.events.map((evt, idx) => (
                        <div key={idx} className="relative">
                          <div className="absolute -left-6 top-1 w-5 h-5 rounded-full bg-white dark:bg-slate-800 border-2 border-blue-600 dark:border-blue-400 flex items-center justify-center">
                            {getEventIcon(evt.icon)}
                          </div>

                          <div className="space-y-1">
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-bold text-xs">
                                {evt.time}
                              </span>
                              <span className="text-xs font-semibold text-blue-600 dark:text-blue-400">
                                {evt.locationName}
                              </span>
                              {evt.mealIncluded !== undefined && (
                                <span className={`text-[10px] px-2.5 py-0.5 rounded-full font-bold ${
                                  evt.mealIncluded ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                                }`}>
                                  {evt.mealIncluded ? 'Breakfast Included' : 'Self-paid Halt'}
                                </span>
                              )}
                            </div>

                            <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                              {evt.title}
                            </h4>

                            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                              {evt.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
            </div>

            {/* Hotel Mayura Stay Section */}
            {trip.hotel && (
              <div className="bg-white dark:bg-slate-900 p-6 sm:p-7 rounded-[28px] border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
                <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider block">
                  Accommodation
                </span>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-center">
                  <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                    <img
                      src={trip.hotel.image}
                      alt={trip.hotel.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="md:col-span-2 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                        {trip.hotel.name}
                      </h3>
                      <div className="flex items-center gap-1 text-xs font-bold text-amber-500">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <span>{trip.hotel.rating}</span>
                      </div>
                    </div>

                    <p className="text-xs text-blue-600 dark:text-blue-400 font-semibold">
                      {trip.hotel.property} · {trip.hotel.location}
                    </p>

                    <p className="text-xs text-slate-600 dark:text-slate-400">
                      Room Allocation: <strong className="text-slate-900 dark:text-white">{trip.hotel.roomType}</strong> (Twin sharing basis).
                    </p>

                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {trip.hotel.amenities.map((am, i) => (
                        <span key={i} className="text-[11px] px-2.5 py-0.5 rounded-full bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 font-medium">
                          ✓ {am}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Inclusions & Exclusions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="bg-white dark:bg-slate-900 p-6 rounded-[24px] border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 flex items-center justify-center text-xs font-bold">✓</span>
                  Inclusions
                </h3>
                <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
                  {trip.inclusions.map((inc, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{inc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white dark:bg-slate-900 p-6 rounded-[24px] border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
                <h3 className="text-sm font-bold text-slate-500 dark:text-slate-400 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 text-xs font-bold">×</span>
                  Exclusions
                </h3>
                <ul className="space-y-2 text-xs text-slate-500 dark:text-slate-400">
                  {trip.exclusions.map((exc, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <XIcon className="w-3.5 h-3.5 text-red-500 shrink-0 mt-0.5" />
                      <span>{exc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Know Before You Go Accordion */}
            <div className="bg-white dark:bg-slate-900 p-6 sm:p-7 rounded-[28px] border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                Know Before You Go
              </h2>

              <div className="space-y-2">
                <div className="border border-slate-200 dark:border-slate-700 rounded-2xl overflow-hidden">
                  <button
                    onClick={() => toggleAccordion('cancellation')}
                    className="w-full p-4 text-left font-bold text-xs sm:text-sm text-slate-900 dark:text-white flex items-center justify-between bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors cursor-pointer"
                  >
                    <span>Cancellation & Refund Policy</span>
                    {openAccordion === 'cancellation' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                  {openAccordion === 'cancellation' && (
                    <div className="p-4 text-xs text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700 leading-relaxed">
                      {trip.knowBeforeYouGo.cancellation}
                    </div>
                  )}
                </div>

                <div className="border border-slate-200 dark:border-slate-700 rounded-2xl overflow-hidden">
                  <button
                    onClick={() => toggleAccordion('idProof')}
                    className="w-full p-4 text-left font-bold text-xs sm:text-sm text-slate-900 dark:text-white flex items-center justify-between bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors cursor-pointer"
                  >
                    <span>ID Verification Requirements</span>
                    {openAccordion === 'idProof' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                  {openAccordion === 'idProof' && (
                    <div className="p-4 text-xs text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700 leading-relaxed">
                      {trip.knowBeforeYouGo.idProof}
                    </div>
                  )}
                </div>
              </div>
            </div>

          </div>

          {/* Sticky Purchase Rail */}
          <div className="lg:col-span-4 sticky top-24 space-y-4">
            <div className="bg-white dark:bg-slate-900 p-6 sm:p-7 rounded-[28px] border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
              
              <div className="pb-4 border-b border-slate-100 dark:border-slate-800">
                <span className="text-[11px] text-slate-500 dark:text-slate-400 block font-semibold uppercase tracking-wider">All-Inclusive Tariff</span>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
                    ₹{trip.pricePerPerson.toLocaleString('en-IN')}
                  </span>
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">/ person</span>
                </div>
                <span className="text-xs text-emerald-600 dark:text-emerald-400 font-bold mt-1 block">
                  ✓ Transport + Mayura Stay + Guided Tour
                </span>
              </div>

              {/* Date Selection */}
              <div className="space-y-2">
                <label className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                  Select Departure Date
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {trip.departureSchedule.availableDates.map((dateStr) => {
                    const d = new Date(dateStr);
                    const formatted = d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', weekday: 'short' });
                    const isSelected = selectedDate === dateStr;
                    return (
                      <button
                        key={dateStr}
                        onClick={() => setSelectedDate(dateStr)}
                        className={`p-2.5 rounded-xl text-left border text-xs transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-slate-950 dark:bg-white text-white dark:text-slate-950 border-slate-950 dark:border-white shadow-sm'
                            : 'bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700'
                        }`}
                      >
                        <span className="font-bold block">{formatted}</span>
                        <span className={`text-[10px] font-medium ${isSelected ? 'text-white/80 dark:text-slate-700' : 'text-emerald-600 dark:text-emerald-400'}`}>
                          ● Available
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Time */}
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs space-y-0.5">
                <span className="text-slate-500 dark:text-slate-400 text-[11px] block">Departure Schedule</span>
                <div className="flex items-center gap-1.5 font-bold text-slate-900 dark:text-white">
                  <Clock className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                  <span>{trip.departureSchedule.time} ({trip.departureSchedule.frequency})</span>
                </div>
              </div>

              {/* Buy CTA */}
              <a
                href={`/book/${trip.slug}?date=${selectedDate}`}
                className="w-full py-3.5 px-6 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 text-center"
              >
                <span>Book This Trip</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <div className="text-[11px] text-center text-slate-500 dark:text-slate-400 space-y-0.5">
                <p>Instant Ticket Issuance · 100% Refund Window</p>
              </div>

            </div>

            {/* Helpline Tile */}
            <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 flex items-center gap-3">
              <PhoneCall className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
              <div className="text-xs">
                <span className="font-bold text-slate-900 dark:text-white block">Need Help?</span>
                <span className="text-slate-500 dark:text-slate-400">24x7 Helpline: 1800 425 3333</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
