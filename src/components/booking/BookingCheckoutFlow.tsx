import React, { useState, useEffect } from 'react';
import {
  Calendar, MapPin, Users, Building, ShieldCheck, Check, ArrowRight, ArrowLeft,
  CreditCard, QrCode, RotateCcw
} from 'lucide-react';
import { saveBooking, getStoredLanguage } from '../../lib/bookingStore';
import { TRANSLATIONS } from '../../data/translations';
import type { TripPackage, BookingRecord, Language } from '../../types/travel';

interface Props {
  trip: TripPackage;
}

export const BookingCheckoutFlow: React.FC<Props> = ({ trip }) => {
  const [lang, setLang] = useState<Language>('en');
  const [step, setStep] = useState<1 | 2 | 3>(1);

  // Step 1: Schedule & Boarding
  const [selectedDate, setSelectedDate] = useState<string>(trip.departureSchedule.availableDates[0] || '2026-08-29');
  const [selectedPickup, setSelectedPickup] = useState(trip.pickupPoints[0]);

  // Step 2: Travellers & Contact
  const [adults, setAdults] = useState<number>(2);
  const [children, setChildren] = useState<number>(0);
  const [seniors, setSeniors] = useState<number>(0);
  const [specialAssistance, setSpecialAssistance] = useState<boolean>(false);
  const [roomType, setRoomType] = useState<'twin' | 'single_upgrade'>('twin');

  const [contactName, setContactName] = useState('Ananya Rao');
  const [contactEmail, setContactEmail] = useState('ananya.rao@example.com');
  const [contactPhone, setContactPhone] = useState('+91 98450 12345');

  // Step 3: Payment
  const [paymentMethod, setPaymentMethod] = useState<'UPI' | 'Card' | 'NetBanking'>('UPI');
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    setLang(getStoredLanguage());
    const handler = (e: any) => setLang(e.detail);
    window.addEventListener('kstdc_lang_changed', handler);

    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const d = params.get('date');
      if (d) setSelectedDate(d);
    }

    return () => window.removeEventListener('kstdc_lang_changed', handler);
  }, []);

  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  // Price calculations
  const adultFare = adults * trip.pricePerPerson;
  const childFare = children * (trip.pricePerPerson * 0.7);
  const seniorFare = seniors * trip.pricePerPerson;
  const basePrice = adultFare + childFare + seniorFare;
  const seniorDiscount = seniors > 0 ? seniorFare * 0.05 : 0;
  const roomUpgradeFee = roomType === 'single_upgrade' ? 1200 : 0;
  const gstAmount = (basePrice - seniorDiscount + roomUpgradeFee) * 0.05;
  const totalAmount = Math.round(basePrice - seniorDiscount + roomUpgradeFee + gstAmount);

  const handleFillDemoData = () => {
    setAdults(2);
    setChildren(1);
    setSeniors(1);
    setSpecialAssistance(true);
    setContactName('Vikram Somanna');
    setContactEmail('vikram.somanna@gmail.com');
    setContactPhone('+91 94801 88990');
  };

  const handleCompleteBooking = () => {
    setIsProcessing(true);

    const bookingId = `KSTDC-2026-${trip.slug.substring(0, 3).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;

    const newBooking: BookingRecord = {
      bookingId,
      createdAt: new Date().toISOString(),
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

          {/* Stepper Tabs (DESIGN-meta button-pill-tab) */}
          <div className="flex items-center gap-1.5 bg-surface-soft p-1 rounded-full border border-hairline-soft text-xs font-semibold">
            <span className={`px-4 py-1.5 rounded-full transition-all ${step === 1 ? 'bg-black text-white shadow-sm' : 'text-steel'}`}>
              01 Date
            </span>
            <span className={`px-4 py-1.5 rounded-full transition-all ${step === 2 ? 'bg-black text-white shadow-sm' : 'text-steel'}`}>
              02 Travellers
            </span>
            <span className={`px-4 py-1.5 rounded-full transition-all ${step === 3 ? 'bg-black text-white shadow-sm' : 'text-steel'}`}>
              03 Payment
            </span>
          </div>
        </div>

        {/* 2-Column Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Wizard Form */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* STEP 1: DATE & BOARDING */}
            {step === 1 && (
              <div className="bg-canvas p-6 sm:p-8 rounded-[28px] border border-hairline-soft shadow-sm space-y-6">
                <div className="flex items-center justify-between border-b border-hairline-soft pb-3">
                  <h2 className="text-xl font-bold text-ink-deep">
                    {t.step1Title}
                  </h2>
                  <button
                    onClick={handleFillDemoData}
                    className="text-xs font-bold text-primary-cobalt hover:underline"
                  >
                    Auto-Fill Demo
                  </button>
                </div>

                {/* Available Dates */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-steel uppercase tracking-wider block">
                    Departure Dates (Volvo AC Coach)
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                    {trip.departureSchedule.availableDates.map((dStr) => {
                      const dateObj = new Date(dStr);
                      const isSel = selectedDate === dStr;
                      return (
                        <button
                          key={dStr}
                          type="button"
                          onClick={() => setSelectedDate(dStr)}
                          className={`p-3.5 rounded-2xl text-left border text-xs transition-all ${
                            isSel
                              ? 'bg-black text-white border-black shadow-sm'
                              : 'bg-surface-soft text-ink border-hairline-soft hover:bg-neutral-200'
                          }`}
                        >
                          <span className="text-[10px] uppercase font-semibold opacity-70 block">
                            {dateObj.toLocaleDateString('en-IN', { weekday: 'short' })}
                          </span>
                          <span className="text-sm font-bold block">
                            {dateObj.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                          </span>
                          <span className={`text-[10px] font-medium mt-0.5 block ${isSel ? 'text-white/80' : 'text-emerald-700'}`}>
                            ● Available
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Departure / Pickup Points */}
                <div className="space-y-2 pt-4 border-t border-hairline-soft">
                  <label className="text-xs font-bold text-steel uppercase tracking-wider block">
                    {t.selectPickup}
                  </label>
                  <div className="space-y-2">
                    {trip.pickupPoints.map((point) => {
                      const isSel = selectedPickup.name === point.name;
                      return (
                        <button
                          key={point.name}
                          type="button"
                          onClick={() => setSelectedPickup(point)}
                          className={`w-full p-4 rounded-2xl text-left border flex items-center justify-between transition-all ${
                            isSel
                              ? 'bg-surface-soft border-2 border-primary-cobalt text-ink-deep'
                              : 'bg-canvas border-hairline-soft text-charcoal hover:bg-surface-soft'
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

                {/* Next CTA */}
                <div className="pt-4 flex justify-end">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="px-8 py-3 rounded-full bg-black hover:bg-neutral-800 text-white font-bold text-xs shadow-sm transition-all flex items-center gap-2"
                  >
                    <span>Proceed to Travellers</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: TRAVELLERS & CONTACT */}
            {step === 2 && (
              <div className="bg-canvas p-6 sm:p-8 rounded-[28px] border border-hairline-soft shadow-sm space-y-6">
                <div className="border-b border-hairline-soft pb-3">
                  <h2 className="text-xl font-bold text-ink-deep">
                    {t.step2Title}
                  </h2>
                </div>

                {/* Counter Grid */}
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

                {/* Primary Contact Details */}
                <div className="space-y-3 pt-3 border-t border-hairline-soft">
                  <h3 className="text-xs font-bold text-ink-deep uppercase tracking-wider">
                    Primary Passenger Information
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="space-y-1">
                      <label className="text-[11px] font-semibold text-steel">Full Name</label>
                      <input
                        type="text"
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        className="w-full p-3 rounded-xl bg-surface-soft border border-hairline-soft text-xs sm:text-sm text-ink font-semibold focus:outline-none focus:ring-2 focus:ring-primary-cobalt"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[11px] font-semibold text-steel">Email</label>
                      <input
                        type="email"
                        value={contactEmail}
                        onChange={(e) => setContactEmail(e.target.value)}
                        className="w-full p-3 rounded-xl bg-surface-soft border border-hairline-soft text-xs sm:text-sm text-ink font-semibold focus:outline-none focus:ring-2 focus:ring-primary-cobalt"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[11px] font-semibold text-steel">WhatsApp Phone</label>
                      <input
                        type="tel"
                        value={contactPhone}
                        onChange={(e) => setContactPhone(e.target.value)}
                        className="w-full p-3 rounded-xl bg-surface-soft border border-hairline-soft text-xs sm:text-sm text-ink font-semibold focus:outline-none focus:ring-2 focus:ring-primary-cobalt"
                      />
                    </div>
                  </div>
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

                {/* Recap */}
                <div className="p-4 rounded-2xl bg-surface-soft border border-hairline-soft flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div className="space-y-1">
                    <span className="font-bold text-ink-deep text-sm block">{trip.title}</span>
                    <span className="text-steel">
                      📅 {new Date(selectedDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })} · 📍 {selectedPickup.name} ({selectedPickup.time})
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-ink-deep block">
                      {adults} Adults {children > 0 && `· ${children} Children`} {seniors > 0 && `· ${seniors} Senior`}
                    </span>
                    <span className="text-steel">Hotel: {trip.hotel.name}</span>
                  </div>
                </div>

                {/* Simulated Payment Selector */}
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
                        <span className="font-bold text-xs text-ink-deep block">Card Payment</span>
                        <span className="text-[10px] text-steel">Debit / Credit</span>
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
                      <Building className="w-5 h-5 text-primary-cobalt" />
                      <div>
                        <span className="font-bold text-xs text-ink-deep block">Net Banking</span>
                        <span className="text-[10px] text-steel">All Indian Banks</span>
                      </div>
                    </button>
                  </div>
                </div>

                {/* UPI QR Display */}
                {paymentMethod === 'UPI' && (
                  <div className="p-5 rounded-2xl bg-surface-soft border border-hairline-soft flex flex-col sm:flex-row items-center gap-4 text-xs">
                    <div className="w-24 h-24 bg-white p-2 rounded-xl border border-hairline-soft flex items-center justify-center shrink-0">
                      <div className="w-full h-full bg-black text-white flex items-center justify-center font-mono font-bold text-base rounded-lg">
                        QR
                      </div>
                    </div>
                    <div className="space-y-1 text-center sm:text-left">
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                        KSTDC Merchant QR Simulation
                      </span>
                      <h4 className="text-sm font-bold text-ink-deep">Scan & Pay ₹{totalAmount.toLocaleString('en-IN')}</h4>
                      <p className="text-steel text-xs">
                        Clicking the button below confirms booking and generates your digital boarding pass.
                      </p>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
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
                    className="px-8 py-3.5 rounded-full bg-primary-cobalt hover:bg-primary-deep text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center gap-2"
                  >
                    {isProcessing ? (
                      <>
                        <RotateCcw className="w-4 h-4 animate-spin text-white" />
                        <span>Confirming Reservation...</span>
                      </>
                    ) : (
                      <span>Pay ₹{totalAmount.toLocaleString('en-IN')} & Confirm</span>
                    )}
                  </button>
                </div>

              </div>
            )}

          </div>

          {/* Price Summary Rail */}
          <div className="lg:col-span-4 sticky top-22 space-y-4">
            <div className="bg-canvas p-6 rounded-[28px] border border-hairline-soft shadow-meta-sticky space-y-4">
              <h3 className="text-base font-bold text-ink-deep border-b border-hairline-soft pb-3">
                {t.fareSummary}
              </h3>

              <div className="space-y-2.5 text-xs text-charcoal">
                <div className="flex justify-between">
                  <span>Adults ({adults} × ₹{trip.pricePerPerson.toLocaleString('en-IN')})</span>
                  <span className="font-bold text-ink-deep">₹{adultFare.toLocaleString('en-IN')}</span>
                </div>

                {children > 0 && (
                  <div className="flex justify-between">
                    <span>Children ({children} × 70%)</span>
                    <span className="font-bold text-ink-deep">₹{Math.round(childFare).toLocaleString('en-IN')}</span>
                  </div>
                )}

                {seniors > 0 && (
                  <div className="flex justify-between">
                    <span>Seniors ({seniors} × ₹{trip.pricePerPerson.toLocaleString('en-IN')})</span>
                    <span className="font-bold text-ink-deep">₹{seniorFare.toLocaleString('en-IN')}</span>
                  </div>
                )}

                {seniorDiscount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-bold">
                    <span>Senior Concession (5%)</span>
                    <span>−₹{Math.round(seniorDiscount).toLocaleString('en-IN')}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Government GST (5%)</span>
                  <span className="font-bold text-ink-deep">₹{Math.round(gstAmount).toLocaleString('en-IN')}</span>
                </div>
              </div>

              <div className="pt-4 border-t border-hairline-soft flex items-baseline justify-between">
                <div>
                  <span className="text-xs font-bold text-ink-deep block">{t.totalPayable}</span>
                  <span className="text-[11px] text-emerald-700 font-semibold">Taxes & Permits Included</span>
                </div>
                <span className="text-2xl font-bold text-ink-deep">
                  ₹{totalAmount.toLocaleString('en-IN')}
                </span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
