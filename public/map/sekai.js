// sekai.net のトップ: 「今日、世界のどこが休みか」の地図。sekai_home.py が /map/sekai.js へ写す。
// 日付は見ている人の端末の今日。全国で休みになる祝日の国を光らせ、昼と夜の境目を重ねる。
(function () {
    'use strict';
    var cfg = JSON.parse(document.getElementById('sk-cfg').textContent);
    var NS = 'http://www.w3.org/2000/svg';
    var W = 960, H = 500;
    var mapEl = document.getElementById('sk-map');
    var tip = document.getElementById('sk-tip');
    var listEl = document.getElementById('sk-list');
    var noneEl = document.getElementById('sk-none');
    var countEl = document.getElementById('sk-count');
    var dateEl = document.getElementById('sk-date');

    function iso(d) {
        return d.getFullYear() + '-' + ('0' + (d.getMonth() + 1)).slice(-2) + '-' + ('0' + d.getDate()).slice(-2);
    }
    function parse(s) {
        var p = s.split('-');
        return new Date(+p[0], +p[1] - 1, +p[2]);
    }
    function clamp(s) {
        return s < cfg.first ? cfg.first : s > cfg.last ? cfg.last : s;
    }
    function flag(cc) {
        return cc.length === 2 ? String.fromCodePoint(127397 + cc.charCodeAt(0), 127397 + cc.charCodeAt(1)) : '';
    }
    function el(name, attrs) {
        var n = document.createElementNS(NS, name);
        for (var k in attrs) n.setAttribute(k, attrs[k]);
        return n;
    }
    // 太陽が真上にある場所（経度・緯度）。均時差は入れていない（境目が数度ずれるだけ）
    function sun(now) {
        var start = Date.UTC(now.getUTCFullYear(), 0, 0);
        var day = (now.getTime() - start) / 864e5;
        var decl = -23.44 * Math.cos(2 * Math.PI / 365 * (day + 10));
        var hours = now.getUTCHours() + now.getUTCMinutes() / 60;
        return [(12 - hours) * 15, decl];
    }
    function json(url) {
        return fetch(url).then(function (r) {
            if (!r.ok) throw new Error(url + ' ' + r.status);
            return r.json();
        });
    }

    var labelFormat;
    try {
        labelFormat = new Intl.DateTimeFormat(cfg.hl, { month: 'short', day: 'numeric', weekday: 'short' });
    } catch (e) {
        labelFormat = null;
    }
    var realToday = clamp(iso(new Date()));
    var current = realToday;

    Promise.all([json('/map/world.json'), json('/map/days.json'), json(cfg.t)]).then(function (r) {
        var world = r[0], days = r[1], names = r[2].c, titles = r[2].t;
        var features = topojson.feature(world, world.objects.countries).features;
        var projection = d3.geoEqualEarth().fitExtent([[4, 4], [W - 4, H - 4]], { type: 'Sphere' });
        var path = d3.geoPath(projection);

        var svg = el('svg', { viewBox: '0 0 ' + W + ' ' + H, 'aria-hidden': 'true' });
        svg.appendChild(el('path', { 'class': 'sk-sphere', d: path({ type: 'Sphere' }) }));
        svg.appendChild(el('path', { 'class': 'sk-grat', d: path(d3.geoGraticule10()) }));
        var land = el('g', {});
        var byCode = {};
        features.forEach(function (f) {
            var d = path(f);
            if (!d) return;
            var p = el('path', { 'class': 'sk-c' + (names[f.id] ? ' link' : ''), d: d });
            p.dataset.cc = f.id || '';
            land.appendChild(p);
            if (f.id) byCode[f.id] = { node: p, area: path.area(f), center: path.centroid(f) };
        });
        svg.appendChild(land);
        var dots = el('g', {});
        svg.appendChild(dots);
        var night = el('path', { 'class': 'sk-night' });
        svg.appendChild(night);
        mapEl.textContent = '';
        mapEl.appendChild(svg);

        function drawNight() {
            // 選んだ日が今日なら今の時刻、ほかの日なら同じ時刻のその日
            var now = new Date();
            var d = parse(current);
            d.setHours(now.getHours(), now.getMinutes(), 0, 0);
            var s = sun(d);
            night.setAttribute('d', path(d3.geoCircle().center([s[0] + 180, -s[1]]).radius(90)()) || '');
        }

        function render() {
            var on = (days[current] || '').split(',').filter(Boolean);
            var set = {};
            on.forEach(function (cc) { set[cc] = true; });
            Object.keys(byCode).forEach(function (cc) { byCode[cc].node.classList.toggle('on', !!set[cc]); });
            // 小さくて見えない国には点を打つ
            dots.textContent = '';
            on.forEach(function (cc) {
                var c = byCode[cc];
                if (c && c.area < 14 && isFinite(c.center[0])) {
                    var dot = el('circle', { 'class': 'sk-dot', cx: c.center[0], cy: c.center[1], r: 3 });
                    dot.dataset.cc = cc;
                    dots.appendChild(dot);
                }
            });
            var t = titles[current] || {};
            var rows = on.filter(function (cc) { return names[cc]; }).sort(function (a, b) { return names[a].localeCompare(names[b], cfg.hl); });
            listEl.textContent = '';
            rows.forEach(function (cc) {
                var li = document.createElement('li');
                li.appendChild(document.createTextNode(flag(cc) + ' '));
                var a = document.createElement('a');
                a.href = cfg.root + cc.toLowerCase() + '/' + cfg.file;
                a.textContent = names[cc];
                li.appendChild(a);
                var s = document.createElement('span');
                s.textContent = t[cc] || '';
                li.appendChild(s);
                listEl.appendChild(li);
            });
            noneEl.hidden = rows.length > 0;
            countEl.textContent = cfg.count.replace('{n}', rows.length);
            dateEl.setAttribute('datetime', current);
            dateEl.textContent = labelFormat ? labelFormat.format(parse(current)) : current;
            drawNight();
        }

        function shift(n) {
            var d = parse(current);
            d.setDate(d.getDate() + n);
            current = clamp(iso(d));
            render();
        }
        document.getElementById('sk-prev').addEventListener('click', function () { shift(-1); });
        document.getElementById('sk-next').addEventListener('click', function () { shift(1); });
        document.getElementById('sk-now').addEventListener('click', function () { current = realToday; render(); });

        function ccOf(target) {
            return target && target.dataset ? target.dataset.cc : '';
        }
        svg.addEventListener('pointermove', function (e) {
            var cc = ccOf(e.target);
            if (!cc || !names[cc]) { tip.hidden = true; return; }
            var title = (titles[current] || {})[cc];
            tip.textContent = '';
            var b = document.createElement('b');
            b.textContent = flag(cc) + ' ' + names[cc];
            tip.appendChild(b);
            if (title) {
                var s = document.createElement('span');
                s.textContent = title;
                tip.appendChild(s);
            }
            tip.hidden = false;
            var x = Math.min(e.clientX + 14, window.innerWidth - tip.offsetWidth - 8);
            tip.style.left = Math.max(8, x) + 'px';
            tip.style.top = Math.max(8, e.clientY - tip.offsetHeight - 12) + 'px';
        });
        svg.addEventListener('pointerleave', function () { tip.hidden = true; });
        svg.addEventListener('click', function (e) {
            var cc = ccOf(e.target);
            if (cc && names[cc]) {
                if (window.gtag) gtag('event', 'map_country_open', { country: cc.toLowerCase() });
                location.href = cfg.root + cc.toLowerCase() + '/' + cfg.file;
            }
        });

        render();
        setInterval(drawNight, 60000);
    }).catch(function (e) {
        // 地図が読めなくても、HTML に入っている一覧はそのまま読める
        if (window.console) console.error(e);
    });
})();
