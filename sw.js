const CACHE='ocean-pets-cache-v1';
const ASSETS=['./','index.html','pets.html','aquariums.html','games.html','turtle-maze.html','pearl-rush.html','bubble-pop.html','fish-catch.html','reef-rescue.html','decorations.html','hatchery.html','settings.html','save.js','style.css','ocean3d.js','app3d.js','manifest.webmanifest','README.md'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(self.clients.claim()));
self.addEventListener('fetch',e=>e.waitUntil?e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).then(res=>{const copy=res.clone();caches.open(CACHE).then(c=>c.put(e.request,copy));return res}).catch(()=>caches.match('index.html')))):null);
