import React, { useState, useEffect } from 'react';
import {
  Ticket, Calendar, MapPin, ArrowRight, Search, X, Trash2,
  Bus, Building2, Car, Compass, PhoneCall, CheckCircle2
} from 'lucide-react';
import {
  getStoredBookings, getStoredLanguage, injectSampleDemoBookings, deleteBooking
} from '../../lib/bookingStore';
import { TRANSLATIONS } from '../../data/translations';
import type { BookingRecord, Language } from '../../types/travel';

export const MyBookingsList: React.FC = () => {
  const [lang, setLang] = useState<Language>('en');
  const [bookings, setBookings] = useState<BookingRecord[]>([]);
  const [searchPnr, setSearchPnr] = useState('');

  useEffect(() => {
    setLang(getStoredLanguage());
    setBookings(getStoredBookings());

    const langHandler = (e: any) => setLang(e.detail);
    const bookingsHandler = (e: any) => setBookings(e.detail || []);

    window.addEventListener('kstdc_lang_changed', langHandler);
    window.addEventListener('kstdc_bookings_changed', bookingsHandler);

    return () => {
      window.removeEventListener('kstdc_lang_changed', langHandler);
      window.removeEventListener('kstdc_bookings_changed', bookingsHandler);
    };
  }, []);

  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  const handleInjectDemo = () => {
    injectSampleDemoBookings();
    setBookings(getStoredBookings());
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to cancel / remove this booking record?')) {
      deleteBooking(id);
      setBookings(getStoredBookings());
    }
  };

  const filteredBookings = bookings.filter((b) => {
    if (!searchPnr.trim()) return true;
    const q = searchPnr.toLowerCase().trim();
    return (
      b.bookingId.toLowerCase().includes(q) ||
      b.tripTitle.toLowerCase().includes(q) ||
      b.destination.toLowerCase().includes(q) ||
      b.contact.name.toLowerCase().includes(q) ||
      b.contact.phone.includes(q)
    );
  });

  const getServiceIcon = (type?: string) => {
    switch (type) {
      case 'cab': return <Car className="w-4 h-4 text-purple-600" />;
      case 'activity': return <Compass className="w-4 h-4 text-emerald-600" />;
      case 'hotel': return <Building2 className="w-4 h-4 text-amber-600" />;
      default: return <Bus className="w-4 h-4 text-blue-600" />;
    }
  };

  return (
    <div className="py-8 sm:py-14 bg-canvas min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Header Strip with Demo Injector */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
          <div className="space-y-1">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-wider block">
              Citizen Digital Travel Wallet
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-950">
              {t.navMyBookings}
            </h1>
            <p className="text-xs text-slate-600">
              Access your active boarding passes, airport taxi slips, and hotel reservation vouchers.
            </p>
          </div>

          <button
            type="button"
            onClick={handleInjectDemo}
            className="self-start sm:self-center inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-slate-900 hover:bg-black text-white text-xs font-bold shadow-xs transition-all"
            title="Populate mock passes for Tour, Airport Taxi, and Ambaari activity"
          >
            <Ticket className="w-3.5 h-3.5 text-blue-400" />
            <span>Load Sample Passes (Demo)</span>
          </button>
        </div>

        {/* PNR / Booking ID Search Bar */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-3">
          <Search className="w-4 h-4 text-slate-400 shrink-0" />
          <input
            type="text"
            value={searchPnr}
            onChange={(e) => setSearchPnr(e.target.value)}
            placeholder="Search by Booking ID (e.g. KSTDC-2026-CRG-8841), passenger name, or phone..."
            className="w-full bg-transparent text-xs font-semibold text-slate-900 focus:outline-none placeholder:text-slate-400"
          />
          {searchPnr && (
            <button
              onClick={() => setSearchPnr('')}
              className="text-slate-400 hover:text-slate-700"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Bookings List */}
        {filteredBookings.length > 0 ? (
          <div className="space-y-4">
            {filteredBookings.map((booking) => (
              <div
                key={booking.bookingId}
                className="bg-white rounded-[28px] border border-slate-200 p-6 sm:p-7 shadow-xs space-y-4 hover:border-slate-300 transition-all"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center shrink-0">
                      {getServiceIcon(booking.serviceType)}
                    </div>
                    <div>
                      <span className="text-[10px] font-mono font-bold text-blue-600 uppercase tracking-wider block">
                        Ref: {booking.bookingId}
                      </span>
                      <h2 className="text-lg sm:text-xl font-bold text-slate-950">
                        {booking.tripTitle}
                      </h2>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-start sm:self-center">
                    <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
                      {booking.status}
                    </span>
                    <button
                      onClick={() => handleDelete(booking.bookingId)}
                      className="p-1 text-slate-400 hover:text-red-600 rounded-full hover:bg-red-50 transition-colors"
                      title="Cancel / Delete Record"
                      aria-label="Delete booking"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 text-xs text-slate-700">
                  <div>
                    <span className="text-slate-500 text-[11px] block">Departure / Date</span>
                    <span className="font-bold text-slate-900">
                      {new Date(booking.departureDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-500 text-[11px] block">Pickup / Reporting Point</span>
                    <span className="font-bold text-slate-900 truncate block" title={booking.pickupPoint}>
                      {booking.pickupPoint}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-500 text-[11px] block">Travellers / Guests</span>
                    <span className="font-bold text-slate-900">
                      {booking.travellers.adults} Adults {booking.travellers.seniors > 0 && `· ${booking.travellers.seniors} Senior`}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-500 text-[11px] block">Total Paid</span>
                    <span className="font-bold text-slate-900 text-sm">
                      ₹{booking.pricing.totalAmount.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                <div className="pt-3 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100">
                  <span className="text-xs text-slate-500">
                    Lead: <strong>{booking.contact.name}</strong> ({booking.contact.phone})
                  </span>

                  <a
                    href={`/confirmation?id=${booking.bookingId}`}
                    className="inline-flex items-center gap-1.5 px-5 py-2 rounded-full bg-slate-950 hover:bg-black text-white font-bold text-xs shadow-sm transition-all"
                  >
                    <span>Open Travel Companion & Ticket</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-slate-50 rounded-[32px] border border-slate-200 p-8 space-y-4 shadow-sm">
            <Ticket className="w-12 h-12 text-slate-400 mx-auto" />
            <h3 className="text-lg font-bold text-slate-900">
              {searchPnr ? 'No matching booking found' : 'No Active Bookings in Wallet'}
            </h3>
            <p className="text-xs text-slate-600 max-w-sm mx-auto">
              {searchPnr
                ? `No ticket matching "${searchPnr}". Please check your PNR reference code.`
                : 'You haven’t completed any bookings yet. Click the button below to load sample demo tickets or explore tour packages.'}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={handleInjectDemo}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-900 text-white font-bold text-xs shadow-sm hover:bg-black"
              >
                <Ticket className="w-3.5 h-3.5 text-blue-400" />
                <span>Load 3 Demo Passes</span>
              </button>
              <a
                href="/trips"
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-white border border-slate-200 text-slate-900 font-bold text-xs shadow-xs hover:bg-slate-100"
              >
                <span>Browse Tour Packages</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
