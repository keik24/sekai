// Japan News variant - japan.worldmonitor.app
import type { PanelConfig, MapLayers } from '@/types';
import type { VariantConfig } from './base';

// Re-export base config
export * from './base';

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

// Japan-specific feeds
import type { Feed } from '@/types';

const rss = (url: string) => `/api/rss-proxy?url=${encodeURIComponent(url)}`;

export const FEEDS: Record<string, Feed[]> = {
  // 全国紙・通信社
  national: [
    { name: 'NHK 主要ニュース', url: rss('https://www.nhk.or.jp/rss/news/cat0.xml') },
    { name: 'NHK 社会', url: rss('https://www.nhk.or.jp/rss/news/cat1.xml') },
    { name: 'NHK 科学・医療', url: rss('https://www.nhk.or.jp/rss/news/cat3.xml') },
    { name: 'NHK 政治', url: rss('https://www.nhk.or.jp/rss/news/cat4.xml') },
    { name: 'NHK 経済', url: rss('https://www.nhk.or.jp/rss/news/cat5.xml') },
    { name: 'NHK 国際', url: rss('https://www.nhk.or.jp/rss/news/cat6.xml') },
    { name: 'NHK スポーツ', url: rss('https://www.nhk.or.jp/rss/news/cat7.xml') },
    { name: '朝日新聞', url: rss('https://www.asahi.com/rss/asahi/newsheadlines.rdf') },
    { name: '毎日新聞', url: rss('https://mainichi.jp/rss/etc/mainichi-flash.rss') },
    { name: '産経新聞', url: rss('https://www.sankei.com/rss/flash.xml') },
    { name: '共同通信', url: rss('https://www.47news.jp/rss/national_summary.xml') },
    { name: '時事通信', url: rss('https://news.google.com/rss/search?q=site:jiji.com+when:1d&hl=ja&gl=JP&ceid=JP:ja') },
  ],

  // 経済・ビジネス
  business: [
    { name: '日経新聞', url: rss('https://news.google.com/rss/search?q=site:nikkei.com+when:1d&hl=ja&gl=JP&ceid=JP:ja') },
    { name: '東洋経済', url: rss('https://toyokeizai.net/list/feed/rss') },
    { name: 'ダイヤモンド', url: rss('https://news.google.com/rss/search?q=site:diamond.jp+when:2d&hl=ja&gl=JP&ceid=JP:ja') },
    { name: 'Bloomberg Japan', url: rss('https://news.google.com/rss/search?q=site:bloomberg.co.jp+when:1d&hl=ja&gl=JP&ceid=JP:ja') },
    { name: 'ロイター日本語', url: rss('https://news.google.com/rss/search?q=site:jp.reuters.com+when:1d&hl=ja&gl=JP&ceid=JP:ja') },
  ],

  // テクノロジー
  tech: [
    { name: 'ITmedia', url: rss('https://rss.itmedia.co.jp/rss/2.0/itmedia_all.xml') },
    { name: 'Impress Watch', url: rss('https://www.watch.impress.co.jp/data/rss/1.0/ipw/feed.rdf') },
    { name: 'GIGAZINE', url: rss('https://gigazine.net/news/rss_2.0/') },
    { name: 'CNET Japan', url: rss('https://japan.cnet.com/rss/index.rdf') },
    { name: 'TechCrunch Japan', url: rss('https://jp.techcrunch.com/feed/') },
    { name: 'Publickey', url: rss('https://www.publickey1.jp/atom.xml') },
    { name: 'はてなテクノロジー', url: rss('https://b.hatena.ne.jp/hotentry/it.rss') },
  ],

  // 政治・行政
  politics: [
    { name: '国会ニュース', url: rss('https://news.google.com/rss/search?q=国会+OR+衆議院+OR+参議院+when:2d&hl=ja&gl=JP&ceid=JP:ja') },
    { name: '官邸', url: rss('https://news.google.com/rss/search?q=site:kantei.go.jp+when:7d&hl=ja&gl=JP&ceid=JP:ja') },
    { name: '政治ニュース', url: rss('https://news.google.com/rss/search?q=政治+選挙+OR+内閣+when:1d&hl=ja&gl=JP&ceid=JP:ja') },
  ],

  // 災害・防災
  disaster: [
    { name: '地震速報', url: rss('https://news.google.com/rss/search?q=地震+震度+OR+津波+when:2d&hl=ja&gl=JP&ceid=JP:ja') },
    { name: '気象警報', url: rss('https://news.google.com/rss/search?q=気象庁+警報+OR+注意報+OR+台風+when:2d&hl=ja&gl=JP&ceid=JP:ja') },
    { name: '防災情報', url: rss('https://news.google.com/rss/search?q=避難+OR+防災+OR+災害+when:2d&hl=ja&gl=JP&ceid=JP:ja') },
  ],

  // スポーツ
  sports: [
    { name: 'スポーツニュース', url: rss('https://news.google.com/rss/topics/CAAqJggKIiBDQkFTRWdvSUwyMHZNRFp1ZEdvU0FtcGhHZ0pLVUNnQVAB?hl=ja&gl=JP&ceid=JP:ja') },
    { name: 'Number Web', url: rss('https://number.bunshun.jp/list/feed/rss') },
  ],

  // エンタメ
  entertainment: [
    { name: 'エンタメニュース', url: rss('https://news.google.com/rss/topics/CAAqJggKIiBDQkFTRWdvSUwyMHZNREpxYW5RU0FtcGhHZ0pLVUNnQVAB?hl=ja&gl=JP&ceid=JP:ja') },
    { name: 'ORICON NEWS', url: rss('https://www.oricon.co.jp/rss/news/') },
  ],

  // 地方ニュース - 北海道・東北
  regional_north: [
    { name: '北海道新聞', url: rss('https://news.google.com/rss/search?q=site:hokkaido-np.co.jp+when:2d&hl=ja&gl=JP&ceid=JP:ja') },
    { name: '河北新報', url: rss('https://news.google.com/rss/search?q=site:kahoku.news+when:2d&hl=ja&gl=JP&ceid=JP:ja') },
    { name: 'デーリー東北', url: rss('https://news.google.com/rss/search?q=site:daily-tohoku.news+when:3d&hl=ja&gl=JP&ceid=JP:ja') },
  ],

  // 地方ニュース - 関東
  regional_kanto: [
    { name: '東京新聞', url: rss('https://news.google.com/rss/search?q=site:tokyo-np.co.jp+when:2d&hl=ja&gl=JP&ceid=JP:ja') },
    { name: '神奈川新聞', url: rss('https://news.google.com/rss/search?q=site:kanaloco.jp+when:2d&hl=ja&gl=JP&ceid=JP:ja') },
  ],

  // 地方ニュース - 中部・関西
  regional_central: [
    { name: '中日新聞', url: rss('https://news.google.com/rss/search?q=site:chunichi.co.jp+when:2d&hl=ja&gl=JP&ceid=JP:ja') },
    { name: '神戸新聞', url: rss('https://news.google.com/rss/search?q=site:kobe-np.co.jp+when:2d&hl=ja&gl=JP&ceid=JP:ja') },
    { name: '京都新聞', url: rss('https://news.google.com/rss/search?q=site:kyoto-np.co.jp+when:2d&hl=ja&gl=JP&ceid=JP:ja') },
  ],

  // 地方ニュース - 中国・四国・九州
  regional_west: [
    { name: '中国新聞', url: rss('https://news.google.com/rss/search?q=site:chugoku-np.co.jp+when:2d&hl=ja&gl=JP&ceid=JP:ja') },
    { name: '西日本新聞', url: rss('https://news.google.com/rss/search?q=site:nishinippon.co.jp+when:2d&hl=ja&gl=JP&ceid=JP:ja') },
    { name: '琉球新報', url: rss('https://news.google.com/rss/search?q=site:ryukyushimpo.jp+when:2d&hl=ja&gl=JP&ceid=JP:ja') },
    { name: '沖縄タイムス', url: rss('https://news.google.com/rss/search?q=site:okinawatimes.co.jp+when:2d&hl=ja&gl=JP&ceid=JP:ja') },
  ],

  // 国際（日本語）
  international: [
    { name: 'NHK 国際', url: rss('https://www.nhk.or.jp/rss/news/cat6.xml') },
    { name: 'BBC Japan', url: rss('https://news.google.com/rss/search?q=site:bbc.com/japanese+when:2d&hl=ja&gl=JP&ceid=JP:ja') },
    { name: 'CNN Japan', url: rss('https://news.google.com/rss/search?q=site:cnn.co.jp+when:2d&hl=ja&gl=JP&ceid=JP:ja') },
  ],

  // 世界のニュース（英語ソース）
  world: [
    { name: 'Reuters', url: rss('https://feeds.reuters.com/reuters/worldNews') },
    { name: 'AP News', url: rss('https://rsshub.app/apnews/topics/world-news') },
    { name: 'BBC World', url: rss('https://feeds.bbci.co.uk/news/world/rss.xml') },
    { name: 'Al Jazeera', url: rss('https://www.aljazeera.com/xml/rss/all.xml') },
    { name: 'Guardian World', url: rss('https://www.theguardian.com/world/rss') },
  ],

  // マーケット
  markets: [
    { name: '日経マーケット', url: rss('https://news.google.com/rss/search?q=日経平均+OR+TOPIX+OR+為替+OR+株式市場+when:1d&hl=ja&gl=JP&ceid=JP:ja') },
    { name: '仮想通貨', url: rss('https://news.google.com/rss/search?q=ビットコイン+OR+仮想通貨+OR+暗号資産+when:2d&hl=ja&gl=JP&ceid=JP:ja') },
  ],
};

// Panel configuration for Japan news
export const DEFAULT_PANELS: Record<string, PanelConfig> = {
  map: { name: 'Sekai マップ', enabled: true, priority: 1 },
  'live-news': { name: '速報ニュース', enabled: true, priority: 1 },
  national: { name: '全国ニュース', enabled: true, priority: 1 },
  disaster: { name: '災害・防災', enabled: true, priority: 1 },
  politics: { name: '政治', enabled: true, priority: 1 },
  business: { name: '経済・ビジネス', enabled: true, priority: 1 },
  tech: { name: 'テクノロジー', enabled: true, priority: 1 },
  sports: { name: 'スポーツ', enabled: true, priority: 2 },
  entertainment: { name: 'エンタメ', enabled: true, priority: 2 },
  regional_north: { name: '北海道・東北', enabled: true, priority: 2 },
  regional_kanto: { name: '関東', enabled: true, priority: 2 },
  regional_central: { name: '中部・関西', enabled: true, priority: 2 },
  regional_west: { name: '中国・四国・九州・沖縄', enabled: true, priority: 2 },
  international: { name: '国際（日本語）', enabled: true, priority: 2 },
  world: { name: '世界のニュース', enabled: true, priority: 2 },
  markets: { name: 'マーケット', enabled: true, priority: 2 },
  monitors: { name: 'マイモニター', enabled: true, priority: 2 },
};

// Japan-focused map layers
export const DEFAULT_MAP_LAYERS: MapLayers = {
  conflicts: false,
  bases: false,
  cables: false,
  pipelines: false,
  hotspots: true,     // Show Japan regional hotspots with news activity
  ais: false,
  nuclear: true,      // Japan nuclear facilities
  irradiators: false,
  sanctions: false,
  weather: true,      // Weather is critical for Japan
  economic: true,
  waterways: false,
  outages: true,
  cyberThreats: false,
  datacenters: false,
  protests: false,
  flights: false,
  military: false,
  natural: true,      // Earthquakes, tsunamis
  spaceports: false,
  minerals: false,
  fires: false,
  ucdpEvents: false,
  displacement: false,
  climate: true,
  // Tech layers (disabled)
  startupHubs: false,
  cloudRegions: false,
  accelerators: false,
  techHQs: false,
  techEvents: false,
  // Finance layers (disabled)
  stockExchanges: false,
  financialCenters: false,
  centralBanks: false,
  commodityHubs: false,
  gulfInvestments: false,
};

// Mobile defaults for Japan variant
export const MOBILE_DEFAULT_MAP_LAYERS: MapLayers = {
  conflicts: false,
  bases: false,
  cables: false,
  pipelines: false,
  hotspots: false,
  ais: false,
  nuclear: false,
  irradiators: false,
  sanctions: false,
  weather: true,
  economic: false,
  waterways: false,
  outages: true,
  cyberThreats: false,
  datacenters: false,
  protests: false,
  flights: false,
  military: false,
  natural: true,
  spaceports: false,
  minerals: false,
  fires: false,
  ucdpEvents: false,
  displacement: false,
  climate: false,
  // Tech layers (disabled)
  startupHubs: false,
  cloudRegions: false,
  accelerators: false,
  techHQs: false,
  techEvents: false,
  // Finance layers (disabled)
  stockExchanges: false,
  financialCenters: false,
  centralBanks: false,
  commodityHubs: false,
  gulfInvestments: false,
};

export const VARIANT_CONFIG: VariantConfig = {
  name: 'japan',
  description: 'Japan news and disaster monitoring dashboard',
  panels: DEFAULT_PANELS,
  mapLayers: DEFAULT_MAP_LAYERS,
  mobileMapLayers: MOBILE_DEFAULT_MAP_LAYERS,
};
