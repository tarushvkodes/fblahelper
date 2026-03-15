const CACHE_NAME = "fbla-helper-v1";
const CORE_ASSETS = [
  "./",
  "./index.html",
  "./styles.css",
  "./resource_data.js",
  "./combined_question_bank.js",
  "./ai_question_bank.js",
  "./roleplay_reference.js",
  "./site.webmanifest",
  "./icon.svg",
  "./js/constants.js",
  "./js/utils.js",
  "./js/manual-quiz-data.js",
  "./js/data.js",
  "./js/quiz.js",
  "./js/roleplay.js",
  "./js/workspace.js",
  "./js/app.js"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(CORE_ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;
      return fetch(event.request).then((response) => {
        const clone = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone)).catch(() => {});
        return response;
      }).catch(() => caches.match("./index.html"));
    })
  );
});
