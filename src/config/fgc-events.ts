// FGC Major Tournament Database

export interface FgcEvent {
  name: string;
  shortName: string;
  series?: string; // CPT, EVO, etc.
  location: string;
  country: string;
  coordinates: [number, number]; // [lng, lat]
  startDate: string; // ISO date
  endDate: string;
  url?: string;
  game: string;
  tier: 'S' | 'A' | 'B'; // S=Major (EVO/CC), A=Premier, B=Regional
  startGgSlug?: string; // for start.gg API
}

// Major FGC events for 2025-2026 season
export const FGC_EVENTS: FgcEvent[] = [
  // ===== S-TIER (Majors) =====
  {
    name: 'EVO 2026',
    shortName: 'EVO',
    series: 'EVO',
    location: 'Las Vegas, NV',
    country: 'US',
    coordinates: [-115.1398, 36.1699],
    startDate: '2026-07-17',
    endDate: '2026-07-20',
    url: 'https://www.evo.gg',
    game: 'Street Fighter 6',
    tier: 'S',
  },
  {
    name: 'EVO Japan 2026',
    shortName: 'EVO Japan',
    series: 'EVO',
    location: 'Tokyo, Japan',
    country: 'JP',
    coordinates: [139.6917, 35.6895],
    startDate: '2026-04-25',
    endDate: '2026-04-27',
    url: 'https://www.evo.gg',
    game: 'Street Fighter 6',
    tier: 'S',
  },
  {
    name: 'Capcom Cup XI',
    shortName: 'CC XI',
    series: 'CPT',
    location: 'TBD',
    country: 'US',
    coordinates: [-118.2437, 34.0522],
    startDate: '2026-02-01',
    endDate: '2026-02-02',
    game: 'Street Fighter 6',
    tier: 'S',
  },

  // ===== A-TIER (Premier) =====
  {
    name: 'CEO 2026',
    shortName: 'CEO',
    location: 'Daytona Beach, FL',
    country: 'US',
    coordinates: [-81.0228, 29.2108],
    startDate: '2026-06-26',
    endDate: '2026-06-29',
    url: 'https://ceogaming.org',
    game: 'Street Fighter 6',
    tier: 'A',
  },
  {
    name: 'Combo Breaker 2026',
    shortName: 'CB',
    location: 'Schaumburg, IL',
    country: 'US',
    coordinates: [-88.0834, 42.0334],
    startDate: '2026-05-22',
    endDate: '2026-05-25',
    game: 'Street Fighter 6',
    tier: 'A',
  },
  {
    name: 'Frosty Faustings 2026',
    shortName: 'FF',
    location: 'Schaumburg, IL',
    country: 'US',
    coordinates: [-88.0834, 42.0334],
    startDate: '2026-01-17',
    endDate: '2026-01-19',
    game: 'Street Fighter 6',
    tier: 'A',
  },
  {
    name: 'Stunfest 2026',
    shortName: 'Stunfest',
    location: 'Rennes, France',
    country: 'FR',
    coordinates: [-1.6778, 48.1173],
    startDate: '2026-05-01',
    endDate: '2026-05-03',
    game: 'Street Fighter 6',
    tier: 'A',
  },
  {
    name: 'Battle Arena Melbourne 2026',
    shortName: 'BAM',
    location: 'Melbourne, Australia',
    country: 'AU',
    coordinates: [144.9631, -37.8136],
    startDate: '2026-05-16',
    endDate: '2026-05-18',
    game: 'Street Fighter 6',
    tier: 'A',
  },
  {
    name: 'VSFighting 2026',
    shortName: 'VSF',
    location: 'Birmingham, UK',
    country: 'GB',
    coordinates: [-1.8904, 52.4862],
    startDate: '2026-07-04',
    endDate: '2026-07-06',
    game: 'Street Fighter 6',
    tier: 'A',
  },

  // ===== B-TIER (Regional) =====
  {
    name: 'Red Bull Kumite 2026',
    shortName: 'RBK',
    location: 'Paris, France',
    country: 'FR',
    coordinates: [2.3522, 48.8566],
    startDate: '2026-03-15',
    endDate: '2026-03-16',
    game: 'Street Fighter 6',
    tier: 'B',
  },
  {
    name: 'Thaiger Uppercut 2026',
    shortName: 'TU',
    location: 'Bangkok, Thailand',
    country: 'TH',
    coordinates: [100.5018, 13.7563],
    startDate: '2026-03-21',
    endDate: '2026-03-23',
    game: 'Street Fighter 6',
    tier: 'B',
  },
  {
    name: 'Topanga League SF6',
    shortName: 'Topanga',
    location: 'Tokyo, Japan',
    country: 'JP',
    coordinates: [139.6917, 35.6895],
    startDate: '2026-04-01',
    endDate: '2026-06-30',
    game: 'Street Fighter 6',
    tier: 'B',
  },
];

// Game arcade locations (major FGC hubs)
export const FGC_ARCADES: { name: string; location: string; country: string; coordinates: [number, number] }[] = [
  { name: 'Mikado', location: 'Takadanobaba, Tokyo', country: 'JP', coordinates: [139.7056, 35.7127] },
  { name: 'a-cho', location: 'Kyoto', country: 'JP', coordinates: [135.7681, 35.0116] },
  { name: 'Playspot Big One 2nd', location: 'Nakano, Tokyo', country: 'JP', coordinates: [139.6659, 35.7074] },
  { name: 'Next Level', location: 'Brooklyn, NY', country: 'US', coordinates: [-73.9863, 40.6892] },
  { name: 'Super Arcade', location: 'Azusa, CA', country: 'US', coordinates: [-117.9145, 34.1336] },
  { name: 'Guts Gaming Lounge', location: 'London, UK', country: 'GB', coordinates: [-0.1278, 51.5074] },
  { name: 'Versus Dojo', location: 'Paris, France', country: 'FR', coordinates: [2.3522, 48.8566] },
  { name: 'e-Sports Square', location: 'Akihabara, Tokyo', country: 'JP', coordinates: [139.7713, 35.6985] },
];
