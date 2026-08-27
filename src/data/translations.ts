import type { Language } from '../types/travel';

export const TRANSLATIONS: Record<Language, Record<string, string>> = {
  en: {
    // Navigation
    navExplore: 'Explore',
    navTrips: 'Trips & Tours',
    navStays: 'Mayura Stays',
    navDestinations: 'Destinations',
    navMyBookings: 'My Bookings',
    navPlanMyTrip: 'Plan My Trip',
    
    // Header & Meta
    prototypeNotice: 'Prototype redesign concept for Build What Moves India. Not an official KSTDC website. Synthetic demo data.',
    
    // Hero
    heroHeadline: 'Your Karnataka story starts here.',
    heroSubheadline: 'Discover trips, stays and experiences planned around your time, budget and interests.',
    whereFrom: 'Where are you starting?',
    howLong: 'How long do you have?',
    whatExperience: 'What do you want to experience?',
    whoTravelling: 'Who are you travelling with?',
    findMyTripBtn: 'Find My Trip',
    allTripsBtn: 'Explore All Curated Tours',
    
    // Trip Planner (Functional AI)
    aiPlannerTitle: 'Trip Planner',
    aiPlannerSubtitle: 'Describe your travel plans in plain words. We match your request against verified KSTDC routes and Mayura stays.',
    aiPlaceholder: 'For example: I have 2 days from Bengaluru with my parents and a budget of ₹6,000. Looking for a peaceful nature escape.',
    aiPreset1: '2 Days from Bengaluru with parents · Nature & calm',
    aiPreset2: 'Weekend heritage tour · Architecture & temples',
    aiPreset3: '3-day coastal escape · Beaches & coastal heritage',
    aiGenerateBtn: 'Find matching trips',
    aiAnalyzing: 'Checking KSTDC schedules and Mayura room availability...',
    aiWhyThisTrip: 'Why this fits your request',
    aiBookDirect: 'View & Book Recommended Trip',
    
    // Filters & Chips
    filterAll: 'All Curated Trips',
    filter1Day: '1 Day Express',
    filter2Days: '2 Days (Weekend)',
    filter3Days: '3–4 Days Escapes',
    filterNature: 'Nature & Hills',
    filterHeritage: 'Heritage & History',
    filterBeach: 'Coastal & Beaches',
    filterAdventure: 'Peaks & Treks',
    
    // Trip Cards
    perPerson: 'per person',
    stayIncluded: 'Mayura Stay Included',
    dayTour: 'Day Tour',
    daysTour: 'Days Tour',
    viewTripBtn: 'View Trip Details',
    bookNowBtn: 'Book Now',
    verifiedKstdc: 'Official KSTDC Service',
    
    // Trip Detail PDP
    yourJourney: 'Your Visual Journey',
    dayTimeline: 'Day-by-Day Route & Timings',
    inclusionsTitle: 'Included in Your Trip',
    exclusionsTitle: 'Not Included',
    knowBeforeTitle: 'Important to Know Before Booking',
    whyThisTripTitle: 'Trip Pacing Breakdown',
    travelTime: 'Travel Time',
    sightseeingTime: 'Sightseeing Time',
    relaxTime: 'Leisure & Rest',
    checkAvailability: 'Check Availability',
    seatsRemaining: 'seats remaining for this departure',
    
    // Checkout
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
    
    // Stays
    staysTitle: 'Stay with Mayura',
    staysSubtitle: 'Iconic government-run heritage properties, hillside retreats, and coastal lodges at Karnataka’s prime locations.',
    viewStayBtn: 'View Property Details',
    
    // Footer
    helplineText: '24x7 Karnataka Tourism Helpline: 1800-425-3333 · KSTDC Head Office, Bengaluru',
    footerTrust: 'Safe Travel · State Certified Guides · Sanitized Transport · Transparent Pricing',
  },
  kn: {
    // Navigation
    navExplore: 'ಅನ್ವೇಷಿಸಿ',
    navTrips: 'ಪ್ರವಾಸಗಳು',
    navStays: 'ಮಯೂರ ವಾಸ್ತವ್ಯ',
    navDestinations: 'ತಾಣಗಳು',
    navMyBookings: 'ನನ್ನ ಬುಕಿಂಗ್‌ಗಳು',
    navPlanMyTrip: 'ಪ್ರವಾಸ ಯೋಜಿಸಿ',
    
    // Header & Meta
    prototypeNotice: 'ಬಿಲ್ಡ್ ವಾಟ್ ಮೂವ್ಸ್ ಇಂಡಿಯಾ ಸ್ಪರ್ಧೆಗಾಗಿ ಮರುವಿನ್ಯಾಸ ಮಾದರಿ. ಇದು ಅಧಿಕೃತ ಸರ್ಕಾರಿ ಪೋರ್ಟಲ್ ಅಲ್ಲ.',
    
    // Hero
    heroHeadline: 'ನಿಮ್ಮ ಕರ್ನಾಟಕ ಪ್ರವಾಸ ಇಲ್ಲಿಂದ ಪ್ರಾರಂಭ.',
    heroSubheadline: 'ನಿಮ್ಮ ಸಮಯ, ಬಜೆಟ್ ಮತ್ತು ಕುಟುಂಬಕ್ಕೆ ತಕ್ಕಂತೆ ಯೋಜಿಸಲಾದ ಅಧಿಕೃತ ಪ್ರವಾಸಗಳು, ವಾಸ್ತವ್ಯಗಳು ಮತ್ತು ಅನುಭವಗಳು.',
    whereFrom: 'ನೀವು ಎಲ್ಲಿಂದ ಹೊರಡುತ್ತೀರಿ?',
    howLong: 'ನಿಮ್ಮ ಬಳಿ ಎಷ್ಟು ಸಮಯವಿದೆ?',
    whatExperience: 'ನಿಮಗೆ ಯಾವ ಅನುಭವ ಬೇಕು?',
    whoTravelling: 'ಯಾರು ಪ್ರಯಾಣಿಸುತ್ತಿದ್ದಾರೆ?',
    findMyTripBtn: 'ನನ್ನ ಪ್ರವಾಸ ಹುಡುಕಿ',
    allTripsBtn: 'ಎಲ್ಲಾ ಪ್ರವಾಸಗಳನ್ನು ನೋಡಿ',
    
    // Trip Planner
    aiPlannerTitle: 'ಪ್ರವಾಸ ಯೋಜಕ',
    aiPlannerSubtitle: 'ನಿಮ್ಮ ಯೋಜನೆಯನ್ನು ಸರಳ ಮಾತುಗಳಲ್ಲಿ ತಿಳಿಸಿ. ನಾವು ಸೂಕ್ತ KSTDC ಮಾರ್ಗಗಳನ್ನು ಕಂಡುಕೊಳ್ಳುತ್ತೇವೆ.',
    aiPlaceholder: 'ಉದಾಹರಣೆಗೆ: ನನ್ನ ಬಳಿ ₹6,000 ಬಜೆಟ್ ಇದೆ, 2 ದಿನಗಳಿವೆ, ಬೆಂಗಳೂರಿನಿಂದ ಪೋಷಕರೊಂದಿಗೆ ಪ್ರಶಾಂತ ತಾಣಕ್ಕೆ ಹೋಗಬೇಕು.',
    aiPreset1: 'ಬೆಂಗಳೂರಿನಿಂದ 2 ದಿನ ಪೋಷಕರೊಂದಿಗೆ · ಪ್ರಕೃತಿ & ಶಾಂತಿ',
    aiPreset2: 'ವಾರಾಂತ್ಯ ಪಾರಂಪರಿಕ ಪ್ರವಾಸ · ವಾಸ್ತುಶಿಲ್ಪ & ಇತಿಹಾಸ',
    aiPreset3: '3 ದಿನಗಳ ಕರಾವಳಿ ಪ್ರವಾಸ · ಕಡಲತೀರ & ದೇವಾಲಯ',
    aiGenerateBtn: 'ಪ್ರವಾಸ ಹುಡುಕಿ',
    aiAnalyzing: 'KSTDC ವೇಳಾಪಟ್ಟಿ ಮತ್ತು ಮಯೂರ ಲಭ್ಯತೆಯನ್ನು ಪರಿಶೀಲಿಸಲಾಗುತ್ತಿದೆ...',
    aiWhyThisTrip: 'ಈ ಪ್ರವಾಸ ನಿಮಗೆ ಏಕೆ ಸೂಕ್ತ?',
    aiBookDirect: 'ಪ್ರವಾಸದ ವಿವರ ನೋಡಿ & ಬುಕ್ ಮಾಡಿ',
    
    // Filters & Chips
    filterAll: 'ಎಲ್ಲಾ ಪ್ರವಾಸಗಳು',
    filter1Day: '1 ದಿನದ ಪ್ರವಾಸ',
    filter2Days: '2 ದಿನಗಳ ವಾರಾಂತ್ಯ',
    filter3Days: '3–4 ದಿನಗಳ ಪ್ರವಾಸ',
    filterNature: 'ಪ್ರಕೃತಿ & ಗಿರಿಧಾಮ',
    filterHeritage: 'ಪಾರಂಪರಿಕ & ಇತಿಹಾಸ',
    filterBeach: 'ಕರಾವಳಿ & ಬೀಚ್',
    filterAdventure: 'ಶಿಖರ & ಸಾಹಸ',
    
    // Trip Cards
    perPerson: 'ಪ್ರತಿ ವ್ಯಕ್ತಿಗೆ',
    stayIncluded: 'ಮಯೂರ ಹೋಟೆಲ್ ವಾಸ್ತವ್ಯ ಸೇರಿದೆ',
    dayTour: 'ದಿನದ ಪ್ರವಾಸ',
    daysTour: 'ದಿನಗಳ ಪ್ರವಾಸ',
    viewTripBtn: 'ಪ್ರವಾಸದ ವಿವರ ನೋಡಿ',
    bookNowBtn: 'ಈಗಲೇ ಬುಕ್ ಮಾಡಿ',
    verifiedKstdc: 'ಅಧಿಕೃತ KSTDC ಸೇವೆ',
    
    // Trip Detail PDP
    yourJourney: 'ನಿಮ್ಮ ಪ್ರವಾಸದ ಹಾದಿ',
    dayTimeline: 'ದಿನಚರಿ ಮತ್ತು ಸಮಯದ ವಿವರ',
    inclusionsTitle: 'ಪ್ರವಾಸದಲ್ಲಿ ಏನೇನು ಸೇರಿದೆ?',
    exclusionsTitle: 'ಏನೇನು ಸೇರಿಲ್ಲ?',
    knowBeforeTitle: 'ಬುಕಿಂಗ್ ಮಾಡುವ ಮುನ್ನ ತಿಳಿಯಿರಿ',
    whyThisTripTitle: 'ಸಮಯ ಮತ್ತು ವಿಶ್ರಾಂತಿಯ ಸಮತೋಲನ',
    travelTime: 'ಪ್ರಯಾಣದ ಸಮಯ',
    sightseeingTime: 'ವೀಕ್ಷಣೆಯ ಸಮಯ',
    relaxTime: 'ವಿಶ್ರಾಂತಿಯ ಸಮಯ',
    checkAvailability: 'ಲಭ್ಯತೆ ಪರಿಶೀಲಿಸಿ',
    seatsRemaining: 'ಆಸನಗಳು ಮಾತ್ರ ಲಭ್ಯವಿವೆ',
    
    // Checkout
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
    
    // Stays
    staysTitle: 'ಮಯೂರ ವಾಸ್ತವ್ಯ',
    staysSubtitle: 'ಕರ್ನಾಟಕದ ಪ್ರಮುಖ ಪ್ರವಾಸಿ ತಾಣಗಳಲ್ಲಿರುವ ವಿಶ್ವಾಸಾರ್ಹ ಸರ್ಕಾರಿ ಹೆರಿಟೇಜ್ ಹೋಟೆಲ್‌ಗಳು.',
    viewStayBtn: 'ಹೋಟೆಲ್ ವಿವರ ನೋಡಿ',
    
    // Footer
    helplineText: '24x7 ಕರ್ನಾಟಕ ಪ್ರವಾಸೋದ್ಯಮ ಸಹಾಯವಾಣಿ: 1800-425-3333 · KSTDC ಪ್ರಧಾನ ಕಛೇರಿ, ಬೆಂಗಳೂರು',
    footerTrust: 'ಸುರಕ್ಷಿತ ಪ್ರಯಾಣ · ತರಬೇತಿ ಪಡೆದ ಮಾರ್ಗದರ್ಶಿಗಳು · ಸ್ವಚ್ಛ ವಾಹನಗಳು · ಪಾರದರ್ಶಕ ದರಗಳು',
  },
  hi: {
    // Navigation
    navExplore: 'एक्सप्लोर करें',
    navTrips: 'टूर्स और पैकेज',
    navStays: 'मयूरा स्टे',
    navDestinations: 'गंतव्य',
    navMyBookings: 'मेरी बुकिंग्स',
    navPlanMyTrip: 'ट्रिप प्लान करें',
    
    // Header & Meta
    prototypeNotice: 'बिल्ड व्हाट मूव्स इंडिया के लिए प्रोटोटाइप रीडिजाइन। आधिकारिक सरकारी वेबसाइट नहीं है।',
    
    // Hero
    heroHeadline: 'आपकी कर्नाटक यात्रा यहीं से शुरू होती है।',
    heroSubheadline: 'अपने समय, बजट और रुचि के अनुसार तैयार आधिकारिक टूर्स, स्टे और अनुभव खोजें।',
    whereFrom: 'आप कहां से शुरू करना चाहते हैं?',
    howLong: 'आपके पास कितना समय है?',
    whatExperience: 'आप क्या अनुभव करना चाहते हैं?',
    whoTravelling: 'आपके साथ कौन यात्रा कर रहा है?',
    findMyTripBtn: 'मेरी ट्रिप खोजें',
    allTripsBtn: 'सभी टूर्स देखें',
    
    // Trip Planner
    aiPlannerTitle: 'ट्रिप प्लानर',
    aiPlannerSubtitle: 'अपनी योजना सरल शब्दों में बताएं। हम सत्यापित KSTDC मार्गों से सही टूर तैयार करेंगे।',
    aiPlaceholder: 'उदाहरण के लिए: मेरे पास ₹6000 का बजट है, 2 दिन हैं, बेंगलुरु से माता-पिता के साथ एक शांत प्रकृति स्थल जाना है।',
    aiPreset1: 'बेंगलुरु से 2 दिन माता-पिता के साथ · प्रकृति और शांति',
    aiPreset2: 'वीकेंड हेरिटेज टूर · स्थापत्य कला और मंदिर',
    aiPreset3: '3 दिन तटीय यात्रा · समुद्र तट और धरोहर',
    aiGenerateBtn: 'अनुकूल ट्रिप खोजें',
    aiAnalyzing: 'KSTDC समय सारिणी और मयूरा कमरों की उपलब्धता जांची जा रही है...',
    aiWhyThisTrip: 'यह ट्रिप आपके लिए क्यों उपयुक्त है?',
    aiBookDirect: 'ट्रिप विवरण देखें और बुक करें',
    
    // Filters & Chips
    filterAll: 'सभी टूर्स',
    filter1Day: '1 दिन का टूर',
    filter2Days: '2 दिन (वीकेंड)',
    filter3Days: '3–4 दिन के टूर्स',
    filterNature: 'प्रकृति और पहाड़ियां',
    filterHeritage: 'ऐतिहासिक धरोहर',
    filterBeach: 'तटीय और समुद्र तट',
    filterAdventure: 'शिखर और ट्रेक',
    
    // Trip Cards
    perPerson: 'प्रति व्यक्ति',
    stayIncluded: 'मयूरा होटल स्टे शामिल',
    dayTour: 'दिन का टूर',
    daysTour: 'दिनों का टूर',
    viewTripBtn: 'टूर विवरण देखें',
    bookNowBtn: 'अभी बुक करें',
    verifiedKstdc: 'आधिकारिक KSTDC सेवा',
    
    // Trip Detail PDP
    yourJourney: 'आपकी यात्रा की रूपरेखा',
    dayTimeline: 'दिन-प्रतिदिन का कार्यक्रम और समय',
    inclusionsTitle: 'पैकेज में क्या शामिल है?',
    exclusionsTitle: 'क्या शामिल नहीं है?',
    knowBeforeTitle: 'बुकिंग से पहले जरूरी बातें',
    whyThisTripTitle: 'सफर और आराम का संतुलन',
    travelTime: 'सफर का समय',
    sightseeingTime: 'घूमने का समय',
    relaxTime: 'आराम का समय',
    checkAvailability: 'उपलब्धता जांचें',
    seatsRemaining: 'सीटें शेष हैं',
    
    // Checkout
    step1Title: '01 तारीख और बोर्डिंग पॉइंट',
    step2Title: '02 यात्री और आवास चयन',
    step3Title: '03 समीक्षा और भुगतान',
    adultsLabel: 'वयस्क (12+ वर्ष)',
    childrenLabel: 'बच्चे (5–11 वर्ष)',
    seniorsLabel: 'वरिष्ठ नागरिक (60+ वर्ष)',
    seniorDiscountNotice: 'वरिष्ठ नागरिकों के लिए 5% विशेष छूट लागू',
    mobilityAssistance: 'ग्राउंड-फ्लोर कमरा या व्हील-चेयर सहायता का अनुरोध करें',
    selectPickup: 'बेंगलुरु में बोर्डिंग पॉइंट चुनें',
    fareSummary: 'किराया विवरण',
    baseFare: 'मूल टूर पैकेज',
    gstTax: 'सरकारी जीएसटी (5%)',
    totalPayable: 'कुल देय राशि',
    payWithUpi: 'यूपीआई (UPI) से तुरंत भुगतान',
    payWithCard: 'डेबिट / क्रेडिट कार्ड',
    simulatePayment: 'बुकिंग कन्फर्म करें और टिकट पाएं',
    
    // Confirmation
    confirmationTitle: 'आपकी बुकिंग हो गई है।',
    confirmationSub: 'कर्नाटक राज्य पर्यटन विकास निगम के साथ आपका आरक्षण सफल रहा।',
    bookingRef: 'बुकिंग संदर्भ संख्या',
    downloadTicketBtn: 'डिजिटल टिकट डाउनलोड करें (PDF)',
    addToCalendarBtn: 'कैलेंडर में जोड़ें',
    whatsappShareBtn: 'व्हाट्सएप पर शेयर करें',
    viewPickupMap: 'बोर्डिंग पॉइंट का नक्शा देखें',
    audioGuideTitle: 'उपयोगी कन्नड़ यात्रा वाक्यांश',
    
    // Stays
    staysTitle: 'मयूरा में ठहरें',
    staysSubtitle: 'कर्नाटक के प्रमुख पर्यटन स्थलों पर स्थित विश्वसनीय सरकारी हेरिटेज और हिल रिसॉर्ट्स।',
    viewStayBtn: 'होटल का विवरण देखें',
    
    // Footer
    helplineText: '24x7 कर्नाटक पर्यटन हेल्पलाइन: 1800-425-3333 · KSTDC मुख्यालय, बेंगलुरु',
    footerTrust: 'सुरक्षित यात्रा · प्रमाणित टूर गाइड · स्वच्छ वाहन · पारदर्शी सरकारी दरें',
  },
};
