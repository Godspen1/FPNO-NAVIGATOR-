const CACHE_NAME = "fpno-cache-v1";

self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache =>
      cache.addAll(["/", "/index.html"])
    )
  );
  self.skipWaiting();
});

self.addEventListener("fetch", e => {
  e.respondWith(
    caches.match(e.request).then(resp =>
      resp || fetch(e.request).catch(() => caches.match("/index.html"))
    )
  );
});
