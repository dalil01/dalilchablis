const CACHE_VERSION = "1.0.6";
const CACHE_NAME = "dalilchablis-v" + CACHE_VERSION;

const LOCAL_STORAGE_KEYS_TO_REMOVE = ["is-dark-mode"];

self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.filter((cacheName) => {
                    return cacheName !== CACHE_NAME;
                }).map((cacheName) => {
                    for (const key of LOCAL_STORAGE_KEYS_TO_REMOVE) {
                        localStorage.removeItem(key);
                    }
                    return caches.delete(cacheName);
                })
            );
        })
    )
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
                    return new Response(
                        `<h1>You are offline.</h1>`,
                        {headers: {"Content-Type": "text/html"}}
                    );
                });
            })
        );
    }
});
