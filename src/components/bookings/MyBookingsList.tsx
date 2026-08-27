import React, { useState, useEffect } from 'react';
import { Ticket, Calendar, MapPin, ArrowRight } from 'lucide-react';
import { getStoredBookings, getStoredLanguage } from '../../lib/bookingStore';
import { TRANSLATIONS } from '../../data/translations';
import type { BookingRecord, Language } from '../../types/travel';

export const MyBookingsList: React.FC = () => {
  const [lang, setLang] = useState<Language>('en');
  const [bookings, setBookings] = useState<BookingRecord[]>([]);

  useEffect(() => {
    setLang(getStoredLanguage());
    setBookings(getStoredBookings());

    const handler = (e: any) => setLang(e.detail);
    window.addEventListener('kstdc_lang_changed', handler);
    return () => window.removeEventListener('kstdc_lang_changed', handler);
  }, []);

  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  return (
    <div className="py-8 sm:py-14 bg-canvas min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Header */}
        <div className="border-b border-hairline-soft pb-4 space-y-1">
          <span className="text-xs font-bold text-primary-cobalt uppercase tracking-wider block">
            Citizen Travel Wallet
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-ink-deep">
            {t.navMyBookings}
          </h1>
          <p className="text-xs text-steel">
            Access active boarding passes, departure details, and travel companion guides.
          </p>
        </div>

        {/* Bookings List */}
        {bookings.length > 0 ? (
          <div className="space-y-4">
            {bookings.map((booking) => (
              <div
                key={booking.bookingId}
                className="bg-canvas rounded-[28px] border border-hairline-soft p-6 sm:p-7 shadow-sm space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-hairline-soft pb-3">
                  <div>
                    <span className="text-[10px] font-mono font-bold text-primary-cobalt uppercase tracking-wider block">
                      Ref: {booking.bookingId}
                    </span>
                    <h2 className="text-xl font-bold text-ink-deep">
                      {booking.tripTitle}
                    </h2>
                  </div>

                  <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold self-start sm:self-center">
                    {booking.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 text-xs">
                  <div>
                    <span className="text-steel text-[11px] block">Departure Date</span>
                    <span className="font-bold text-ink-deep">
                      {new Date(booking.departureDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </span>
                  </div>
                  <div>
                    <span className="text-steel text-[11px] block">Pickup Point</span>
                    <span className="font-bold text-ink-deep">{booking.pickupPoint}</span>
                  </div>
                  <div>
                    <span className="text-steel text-[11px] block">Travellers</span>
                    <span className="font-bold text-ink-deep">
                      {booking.travellers.adults} Adults {booking.travellers.seniors > 0 && `· ${booking.travellers.seniors} Senior`}
                    </span>
                  </div>
                  <div>
                    <span className="text-steel text-[11px] block">Total Paid</span>
                    <span className="font-bold text-ink-deep text-sm">
                      ₹{booking.pricing.totalAmount.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                <div className="pt-3 flex flex-wrap items-center justify-between gap-3 border-t border-hairline-soft">
                  <span className="text-xs text-steel">
                    Accommodation: <strong>{booking.hotelName}</strong>
                  </span>

                  <a
                    href={`/confirmation?id=${booking.bookingId}`}
                    className="inline-flex items-center gap-1.5 px-5 py-2 rounded-full bg-primary-cobalt hover:bg-primary-deep text-white font-bold text-xs shadow-sm transition-all"
                  >
                    <span>Open Travel Companion & Ticket</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-surface-soft rounded-[32px] border border-hairline-soft p-8 space-y-4 shadow-sm">
            <h3 className="text-lg font-bold text-ink-deep">No Bookings Found</h3>
            <p className="text-xs text-steel max-w-sm mx-auto">
              You haven’t completed any tour bookings yet. Try our flagship 2-day Coorg trip or use the trip planner.
            </p>
            <a
              href="/trips/coorg-mist-and-waterfalls"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-black text-white font-bold text-xs shadow-sm"
            >
              <span>Explore Flagship Coorg Tour</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        )}

      </div>
    </div>
  );
};
