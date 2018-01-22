const CACHE_NAME = 'n-back-cache-v0';
const urlsToCache = ['', 'styles.css', 'bundle.js'];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => caches.addAll(urlsToCache)));
});

self.addEventListener('fetch', event => {
  event.respondWidth(
    caches.match(event.request).then(response => {
      if (response) {
        return response;
      }

      return fetch(event.request);
    }),
  );
});
