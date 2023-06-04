const CACHE_VERSION = "1.0.0";
const CACHE_NAME = "dalilchablis-v" + CACHE_VERSION;

const assetsDir = "./assets/";
const imagesDir = assetsDir + "images/";
const modelsDir = assetsDir + "models/";
const soundsDir = assetsDir + "sounds/";

caches.keys().then((cacheNames) => {
    return Promise.all(
        cacheNames.filter((cacheName) => {
            return cacheName !== CACHE_NAME;
        }).map((cacheName) => {
            return caches.delete(cacheName);
        })
    );
})

self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                return cache.addAll([
                    "./index.html",
                    "./styles.css",
                    imagesDir + "dcLogoBlack.svg",
                    imagesDir + "dcLogoBlack192.png",
                    imagesDir + "dcLogoBlack196.png",
                    imagesDir + "dcLogoBlack512.png",
                    imagesDir + "dcLogoWhite.svg",
                    imagesDir + "dcLogoWhite192.png",
                    imagesDir + "dcLogoWhite196.png",
                    imagesDir + "dcLogoWhite512.png",
                    imagesDir + "outside/outside-1.webp",
                    modelsDir + "dcOffice.glb",
                    modelsDir + "dcOffice-dark.jpg",
                    modelsDir + "dcOffice-light.jpg",
                    soundsDir + "dcSound.mp3"
                ]);
            })
    );
});

self.addEventListener("fetch", (event) => {
    if (event.request.url.startsWith("https")) {
        event.respondWith(
            caches.match(event.request).then((cachedResponse) => {
                if (cachedResponse) {
                    return cachedResponse;
                }

                return fetch(event.request).then((response) => {
                    if (!response || response.status !== 200) {
                        return response;
                    }

                    const responseClone = response.clone();
                    caches.open(CACHE_NAME).then((cache) => {
                        cache.put(event.request, responseClone);
                    });

                    return response;
                }).catch(() => {
                    return new Response("<h1>You are offline.</h1>", { headers: { "Content-Type": "text/html" } });
                });
            })
        );
    }
});
