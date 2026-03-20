const CACHE_NAME = 'life-trend-monitor-v1';
const urlsToCache = [
  './',
  './index.html',
  './style.css',
  './script.js',
  './icon-life.png',
  './manifest.json'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
  // skipWaiting() はページ側のユーザー操作で呼ぶため、ここでは呼ばない
});

// 古いキャッシュの削除 + 即座にページを制御下に置く
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// ページからの「今すぐ更新」メッセージを受け取り skipWaiting を実行
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});
