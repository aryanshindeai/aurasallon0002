import { Landmark, ShoppingBag, Coffee, Building2, Bus } from 'lucide-react';

export interface LandmarkItem {
  id: string;
  name: string;
  category: string;
  distance: string;
  time: string;
  icon: any;
  lat: number;
  lng: number;
  desc: string;
}

export const LANDMARKS: LandmarkItem[] = [
  { id: 'sbi', name: 'State Bank of India (SBI)', category: 'banking', distance: '10 m', time: '0 min walk', icon: Landmark, lat: 19.9614, lng: 79.2962, desc: 'Located directly adjacent to Aura Sanctuary' },
  { id: 'mall', name: 'Grand City Shopping Arcade', category: 'shopping', distance: '1.2 km', time: '4 min drive', icon: ShoppingBag, lat: 19.9650, lng: 79.2990, desc: 'Luxury retail & fashion boulevard' },
  { id: 'cafe', name: 'The Artisanal Roastery Café', category: 'dining', distance: '600 m', time: '2 min walk', icon: Coffee, lat: 19.9625, lng: 79.2945, desc: 'Gourmet specialty coffee & organic bakery' },
  { id: 'hotel', name: 'Hotel Royal Palace Flagship', category: 'hospitality', distance: '900 m', time: '3 min drive', icon: Building2, lat: 19.9580, lng: 79.2920, desc: '5-star luxury suites & fine dining' },
  { id: 'transit', name: 'Bapat Nagar Square Bus Stop', category: 'transit', distance: '200 m', time: '1 min walk', icon: Bus, lat: 19.9605, lng: 79.2970, desc: 'Direct city transit connection' },
];
