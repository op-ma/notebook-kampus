const CACHE_NAME = 'campusnotes-cache-v5.6';

// Daftar file dengan path spesifik GitHub Pages Anda
const urlsToCache = [
    '/notebook-kampus/',
    '/notebook-kampus/index.html',
    '/notebook-kampus/manifest.json',
    '/notebook-kampus/logo.svg',
    'https://cdn.tailwindcss.com',
    'https://unpkg.com/lucide@latest',
    'https://unpkg.com/react@18/umd/react.production.min.js',
    'https://unpkg.com/react-dom@18/umd/react-dom.production.min.js',
    'https://unpkg.com/@babel/standalone/babel.min.js',
    'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&display=swap'
];

self.addEventListener('install', (event) => {
    self.skipWaiting();
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('[Service Worker] Menyimpan cache...');
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cache) => {
                    if (cache !== CACHE_NAME) {
                        console.log('[Service Worker] Menghapus cache lama:', cache);
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                if (response) return response;
                return fetch(event.request).catch(() => {
                    return caches.match('/notebook-kampus/index.html');
                });
            })
    );
});
