import React, { useState, useEffect } from 'react';
import {
  MapPin, Clock, Star, ShieldCheck, Check, X as XIcon, Building, Bus,
  ChevronDown, ChevronUp, ArrowRight,
  Coffee, Utensils, Mountain, Camera, Landmark, PhoneCall
} from 'lucide-react';
import { getStoredLanguage } from '../../lib/bookingStore';
import { TRANSLATIONS } from '../../data/translations';
import type { TripPackage, Language } from '../../types/travel';

interface Props {
  trip: TripPackage;
}

export const TripDetailPage: React.FC<Props> = ({ trip }) => {
  const [lang, setLang] = useState<Language>('en');
  const [selectedDate, setSelectedDate] = useState<string>(trip.departureSchedule.availableDates[0] || '2026-08-29');
  const [activeDay, setActiveDay] = useState<number>(1);
  const [openAccordion, setOpenAccordion] = useState<string | null>('cancellation');

  useEffect(() => {
    setLang(getStoredLanguage());
    const handler = (e: any) => setLang(e.detail);
    window.addEventListener('kstdc_lang_changed', handler);
    return () => window.removeEventListener('kstdc_lang_changed', handler);
  }, []);

  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  const toggleAccordion = (key: string) => {
    setOpenAccordion(openAccordion === key ? null : key);
  };

  const getEventIcon = (iconName: string) => {
    switch (iconName) {
      case 'bus': return <Bus className="w-3.5 h-3.5 text-primary-cobalt" />;
      case 'hotel': return <Building className="w-3.5 h-3.5 text-primary-cobalt" />;
      case 'camera': return <Camera className="w-3.5 h-3.5 text-amber-600" />;
      case 'coffee': return <Coffee className="w-3.5 h-3.5 text-amber-700" />;
      case 'mountain': return <Mountain className="w-3.5 h-3.5 text-primary-cobalt" />;
      case 'temple': return <Landmark className="w-3.5 h-3.5 text-primary-cobalt" />;
      case 'utensils': return <Utensils className="w-3.5 h-3.5 text-amber-600" />;
      default: return <MapPin className="w-3.5 h-3.5 text-primary-cobalt" />;
    }
  };

  return (
    <div className="py-6 sm:py-10 bg-canvas min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Breadcrumb (DESIGN-meta PDP breadcrumb style) */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-steel">
          <div className="flex items-center gap-2 font-medium">
            <a href="/" className="hover:text-ink">Home</a>
            <span>›</span>
            <a href="/trips" className="hover:text-ink">Tours</a>
            <span>›</span>
            <span className="text-ink-deep font-bold">{trip.title}</span>
          </div>
          <div className="flex items-center gap-1.5 text-primary-cobalt font-bold">
            <ShieldCheck className="w-4 h-4" />
            <span>Official KSTDC Conducted Tour</span>
          </div>
        </div>

        {/* Header & Gallery Section */}
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs font-bold text-primary-cobalt uppercase tracking-wider">
                <MapPin className="w-3.5 h-3.5" />
                <span>{trip.origin} → {trip.destination}</span>
                <span>•</span>
                <Clock className="w-3.5 h-3.5" />
                <span>{trip.durationDays} Days / {trip.durationNights} Night</span>
              </div>
              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-ink-deep">
                {trip.title}
              </h1>
              <p className="text-xs sm:text-sm text-steel max-w-3xl leading-relaxed">
                {trip.tagline}
              </p>
            </div>

            <div className="flex items-center gap-3 bg-surface-soft p-3 rounded-2xl border border-hairline-soft self-start md:self-end">
              <div className="flex items-center gap-1 text-amber-500 font-bold text-sm">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span>{trip.rating}</span>
              </div>
              <div className="text-xs text-steel border-l border-hairline-soft pl-3">
                <span className="font-bold text-ink-deep block">{trip.reviewsCount} Reviews</span>
                <span className="text-[11px]">Verified Travellers</span>
              </div>
            </div>
          </div>

          {/* Photo Gallery Grid (32px rounding) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 rounded-[32px] overflow-hidden aspect-[16/9] md:aspect-[21/9] bg-surface-soft border border-hairline-soft">
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

        {/* 2-Column Split: Content (58%) + Sticky Right Purchase Rail (42%) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column Content */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Pacing Breakdown Card */}
            <div className="bg-canvas p-6 sm:p-7 rounded-[28px] border border-hairline-soft shadow-sm space-y-4">
              <span className="text-xs font-bold text-primary-cobalt uppercase tracking-wider block">
                Trip Characteristics
              </span>
              
              <h2 className="text-xl font-bold text-ink-deep">
                {t.whyThisTripTitle}
              </h2>
              
              <p className="text-xs sm:text-sm text-steel leading-relaxed">
                {trip.explainWhy.suitability}
              </p>

              {/* Visual Balance Bar */}
              <div className="pt-2 space-y-2">
                <div className="flex h-3 rounded-full overflow-hidden text-xs bg-surface-soft">
                  <div style={{ width: '30%' }} className="bg-primary-cobalt" title="Travel Time" />
                  <div style={{ width: '45%' }} className="bg-charcoal" title="Sightseeing Time" />
                  <div style={{ width: '25%' }} className="bg-emerald-600" title="Leisure & Rest" />
                </div>

                <div className="grid grid-cols-3 gap-2 text-xs pt-1">
                  <div className="flex items-center gap-1.5 text-primary-cobalt font-bold">
                    <span className="w-2.5 h-2.5 rounded-full bg-primary-cobalt shrink-0" />
                    <span>{trip.explainWhy.travelTimeHours}h Travel</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-charcoal font-bold">
                    <span className="w-2.5 h-2.5 rounded-full bg-charcoal shrink-0" />
                    <span>{trip.explainWhy.sightseeingTimeHours}h Sightseeing</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-emerald-700 font-bold">
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
                  <h2 className="text-2xl font-bold text-ink-deep">
                    {t.yourJourney}
                  </h2>
                  <p className="text-xs text-steel">
                    Hour-by-hour itinerary with scheduled stops, meals, and viewpoints.
                  </p>
                </div>

                {trip.itinerary.length > 1 && (
                  <div className="flex bg-surface-soft p-1 rounded-full border border-hairline-soft">
                    {trip.itinerary.map((it) => (
                      <button
                        key={it.day}
                        onClick={() => setActiveDay(it.day)}
                        className={`px-4 py-1 rounded-full text-xs font-bold transition-all ${
                          activeDay === it.day
                            ? 'bg-black text-white shadow-sm'
                            : 'text-charcoal hover:text-ink'
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
                  <div key={dayPlan.day} className="bg-canvas p-6 sm:p-7 rounded-[28px] border border-hairline-soft shadow-sm space-y-5">
                    <div className="flex items-center gap-2 pb-3 border-b border-hairline-soft">
                      <span className="px-3 py-1 rounded-full bg-black text-white text-xs font-bold">
                        Day {dayPlan.day}
                      </span>
                      <h3 className="text-base font-bold text-ink-deep">
                        {dayPlan.title}
                      </h3>
                    </div>

                    <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-hairline-soft">
                      {dayPlan.events.map((evt, idx) => (
                        <div key={idx} className="relative">
                          <div className="absolute -left-6 top-1 w-5 h-5 rounded-full bg-white border-2 border-primary-cobalt flex items-center justify-center">
                            {getEventIcon(evt.icon)}
                          </div>

                          <div className="space-y-1">
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="px-2.5 py-0.5 rounded-full bg-surface-soft text-ink-deep font-bold text-xs">
                                {evt.time}
                              </span>
                              <span className="text-xs font-semibold text-primary-cobalt">
                                {evt.locationName}
                              </span>
                              {evt.mealIncluded !== undefined && (
                                <span className={`text-[10px] px-2.5 py-0.5 rounded-full font-bold ${
                                  evt.mealIncluded ? 'bg-emerald-100 text-emerald-800' : 'bg-surface-soft text-steel'
                                }`}>
                                  {evt.mealIncluded ? 'Breakfast Included' : 'Self-paid Halt'}
                                </span>
                              )}
                            </div>

                            <h4 className="text-sm font-bold text-ink-deep">
                              {evt.title}
                            </h4>

                            <p className="text-xs text-steel leading-relaxed">
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
              <div className="bg-canvas p-6 sm:p-7 rounded-[28px] border border-hairline-soft shadow-sm space-y-4">
                <span className="text-xs font-bold text-primary-cobalt uppercase tracking-wider block">
                  Accommodation
                </span>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-center">
                  <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-surface-soft border border-hairline-soft">
                    <img
                      src={trip.hotel.image}
                      alt={trip.hotel.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="md:col-span-2 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-bold text-ink-deep">
                        {trip.hotel.name}
                      </h3>
                      <div className="flex items-center gap-1 text-xs font-bold text-amber-500">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <span>{trip.hotel.rating}</span>
                      </div>
                    </div>

                    <p className="text-xs text-primary-cobalt font-semibold">
                      {trip.hotel.property} · {trip.hotel.location}
                    </p>

                    <p className="text-xs text-steel">
                      Room Allocation: <strong className="text-ink-deep">{trip.hotel.roomType}</strong> (Twin sharing basis).
                    </p>

                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {trip.hotel.amenities.map((am, i) => (
                        <span key={i} className="text-[11px] px-2.5 py-0.5 rounded-full bg-surface-soft text-charcoal border border-hairline-soft font-medium">
                          ✓ {am}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Side-by-Side Inclusions & Exclusions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="bg-canvas p-6 rounded-[24px] border border-hairline-soft shadow-sm space-y-3">
                <h3 className="text-sm font-bold text-ink-deep flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-800 text-xs font-bold">✓</span>
                  {t.inclusionsTitle}
                </h3>
                <ul className="space-y-2 text-xs text-charcoal">
                  {trip.inclusions.map((inc, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{inc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-canvas p-6 rounded-[24px] border border-hairline-soft shadow-sm space-y-3">
                <h3 className="text-sm font-bold text-steel flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-surface-soft flex items-center justify-center text-steel text-xs font-bold">×</span>
                  {t.exclusionsTitle}
                </h3>
                <ul className="space-y-2 text-xs text-steel">
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
            <div className="bg-canvas p-6 sm:p-7 rounded-[28px] border border-hairline-soft shadow-sm space-y-4">
              <h2 className="text-xl font-bold text-ink-deep">
                {t.knowBeforeTitle}
              </h2>

              <div className="space-y-2">
                <div className="border border-hairline-soft rounded-2xl overflow-hidden">
                  <button
                    onClick={() => toggleAccordion('cancellation')}
                    className="w-full p-4 text-left font-bold text-xs sm:text-sm text-ink-deep flex items-center justify-between bg-surface-soft hover:bg-neutral-200 transition-colors"
                  >
                    <span>Cancellation & Refund Policy</span>
                    {openAccordion === 'cancellation' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                  {openAccordion === 'cancellation' && (
                    <div className="p-4 text-xs text-charcoal bg-canvas border-t border-hairline-soft leading-relaxed">
                      {trip.knowBeforeYouGo.cancellation}
                    </div>
                  )}
                </div>

                <div className="border border-hairline-soft rounded-2xl overflow-hidden">
                  <button
                    onClick={() => toggleAccordion('idProof')}
                    className="w-full p-4 text-left font-bold text-xs sm:text-sm text-ink-deep flex items-center justify-between bg-surface-soft hover:bg-neutral-200 transition-colors"
                  >
                    <span>ID Verification Requirements</span>
                    {openAccordion === 'idProof' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                  {openAccordion === 'idProof' && (
                    <div className="p-4 text-xs text-charcoal bg-canvas border-t border-hairline-soft leading-relaxed">
                      {trip.knowBeforeYouGo.idProof}
                    </div>
                  )}
                </div>
              </div>
            </div>

          </div>

          {/* Sticky Purchase Rail (DESIGN-meta card-checkout-summary with cobalt pill CTA) */}
          <div className="lg:col-span-4 sticky top-22 space-y-4">
            <div className="bg-canvas p-6 sm:p-7 rounded-[28px] border border-hairline-soft shadow-meta-sticky space-y-5">
              
              <div className="pb-4 border-b border-hairline-soft">
                <span className="text-[11px] text-steel block font-semibold uppercase tracking-wider">All-Inclusive Tariff</span>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="text-3xl font-bold text-ink-deep tracking-tight">
                    ₹{trip.pricePerPerson.toLocaleString('en-IN')}
                  </span>
                  <span className="text-xs text-steel font-medium">/ person</span>
                </div>
                <span className="text-xs text-emerald-700 font-bold mt-1 block">
                  ✓ Transport + Mayura Stay + Guided Tour
                </span>
              </div>

              {/* Date Selection */}
              <div className="space-y-2">
                <label className="text-[11px] font-bold text-steel uppercase tracking-wider block">
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
                        className={`p-2.5 rounded-xl text-left border text-xs transition-all ${
                          isSelected
                            ? 'bg-black text-white border-black shadow-sm'
                            : 'bg-surface-soft text-ink border-hairline-soft hover:bg-neutral-200'
                        }`}
                      >
                        <span className="font-bold block">{formatted}</span>
                        <span className={`text-[10px] font-medium ${isSelected ? 'text-white/80' : 'text-emerald-700'}`}>
                          ● Available
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Time */}
              <div className="p-3 rounded-xl bg-surface-soft border border-hairline-soft text-xs space-y-0.5">
                <span className="text-steel text-[11px] block">Departure Schedule</span>
                <div className="flex items-center gap-1.5 font-bold text-ink-deep">
                  <Clock className="w-3.5 h-3.5 text-primary-cobalt" />
                  <span>{trip.departureSchedule.time} ({trip.departureSchedule.frequency})</span>
                </div>
              </div>

              {/* Buy CTA (DESIGN-meta button-buy-cta) */}
              <a
                href={`/book/${trip.slug}?date=${selectedDate}`}
                className="w-full py-3.5 px-6 rounded-full bg-primary-cobalt hover:bg-primary-deep text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 text-center"
              >
                <span>Book This Trip</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <div className="text-[11px] text-center text-steel space-y-0.5">
                <p>Instant Ticket Issuance · 100% Refund Window</p>
              </div>

            </div>

            {/* Helpline Tile */}
            <div className="bg-surface-soft p-4 rounded-2xl border border-hairline-soft flex items-center gap-3">
              <PhoneCall className="w-4 h-4 text-primary-cobalt shrink-0" />
              <div className="text-xs">
                <span className="font-bold text-ink-deep block">Need Help?</span>
                <span className="text-steel">24x7 Helpline: 1800-425-3333</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
