// Use Node.js serverless runtime — FRED API blocks Vercel Edge IPs
export const config = { maxDuration: 30 };

export default async function handler(req, res) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { series_id: seriesId, observation_start: observationStart, observation_end: observationEnd } = req.query;

  if (!seriesId) {
    return res.status(400).json({ error: 'Missing series_id parameter' });
  }

  const apiKey = process.env.FRED_API_KEY;
  if (!apiKey) {
    res.setHeader('Cache-Control', 'public, max-age=300, s-maxage=300, stale-while-revalidate=60');
    return res.status(200).json({ observations: [], skipped: true, reason: 'FRED_API_KEY not configured' });
  }

  try {
    const params = new URLSearchParams({
      series_id: seriesId,
      api_key: apiKey,
      file_type: 'json',
      sort_order: 'desc',
      limit: '10',
    });

    if (observationStart) params.set('observation_start', observationStart);
    if (observationEnd) params.set('observation_end', observationEnd);

    const fredUrl = `https://api.stlouisfed.org/fred/series/observations?${params}`;
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 20000);
    const response = await fetch(fredUrl, {
      headers: { 'Accept': 'application/json' },
      signal: controller.signal,
    });
    clearTimeout(timeout);

    const data = await response.json();

    res.setHeader('Cache-Control', 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=600');
    return res.status(response.status).json(data);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
