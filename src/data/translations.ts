import type { Language } from '../types/travel';

export const TRANSLATIONS: Record<Language, Record<string, string>> = {
  en: {
    // Navigation
    navExplore: 'Explore',
    navTrips: 'Tours',
    navStays: 'Hotels',
    navCabs: 'Airport Taxi',
    navActivities: 'Activities',
    navDestinations: 'Destinations',
    navMyBookings: 'My Bookings',
    navPlanMyTrip: 'Plan My Trip',
    
    // Top Micro Utility Bar
    govtUndertaking: 'Government of Karnataka Undertaking',
    portalTitle: 'Official KSTDC Portal',
    tollFreeText: 'Toll-Free',
    leadershipLabel: 'State Leadership',
    languageSelector: 'Language',
    
    // Header & Meta
    prototypeNotice: 'Official citizen tourism portal for the Government of Karnataka. Verified routes & Hotel Mayura bookings.',
    
    // Hero Banner & Search
    heroBadgeDefault: 'Government of Karnataka Undertaking',
    heroBadge1: 'Hotel Mayura Hospitality Network',
    heroBadge2: 'Shivanasamudra & Western Ghats',
    heroBadge3: 'Nandi Hills & Adventure Tourism',
    heroBadge4: 'Karnataka Heritage & Golden Chariot',
    
    tabTours: 'Tour Packages',
    tabHotels: 'Mayura Hotels',
    tabCabs: 'Airport Taxi',
    tabActivities: 'Ambaari & Activities',
    
    departureOriginLabel: 'Departure Origin',
    departureOriginPlaceholder: 'e.g. Bengaluru, Mysuru...',
    destinationSearchLabel: 'Destination / Place Search',
    destinationSearchPlaceholder: 'Enter place (e.g. Coorg, Hampi, Gokarna)...',
    durationLabel: 'Duration',
    duration1D: '1 Day',
    duration2D: '2 Days',
    duration3D: '3+ Days',
    searchToursBtn: 'Search Tour Packages',
    
    hotelSearchLabel: 'Search Destination or Mayura Property',
    hotelSearchPlaceholder: 'e.g. Coorg, Hampi, Mysuru, Gokarna...',
    hotelGuestsLabel: 'Guests & Room Preference',
    checkStaysBtn: 'Check Mayura Stays',
    
    cabPickupLabel: 'Pickup Location',
    cabPickupPlaceholder: 'e.g. Bengaluru Airport (BLR), Indiranagar...',
    cabDropLabel: 'Destination / Drop City',
    cabDropPlaceholder: 'e.g. City Centre, Mysuru, Coorg...',
    cabTypeLabel: 'Service Fleet',
    calculateFareBtn: 'Calculate Fare & Instant Cab',
    
    activityCityLabel: 'City / Circuit',
    activitySlotLabel: 'Preferred Time Slot',
    bookPassesBtn: 'Book Activity Passes',
    featuredDestination: 'Featured Destination',

    // Trip Planner Modal
    aiPlannerTitle: 'AI Trip Planner',
    aiPlannerSubtitle: 'Describe your travel plans in plain words. We match your request against verified KSTDC routes and Mayura stays.',
    aiPlaceholder: 'For example: I have 2 days from Bengaluru with my parents and a budget of ₹6,000. Looking for a peaceful nature escape.',
    aiPreset1: '2 Days from Bengaluru with parents · Nature & calm',
    aiPreset2: 'Weekend heritage tour · Architecture & temples',
    aiPreset3: '3-day coastal escape · Beaches & coastal heritage',
    aiGenerateBtn: 'Find Matching Trips',
    aiAnalyzing: 'Checking KSTDC schedules and Mayura room availability...',
    aiWhyThisTrip: 'Why this fits your request',
    aiBookDirect: 'View & Book Recommended Trip',
    
    // Trending Trips
    trendingSectionTag: 'Conducted Tour Packages',
    trendingSectionTitle: 'Curated Escapes from Bengaluru',
    trendingSectionSubtitle: 'All packages include Volvo AC transport, certified guides, and Hotel Mayura stays with 100% price transparency.',
    filterAll: 'All Curated Trips',
    filter1Day: '1 Day Express',
    filter2Days: '2 Days (Weekend)',
    filter3Days: '3–4 Days Escapes',
    filterNature: 'Nature & Hills',
    filterHeritage: 'Heritage & History',
    filterBeach: 'Coastal & Beaches',
    filterAdventure: 'Peaks & Treks',
    viewAllTours: 'View All Tour Packages',
    
    // Trip Cards
    perPerson: 'per person',
    stayIncluded: 'Mayura Stay Included',
    dayTour: 'Day Tour',
    daysTour: 'Days Tour',
    viewTripBtn: 'View Details',
    bookNowBtn: 'Book Now',
    verifiedKstdc: 'Official KSTDC Service',
    
    // Mayura Stays Strip
    staysTag: 'Government-Run Hospitality',
    staysTitle: 'Stay with Hotel Mayura',
    staysSubtitle: 'Iconic government-run heritage properties, hillside retreats, and coastal lodges situated at Karnataka’s prime destinations with transparent citizen rates.',
    exploreAllStays: 'Explore All Mayura Properties',
    directTariff: 'Direct Citizen Tariff',
    perNight: '/ night',
    viewStayBtn: 'View Property',
    
    // Airport Taxi & Cabs Section
    cabsTag: 'Official KSTDC Transport',
    cabsTitle: 'KSTDC Airport Taxi & Chauffeur Fleet',
    cabsSubtitle: '24x7 prepaid airport taxi counters at Bengaluru Airport (BLR) & sanitized outstation chauffeur services with fixed government tariffs and zero surge pricing.',
    viewAllFleet: 'View All Fleet & Rates',
    airportTransferFrom: 'Airport Transfer From',
    bookCabBtn: 'Book Cab →',
    
    // Activities Section
    activitiesTag: 'City Experiences & Heritage Walks',
    activitiesTitle: 'KSTDC Conducted Activities',
    activitiesSubtitle: 'Open-top double decker Ambaari tours in Mysuru, official Vidhana Soudha heritage walks, and Sharavathi river water sports.',
    exploreAllActivities: 'Explore All Activities',
    ticketFrom: 'Ticket from',
    bookTicketBtn: 'Book Ticket →',
    
    // Destinations Atlas Section
    destinationsTag: 'Destination Atlas',
    destinationsTitle: 'Explore by Destination',
    destinationsSubtitle: 'Start with the places you want to experience, then browse conducted routes and Hotel Mayura stays.',
    viewAllDestinations: 'View All Destinations',
    stayLabel: 'Stay',
    exploreArrow: 'Explore →',
    
    // Leadership Section
    leadershipTag: 'Executive Leadership & Governance',
    leadershipTitle: 'Government of Karnataka & KSTDC Leadership',
    leadershipSubtitle: 'Guiding Karnataka\'s tourism infrastructure, citizen-first digital access, and world heritage conservation.',
    officialStateEnterprise: 'Official State Enterprise',
    
    // Why Book with KSTDC
    trustTag: 'Public Service Assurance',
    trustTitle: 'Why Book with KSTDC?',
    trustSubtitle: 'The safety and predictability of state-conducted tourism combined with modern travel standards.',
    trust1Title: 'State-Certified Guides',
    trust1Desc: 'Official archaeological and cultural guides accompanying all heritage and circuit tours.',
    trust2Title: 'Volvo AC Luxury Fleet',
    trust2Desc: 'Sanitized pushback Volvo multi-axle coaches operated by vetted state drivers.',
    trust3Title: 'Official Mayura Stays',
    trust3Desc: 'Guaranteed government-owned hillside and heritage properties at prime locations.',
    trust4Title: 'Transparent Pricing',
    trust4Desc: 'Zero hidden platform surcharges or dynamic price surges. What you see is what you pay.',
    
    // Checkout & Booking Engine
    step1Title: '01 Date & Departure Point',
    step2Title: '02 Travellers & Accommodation',
    step3Title: '03 Review & Payment',
    adultsLabel: 'Adults (12+ years)',
    childrenLabel: 'Children (5–11 years)',
    seniorsLabel: 'Senior Citizens (60+ years)',
    seniorDiscountNotice: 'Senior citizen discount applied (5% off base fare)',
    mobilityAssistance: 'Request ground-floor room or wheelchair assistance',
    selectPickup: 'Choose your Bengaluru departure point',
    fareSummary: 'Fare Summary',
    baseFare: 'Base Package Fare',
    gstTax: 'Government GST (5%)',
    totalPayable: 'Total Payable',
    payWithUpi: 'UPI Instant QR',
    payWithCard: 'Debit / Credit Card',
    simulatePayment: 'Confirm Booking & Issue Ticket',
    
    // Confirmation
    confirmationTitle: "You're booked.",
    confirmationSub: 'Your reservation is confirmed with Karnataka State Tourism Development Corporation.',
    bookingRef: 'Booking Reference',
    downloadTicketBtn: 'Download Ticket (PDF)',
    addToCalendarBtn: 'Add to Calendar',
    whatsappShareBtn: 'Share on WhatsApp',
    viewPickupMap: 'View Departure Location on Map',
    audioGuideTitle: 'Helpful Karnataka Travel Guidance',
    
    // Footer
    helplineText: '24x7 Karnataka Tourism Helpline: 1800-425-3333 · KSTDC Head Office, Bengaluru',
    footerTrust: 'Safe Travel · State Certified Guides · Sanitized Transport · Transparent Pricing',
    quickLinks: 'Quick Links',
    topCircuits: 'Top Circuits',
    governmentPortals: 'Government Portals',
    contactDesk: 'Contact & Support',
    allRightsReserved: '© 2026 Karnataka State Tourism Development Corporation (KSTDC). All rights reserved.',
  },
};
