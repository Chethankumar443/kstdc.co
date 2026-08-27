import type { BookingRecord, Language } from '../types/travel';

const BOOKINGS_KEY = 'kstdc_citizen_bookings_v1';
const LANG_KEY = 'kstdc_lang_pref';
const CONTRAST_KEY = 'kstdc_high_contrast';
const BANDWIDTH_KEY = 'kstdc_low_bandwidth';
const FONT_SCALE_KEY = 'kstdc_font_scale';

export function getStoredBookings(): BookingRecord[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(BOOKINGS_KEY);
    if (!raw) return [];
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
  } catch (e) {
    console.error('Failed to save booking', e);
  }
}

export function getBookingById(bookingId: string): BookingRecord | null {
  const bookings = getStoredBookings();
  return bookings.find((b) => b.bookingId === bookingId) || null;
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
