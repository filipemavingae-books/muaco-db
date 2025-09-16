// Service Worker for PWA functionality
const CACHE_NAME = "muacodb-v1"
const STATIC_CACHE_NAME = "muacodb-static-v1"
const DYNAMIC_CACHE_NAME = "muacodb-dynamic-v1"

// Files to cache immediately
const STATIC_FILES = [
  "/",
  "/dashboard",
  "/login",
  "/register",
  "/offline",
  "/manifest.json",
  // Add other critical files
]

// API endpoints to cache
const API_CACHE_PATTERNS = [/^https:\/\/api\.muacodb\.com\/db\/.*\/data$/, /^https:\/\/api\.muacodb\.com\/databases$/]

// Install event - cache static files
self.addEventListener("install", (event) => {
  console.log("[SW] Installing service worker")

  event.waitUntil(
    caches
      .open(STATIC_CACHE_NAME)
      .then((cache) => {
        console.log("[SW] Caching static files")
        return cache.addAll(STATIC_FILES)
      })
      .then(() => {
        console.log("[SW] Static files cached successfully")
        return self.skipWaiting()
      })
      .catch((error) => {
        console.error("[SW] Failed to cache static files:", error)
      }),
  )
})

// Activate event - clean up old caches
self.addEventListener("activate", (event) => {
  console.log("[SW] Activating service worker")

  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== STATIC_CACHE_NAME && cacheName !== DYNAMIC_CACHE_NAME) {
              console.log("[SW] Deleting old cache:", cacheName)
              return caches.delete(cacheName)
            }
          }),
        )
      })
      .then(() => {
        console.log("[SW] Service worker activated")
        return self.clients.claim()
      }),
  )
})

// Fetch event - handle requests
self.addEventListener("fetch", (event) => {
  const { request } = event
  const url = new URL(request.url)

  // Skip non-GET requests
  if (request.method !== "GET") {
    return
  }

  // Handle API requests
  if (url.origin === "https://api.muacodb.com") {
    event.respondWith(handleApiRequest(request))
    return
  }

  // Handle static files
  if (STATIC_FILES.includes(url.pathname) || url.pathname.startsWith("/_next/")) {
    event.respondWith(handleStaticRequest(request))
    return
  }

  // Handle other requests
  event.respondWith(handleDynamicRequest(request))
})

// Handle API requests with network-first strategy
async function handleApiRequest(request) {
  const url = new URL(request.url)

  try {
    // Try network first
    const networkResponse = await fetch(request)

    // Cache successful responses
    if (networkResponse.ok) {
      const cache = await caches.open(DYNAMIC_CACHE_NAME)
      cache.put(request, networkResponse.clone())
    }

    return networkResponse
  } catch (error) {
    console.log("[SW] Network failed for API request, trying cache:", url.pathname)

    // Fallback to cache
    const cachedResponse = await caches.match(request)
    if (cachedResponse) {
      // Add offline indicator header
      const response = cachedResponse.clone()
      response.headers.set("X-Served-By", "service-worker-cache")
      return response
    }

    // Return offline response for data requests
    if (API_CACHE_PATTERNS.some((pattern) => pattern.test(request.url))) {
      return new Response(
        JSON.stringify({
          error: "Offline",
          message: "Dados não disponíveis offline",
          cached: false,
        }),
        {
          status: 503,
          statusText: "Service Unavailable",
          headers: {
            "Content-Type": "application/json",
            "X-Served-By": "service-worker-offline",
          },
        },
      )
    }

    throw error
  }
}

// Handle static files with cache-first strategy
async function handleStaticRequest(request) {
  try {
    // Try cache first
    const cachedResponse = await caches.match(request)
    if (cachedResponse) {
      return cachedResponse
    }

    // Fallback to network
    const networkResponse = await fetch(request)

    // Cache the response
    if (networkResponse.ok) {
      const cache = await caches.open(STATIC_CACHE_NAME)
      cache.put(request, networkResponse.clone())
    }

    return networkResponse
  } catch (error) {
    console.error("[SW] Failed to serve static file:", request.url)

    // Return offline page for navigation requests
    if (request.mode === "navigate") {
      const offlineResponse = await caches.match("/offline")
      if (offlineResponse) {
        return offlineResponse
      }
    }

    throw error
  }
}

// Handle dynamic requests
async function handleDynamicRequest(request) {
  try {
    // Try network first
    const networkResponse = await fetch(request)

    // Cache successful responses
    if (networkResponse.ok) {
      const cache = await caches.open(DYNAMIC_CACHE_NAME)
      cache.put(request, networkResponse.clone())
    }

    return networkResponse
  } catch (error) {
    // Fallback to cache
    const cachedResponse = await caches.match(request)
    if (cachedResponse) {
      return cachedResponse
    }

    // Return offline page for navigation requests
    if (request.mode === "navigate") {
      const offlineResponse = await caches.match("/offline")
      if (offlineResponse) {
        return offlineResponse
      }
    }

    throw error
  }
}

// Background sync for offline operations
self.addEventListener("sync", (event) => {
  console.log("[SW] Background sync triggered:", event.tag)

  if (event.tag === "sync-offline-operations") {
    event.waitUntil(syncOfflineOperations())
  }
})

async function syncOfflineOperations() {
  try {
    // This would integrate with the offline storage system
    // to sync pending operations when back online
    console.log("[SW] Syncing offline operations...")

    // Send message to main thread to trigger sync
    const clients = await self.clients.matchAll()
    clients.forEach((client) => {
      client.postMessage({
        type: "SYNC_OFFLINE_OPERATIONS",
      })
    })
  } catch (error) {
    console.error("[SW] Failed to sync offline operations:", error)
  }
}

// Push notifications
self.addEventListener("push", (event) => {
  console.log("[SW] Push notification received")

  const options = {
    body: "Você tem atualizações nas suas bases de dados",
    icon: "/icons/icon-192x192.png",
    badge: "/icons/badge-72x72.png",
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1,
    },
    actions: [
      {
        action: "explore",
        title: "Ver Dashboard",
        icon: "/icons/action-explore.png",
      },
      {
        action: "close",
        title: "Fechar",
        icon: "/icons/action-close.png",
      },
    ],
  }

  event.waitUntil(self.registration.showNotification("MuacoDB", options))
})

// Notification click
self.addEventListener("notificationclick", (event) => {
  console.log("[SW] Notification clicked:", event.action)

  event.notification.close()

  if (event.action === "explore") {
    event.waitUntil(clients.openWindow("/dashboard"))
  }
})

// Message handling
self.addEventListener("message", (event) => {
  console.log("[SW] Message received:", event.data)

  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting()
  }
})
