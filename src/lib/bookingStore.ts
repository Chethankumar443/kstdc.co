import type { BookingRecord, Language } from '../types/travel';

const BOOKINGS_KEY = 'kstdc_citizen_bookings_v1';
const LANG_KEY = 'kstdc_lang_pref';
const CONTRAST_KEY = 'kstdc_high_contrast';
const BANDWIDTH_KEY = 'kstdc_low_bandwidth';
const FONT_SCALE_KEY = 'kstdc_font_scale';

export function getDefaultDemoBookings(): BookingRecord[] {
  const sample1: BookingRecord = {
    bookingId: 'KSTDC-2026-CRG-8841',
    createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
    serviceType: 'tour',
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
    passengers: [
      { id: 'p-1', name: 'Vikram Somanna', age: 34, gender: 'Male', type: 'Adult', seatNumber: 'Seat #12' },
      { id: 'p-2', name: 'Ananya Somanna', age: 31, gender: 'Female', type: 'Adult', seatNumber: 'Seat #13' },
      { id: 'p-3', name: 'Raghuveer Somanna', age: 64, gender: 'Male', type: 'Senior (60+)', seatNumber: 'Seat #14' },
      { id: 'p-4', name: 'Aarav Somanna', age: 7, gender: 'Male', type: 'Child (5-12)', seatNumber: 'Seat #15' },
    ],
    contact: {
      name: 'Vikram Somanna',
      email: 'vikram.somanna@gmail.com',
      phone: '+91 94801 88990',
      specialAssistance: true,
    },
    roomType: 'Twin Sharing Deluxe AC Room (KSTDC Hillside View)',
    pricing: {
      basePrice: 16467,
      seniorDiscount: 249,
      gstAmount: 810,
      totalAmount: 17028,
    },
    status: 'Confirmed',
    paymentMethod: 'UPI',
    extraDetails: {
      pickupLocation: 'Platform 18, Yeshwanthpur TTMC',
      hotelCheckIn: '12:00 PM (Hotel Mayura Valley View)',
      audioGuideLanguage: 'English / Kannada Certified Guide',
    },
  };

  const sample2: BookingRecord = {
    bookingId: 'KSTDC-MYR-HMP-3319',
    createdAt: new Date(Date.now() - 3600000 * 12).toISOString(),
    serviceType: 'hotel',
    tripId: 'hotel-hampi-bhuvaneshwari',
    tripTitle: 'Hotel Mayura Bhuvaneshwari (2 Nights)',
    tripSlug: 'stays',
    destination: 'Hampi (Kamalapur)',
    departureDate: '2026-08-30',
    pickupPoint: 'Kamalapur Heritage Circle, Hampi',
    pickupTime: '12:00 PM Check-in',
    vehicleType: 'Self / Hotel Direct Arrival',
    hotelName: 'Hotel Mayura Bhuvaneshwari',
    travellers: { adults: 2, children: 0, seniors: 0 },
    passengers: [
      { id: 'gst-1', name: 'Vikram Somanna', age: 34, gender: 'Male', type: 'Adult', seatNumber: 'Room #204 (Executive AC)' },
      { id: 'gst-2', name: 'Ananya Somanna', age: 31, gender: 'Female', type: 'Adult', seatNumber: 'Room #204 (Executive AC)' },
    ],
    contact: {
      name: 'Vikram Somanna',
      email: 'vikram.somanna@gmail.com',
      phone: '+91 94801 88990',
      specialAssistance: false,
    },
    roomType: 'Executive AC Heritage Room (Direct Government Tariff)',
    pricing: {
      basePrice: 7000,
      seniorDiscount: 0,
      gstAmount: 350,
      totalAmount: 7350,
    },
    status: 'Confirmed',
    paymentMethod: 'UPI',
    extraDetails: {
      checkInDate: '2026-08-30',
      checkOutDate: '2026-09-01',
      nights: '2 Nights',
      rooms: '1 Room(s)',
      address: 'Kamalapur, Vijayanagara District, Karnataka 583221',
    },
  };

  const sample3: BookingRecord = {
    bookingId: 'KSTDC-TAXI-BLR-4029',
    createdAt: new Date().toISOString(),
    serviceType: 'cab',
    tripId: 'kstdc-cab-airport',
    tripTitle: 'Prepaid Airport Taxi (Kempegowda T2 → Indiranagar)',
    tripSlug: 'cabs',
    destination: 'Bengaluru Airport Terminal 2',
    departureDate: '2026-08-30',
    pickupPoint: 'BLR Terminal 2 Arrival Exit (Lane 1)',
    pickupTime: '08:30 PM',
    vehicleType: 'Toyota Etios Sedan (AC / GPS Monitored)',
    hotelName: 'Official KSTDC Airport Fleet',
    travellers: { adults: 2, children: 0, seniors: 0 },
    passengers: [
      { id: 'tax-1', name: 'Vikram Somanna', age: 34, gender: 'Male', type: 'Adult', seatNumber: 'Front / Rear AC' },
      { id: 'tax-2', name: 'Ananya Somanna', age: 31, gender: 'Female', type: 'Adult', seatNumber: 'Rear AC' },
    ],
    contact: {
      name: 'Vikram Somanna',
      email: 'vikram.somanna@gmail.com',
      phone: '+91 94801 88990',
      specialAssistance: false,
    },
    roomType: 'Prepaid Government Computerised Tariff (Zero Surge)',
    pricing: {
      basePrice: 1450,
      seniorDiscount: 0,
      gstAmount: 72,
      totalAmount: 1522,
    },
    status: 'Confirmed',
    paymentMethod: 'UPI',
    extraDetails: {
      pickupLocation: 'Kempegowda Int. Airport (BLR T2)',
      dropLocation: 'Indiranagar 100ft Road, Bengaluru',
      tollIncluded: 'Yes (Airport Expressway Toll Included)',
      reportingCounter: 'Counter #4, Arrival Hall T2',
    },
  };

  const sample4: BookingRecord = {
    bookingId: 'KSTDC-AMB-MYS-7712',
    createdAt: new Date().toISOString(),
    serviceType: 'activity',
    tripId: 'kstdc-act-ambaari',
    tripTitle: 'Ambaari Open-Top Double Decker Night Illumination Tour',
    tripSlug: 'activities',
    destination: 'Mysuru City',
    departureDate: '2026-08-31',
    pickupPoint: 'Hotel Mayura Hoysala, JLB Road, Mysuru',
    pickupTime: '06:30 PM',
    vehicleType: 'Ambaari Open-Roof Double-Decker Coach',
    hotelName: 'Hotel Mayura Hoysala',
    travellers: { adults: 2, children: 0, seniors: 0 },
    passengers: [
      { id: 'amb-1', name: 'Vikram Somanna', age: 34, gender: 'Male', type: 'Adult', seatNumber: 'Upper Deck #UD-12' },
      { id: 'amb-2', name: 'Ananya Somanna', age: 31, gender: 'Female', type: 'Adult', seatNumber: 'Upper Deck #UD-13' },
    ],
    contact: {
      name: 'Vikram Somanna',
      email: 'vikram.somanna@gmail.com',
      phone: '+91 94801 88990',
      specialAssistance: false,
    },
    roomType: 'Upper Open-Roof Deck (Illumination Special)',
    pricing: {
      basePrice: 500,
      seniorDiscount: 0,
      gstAmount: 25,
      totalAmount: 525,
    },
    status: 'Confirmed',
    paymentMethod: 'UPI',
    extraDetails: {
      deckType: 'Upper Open Deck',
      scheduleSlot: 'Evening 06:30 PM to 08:00 PM',
      audioGuideLanguage: 'Kannada / English Commentary Included',
    },
  };

  return [sample1, sample2, sample3, sample4];
}

export function getStoredBookings(): BookingRecord[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(BOOKINGS_KEY);
    if (!raw) {
      const defaults = getDefaultDemoBookings();
      localStorage.setItem(BOOKINGS_KEY, JSON.stringify(defaults));
      return defaults;
    }
    return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to load bookings from localStorage', e);
    return [];
  }
}

export function saveBooking(booking: BookingRecord): void {
  if (typeof window === 'undefined') return;
  try {
    const existing = getStoredBookings();
    const updated = [booking, ...existing.filter((b) => b.bookingId !== booking.bookingId)];
    localStorage.setItem(BOOKINGS_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent('kstdc_bookings_changed', { detail: updated }));
  } catch (e) {
    console.error('Failed to save booking', e);
  }
}

export function deleteBooking(bookingId: string): void {
  if (typeof window === 'undefined') return;
  try {
    const existing = getStoredBookings();
    const updated = existing.filter((b) => b.bookingId !== bookingId);
    localStorage.setItem(BOOKINGS_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent('kstdc_bookings_changed', { detail: updated }));
  } catch (e) {
    console.error('Failed to delete booking', e);
  }
}

export function getBookingById(bookingId: string): BookingRecord | null {
  const bookings = getStoredBookings();
  return bookings.find((b) => b.bookingId === bookingId) || null;
}

export function injectSampleDemoBookings(): void {
  if (typeof window === 'undefined') return;
  const defaults = getDefaultDemoBookings();
  localStorage.setItem(BOOKINGS_KEY, JSON.stringify(defaults));
  window.dispatchEvent(new CustomEvent('kstdc_bookings_changed', { detail: defaults }));
}

export function getStoredLanguage(): Language {
  if (typeof window === 'undefined') return 'en';
  try {
    const lang = localStorage.getItem(LANG_KEY) as Language;
    if (lang === 'en' || lang === 'kn' || lang === 'hi') return lang;
    return 'en';
  } catch {
    return 'en';
  }
}

export function setStoredLanguage(lang: Language): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(LANG_KEY, lang);
  window.dispatchEvent(new CustomEvent('kstdc_lang_changed', { detail: lang }));
}
