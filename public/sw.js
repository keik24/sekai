// The old site (a news dashboard) installed a service worker that served its cached app shell for every page.
// This replacement removes itself and reloads open tabs, so returning visitors get the new static site.
self.addEventListener('install', function () { self.skipWaiting(); });
self.addEventListener('activate', function (event) {
    event.waitUntil(
        caches.keys()
            .then(function (keys) { return Promise.all(keys.map(function (k) { return caches.delete(k); })); })
            .then(function () { return self.registration.unregister(); })
            .then(function () { return self.clients.matchAll({ type: 'window' }); })
            .then(function (clients) { clients.forEach(function (c) { c.navigate(c.url); }); })
    );
});
