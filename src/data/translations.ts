import type { Language } from '../types/travel';

export const TRANSLATIONS: Record<Language, Record<string, string>> = {
  en: {
    // Navigation
    navExplore: 'Explore',
    navTrips: 'Tours & Packages',
    navStays: 'Mayura Hotels',
    navCabs: 'Airport Taxi & Cabs',
    navActivities: 'Activities & Ambaari',
    navDestinations: 'Destinations',
    navMyBookings: 'My Bookings',
    navPlanMyTrip: 'Plan My Trip',
    
    // Top Micro Utility Bar
    govtUndertaking: 'Government of Karnataka Undertaking',
    portalTitle: 'Official KSTDC Tourism Portal',
    tollFreeText: 'Toll-Free Helpline',
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
    tabCabs: 'Airport Taxi & Cabs',
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
    audioGuideTitle: 'Helpful Kannada Travel Phrases',
    
    // Footer
    helplineText: '24x7 Karnataka Tourism Helpline: 1800-425-3333 · KSTDC Head Office, Bengaluru',
    footerTrust: 'Safe Travel · State Certified Guides · Sanitized Transport · Transparent Pricing',
    quickLinks: 'Quick Links',
    topCircuits: 'Top Circuits',
    governmentPortals: 'Government Portals',
    contactDesk: 'Contact & Support',
    allRightsReserved: 'Karnataka State Tourism Development Corporation. All rights reserved.',
  },
  kn: {
    // Navigation
    navExplore: 'ಅನ್ವೇಷಿಸಿ',
    navTrips: 'ಪ್ರವಾಸಗಳು ಮತ್ತು ಪ್ಯಾಕೇಜ್‌ಗಳು',
    navStays: 'ಮಯೂರ ಹೋಟೆಲ್‌ಗಳು',
    navCabs: 'ವಿಮಾನ ನಿಲ್ದಾಣ ಟ್ಯಾಕ್ಸಿ',
    navActivities: 'ಚಟುವಟಿಕೆಗಳು & ಅಂಬಾರಿ',
    navDestinations: 'ಪ್ರವಾಸಿ ತಾಣಗಳು',
    navMyBookings: 'ನನ್ನ ಬುಕಿಂಗ್‌ಗಳು',
    navPlanMyTrip: 'ಪ್ರವಾಸ ಯೋಜಿಸಿ',
    
    // Top Micro Utility Bar
    govtUndertaking: 'ಕರ್ನಾಟಕ ಸರ್ಕಾರದ ಉದ್ಯಮ',
    portalTitle: 'ಅಧಿಕೃತ ಕೆಎಸ್‌ಟಿಡಿಸಿ ಪ್ರವಾಸೋದ್ಯಮ ಪೋರ್ಟಲ್',
    tollFreeText: 'ಉಚಿತ ಸಹಾಯವಾಣಿ',
    leadershipLabel: 'ರಾಜ್ಯ ನಾಯಕತ್ವ',
    languageSelector: 'ಭಾಷೆ',
    
    // Header & Meta
    prototypeNotice: 'ಕರ್ನಾಟಕ ಸರ್ಕಾರದ ಅಧಿಕೃತ ನಾಗರಿಕ ಪ್ರವಾಸೋದ್ಯಮ ಪೋರ್ಟಲ್. ದೃಢೀಕೃತ ಮಾರ್ಗಗಳು ಮತ್ತು ಹೋಟೆಲ್ ಮಯೂರ ಬುಕಿಂಗ್.',
    
    // Hero Banner & Search
    heroBadgeDefault: 'ಕರ್ನಾಟಕ ಸರ್ಕಾರದ ಅಧಿಕೃತ ಉದ್ಯಮ',
    heroBadge1: 'ಹೋಟೆಲ್ ಮಯೂರ ಆತಿಥ್ಯ ಜಾಲ',
    heroBadge2: 'ಶಿವನಸಮುದ್ರ ಮತ್ತು ಪಶ್ಚಿಮ ಘಟ್ಟಗಳ ಪ್ರವಾಸ',
    heroBadge3: 'ನಂದಿ ಬೆಟ್ಟ ಮತ್ತು ಸಾಹಸ ಪ್ರವಾಸೋದ್ಯಮ',
    heroBadge4: 'ಕರ್ನಾಟಕ ಪರಂಪರೆ & ಗೋಲ್ಡನ್ ಚಾರಿಯಟ್',
    
    tabTours: 'ಪ್ರವಾಸ ಪ್ಯಾಕೇಜ್‌ಗಳು',
    tabHotels: 'ಮಯೂರ ಹೋಟೆಲ್‌ಗಳು',
    tabCabs: 'ವಿಮಾನ ನಿಲ್ದಾಣ ಟ್ಯಾಕ್ಸಿ',
    tabActivities: 'ಅಂಬಾರಿ & ಚಟುವಟಿಕೆಗಳು',
    
    departureOriginLabel: 'ಹೊರಡುವ ಸ್ಥಳ',
    departureOriginPlaceholder: 'ಉದಾ: ಬೆಂಗಳೂರು, ಮೈಸೂರು...',
    destinationSearchLabel: 'ತಾಣ / ಸ್ಥಳದ ಹುಡುಕಾಟ',
    destinationSearchPlaceholder: 'ಸ್ಥಳ ನಮೂದಿಸಿ (ಉದಾ: ಕೊಡಗು, ಹಂಪಿ, ಗೋಕರ್ಣ)...',
    durationLabel: 'ಅವಧಿ',
    duration1D: '1 ದಿನ',
    duration2D: '2 ದಿನಗಳು',
    duration3D: '3+ ದಿನಗಳು',
    searchToursBtn: 'ಪ್ರವಾಸ ಪ್ಯಾಕೇಜ್ ಹುಡುಕಿ',
    
    hotelSearchLabel: 'ತಾಣ ಅಥವಾ ಮಯೂರ ಹೋಟೆಲ್ ಹುಡುಕಿ',
    hotelSearchPlaceholder: 'ಉದಾ: ಕೊಡಗು, ಹಂಪಿ, ಮೈಸೂರು, ಗೋಕರ್ಣ...',
    hotelGuestsLabel: 'ಅತಿಥಿಗಳು & ಕೊಠಡಿ ಆಯ್ಕೆ',
    checkStaysBtn: 'ಮಯೂರ ಕೊಠಡಿ ಪರಿಶೀಲಿಸಿ',
    
    cabPickupLabel: 'ಹತ್ತುವ ಸ್ಥಳ',
    cabPickupPlaceholder: 'ಉದಾ: ಬೆಂಗಳೂರು ವಿಮಾನ ನಿಲ್ದಾಣ (BLR), ಇಂದಿರಾನಗರ...',
    cabDropLabel: 'ತಲುಪುವ ನಗರ / ತಾಣ',
    cabDropPlaceholder: 'ಉದಾ: ನಗರ ಕೇಂದ್ರ, ಮೈಸೂರು, ಕೊಡಗು...',
    cabTypeLabel: 'ವಾಹನ ಶ್ರೇಣಿ',
    calculateFareBtn: 'ದರ ಲೆಕ್ಕಾಚಾರ & ಟ್ಯಾಕ್ಸಿ ಬುಕ್ ಮಾಡಿ',
    
    activityCityLabel: 'ನಗರ / ಪ್ರವಾಸ ವಲಯ',
    activitySlotLabel: 'ಸಮಯದ ಸ್ಲಾಟ್ ಆಯ್ಕೆ',
    bookPassesBtn: 'ಚಟುವಟಿಕೆ ಪಾಸ್ ಬುಕ್ ಮಾಡಿ',
    featuredDestination: 'ಆಯ್ದ ತಾಣ',

    // Trip Planner Modal
    aiPlannerTitle: 'AI ಪ್ರವಾಸ ಯೋಜಕ',
    aiPlannerSubtitle: 'ನಿಮ್ಮ ಪ್ರವಾಸದ ಆಸೆಯನ್ನು ಸರಳ ಮಾತುಗಳಲ್ಲಿ ತಿಳಿಸಿ. ಅಧಿಕೃತ KSTDC ಮಾರ್ಗಗಳು ಮತ್ತು ಮಯೂರ ವಾಸ್ತವ್ಯವನ್ನು ಜೋಡಿಸಿ ನೀಡುತ್ತೇವೆ.',
    aiPlaceholder: 'ಉದಾಹರಣೆಗೆ: ನನ್ನ ಬಳಿ ₹6,000 ಬಜೆಟ್ ಇದೆ, 2 ದಿನಗಳಿವೆ, ಬೆಂಗಳೂರಿನಿಂದ ಪೋಷಕರೊಂದಿಗೆ ಪ್ರಶಾಂತ ತಾಣಕ್ಕೆ ಹೋಗಬೇಕು.',
    aiPreset1: 'ಬೆಂಗಳೂರಿನಿಂದ 2 ದಿನ ಪೋಷಕರೊಂದಿಗೆ · ಪ್ರಕೃತಿ & ಶಾಂತಿ',
    aiPreset2: 'ವಾರಾಂತ್ಯ ಪಾರಂಪರಿಕ ಪ್ರವಾಸ · ವಾಸ್ತುಶಿಲ್ಪ & ಇತಿಹಾಸ',
    aiPreset3: '3 ದಿನಗಳ ಕರಾವಳಿ ಪ್ರವಾಸ · ಕಡಲತೀರ & ದೇವಾಲಯ',
    aiGenerateBtn: 'ಸೂಕ್ತ ಪ್ರವಾಸ ಹುಡುಕಿ',
    aiAnalyzing: 'KSTDC ವೇಳಾಪಟ್ಟಿ ಮತ್ತು ಮಯೂರ ಲಭ್ಯತೆಯನ್ನು ಪರಿಶೀಲಿಸಲಾಗುತ್ತಿದೆ...',
    aiWhyThisTrip: 'ಈ ಪ್ರವಾಸ ನಿಮಗೆ ಏಕೆ ಸೂಕ್ತ?',
    aiBookDirect: 'ಪ್ರವಾಸದ ವಿವರ ನೋಡಿ & ಬುಕ್ ಮಾಡಿ',
    
    // Trending Trips
    trendingSectionTag: 'ಆಯೋಜಿತ ಪ್ರವಾಸ ಪ್ಯಾಕೇಜ್‌ಗಳು',
    trendingSectionTitle: 'ಬೆಂಗಳೂರಿನಿಂದ ಜನಪ್ರಿಯ ವಾರಾಂತ್ಯ ಪ್ರವಾಸಗಳು',
    trendingSectionSubtitle: 'ಎಲ್ಲಾ ಪ್ಯಾಕೇಜ್‌ಗಳಲ್ಲಿ ವೋಲ್ವೋ ಎಸಿ ಐಷಾರಾಮಿ ಸಾರಿಗೆ, ಪ್ರಮಾಣೀಕೃತ ಮಾರ್ಗದರ್ಶಿಗಳು ಮತ್ತು ಮಯೂರ ಹೋಟೆಲ್ ವಾಸ್ತವ್ಯ ಸೇರಿವೆ.',
    filterAll: 'ಎಲ್ಲಾ ಪ್ರವಾಸಗಳು',
    filter1Day: '1 ದಿನದ ಪ್ರವಾಸ',
    filter2Days: '2 ದಿನಗಳ ವಾರಾಂತ್ಯ',
    filter3Days: '3–4 ದಿನಗಳ ಪ್ರವಾಸ',
    filterNature: 'ಪ್ರಕೃತಿ & ಗಿರಿಧಾಮ',
    filterHeritage: 'ಪಾರಂಪರಿಕ & ಇತಿಹಾಸ',
    filterBeach: 'ಕರಾವಳಿ & ಬೀಚ್',
    filterAdventure: 'ಶಿಖರ & ಸಾಹಸ',
    viewAllTours: 'ಎಲ್ಲಾ ಪ್ರವಾಸ ಪ್ಯಾಕೇಜ್‌ಗಳನ್ನು ನೋಡಿ',
    
    // Trip Cards
    perPerson: 'ಪ್ರತಿ ವ್ಯಕ್ತಿಗೆ',
    stayIncluded: 'ಮಯೂರ ಹೋಟೆಲ್ ವಾಸ್ತವ್ಯ ಸೇರಿದೆ',
    dayTour: 'ದಿನದ ಪ್ರವಾಸ',
    daysTour: 'ದಿನಗಳ ಪ್ರವಾಸ',
    viewTripBtn: 'ವಿವರ ನೋಡಿ',
    bookNowBtn: 'ಈಗಲೇ ಬುಕ್ ಮಾಡಿ',
    verifiedKstdc: 'ಅಧಿಕೃತ KSTDC ಸೇವೆ',
    
    // Mayura Stays Strip
    staysTag: 'ಸರ್ಕಾರಿ ನಿರ್ವಹಣೆಯ ಆತಿಥ್ಯ',
    staysTitle: 'ಮಯೂರ ಹೋಟೆಲ್‌ಗಳಲ್ಲಿ ವಾಸ್ತವ್ಯ',
    staysSubtitle: 'ಕರ್ನಾಟಕದ ಪ್ರಮುಖ ಪ್ರವಾಸಿ ತಾಣಗಳಲ್ಲಿರುವ ವಿಶ್ವಾಸಾರ್ಹ ಸರ್ಕಾರಿ ಹೆರಿಟೇಜ್ ಹೋಟೆಲ್‌ಗಳು, ಗಿರಿಧಾಮ ತಾಣಗಳು ಮತ್ತು ಕಡಲತೀರದ ರೆಸಾರ್ಟ್‌ಗಳು.',
    exploreAllStays: 'ಎಲ್ಲಾ ಮಯೂರ ಹೋಟೆಲ್‌ಗಳನ್ನು ವೀಕ್ಷಿಸಿ',
    directTariff: 'ನೇರ ಸರ್ಕಾರಿ ದರ',
    perNight: '/ ಪ್ರತಿ ರಾತ್ರಿ',
    
    // Airport Taxi & Cabs Section
    cabsTag: 'ಅಧಿಕೃತ KSTDC ಸಾರಿಗೆ',
    cabsTitle: 'KSTDC ವಿಮಾನ ನಿಲ್ದಾಣ ಟ್ಯಾಕ್ಸಿ & ಚಾಲಕ ಸಹಿತ ವಾಹನಗಳು',
    cabsSubtitle: 'ಬೆಂಗಳೂರು ಕೆಂಪೇಗೌಡ ಅಂತಾರಾಷ್ಟ್ರೀಯ ವಿಮಾನ ನಿಲ್ದಾಣದಲ್ಲಿ 24x7 ಪ್ರಿಪೇಯ್ಡ್ ಕೌಂಟರ್ ಸೇವೆ. ಯಾವುದೇ ಹೆಚ್ಚುವರಿ ಸರ್ಜ್ ಶುಲ್ಕವಿಲ್ಲದ ನಿಗದಿತ ಸರ್ಕಾರಿ ದರಗಳು.',
    viewAllFleet: 'ಎಲ್ಲಾ ವಾಹನಗಳು & ದರಗಳ ಪಟ್ಟಿ',
    airportTransferFrom: 'ವಿಮಾನ ನಿಲ್ದಾಣ ಸಾರಿಗೆ ದರ',
    bookCabBtn: 'ಟ್ಯಾಕ್ಸಿ ಬುಕ್ ಮಾಡಿ →',
    
    // Activities Section
    activitiesTag: 'ನಗರ ಅನುಭವಗಳು & ಪಾರಂಪರಿಕ ನಡಿಗೆ',
    activitiesTitle: 'KSTDC ಆಯೋಜಿತ ಚಟುವಟಿಕೆಗಳು',
    activitiesSubtitle: 'ಮೈಸೂರಿನಲ್ಲಿ ತೆರೆದ ಛಾವಣಿಯ ಅಂಬಾರಿ ಬಸ್ ಟೂರ್, ವಿಧಾನ ಸೌಧ ಪಾರಂಪರಿಕ ನಡಿಗೆ ಮತ್ತು ಶರಾವತಿ ನದಿ ಜಲ ಕ್ರೀಡೆಗಳು.',
    exploreAllActivities: 'ಎಲ್ಲಾ ಚಟುವಟಿಕೆಗಳನ್ನು ಅನ್ವೇಷಿಸಿ',
    ticketFrom: 'ಟಿಕೆಟ್ ದರ',
    bookTicketBtn: 'ಟಿಕೆಟ್ ಬುಕ್ ಮಾಡಿ →',
    
    // Destinations Atlas Section
    destinationsTag: 'ಕರ್ನಾಟಕ ಪ್ರವಾಸಿ ನಕ್ಷೆ',
    destinationsTitle: 'ಪ್ರವಾಸಿ ತಾಣಗಳ ಪ್ರಕಾರ ಅನ್ವೇಷಿಸಿ',
    destinationsSubtitle: 'ನಿಮ್ಮ ನೆಚ್ಚಿನ ತಾಣಗಳಿಂದ ಪ್ರವಾಸ ಆರಂಭಿಸಿ; ಅಧಿಕೃತ ಮಾರ್ಗಗಳು ಮತ್ತು ಹೋಟೆಲ್ ಮಯೂರ ವಾಸ್ತವ್ಯವನ್ನು ಆಯ್ಕೆಮಾಡಿ.',
    viewAllDestinations: 'ಎಲ್ಲಾ ತಾಣಗಳನ್ನು ವೀಕ್ಷಿಸಿ',
    stayLabel: 'ವಾಸ್ತವ್ಯ',
    exploreArrow: 'ಅನ್ವೇಷಿಸಿ →',
    
    // Leadership Section
    leadershipTag: 'ಕಾರ್ಯನಿರ್ವಾಹಕ ನಾಯಕತ್ವ & ಆಡಳಿತ',
    leadershipTitle: 'ಕರ್ನಾಟಕ ಸರ್ಕಾರ ಮತ್ತು KSTDC ನಾಯಕತ್ವ',
    leadershipSubtitle: 'ಕರ್ನಾಟಕದ ಪ್ರವಾಸೋದ್ಯಮ ಮೂಲಸೌಕರ್ಯ, ಜನಸ್ನೇಹಿ ಡಿಜಿಟಲ್ ಸೇವೆ ಮತ್ತು ವಿಶ್ವ ಪರಂಪರೆಯ ಸಂರಕ್ಷಣೆಗೆ ಮಾರ್ಗದರ್ಶನ.',
    officialStateEnterprise: 'ಅಧಿಕೃತ ರಾಜ್ಯ ಸರ್ಕಾರಿ ಉದ್ಯಮ',
    
    // Why Book with KSTDC
    trustTag: 'ಸಾರ್ವಜನಿಕ ಸೇವಾ ಭರವಸೆ',
    trustTitle: 'KSTDC ಯನ್ನೇ ಏಕೆ ಆಯ್ಕೆ ಮಾಡಬೇಕು?',
    trustSubtitle: 'ಸರ್ಕಾರಿ ಆಯೋಜಿತ ಪ್ರವಾಸೋದ್ಯಮದ ಸುರಕ್ಷತೆ, ವಿಶ್ವಾಸ ಮತ್ತು ಆಧುನಿಕ ಸೌಲಭ್ಯಗಳ ಸಮ್ಮಿಲನ.',
    trust1Title: 'ಸರ್ಕಾರ ಪ್ರಮಾಣೀಕೃತ ಮಾರ್ಗದರ್ಶಿಗಳು',
    trust1Desc: 'ಇತಿಹಾಸ ಮತ್ತು ಸಂಸ್ಕೃತಿಯನ್ನು ಆಳವಾಗಿ ವಿವರಿಸುವ ತರಬೇತಿ ಪಡೆದ ಅಧಿಕೃತ ಮಾರ್ಗದರ್ಶಿಗಳು.',
    trust2Title: 'ವೋಲ್ವೋ ಎಸಿ ಐಷಾರಾಮಿ ಬಸ್‌ಗಳು',
    trust2Desc: 'ತರಬೇತಿ ಪಡೆದ ಚಾಲಕರಿಂದ ನಿರ್ವಹಿಸಲ್ಪಡುವ ಸ್ವಚ್ಛ ಹಾಗೂ ಸುರಕ್ಷಿತ ವೋಲ್ವೋ ಮಲ್ಟಿ-ಆಕ್ಸಲ್ ಬಸ್‌ಗಳು.',
    trust3Title: 'ಅಧಿಕೃತ ಮಯೂರ ವಾಸ್ತವ್ಯ',
    trust3Desc: 'ಪ್ರಮುಖ ಪ್ರವಾಸಿ ತಾಣಗಳಲ್ಲೇ ಇರುವ ಸರ್ಕಾರಿ ಸ್ವಾಮ್ಯದ ಪ್ರಶಾಂತ ಮತ್ತು ಸ್ವಚ್ಛ ಹೋಟೆಲ್‌ಗಳು.',
    trust4Title: 'ಪಾರದರ್ಶಕ ದರಗಳು',
    trust4Desc: 'ಯಾವುದೇ ಮಧ್ಯವರ್ತಿ ಅಥವಾ ಅನಿರೀಕ್ಷಿತ ಶುಲ್ಕಗಳಿಲ್ಲ; ಪಾರದರ್ಶಕ ಮತ್ತು ನ್ಯಾಯಯುತ ಸರ್ಕಾರಿ ದರ.',
    
    // Checkout & Booking Engine
    step1Title: '01 ದಿನಾಂಕ ಮತ್ತು ಹತ್ತುವ ಸ್ಥಳ',
    step2Title: '02 ಪ್ರಯಾಣಿಕರು ಮತ್ತು ಕೊಠಡಿ',
    step3Title: '03 ಪರಿಶೀಲನೆ ಮತ್ತು ಪಾವತಿ',
    adultsLabel: 'ವಯಸ್ಕರು (12+ ವರ್ಷ)',
    childrenLabel: 'ಮಕ್ಕಳು (5–11 ವರ್ಷ)',
    seniorsLabel: 'ಹಿರಿಯ ನಾಗರಿಕರು (60+ ವರ್ಷ)',
    seniorDiscountNotice: 'ಹಿರಿಯ ನಾಗರಿಕರಿಗೆ 5% ರಿಯಾಯಿತಿ ಅನ್ವಯಿಸಲಾಗಿದೆ',
    mobilityAssistance: 'ನೆಲಮಹಡಿ ಕೊಠಡಿ ಅಥವಾ ವೀಲ್-ಚೇರ್ ನೆರವು ಬೇಕು',
    selectPickup: 'ಬೆಂಗಳೂರಿನಲ್ಲಿ ಬಸ್ ಹತ್ತುವ ಸ್ಥಳ ಆಯ್ಕೆಮಾಡಿ',
    fareSummary: 'ದರ ವಿವರ',
    baseFare: 'ಮೂಲ ಪ್ರವಾಸ ದರ',
    gstTax: 'ಸರ್ಕಾರಿ ಜಿಎಸ್‌ಟಿ (5%)',
    totalPayable: 'ಒಟ್ಟು ಪಾವತಿಸಬೇಕಾದ ಮೊತ್ತ',
    payWithUpi: 'ಯುಪಿಐ (UPI) ಮೂಲಕ ಪಾವತಿಸಿ',
    payWithCard: 'ಡೆಬಿಟ್ / ಕ್ರೆಡಿಟ್ ಕಾರ್ಡ್',
    simulatePayment: 'ಬುಕಿಂಗ್ ಖಚಿತಪಡಿಸಿ & ಟಿಕೆಟ್ ಪಡೆಯಿರಿ',
    
    // Confirmation
    confirmationTitle: 'ನಿಮ್ಮ ಪ್ರವಾಸ ಬುಕ್ ಆಗಿದೆ.',
    confirmationSub: 'ಕರ್ನಾಟಕ ರಾಜ್ಯ ಪ್ರವಾಸೋದ್ಯಮ ಅಭಿವೃದ್ಧಿ ನಿಗಮದೊಂದಿಗೆ ನಿಮ್ಮ ಬುಕಿಂಗ್ ಯಶಸ್ವಿಯಾಗಿದೆ.',
    bookingRef: 'ಬುಕಿಂಗ್ ಸಂಖ್ಯೆ',
    downloadTicketBtn: 'ಟಿಕೆಟ್ ಡೌನ್‌ಲೋಡ್ ಮಾಡಿ (PDF)',
    addToCalendarBtn: 'ಕ್ಯಾಲೆಂಡರ್‌ಗೆ ಸೇರಿಸಿ',
    whatsappShareBtn: 'ವಾಟ್ಸಾಪ್‌ನಲ್ಲಿ ಹಂಚಿಕೊಳ್ಳಿ',
    viewPickupMap: 'ಹತ್ತುವ ಸ್ಥಳದ ನಕ್ಷೆ ನೋಡಿ',
    audioGuideTitle: 'ಪ್ರಮುಖ ಕನ್ನಡ ವಾಕ್ಯಗಳು',
    
    // Footer
    helplineText: '24x7 ಕರ್ನಾಟಕ ಪ್ರವಾಸೋದ್ಯಮ ಸಹಾಯವಾಣಿ: 1800-425-3333 · KSTDC ಪ್ರಧಾನ ಕಛೇರಿ, ಬೆಂಗಳೂರು',
    footerTrust: 'ಸುರಕ್ಷಿತ ಪ್ರಯಾಣ · ತರಬೇತಿ ಪಡೆದ ಮಾರ್ಗದರ್ಶಿಗಳು · ಸ್ವಚ್ಛ ವಾಹನಗಳು · ಪಾರದರ್ಶಕ ದರಗಳು',
    quickLinks: 'ತ್ವರಿತ ಲಿಂಕ್‌ಗಳು',
    topCircuits: 'ಪ್ರಮುಖ ಪ್ರವಾಸ ವಲಯಗಳು',
    governmentPortals: 'ಸರ್ಕಾರಿ ಪೋರ್ಟಲ್‌ಗಳು',
    contactDesk: 'ಸಂಪರ್ಕ ಮತ್ತು ಸಹಾಯವಾಣಿ',
    allRightsReserved: 'ಕರ್ನಾಟಕ ರಾಜ್ಯ ಪ್ರವಾಸೋದ್ಯಮ ಅಭಿವೃದ್ಧಿ ನಿಗಮ. ಎಲ್ಲಾ ಹಕ್ಕುಗಳನ್ನು ಕಾಯ್ದಿರಿಸಲಾಗಿದೆ.',
  },
};

