import { TRIPS_DATA } from '../data/tripsData';
import type { TripPackage } from '../types/travel';

export interface AiPlanResult {
  recommendedTrip: TripPackage;
  alternativeTrip?: TripPackage;
  matchScore: number;
  extractedParameters: {
    durationDays?: number;
    budgetMax?: number;
    origin?: string;
    travelerType?: string;
    interests: string[];
  };
  explanation: {
    title: string;
    whyHighlight: string;
    pacingDetails: string;
    stayHighlight: string;
  };
}

export function parseAndPlanTrip(userInput: string): AiPlanResult {
  const query = userInput.toLowerCase();
  
  // 1. Extract duration
  let durationDays = 2; // Default to weekend
  if (query.includes('1 day') || query.includes('one day') || query.includes('single day') || query.includes('day trip') || query.includes('1day')) {
    durationDays = 1;
  } else if (query.includes('3 day') || query.includes('3 days') || query.includes('three days') || query.includes('4 day') || query.includes('long weekend')) {
    durationDays = 3;
  } else if (query.includes('2 day') || query.includes('2 days') || query.includes('two days') || query.includes('weekend')) {
    durationDays = 2;
  }

  // 2. Extract budget
  let budgetMax = 10000;
  const budgetMatch = query.match(/₹?\s?(\d{1,2}),?(\d{3})/);
  if (budgetMatch) {
    const rawNumber = parseInt(budgetMatch[1] + budgetMatch[2], 10);
    if (!isNaN(rawNumber)) budgetMax = rawNumber;
  } else if (query.includes('2000') || query.includes('2k') || query.includes('cheap') || query.includes('low budget')) {
    budgetMax = 2500;
  } else if (query.includes('5000') || query.includes('5k') || query.includes('6000') || query.includes('6k')) {
    budgetMax = 6500;
  }

  // 3. Extract interests
  const interests: string[] = [];
  if (query.includes('nature') || query.includes('hill') || query.includes('mountain') || query.includes('peace') || query.includes('quiet') || query.includes('green') || query.includes('coffee') || query.includes('waterfall') || query.includes('coorg')) {
    interests.push('nature');
  }
  if (query.includes('heritage') || query.includes('history') || query.includes('temple') || query.includes('monument') || query.includes('palace') || query.includes('hampi') || query.includes('mysore') || query.includes('mysuru') || query.includes('culture') || query.includes('ancient')) {
    interests.push('heritage');
  }
  if (query.includes('beach') || query.includes('coast') || query.includes('sea') || query.includes('gokarna') || query.includes('ocean')) {
    interests.push('beach');
  }
  if (query.includes('adventure') || query.includes('trek') || query.includes('sunrise') || query.includes('peak') || query.includes('nandi') || query.includes('chikmagalur')) {
    interests.push('adventure');
  }

  // 4. Extract traveler type
  let travelerType = 'General';
  let isSenior = false;
  if (query.includes('parent') || query.includes('senior') || query.includes('elder') || query.includes('mother') || query.includes('father') || query.includes('grandparent')) {
    travelerType = 'Family with Seniors';
    isSenior = true;
  } else if (query.includes('kid') || query.includes('children') || query.includes('family')) {
    travelerType = 'Family with Children';
  } else if (query.includes('friend') || query.includes('group') || query.includes('college')) {
    travelerType = 'Friends / Group';
  } else if (query.includes('couple') || query.includes('partner') || query.includes('wife') || query.includes('husband')) {
    travelerType = 'Couple / Romantic';
  } else if (query.includes('solo')) {
    travelerType = 'Solo Explorer';
  }

  // 5. Score candidate trips
  const scored = TRIPS_DATA.map((trip) => {
    let score = 0;
    
    // Duration matching
    if (trip.durationDays === durationDays) score += 35;
    else score -= Math.abs(trip.durationDays - durationDays) * 15;

    // Budget matching
    if (trip.pricePerPerson <= budgetMax) score += 25;
    else score -= 30;

    // Interest matching
    if (interests.length === 0) {
      score += 15;
    } else if (interests.includes(trip.category)) {
      score += 30;
    }

    // Senior suitability
    if (isSenior && trip.knowBeforeYouGo.seniorFriendly) score += 20;

    // Specific destination keyword hits
    if (query.includes('coorg') && trip.slug.includes('coorg')) score += 50;
    if (query.includes('hampi') && trip.slug.includes('hampi')) score += 50;
    if ((query.includes('mysuru') || query.includes('mysore')) && trip.slug.includes('mysuru')) score += 50;
    if (query.includes('gokarna') && trip.slug.includes('gokarna')) score += 50;
    if (query.includes('nandi') && trip.slug.includes('nandi')) score += 50;

    return { trip, score };
  });

  scored.sort((a, b) => b.score - a.score);

  const best = scored[0].trip;
  const secondBest = scored.length > 1 ? scored[1].trip : undefined;

  // 6. Generate human reasoning
  let whyHighlight = '';
  if (isSenior) {
    whyHighlight = `Selected because it features pushback Volvo luxury seats, relaxed timing, and ground-level access at ${best.hotel.name} with certified assistance.`;
  } else if (interests.includes('nature') || best.category === 'nature') {
    whyHighlight = `Selected because you requested scenic greenery and a peaceful escape — featuring iconic waterfalls and hillside plantation mist.`;
  } else if (best.category === 'heritage') {
    whyHighlight = `Selected for its high concentration of UNESCO & royal historical marvels with certified archaeologist guides.`;
  } else {
    whyHighlight = `Tailored precisely around your ₹${budgetMax.toLocaleString('en-IN')} budget and ${durationDays}-day timeline from Bengaluru.`;
  }

  return {
    recommendedTrip: best,
    alternativeTrip: secondBest,
    matchScore: Math.min(99, Math.max(88, 85 + Math.floor(Math.random() * 12))),
    extractedParameters: {
      durationDays,
      budgetMax,
      origin: 'Bengaluru',
      travelerType,
      interests: interests.length > 0 ? interests : ['Curated Experience'],
    },
    explanation: {
      title: `Your ${best.durationDays}-Day Karnataka Escape: ${best.destination}`,
      whyHighlight,
      pacingDetails: `${best.explainWhy.travelTimeHours} hrs travel · ${best.explainWhy.sightseeingTimeHours} hrs exploration · ${best.explainWhy.leisureTimeHours} hrs relaxation`,
      stayHighlight: `Official KSTDC ${best.hotel.name} (${best.hotel.roomType}) included with breakfast.`,
    },
  };
}
