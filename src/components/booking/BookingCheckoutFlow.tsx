import React, { useState, useEffect } from 'react';
import {
  Calendar, MapPin, ShieldCheck, ArrowRight, ArrowLeft,
  CreditCard, QrCode, Building2
} from 'lucide-react';
import { saveBooking } from '../../lib/bookingStore';
import type { TripPackage, BookingRecord, PassengerDetail } from '../../types/travel';

interface Props {
  trip: TripPackage;
}

export const BookingCheckoutFlow: React.FC<Props> = ({ trip }) => {
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

  // Synchronize passenger list slots whenever counts change
  useEffect(() => {
    const totalCount = adults + seniors + children;
    setPassengers((prev) => {
      const updated: PassengerDetail[] = [...prev];
      
      const requiredTypes: Array<'Adult' | 'Senior' | 'Child'> = [];
      for (let i = 0; i < adults; i++) requiredTypes.push('Adult');
      for (let i = 0; i < seniors; i++) requiredTypes.push('Senior');
      for (let i = 0; i < children; i++) requiredTypes.push('Child');

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

      return updated.map((p, idx) => ({
        ...p,
        type: requiredTypes[idx] || p.type,
      }));
    });
  }, [adults, seniors, children]);

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
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
          <div>
            <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider block">
              Official Booking
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
              {trip.title}
            </h1>
          </div>

          {/* Stepper Tabs */}
          <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 p-1 rounded-full border border-slate-200 dark:border-slate-700 text-xs font-semibold">
            <span className={`px-4 py-1.5 rounded-full transition-all ${step === 1 ? 'bg-slate-950 dark:bg-white text-white dark:text-slate-950 shadow-sm' : 'text-slate-500 dark:text-slate-400'}`}>
              01 Date & Pickup
            </span>
            <span className={`px-4 py-1.5 rounded-full transition-all ${step === 2 ? 'bg-slate-950 dark:bg-white text-white dark:text-slate-950 shadow-sm' : 'text-slate-500 dark:text-slate-400'}`}>
              02 Travellers Manifest
            </span>
            <span className={`px-4 py-1.5 rounded-full transition-all ${step === 3 ? 'bg-slate-950 dark:bg-white text-white dark:text-slate-950 shadow-sm' : 'text-slate-500 dark:text-slate-400'}`}>
              03 Review & Pay
            </span>
          </div>
        </div>

        {/* Main Grid: Form Left (8 cols) + Sticky Summary Right (4 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          <div className="lg:col-span-8 space-y-6">
            
            {/* STEP 1: DATE & PICKUP */}
            {step === 1 && (
              <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-[28px] border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                    Select Departure Schedule & Boarding Point
                  </h2>
                  <span className="text-xs text-slate-500 dark:text-slate-400">Guaranteed Government Departures</span>
                </div>

                {/* Available Date Chips */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
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
                          className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-slate-900 dark:bg-blue-600 text-white border-slate-900 dark:border-blue-600 shadow-sm'
                              : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white hover:border-slate-400'
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
                  <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
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
                          className={`w-full p-4 rounded-2xl border text-left transition-all flex items-center justify-between cursor-pointer ${
                            isSelected
                              ? 'bg-slate-50 dark:bg-slate-800 border-2 border-blue-600 dark:border-blue-400 shadow-sm'
                              : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800'
                          }`}
                        >
                          <div>
                            <div className="flex items-center gap-2 font-bold text-sm text-slate-900 dark:text-white">
                              <MapPin className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                              <span>{point.name}</span>
                            </div>
                            <span className="text-xs text-slate-500 dark:text-slate-400 block pl-6">
                              Landmark: {point.landmark}
                            </span>
                          </div>

                          <span className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-700 text-xs font-bold text-blue-600 dark:text-blue-400 border border-slate-200 dark:border-slate-600">
                            {point.time}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Hotel Room Preference */}
                <div className="space-y-2 pt-2">
                  <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                    Hotel Room Preference ({trip.hotel.name})
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setRoomType('twin')}
                      className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                        roomType === 'twin'
                          ? 'bg-slate-50 dark:bg-slate-800 border-2 border-blue-600 dark:border-blue-400 shadow-sm'
                          : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800'
                      }`}
                    >
                      <div className="font-bold text-sm text-slate-900 dark:text-white">Deluxe Twin Sharing</div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">Included in standard package tariff</div>
                    </button>
                    <button
                      type="button"
                      onClick={() => setRoomType('single_upgrade')}
                      className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                        roomType === 'single_upgrade'
                          ? 'bg-slate-50 dark:bg-slate-800 border-2 border-blue-600 dark:border-blue-400 shadow-sm'
                          : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800'
                      }`}
                    >
                      <div className="font-bold text-sm text-slate-900 dark:text-white">Private Single Room Upgrade</div>
                      <div className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold">+₹1,200 supplement</div>
                    </button>
                  </div>
                </div>

                {/* Next CTA */}
                <div className="pt-4 flex justify-end">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="px-8 py-3 rounded-full bg-slate-950 dark:bg-blue-600 hover:bg-black dark:hover:bg-blue-700 text-white font-bold text-xs shadow-sm transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <span>Proceed to Travellers Manifest</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: TRAVELLERS MANIFEST & CONTACT DETAILS */}
            {step === 2 && (
              <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-[28px] border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                  <div>
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                      Traveller Information & Manifest
                    </h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Enter details for all passengers travelling in this booking</p>
                  </div>
                  <button
                    type="button"
                    onClick={handleFillDemoData}
                    className="text-xs text-blue-600 dark:text-blue-400 hover:underline font-semibold cursor-pointer"
                  >
                    Auto-Fill Demo Family
                  </button>
                </div>

                {/* Passenger Count Counters */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-2">
                    <span className="text-xs font-bold text-slate-900 dark:text-white block">Adults (12+ yrs)</span>
                    <div className="flex items-center justify-between">
                      <button
                        type="button"
                        onClick={() => setAdults(Math.max(1, adults - 1))}
                        className="w-8 h-8 rounded-full bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 font-bold text-slate-900 dark:text-white cursor-pointer"
                      >
                        −
                      </button>
                      <span className="text-xl font-bold text-slate-900 dark:text-white">{adults}</span>
                      <button
                        type="button"
                        onClick={() => setAdults(adults + 1)}
                        className="w-8 h-8 rounded-full bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 font-bold text-slate-900 dark:text-white cursor-pointer"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-2">
                    <span className="text-xs font-bold text-slate-900 dark:text-white block">Children (5-11 yrs)</span>
                    <div className="flex items-center justify-between">
                      <button
                        type="button"
                        onClick={() => setChildren(Math.max(0, children - 1))}
                        className="w-8 h-8 rounded-full bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 font-bold text-slate-900 dark:text-white cursor-pointer"
                      >
                        −
                      </button>
                      <span className="text-xl font-bold text-slate-900 dark:text-white">{children}</span>
                      <button
                        type="button"
                        onClick={() => setChildren(children + 1)}
                        className="w-8 h-8 rounded-full bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 font-bold text-slate-900 dark:text-white cursor-pointer"
                      >
                        +
                      </button>
                    </div>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 block">30% child tariff concession</span>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-2">
                    <span className="text-xs font-bold text-slate-900 dark:text-white block">Senior Citizens (60+ yrs)</span>
                    <div className="flex items-center justify-between">
                      <button
                        type="button"
                        onClick={() => setSeniors(Math.max(0, seniors - 1))}
                        className="w-8 h-8 rounded-full bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 font-bold text-slate-900 dark:text-white cursor-pointer"
                      >
                        −
                      </button>
                      <span className="text-xl font-bold text-slate-900 dark:text-white">{seniors}</span>
                      <button
                        type="button"
                        onClick={() => setSeniors(seniors + 1)}
                        className="w-8 h-8 rounded-full bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 font-bold text-slate-900 dark:text-white cursor-pointer"
                      >
                        +
                      </button>
                    </div>
                    <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-bold block">5% senior concession</span>
                  </div>
                </div>

                {/* INDIVIDUAL PASSENGER MANIFEST FORM */}
                <div className="space-y-4 pt-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                      Individual Passenger Manifest ({passengers.length} Travellers)
                    </h3>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400">Official Government Boarding List</span>
                  </div>

                  <div className="space-y-3">
                    {passengers.map((p, idx) => (
                      <div
                        key={p.id || idx}
                        className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="w-6 h-6 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-bold flex items-center justify-center">
                              {idx + 1}
                            </span>
                            <span className="text-xs font-bold text-slate-900 dark:text-white">
                              {idx === 0 ? 'Lead Passenger (Primary Contact)' : `Passenger ${idx + 1}`}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300">
                              {p.type}
                            </span>
                            <span className="text-[10px] font-mono font-bold text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-700 px-2 py-0.5 rounded-md border border-slate-200 dark:border-slate-600">
                              {p.seatNumber}
                            </span>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                          <div className="sm:col-span-6 space-y-1">
                            <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-400">Full Name (As per Govt ID)</label>
                            <input
                              type="text"
                              value={p.name}
                              onChange={(e) => updatePassenger(idx, 'name', e.target.value)}
                              placeholder={`Passenger ${idx + 1} Full Name`}
                              className="w-full p-2.5 rounded-xl bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-xs font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-blue-500"
                              required
                            />
                          </div>

                          <div className="sm:col-span-3 space-y-1">
                            <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-400">Age</label>
                            <input
                              type="number"
                              value={p.age}
                              onChange={(e) => updatePassenger(idx, 'age', Number(e.target.value))}
                              min={1}
                              max={110}
                              className="w-full p-2.5 rounded-xl bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-xs font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-blue-500"
                              required
                            />
                          </div>

                          <div className="sm:col-span-3 space-y-1">
                            <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-400">Gender</label>
                            <select
                              value={p.gender}
                              onChange={(e) => updatePassenger(idx, 'gender', e.target.value as any)}
                              className="w-full p-2.5 rounded-xl bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-xs font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-blue-500 cursor-pointer"
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

                {/* Primary Contact Details */}
                <div className="space-y-3 pt-3 border-t border-slate-100 dark:border-slate-800">
                  <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                    Official Ticket Delivery & Contact
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">Email (For Tax Invoice & PDF)</label>
                      <input
                        type="email"
                        value={contactEmail}
                        onChange={(e) => setContactEmail(e.target.value)}
                        className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-900 dark:text-white font-semibold focus:outline-none focus:ring-2 focus:ring-blue-600"
                        required
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">WhatsApp Phone (For Instant Pass)</label>
                      <input
                        type="tel"
                        value={contactPhone}
                        onChange={(e) => setContactPhone(e.target.value)}
                        className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-900 dark:text-white font-semibold focus:outline-none focus:ring-2 focus:ring-blue-600"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Senior & Mobility Assistance */}
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="specialAssist"
                    checked={specialAssistance}
                    onChange={(e) => setSpecialAssistance(e.target.checked)}
                    className="w-4 h-4 mt-0.5 accent-blue-600 rounded cursor-pointer"
                  />
                  <label htmlFor="specialAssist" className="text-xs text-slate-700 dark:text-slate-300 cursor-pointer font-medium">
                    <strong>Senior Citizen & Mobility Support:</strong> Request lower bus berth and ground-floor room allocation at Hotel Mayura.
                  </label>
                </div>

                {/* Back / Next */}
                <div className="pt-4 flex items-center justify-between border-t border-slate-100 dark:border-slate-800">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="px-6 py-2.5 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-white font-semibold text-xs border border-slate-200 dark:border-slate-700 flex items-center gap-1.5 cursor-pointer"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="px-8 py-3 rounded-full bg-slate-950 dark:bg-blue-600 hover:bg-black dark:hover:bg-blue-700 text-white font-bold text-xs shadow-sm transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <span>Proceed to Review & Pay</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            )}

            {/* STEP 3: REVIEW & PAYMENT */}
            {step === 3 && (
              <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-[28px] border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
                <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                    Review Booking & Payment Gateway
                  </h2>
                </div>

                {/* Booking Recap */}
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div className="space-y-1">
                    <div className="text-slate-500 dark:text-slate-400 flex flex-wrap items-center gap-2 pt-0.5">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                        <span>{new Date(selectedDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                      </div>
                      <span>•</span>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                        <span>{selectedPickup.name} ({selectedPickup.time})</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-slate-900 dark:text-white block">
                      {adults} Adults {children > 0 && `· ${children} Children`} {seniors > 0 && `· ${seniors} Senior`}
                    </span>
                    <span className="text-slate-500 dark:text-slate-400">Hotel: {trip.hotel.name}</span>
                  </div>
                </div>

                {/* Manifest Summary */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Passenger Manifest</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {passengers.map((p, i) => (
                      <div key={i} className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-between">
                        <div>
                          <span className="font-bold text-slate-900 dark:text-white block">{p.name || `Passenger ${i + 1}`}</span>
                          <span className="text-[11px] text-slate-500 dark:text-slate-400">{p.gender} · {p.age} yrs · {p.type}</span>
                        </div>
                        <span className="font-mono font-bold text-xs bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded-md text-slate-800 dark:text-slate-200">
                          {p.seatNumber}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Payment Selector */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                    Payment Method
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('UPI')}
                      className={`p-4 rounded-2xl text-left border flex items-center gap-3 transition-all cursor-pointer ${
                        paymentMethod === 'UPI'
                          ? 'bg-slate-50 dark:bg-slate-800 border-2 border-blue-600 dark:border-blue-400 shadow-sm'
                          : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                      }`}
                    >
                      <QrCode className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      <div>
                        <span className="font-bold text-xs text-slate-900 dark:text-white block">UPI QR Code</span>
                        <span className="text-[10px] text-slate-500 dark:text-slate-400">GPay, PhonePe, Paytm</span>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('Card')}
                      className={`p-4 rounded-2xl text-left border flex items-center gap-3 transition-all cursor-pointer ${
                        paymentMethod === 'Card'
                          ? 'bg-slate-50 dark:bg-slate-800 border-2 border-blue-600 dark:border-blue-400 shadow-sm'
                          : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                      }`}
                    >
                      <CreditCard className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      <div>
                        <span className="font-bold text-xs text-slate-900 dark:text-white block">Debit / Credit Card</span>
                        <span className="text-[10px] text-slate-500 dark:text-slate-400">Visa, Mastercard, RuPay</span>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('NetBanking')}
                      className={`p-4 rounded-2xl text-left border flex items-center gap-3 transition-all cursor-pointer ${
                        paymentMethod === 'NetBanking'
                          ? 'bg-slate-50 dark:bg-slate-800 border-2 border-blue-600 dark:border-blue-400 shadow-sm'
                          : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                      }`}
                    >
                      <Building2 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      <div>
                        <span className="font-bold text-xs text-slate-900 dark:text-white block">Net Banking</span>
                        <span className="text-[10px] text-slate-500 dark:text-slate-400">SBI, Canara, HDFC, ICICI</span>
                      </div>
                    </button>
                  </div>
                </div>

                {/* Back / Pay Action */}
                <div className="pt-4 flex items-center justify-between border-t border-slate-100 dark:border-slate-800">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="px-6 py-2.5 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-white font-semibold text-xs border border-slate-200 dark:border-slate-700 flex items-center gap-1.5 cursor-pointer"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleCompleteBooking}
                    disabled={isProcessing}
                    className="px-10 py-3.5 rounded-full bg-slate-950 dark:bg-blue-600 hover:bg-black dark:hover:bg-blue-700 text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center gap-2 cursor-pointer"
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
            <div className="bg-white dark:bg-slate-900 p-6 rounded-[28px] border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
              <h3 className="text-base font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-3">
                Fare Breakdown (Official Tariff)
              </h3>

              <div className="space-y-2.5 text-xs">
                <div className="flex justify-between text-slate-700 dark:text-slate-300">
                  <span>Adult Fare ({adults} × ₹{trip.pricePerPerson.toLocaleString('en-IN')}):</span>
                  <span className="font-bold text-slate-900 dark:text-white">₹{adultFare.toLocaleString('en-IN')}</span>
                </div>

                {children > 0 && (
                  <div className="flex justify-between text-slate-700 dark:text-slate-300">
                    <span>Child Fare ({children} × ₹{(trip.pricePerPerson * 0.7).toLocaleString('en-IN')}):</span>
                    <span className="font-bold text-slate-900 dark:text-white">₹{childFare.toLocaleString('en-IN')}</span>
                  </div>
                )}

                {seniors > 0 && (
                  <div className="flex justify-between text-slate-700 dark:text-slate-300">
                    <span>Senior Citizens ({seniors} × ₹{trip.pricePerPerson.toLocaleString('en-IN')}):</span>
                    <span className="font-bold text-slate-900 dark:text-white">₹{seniorFare.toLocaleString('en-IN')}</span>
                  </div>
                )}

                {seniorDiscount > 0 && (
                  <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-semibold">
                    <span>Senior Concession (5%):</span>
                    <span>−₹{seniorDiscount.toLocaleString('en-IN')}</span>
                  </div>
                )}

                {roomType === 'single_upgrade' && (
                  <div className="flex justify-between text-slate-700 dark:text-slate-300">
                    <span>Single Room Supplement:</span>
                    <span className="font-bold text-slate-900 dark:text-white">+₹1,200</span>
                  </div>
                )}

                <div className="flex justify-between text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800">
                  <span>GST (CGST 2.5% + SGST 2.5%):</span>
                  <span>₹{gstAmount.toLocaleString('en-IN')}</span>
                </div>

                <div className="flex justify-between items-baseline pt-3 border-t border-slate-100 dark:border-slate-800 text-slate-900 dark:text-white">
                  <span className="font-bold text-sm">Total Amount:</span>
                  <span className="text-2xl font-black text-slate-900 dark:text-white">
                    ₹{totalAmount.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-1.5 text-[11px] text-slate-500 dark:text-slate-400">
                <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-bold">
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
