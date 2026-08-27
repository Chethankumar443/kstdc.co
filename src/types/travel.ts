export type Language = 'en' | 'kn' | 'hi';

export type TripCategory = 'nature' | 'heritage' | 'spiritual' | 'beach' | 'adventure' | 'family' | 'weekend';

export interface ItineraryEvent {
  time: string;
  title: string;
  description: string;
  icon: string; // 'bus' | 'hotel' | 'camera' | 'coffee' | 'mountain' | 'temple' | 'utensils'
  locationName: string;
  mealIncluded?: boolean;
}

export interface ItineraryDay {
  day: number;
  title: string;
  events: ItineraryEvent[];
}

export interface HotelInfo {
  name: string;
  property: string; // e.g. 'Hotel Mayura Valley View'
  location: string;
  roomType: string;
  rating: number;
  image: string;
  amenities: string[];
}

export interface TripPackage {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  category: TripCategory;
  origin: string; // 'Bengaluru', 'Mysuru', 'Mangaluru', 'Hubballi'
  destination: string; // 'Coorg (Madikeri)', 'Hampi', 'Gokarna', 'Mysuru', 'Nandi Hills', 'Chikmagalur'
  durationDays: number;
  durationNights: number;
  pricePerPerson: number;
  originalPrice?: number;
  badge?: string; // 'Top Choice', 'Weekend Special', 'Senior Friendly', 'Fast Selling'
  rating: number;
  reviewsCount: number;
  heroImage: string;
  galleryImages: string[];
  vehicleType: string; // 'Volvo Multi-Axle AC Coach (45-seater)'
  hotel: HotelInfo;
  inclusions: string[];
  exclusions: string[];
  departureSchedule: {
    time: string;
    pickupPoint: string;
    frequency: string;
    availableDates: string[];
  };
  pickupPoints: Array<{
    name: string;
    time: string;
    landmark: string;
  }>;
  itinerary: ItineraryDay[];
  knowBeforeYouGo: {
    cancellation: string;
    idProof: string;
    seniorFriendly: boolean;
    weatherTip: string;
    packingTips: string[];
  };
  explainWhy: {
    travelTimeHours: number;
    sightseeingTimeHours: number;
    leisureTimeHours: number;
    suitability: string;
    whyHighlight: string;
  };
}

export interface MayuraHotel {
  id: string;
  slug: string;
  name: string;
  destination: string;
  tagline: string;
  rating: number;
  reviewsCount: number;
  pricePerNight: number;
  image: string;
  gallery: string[];
  category: 'Premium' | 'Heritage' | 'Scenic Retreat' | 'Budget Comfort';
  highlights: string[];
  amenities: string[];
  description: string;
  address: string;
  connectedTours: string[];
}

export interface Destination {
  id: string;
  slug: string;
  name: string;
  kannadaName: string;
  region: 'Western Ghats' | 'Deccan Plateau' | 'Coastal Karnataka' | 'Southern Plains';
  tagline: string;
  heroImage: string;
  bestTimeToVisit: string;
  travelDurationFromBlr: string;
  experiences: string[];
  featuredStay: string;
  tripsCount: number;
  description: string;
}

export interface BookingRecord {
  bookingId: string;
  createdAt: string;
  tripId: string;
  tripTitle: string;
  tripSlug: string;
  destination: string;
  departureDate: string;
  pickupPoint: string;
  pickupTime: string;
  vehicleType: string;
  hotelName: string;
  travellers: {
    adults: number;
    children: number;
    seniors: number;
  };
  contact: {
    name: string;
    email: string;
    phone: string;
    specialAssistance: boolean;
  };
  roomType: string;
  pricing: {
    basePrice: number;
    seniorDiscount: number;
    gstAmount: number;
    totalAmount: number;
  };
  status: 'Confirmed' | 'Completed' | 'Upcoming';
  paymentMethod: 'UPI' | 'Card' | 'NetBanking';
  qrCodeMockUrl?: string;
}
