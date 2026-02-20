// FGC (Fighting Game Community) Player Database
// Focused on Street Fighter 6 pro players and content creators

export interface FgcPlayer {
  name: string;
  realName?: string;
  twitchLogin?: string;
  youtubeChannelId?: string;
  country: string;
  coordinates: [number, number]; // [lng, lat]
  mainCharacter: string;
  subCharacters?: string[];
  team?: string;
  cpt2025Rank?: number; // Capcom Pro Tour ranking
  tags?: string[]; // 'pro', 'content-creator', 'commentator', 'legend'
}

// Major FGC Players - Street Fighter 6 focused
export const FGC_PLAYERS: FgcPlayer[] = [
  // ===== JAPAN =====
  { name: 'Daigo Umehara', realName: '梅原大吾', twitchLogin: 'daaborusakano', youtubeChannelId: 'UCjBi1ksGYp6bOk5gkSs6WGw', country: 'JP', coordinates: [139.6917, 35.6895], mainCharacter: 'Ken', team: 'Red Bull', tags: ['pro', 'legend'] },
  { name: 'Tokido', realName: '谷口一', twitchLogin: 'tokaboruv', country: 'JP', coordinates: [139.6917, 35.6895], mainCharacter: 'Ken', subCharacters: ['Luke'], team: 'Reject', tags: ['pro', 'legend'] },
  { name: 'Fuudo', realName: '藤田直之', twitchLogin: 'fuudosf', country: 'JP', coordinates: [135.5023, 34.6937], mainCharacter: 'Dee Jay', team: 'FENNEL', tags: ['pro'] },
  { name: 'Bonchan', realName: '冨田大介', twitchLogin: 'bonchan_fps', country: 'JP', coordinates: [139.6917, 35.6895], mainCharacter: 'Luke', team: 'DONUTS USG', tags: ['pro'] },
  { name: 'Kazunoko', realName: '三木一伯', twitchLogin: 'kazunoko0215', country: 'JP', coordinates: [139.6917, 35.6895], mainCharacter: 'Cammy', team: 'CYCLOPS', tags: ['pro'] },
  { name: 'Kawano', twitchLogin: 'kawano0521', country: 'JP', coordinates: [139.6917, 35.6895], mainCharacter: 'Luke', team: 'GOOD 8 SQUAD', tags: ['pro'] },
  { name: 'Mago', realName: '真子雅人', twitchLogin: 'magotto2', country: 'JP', coordinates: [139.6917, 35.6895], mainCharacter: 'Juri', tags: ['pro', 'legend'] },
  { name: 'Nemo', twitchLogin: 'naboruv', country: 'JP', coordinates: [139.6917, 35.6895], mainCharacter: 'JP', team: 'FENNEL', tags: ['pro'] },
  { name: 'Gachikun', twitchLogin: 'gachikun_sf', country: 'JP', coordinates: [130.4017, 33.5902], mainCharacter: 'Rashid', team: 'DONUTS USG', tags: ['pro'] },
  { name: 'Shuto', twitchLogin: 'shuto_sf6', country: 'JP', coordinates: [139.6917, 35.6895], mainCharacter: 'Blanka', team: 'FENNEL', tags: ['pro'] },
  { name: 'Momochi', realName: '百地裕子', twitchLogin: 'momochi212', country: 'JP', coordinates: [130.4017, 33.5902], mainCharacter: 'Ken', team: 'Shinobism', tags: ['pro', 'legend'] },
  { name: 'Itazan', twitchLogin: 'itazanman', country: 'JP', coordinates: [139.6917, 35.6895], mainCharacter: 'Zangief', tags: ['pro'] },
  { name: 'Dogura', twitchLogin: 'dogura', country: 'JP', coordinates: [135.5023, 34.6937], mainCharacter: 'Dee Jay', team: 'CYCLOPS', tags: ['pro'] },
  { name: 'Haitani', twitchLogin: 'hai090', country: 'JP', coordinates: [135.5023, 34.6937], mainCharacter: 'Ken', tags: ['pro', 'legend'] },
  { name: 'Sakonoko', twitchLogin: 'sakonoko_game', country: 'JP', coordinates: [130.4017, 33.5902], mainCharacter: 'Akuma', tags: ['pro'] },
  { name: 'Higuchi', twitchLogin: 'higuchiman', country: 'JP', coordinates: [139.6917, 35.6895], mainCharacter: 'Guile', tags: ['pro'] },
  { name: 'Kakeru', twitchLogin: 'kakerusf', country: 'JP', coordinates: [139.6917, 35.6895], mainCharacter: 'Rashid', tags: ['pro'] },
  { name: 'Moke', twitchLogin: 'moke_sf', country: 'JP', coordinates: [139.6917, 35.6895], mainCharacter: 'Chun-Li', tags: ['pro'] },
  { name: 'Deshiken', twitchLogin: 'deshiken_sf', country: 'JP', coordinates: [139.6917, 35.6895], mainCharacter: 'Marisa', tags: ['pro'] },

  // ===== NORTH AMERICA =====
  { name: 'Punk', realName: 'Victor Woodley', twitchLogin: 'paborunktual', country: 'US', coordinates: [-73.9857, 40.7484], mainCharacter: 'Luke', subCharacters: ['Cammy'], team: 'Liquid', tags: ['pro'] },
  { name: 'NuckleDu', realName: 'Du Dang', twitchLogin: 'nuckledu', country: 'US', coordinates: [-97.7431, 30.2672], mainCharacter: 'Guile', tags: ['pro', 'legend'] },
  { name: 'iDom', realName: 'Derek Ruffin', twitchLogin: 'idomgg', country: 'US', coordinates: [-118.2437, 34.0522], mainCharacter: 'Manon', tags: ['pro'] },
  { name: 'MenaRD', realName: 'Saul Mena', twitchLogin: 'menard150', country: 'DO', coordinates: [-69.9312, 18.4861], mainCharacter: 'Blanka', team: 'Alpha 3', tags: ['pro'] },
  { name: 'Justin Wong', twitchLogin: 'jwonggg', country: 'US', coordinates: [-73.9857, 40.7484], mainCharacter: 'Kimberly', tags: ['pro', 'legend', 'content-creator'] },
  { name: 'BrianF', twitchLogin: 'brianf', country: 'US', coordinates: [-73.9857, 40.7484], mainCharacter: 'Marisa', tags: ['content-creator'] },
  { name: 'Snake Eyez', twitchLogin: 'snakeeyez_', country: 'US', coordinates: [-118.2437, 34.0522], mainCharacter: 'Zangief', tags: ['pro'] },
  { name: 'Smug', twitchLogin: 'smugdabeast', country: 'US', coordinates: [-73.9857, 40.7484], mainCharacter: 'Dee Jay', tags: ['pro', 'content-creator'] },

  // ===== EUROPE =====
  { name: 'Problem X', realName: 'Benjamin Simon', twitchLogin: 'problemx', country: 'GB', coordinates: [-0.1278, 51.5074], mainCharacter: 'Lily', team: 'Mouz', tags: ['pro'] },
  { name: 'Phenom', realName: 'Arman Hanjani', twitchLogin: 'phenomenbb', country: 'NO', coordinates: [10.7522, 59.9139], mainCharacter: 'Luke', subCharacters: ['Ken'], tags: ['pro'] },
  { name: 'Luffy', realName: 'Olivier Hay', twitchLogin: 'md_luffy', country: 'FR', coordinates: [2.3522, 48.8566], mainCharacter: 'Manon', team: 'Red Bull', tags: ['pro', 'legend'] },
  { name: 'MisterCrimson', twitchLogin: 'mistercrimson', country: 'FR', coordinates: [2.3522, 48.8566], mainCharacter: 'JP', tags: ['pro'] },
  { name: 'Broski', twitchLogin: 'broski_uk', country: 'GB', coordinates: [-0.1278, 51.5074], mainCharacter: 'Marisa', tags: ['pro'] },
  { name: 'Endingwalker', twitchLogin: 'endingwalker', country: 'FR', coordinates: [2.3522, 48.8566], mainCharacter: 'Ryu', tags: ['pro'] },

  // ===== ASIA (Non-Japan) =====
  { name: 'Xiao Hai', country: 'CN', coordinates: [121.4737, 31.2304], mainCharacter: 'Cammy', tags: ['pro', 'legend'] },
  { name: 'NL', realName: 'Lee Ho-jin', twitchLogin: 'nlkr', country: 'KR', coordinates: [126.978, 37.5665], mainCharacter: 'Luke', tags: ['pro'] },
  { name: 'Infiltration', realName: 'Lee Seon-woo', twitchLogin: 'infiltration85', country: 'KR', coordinates: [126.978, 37.5665], mainCharacter: 'JP', tags: ['pro', 'legend'] },
  { name: 'Oil King', twitchLogin: 'oilking', country: 'TW', coordinates: [121.5654, 25.033], mainCharacter: 'Rashid', tags: ['pro'] },
  { name: 'GamerBee', twitchLogin: 'gamerbee', country: 'TW', coordinates: [121.5654, 25.033], mainCharacter: 'Luke', tags: ['pro', 'legend'] },
  { name: 'Book', twitchLogin: 'book_fgc', country: 'TH', coordinates: [100.5018, 13.7563], mainCharacter: 'Ken', tags: ['pro'] },
  { name: 'Nauman', twitchLogin: 'nauman_sf6', country: 'PK', coordinates: [67.0011, 24.8607], mainCharacter: 'Rashid', team: 'Liquid', tags: ['pro'] },

  // ===== MIDDLE EAST & AFRICA =====
  { name: 'AngryBird', twitchLogin: 'angrybird_sf', country: 'AE', coordinates: [55.2708, 25.2048], mainCharacter: 'Ken', tags: ['pro'] },
  { name: 'Big Bird', twitchLogin: 'bigbird_sf', country: 'AE', coordinates: [55.2708, 25.2048], mainCharacter: 'Marisa', tags: ['pro'] },

  // ===== SOUTH AMERICA =====
  { name: 'Caba', twitchLogin: 'caba_sf', country: 'BR', coordinates: [-43.1729, -22.9068], mainCharacter: 'Guile', tags: ['pro'] },

  // ===== COMMENTATORS & CONTENT CREATORS =====
  { name: 'James Chen', twitchLogin: 'jchensor', country: 'US', coordinates: [-118.2437, 34.0522], mainCharacter: 'Ryu', tags: ['commentator'] },
  { name: 'Sajam', twitchLogin: 'sajam', country: 'US', coordinates: [-118.2437, 34.0522], mainCharacter: 'Ken', tags: ['commentator', 'content-creator'] },
  { name: 'Tasty Steve', twitchLogin: 'tastysteve', country: 'US', coordinates: [-73.9857, 40.7484], mainCharacter: 'Dee Jay', tags: ['commentator'] },
  { name: 'Jiyuna', twitchLogin: 'jaboruyuna', country: 'JP', coordinates: [139.6917, 35.6895], mainCharacter: 'Dhalsim', tags: ['commentator', 'content-creator'] },
];

// All SF6 characters (for stats/meta tracking)
export const SF6_CHARACTERS = [
  'Ryu', 'Luke', 'Ken', 'Juri', 'Kimberly', 'Guile', 'Chun-Li', 'Jamie',
  'JP', 'Marisa', 'Manon', 'Dee Jay', 'Cammy', 'Lily', 'Zangief', 'Dhalsim',
  'Blanka', 'Honda', 'Rashid', 'A.K.I.', 'Ed', 'Akuma', 'M. Bison', 'Terry',
  'Mai', 'Elena', 'Gouki',
] as const;

// Player country groupings for map clustering
export const FGC_REGIONS = {
  japan: { name: 'Japan', center: [138.2529, 36.2048] as [number, number] },
  northAmerica: { name: 'North America', center: [-98.5795, 39.8283] as [number, number] },
  europe: { name: 'Europe', center: [10.4515, 51.1657] as [number, number] },
  asia: { name: 'Asia', center: [104.1954, 35.8617] as [number, number] },
  southAmerica: { name: 'South America', center: [-51.9253, -14.235] as [number, number] },
  middleEast: { name: 'Middle East', center: [49.0, 27.0] as [number, number] },
} as const;
