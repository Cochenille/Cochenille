//Update cache names any time any of the cached files change.
const CACHE_NAME = 'static-cache-v10';

//Add list of files to cache here.
const FILES_TO_CACHE = [
    'offline.html',
    'index.html',
    'jeux.html',
    'histoire.html',
    'js/install.js',
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
    evt.waitUntil(
        caches.keys().then((keyList) => {
            return Promise.all(keyList.map((key) => {
                if (key !== CACHE_NAME) {
                    console.log('[ServiceWorker] Removing old cache',
                        key);
                    return caches.delete(key);
                }
            }));
        })
    );
    self.clients.claim();
});



self.addEventListener("fetch", event => {
    if (event.request.url === "https://cochenille.github.io/Cochenille/PointNClick2/index.html") {
        // or whatever your app's URL is
        event.respondWith(
            fetch(event.request).catch(err =>
                self.caches.open(CACHE_NAME).then(cache => cache.match("offline.html"))
            )
        );
    } else {
        event.respondWith(
            fetch(event.request).catch(err =>
                caches.match(event.request).then(response => response)
            )
        );
    }
});