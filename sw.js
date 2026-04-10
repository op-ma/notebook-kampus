const CACHE_NAME = 'campusnotes-v1';
const urlsToCache = [
  './index.html',
  './manifest.json'
  // Jika Anda mengunduh React/Tailwind secara lokal, masukkan path-nya di sini
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Kembalikan cache jika ada, jika tidak lakukan fetch ke jaringan
        return response || fetch(event.request);
      })
  );
});