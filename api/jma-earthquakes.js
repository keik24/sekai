import { getCorsHeaders, isDisallowedOrigin } from './_cors.js';

export const config = { runtime: 'edge' };

// Japan Meteorological Agency P2P earthquake information API
// Uses the free P2P Earthquake API (api.p2pquake.net)
const JMA_API_BASE = 'https://api.p2pquake.net/v2';

export default async function handler(request) {
  const corsHeaders = getCorsHeaders(request, 'GET, OPTIONS');

  if (request.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: corsHeaders });
  }

  if (isDisallowedOrigin(request)) {
    return new Response(JSON.stringify({ error: 'Origin not allowed' }), {
      status: 403,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });
  }

  const { searchParams } = new URL(request.url);
  const limit = Math.min(parseInt(searchParams.get('limit') || '20', 10), 100);
  const minScale = parseInt(searchParams.get('min_scale') || '0', 10);

  try {
    // Fetch recent earthquake history
    const response = await fetch(
      `${JMA_API_BASE}/history?codes=551&limit=${limit}`,
      {
        headers: { 'User-Agent': 'WorldMonitor/1.0' },
        signal: AbortSignal.timeout(15000),
      }
    );

    if (!response.ok) {
      return new Response(JSON.stringify({ error: `JMA API returned ${response.status}` }), {
        status: response.status,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
    }

    const data = await response.json();

    // Transform to standardized format
    const earthquakes = data
      .filter(item => item.code === 551) // Earthquake information
      .filter(item => {
        if (minScale <= 0) return true;
        const scale = item.earthquake?.maxScale || 0;
        return scale >= minScale;
      })
      .map(item => ({
        id: item.id,
        time: item.earthquake?.time,
        hypocenter: {
          name: item.earthquake?.hypocenter?.name,
          latitude: item.earthquake?.hypocenter?.latitude,
          longitude: item.earthquake?.hypocenter?.longitude,
          depth: item.earthquake?.hypocenter?.depth,
          magnitude: item.earthquake?.hypocenter?.magnitude,
        },
        maxScale: item.earthquake?.maxScale,
        maxScaleText: scaleToText(item.earthquake?.maxScale),
        tsunami: item.earthquake?.domesticTsunami,
        points: (item.points || []).slice(0, 20).map(p => ({
          prefecture: p.pref,
          name: p.addr,
          scale: p.scale,
          scaleText: scaleToText(p.scale),
        })),
      }));

    return new Response(JSON.stringify({ earthquakes, count: earthquakes.length }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=60, s-maxage=60, stale-while-revalidate=30',
        ...corsHeaders,
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });
  }
}

// Convert JMA seismic intensity scale number to text
function scaleToText(scale) {
  const SCALE_MAP = {
    10: '震度1',
    20: '震度2',
    30: '震度3',
    40: '震度4',
    45: '震度5弱',
    50: '震度5強',
    55: '震度6弱',
    60: '震度6強',
    70: '震度7',
  };
  return SCALE_MAP[scale] || `震度不明(${scale})`;
}
