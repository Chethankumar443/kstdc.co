import React, { useState, useEffect } from 'react';
import {
  Calendar, Users, MapPin, ShieldCheck, ArrowRight, ArrowLeft,
  CheckCircle2, CreditCard, QrCode, AlertCircle, Building2,
  Sparkles, Clock, Bus, Check, User
} from 'lucide-react';
import { getStoredLanguage, saveBooking } from '../../lib/bookingStore';
import { TRANSLATIONS } from '../../data/translations';
import type { TripPackage, Language, BookingRecord, PassengerDetail } from '../../types/travel';

interface Props {
  trip: TripPackage;
}

export const BookingCheckoutFlow: React.FC<Props> = ({ trip }) => {
  const [lang, setLang] = useState<Language>('en');
  const [step, setStep] = useState<1 | 2 | 3>(1);

  // Step 1: Schedule & Pickup
  const [selectedDate, setSelectedDate] = useState<string>(trip.departureSchedule.availableDates[0] || '2026-08-30');
  const [selectedPickup, setSelectedPickup] = useState(trip.pickupPoints[0] || { name: 'Majestic Bus Station', time: '06:00 AM', landmark: 'Platform 1' });
  const [roomType, setRoomType] = useState<'twin' | 'single_upgrade'>('twin');

  // Step 2: Travellers & Detailed Manifest
  const [adults, setAdults] = useState<number>(2);
  const [children, setChildren] = useState<number>(0);
  const [seniors, setSeniors] = useState<number>(0);
  const [specialAssistance, setSpecialAssistance] = useState<boolean>(false);

  // Dynamic Passenger List
  const [passengers, setPassengers] = useState<PassengerDetail[]>([
    { id: 'p-1', name: 'Vikram Somanna', age: 34, gender: 'Male', type: 'Adult', seatNumber: 'Seat #12' },
    { id: 'p-2', name: 'Ananya Somanna', age: 31, gender: 'Female', type: 'Adult', seatNumber: 'Seat #13' },
  ]);

  // Primary Contact
  const [contactName, setContactName] = useState('Vikram Somanna');
  const [contactEmail, setContactEmail] = useState('vikram.somanna@gmail.com');
  const [contactPhone, setContactPhone] = useState('+91 94801 88990');

  // Step 3: Payment
  const [paymentMethod, setPaymentMethod] = useState<'UPI' | 'Card' | 'NetBanking' | 'Counter Cash'>('UPI');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  useEffect(() => {
    setLang(getStoredLanguage());
    const handler = (e: any) => setLang(e.detail);
    window.addEventListener('kstdc_lang_changed', handler);
    return () => window.removeEventListener('kstdc_lang_changed', handler);
  }, []);

  // Synchronize passenger list slots whenever counts change
  useEffect(() => {
    const totalCount = adults + seniors + children;
    setPassengers((prev) => {
      const updated: PassengerDetail[] = [...prev];
      
      // Build required types
      const requiredTypes: Array<'Adult' | 'Senior' | 'Child'> = [];
      for (let i = 0; i < adults; i++) requiredTypes.push('Adult');
      for (let i = 0; i < seniors; i++) requiredTypes.push('Senior');
      for (let i = 0; i < children; i++) requiredTypes.push('Child');

      // Adjust array size
      while (updated.length < totalCount) {
        const idx = updated.length;
        const type = requiredTypes[idx] || 'Adult';
        updated.push({
          id: `p-${idx + 1}`,
          name: idx === 0 ? contactName : '',
          age: type === 'Senior' ? 65 : type === 'Child' ? 8 : 30,
          gender: idx % 2 === 0 ? 'Male' : 'Female',
          type,
          seatNumber: `Seat #${12 + idx}`,
        });
      }

      while (updated.length > totalCount) {
        updated.pop();
      }

      // Update types
      return updated.map((p, idx) => ({
        ...p,
        type: requiredTypes[idx] || p.type,
      }));
    });
  }, [adults, seniors, children]);

  // Keep Lead passenger synced with contactName
  const updatePassenger = (index: number, field: keyof PassengerDetail, value: any) => {
    setPassengers((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], [field]: value };
      if (index === 0 && field === 'name') {
        setContactName(value);
      }
      return next;
    });
  };

  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  // Price calculations
  const adultFare = adults * trip.pricePerPerson;
  const childFare = children * (trip.pricePerPerson * 0.7);
  const seniorFare = seniors * trip.pricePerPerson;
  const basePrice = adultFare + childFare + seniorFare;
  const seniorDiscount = seniors > 0 ? seniorFare * 0.05 : 0;
  const roomUpgradeFee = roomType === 'single_upgrade' ? 1200 : 0;
  const gstAmount = Math.round((basePrice - seniorDiscount + roomUpgradeFee) * 0.05);
  const totalAmount = Math.round(basePrice - seniorDiscount + roomUpgradeFee + gstAmount);

  const handleFillDemoData = () => {
    setAdults(2);
    setSeniors(1);
    setChildren(1);
    setSpecialAssistance(true);
    setContactName('Vikram Somanna');
    setContactEmail('vikram.somanna@gmail.com');
    setContactPhone('+91 94801 88990');
    setPassengers([
      { id: 'p-1', name: 'Vikram Somanna', age: 34, gender: 'Male', type: 'Adult', seatNumber: 'Seat #12' },
      { id: 'p-2', name: 'Ananya Somanna', age: 31, gender: 'Female', type: 'Adult', seatNumber: 'Seat #13' },
      { id: 'p-3', name: 'Shankaraiah Somanna', age: 68, gender: 'Male', type: 'Senior', seatNumber: 'Seat #14' },
      { id: 'p-4', name: 'Aarav Somanna', age: 7, gender: 'Male', type: 'Child', seatNumber: 'Seat #15' },
    ]);
  };

  const handleCompleteBooking = () => {
    setIsProcessing(true);

    const bookingId = `KSTDC-2026-${trip.slug.substring(0, 3).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;

    const newBooking: BookingRecord = {
      bookingId,
      createdAt: new Date().toISOString(),
      serviceType: 'tour',
      tripId: trip.id,
      tripTitle: trip.title,
      tripSlug: trip.slug,
      destination: trip.destination,
      departureDate: selectedDate,
      pickupPoint: selectedPickup.name,
      pickupTime: selectedPickup.time,
      vehicleType: trip.vehicleType,
      hotelName: trip.hotel.name,
      travellers: { adults, children, seniors },
      passengers,
      contact: {
        name: contactName,
        email: contactEmail,
        phone: contactPhone,
        specialAssistance,
      },
      roomType: roomType === 'twin' ? 'Twin Sharing Deluxe Room (Included)' : 'Single Occupancy Room',
      pricing: {
        basePrice,
        seniorDiscount,
        gstAmount,
        totalAmount,
      },
      status: 'Confirmed',
      paymentMethod,
    };

    saveBooking(newBooking);

    setTimeout(() => {
      setIsProcessing(false);
      window.location.href = `/confirmation?id=${bookingId}`;
    }, 600);
  };

  return (
    <div className="py-8 sm:py-14 bg-canvas min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Checkout Header & Stepper */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-hairline-soft">
          <div>
            <span className="text-xs font-bold text-primary-cobalt uppercase tracking-wider block">
              Official Booking
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold text-ink-deep">
              {trip.title}
            </h1>
          </div>

          {/* Stepper Tabs */}
          <div className="flex items-center gap-1.5 bg-surface-soft p-1 rounded-full border border-hairline-soft text-xs font-semibold">
            <span className={`px-4 py-1.5 rounded-full transition-all ${step === 1 ? 'bg-black text-white shadow-sm' : 'text-steel'}`}>
              01 Date & Pickup
            </span>
            <span className={`px-4 py-1.5 rounded-full transition-all ${step === 2 ? 'bg-black text-white shadow-sm' : 'text-steel'}`}>
              02 Travellers Manifest
            </span>
            <span className={`px-4 py-1.5 rounded-full transition-all ${step === 3 ? 'bg-black text-white shadow-sm' : 'text-steel'}`}>
              03 Review & Pay
            </span>
          </div>
        </div>

        {/* Main Grid: Form Left (8 cols) + Sticky Summary Right (4 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          <div className="lg:col-span-8 space-y-6">
            
            {/* STEP 1: DATE & PICKUP */}
            {step === 1 && (
              <div className="bg-canvas p-6 sm:p-8 rounded-[28px] border border-hairline-soft shadow-sm space-y-6">
                <div className="flex items-center justify-between border-b border-hairline-soft pb-3">
                  <h2 className="text-xl font-bold text-ink-deep">
                    {t.step1Title}
                  </h2>
                  <span className="text-xs text-steel">Guaranteed Government Departures</span>
                </div>

                {/* Available Date Chips */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-steel uppercase tracking-wider block">
                    Select Departure Date
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {trip.departureSchedule.availableDates.map((dateStr) => {
                      const isSelected = selectedDate === dateStr;
                      const dateObj = new Date(dateStr);
                      return (
                        <button
                          key={dateStr}
                          type="button"
                          onClick={() => setSelectedDate(dateStr)}
                          className={`p-3.5 rounded-2xl border text-left transition-all ${
                            isSelected
                              ? 'bg-ink-deep text-white border-ink-deep shadow-sm'
                              : 'bg-surface-soft border-hairline-soft text-ink hover:border-steel'
                          }`}
                        >
                          <span className="text-[11px] block opacity-80">
                            {dateObj.toLocaleDateString('en-IN', { weekday: 'short' })}
                          </span>
                          <span className="text-base font-bold block">
                            {dateObj.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Pickup Point Selection */}
                <div className="space-y-2 pt-2">
                  <label className="text-xs font-bold text-steel uppercase tracking-wider block">
                    Boarding Point in Bengaluru
                  </label>
                  <div className="space-y-2.5">
                    {trip.pickupPoints.map((point) => {
                      const isSelected = selectedPickup.name === point.name;
                      return (
                        <button
                          key={point.name}
                          type="button"
                          onClick={() => setSelectedPickup(point)}
                          className={`w-full p-4 rounded-2xl border text-left transition-all flex items-center justify-between ${
                            isSelected
                              ? 'bg-surface-soft border-2 border-primary-cobalt shadow-sm'
                              : 'bg-canvas border-hairline-soft hover:bg-surface-soft'
                          }`}
                        >
                          <div>
                            <div className="flex items-center gap-2 font-bold text-sm text-ink-deep">
                              <MapPin className="w-4 h-4 text-primary-cobalt" />
                              <span>{point.name}</span>
                            </div>
                            <span className="text-xs text-steel block pl-6">
                              Landmark: {point.landmark}
                            </span>
                          </div>

                          <span className="px-3 py-1 rounded-full bg-surface-soft text-xs font-bold text-primary-cobalt border border-hairline-soft">
                            {point.time}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Hotel Room Preference */}
                <div className="space-y-2 pt-2">
                  <label className="text-xs font-bold text-steel uppercase tracking-wider block">
                    Hotel Room Preference ({trip.hotel.name})
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setRoomType('twin')}
                      className={`p-4 rounded-2xl border text-left transition-all ${
                        roomType === 'twin'
                          ? 'bg-surface-soft border-2 border-primary-cobalt shadow-sm'
                          : 'bg-canvas border-hairline-soft hover:bg-surface-soft'
                      }`}
                    >
                      <div className="font-bold text-sm text-ink-deep">Deluxe Twin Sharing</div>
                      <div className="text-xs text-steel">Included in standard package tariff</div>
                    </button>
                    <button
                      type="button"
                      onClick={() => setRoomType('single_upgrade')}
                      className={`p-4 rounded-2xl border text-left transition-all ${
                        roomType === 'single_upgrade'
                          ? 'bg-surface-soft border-2 border-primary-cobalt shadow-sm'
                          : 'bg-canvas border-hairline-soft hover:bg-surface-soft'
                      }`}
                    >
                      <div className="font-bold text-sm text-ink-deep">Private Single Room Upgrade</div>
                      <div className="text-xs text-emerald-700 font-semibold">+₹1,200 supplement</div>
                    </button>
                  </div>
                </div>

                {/* Next CTA */}
                <div className="pt-4 flex justify-end">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="px-8 py-3 rounded-full bg-black hover:bg-neutral-800 text-white font-bold text-xs shadow-sm transition-all flex items-center gap-2"
                  >
                    <span>Proceed to Travellers Manifest</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: TRAVELLERS MANIFEST & CONTACT DETAILS */}
            {step === 2 && (
              <div className="bg-canvas p-6 sm:p-8 rounded-[28px] border border-hairline-soft shadow-sm space-y-6">
                <div className="flex items-center justify-between border-b border-hairline-soft pb-3">
                  <div>
                    <h2 className="text-xl font-bold text-ink-deep">
                      {t.step2Title}
                    </h2>
                    <p className="text-xs text-steel">Enter details for all passengers travelling in this booking</p>
                  </div>
                  <button
                    type="button"
                    onClick={handleFillDemoData}
                    className="text-xs text-primary-cobalt hover:underline font-semibold"
                  >
                    Auto-Fill Demo Family
                  </button>
                </div>

                {/* Passenger Count Counters */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                  <div className="p-4 rounded-2xl bg-surface-soft border border-hairline-soft space-y-2">
                    <span className="text-xs font-bold text-ink-deep block">{t.adultsLabel}</span>
                    <div className="flex items-center justify-between">
                      <button
                        type="button"
                        onClick={() => setAdults(Math.max(1, adults - 1))}
                        className="w-8 h-8 rounded-full bg-canvas border border-hairline-soft font-bold text-ink"
                      >
                        −
                      </button>
                      <span className="text-xl font-bold text-ink-deep">{adults}</span>
                      <button
                        type="button"
                        onClick={() => setAdults(adults + 1)}
                        className="w-8 h-8 rounded-full bg-canvas border border-hairline-soft font-bold text-ink"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-surface-soft border border-hairline-soft space-y-2">
                    <span className="text-xs font-bold text-ink-deep block">{t.childrenLabel}</span>
                    <div className="flex items-center justify-between">
                      <button
                        type="button"
                        onClick={() => setChildren(Math.max(0, children - 1))}
                        className="w-8 h-8 rounded-full bg-canvas border border-hairline-soft font-bold text-ink"
                      >
                        −
                      </button>
                      <span className="text-xl font-bold text-ink-deep">{children}</span>
                      <button
                        type="button"
                        onClick={() => setChildren(children + 1)}
                        className="w-8 h-8 rounded-full bg-canvas border border-hairline-soft font-bold text-ink"
                      >
                        +
                      </button>
                    </div>
                    <span className="text-[11px] text-steel block">30% child tariff concession</span>
                  </div>

                  <div className="p-4 rounded-2xl bg-surface-soft border border-hairline-soft space-y-2">
                    <span className="text-xs font-bold text-ink-deep block">{t.seniorsLabel}</span>
                    <div className="flex items-center justify-between">
                      <button
                        type="button"
                        onClick={() => setSeniors(Math.max(0, seniors - 1))}
                        className="w-8 h-8 rounded-full bg-canvas border border-hairline-soft font-bold text-ink"
                      >
                        −
                      </button>
                      <span className="text-xl font-bold text-ink-deep">{seniors}</span>
                      <button
                        type="button"
                        onClick={() => setSeniors(seniors + 1)}
                        className="w-8 h-8 rounded-full bg-canvas border border-hairline-soft font-bold text-ink"
                      >
                        +
                      </button>
                    </div>
                    <span className="text-[11px] text-emerald-700 font-bold block">5% senior concession</span>
                  </div>
                </div>

                {/* INDIVIDUAL PASSENGER MANIFEST FORM */}
                <div className="space-y-4 pt-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-bold text-ink-deep uppercase tracking-wider">
                      Individual Passenger Manifest ({passengers.length} Travellers)
                    </h3>
                    <span className="text-[11px] text-slate-500">Official Government Boarding List</span>
                  </div>

                  <div className="space-y-3">
                    {passengers.map((p, idx) => (
                      <div
                        key={p.id || idx}
                        className="p-4 rounded-2xl bg-slate-50/80 border border-slate-200 space-y-3"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="w-6 h-6 rounded-full bg-slate-900 text-white text-xs font-bold flex items-center justify-center">
                              {idx + 1}
                            </span>
                            <span className="text-xs font-bold text-slate-900">
                              {idx === 0 ? 'Lead Passenger (Primary Contact)' : `Passenger ${idx + 1}`}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">
                              {p.type}
                            </span>
                            <span className="text-[10px] font-mono font-bold text-slate-600 bg-white px-2 py-0.5 rounded-md border border-slate-200">
                              {p.seatNumber}
                            </span>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                          <div className="sm:col-span-6 space-y-1">
                            <label className="text-[11px] font-semibold text-slate-600">Full Name (As per Govt ID)</label>
                            <input
                              type="text"
                              value={p.name}
                              onChange={(e) => updatePassenger(idx, 'name', e.target.value)}
                              placeholder={`Passenger ${idx + 1} Full Name`}
                              className="w-full p-2.5 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                              required
                            />
                          </div>

                          <div className="sm:col-span-3 space-y-1">
                            <label className="text-[11px] font-semibold text-slate-600">Age</label>
                            <input
                              type="number"
                              value={p.age}
                              onChange={(e) => updatePassenger(idx, 'age', Number(e.target.value))}
                              min={1}
                              max={110}
                              className="w-full p-2.5 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                              required
                            />
                          </div>

                          <div className="sm:col-span-3 space-y-1">
                            <label className="text-[11px] font-semibold text-slate-600">Gender</label>
                            <select
                              value={p.gender}
                              onChange={(e) => updatePassenger(idx, 'gender', e.target.value as any)}
                              className="w-full p-2.5 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900 cursor-pointer"
                            >
                              <option value="Male">Male</option>
                              <option value="Female">Female</option>
                              <option value="Other">Other</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Primary Contact Details (Email & Phone for SMS/Ticket) */}
                <div className="space-y-3 pt-3 border-t border-hairline-soft">
                  <h3 className="text-xs font-bold text-ink-deep uppercase tracking-wider">
                    Official Ticket Delivery & Contact
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-[11px] font-semibold text-steel">Email (For Tax Invoice & PDF)</label>
                      <input
                        type="email"
                        value={contactEmail}
                        onChange={(e) => setContactEmail(e.target.value)}
                        className="w-full p-3 rounded-xl bg-surface-soft border border-hairline-soft text-xs sm:text-sm text-ink font-semibold focus:outline-none focus:ring-2 focus:ring-primary-cobalt"
                        required
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[11px] font-semibold text-steel">WhatsApp Phone (For Instant Pass)</label>
                      <input
                        type="tel"
                        value={contactPhone}
                        onChange={(e) => setContactPhone(e.target.value)}
                        className="w-full p-3 rounded-xl bg-surface-soft border border-hairline-soft text-xs sm:text-sm text-ink font-semibold focus:outline-none focus:ring-2 focus:ring-primary-cobalt"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Senior & Mobility Assistance */}
                <div className="p-4 rounded-2xl bg-surface-soft border border-hairline-soft flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="specialAssist"
                    checked={specialAssistance}
                    onChange={(e) => setSpecialAssistance(e.target.checked)}
                    className="w-4 h-4 mt-0.5 accent-primary-cobalt rounded cursor-pointer"
                  />
                  <label htmlFor="specialAssist" className="text-xs text-charcoal cursor-pointer font-medium">
                    <strong>Senior Citizen & Mobility Support:</strong> Request lower bus berth and ground-floor room allocation at Hotel Mayura.
                  </label>
                </div>

                {/* Back / Next */}
                <div className="pt-4 flex items-center justify-between border-t border-hairline-soft">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="px-6 py-2.5 rounded-full bg-surface-soft hover:bg-neutral-200 text-ink font-semibold text-xs border border-hairline-soft flex items-center gap-1.5"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="px-8 py-3 rounded-full bg-black hover:bg-neutral-800 text-white font-bold text-xs shadow-sm transition-all flex items-center gap-2"
                  >
                    <span>Proceed to Review & Pay</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            )}

            {/* STEP 3: REVIEW & PAYMENT */}
            {step === 3 && (
              <div className="bg-canvas p-6 sm:p-8 rounded-[28px] border border-hairline-soft shadow-sm space-y-6">
                <div className="border-b border-hairline-soft pb-3">
                  <h2 className="text-xl font-bold text-ink-deep">
                    {t.step3Title}
                  </h2>
                </div>

                {/* Booking Recap */}
                <div className="p-4 rounded-2xl bg-surface-soft border border-hairline-soft flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div className="space-y-1">
                    <div className="text-steel flex flex-wrap items-center gap-2 pt-0.5">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-primary-cobalt" />
                        <span>{new Date(selectedDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                      </div>
                      <span>•</span>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-primary-cobalt" />
                        <span>{selectedPickup.name} ({selectedPickup.time})</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-ink-deep block">
                      {adults} Adults {children > 0 && `· ${children} Children`} {seniors > 0 && `· ${seniors} Senior`}
                    </span>
                    <span className="text-steel">Hotel: {trip.hotel.name}</span>
                  </div>
                </div>

                {/* Manifest Summary */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Passenger Manifest</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {passengers.map((p, i) => (
                      <div key={i} className="p-3 rounded-xl bg-white border border-slate-200 flex items-center justify-between">
                        <div>
                          <span className="font-bold text-slate-900 block">{p.name || `Passenger ${i + 1}`}</span>
                          <span className="text-[11px] text-slate-500">{p.gender} · {p.age} yrs · {p.type}</span>
                        </div>
                        <span className="font-mono font-bold text-xs bg-slate-100 px-2 py-1 rounded-md text-slate-800">
                          {p.seatNumber}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Payment Selector */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-steel uppercase tracking-wider block">
                    Payment Method
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('UPI')}
                      className={`p-4 rounded-2xl text-left border flex items-center gap-3 transition-all ${
                        paymentMethod === 'UPI'
                          ? 'bg-surface-soft border-2 border-primary-cobalt shadow-sm'
                          : 'bg-canvas border-hairline-soft text-charcoal hover:bg-surface-soft'
                      }`}
                    >
                      <QrCode className="w-5 h-5 text-primary-cobalt" />
                      <div>
                        <span className="font-bold text-xs text-ink-deep block">UPI QR Code</span>
                        <span className="text-[10px] text-steel">GPay, PhonePe, Paytm</span>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('Card')}
                      className={`p-4 rounded-2xl text-left border flex items-center gap-3 transition-all ${
                        paymentMethod === 'Card'
                          ? 'bg-surface-soft border-2 border-primary-cobalt shadow-sm'
                          : 'bg-canvas border-hairline-soft text-charcoal hover:bg-surface-soft'
                      }`}
                    >
                      <CreditCard className="w-5 h-5 text-primary-cobalt" />
                      <div>
                        <span className="font-bold text-xs text-ink-deep block">Debit / Credit Card</span>
                        <span className="text-[10px] text-steel">Visa, Mastercard, RuPay</span>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('NetBanking')}
                      className={`p-4 rounded-2xl text-left border flex items-center gap-3 transition-all ${
                        paymentMethod === 'NetBanking'
                          ? 'bg-surface-soft border-2 border-primary-cobalt shadow-sm'
                          : 'bg-canvas border-hairline-soft text-charcoal hover:bg-surface-soft'
                      }`}
                    >
                      <Building2 className="w-5 h-5 text-primary-cobalt" />
                      <div>
                        <span className="font-bold text-xs text-ink-deep block">Net Banking</span>
                        <span className="text-[10px] text-steel">SBI, Canara, HDFC, ICICI</span>
                      </div>
                    </button>
                  </div>
                </div>

                {/* Back / Pay Action */}
                <div className="pt-4 flex items-center justify-between border-t border-hairline-soft">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="px-6 py-2.5 rounded-full bg-surface-soft hover:bg-neutral-200 text-ink font-semibold text-xs border border-hairline-soft flex items-center gap-1.5"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleCompleteBooking}
                    disabled={isProcessing}
                    className="px-10 py-3.5 rounded-full bg-black hover:bg-neutral-900 text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center gap-2"
                  >
                    {isProcessing ? (
                      <span>Issuing Government Ticket...</span>
                    ) : (
                      <>
                        <span>Confirm & Generate Tax Invoice (₹{totalAmount.toLocaleString('en-IN')})</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>

              </div>
            )}

          </div>

          {/* Sticky Price Breakdown Card */}
          <div className="lg:col-span-4 sticky top-24 space-y-4">
            <div className="bg-canvas p-6 rounded-[28px] border border-hairline-soft shadow-sm space-y-5">
              <h3 className="text-base font-bold text-ink-deep border-b border-hairline-soft pb-3">
                Fare Breakdown (Official Tariff)
              </h3>

              <div className="space-y-2.5 text-xs">
                <div className="flex justify-between text-charcoal">
                  <span>Adult Fare ({adults} × ₹{trip.pricePerPerson.toLocaleString('en-IN')}):</span>
                  <span className="font-bold text-ink-deep">₹{adultFare.toLocaleString('en-IN')}</span>
                </div>

                {children > 0 && (
                  <div className="flex justify-between text-charcoal">
                    <span>Child Fare ({children} × ₹{(trip.pricePerPerson * 0.7).toLocaleString('en-IN')}):</span>
                    <span className="font-bold text-ink-deep">₹{childFare.toLocaleString('en-IN')}</span>
                  </div>
                )}

                {seniors > 0 && (
                  <div className="flex justify-between text-charcoal">
                    <span>Senior Citizens ({seniors} × ₹{trip.pricePerPerson.toLocaleString('en-IN')}):</span>
                    <span className="font-bold text-ink-deep">₹{seniorFare.toLocaleString('en-IN')}</span>
                  </div>
                )}

                {seniorDiscount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-semibold">
                    <span>Senior Concession (5%):</span>
                    <span>−₹{seniorDiscount.toLocaleString('en-IN')}</span>
                  </div>
                )}

                {roomType === 'single_upgrade' && (
                  <div className="flex justify-between text-charcoal">
                    <span>Single Room Supplement:</span>
                    <span className="font-bold text-ink-deep">+₹1,200</span>
                  </div>
                )}

                <div className="flex justify-between text-steel pt-2 border-t border-hairline-soft">
                  <span>GST (CGST 2.5% + SGST 2.5%):</span>
                  <span>₹{gstAmount.toLocaleString('en-IN')}</span>
                </div>

                <div className="flex justify-between items-baseline pt-3 border-t border-hairline-soft text-ink-deep">
                  <span className="font-bold text-sm">Total Amount:</span>
                  <span className="text-2xl font-black text-ink-deep">
                    ₹{totalAmount.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-surface-soft border border-hairline-soft space-y-1.5 text-[11px] text-steel">
                <div className="flex items-center gap-1.5 text-emerald-700 font-bold">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Transparent Government Billing</span>
                </div>
                <p>Includes AC luxury coach transit, Hotel Mayura room, guided sightseeing, and all applicable state toll taxes.</p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
