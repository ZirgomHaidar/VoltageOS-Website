const SHELL_CACHE = "voltage-shell-v1"
const AVATAR_CACHE = "voltage-avatars-v1"

const PRECACHE_URLS = [
  "/",
  "/fonts/GeistVariable.woff2",
  "/fonts/InterVariable-latin.woff2",
  "/voltageico.svg",
]

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(SHELL_CACHE)
      .then((cache) => cache.addAll(PRECACHE_URLS))
      .then(() => self.skipWaiting()),
  )
})

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((k) => k !== SHELL_CACHE && k !== AVATAR_CACHE)
            .map((k) => caches.delete(k)),
        ),
      )
      .then(() => self.clients.claim()),
  )
})

self.addEventListener("fetch", (event) => {
  const { request } = event
  const url = new URL(request.url)

  // Only intercept GET
  if (request.method !== "GET") return

  // 1. Navigation (HTML pages) -> Network first, fallback to cached '/'
  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then((response) => {
          if (response.ok) {
            const clone = response.clone()
            caches.open(SHELL_CACHE).then((cache) => cache.put("/", clone))
          }
          return response
        })
        .catch(() => caches.match("/")),
    )
    return
  }

  // 2. Local hashed/static assets -> Cache first
  if (
    url.origin === self.location.origin &&
    (url.pathname.startsWith("/assets/") ||
      url.pathname.startsWith("/fonts/") ||
      url.pathname.startsWith("/images/"))
  ) {
    event.respondWith(
      caches.match(request).then((cached) => {
        if (cached) return cached
        return fetch(request).then((response) => {
          if (response.ok) {
            const clone = response.clone()
            caches
              .open(SHELL_CACHE)
              .then((cache) => cache.put(request, clone))
          }
          return response
        })
      }),
    )
    return
  }

  // 3. GitHub Maintainer Avatars -> Stale-while-revalidate
  if (
    url.hostname === "avatars.githubusercontent.com" ||
    url.hostname === "github.com"
  ) {
    event.respondWith(
      caches.open(AVATAR_CACHE).then((cache) =>
        cache.match(request).then((cached) => {
          const fetchPromise = fetch(request)
            .then((networkResponse) => {
              if (networkResponse.ok) {
                cache.put(request, networkResponse.clone())
              }
              return networkResponse
            })
            .catch(() => cached)

          return cached || fetchPromise
        }),
      ),
    )
    return
  }
})
