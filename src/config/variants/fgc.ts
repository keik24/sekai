// FGC (Fighting Game Community) variant - fgc.worldmonitor.app
import type { PanelConfig, MapLayers } from '@/types';
import type { VariantConfig } from './base';

// Re-export base config
export * from './base';

// FGC-specific exports
export * from '../fgc-players';
export * from '../fgc-events';

// Re-export shared utilities from feeds
export {
  SOURCE_TIERS,
  getSourceTier,
  SOURCE_TYPES,
  getSourceType,
  getSourcePropagandaRisk,
  type SourceRiskProfile,
  type SourceType,
} from '../feeds';

// FGC-specific feeds
import type { Feed } from '@/types';

const rss = (url: string) => `/api/rss-proxy?url=${encodeURIComponent(url)}`;

export const FEEDS: Record<string, Feed[]> = {
  // FGC News
  streams: [
    { name: 'FGC News', url: rss('https://news.google.com/rss/search?q="Street+Fighter+6"+OR+"fighting+game"+OR+FGC+OR+"Capcom+Pro+Tour"+when:3d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'EventHubs', url: rss('https://www.eventhubs.com/rss/') },
    { name: 'Capcom News', url: rss('https://news.google.com/rss/search?q=site:capcom.com+OR+"Capcom"+fighting+game+when:7d&hl=en-US&gl=US&ceid=US:en') },
  ],

  // Tournament Coverage
  tournaments: [
    { name: 'CPT News', url: rss('https://news.google.com/rss/search?q="Capcom+Pro+Tour"+OR+"Capcom+Cup"+OR+CPT+2026+when:7d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'EVO News', url: rss('https://news.google.com/rss/search?q=EVO+2026+OR+"Evolution+Championship"+fighting+when:14d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'Tournament Results', url: rss('https://news.google.com/rss/search?q=("Street+Fighter+6"+OR+SF6)+(tournament+OR+results+OR+winner+OR+champion)+when:7d&hl=en-US&gl=US&ceid=US:en') },
  ],

  // Character Tech & Game Updates
  tech: [
    { name: 'SF6 Updates', url: rss('https://news.google.com/rss/search?q="Street+Fighter+6"+(patch+OR+update+OR+DLC+OR+character+OR+balance)+when:14d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'Fighting Games', url: rss('https://news.google.com/rss/search?q="Tekken+8"+OR+"Guilty+Gear"+OR+"Mortal+Kombat"+fighting+game+when:7d&hl=en-US&gl=US&ceid=US:en') },
  ],

  // Community
  'fgc-community': [
    { name: 'FGC Community', url: rss('https://news.google.com/rss/search?q=FGC+community+OR+"fighting+game+community"+when:7d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'FGC Japan', url: rss('https://news.google.com/rss/search?q=格ゲー+OR+ストリートファイター6+OR+スト6+when:3d&hl=ja&gl=JP&ceid=JP:ja') },
  ],
};

// Panel configuration for FGC
export const DEFAULT_PANELS: Record<string, PanelConfig> = {
  map: { name: 'FGC World Map', enabled: true, priority: 1 },
  'live-news': { name: 'FGC News', enabled: true, priority: 1 },
  streams: { name: 'Live Streams', enabled: true, priority: 1 },
  tournaments: { name: 'Tournaments', enabled: true, priority: 1 },
  results: { name: 'Tournament Results', enabled: true, priority: 1 },
  rankings: { name: 'CPT Rankings', enabled: true, priority: 1 },
  clips: { name: 'Highlights', enabled: true, priority: 2 },
  tech: { name: 'Character Tech', enabled: true, priority: 2 },
  'fgc-community': { name: 'Community', enabled: true, priority: 2 },
  monitors: { name: 'My Monitors', enabled: true, priority: 2 },
};

// FGC-focused map layers (most disabled - players/events shown as custom markers)
export const DEFAULT_MAP_LAYERS: MapLayers = {
  conflicts: false, bases: false, cables: false, pipelines: false,
  hotspots: false, ais: false, nuclear: false, irradiators: false,
  sanctions: false, weather: false, economic: false, waterways: false,
  outages: false, cyberThreats: false, datacenters: false, protests: false,
  flights: false, military: false, natural: false, spaceports: false,
  minerals: false, fires: false, ucdpEvents: false, displacement: false,
  climate: false, startupHubs: false, cloudRegions: false, accelerators: false,
  techHQs: false, techEvents: false, stockExchanges: false,
  financialCenters: false, centralBanks: false, commodityHubs: false,
  gulfInvestments: false,
};

export const MOBILE_DEFAULT_MAP_LAYERS: MapLayers = { ...DEFAULT_MAP_LAYERS };

export const VARIANT_CONFIG: VariantConfig = {
  name: 'fgc',
  description: 'Fighting Game Community streams and tournament dashboard',
  panels: DEFAULT_PANELS,
  mapLayers: DEFAULT_MAP_LAYERS,
  mobileMapLayers: MOBILE_DEFAULT_MAP_LAYERS,
};
