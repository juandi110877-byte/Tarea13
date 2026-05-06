const CACHE_NAME = 'pwa-cache-v1';
const urlsToCache = [
  './',
  './index.html',
  './style.css',
  './script.js',
  'https://i.ibb.co/Hpr48bTP/Whats-App-Image-2026-05-05-at-9-45-01-PM.jpg',
  'https://i.ibb.co/5h5jF51R/resize-Logo.jpg'
];

// Instalación del Service Worker y Caché de recursos
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Archivos en caché guardados');
        return cache.addAll(urlsToCache);
      })
  );
});

// Interceptar peticiones para que funcione offline
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Devuelve el recurso en caché si existe, sino lo descarga
        return response || fetch(event.request);
      })
  );
});