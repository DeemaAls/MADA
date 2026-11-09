/* MADA service worker: app shell offline, runtime cache for CDN libraries and MediaPipe models. */
const SHELL = 'mada-shell-v3', RUNTIME = 'mada-runtime-v1';
const SHELL_FILES = ['./', './index.html', './config.js', './manifest.webmanifest', './icons/icon-192.png', './icons/icon-512.png'];
const CDN = /(^|\.)(jsdelivr\.net|storage\.googleapis\.com|fonts\.googleapis\.com|fonts\.gstatic\.com|cdnjs\.cloudflare\.com)$/;

self.addEventListener('install', e => {
  e.waitUntil(caches.open(SHELL).then(c => Promise.all(SHELL_FILES.map(f => c.add(f).catch(() => null)))).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== SHELL && k !== RUNTIME).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.hostname.endsWith('supabase.co')) return;                      // live data: always network
  if (url.origin === location.origin) {
    if (req.mode === 'navigate' || url.pathname.endsWith('.html') || url.pathname.endsWith('config.js')) {
      e.respondWith(fetch(req).then(r => { const c = r.clone(); caches.open(SHELL).then(s => s.put(req.mode === 'navigate' ? './index.html' : req, c)); return r; })
        .catch(() => caches.match(req).then(r => r || caches.match('./index.html'))));
      return;
    }
    e.respondWith(caches.match(req).then(hit => hit || fetch(req).then(r => {
      if (r.ok && (url.pathname.includes('/models/') || url.pathname.includes('/vendor/') || url.pathname.includes('/icons/') || url.pathname.includes('/videos/'))) { const c = r.clone(); caches.open(RUNTIME).then(s => s.put(req, c)); }
      return r;
    })));
    return;
  }
  if (CDN.test(url.hostname)) {
    e.respondWith(caches.match(req).then(hit => hit || fetch(req).then(r => {
      if (r.ok || r.type === 'opaque') { const c = r.clone(); caches.open(RUNTIME).then(s => s.put(req, c)); }
      return r;
    })));
  }
});
self.addEventListener('notificationclick', e => {
  e.notification.close();
  e.waitUntil(self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(cs => {
    for (const c of cs) { if ('focus' in c) return c.focus(); }
    return self.clients.openWindow('./');
  }));
});
