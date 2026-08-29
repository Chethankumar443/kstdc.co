import React, { useState } from 'react';
import {
  Compass, Clock, ShieldCheck, ArrowRight,
  Users, Calendar
} from 'lucide-react';
import { ACTIVITIES_DATA } from '../../data/activitiesData';
import { saveBooking } from '../../lib/bookingStore';
import { CustomSelect } from '../common/CustomSelect';
import type { BookingRecord } from '../../types/travel';

export const ActivitiesBookingEngine: React.FC = () => {
  const [selectedActId, setSelectedActId] = useState(ACTIVITIES_DATA[0].id);
  const [selectedDate, setSelectedDate] = useState('2026-08-31');
  const [selectedSlot, setSelectedSlot] = useState('06:30 PM - 08:00 PM (Palace Illumination Special)');
  const [deckType, setDeckType] = useState<'upper' | 'lower'>('upper');
  const [adults, setAdults] = useState(2);
  const [seniors, setSeniors] = useState(0);
  const [children, setChildren] = useState(0);

  const [contactName, setContactName] = useState('Vikram Somanna');
  const [contactPhone, setContactPhone] = useState('+91 94801 88990');
  const [contactEmail, setContactEmail] = useState('vikram.somanna@gmail.com');

  const [isProcessing, setIsProcessing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [confirmedBookingId, setConfirmedBookingId] = useState<string | null>(null);

  const selectedActivity = ACTIVITIES_DATA.find((a) => a.id === selectedActId) || ACTIVITIES_DATA[0];

  const slotOptions = [
    { value: '06:30 PM - 08:00 PM (Palace Illumination Special)', label: '06:30 PM (Palace Illumination Special)' },
    { value: '08:00 PM - 09:30 PM (City Night Lights)', label: '08:00 PM (City Night Lights Tour)' },
    { value: '09:30 AM - 11:30 AM (Morning Heritage Walk)', label: '09:30 AM (Morning Heritage Tour)' },
    { value: '03:30 PM - 05:30 PM (Afternoon Architectural Tour)', label: '03:30 PM (Afternoon Architectural Tour)' },
  ];

  const deckSurcharge = deckType === 'upper' && selectedActivity.id === 'act-ambaari-mysore' ? 50 : 0;
  const unitPrice = selectedActivity.price + deckSurcharge;
  const basePrice = (adults * unitPrice) + (seniors * unitPrice) + (children * (unitPrice * 0.5));
  const seniorDiscount = seniors > 0 ? seniors * unitPrice * 0.05 : 0;
  const gst = Math.round((basePrice - seniorDiscount) * 0.05);
  const totalAmount = Math.round(basePrice - seniorDiscount + gst);

  const handleBookActivity = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    const bookingId = `KSTDC-ACT-${selectedActivity.city.substring(0, 3).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;

    const activityBooking: BookingRecord = {
      bookingId,
      createdAt: new Date().toISOString(),
      serviceType: 'activity',
      tripId: selectedActivity.id,
      tripTitle: `${selectedActivity.title} (${deckType === 'upper' ? 'Upper Open Deck' : 'Standard Deck'})`,
      tripSlug: 'activities',
      destination: selectedActivity.city,
      departureDate: selectedDate,
      pickupPoint: selectedActivity.city === 'Mysuru' ? 'Hotel Mayura Hoysala, JLB Road, Mysuru' : 'Vidhana Soudha Gate 1, Bengaluru',
      pickupTime: selectedSlot.split(' ')[0],
      vehicleType: selectedActivity.id === 'act-ambaari-mysore' ? 'Ambaari Open-Roof Double-Decker Coach' : 'Certified Guided Walking Tour',
      hotelName: 'Official KSTDC City Experiences',
      travellers: { adults, children, seniors },
      passengers: Array.from({ length: adults + seniors + children }).map((_, idx) => ({
        id: `amb-seat-${idx + 1}`,
        name: idx === 0 ? contactName : `Guest ${idx + 1}`,
        age: 30,
        gender: idx % 2 === 0 ? 'Male' : 'Female',
        type: idx === 0 ? 'Adult' : (idx < adults ? 'Adult' : (idx < adults + seniors ? 'Senior (60+)' : 'Child (5-12)')),
        seatNumber: `${deckType === 'upper' ? 'UD' : 'LD'}-${10 + idx}`,
      })),
      contact: {
        name: contactName,
        email: contactEmail,
        phone: contactPhone,
        specialAssistance: false,
      },
      roomType: deckType === 'upper' ? 'Upper Open-Roof Panoramic Deck' : 'Lower AC Cabin',
      pricing: {
        basePrice,
        seniorDiscount,
        gstAmount: gst,
        totalAmount,
      },
      status: 'Confirmed',
      paymentMethod: 'UPI',
      extraDetails: {
        scheduleSlot: selectedSlot,
        deckType: deckType === 'upper' ? 'Upper Open Deck' : 'Lower Deck',
        audioGuide: 'Included in Ticket',
      },
    };

    saveBooking(activityBooking);

    setTimeout(() => {
      setIsProcessing(false);
      setConfirmedBookingId(bookingId);
      setIsModalOpen(true);
    }, 600);
  };

  return (
    <div className="space-y-12">
      
      {/* Interactive Slot Selector & Booking Flow */}
      <div className="bg-white dark:bg-slate-900 rounded-[32px] border border-slate-200 dark:border-slate-800 shadow-lg p-6 sm:p-8 lg:p-10 space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-6">
          <div className="space-y-1">
            <span className="text-xs uppercase tracking-wider font-bold text-emerald-600 dark:text-emerald-400 block">
              Official Spot Reservation
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              Book City Sightseeing & Ambaari Tour
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              Select time slot, open-roof double decker seating, and reserve instant digital passes.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 px-3.5 py-1.5 rounded-full border border-emerald-200 dark:border-emerald-800 text-xs font-bold">
            <ShieldCheck className="w-4 h-4" />
            <span>Guaranteed Government Time-Slot</span>
          </div>
        </div>

        <form onSubmit={handleBookActivity} className="space-y-6">
          
          {/* Select Activity */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider block">
              1. Choose Activity
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {ACTIVITIES_DATA.map((act) => (
                <div
                  key={act.id}
                  onClick={() => setSelectedActId(act.id)}
                  className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between gap-3 ${
                    selectedActId === act.id
                      ? 'border-slate-900 dark:border-white bg-slate-50 dark:bg-slate-800 shadow-sm'
                      : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 bg-white dark:bg-slate-800/60'
                  }`}
                >
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200">
                      {act.city}
                    </span>
                    <h3 className="font-bold text-slate-900 dark:text-white text-sm leading-snug mt-1">
                      {act.title}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">{act.tagline}</p>
                  </div>

                  <div className="flex items-center justify-between border-t border-slate-200/60 dark:border-slate-700 pt-2 text-xs">
                    <span className="text-slate-500 dark:text-slate-400">{act.duration}</span>
                    <span className="font-bold text-slate-900 dark:text-white">₹{act.price} / person</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Schedule & Deck Controls */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
            
            {/* Date */}
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-slate-700 dark:text-slate-300" />
                Select Date
              </label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-900 dark:text-white text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-blue-500"
              />
            </div>

            {/* Time Slot with CustomSelect */}
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-slate-700 dark:text-slate-300" />
                Departure Slot
              </label>
              <CustomSelect
                value={selectedSlot}
                onChange={setSelectedSlot}
                options={slotOptions}
                placeholder="Select Departure Slot"
              />
            </div>

            {/* Deck Selection (For Ambaari) */}
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1">
                <Compass className="w-3.5 h-3.5 text-slate-700 dark:text-slate-300" />
                Deck Preference
              </label>
              <div className="grid grid-cols-2 gap-1 bg-white dark:bg-slate-700 p-1 rounded-xl border border-slate-200 dark:border-slate-600">
                <button
                  type="button"
                  onClick={() => setDeckType('upper')}
                  className={`py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    deckType === 'upper' ? 'bg-slate-900 dark:bg-blue-600 text-white shadow-xs' : 'text-slate-600 dark:text-slate-300'
                  }`}
                >
                  Upper Open
                </button>
                <button
                  type="button"
                  onClick={() => setDeckType('lower')}
                  className={`py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    deckType === 'lower' ? 'bg-slate-900 dark:bg-blue-600 text-white shadow-xs' : 'text-slate-600 dark:text-slate-300'
                  }`}
                >
                  Lower AC
                </button>
              </div>
            </div>

            {/* Travellers Counter */}
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1">
                <Users className="w-3.5 h-3.5 text-slate-700 dark:text-slate-300" />
                Traveller Count
              </label>
              <div className="flex items-center justify-between p-2 rounded-xl bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-xs">
                <span className="font-semibold text-slate-800 dark:text-slate-200">{adults} Adults {seniors > 0 ? `· ${seniors} Sr` : ''}</span>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => setAdults(Math.max(1, adults - 1))}
                    className="w-6 h-6 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold flex items-center justify-center hover:bg-slate-200 dark:hover:bg-slate-600 cursor-pointer"
                  >
                    -
                  </button>
                  <button
                    type="button"
                    onClick={() => setAdults(adults + 1)}
                    className="w-6 h-6 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold flex items-center justify-center hover:bg-slate-200 dark:hover:bg-slate-600 cursor-pointer"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

          </div>

          {/* Passenger Details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1">
                Lead Passenger Name
              </label>
              <input
                type="text"
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-900 dark:text-white"
                required
              />
            </div>
            <div>
              <label className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1">
                Mobile Number (for SMS Pass)
              </label>
              <input
                type="text"
                value={contactPhone}
                onChange={(e) => setContactPhone(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-900 dark:text-white"
                required
              />
            </div>
            <div>
              <label className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1">
                Email Address
              </label>
              <input
                type="email"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-900 dark:text-white"
                required
              />
            </div>
          </div>

          {/* Submit & Price Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 flex items-center justify-center font-bold">
                ✓
              </div>
              <div className="text-xs">
                <span className="text-slate-500 dark:text-slate-400 block font-medium">Total Payable (Taxes & Audio Guide Included)</span>
                <span className="text-2xl font-bold text-slate-900 dark:text-white">₹{totalAmount.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={isProcessing}
              className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-slate-950 dark:bg-blue-600 hover:bg-black dark:hover:bg-blue-700 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
            >
              {isProcessing ? (
                <span>Confirming Slot...</span>
              ) : (
                <>
                  <span>Reserve Activity Pass</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>

        </form>
      </div>

      {/* Confirmation Modal */}
      {isModalOpen && confirmedBookingId && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6">
          <div className="bg-white dark:bg-slate-900 rounded-[32px] max-w-lg w-full border border-slate-200 dark:border-slate-800 shadow-2xl p-6 sm:p-8 space-y-6 text-slate-900 dark:text-white animate-fade-in">
            <div className="text-center space-y-2">
              <div className="w-14 h-14 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 flex items-center justify-center mx-auto text-2xl font-bold">
                ✓
              </div>
              <span className="text-xs font-mono font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider block">
                Ref: {confirmedBookingId}
              </span>
              <h3 className="text-2xl font-bold text-slate-950 dark:text-white">
                Activity Ticket Confirmed!
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Your entry passes and boarding slot have been saved into your citizen travel wallet.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs space-y-2 font-medium text-slate-700 dark:text-slate-300">
              <div className="flex justify-between">
                <span className="text-slate-500 dark:text-slate-400">Activity:</span>
                <span className="text-slate-900 dark:text-white font-bold">{selectedActivity.title}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 dark:text-slate-400">Date & Slot:</span>
                <span className="text-slate-900 dark:text-white font-bold">{selectedDate} ({selectedSlot.split(' ')[0]})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 dark:text-slate-400">Deck:</span>
                <span className="text-slate-900 dark:text-white font-bold">{deckType === 'upper' ? 'Upper Open-Roof Deck' : 'Lower AC Cabin'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 dark:text-slate-400">Boarding Point:</span>
                <span className="text-slate-900 dark:text-white font-bold">{selectedActivity.city === 'Mysuru' ? 'Hotel Mayura Hoysala, Mysuru' : 'Vidhana Soudha Gate 1'}</span>
              </div>
              <div className="flex justify-between border-t border-slate-200 dark:border-slate-700 pt-2 font-bold text-slate-900 dark:text-white">
                <span>Total Paid:</span>
                <span>₹{totalAmount.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <a
                href="/my-bookings"
                className="flex-1 py-3 rounded-full bg-slate-950 dark:bg-blue-600 text-white font-bold text-xs text-center shadow-sm hover:bg-black dark:hover:bg-blue-700 transition-colors"
              >
                View in Citizen Wallet
              </a>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="py-3 px-5 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs transition-colors cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
