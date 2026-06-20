self.addEventListener('install', function() {
  self.skipWaiting();
});

self.addEventListener('activate', function(event) {
  event.waitUntil((async function() {
    const cacheNames = await caches.keys();
    await Promise.all(cacheNames.map(function(cacheName) {
      return caches.delete(cacheName);
    }));

    await self.registration.unregister();

    const clients = await self.clients.matchAll({
      includeUncontrolled: true,
      type: 'window',
    });

    clients.forEach(function(client) {
      client.navigate(client.url);
    });
  })());
});
