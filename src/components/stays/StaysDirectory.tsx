import React, { useState, useEffect } from 'react';
import {
  MapPin, Star, Check, ArrowRight, Search, SlidersHorizontal,
  Calendar, Users, Building, ShieldCheck, X, CheckCircle2
} from 'lucide-react';
import { HOTELS_DATA } from '../../data/hotelsData';
import { getStoredLanguage, saveBooking } from '../../lib/bookingStore';
import { TRANSLATIONS } from '../../data/translations';
import { CustomSelect } from '../common/CustomSelect';
import type { Language, MayuraHotel, BookingRecord, PassengerDetail } from '../../types/travel';

export const StaysDirectory: React.FC = () => {
  const [lang, setLang] = useState<Language>('en');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [maxPrice, setMaxPrice] = useState<number>(6000);
  
  // Quick Reserve Room Modal State
  const [selectedHotel, setSelectedHotel] = useState<MayuraHotel | null>(null);
  const [checkInDate, setCheckInDate] = useState('2026-08-29');
  const [checkOutDate, setCheckOutDate] = useState('2026-08-31');
  const [guestsCount, setGuestsCount] = useState(2);
  const [roomsCount, setRoomsCount] = useState(1);
  const [contactName, setContactName] = useState('Vikram Somanna');
  const [contactPhone, setContactPhone] = useState('+91 94801 88990');
  const [contactEmail, setContactEmail] = useState('vikram.somanna@gmail.com');
  const [isProcessing, setIsProcessing] = useState(false);
  const [confirmedId, setConfirmedId] = useState<string | null>(null);
  const [guestList, setGuestList] = useState<string[]>(['Vikram Somanna', 'Ananya Somanna']);

  // Sync guestList with guestsCount
  useEffect(() => {
    setGuestList((prev) => {
      const next = [...prev];
      while (next.length < guestsCount) {
        next.push('');
      }
      while (next.length > guestsCount) {
        next.pop();
      }
      if (next.length > 0 && contactName) {
        next[0] = contactName;
      }
      return next;
    });
  }, [guestsCount]);

  const updateGuestName = (index: number, name: string) => {
    setGuestList((prev) => {
      const next = [...prev];
      next[index] = name;
      if (index === 0) setContactName(name);
      return next;
    });
  };

  useEffect(() => {
    setLang(getStoredLanguage());
    const handler = (e: any) => setLang(e.detail);
    window.addEventListener('kstdc_lang_changed', handler);

    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const searchParam = params.get('search') || params.get('destination') || params.get('q');
      if (searchParam) {
        setSearchQuery(searchParam);
      }
    }

    return () => window.removeEventListener('kstdc_lang_changed', handler);
  }, []);

  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  const filteredHotels = HOTELS_DATA.filter((hotel) => {
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const match =
        hotel.name.toLowerCase().includes(q) ||
        hotel.destination.toLowerCase().includes(q) ||
        hotel.highlights.some((h) => h.toLowerCase().includes(q));
      if (!match) return false;
    }

    if (selectedCategory !== 'all' && hotel.category !== selectedCategory) {
      return false;
    }

    if (hotel.pricePerNight > maxPrice) {
      return false;
    }

    return true;
  });

  const handleReserveRoom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedHotel) return;

    setIsProcessing(true);
    const bookingId = `KSTDC-MYR-${selectedHotel.destination.substring(0, 3).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;

    const nights = 2;
    const baseTariff = selectedHotel.pricePerNight * nights * roomsCount;
    const gst = Math.round(baseTariff * 0.05);
    const totalAmount = baseTariff + gst;

    const stayPassengers: PassengerDetail[] = guestList.map((name, i) => ({
      id: `gst-${i + 1}`,
      name: name.trim() || (i === 0 ? contactName : `Guest ${i + 1}`),
      age: 32,
      gender: i % 2 === 0 ? 'Male' : 'Female',
      type: 'Adult',
      seatNumber: `Room #${101 + Math.floor(i / 2)}`,
    }));

    const stayBooking: BookingRecord = {
      bookingId,
      createdAt: new Date().toISOString(),
      serviceType: 'hotel',
      tripId: selectedHotel.id,
      tripTitle: `${selectedHotel.name} (${nights} Nights)`,
      tripSlug: 'stays',
      destination: selectedHotel.destination,
      departureDate: checkInDate,
      pickupPoint: selectedHotel.address,
      pickupTime: '12:00 PM Check-in',
      vehicleType: 'Self / Hotel Direct Arrival',
      hotelName: selectedHotel.name,
      travellers: { adults: guestsCount, children: 0, seniors: 0 },
      passengers: stayPassengers,
      contact: {
        name: contactName,
        email: contactEmail,
        phone: contactPhone,
        specialAssistance: false,
      },
      roomType: 'Deluxe AC Room (Direct Government Tariff)',
      pricing: {
        basePrice: baseTariff,
        seniorDiscount: 0,
        gstAmount: gst,
        totalAmount,
      },
      status: 'Confirmed',
      paymentMethod: 'UPI',
      extraDetails: {
        checkInDate,
        checkOutDate,
        nights: `${nights} Nights`,
        rooms: `${roomsCount} Room(s)`,
        address: selectedHotel.address,
      },
    };

    saveBooking(stayBooking);

    setTimeout(() => {
      setIsProcessing(false);
      setConfirmedId(bookingId);
    }, 600);
  };

  return (
    <div className="py-8 sm:py-14 bg-canvas min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="bg-slate-900 dark:bg-slate-950 p-8 sm:p-12 rounded-[32px] text-white border border-slate-800 shadow-md space-y-2">
          <span className="text-xs uppercase tracking-wider font-bold text-emerald-400 block">
            Government-Run Hospitality
          </span>
          <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-white">
            Stay with Hotel Mayura
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
            Heritage properties, hilltop view lodges, and coastal retreats situated right next to Karnataka's prime monuments, peaks and waterfalls. Direct citizen pricing with zero commission markups.
          </p>
        </div>

        {/* Search & Filter Bar Container */}
        <div className="bg-white p-5 rounded-[28px] border border-slate-200 shadow-sm space-y-4">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            
            {/* Search Input Bar */}
            <div className="md:col-span-6 relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search hotel name or destination (e.g. Coorg, Hampi, Mysuru, Jog Falls)..."
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-full text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Price Range Slider */}
            <div className="md:col-span-6 flex items-center gap-3 bg-slate-50 p-2 px-4 rounded-full border border-slate-200">
              <span className="text-xs font-bold text-slate-600 shrink-0">Max: ₹{maxPrice.toLocaleString('en-IN')}/night</span>
              <input
                type="range"
                min="1500"
                max="6000"
                step="250"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-slate-900 cursor-pointer"
              />
            </div>

          </div>

          {/* Category Filter Chips */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-100">
            <div className="flex flex-wrap items-center gap-1.5 bg-slate-100 p-1 rounded-full border border-slate-200">
              {['all', 'Scenic Retreat', 'Heritage', 'Premium', 'Budget Comfort'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                    selectedCategory === cat
                      ? 'bg-slate-950 text-white shadow-xs'
                      : 'text-slate-700 hover:text-slate-950 hover:bg-white'
                  }`}
                >
                  {cat === 'all' ? 'All Properties' : cat}
                </button>
              ))}
            </div>

            <span className="text-xs text-slate-500 font-medium">
              Showing <strong>{filteredHotels.length}</strong> official properties
            </span>
          </div>

        </div>

        {/* Stays Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredHotels.map((hotel) => (
            <div
              key={hotel.id}
              className="bg-white rounded-[28px] overflow-hidden border border-slate-200 hover:border-slate-400 transition-all flex flex-col justify-between shadow-xs"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                <img
                  src={hotel.image}
                  alt={hotel.name}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3.5 left-3.5 bg-slate-950/80 backdrop-blur-sm text-white px-3 py-1 rounded-full text-[11px] font-bold">
                  {hotel.category}
                </div>
                <div className="absolute bottom-3.5 right-3.5 bg-white/95 px-2.5 py-1 rounded-full text-xs font-bold text-slate-900 flex items-center gap-1 shadow-sm">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>{hotel.rating}</span>
                  <span className="text-slate-400 font-normal text-[11px]">({hotel.reviewsCount})</span>
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between gap-4">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-1 text-xs text-slate-500 font-medium">
                    <MapPin className="w-3.5 h-3.5 text-blue-600" />
                    <span>{hotel.destination}</span>
                  </div>

                  <h2 className="text-xl font-bold text-slate-950">
                    {hotel.name}
                  </h2>

                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {hotel.description}
                  </p>

                  <div className="space-y-1 pt-2">
                    {hotel.highlights.slice(0, 3).map((hl, i) => (
                      <div key={i} className="text-xs text-slate-700 flex items-center gap-1.5 font-medium">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span className="truncate">{hl}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] text-slate-500 block font-medium">Direct Citizen Tariff</span>
                    <span className="text-xl font-bold text-slate-950">
                      ₹{hotel.pricePerNight.toLocaleString('en-IN')}
                      <span className="text-xs font-normal text-slate-500"> / night</span>
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setSelectedHotel(hotel);
                      setConfirmedId(null);
                    }}
                    className="px-4 py-2 rounded-full bg-slate-950 hover:bg-black text-white font-bold text-xs shadow-sm transition-all"
                  >
                    Reserve Room
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Quick Reserve Modal */}
      {selectedHotel && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6">
          <div className="bg-white rounded-[32px] max-w-lg w-full border border-slate-200 shadow-2xl p-6 sm:p-8 space-y-6 text-slate-900 animate-fade-in relative">
            
            <button
              onClick={() => setSelectedHotel(null)}
              className="absolute top-6 right-6 text-slate-400 hover:text-slate-700 p-1 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>

            {!confirmedId ? (
              <form onSubmit={handleReserveRoom} className="space-y-5">
                <div className="space-y-1">
                  <span className="text-[11px] font-bold text-blue-600 uppercase tracking-wider block">
                    Direct Government Hospitality Reservation
                  </span>
                  <h3 className="text-2xl font-bold text-slate-950">
                    {selectedHotel.name}
                  </h3>
                  <p className="text-xs text-slate-500">
                    {selectedHotel.destination} · ₹{selectedHotel.pricePerNight}/night
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-500 block">Check-in Date</label>
                    <input
                      type="date"
                      value={checkInDate}
                      onChange={(e) => setCheckInDate(e.target.value)}
                      className="w-full p-2 rounded-xl bg-white border border-slate-200 text-xs font-semibold"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-500 block">Check-out Date</label>
                    <input
                      type="date"
                      value={checkOutDate}
                      onChange={(e) => setCheckOutDate(e.target.value)}
                      className="w-full p-2 rounded-xl bg-white border border-slate-200 text-xs font-semibold"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-500 block">Guests</label>
                    <CustomSelect
                      value={String(guestsCount)}
                      onChange={(v) => setGuestsCount(Number(v))}
                      options={[
                        { value: '1', label: '1 Guest' },
                        { value: '2', label: '2 Guests' },
                        { value: '3', label: '3 Guests' },
                        { value: '4', label: '4 Guests' },
                      ]}
                      placeholder="Guests"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-500 block">Rooms</label>
                    <CustomSelect
                      value={String(roomsCount)}
                      onChange={(v) => setRoomsCount(Number(v))}
                      options={[
                        { value: '1', label: '1 Deluxe Room' },
                        { value: '2', label: '2 Deluxe Rooms' },
                      ]}
                      placeholder="Rooms"
                    />
                  </div>
                </div>

                {/* Guest Names List */}
                <div className="space-y-2">
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                    Guest Manifest ({guestList.length} Guests)
                  </label>
                  <div className="space-y-2">
                    {guestList.map((gName, idx) => (
                      <div key={idx} className="space-y-1">
                        <label className="text-[10px] font-semibold text-slate-500">
                          {idx === 0 ? 'Lead Guest (Primary Contact)' : `Guest ${idx + 1} Full Name`}
                        </label>
                        <input
                          type="text"
                          value={gName}
                          onChange={(e) => updateGuestName(idx, e.target.value)}
                          placeholder={`Guest ${idx + 1} Full Name`}
                          className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold"
                          required
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2 pt-1 border-t border-slate-100">
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                    Contact Information
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      value={contactPhone}
                      onChange={(e) => setContactPhone(e.target.value)}
                      placeholder="Phone Number"
                      className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold"
                      required
                    />
                    <input
                      type="email"
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      placeholder="Email Address"
                      className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold"
                      required
                    />
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] text-slate-500 block">Total for 2 Nights + GST</span>
                    <span className="text-xl font-bold text-slate-900">
                      ₹{(selectedHotel.pricePerNight * 2 * roomsCount * 1.05).toLocaleString('en-IN')}
                    </span>
                  </div>
                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="px-6 py-3 rounded-full bg-slate-950 hover:bg-black text-white font-bold text-xs shadow-md transition-all disabled:opacity-50"
                  >
                    {isProcessing ? 'Confirming...' : 'Confirm Mayura Stay'}
                  </button>
                </div>
              </form>
            ) : (
              <div className="text-center space-y-4 py-2">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto text-2xl font-bold">
                  ✓
                </div>
                <span className="text-xs font-mono font-bold text-emerald-700 uppercase tracking-wider block">
                  Ref: {confirmedId}
                </span>
                <h3 className="text-2xl font-bold text-slate-950">
                  Room Reserved at {selectedHotel.name}!
                </h3>
                <p className="text-xs text-slate-600">
                  Your reservation slip is confirmed and stored in your citizen wallet.
                </p>
                <div className="pt-2 flex items-center gap-3">
                  <a
                    href="/my-bookings"
                    className="flex-1 py-3 rounded-full bg-slate-950 text-white font-bold text-xs text-center shadow-sm"
                  >
                    View in Citizen Wallet
                  </a>
                  <button
                    type="button"
                    onClick={() => setSelectedHotel(null)}
                    className="py-3 px-5 rounded-full bg-slate-100 text-slate-800 font-bold text-xs"
                  >
                    Done
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
};
