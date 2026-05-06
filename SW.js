const CACHE_NAME = 'pwa-mansilla-v1';

// Archivos que se guardarán en la memoria caché para funcionar offline
const urlsToCache = [
    './',
    './index.html',
    './style.css', // Asegúrate de separar tu CSS a este archivo
    './script.js', // Asegúrate de separar tu JS a este archivo
    'https://i.ibb.co/Hpr48bTP/Whats-App-Image-2026-05-05-at-9-45-01-PM.jpg',
    './manifest.json'
];

// Evento de Instalación del Service Worker
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Archivos cacheados exitosamente para uso offline');
                return cache.addAll(urlsToCache);
            })
            .catch(err => console.error('Error al cachear', err))
    );
});

// Evento de Activación y limpieza de cachés antiguos
self.addEventListener('activate', event => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        console.log('Borrando caché antiguo:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

// Evento Fetch: Intercepta las peticiones (Cache First, Network Fallback)
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // Si el archivo está en caché, lo devuelve sin gastar datos
                if (response) {
                    return response;
                }
                // Si no está en caché, hace la petición a la red (internet)
                return fetch(event.request);
            })
    );
});