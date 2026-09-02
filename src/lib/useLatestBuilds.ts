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
  // 3 of the 12 index entries have no JSON on branch 17 (guacamoleb, tb128fu,
  // whyred). A 404 is an expected orphan, not an error worth surfacing.
  if (!response.ok) return undefined

  const entry = parseOta(await response.json())
  return entry && toDevice(codename, entry)
}

export const fetchBuilds = async (signal: AbortSignal) => {
  const codenames = Object.keys(DEVICE_REGISTRY)
  const settled = await Promise.allSettled(
    codenames.map((codename) => fetchDevice(codename, signal)),
  )

  const devices = settled
    .flatMap((result) =>
      result.status === "fulfilled" && result.value ? [result.value] : [],
    )
    .sort((a, b) => b.builtAt - a.builtAt)

  // Distinguish "upstream is down" from "upstream has nothing": only the
  // former has zero fulfilled results across the whole fan-out.
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
    let controller: AbortController | undefined
    let timer: number | undefined

    const load = async () => {
      // A hidden tab polls nothing. raw.githubusercontent.com publishes no
      // rate limit, so restraint is the only available mitigation.
      if (document.visibilityState === "hidden") return

      controller?.abort()
      controller = new AbortController()

      try {
        const { devices, reachable } = await fetchBuilds(controller.signal)
        setState((previous) => ({
          // Keep the last good grid when a poll comes back empty.
          devices: devices.length > 0 ? devices : previous.devices,
          loading: false,
          error: !reachable,
        }))
      } catch (cause) {
        if ((cause as Error)?.name === "AbortError") return
        setState((previous) => ({ ...previous, loading: false, error: true }))
      }
    }

    void load()
    timer = window.setInterval(load, POLL_MS)
    // Catch up immediately when a backgrounded tab returns.
    document.addEventListener("visibilitychange", load)

    return () => {
      controller?.abort()
      window.clearInterval(timer)
      document.removeEventListener("visibilitychange", load)
    }
  }, [])

  return state
}
