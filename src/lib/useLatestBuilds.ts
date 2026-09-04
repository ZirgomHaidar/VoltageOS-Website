import { useEffect, useState } from "react"
import {
  DEVICE_REGISTRY,
  deviceImage,
  isPlausibleTimestamp,
  parseOta,
  toDevice,
  type Device,
} from "./devices"

const BRANCH = "17"
const OTA = `https://raw.githubusercontent.com/VoltageOS/android_vendor_voltageota/refs/heads/${BRANCH}`

/**
 * raw.githubusercontent.com serves Cache-Control: max-age=300, so upstream
 * changes cannot surface faster than this no matter how often we ask. Polling
 * tighter than the CDN TTL just re-reads our own HTTP cache.
 */
const POLL_MS = 300_000

/** "Updated 2 hours ago" has to age on its own clock, not on fetch responses. */
const TICK_MS = 60_000

/** Bump the suffix when `Device` changes shape — a stale entry must not revive. */
const CACHE_KEY = `vos:builds:${BRANCH}:v1`

/**
 * Only governs the FIRST paint on a repeat navigation. sessionStorage is
 * per-tab, so staleness is already bounded by the tab's life; this cap just
 * stops a tab left open overnight from flashing yesterday's grid before the
 * revalidation lands.
 */
const CACHE_MAX_AGE_MS = 86_400_000

type CachedBuilds = { at: number; devices: Device[] }

/**
 * Repaints the grid from the last good fetch so navigating home → /devices →
 * home never shows skeletons twice. The network request still fires; this only
 * removes the wait before something is on screen.
 *
 * `image` is deliberately not persisted: it is a build-hashed asset URL, and a
 * cache surviving one deploy would point every card at a file that no longer
 * exists. It is stripped on write and re-resolved from the current bundle here.
 */
const readCache = (): Device[] | undefined => {
  try {
    const raw = sessionStorage.getItem(CACHE_KEY)
    if (!raw) return undefined

    const cached = JSON.parse(raw) as CachedBuilds
    if (!Array.isArray(cached?.devices)) return undefined
    if (!isPlausibleTimestamp(cached.at / 1000)) return undefined
    if (Date.now() - cached.at > CACHE_MAX_AGE_MS) return undefined

    // Re-validated rather than trusted. Persisted state is a trust boundary the
    // same as the network is, and the same guard that keeps a malformed feed
    // entry local to its card has to apply on the way back out of storage.
    const devices = cached.devices.filter(
      (device): device is Device =>
        !!device &&
        typeof device.codename === "string" &&
        typeof device.name === "string" &&
        typeof device.version === "string" &&
        isPlausibleTimestamp(device.builtAt),
    )

    return devices.length > 0
      ? devices.map((device) => ({
          ...device,
          image: deviceImage(device.codename),
        }))
      : undefined
  } catch {
    // Malformed JSON, or storage unavailable (Safari private browsing throws
    // on access, not just on write).
    return undefined
  }
}

const writeCache = (devices: Device[]) => {
  try {
    const payload: CachedBuilds = {
      at: Date.now(),
      // JSON.stringify drops undefined values, so this omits the key outright.
      devices: devices.map((device) => ({ ...device, image: undefined })),
    }
    sessionStorage.setItem(CACHE_KEY, JSON.stringify(payload))
  } catch {
    // Quota or blocked storage. The cache is an optimization, never a
    // requirement — a failed write costs a skeleton, not the grid.
  }
}

export type BuildsState = {
  devices: Device[]
  /** True only on the first load, so a poll failure never blanks a filled grid. */
  loading: boolean
  /** Set when every request failed. Stale devices are still returned alongside. */
  error: boolean
}

const fetchDevice = async (codename: string, signal: AbortSignal) => {
  const response = await fetch(`${OTA}/${codename}.json`, { signal })
  // Most registry codenames have no JSON on branch 17 yet. A 404 is an
  // expected absence, not an error worth surfacing.
  if (!response.ok) return undefined

  const entry = parseOta(await response.json())
  return entry && toDevice(codename, entry)
}

export const fetchBuilds = async (signal: AbortSignal) => {
  const settled = await Promise.allSettled(
    Object.keys(DEVICE_REGISTRY).map((codename) =>
      fetchDevice(codename, signal),
    ),
  )

  const devices = settled
    .flatMap((result) =>
      result.status === "fulfilled" && result.value ? [result.value] : [],
    )
    .sort((a, b) => b.builtAt - a.builtAt)

  // A 404 still counts as reached — only a total absence of fulfilled results
  // means the host itself was unreachable.
  const reachable = settled.some((result) => result.status === "fulfilled")

  return { devices, reachable }
}

export const useLatestBuilds = (): BuildsState => {
  // Lazy initializer, so the cache is read once during mount rather than on
  // every render. A cache hit means the grid paints real cards on the first
  // frame and `loading` is never true — skeletons only ever appear on a genuine
  // cold start. The network request still fires below to revalidate.
  const [state, setState] = useState<BuildsState>(() => {
    const cached = readCache()
    return {
      devices: cached ?? [],
      loading: !cached,
      error: false,
    }
  })

  // Not returned: the state change alone re-renders the consumer, which is all
  // "Updated 2 hours ago" needs to stay honest between fetches.
  const [, setTick] = useState(0)

  useEffect(() => {
    const id = window.setInterval(() => setTick((n) => n + 1), TICK_MS)
    return () => window.clearInterval(id)
  }, [])

  useEffect(() => {
    // One controller for the effect's whole life, aborted only on unmount.
    // Aborting per-load would kill an in-flight fan-out, and because
    // Promise.allSettled resolves rather than rejects, those aborts would
    // read as "upstream unreachable" and blank the grid.
    const controller = new AbortController()
    let inFlight = false
    let lastLoaded = 0

    const load = async () => {
      if (inFlight || controller.signal.aborted) return
      inFlight = true

      try {
        const { devices, reachable } = await fetchBuilds(controller.signal)
        if (controller.signal.aborted) return

        lastLoaded = Date.now()
        // Only a non-empty result is cached. Persisting an empty fan-out would
        // teach the next navigation to paint "No builds published yet" instantly.
        if (devices.length > 0) writeCache(devices)

        setState((previous) => ({
          // Keep the last good grid when a poll comes back empty.
          devices: devices.length > 0 ? devices : previous.devices,
          loading: false,
          error: !reachable,
        }))
      } catch {
        if (controller.signal.aborted) return
        setState((previous) => ({ ...previous, loading: false, error: true }))
      } finally {
        inFlight = false
      }
    }

    const onVisibility = () => {
      // Returning to a tab refetches only if the data has actually gone stale.
      if (document.visibilityState !== "visible") return
      if (Date.now() - lastLoaded < POLL_MS) return
      void load()
    }

    void load()
    // A hidden tab polls nothing. raw.githubusercontent.com publishes no rate
    // limit, so restraint is the only available mitigation.
    const timer = window.setInterval(() => {
      if (document.visibilityState === "visible") void load()
    }, POLL_MS)
    document.addEventListener("visibilitychange", onVisibility)

    return () => {
      controller.abort()
      window.clearInterval(timer)
      document.removeEventListener("visibilitychange", onVisibility)
    }
  }, [])

  return state
}
