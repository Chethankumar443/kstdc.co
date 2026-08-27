import React, { useState, useEffect } from 'react';
import {
  CheckCircle2, MapPin, Calendar, Clock, Download, Share2,
  Volume2, ExternalLink
} from 'lucide-react';
import { getBookingById, getStoredBookings, getStoredLanguage } from '../../lib/bookingStore';
import { TRANSLATIONS } from '../../data/translations';
import type { BookingRecord, Language } from '../../types/travel';

interface Props {
  bookingId: string;
}

export const ConfirmationCompanion: React.FC<Props> = ({ bookingId }) => {
  const [lang, setLang] = useState<Language>('en');
  const [booking, setBooking] = useState<BookingRecord | null>(null);

  useEffect(() => {
    setLang(getStoredLanguage());
    
    let targetId = bookingId;
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const queryId = urlParams.get('id');
      if (queryId) {
        targetId = queryId;
      } else {
        const parts = window.location.pathname.split('/').filter(Boolean);
        const last = parts[parts.length - 1];
        if (last && last !== 'confirmation') {
          targetId = last;
        }
      }
    }

    let b = getBookingById(targetId);
    
    if (!b) {
      const all = getStoredBookings();
      if (all.length > 0) {
        b = all[0];
      }
    }

    if (!b) {
      b = {
        bookingId: 'KSTDC-2026-CRG-8841',
        createdAt: new Date().toISOString(),
        tripId: 'kstdc-coorg-2d',
        tripTitle: 'Coorg Mist & Coffee Estates (2 Days)',
        tripSlug: 'coorg-mist-and-waterfalls',
        destination: 'Coorg (Madikeri)',
        departureDate: '2026-08-29',
        pickupPoint: 'Yeshwanthpur BMTC Bus Station',
        pickupTime: '06:00 AM',
        vehicleType: 'Volvo AC Multi-Axle Luxury Coach (45-Seater)',
        hotelName: 'Hotel Mayura Valley View',
        travellers: { adults: 2, children: 1, seniors: 1 },
        contact: {
          name: 'Vikram Somanna',
          email: 'vikram.somanna@gmail.com',
          phone: '+91 94801 88990',
          specialAssistance: true,
        },
        roomType: 'Twin Sharing Deluxe Room (Included)',
        pricing: {
          basePrice: 16467,
          seniorDiscount: 249,
          gstAmount: 810,
          totalAmount: 17028,
        },
        status: 'Confirmed',
        paymentMethod: 'UPI',
      };
    }

    setBooking(b);
  }, [bookingId]);

  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  const playPhrase = (phraseText: string) => {
    if ('speechSynthesis' in window) {
      const utter = new SpeechSynthesisUtterance(phraseText);
      utter.rate = 0.9;
      window.speechSynthesis.speak(utter);
    }
  };

  const handleDownloadTicket = () => {
    window.print();
  };

  const handleCalendarDownload = () => {
    if (!booking) return;
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//KSTDC Karnataka Tourism//Travel Ticket//EN
BEGIN:VEVENT
SUMMARY:KSTDC Tour: ${booking.tripTitle}
DESCRIPTION:Boarding at ${booking.pickupPoint} (${booking.pickupTime}). Hotel: ${booking.hotelName}. Booking Ref: ${booking.bookingId}
DTSTART:${booking.departureDate.replace(/-/g, '')}T060000Z
DTEND:${booking.departureDate.replace(/-/g, '')}T220000Z
LOCATION:${booking.pickupPoint}, Bengaluru
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', `${booking.bookingId}-kstdc-trip.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleWhatsAppShare = () => {
    if (!booking) return;
    const msg = encodeURIComponent(`I just booked our Karnataka trip with KSTDC!\n\nTour: ${booking.tripTitle}\nDeparture: ${booking.departureDate} at ${booking.pickupTime}\nPickup: ${booking.pickupPoint}\nHotel: ${booking.hotelName}\nBooking Reference: ${booking.bookingId}`);
    window.open(`https://wa.me/?text=${msg}`, '_blank');
  };

  if (!booking) {
    return (
      <div className="py-20 text-center space-y-4">
        <h2 className="text-xl font-bold text-ink">Booking Reference {bookingId}</h2>
        <p className="text-xs text-steel">Loading your travel companion details...</p>
      </div>
    );
  }

  const kannadaPhrases = [
    { kannada: 'ನಮಸ್ಕಾರ (Namaskara)', english: 'Hello / Greetings' },
    { kannada: 'ಊಟ ಆಯ್ತಾ? (Oota aayitha?)', english: 'Have you had your meal?' },
    { kannada: 'ಇದು ಎಷ್ಟು? (Idhu eshtu?)', english: 'How much does this cost?' },
    { kannada: 'ಧನ್ಯವಾದಗಳು (Dhanyavadagalu)', english: 'Thank you' },
    { kannada: 'ತುಂಬಾ ಚೆನ್ನಾಗಿದೆ (Tumba chennagide)', english: 'It is very good' },
  ];

  return (
    <div className="py-8 sm:py-14 bg-canvas min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Reassuring Confirmation Hero (DESIGN-meta card-promo-strip) */}
        <div className="bg-ink-deep p-8 sm:p-12 rounded-[32px] text-white text-center space-y-5">
          
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-white/10 backdrop-blur-md text-white text-xs font-semibold">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Official KSTDC Reservation</span>
          </div>

          <div className="space-y-2">
            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
              {t.confirmationTitle}
            </h1>
            <p className="text-xs sm:text-sm text-white/80 max-w-lg mx-auto leading-relaxed">
              {t.confirmationSub}
            </p>
          </div>

          {/* Reference Badge */}
          <div className="p-4 rounded-2xl bg-white/10 border border-white/15 max-w-sm mx-auto flex items-center justify-between text-left">
            <div>
              <span className="text-[10px] text-white/70 uppercase tracking-wider block font-bold">
                {t.bookingRef}
              </span>
              <span className="text-lg font-mono font-bold text-white">
                {booking.bookingId}
              </span>
            </div>
            <span className="px-3 py-1 rounded-full bg-emerald-500 text-black text-xs font-bold">
              Confirmed
            </span>
          </div>

          {/* Action Pills */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={handleDownloadTicket}
              className="px-6 py-3 rounded-full bg-white hover:bg-neutral-100 text-black font-bold text-xs shadow-sm transition-all flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              <span>{t.downloadTicketBtn}</span>
            </button>

            <button
              onClick={handleCalendarDownload}
              className="px-6 py-3 rounded-full bg-transparent hover:bg-white/10 text-white font-bold text-xs border border-white/30 transition-all flex items-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              <span>{t.addToCalendarBtn}</span>
            </button>

            <button
              onClick={handleWhatsAppShare}
              className="px-6 py-3 rounded-full bg-transparent hover:bg-white/10 text-white font-bold text-xs border border-white/30 transition-all flex items-center gap-2"
            >
              <Share2 className="w-4 h-4" />
              <span>{t.whatsappShareBtn}</span>
            </button>
          </div>

        </div>

        {/* Digital Boarding Pass Ticket */}
        <div className="bg-canvas rounded-[28px] border border-hairline-soft p-6 sm:p-8 shadow-sm space-y-6">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-hairline-soft pb-4">
            <div>
              <span className="text-[11px] font-bold text-primary-cobalt uppercase tracking-wider block">
                Digital Boarding Pass
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-ink-deep">
                {booking.tripTitle}
              </h2>
            </div>
            <div className="text-right">
              <span className="text-xs text-steel block">Coach</span>
              <span className="font-bold text-xs text-ink-deep">{booking.vehicleType}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
            <div>
              <span className="text-steel block text-[11px]">Departure Date</span>
              <span className="font-bold text-ink-deep">
                {new Date(booking.departureDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
              </span>
            </div>
            <div>
              <span className="text-steel block text-[11px]">Boarding Time</span>
              <span className="font-bold text-primary-cobalt">
                {booking.pickupTime}
              </span>
            </div>
            <div>
              <span className="text-steel block text-[11px]">Lead Passenger</span>
              <span className="font-bold text-ink-deep">{booking.contact.name}</span>
            </div>
            <div>
              <span className="text-steel block text-[11px]">Accommodation</span>
              <span className="font-bold text-ink-deep">{booking.hotelName}</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-surface-soft border border-hairline-soft flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2.5">
              <MapPin className="w-4 h-4 text-primary-cobalt shrink-0" />
              <div>
                <span className="font-bold text-ink-deep block">{booking.pickupPoint}</span>
                <span className="text-steel text-[11px]">Please arrive 15 minutes prior to scheduled departure.</span>
              </div>
            </div>
            <a
              href={`https://maps.google.com/?q=${encodeURIComponent(booking.pickupPoint + ' Bengaluru')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold text-primary-cobalt hover:underline flex items-center gap-1 shrink-0"
            >
              <span>{t.viewPickupMap}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

        </div>

        {/* Travel Companion Guidance Modules */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Weather & Packing Advisory */}
          <div className="bg-canvas p-6 rounded-[28px] border border-hairline-soft shadow-sm space-y-3">
            <span className="text-xs font-bold text-primary-cobalt uppercase tracking-wider block">
              Destination Guidance
            </span>
            <h3 className="text-lg font-bold text-ink-deep">
              Madikeri, Coorg (19°C · Cool & Breezy)
            </h3>
            <p className="text-xs text-steel leading-relaxed">
              Pleasant daytime temperatures with cool morning and evening breezes. Light shawls recommended.
            </p>
            <div className="space-y-2 pt-1 text-xs text-charcoal">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary-cobalt" />
                <span>Carry a light jacket or sweater for morning halts</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary-cobalt" />
                <span>Comfortable footwear for estate walks and viewpoints</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary-cobalt" />
                <span>Original government photo ID required at hotel check-in</span>
              </div>
            </div>
          </div>

          {/* Local Kannada Travel Phrases */}
          <div className="bg-canvas p-6 rounded-[28px] border border-hairline-soft shadow-sm space-y-3">
            <span className="text-xs font-bold text-steel uppercase tracking-wider block">
              {t.audioGuideTitle}
            </span>
            <h3 className="text-lg font-bold text-ink-deep">
              Helpful Local Phrases
            </h3>
            <div className="space-y-1.5">
              {kannadaPhrases.map((phrase, i) => (
                <div
                  key={i}
                  className="p-2.5 rounded-xl bg-surface-soft border border-hairline-soft flex items-center justify-between text-xs"
                >
                  <div>
                    <span className="font-bold text-ink-deep block">{phrase.kannada}</span>
                    <span className="text-[11px] text-steel">{phrase.english}</span>
                  </div>
                  <button
                    onClick={() => playPhrase(phrase.kannada.split('(')[0])}
                    className="p-1.5 rounded-full bg-canvas hover:bg-neutral-200 text-ink-deep transition-colors"
                    title="Pronounce"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
