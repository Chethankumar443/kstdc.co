import React, { useState, useEffect, useRef } from 'react';
import {
  Bus, Building2, Car, Compass, MapPin, Calendar, ArrowRight,
  ShieldCheck, Search, ChevronLeft, ChevronRight, Check, X
} from 'lucide-react';
import { getStoredLanguage } from '../../lib/bookingStore';
import { TRANSLATIONS } from '../../data/translations';
import { AiTripPlannerModal } from './AiTripPlannerModal';
import { CustomSelect } from '../common/CustomSelect';
import type { Language } from '../../types/travel';

const HERO_SLIDES = [
  {
    image: '/hero/hero-1.jpeg',
    title: 'Experience the Best of Karnataka!',
    subtitle: 'UNESCO World Heritage at Hampi, royal palaces, and ancient temple architecture.',
    badge: 'Hampi · World Heritage Circuit',
  },
  {
    image: '/hero/hero-2.jpeg',
    title: 'Stay at the Heart of Every Destination.',
    subtitle: 'Hotel Mayura government-run heritage resorts with transparent official rates.',
    badge: 'Hotel Mayura Hospitality Network',
  },
  {
    image: '/hero/hero-3.jpeg',
    title: 'Curated Journeys, Memorable Experiences!',
    subtitle: 'Misty Western Ghats, thunderous waterfalls, and scenic coffee estate circuits.',
    badge: 'Shivanasamudra & Western Ghats',
  },
  {
    image: '/hero/hero-4.jpeg',
    title: 'Turn Every Journey Into an Experience.',
    subtitle: 'Paragliding at Nandi Hills, coastal water sports, and open-top Ambaari city tours.',
    badge: 'Nandi Hills & Adventure Tourism',
  },
  {
    image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1600&q=80',
    title: 'Your Karnataka Story Starts Here.',
    subtitle: 'Official conducted bus tours, Hotel Mayura stays, and 24x7 prepaid airport taxis.',
    badge: 'Government of Karnataka Undertaking',
  },
];

const ORIGIN_SUGGESTIONS = [
  'Bengaluru (Majestic / Yeshwanthpur)',
  'Mysuru (KSTDC Office, JLB Road)',
  'Mangaluru Central',
  'Hubballi Junction',
  'Belagavi City Centre',
  'Shivamogga (Gateway to Jog)',
];

const DESTINATION_SUGGESTIONS = [
  { name: 'Coorg (Madikeri)', tag: 'Misty Hills & Coffee Estates', category: 'Hills' },
  { name: 'Hampi (UNESCO Heritage)', tag: 'Vijayanagara Empire Ruins', category: 'Heritage' },
  { name: 'Mysuru (Royal Heritage)', tag: 'Palace Illumination & Silk', category: 'Heritage' },
  { name: 'Gokarna & Murudeshwar', tag: 'Coastal Beaches & Temples', category: 'Coastal' },
  { name: 'Chikmagalur & Mullayanagiri', tag: 'Highest Peak & Waterfalls', category: 'Adventure' },
  { name: 'Nandi Hills & Vineyards', tag: 'Sunrise Fortress Tour', category: 'Weekend' },
  { name: 'Jog Falls & Western Ghats', tag: 'India’s Iconic Waterfall', category: 'Nature' },
  { name: 'Bandipur & Kabini Wildlife', tag: 'Tiger Safari Reserve', category: 'Wildlife' },
  { name: 'Belur & Halebeedu', tag: 'Hoysala Architecture', category: 'Architecture' },
  { name: 'Badami, Aihole & Pattadakal', tag: 'Chalukya Rock-Cut Caves', category: 'Caves' },
];

const HOTEL_SUGGESTIONS = [
  { name: 'Hotel Mayura Valley View', place: 'Madikeri, Coorg', type: 'Scenic Retreat' },
  { name: 'Hotel Mayura Bhuvaneshwari', place: 'Kamalapur, Hampi', type: 'Heritage Resort' },
  { name: 'Hotel Mayura Hoysala', place: 'JLB Road, Mysuru', type: 'City Heritage' },
  { name: 'Hotel Mayura Samudra', place: 'Om Beach Road, Gokarna', type: 'Beachside Stay' },
  { name: 'Hotel Mayura Gerusoppa', place: 'Jog Falls, Sagara', type: 'Waterfall View' },
  { name: 'Hotel Mayura Pine Top', place: 'Nandi Hills Peak', type: 'Hilltop Resort' },
  { name: 'Hotel Mayura Biligiri', place: 'BR Hills Wildlife', type: 'Jungle Lodge' },
];

const CAB_PICKUP_SUGGESTIONS = [
  'Kempegowda International Airport (BLR T1/T2)',
  'Indiranagar / MG Road (Central Bengaluru)',
  'Whitefield / ITPL / Marathahalli',
  'Electronic City Phase 1 & 2',
  'Koramangala / HSR Layout',
  'Majestic KSR Railway Station',
  'Yeshwanthpur Railway Station',
];

const CAB_DROP_SUGGESTIONS = [
  'Central Bengaluru (MG Road / Cubbon Park)',
  'Whitefield / ITPL Tech Park',
  'Electronic City Phase 1 & 2',
  'Indiranagar 100 Feet Road',
  'Mysuru City (Outstation Drop)',
  'Nandi Hills Day Trip',
];

const ACTIVITY_SUGGESTIONS = [
  { title: 'Ambaari Open-Top Double Decker Bus', city: 'Mysuru', type: 'Night Illumination' },
  { title: 'Vidhana Soudha Guided Tour', city: 'Bengaluru', type: 'Official State Architecture' },
  { title: 'Hampi Royal Enclosure Heritage Walk', city: 'Hampi', type: 'UNESCO Certified Guide' },
  { title: 'Bengaluru Hop-On Hop-Off City Tour', city: 'Bengaluru', type: 'All-Day Sightseeing' },
];

export const HeroBanner: React.FC = () => {
  const [lang, setLang] = useState<Language>('en');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeTab, setActiveTab] = useState<'tours' | 'hotels' | 'cabs' | 'activities'>('tours');
  
  // Tours manual search fields
  const [origin, setOrigin] = useState('Bengaluru (Majestic / Yeshwanthpur)');
  const [originOpen, setOriginOpen] = useState(false);
  const originRef = useRef<HTMLDivElement>(null);

  const [destinationQuery, setDestinationQuery] = useState('');
  const [destOpen, setDestOpen] = useState(false);
  const destRef = useRef<HTMLDivElement>(null);

  const [duration, setDuration] = useState('all');
  
  // Hotel manual search fields
  const [hotelDestination, setHotelDestination] = useState('');
  const [hotelOpen, setHotelOpen] = useState(false);
  const hotelRef = useRef<HTMLDivElement>(null);

  const [hotelGuests, setHotelGuests] = useState('2');
  
  // Cab manual search fields
  const [cabTripType, setCabTripType] = useState<'airport' | 'outstation'>('airport');
  const [cabPickup, setCabPickup] = useState('Kempegowda International Airport (BLR T1/T2)');
  const [pickupOpen, setPickupOpen] = useState(false);
  const pickupRef = useRef<HTMLDivElement>(null);

  const [cabDrop, setCabDrop] = useState('');
  const [dropOpen, setDropOpen] = useState(false);
  const dropRef = useRef<HTMLDivElement>(null);
  
  // Activity manual search fields
  const [activitySearch, setActivitySearch] = useState('');
  const [activityOpen, setActivityOpen] = useState(false);
  const actRef = useRef<HTMLDivElement>(null);

  const [activitySlot, setActivitySlot] = useState('evening');

  const [plannerOpen, setPlannerOpen] = useState(false);

  // Auto-play slider timer
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    setLang(getStoredLanguage());
    const handler = (e: any) => setLang(e.detail);
    window.addEventListener('kstdc_lang_changed', handler);

    const clickOutside = (e: MouseEvent) => {
      if (originRef.current && !originRef.current.contains(e.target as Node)) setOriginOpen(false);
      if (destRef.current && !destRef.current.contains(e.target as Node)) setDestOpen(false);
      if (hotelRef.current && !hotelRef.current.contains(e.target as Node)) setHotelOpen(false);
      if (pickupRef.current && !pickupRef.current.contains(e.target as Node)) setPickupOpen(false);
      if (dropRef.current && !dropRef.current.contains(e.target as Node)) setDropOpen(false);
      if (actRef.current && !actRef.current.contains(e.target as Node)) setActivityOpen(false);
    };

    document.addEventListener('mousedown', clickOutside);

    return () => {
      window.removeEventListener('kstdc_lang_changed', handler);
      document.removeEventListener('mousedown', clickOutside);
    };
  }, []);

  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (activeTab === 'tours') {
      const q = new URLSearchParams();
      if (origin.trim()) q.set('origin', origin);
      if (destinationQuery.trim()) q.set('destination', destinationQuery);
      if (duration !== 'all') q.set('duration', duration);
      window.location.href = `/trips?${q.toString()}`;
    } else if (activeTab === 'hotels') {
      const q = new URLSearchParams();
      if (hotelDestination.trim()) q.set('search', hotelDestination);
      window.location.href = `/stays?${q.toString()}`;
    } else if (activeTab === 'cabs') {
      const q = new URLSearchParams();
      if (cabPickup.trim()) q.set('pickup', cabPickup);
      if (cabDrop.trim()) q.set('drop', cabDrop);
      window.location.href = `/cabs?${q.toString()}`;
    } else {
      const q = new URLSearchParams();
      if (activitySearch.trim()) q.set('search', activitySearch);
      window.location.href = `/activities?${q.toString()}`;
    }
  };

  const guestOptions = [
    { value: '1', label: '1 Adult · 1 Room' },
    { value: '2', label: '2 Adults · 1 Room (Deluxe Twin)' },
    { value: '3', label: '3 Adults · 1 Room (Extra Bed)' },
    { value: '4', label: 'Family (2 Adults + 2 Kids)' },
  ];

  const activitySlotOptions = [
    { value: 'evening', label: 'Evening Palace Illumination (6:30 PM)' },
    { value: 'night', label: 'Night City Skyline Tour (8:00 PM)' },
    { value: 'morning', label: 'Morning Heritage Slot (9:30 AM)' },
  ];

  const activeSlideData = HERO_SLIDES[currentSlide];

  const filteredDestinations = DESTINATION_SUGGESTIONS.filter((d) =>
    destinationQuery ? d.name.toLowerCase().includes(destinationQuery.toLowerCase()) || d.tag.toLowerCase().includes(destinationQuery.toLowerCase()) : true
  );

  const filteredHotels = HOTEL_SUGGESTIONS.filter((h) =>
    hotelDestination ? h.name.toLowerCase().includes(hotelDestination.toLowerCase()) || h.place.toLowerCase().includes(hotelDestination.toLowerCase()) : true
  );

  return (
    <section className="relative pt-3 sm:pt-4 pb-8 sm:pb-14 bg-canvas transition-colors">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        
        {/* Full-Bleed Showcase Frame with Interactive Slider */}
        <div className="relative rounded-[28px] sm:rounded-[32px] min-h-[500px] sm:min-h-[560px] flex flex-col justify-between p-4 sm:p-8 lg:p-12 text-white border border-slate-200/60 dark:border-slate-800 shadow-md transition-all">
          
          {/* Background Images Slider with Smooth Cross-Fade (Isolated clipping to rounded bounds) */}
          <div className="absolute inset-0 rounded-[28px] sm:rounded-[32px] overflow-hidden pointer-events-none z-0">
            {HERO_SLIDES.map((slide, idx) => (
              <div
                key={slide.image}
                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                  idx === currentSlide ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover object-center scale-105 transition-transform duration-10000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/50 to-slate-950/30" />
              </div>
            ))}
          </div>

          {/* Top Label & Minimal Slide Indicator */}
          <div className="relative z-10 flex items-center justify-between gap-3">
            <div className="inline-flex items-center gap-2 px-3 sm:px-3.5 py-1 rounded-full bg-black/40 backdrop-blur-md text-white text-[11px] sm:text-xs font-semibold border border-white/20">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span className="truncate">{activeSlideData.badge}</span>
            </div>

            {/* Sleek Minimalist Slide Dots (No bulky buttons/borders) */}
            <div className="flex items-center gap-1.5 bg-black/30 backdrop-blur-md px-2.5 py-1.5 rounded-full border border-white/15">
              {HERO_SLIDES.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setCurrentSlide(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === currentSlide ? 'w-5 sm:w-6 bg-white shadow-xs' : 'w-1.5 bg-white/40 hover:bg-white/70'
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Editorial Headline & Statement (Animated with Active Slide) */}
          <div className="relative z-10 max-w-2xl my-auto py-4 sm:py-6 space-y-2 sm:space-y-3">
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-[1.15] drop-shadow-sm transition-all">
              {activeSlideData.title}
            </h1>
            <p className="text-xs sm:text-sm lg:text-base text-white/90 leading-relaxed max-w-xl font-normal drop-shadow-xs">
              {activeSlideData.subtitle}
            </p>
          </div>

          {/* Multi-Service Booking Selector Bar with Custom Menus */}
          <div className="relative z-10 mt-2">
            
            {/* Service Tabs (Responsive horizontal scroll on mobile) */}
            <div className="flex gap-1 bg-black/50 backdrop-blur-md p-1 sm:p-1.5 rounded-t-2xl border-t border-x border-white/20 w-full sm:w-fit text-[11px] sm:text-xs font-bold overflow-x-auto no-scrollbar">
              <button
                type="button"
                onClick={() => setActiveTab('tours')}
                className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-xl transition-all shrink-0 ${
                  activeTab === 'tours'
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                }`}
              >
                <Bus className="w-3.5 h-3.5 shrink-0" />
                <span>Tour Packages</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('hotels')}
                className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-xl transition-all shrink-0 ${
                  activeTab === 'hotels'
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                }`}
              >
                <Building2 className="w-3.5 h-3.5 shrink-0" />
                <span>Mayura Hotels</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('cabs')}
                className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-xl transition-all shrink-0 ${
                  activeTab === 'cabs'
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                }`}
              >
                <Car className="w-3.5 h-3.5 shrink-0" />
                <span>Airport Taxi & Cabs</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('activities')}
                className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-xl transition-all shrink-0 ${
                  activeTab === 'activities'
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                }`}
              >
                <Compass className="w-3.5 h-3.5 shrink-0" />
                <span>Ambaari & Activities</span>
              </button>
            </div>

            {/* Input Form Panel with Custom Dropdown Menus */}
            <form
              onSubmit={handleSearchSubmit}
              className="bg-white dark:bg-slate-900 p-3.5 sm:p-5 rounded-b-2xl rounded-tr-2xl sm:rounded-tr-2xl border border-white/40 dark:border-slate-800 shadow-xl text-slate-900 dark:text-slate-100 transition-colors"
            >
              {/* TAB 1: TOURS WITH CUSTOM POPUP SUGGESTIONS */}
              {activeTab === 'tours' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 items-center">
                  
                  {/* Departure Origin */}
                  <div className="lg:col-span-3 space-y-1 relative" ref={originRef}>
                    <label className="text-[11px] font-bold text-slate-500 dark:text-slate-400 flex items-center gap-1 uppercase tracking-wider">
                      <MapPin className="w-3.5 h-3.5 text-slate-900 dark:text-slate-100" />
                      Departure Origin
                    </label>
                    <input
                      type="text"
                      value={origin}
                      onChange={(e) => {
                        setOrigin(e.target.value);
                        setOriginOpen(true);
                      }}
                      onFocus={() => setOriginOpen(true)}
                      placeholder="e.g. Bengaluru, Mysuru..."
                      className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-semibold text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-blue-500"
                    />

                    {originOpen && (
                      <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-[0_25px_60px_rgba(0,0,0,0.28)] p-2 z-[100] animate-fade-in max-h-60 overflow-y-auto">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block px-2.5 py-1">
                          Official Departure Hubs
                        </span>
                        <div className="space-y-1">
                          {ORIGIN_SUGGESTIONS.map((orig) => (
                            <div
                              key={orig}
                              onClick={() => {
                                setOrigin(orig);
                                setOriginOpen(false);
                              }}
                              className={`p-2.5 rounded-xl text-xs font-semibold cursor-pointer transition-colors flex items-center justify-between ${
                                origin === orig ? 'bg-slate-900 dark:bg-blue-600 text-white' : 'text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                              }`}
                            >
                              <span>{orig}</span>
                              {origin === orig && <Check className="w-3.5 h-3.5 text-white" />}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Destination Search with Custom Suggestions */}
                  <div className="lg:col-span-4 space-y-1 relative" ref={destRef}>
                    <label className="text-[11px] font-bold text-slate-500 dark:text-slate-400 flex items-center gap-1 uppercase tracking-wider">
                      <Search className="w-3.5 h-3.5 text-slate-900 dark:text-slate-100" />
                      Destination / Place Search
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={destinationQuery}
                        onChange={(e) => {
                          setDestinationQuery(e.target.value);
                          setDestOpen(true);
                        }}
                        onFocus={() => setDestOpen(true)}
                        placeholder="Enter place (e.g. Coorg, Hampi, Gokarna)..."
                        className="w-full p-2.5 pr-8 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-semibold text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-blue-500"
                      />
                      {destinationQuery && (
                        <button
                          type="button"
                          onClick={() => setDestinationQuery('')}
                          className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>

                    {destOpen && (
                      <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-[0_25px_60px_rgba(0,0,0,0.28)] p-2 z-[100] animate-fade-in max-h-72 overflow-y-auto">
                        <div className="flex items-center justify-between px-2.5 py-1.5 border-b border-slate-100 dark:border-slate-800 mb-1.5">
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                            Popular Karnataka Circuits
                          </span>
                          <button
                            type="button"
                            onClick={() => setDestOpen(false)}
                            className="text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 p-0.5"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <div className="space-y-1">
                          {filteredDestinations.map((d) => (
                            <div
                              key={d.name}
                              onClick={() => {
                                setDestinationQuery(d.name);
                                setDestOpen(false);
                              }}
                              className="p-2.5 rounded-xl text-xs cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center justify-between gap-3"
                            >
                              <div className="flex items-center gap-2.5 min-w-0">
                                <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                                <div className="min-w-0">
                                  <span className="font-bold text-slate-900 dark:text-white block truncate">{d.name}</span>
                                  <span className="text-[11px] text-slate-500 dark:text-slate-400 block truncate">{d.tag}</span>
                                </div>
                              </div>
                              <span className="text-[10px] font-bold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-md shrink-0">
                                {d.category}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Duration Pill Switcher */}
                  <div className="lg:col-span-2 space-y-1">
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
                        3+ D
                      </button>
                    </div>
                  </div>

                  {/* Search CTA */}
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

              {/* TAB 2: HOTELS WITH CUSTOM POPUP & CUSTOM SELECT */}
              {activeTab === 'hotels' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 items-center">
                  <div className="lg:col-span-5 space-y-1 relative" ref={hotelRef}>
                    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                      Search Destination or Mayura Property
                    </label>
                    <input
                      type="text"
                      value={hotelDestination}
                      onChange={(e) => {
                        setHotelDestination(e.target.value);
                        setHotelOpen(true);
                      }}
                      onFocus={() => setHotelOpen(true)}
                      placeholder="e.g. Coorg, Hampi, Mysuru, Gokarna..."
                      className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-semibold text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-slate-900"
                    />

                    {hotelOpen && (
                      <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl border border-slate-200 shadow-[0_25px_60px_rgba(0,0,0,0.28)] p-2 z-[100] animate-fade-in max-h-72 overflow-y-auto">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block px-2.5 py-1">
                          Hotel Mayura Heritage Chain
                        </span>
                        <div className="space-y-1">
                          {filteredHotels.map((h) => (
                            <div
                              key={h.name}
                              onClick={() => {
                                setHotelDestination(h.name);
                                setHotelOpen(false);
                              }}
                              className="p-2.5 rounded-xl text-xs cursor-pointer hover:bg-slate-100 transition-colors flex items-center justify-between"
                            >
                              <div>
                                <span className="font-bold text-slate-900 block truncate">{h.name}</span>
                                <span className="text-[11px] text-slate-500 block truncate">{h.place}</span>
                              </div>
                              <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md shrink-0 ml-2">
                                {h.type}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="lg:col-span-4 space-y-1">
                    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                      Guests & Room Preference
                    </label>
                    <CustomSelect
                      value={hotelGuests}
                      onChange={setHotelGuests}
                      options={guestOptions}
                      placeholder="Select Guests"
                    />
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

              {/* TAB 3: AIRPORT TAXI & CABS WITH CUSTOM POPUPS */}
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

                  <div className="lg:col-span-3 space-y-1 relative" ref={pickupRef}>
                    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                      Pickup Location
                    </label>
                    <input
                      type="text"
                      value={cabPickup}
                      onChange={(e) => {
                        setCabPickup(e.target.value);
                        setPickupOpen(true);
                      }}
                      onFocus={() => setPickupOpen(true)}
                      placeholder="e.g. Kempegowda Airport (BLR)..."
                      className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-semibold text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-slate-900"
                    />
                    {pickupOpen && (
                      <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl border border-slate-200 shadow-[0_25px_60px_rgba(0,0,0,0.28)] p-2 z-[100] animate-fade-in max-h-60 overflow-y-auto">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block px-2.5 py-1">
                          Popular Pickup Hubs
                        </span>
                        <div className="space-y-1">
                          {CAB_PICKUP_SUGGESTIONS.map((p) => (
                            <div
                              key={p}
                              onClick={() => {
                                setCabPickup(p);
                                setPickupOpen(false);
                              }}
                              className="p-2.5 rounded-xl text-xs font-semibold hover:bg-slate-100 cursor-pointer transition-colors text-slate-800"
                            >
                              {p}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="lg:col-span-3 space-y-1 relative" ref={dropRef}>
                    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                      Drop Destination
                    </label>
                    <input
                      type="text"
                      value={cabDrop}
                      onChange={(e) => {
                        setCabDrop(e.target.value);
                        setDropOpen(true);
                      }}
                      onFocus={() => setDropOpen(true)}
                      placeholder="Enter drop locality or city..."
                      className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-semibold text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-slate-900"
                    />
                    {dropOpen && (
                      <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl border border-slate-200 shadow-[0_25px_60px_rgba(0,0,0,0.28)] p-2 z-[100] animate-fade-in max-h-60 overflow-y-auto">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block px-2.5 py-1">
                          Common Drop Localities
                        </span>
                        <div className="space-y-1">
                          {CAB_DROP_SUGGESTIONS.map((d) => (
                            <div
                              key={d}
                              onClick={() => {
                                setCabDrop(d);
                                setDropOpen(false);
                              }}
                              className="p-2.5 rounded-xl text-xs font-semibold hover:bg-slate-100 cursor-pointer transition-colors text-slate-800"
                            >
                              {d}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="lg:col-span-3 pt-1 sm:pt-4 lg:pt-4">
                    <button
                      type="submit"
                      className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-black text-white font-bold text-xs sm:text-sm shadow-sm transition-all flex items-center justify-center gap-2"
                    >
                      <span>Fare & Instant Cab</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* TAB 4: AMBAARI & ACTIVITIES WITH CUSTOM MENUS */}
              {activeTab === 'activities' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 items-center">
                  <div className="lg:col-span-5 space-y-1 relative" ref={actRef}>
                    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                      Search Activity or City Experience
                    </label>
                    <input
                      type="text"
                      value={activitySearch}
                      onChange={(e) => {
                        setActivitySearch(e.target.value);
                        setActivityOpen(true);
                      }}
                      onFocus={() => setActivityOpen(true)}
                      placeholder="e.g. Ambaari Mysuru, Vidhana Soudha..."
                      className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-semibold text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-slate-900"
                    />

                    {activityOpen && (
                      <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl border border-slate-200 shadow-[0_25px_60px_rgba(0,0,0,0.28)] p-2 z-[100] animate-fade-in max-h-60 overflow-y-auto">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block px-2.5 py-1">
                          Official Experiences
                        </span>
                        <div className="space-y-1">
                          {ACTIVITY_SUGGESTIONS.map((act) => (
                            <div
                              key={act.title}
                              onClick={() => {
                                setActivitySearch(act.title);
                                setActivityOpen(false);
                              }}
                              className="p-2.5 rounded-xl text-xs hover:bg-slate-100 cursor-pointer transition-colors flex items-center justify-between"
                            >
                              <span className="font-bold text-slate-900 truncate">{act.title}</span>
                              <span className="text-[10px] font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md shrink-0 ml-2">
                                {act.city}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="lg:col-span-4 space-y-1">
                    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                      Preferred Timing / Slot
                    </label>
                    <CustomSelect
                      value={activitySlot}
                      onChange={setActivitySlot}
                      options={activitySlotOptions}
                      placeholder="Select Slot"
                    />
                  </div>

                  <div className="lg:col-span-3 pt-1 sm:pt-4 lg:pt-4">
                    <button
                      type="submit"
                      className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-black text-white font-bold text-xs sm:text-sm shadow-sm transition-all flex items-center justify-center gap-2"
                    >
                      <span>Book Activity Passes</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </form>

          </div>

        </div>

      </div>

      {/* AI Trip Planner Modal */}
      {plannerOpen && (
        <AiTripPlannerModal isOpen={plannerOpen} onClose={() => setPlannerOpen(false)} />
      )}
    </section>
  );
};
