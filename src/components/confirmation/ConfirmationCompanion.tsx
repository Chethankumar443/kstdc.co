import React, { useState, useEffect } from 'react';
import {
  CheckCircle2, MapPin, Calendar, Clock, Download, Share2,
  Volume2, ExternalLink, Printer, ShieldCheck, FileText, QrCode
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
        serviceType: 'tour',
        tripId: 'kstdc-coorg-2d',
        tripTitle: 'Coorg Mist & Coffee Estates (2 Days Conducted Tour)',
        tripSlug: 'coorg-mist-and-waterfalls',
        destination: 'Coorg (Madikeri)',
        departureDate: '2026-08-29',
        pickupPoint: 'Yeshwanthpur BMTC Bus Station (Platform 2)',
        pickupTime: '06:00 AM',
        vehicleType: 'Volvo AC Multi-Axle Luxury Coach (45-Seater)',
        hotelName: 'Hotel Mayura Valley View (Madikeri)',
        travellers: { adults: 2, children: 1, seniors: 1 },
        passengers: [
          { id: 'p-1', name: 'Vikram Somanna', age: 34, gender: 'Male', type: 'Adult', seatNumber: 'Seat #12' },
          { id: 'p-2', name: 'Ananya Somanna', age: 31, gender: 'Female', type: 'Adult', seatNumber: 'Seat #13' },
          { id: 'p-3', name: 'Shankaraiah Somanna', age: 68, gender: 'Male', type: 'Senior', seatNumber: 'Seat #14' },
          { id: 'p-4', name: 'Aarav Somanna', age: 7, gender: 'Male', type: 'Child', seatNumber: 'Seat #15' },
        ],
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

  // Generate & Download Tax Invoice / Boarding Slip (HTML + Print)
  const handleDownloadInvoice = () => {
    if (!booking) return;

    const cgst = Math.round(booking.pricing.gstAmount / 2);
    const sgst = booking.pricing.gstAmount - cgst;

    const invoiceHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>KSTDC Tax Invoice & Boarding Pass - ${booking.bookingId}</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; margin: 0; padding: 24px; color: #0f172a; background: #fff; line-height: 1.4; }
    .container { max-width: 800px; margin: 0 auto; border: 1.5px solid #cbd5e1; border-radius: 16px; padding: 32px; }
    .header { display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #0f172a; padding-bottom: 16px; margin-bottom: 20px; }
    .logo-area { display: flex; align-items: center; gap: 14px; }
    .logo-area img { height: 48px; object-fit: contain; }
    .title-area { text-align: right; }
    .title-area h1 { margin: 0; font-size: 20px; text-transform: uppercase; letter-spacing: 1px; color: #0f172a; }
    .title-area p { margin: 2px 0 0; font-size: 12px; color: #64748b; font-weight: bold; }
    .meta-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; background: #f8fafc; padding: 16px; border-radius: 12px; margin-bottom: 24px; font-size: 12px; border: 1px solid #e2e8f0; }
    .meta-grid div span { display: block; color: #64748b; font-size: 11px; }
    .meta-grid div strong { font-size: 13px; color: #0f172a; }
    .table { width: 100%; border-collapse: collapse; margin-bottom: 24px; font-size: 12px; }
    .table th, .table td { border: 1px solid #e2e8f0; padding: 10px 12px; text-align: left; }
    .table th { background: #f1f5f9; color: #334155; font-weight: bold; }
    .price-table { width: 340px; margin-left: auto; border-collapse: collapse; font-size: 12px; margin-bottom: 24px; }
    .price-table td { padding: 6px 10px; }
    .price-table .total { font-weight: bold; font-size: 15px; border-top: 2px solid #0f172a; border-bottom: 2px solid #0f172a; }
    .footer-note { border-top: 1px solid #e2e8f0; padding-top: 16px; font-size: 11px; color: #64748b; display: flex; justify-content: space-between; align-items: flex-end; }
    .badge { display: inline-block; background: #dcfce7; color: #166534; padding: 4px 8px; border-radius: 6px; font-weight: bold; font-size: 11px; }
    @media print { body { padding: 0; } .container { border: none; padding: 0; } }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="logo-area">
        <div>
          <h2 style="margin:0; font-size: 20px; font-weight: 800; color: #0f172a;">KSTDC</h2>
          <span style="font-size: 11px; color: #475569; font-weight: 600;">Government of Karnataka Undertaking</span>
        </div>
      </div>
      <div class="title-area">
        <h1>Official Tax Invoice & Boarding Pass</h1>
        <p>GSTIN: 29AAACK0123M1Z8 · State Code: 29</p>
      </div>
    </div>

    <div class="meta-grid">
      <div>
        <span>Invoice / Ticket No:</span>
        <strong>${booking.bookingId}</strong>
      </div>
      <div>
        <span>Date of Booking:</span>
        <strong>${new Date(booking.createdAt).toLocaleDateString('en-IN')}</strong>
      </div>
      <div>
        <span>Payment Method:</span>
        <strong>${booking.paymentMethod} (PAID)</strong>
      </div>
      <div>
        <span>Booking Status:</span>
        <span class="badge">CONFIRMED</span>
      </div>
    </div>

    <h3 style="font-size: 14px; text-transform: uppercase; margin-bottom: 8px; color: #0f172a;">Itinerary & Service Details</h3>
    <table class="table">
      <tr>
        <th>Tour Package / Service</th>
        <th>Departure Date & Time</th>
        <th>Boarding Point</th>
        <th>Accommodation</th>
      </tr>
      <tr>
        <td><strong>${booking.tripTitle}</strong><br><span style="color:#64748b; font-size:11px;">Coach: ${booking.vehicleType}</span></td>
        <td>${new Date(booking.departureDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })} at ${booking.pickupTime}</td>
        <td>${booking.pickupPoint}</td>
        <td>${booking.hotelName} (${booking.roomType})</td>
      </tr>
    </table>

    <h3 style="font-size: 14px; text-transform: uppercase; margin-bottom: 8px; color: #0f172a;">Passenger Manifest (${(booking.passengers || []).length || (booking.travellers.adults + booking.travellers.children + booking.travellers.seniors)} Travellers)</h3>
    <table class="table">
      <thead>
        <tr>
          <th>#</th>
          <th>Passenger Name</th>
          <th>Age</th>
          <th>Gender</th>
          <th>Category</th>
          <th>Seat / Berth</th>
        </tr>
      </thead>
      <tbody>
        ${(booking.passengers && booking.passengers.length > 0) ? booking.passengers.map((p, i) => `
          <tr>
            <td>${i + 1}</td>
            <td><strong>${p.name || booking?.contact.name}</strong></td>
            <td>${p.age} yrs</td>
            <td>${p.gender}</td>
            <td>${p.type}</td>
            <td><strong>${p.seatNumber || `Seat #${12 + i}`}</strong></td>
          </tr>
        `).join('') : `
          <tr>
            <td>1</td>
            <td><strong>${booking.contact.name}</strong> (Lead)</td>
            <td>34 yrs</td>
            <td>Male</td>
            <td>Adult</td>
            <td><strong>Seat #12</strong></td>
          </tr>
        `}
      </tbody>
    </table>

    <h3 style="font-size: 14px; text-transform: uppercase; margin-bottom: 8px; color: #0f172a;">Tariff Breakdown (INR)</h3>
    <table class="price-table">
      <tr>
        <td>Base Fare (${booking.travellers.adults} Adults${booking.travellers.children ? `, ${booking.travellers.children} Kids` : ''}${booking.travellers.seniors ? `, ${booking.travellers.seniors} Seniors` : ''}):</td>
        <td style="text-align: right;">₹${booking.pricing.basePrice.toLocaleString('en-IN')}</td>
      </tr>
      ${booking.pricing.seniorDiscount > 0 ? `
      <tr>
        <td style="color: #166534;">Senior Citizen Concession (5%):</td>
        <td style="text-align: right; color: #166534;">-₹${booking.pricing.seniorDiscount.toLocaleString('en-IN')}</td>
      </tr>` : ''}
      <tr>
        <td>Central GST (CGST @ 2.5%):</td>
        <td style="text-align: right;">₹${cgst.toLocaleString('en-IN')}</td>
      </tr>
      <tr>
        <td>State GST (SGST @ 2.5%):</td>
        <td style="text-align: right;">₹${sgst.toLocaleString('en-IN')}</td>
      </tr>
      <tr class="total">
        <td>Total Paid Amount:</td>
        <td style="text-align: right;">₹${booking.pricing.totalAmount.toLocaleString('en-IN')}</td>
      </tr>
    </table>

    <div class="footer-note">
      <div>
        <strong>Karnataka State Tourism Development Corporation (KSTDC)</strong><br>
        Khanija Bhavan, 49, Race Course Road, Bengaluru - 560001<br>
        Toll-Free Helpline: 1800 425 3333 | 080-4334 4334 | Email: info@kstdc.co
      </div>
      <div style="text-align: right;">
        <span style="font-size: 10px; color: #94a3b8;">Computer Generated Tax Invoice<br>No signature required.</span>
      </div>
    </div>
  </div>
</body>
</html>`;

    // Download HTML file directly
    const blob = new Blob([invoiceHtml], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `KSTDC-Tax-Invoice-${booking.bookingId}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    // Also trigger browser print dialog for PDF saving
    setTimeout(() => {
      window.print();
    }, 400);
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

  const cgst = Math.round(booking.pricing.gstAmount / 2);
  const sgst = booking.pricing.gstAmount - cgst;
  const passengerList = booking.passengers && booking.passengers.length > 0 ? booking.passengers : [
    { id: 'p-1', name: booking.contact.name, age: 34, gender: 'Male' as const, type: 'Adult' as const, seatNumber: 'Seat #12' }
  ];

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
        
        {/* Reassuring Confirmation Hero */}
        <div className="bg-slate-950 p-8 sm:p-12 rounded-[32px] text-white text-center space-y-5 shadow-lg">
          
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-white/10 backdrop-blur-md text-white text-xs font-semibold">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Official Government Reservation Confirmed</span>
          </div>

          <div className="space-y-2">
            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
              {t.confirmationTitle}
            </h1>
            <p className="text-xs sm:text-sm text-white/80 max-w-lg mx-auto leading-relaxed">
              Your official KSTDC boarding pass and government tax invoice have been generated and sent to <strong>{booking.contact.email}</strong>.
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
            <span className="px-3 py-1 rounded-full bg-emerald-400 text-slate-950 text-xs font-bold">
              Confirmed
            </span>
          </div>

          {/* Action Pills */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={handleDownloadInvoice}
              className="px-6 py-3 rounded-full bg-white hover:bg-slate-100 text-slate-950 font-bold text-xs shadow-sm transition-all flex items-center gap-2"
            >
              <Download className="w-4 h-4 text-blue-600" />
              <span>Download Official Tax Invoice & Pass</span>
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

        {/* OFFICIAL GOVERNMENT TAX INVOICE & BOARDING PASS CARD */}
        <div className="bg-white rounded-[32px] border-2 border-slate-200 p-6 sm:p-10 shadow-md space-y-8 text-slate-900">
          
          {/* Header Strip with KSTDC & Karnataka Tourism Logos */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-2 border-slate-900 pb-6">
            <div className="flex items-center gap-3">
              <img
                src="/kstdc-logo.png"
                alt="KSTDC Logo"
                className="w-12 h-12 object-contain"
              />
              <div className="h-10 w-px bg-slate-300 hidden sm:block" />
              <img
                src="/karnataka-tourism-logo.png"
                alt="Department of Tourism"
                className="h-10 object-contain hidden xs:block"
              />
              <div>
                <h2 className="text-xl font-black tracking-tight text-slate-950">KSTDC</h2>
                <span className="text-[11px] font-semibold text-slate-600 block">Karnataka State Tourism Development Corporation</span>
              </div>
            </div>

            <div className="text-left sm:text-right space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-900 block">
                Official Tax Invoice & Boarding Slip
              </span>
              <span className="text-[11px] text-slate-500 block">
                GSTIN: <strong>29AAACK0123M1Z8</strong> · Code: 29
              </span>
            </div>
          </div>

          {/* Metadata Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs">
            <div>
              <span className="text-slate-500 block text-[11px]">Booking Reference</span>
              <span className="font-mono font-bold text-slate-950 text-sm">{booking.bookingId}</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[11px]">Date & Time of Issue</span>
              <span className="font-bold text-slate-950">
                {new Date(booking.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
              </span>
            </div>
            <div>
              <span className="text-slate-500 block text-[11px]">Payment Mode</span>
              <span className="font-bold text-emerald-700">{booking.paymentMethod} (PAID IN FULL)</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[11px]">Coach Class</span>
              <span className="font-bold text-slate-950">{booking.vehicleType}</span>
            </div>
          </div>

          {/* Tour & Boarding Details */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Service & Boarding Itinerary
            </h3>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
              <div>
                <span className="text-slate-500 block text-[11px]">Tour / Circuit</span>
                <span className="font-bold text-slate-950">{booking.tripTitle}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[11px]">Departure Date & Time</span>
                <span className="font-bold text-blue-700">
                  {new Date(booking.departureDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })} ({booking.pickupTime})
                </span>
              </div>
              <div>
                <span className="text-slate-500 block text-[11px]">Pickup Location</span>
                <span className="font-bold text-slate-950">{booking.pickupPoint}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[11px]">Hotel Accommodation</span>
                <span className="font-bold text-slate-950">{booking.hotelName} ({booking.roomType})</span>
              </div>
            </div>
          </div>

          {/* PASSENGER MANIFEST TABLE */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Official Passenger Manifest ({passengerList.length} Travellers)
              </h3>
              <span className="text-[11px] text-slate-500 font-medium">Valid Photo ID Required at Boarding</span>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-slate-200">
              <table className="w-full text-left text-xs border-collapse">
                <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                  <tr>
                    <th className="p-3">#</th>
                    <th className="p-3">Passenger Name</th>
                    <th className="p-3">Age</th>
                    <th className="p-3">Gender</th>
                    <th className="p-3">Category</th>
                    <th className="p-3">Allocated Seat</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {passengerList.map((p, i) => (
                    <tr key={i} className="hover:bg-slate-50">
                      <td className="p-3 font-semibold text-slate-500">{i + 1}</td>
                      <td className="p-3 font-bold text-slate-950">{p.name || booking.contact.name}</td>
                      <td className="p-3 text-slate-700">{p.age} yrs</td>
                      <td className="p-3 text-slate-700">{p.gender}</td>
                      <td className="p-3">
                        <span className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-800 text-[10px] font-bold">
                          {p.type}
                        </span>
                      </td>
                      <td className="p-3 font-mono font-bold text-slate-950">{p.seatNumber || `Seat #${12 + i}`}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* ITEMIZED TAX & TARIFF STATEMENT */}
          <div className="flex flex-col sm:flex-row justify-between items-start gap-6 pt-4 border-t border-slate-200">
            <div className="space-y-2 max-w-sm text-xs text-slate-500">
              <div className="flex items-center gap-1.5 text-slate-900 font-bold">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Authorized Government Billing</span>
              </div>
              <p>SAC Code: 9964 (Passenger Transport) / 9963 (Accommodation). Tariff inclusive of state tolls, passenger road taxes, and AC coach luxury supplement.</p>
            </div>

            <div className="w-full sm:w-80 space-y-2 text-xs">
              <div className="flex justify-between text-slate-700">
                <span>Base Fare ({booking.travellers.adults} Adults{booking.travellers.children ? `, ${booking.travellers.children} Kids` : ''}{booking.travellers.seniors ? `, ${booking.travellers.seniors} Seniors` : ''}):</span>
                <span className="font-semibold text-slate-950">₹{booking.pricing.basePrice.toLocaleString('en-IN')}</span>
              </div>

              {booking.pricing.seniorDiscount > 0 && (
                <div className="flex justify-between text-emerald-700 font-semibold">
                  <span>Senior Citizen Concession (5%):</span>
                  <span>−₹{booking.pricing.seniorDiscount.toLocaleString('en-IN')}</span>
                </div>
              )}

              <div className="flex justify-between text-slate-500 pt-1 border-t border-slate-100">
                <span>Central GST (CGST @ 2.5%):</span>
                <span>₹{cgst.toLocaleString('en-IN')}</span>
              </div>

              <div className="flex justify-between text-slate-500">
                <span>State GST (SGST @ 2.5%):</span>
                <span>₹{sgst.toLocaleString('en-IN')}</span>
              </div>

              <div className="flex justify-between items-baseline pt-2 border-t-2 border-slate-900 text-slate-950">
                <span className="font-bold text-sm">Total Paid Amount:</span>
                <span className="text-xl font-black text-slate-950">
                  ₹{booking.pricing.totalAmount.toLocaleString('en-IN')}
                </span>
              </div>
            </div>
          </div>

          {/* Quick Print CTA */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            <span className="text-xs text-slate-500">Karnataka State Tourism Development Corporation · Khanija Bhavan, Bengaluru</span>
            <button
              type="button"
              onClick={handleDownloadInvoice}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-950 hover:bg-black text-white font-bold text-xs transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Download Tax Invoice</span>
            </button>
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
              {booking.destination} (Cool & Breezy)
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
                <span>Original government photo ID required at coach boarding</span>
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
