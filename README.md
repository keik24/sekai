# sekai.net

Which countries are on a public holiday today: a world map, country pages and monthly pages in 35 languages.

- Static site. Everything under `public/` is published as-is by Vercel (no build step, see `vercel.json`).
- **The pages are generated. Do not edit files under `public/` by hand**, except `about/`, `privacy/`, `ads.txt`, `robots.txt`, `sitemap.xml`, `sw.js` and `favico/`.
- Generators live in the private `keik24/project` repository:
  - `tools/keik-site/sekai_home.py --out public --adsense <id>` writes the world map pages (`/`, `/index-<lang>.html`, `/map/`).
  - `tools/keik-site/holidays.py --site https://sekai.net/holidays --home Sekai --adsense <id> --out public/holidays` writes the country and monthly pages.
- Merging to `main` publishes to sekai.net.

## Data and licenses

- Holiday dates: [Nager.Date](https://date.nager.at/). Notes and translations: written for the World Holidays app (KeiK LLC).
- Map borders: [world-atlas](https://github.com/topojson/world-atlas) (Natural Earth, public domain).
- `public/map/d3-array.min.js`, `d3-geo.min.js`, `topojson-client.min.js`: ISC license (Mike Bostock).

Until November 2026 this repository held a news dashboard based on World Monitor (AGPL-3.0). That code is in the git history.
