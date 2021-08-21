//Update cache names any time any of the cached files change.
const CACHE_NAME = 'static-cache-v1';

//Add list of files to cache here.
const FILES_TO_CACHE = [
   "index.html",
   "histoire.html",
   "jeux.html"
];
 

self.addEventListener('install', (evt) => {
   console.log('[ServiceWorker] Install');
   // Precache static resources here.
   evt.waitUntil(
      caches.open(CACHE_NAME).then((cache) => {
           console.log('[ServiceWorker] Pre-caching offline page');
           return cache.addAll(FILES_TO_CACHE);
      })
   );

   self.skipWaiting();
});

self.addEventListener('activate', (evt) => {
   console.log('[ServiceWorker] Activate');
   //Remove previous cached data from disk.

   self.clients.claim();
});

self.addEventListener('fetch', (evt) => {
   console.log('[ServiceWorker] Fetch', evt.request.url);
   //Add fetch event handler here.
});

// Register service worker.
if ('serviceWorker' in navigator) {
   window.addEventListener('load', () => {
     navigator.serviceWorker.register('service-worker.js')
         .then((reg) => {
           console.log('Service worker registered.', reg);
         });
   });
 }