/**
 * Device registry — the authoritative list of what this site renders.
 *
 * Keys are lowercase codenames. They are the join key for everything:
 * the OTA feed, the bundled image, and the /devices/download/:codename route.
 * Renaming a key breaks shared links — treat them as permanent.
 *
 * Values are OPTIONAL overrides. The OTA feed already carries `device`, `oem`
 * and `maintainer`, so leave a value empty (`{}`) unless you want to override
 * what upstream reports.
 *
 * ─── ADDING A MAINTAINER AVATAR ────────────────────────────────────────────
 * Set `github` to the maintainer's GitHub LOGIN (the /username in their
 * profile URL), not their display name:
 *
 *   marble: { github: "rokusenpaii" },
 *
 * The card fetches https://github.com/<login>.png. That is the only source for
 * the avatar — the feed's `maintainer` is a display name and is never guessed
 * at as a login, because a name that happens to be someone else's handle
 * ("Frost", "Talha") would render a stranger's face. No `github` means the
 * card shows the maintainer's initials instead.
 *
 * To find a login: open the commit history of the device's OTA JSON at
 * github.com/VoltageOS/android_vendor_voltageota (branch 17) — whoever pushes
 * `<codename>.json` is the maintainer, and the commit carries their login.
 */
type DeviceMeta = {
  /** Overrides the feed's `device` (marketing name). */
  name?: string
  /** Fallback only — the feed wins when it reports a maintainer. */
  maintainer?: string
  /** Maintainer's GitHub login — the ONLY source for the card's avatar. */
  github?: string
}

export const DEVICE_REGISTRY: Record<string, DeviceMeta> = {
  // `name` is an OVERRIDE, so it wins over the feed. Only set one where the
  // feed cannot supply a usable string: a device with no branch-17 build yet,
  // or a feed name that reads wrong without its brand (`brand` is not carried
  // into Device, so "5 / 5s / 5i" would render exactly like that).
  // Every name below is what upstream's own 16.2 JSON reports — not a guess.
  // Delete an entry once that codename ships on 17 and reports the same thing.
  //
  // Every `github` below is the commit author of that device's own
  // <codename>.json on branch 17 — verified, not inferred from the feed's
  // display name. A codename with no build on 17 has no login to verify yet;
  // fill it in when it ships.
  apollo: {}, // upstream reports "apollo" — no marketing name exists yet
  dm1q: { name: "Galaxy S23" },
  dm2q: { name: "Galaxy S23+" },
  lemonade: {},
  lemonadep: {},
  lilac: {}, // upstream reports "lilac"
  marble: { github: "rokusenpaii" }, // feed says "Talha"
  mars: {},
  miatoll: { github: "ihsanulrahman" }, // feed says "iHSAN"
  peridot: { github: "GuidixX" },
  phoenix: { name: "Poco X2" },
  porsche: { name: "Realme GT 2" },
  r5x: { name: "Realme 5 / 5s / 5i" },
  raphael: { github: "PptO07" }, // feed says "Pranav Temkar"
  spacewar: {},
  star: {}, // upstream reports "star"
  sunny: { name: "Redmi Note 10" },
  sweet: { name: "Redmi Note 10 Pro / Max", github: "mrfox2003" }, // feed says "Niranjan BR"
  veux: { github: "Karan-Frost" }, // feed says "Frost"
  vili: {},
  violet: { github: "Karan-Frost" }, // feed says "Frost"
  x00t: {},
  yunluo: { name: "Redmi Pad" },
  z2_plus: { name: "ZUK Z2 Plus", github: "shutter-cat" }, // feed says "Dmitrii"
  ziti: { github: "amit-0i" },
}

// ponytail: drop a `{codename}.png` into src/assets/devices/ and it is picked
// up with no code change. Eager resolves URLs at build (not bytes), so the
// <img loading="lazy"> still governs what a visitor downloads. A codename with
// no file renders the placeholder block instead.
const IMAGES = import.meta.glob<string>("../assets/devices/*.png", {
  eager: true,
  import: "default",
})

/**
 * Exported for the session cache: a persisted `image` is a build-hashed URL
 * that 404s after the next deploy, so it is stripped on write and re-resolved
 * through here on read.
 */
export const deviceImage = (codename: string): string | undefined =>
  IMAGES[`../assets/devices/${codename}.png`]

/** Feed entry — https://github.com/VoltageOS/android_vendor_voltageota */
export type OtaEntry = {
  maintainer: string
  oem: string
  device: string
  filename: string
  download: string
  /** Unix EPOCH SECONDS (from ro.build.date.utc), not milliseconds. */
  timestamp: number
  /** The feed's only checksum. There is no sha256 field. */
  md5: string
  size: number
  version: string
}

/** What a card renders. */
export type Device = {
  codename: string
  name: string
  maintainer: string
  /** The feed's `oem`. Drives the brand filter on /devices. */
  brand?: string
  /** The registry's `github` login. Absent until a device is mapped. */
  maintainerGitHub?: string
  version: string
  /** Absent when the feed omits it — the card drops the row instead of printing "undefined". */
  md5?: string
  /** Build size in BYTES, straight from the feed. Formatted at render. */
  size?: number
  /** Unix epoch seconds, sanity-checked. Formatted at render, never pre-formatted. */
  builtAt: number
  image?: string
}

/**
 * `.json()` is `any`, so strict mode catches nothing here. Guard only the
 * fields a card cannot render without — a feed that adds or drops anything
 * else should not blank the section.
 */
/** 2015-01-01. Below this, a timestamp is a placeholder rather than a build date. */
const MIN_TIMESTAMP = 1_420_070_400

/**
 * Rejects 0, NaN, and millisecond timestamps. A ms value dates the build to
 * year 58000, where `toISOString()` throws RangeError and unmounts the whole
 * section — this guard is what keeps one malformed entry local to its card.
 *
 * Exported because the session cache is a trust boundary too: a persisted
 * payload is re-validated on read, not assumed to have come from this pipeline.
 */
export const isPlausibleTimestamp = (value: unknown): value is number =>
  typeof value === "number" &&
  Number.isFinite(value) &&
  value >= MIN_TIMESTAMP &&
  value <= Date.now() / 1000 + 86_400

const isOtaEntry = (value: unknown): value is OtaEntry => {
  if (!value || typeof value !== "object") return false
  const entry = value as Partial<OtaEntry>
  // `device` is deliberately not required — toDevice falls back to the
  // codename, so a nameless build still renders.
  return (
    isPlausibleTimestamp(entry.timestamp) &&
    typeof entry.version === "string" &&
    entry.version.trim().length > 0
  )
}

/** Pulls the newest entry out of a `{"response":[…]}` payload. */
export const parseOta = (payload: unknown): OtaEntry | undefined => {
  const list = (payload as { response?: unknown })?.response
  if (!Array.isArray(list)) return undefined

  // Not .at(0) — tsconfig targets ES2020, where Array.prototype.at is absent.
  return list.filter(isOtaEntry).sort((a, b) => b.timestamp - a.timestamp)[0]
}

/**
 * The card's avatar comes from `github` in the registry and nowhere else.
 *
 * The feed's `maintainer` is a DISPLAY NAME, and deriving a login from it is
 * actively unsafe: "Frost", "Talha" and "Dmitrii" are all registered GitHub
 * accounts belonging to unrelated people, so a name-shaped guess renders a
 * stranger's face and nothing about the page looks broken. An unmapped device
 * shows initials instead.
 */
const githubHandle = (override?: string) => override?.trim() || undefined

export const toDevice = (codename: string, entry: OtaEntry): Device => {
  const meta = DEVICE_REGISTRY[codename] ?? {}
  // Feed is authoritative; registry covers a build that reports none.
  const maintainer = entry.maintainer?.trim() || (meta.maintainer ?? "Unknown")

  return {
    codename,
    // `device` can be an empty string in the feed, which `??` would keep.
    name: meta.name || entry.device?.trim() || codename,
    maintainer,
    maintainerGitHub: githubHandle(meta.github),
    // Drives the brand filter. Absent for a feed that omits `oem`, which the
    // filter treats as unbranded rather than inventing a bucket.
    brand: entry.oem?.trim() || undefined,
    version: entry.version,
    md5: entry.md5?.trim() || undefined,
    // Guarded here rather than in isOtaEntry: a bad size costs one row, not
    // the whole build, so it must not disqualify an otherwise valid entry.
    size:
      typeof entry.size === "number" && entry.size > 0 ? entry.size : undefined,
    builtAt: entry.timestamp,
    image: deviceImage(codename),
  }
}

const RTF = new Intl.RelativeTimeFormat("en", { numeric: "auto" })

/** "2 hours ago" — granularity is hours, so a 300s re-render is precise enough. */
export const relativeTime = (unixSeconds: number, now = Date.now()) => {
  const seconds = Math.round((unixSeconds * 1000 - now) / 1000)
  const magnitude = Math.abs(seconds)

  if (magnitude < 3600) return RTF.format(Math.round(seconds / 60), "minute")
  if (magnitude < 86400) return RTF.format(Math.round(seconds / 3600), "hour")
  return RTF.format(Math.round(seconds / 86400), "day")
}

/**
 * Matches the design's dd/mm/yyyy. Rendered in UTC because the feed's
 * `timestamp` comes from `ro.build.date.utc` — a build date is a fact about
 * the build, not about where the visitor is sitting, and UTC keeps it
 * consistent with the zip filename.
 */
export const buildDate = (unixSeconds: number) =>
  new Date(unixSeconds * 1000).toLocaleDateString("en-GB", { timeZone: "UTC" })

/**
 * `<time dateTime>` value, or undefined. An out-of-range Date makes
 * `toISOString()` throw RangeError, which would unmount the whole section
 * rather than one card — so this never throws by construction.
 */
export const isoTimestamp = (unixSeconds: number) => {
  const date = new Date(unixSeconds * 1000)
  return Number.isNaN(date.getTime()) ? undefined : date.toISOString()
}

/**
 * "1.81 GB" — GB/MB decimal, matching how ROM sizes are quoted everywhere
 * (SourceForge, release posts), not the binary GiB a file manager shows.
 */
export const buildSize = (bytes: number) =>
  bytes >= 1e9
    ? `${(bytes / 1e9).toFixed(2)} GB`
    : `${Math.round(bytes / 1e6)} MB`

if (import.meta.env.DEV) {
  console.assert(
    Object.keys(DEVICE_REGISTRY).every((key) => key === key.toLowerCase()),
    "DEVICE_REGISTRY keys must be lowercase — the :codename route matches raw",
  )

  const sample = {
    response: [
      {
        timestamp: 1779438245,
        version: "5.9",
        device: "Old",
        maintainer: "A",
        md5: "x",
      },
      {
        timestamp: 1783502849,
        version: "6.0",
        device: "New",
        maintainer: "",
        md5: "y",
      },
      { nonsense: true },
      { timestamp: 1783502849000, version: "9.9", device: "Milliseconds" },
      { timestamp: 0, version: "0.0", device: "Epoch" },
    ],
  }
  console.assert(parseOta(sample)?.version === "6.0", "parseOta picks newest")
  console.assert(parseOta({}) === undefined, "parseOta tolerates junk")
  console.assert(
    parseOta({ response: {} }) === undefined,
    "parseOta needs array",
  )
  console.assert(
    parseOta({ response: [{ timestamp: 1783502849000, version: "9.9" }] }) ===
      undefined,
    "parseOta rejects millisecond timestamps",
  )
  console.assert(
    parseOta({ response: [{ timestamp: 1783502849, version: "  " }] }) ===
      undefined,
    "parseOta rejects a blank version",
  )
  console.assert(
    toDevice("apollo", { timestamp: 1783502849, version: "6.0" } as OtaEntry)
      .name === "apollo",
    "a nameless build falls back to its codename",
  )

  const entry = parseOta(sample)!
  console.assert(
    toDevice("raphael", entry).name === "Redmi K20 Pro",
    "registry name overrides feed",
  )
  console.assert(
    toDevice("marble", entry).name === "New",
    "feed name used when registry has no override",
  )
  console.assert(
    toDevice("marble", entry).maintainer === "Unknown",
    "blank feed maintainer falls back",
  )
  // `now` is ms (Date.now), the entry is seconds — mixing them is the likely bug.
  console.assert(
    relativeTime(1779438245, 1779441845 * 1000) === "1 hour ago",
    "relativeTime: seconds in, ms for now",
  )
  console.assert(
    buildDate(1779438245) === "22/05/2026",
    "buildDate renders dd/mm/yyyy from epoch seconds",
  )
}
