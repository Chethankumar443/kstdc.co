export interface Activity {
  id: string;
  slug: string;
  title: string;
  city: string;
  category: string;
  price: number;
  duration: string;
  schedule: string;
  heroImage: string;
  tagline: string;
  highlights: string[];
  description: string;
}

export const ACTIVITIES_DATA: Activity[] = [
  {
    id: 'kstdc-ambaari-mysuru',
    slug: 'ambaari-open-top-double-decker-tour',
    title: 'Ambaari Open-Top Double Decker Tour',
    city: 'Mysuru',
    category: 'City Sightseeing',
    price: 350,
    duration: '90 Minutes',
    schedule: 'Daily: 06:30 PM, 08:00 PM & 09:30 PM',
    heroImage: 'https://images.unsplash.com/photo-1600100397608-f010f443b745?auto=format&fit=crop&w=800&q=80',
    tagline: 'Experience the illuminated heritage landmarks of Mysuru from an open-top double-decker bus.',
    highlights: ['Mysore Palace Illumination View', 'Chamundi Hill Foothills', 'Audio Commentary in Kannada & English', 'Heritage City Boulevard'],
    description: 'Ambaari is KSTDC’s flagship double-decker open-roof conducted coach service offering scenic evening panoramic views of Mysore Palace, DC Office, Crawford Hall, and illuminated heritage gates.',
  },
  {
    id: 'kstdc-vidhana-soudha',
    slug: 'guided-tour-vidhana-soudha',
    title: 'Guided Heritage Tour of Vidhana Soudha',
    city: 'Bengaluru',
    category: 'Heritage & Governance',
    price: 150,
    duration: '2 Hours',
    schedule: 'Saturdays & Sundays (Pre-booked slots)',
    heroImage: 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=800&q=80',
    tagline: 'Official guided access inside Karnataka’s majestic Neo-Dravidian state legislative monument.',
    highlights: ['Assembly Hall Entry', 'Cabinet Room Corridor', 'Official State Historian Guide', 'Commemorative Certificate'],
    description: 'An exclusive state-conducted walk inside the iconic granite corridors of the Vidhana Soudha and Vikasa Soudha with certified protocol guides.',
  },
  {
    id: 'kstdc-jog-water-sports',
    slug: 'jog-falls-sharavathi-water-sports',
    title: 'Sharavathi Backwaters & Boating',
    city: 'Jog Falls / Honnavar',
    category: 'Adventure & Nature',
    price: 500,
    duration: '3 Hours',
    schedule: 'Daily: 09:00 AM to 05:00 PM',
    heroImage: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80',
    tagline: 'Speed boating, kayaking, and eco-tours across the pristine Sharavathi river valley.',
    highlights: ['Speedboat Safari', 'Mangrove Kayaking', 'Certified Lifejackets & Navigators', 'Island Viewpoint Stop'],
    description: 'Managed directly by KSTDC Water Sports Division at Jog Falls and Sharavathi river sanctuary.',
  },
];
