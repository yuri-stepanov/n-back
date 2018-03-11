const CACHE_NAME = 'n-back-cache-v1';

const requestSuccessful = response =>
  response && response.status === 200 && response.type === 'basic';

self.addEventListener('fetch', event => {
  console.log('Fetching request');
  console.log(event);

  // DevTools opening will trigger these o-i-c requests, which this SW can't handle.
  if (
    event.request.cache === 'only-if-cached' &&
    event.request.mode !== 'same-origin'
  ) {
    console.log('Debug tools opened');
    return;
  }

  return event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      const fetchRequest = event.request.clone();

      console.log('Resolved cache');
      console.log(cachedResponse);

      return fetch(fetchRequest)
        .then(actualResponse => {
          console.log('Performed request: ');
          console.log(actualResponse);

          if (requestSuccessful(actualResponse)) {
            console.log('requestSuccessful');
            const responseToCache = actualResponse.clone();
            caches.open(CACHE_NAME).then(cache => {
              console.log('Putting into cache');
              cache.put(event.request, responseToCache);
            });

            return actualResponse;
          }

          if (cachedResponse) {
            console.log('Returning from cache');
            return cachedResponse;
          }

          console.log('Total fail. Returning as is');
          return actualResponse;
        })
        .catch(err => {
          console.log('Catching fetch error');
          console.log(err);
          return cachedResponse;
        });
    }),
  );
});
