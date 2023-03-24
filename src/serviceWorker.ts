declare const clients: { claim(): Promise<void> }

const broadcast = new BroadcastChannel('main');

self.addEventListener('fetch', async function(event: FetchEvent) {
  broadcast.postMessage({ type: 'FETCH' });
  void event.respondWith(fetch(event.request));
});

// Make work on first load
self.addEventListener("activate", (event: FetchEvent) => {
  void event.waitUntil(clients.claim());
});
