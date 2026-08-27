import React, { useState, useEffect } from 'react';
import { Bus, Building2, Car, Compass, MapPin, Calendar, Users, ArrowRight, Clock, ShieldCheck } from 'lucide-react';
import { getStoredLanguage } from '../../lib/bookingStore';
import { TRANSLATIONS } from '../../data/translations';
import { AiTripPlannerModal } from './AiTripPlannerModal';
import type { Language, TripCategory } from '../../types/travel';

export const HeroBanner: React.FC = () => {
  const [lang, setLang] = useState<Language>('en');
  const [activeTab, setActiveTab] = useState<'tours' | 'hotels' | 'cabs' | 'activities'>('tours');
  
  // Tours fields
  const [origin, setOrigin] = useState('Bengaluru');
  const [duration, setDuration] = useState('2');
  const [category, setCategory] = useState<TripCategory>('nature');
  
  // Hotel fields
  const [hotelDestination, setHotelDestination] = useState('Coorg (Madikeri)');
  const [hotelGuests, setHotelGuests] = useState('2');
  
  // Cab fields
  const [cabTripType, setCabTripType] = useState<'airport' | 'outstation'>('airport');
  const [cabPickup, setCabPickup] = useState('Kempegowda International Airport (BLR)');
  
  // Activity fields
  const [activityCity, setActivityCity] = useState('Mysuru');

  const [plannerOpen, setPlannerOpen] = useState(false);

  useEffect(() => {
    setLang(getStoredLanguage());
    const handler = (e: any) => setLang(e.detail);
    window.addEventListener('kstdc_lang_changed', handler);
    return () => window.removeEventListener('kstdc_lang_changed', handler);
  }, []);

  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (activeTab === 'tours') {
      const q = new URLSearchParams({ origin, duration, category }).toString();
      window.location.href = `/trips?${q}`;
    } else if (activeTab === 'hotels') {
      window.location.href = `/stays`;
    } else if (activeTab === 'cabs') {
      window.location.href = `/cabs`;
    } else {
      window.location.href = `/activities`;
    }
  };

  return (
    <section className="relative pt-6 pb-12 sm:pb-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Full-Bleed Showcase Frame */}
        <div className="relative rounded-[32px] overflow-hidden min-h-[520px] sm:min-h-[580px] flex flex-col justify-between p-6 sm:p-12 lg:p-14 text-white border border-slate-200 shadow-sm">
          
          {/* Background Image */}
          <img
            src="https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1600&q=80"
            alt="Scenic Karnataka Western Ghats"
            className="absolute inset-0 w-full h-full object-cover object-center z-0"
          />
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-slate-950/20 z-0" />

          {/* Top Label & Verification Badge */}
          <div className="relative z-10 flex flex-wrap items-center justify-between gap-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/15 backdrop-blur-md text-white text-xs font-semibold">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Government of Karnataka Undertaking</span>
            </div>

            <button
              onClick={() => setPlannerOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white hover:bg-slate-100 text-slate-900 font-bold text-xs shadow-sm transition-all"
            >
              <span>{t.navPlanMyTrip}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Editorial Headline & Statement */}
          <div className="relative z-10 max-w-2xl my-auto py-6 space-y-3">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.12]">
              {t.heroHeadline}
            </h1>
            <p className="text-sm sm:text-base text-white/90 leading-relaxed max-w-xl font-normal">
              Official conducted bus tours, Hotel Mayura stays, airport taxi transfers, and heritage city experiences.
            </p>
          </div>

          {/* Multi-Service Booking Selector Bar (Matching kstdc.co official services) */}
          <div className="relative z-10 mt-4">
            
            {/* Service Tabs */}
            <div className="flex flex-wrap gap-1 bg-black/40 backdrop-blur-md p-1.5 rounded-t-2xl border-t border-x border-white/20 w-fit text-xs font-bold">
              <button
                type="button"
                onClick={() => setActiveTab('tours')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
                  activeTab === 'tours'
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                }`}
              >
                <Bus className="w-3.5 h-3.5" />
                <span>Tour Packages</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('hotels')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
                  activeTab === 'hotels'
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                }`}
              >
                <Building2 className="w-3.5 h-3.5" />
                <span>Mayura Hotels</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('cabs')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
                  activeTab === 'cabs'
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                }`}
              >
                <Car className="w-3.5 h-3.5" />
                <span>Airport Taxi & Cabs</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('activities')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
                  activeTab === 'activities'
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                }`}
              >
                <Compass className="w-3.5 h-3.5" />
                <span>Ambaari & Activities</span>
              </button>
            </div>

            {/* Input Form Panel */}
            <form
              onSubmit={handleSearchSubmit}
              className="bg-white p-4 sm:p-5 rounded-b-2xl rounded-tr-2xl sm:rounded-tr-2xl border border-white/40 shadow-lg text-slate-900"
            >
              {/* TAB 1: TOURS */}
              {activeTab === 'tours' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 items-center">
                  <div className="lg:col-span-3 space-y-1">
                    <label className="text-[11px] font-bold text-slate-500 flex items-center gap-1 uppercase tracking-wider">
                      <MapPin className="w-3.5 h-3.5 text-slate-900" />
                      Departure Origin
                    </label>
                    <select
                      value={origin}
                      onChange={(e) => setOrigin(e.target.value)}
                      className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-semibold text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 cursor-pointer"
                    >
                      <option value="Bengaluru">Bengaluru (Majestic / Yeshwanthpur)</option>
                      <option value="Mysuru">Mysuru (KSTDC Office)</option>
                      <option value="Mangaluru">Mangaluru</option>
                      <option value="Hubballi">Hubballi</option>
                    </select>
                  </div>

                  <div className="lg:col-span-3 space-y-1">
                    <label className="text-[11px] font-bold text-slate-500 flex items-center gap-1 uppercase tracking-wider">
                      <Calendar className="w-3.5 h-3.5 text-slate-900" />
                      Duration
                    </label>
                    <div className="grid grid-cols-3 gap-1 bg-slate-50 p-1 rounded-xl border border-slate-200">
                      <button
                        type="button"
                        onClick={() => setDuration('1')}
                        className={`py-1.5 rounded-lg text-xs font-bold transition-all ${
                          duration === '1' ? 'bg-slate-900 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        1 Day
                      </button>
                      <button
                        type="button"
                        onClick={() => setDuration('2')}
                        className={`py-1.5 rounded-lg text-xs font-bold transition-all ${
                          duration === '2' ? 'bg-slate-900 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        2 Days
                      </button>
                      <button
                        type="button"
                        onClick={() => setDuration('3')}
                        className={`py-1.5 rounded-lg text-xs font-bold transition-all ${
                          duration === '3' ? 'bg-slate-900 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        3+ Days
                      </button>
                    </div>
                  </div>

                  <div className="lg:col-span-3 space-y-1">
                    <label className="text-[11px] font-bold text-slate-500 flex items-center gap-1 uppercase tracking-wider">
                      <Compass className="w-3.5 h-3.5 text-slate-900" />
                      Tour Category
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value as TripCategory)}
                      className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-semibold text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 cursor-pointer"
                    >
                      <option value="nature">Western Ghats Nature & Hills</option>
                      <option value="heritage">UNESCO & Royal Heritage</option>
                      <option value="beach">Coastal Karnataka & Beaches</option>
                      <option value="spiritual">Spiritual Circuits</option>
                    </select>
                  </div>

                  <div className="lg:col-span-3 pt-1 sm:pt-4 lg:pt-4">
                    <button
                      type="submit"
                      className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-black text-white font-bold text-xs sm:text-sm shadow-sm transition-all flex items-center justify-center gap-2"
                    >
                      <span>Search Tour Packages</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* TAB 2: HOTELS */}
              {activeTab === 'hotels' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 items-center">
                  <div className="lg:col-span-5 space-y-1">
                    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                      Choose Destination / Mayura Property
                    </label>
                    <select
                      value={hotelDestination}
                      onChange={(e) => setHotelDestination(e.target.value)}
                      className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-semibold text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 cursor-pointer"
                    >
                      <option value="Coorg (Madikeri)">Hotel Mayura Valley View — Madikeri (Coorg)</option>
                      <option value="Hampi">Hotel Mayura Bhuvaneshwari — Hampi (UNESCO)</option>
                      <option value="Mysuru">Hotel Mayura Hoysala — Mysuru</option>
                      <option value="Gokarna">Hotel Mayura Samudra — Gokarna Beach</option>
                      <option value="Jog Falls">Hotel Mayura Gerusoppa — Jog Falls</option>
                    </select>
                  </div>

                  <div className="lg:col-span-4 space-y-1">
                    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                      Guests & Rooms
                    </label>
                    <select
                      value={hotelGuests}
                      onChange={(e) => setHotelGuests(e.target.value)}
                      className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-semibold text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 cursor-pointer"
                    >
                      <option value="1">1 Adult · 1 Room</option>
                      <option value="2">2 Adults · 1 Room (Deluxe Twin)</option>
                      <option value="3">3 Adults · 1 Room (Extra Bed)</option>
                      <option value="4">Family (2 Adults + 2 Kids)</option>
                    </select>
                  </div>

                  <div className="lg:col-span-3 pt-1 sm:pt-4 lg:pt-4">
                    <button
                      type="submit"
                      className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-black text-white font-bold text-xs sm:text-sm shadow-sm transition-all flex items-center justify-center gap-2"
                    >
                      <span>Check Mayura Stays</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* TAB 3: AIRPORT TAXI & CABS */}
              {activeTab === 'cabs' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 items-center">
                  <div className="lg:col-span-3 space-y-1">
                    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                      Service Type
                    </label>
                    <div className="grid grid-cols-2 gap-1 bg-slate-50 p-1 rounded-xl border border-slate-200">
                      <button
                        type="button"
                        onClick={() => setCabTripType('airport')}
                        className={`py-1.5 rounded-lg text-xs font-bold transition-all ${
                          cabTripType === 'airport' ? 'bg-slate-900 text-white shadow-xs' : 'text-slate-600'
                        }`}
                      >
                        Airport Taxi
                      </button>
                      <button
                        type="button"
                        onClick={() => setCabTripType('outstation')}
                        className={`py-1.5 rounded-lg text-xs font-bold transition-all ${
                          cabTripType === 'outstation' ? 'bg-slate-900 text-white shadow-xs' : 'text-slate-600'
                        }`}
                      >
                        Outstation
                      </button>
                    </div>
                  </div>

                  <div className="lg:col-span-6 space-y-1">
                    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                      Pickup / Drop Point
                    </label>
                    <input
                      type="text"
                      value={cabPickup}
                      onChange={(e) => setCabPickup(e.target.value)}
                      className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-semibold text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-slate-900"
                    />
                  </div>

                  <div className="lg:col-span-3 pt-1 sm:pt-4 lg:pt-4">
                    <button
                      type="submit"
                      className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-black text-white font-bold text-xs sm:text-sm shadow-sm transition-all flex items-center justify-center gap-2"
                    >
                      <span>Book KSTDC Cab</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* TAB 4: ACTIVITIES */}
              {activeTab === 'activities' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 items-center">
                  <div className="lg:col-span-5 space-y-1">
                    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                      Select City Experience
                    </label>
                    <select
                      value={activityCity}
                      onChange={(e) => setActivityCity(e.target.value)}
                      className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-semibold text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 cursor-pointer"
                    >
                      <option value="Mysuru">Ambaari Open-Top Double Decker Tour (Mysuru)</option>
                      <option value="Bengaluru">Guided Heritage Tour of Vidhana Soudha (Bengaluru)</option>
                      <option value="Jog Falls">Sharavathi Backwaters & Water Sports (Jog Falls)</option>
                    </select>
                  </div>

                  <div className="lg:col-span-4 space-y-1">
                    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                      Slot Timing
                    </label>
                    <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-slate-900" />
                      <span>Evening 06:30 PM, 08:00 PM & 09:30 PM</span>
                    </div>
                  </div>

                  <div className="lg:col-span-3 pt-1 sm:pt-4 lg:pt-4">
                    <button
                      type="submit"
                      className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-black text-white font-bold text-xs sm:text-sm shadow-sm transition-all flex items-center justify-center gap-2"
                    >
                      <span>Explore Activities</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

            </form>
          </div>

        </div>

      </div>

      {plannerOpen && (
        <AiTripPlannerModal isOpen={plannerOpen} onClose={() => setPlannerOpen(false)} />
      )}
    </section>
  );
};
