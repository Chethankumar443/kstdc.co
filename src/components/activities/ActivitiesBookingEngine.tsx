import React, { useState } from 'react';
import {
  Compass, Clock, MapPin, ShieldCheck, Check, ArrowRight,
  Users, Calendar, Ticket, CheckCircle2, Volume2
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
      <div className="bg-white rounded-[32px] border border-slate-200 shadow-lg p-6 sm:p-8 lg:p-10 space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-6">
          <div className="space-y-1">
            <span className="text-xs uppercase tracking-wider font-bold text-emerald-700 block">
              Official Spot Reservation
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
              Book City Sightseeing & Ambaari Tour
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Select time slot, open-roof double decker seating, and reserve instant digital passes.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-emerald-50 text-emerald-800 px-3.5 py-1.5 rounded-full border border-emerald-200 text-xs font-bold">
            <ShieldCheck className="w-4 h-4" />
            <span>Guaranteed Government Time-Slot</span>
          </div>
        </div>

        <form onSubmit={handleBookActivity} className="space-y-6">
          
          {/* Select Activity */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
              1. Choose Activity
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {ACTIVITIES_DATA.map((act) => (
                <div
                  key={act.id}
                  onClick={() => setSelectedActId(act.id)}
                  className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between gap-3 ${
                    selectedActId === act.id
                      ? 'border-slate-900 bg-slate-50 shadow-sm'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-200 text-slate-800">
                      {act.city}
                    </span>
                    <h3 className="font-bold text-slate-900 text-sm leading-snug mt-1">
                      {act.title}
                    </h3>
                    <p className="text-xs text-slate-500 line-clamp-2">{act.tagline}</p>
                  </div>

                  <div className="flex items-center justify-between border-t border-slate-200/60 pt-2 text-xs">
                    <span className="text-slate-500">{act.duration}</span>
                    <span className="font-bold text-slate-900">₹{act.price} / person</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Schedule & Deck Controls */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-5 rounded-2xl bg-slate-50 border border-slate-200">
            
            {/* Date */}
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-slate-700" />
                Select Date
              </label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-white border border-slate-200 text-slate-900 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-slate-900"
              />
            </div>

            {/* Time Slot with CustomSelect */}
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-slate-700" />
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
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                <Compass className="w-3.5 h-3.5 text-slate-700" />
                Deck Preference
              </label>
              <div className="grid grid-cols-2 gap-1 bg-white p-1 rounded-xl border border-slate-200">
                <button
                  type="button"
                  onClick={() => setDeckType('upper')}
                  className={`py-1.5 rounded-lg text-xs font-bold transition-all ${
                    deckType === 'upper' ? 'bg-slate-900 text-white shadow-xs' : 'text-slate-600'
                  }`}
                >
                  Upper Open
                </button>
                <button
                  type="button"
                  onClick={() => setDeckType('lower')}
                  className={`py-1.5 rounded-lg text-xs font-bold transition-all ${
                    deckType === 'lower' ? 'bg-slate-900 text-white shadow-xs' : 'text-slate-600'
                  }`}
                >
                  Lower AC
                </button>
              </div>
            </div>

            {/* Travellers Counter */}
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                <Users className="w-3.5 h-3.5 text-slate-700" />
                Traveller Count
              </label>
              <div className="flex items-center justify-between p-2 rounded-xl bg-white border border-slate-200 text-xs">
                <span className="font-semibold text-slate-800">{adults} Adults {seniors > 0 ? `· ${seniors} Sr` : ''}</span>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => setAdults(Math.max(1, adults - 1))}
                    className="w-6 h-6 rounded-md bg-slate-100 text-slate-700 font-bold flex items-center justify-center hover:bg-slate-200"
                  >
                    -
                  </button>
                  <button
                    type="button"
                    onClick={() => setAdults(adults + 1)}
                    className="w-6 h-6 rounded-md bg-slate-100 text-slate-700 font-bold flex items-center justify-center hover:bg-slate-200"
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
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                Lead Passenger Name
              </label>
              <input
                type="text"
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-900"
                required
              />
            </div>
            <div>
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                Mobile Number (for SMS Pass)
              </label>
              <input
                type="text"
                value={contactPhone}
                onChange={(e) => setContactPhone(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-900"
                required
              />
            </div>
            <div>
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                Email Address
              </label>
              <input
                type="email"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-900"
                required
              />
            </div>
          </div>

          {/* Submit & Price Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                ✓
              </div>
              <div className="text-xs">
                <span className="text-slate-500 block font-medium">Total Payable (Taxes & Audio Guide Included)</span>
                <span className="text-2xl font-bold text-slate-900">₹{totalAmount.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={isProcessing}
              className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-slate-950 hover:bg-black text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 active:scale-98 disabled:opacity-50"
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
          <div className="bg-white rounded-[32px] max-w-lg w-full border border-slate-200 shadow-2xl p-6 sm:p-8 space-y-6 text-slate-900 animate-fade-in">
            <div className="text-center space-y-2">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto text-2xl font-bold">
                ✓
              </div>
              <span className="text-xs font-mono font-bold text-emerald-700 uppercase tracking-wider block">
                Ref: {confirmedBookingId}
              </span>
              <h3 className="text-2xl font-bold text-slate-950">
                Activity Ticket Confirmed!
              </h3>
              <p className="text-xs text-slate-600">
                Your entry passes and boarding slot have been saved into your citizen travel wallet.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-2 font-medium text-slate-700">
              <div className="flex justify-between">
                <span className="text-slate-500">Activity:</span>
                <span className="text-slate-900 font-bold">{selectedActivity.title}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Date & Slot:</span>
                <span className="text-slate-900 font-bold">{selectedDate} ({selectedSlot.split(' ')[0]})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Deck:</span>
                <span className="text-slate-900 font-bold">{deckType === 'upper' ? 'Upper Open-Roof Deck' : 'Lower AC Cabin'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Boarding Point:</span>
                <span className="text-slate-900 font-bold">{selectedActivity.city === 'Mysuru' ? 'Hotel Mayura Hoysala, Mysuru' : 'Vidhana Soudha Gate 1'}</span>
              </div>
              <div className="flex justify-between border-t border-slate-200 pt-2 font-bold text-slate-950">
                <span>Total Paid:</span>
                <span>₹{totalAmount.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <a
                href="/my-bookings"
                className="flex-1 py-3 rounded-full bg-slate-950 text-white font-bold text-xs text-center shadow-sm hover:bg-black transition-colors"
              >
                View in Citizen Wallet
              </a>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="py-3 px-5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition-colors"
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
