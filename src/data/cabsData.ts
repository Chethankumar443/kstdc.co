export interface CabVehicle {
  id: string;
  name: string;
  type: string;
  seating: string;
  luggage: string;
  airportDropPrice: number;
  outstationRatePerKm: number;
  minKmPerDay: number;
  image: string;
  features: string[];
}

export const CABS_DATA: CabVehicle[] = [
  {
    id: 'kstdc-sedan-etios',
    name: 'Toyota Etios / Dzire AC',
    type: 'Sedan',
    seating: '4 Passengers',
    luggage: '2 Large Bags',
    airportDropPrice: 1250,
    outstationRatePerKm: 14,
    minKmPerDay: 250,
    image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=800&q=80',
    features: ['Official Airport Permit', 'GPS Monitored', 'AC Vehicle', 'Fixed Govt Tariff', 'Sanitized'],
  },
  {
    id: 'kstdc-suv-innova',
    name: 'Toyota Innova Crysta AC',
    type: 'Premium SUV',
    seating: '6–7 Passengers',
    luggage: '4 Large Bags',
    airportDropPrice: 1950,
    outstationRatePerKm: 19,
    minKmPerDay: 300,
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80',
    features: ['Luxury Pushback Seats', 'Highway Toll Fastag', 'Experienced Driver', 'Generous Boot Space'],
  },
  {
    id: 'kstdc-tempo-traveller',
    name: 'Force Tempo Traveller AC (12+1)',
    type: 'Mini Coach',
    seating: '12 Passengers',
    luggage: '8 Large Bags',
    airportDropPrice: 2900,
    outstationRatePerKm: 26,
    minKmPerDay: 350,
    image: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=800&q=80',
    features: ['Group Family Travel', 'High Roof Recliner', 'Individual AC Vents', 'Commercial Permit'],
  },
];
