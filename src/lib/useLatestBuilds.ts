import { useEffect, useState } from "react"
import { DEVICE_REGISTRY, parseOta, toDevice, type Device } from "./devices"

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
  const [state, setState] = useState<BuildsState>({
    devices: [],
    loading: true,
    error: false,
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
