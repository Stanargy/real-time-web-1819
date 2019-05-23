const cacheName = 'v1';

// 28-03-2018 note to self
// cacheAssets consists of the url requests from the router!! It doesn't use ejs templates etc 
const cacheAssets = [
    '/',
    '/dist/css/style.css',
    


    // 'detail.ejs',
    // '404.ejs',
    // 'about.ejs',
    // 'style.css'
];

// Service Worker - Caching
self.addEventListener('install', (event => {
    console.log('installing service worker');
    event.waitUntil(
        caches
        .open(cacheName)
        .then(cache => {
            console.log('Service Worker: Caching Files');
            cache.addAll(cacheAssets);
        })
        .then(() => self.skipWaiting())
    )
}));


self.addEventListener('activate', (event => {
    console.log('activating service worker');
    // Remove unwanted Caches 

    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(cacheNames.map(cache => {
                if (cache !== cacheName) {
                    console.log('Service Worker: Clearing old Cache')
                    return caches.delete(cache);
                }
            }))
        })
    )
}))



// Serve Files When offline

// Op dit moment wordt als eerste een nieuwe request gevuurd naar de server ipv naar de cache
// offline wordt de cache niet geupdate

// voeg code toe aan fetch event
self.addEventListener('fetch', event =>{
    console.log('Service Worker: Fetching');
    
    // Fetch aan het netwerk
    event.respondWith(fetch(event.request)
    .then((res) => {

                        // Hier hebben we een antwoord van het netwerk gehad in de variable 'res'
                        //console.log(res);
                        // event.request.url
                        // Bepalen of we dit bestand willen cachen
                        // .. zo ja -> Caches openen en updaten
        caches
        .open(cacheName)
        .then(cache => {
            console.log('Service Worker: Caching Files', [event.request.url]);
            cache.addAll([event.request.url]);
        })




        // .. Deze geven we door aan de browser.. EINDE
        return res;
    })
    .catch(() => {
        // fetch() is mislukt, we gaan proberen uit de cache te leveren
           // console.log('from cache', event.request);
            return caches.match(event.request);
            // Cache openen 
            // Cache updaten

        })
    )
})