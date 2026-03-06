const cacheName = 'test-cache-v2';  // Cache version name — change this to update cache
const filesToCache = [
  '/Test/',           // Cache root page for GitHub Pages repo site
  '/Test/index.html', // Cache main HTML page
  '/Test/manifest.json',
  '/Test/icon.png',
  // Add here any other static assets you want cached (CSS, JS, images, etc.)
];

self.addEventListener('install', (event) => {
  // During install, open the cache and add all files to it
  event.waitUntil(
    caches.open(cacheName)
      .then(cache => cache.addAll(filesToCache))
  );
});

self.addEventListener('fetch', (event) => {
  // On fetch, respond with cached version if available, else fetch from network
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});

self.addEventListener('activate', (event) => {
  // Remove legacy caches that may have been created under the old brand
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(k => k !== cacheName).map(k => caches.delete(k))
    ))
  );
});