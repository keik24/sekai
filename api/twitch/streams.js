import { getCorsHeaders, isDisallowedOrigin } from '../_cors.js';

export const config = { runtime: 'edge' };

// Twitch Helix API - Get live streams for FGC players
// Supports both single user and batch queries

const TWITCH_API_BASE = 'https://api.twitch.tv/helix';

// OAuth token cache (Twitch Client Credentials flow)
let tokenCache = { token: null, expiresAt: 0 };

async function getTwitchToken() {
  const now = Date.now();
  if (tokenCache.token && now < tokenCache.expiresAt) {
    return tokenCache.token;
  }

  const clientId = process.env.TWITCH_CLIENT_ID;
  const clientSecret = process.env.TWITCH_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    return null;
  }

  try {
    const response = await fetch('https://id.twitch.tv/oauth2/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        grant_type: 'client_credentials',
      }),
    });

    if (!response.ok) return null;

    const data = await response.json();
    tokenCache = {
      token: data.access_token,
      expiresAt: now + (data.expires_in - 60) * 1000, // Refresh 60s before expiry
    };
    return data.access_token;
  } catch {
    return null;
  }
}

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

  // Support both single and batch queries
  // ?user_login=daigo,tokido,punk OR ?user_login=daigo
  const userLogins = (searchParams.get('user_login') || '')
    .split(',')
    .map(s => s.trim().toLowerCase())
    .filter(s => s.length > 0 && s.length <= 25 && /^[a-z0-9_]+$/.test(s))
    .slice(0, 100); // Twitch API max per request

  if (userLogins.length === 0) {
    return new Response(JSON.stringify({ error: 'Missing or invalid user_login parameter' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });
  }

  const token = await getTwitchToken();
  if (!token) {
    // Graceful degradation: return empty if no Twitch credentials
    return new Response(JSON.stringify({ streams: [], skipped: true, reason: 'no_credentials' }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=300, s-maxage=300',
        ...corsHeaders,
      },
    });
  }

  try {
    // Build query string: ?user_login=a&user_login=b&user_login=c
    const queryParams = userLogins.map(login => `user_login=${encodeURIComponent(login)}`).join('&');

    const response = await fetch(
      `${TWITCH_API_BASE}/streams?${queryParams}`,
      {
        headers: {
          'Client-ID': process.env.TWITCH_CLIENT_ID,
          'Authorization': `Bearer ${token}`,
        },
        signal: AbortSignal.timeout(10000),
      }
    );

    if (!response.ok) {
      // On rate limit, return empty gracefully
      if (response.status === 429) {
        return new Response(JSON.stringify({ streams: [], rate_limited: true }), {
          status: 200,
          headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'public, max-age=120, s-maxage=120',
            ...corsHeaders,
          },
        });
      }

      return new Response(JSON.stringify({ error: `Twitch API returned ${response.status}` }), {
        status: response.status,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
    }

    const data = await response.json();

    // Normalize stream data
    const streams = (data.data || []).map(stream => ({
      id: stream.id,
      user_login: stream.user_login,
      user_name: stream.user_name,
      title: stream.title,
      game_name: stream.game_name,
      viewer_count: stream.viewer_count,
      started_at: stream.started_at,
      thumbnail_url: stream.thumbnail_url,
      is_live: true,
    }));

    return new Response(JSON.stringify({
      streams,
      queried: userLogins.length,
      live: streams.length,
    }), {
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
