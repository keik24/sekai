// sekai.net のトップ: 「今日、世界のどこが休みか」の地図。sekai_home.py が /map/sekai.js へ写す。
// 日付は見ている人の端末の今日。全国で休みになる祝日の国を光らせ、昼と夜の境目を重ねる。
// 地図は拡大・縮小・移動できる（ホイール / ドラッグ / 2 本指 / 右上のボタン）。
(function () {
    'use strict';
    var cfg = JSON.parse(document.getElementById('sk-cfg').textContent);
    var NS = 'http://www.w3.org/2000/svg';
    var W = 960, H = 480, MAX_ZOOM = 12;
    var mapEl = document.getElementById('sk-map');
    var tip = document.getElementById('sk-tip');
    var listEl = document.getElementById('sk-list');
    var noneEl = document.getElementById('sk-none');
    var countEl = document.getElementById('sk-count');
    var dateEl = document.getElementById('sk-date');
    var clockEl = document.getElementById('sk-clock');

    function iso(d) {
        return d.getFullYear() + '-' + ('0' + (d.getMonth() + 1)).slice(-2) + '-' + ('0' + d.getDate()).slice(-2);
    }
    function parse(s) {
        var p = s.split('-');
        return new Date(+p[0], +p[1] - 1, +p[2]);
    }
    function clampDay(s) {
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
    function tick() {
        var s = new Date().toISOString();
        clockEl.textContent = s.slice(0, 10) + ' ' + s.slice(11, 19) + ' UTC';
    }
    tick();
    setInterval(tick, 1000);

    var realToday = clampDay(iso(new Date()));
    var current = realToday;

    Promise.all([json('/map/world.json'), json('/map/days.json'), json(cfg.t)]).then(function (r) {
        var world = r[0], days = r[1], names = r[2].c, titles = r[2].t;
        var features = topojson.feature(world, world.objects.countries).features;
        // 南極を切って、陸が画面いっぱいに入るようにする
        var projection = d3.geoNaturalEarth1().fitExtent([[0, 6], [W, H + 70]], { type: 'Sphere' });
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
        // フランス本土・米国本土のように飛び地がある国は、いちばん大きい陸のまとまりの真ん中に印を置く
        features.forEach(function (f) {
            if (!f.id || !f.geometry || f.geometry.type !== 'MultiPolygon') return;
            var best = null, bestArea = 0;
            f.geometry.coordinates.forEach(function (poly) {
                var g = { type: 'Polygon', coordinates: poly };
                var a = path.area(g);
                if (a > bestArea) { bestArea = a; best = g; }
            });
            if (best && byCode[f.id]) byCode[f.id].center = path.centroid(best);
        });
        svg.appendChild(land);
        var night = el('path', { 'class': 'sk-night' });
        svg.appendChild(night);
        var marks = el('g', {});
        svg.appendChild(marks);
        mapEl.textContent = '';
        mapEl.appendChild(svg);

        // ---- 拡大・縮小・移動（viewBox を動かす）----
        var view = { x: 0, y: 0, k: 1 };
        function applyView() {
            var w = W / view.k, h = H / view.k;
            view.x = Math.max(0, Math.min(W - w, view.x));
            view.y = Math.max(0, Math.min(H - h, view.y));
            svg.setAttribute('viewBox', view.x + ' ' + view.y + ' ' + w + ' ' + h);
            // 拡大したら 1 本指でも地図を動かせるように（等倍のときはページのスクロールを優先）
            svg.style.touchAction = view.k > 1 ? 'none' : 'pan-y';
            sizeMarks();
        }
        function toMap(clientX, clientY) {
            var b = svg.getBoundingClientRect();
            return [view.x + (clientX - b.left) / b.width * (W / view.k), view.y + (clientY - b.top) / b.height * (H / view.k)];
        }
        function zoomAt(factor, clientX, clientY) {
            var b = svg.getBoundingClientRect();
            if (clientX === undefined) { clientX = b.left + b.width / 2; clientY = b.top + b.height / 2; }
            var p = toMap(clientX, clientY);
            var k = Math.max(1, Math.min(MAX_ZOOM, view.k * factor));
            var fx = (clientX - b.left) / b.width, fy = (clientY - b.top) / b.height;
            view.k = k;
            view.x = p[0] - fx * (W / k);
            view.y = p[1] - fy * (H / k);
            applyView();
        }
        document.getElementById('sk-in').addEventListener('click', function () { zoomAt(1.6); });
        document.getElementById('sk-out').addEventListener('click', function () { zoomAt(1 / 1.6); });
        document.getElementById('sk-home').addEventListener('click', function () { view = { x: 0, y: 0, k: 1 }; applyView(); });
        svg.addEventListener('wheel', function (e) {
            if (!e.ctrlKey && !e.metaKey && view.k === 1 && e.deltaY > 0) return;   // 等倍で下へ回したらページを送る
            e.preventDefault();
            zoomAt(e.deltaY < 0 ? 1.25 : 0.8, e.clientX, e.clientY);
        }, { passive: false });

        var pointers = {}, dragged = false, pinchDist = 0;
        svg.addEventListener('pointerdown', function (e) {
            pointers[e.pointerId] = { x: e.clientX, y: e.clientY };
            dragged = false;
            pinchDist = 0;
        });
        svg.addEventListener('pointermove', function (e) {
            var p = pointers[e.pointerId];
            if (!p) { hover(e); return; }
            var ids = Object.keys(pointers);
            if (ids.length === 2) {
                p.x = e.clientX; p.y = e.clientY;
                var a = pointers[ids[0]], b2 = pointers[ids[1]];
                var dist = Math.hypot(a.x - b2.x, a.y - b2.y);
                if (pinchDist) zoomAt(dist / pinchDist, (a.x + b2.x) / 2, (a.y + b2.y) / 2);
                pinchDist = dist;
                dragged = true;
                return;
            }
            var dx = e.clientX - p.x, dy = e.clientY - p.y;
            if (!dragged && Math.hypot(dx, dy) < 5) return;
            if (view.k === 1) return;
            dragged = true;
            svg.classList.add('dragging');
            tip.hidden = true;
            var b = svg.getBoundingClientRect();
            view.x -= dx / b.width * (W / view.k);
            view.y -= dy / b.height * (H / view.k);
            p.x = e.clientX; p.y = e.clientY;
            applyView();
        });
        function release(e) {
            delete pointers[e.pointerId];
            svg.classList.remove('dragging');
        }
        svg.addEventListener('pointerup', release);
        svg.addEventListener('pointercancel', release);
        svg.addEventListener('pointerleave', function (e) { release(e); tip.hidden = true; });

        // ---- 印（点・輪・国名）。画面上の大きさを一定に保つ ----
        function sizeMarks() {
            // 地図の 1 単位が画面の何ピクセルか（スマホでも文字と点が同じ大きさに見えるように）
            var px = (svg.getBoundingClientRect().width || W) / (W / view.k);
            Array.prototype.forEach.call(marks.querySelectorAll('.sk-dot'), function (n) { n.setAttribute('r', 3.5 / px); });
            Array.prototype.forEach.call(marks.querySelectorAll('.sk-ring'), function (n) { n.setAttribute('r', 3.5 / px); });
            Array.prototype.forEach.call(marks.querySelectorAll('.sk-label'), function (n) {
                n.setAttribute('font-size', 10.5 / px);
                n.setAttribute('dy', -8 / px);
                n.style.strokeWidth = (2.5 / px) + 'px';
                // 画面の上で十分に大きい国だけ名前を出す。拡大すると小さい国も出る
                n.style.display = (+n.dataset.area * px * px > 1100) ? '' : 'none';
            });
        }
        window.addEventListener('resize', sizeMarks);

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
            marks.textContent = '';
            on.forEach(function (cc) {
                var c = byCode[cc];
                if (!c || !isFinite(c.center[0])) return;
                var ring = el('circle', { 'class': 'sk-ring', cx: c.center[0], cy: c.center[1] });
                var dot = el('circle', { 'class': 'sk-dot', cx: c.center[0], cy: c.center[1] });
                dot.dataset.cc = cc;
                marks.appendChild(ring);
                marks.appendChild(dot);
                if (names[cc]) {
                    var label = el('text', { 'class': 'sk-label', x: c.center[0], y: c.center[1] });
                    label.dataset.area = c.area;
                    label.textContent = names[cc];
                    marks.appendChild(label);
                }
            });
            sizeMarks();
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
            current = clampDay(iso(d));
            render();
        }
        document.getElementById('sk-prev').addEventListener('click', function () { shift(-1); });
        document.getElementById('sk-next').addEventListener('click', function () { shift(1); });
        document.getElementById('sk-now').addEventListener('click', function () { current = realToday; render(); });

        function ccOf(target) {
            return target && target.dataset ? target.dataset.cc : '';
        }
        function hover(e) {
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
        }
        svg.addEventListener('click', function (e) {
            if (dragged) return;   // 地図を動かした後の指離しでは開かない
            var cc = ccOf(e.target);
            if (cc && names[cc]) {
                if (window.gtag) gtag('event', 'map_country_open', { country: cc.toLowerCase() });
                location.href = cfg.root + cc.toLowerCase() + '/' + cfg.file;
            }
        });

        applyView();
        render();
        setInterval(drawNight, 60000);
    }).catch(function (e) {
        // 地図が読めなくても、HTML に入っている一覧はそのまま読める
        if (window.console) console.error(e);
    });
})();
