import { useEffect, useMemo, useState } from "react"
import { motion } from "motion/react"
import DeviceCard, { DeviceCardSkeleton } from "../components/DeviceCard"
import { EASE, inView, riseIn, stagger } from "../lib/motion"
import { useLatestBuilds } from "../lib/useLatestBuilds"
import { cn } from "../lib/utils"

/** Placeholder count while the fan-out resolves — one full row on desktop. */
const SKELETONS = 3

const ALL = "All"

/** Resolves to whatever the newest release is, so it never needs editing. */
const LATEST = "Latest"

const Search = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden="true"
    className={cn("size-[24px] shrink-0", className)}
  >
    <circle
      cx="11"
      cy="11"
      r="7.25"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
    />
    <path
      d="m16.5 16.5 4 4"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
    />
  </svg>
)

/** One filter row: a surface strip of pills. Single-select, `All` clears it. */
const FilterRow = ({
  label,
  options,
  value,
  onChange,
  className,
}: {
  label: string
  options: string[]
  value: string
  onChange: (next: string) => void
  className?: string
}) => (
  <div
    role="group"
    aria-label={label}
    className={cn(
      "bg-surface-solid rounded-surface no-scrollbar flex max-w-full shrink-0 items-center gap-[8px] overflow-x-auto p-[15px]",
      className,
    )}
  >
    {options.map((option) => {
      const active = option === value
      return (
        <button
          key={option}
          type="button"
          onClick={() => onChange(option)}
          aria-pressed={active}
          className={cn(
            "ease-surface h-[38px] shrink-0 rounded-full px-[18px] text-[length:var(--text-body-sm)] leading-[1.2] font-medium whitespace-nowrap transition-colors duration-300",
            active
              ? "bg-surface-active text-ink"
              : "text-ink-nav hover:text-ink",
          )}
        >
          {option}
        </button>
      )
    })}
  </div>
)

const Devices = () => {
  const { devices, loading, error } = useLatestBuilds()
  const [query, setQuery] = useState("")
  const [brand, setBrand] = useState(ALL)
  const [version, setVersion] = useState(ALL)

  // Derived from what the feed actually returned, so a filter can never offer a
  // bucket that yields zero cards.
  const brands = useMemo(
    () => [
      ALL,
      ...Array.from(
        new Set(
          devices.flatMap((device) => (device.brand ? [device.brand] : [])),
        ),
      ).sort((a, b) => a.localeCompare(b)),
    ],
    [devices],
  )

  /**
   * Newest and oldest release in the feed, by numeric collation — a plain string
   * compare would sort "10.0" under "5.0", and "5.11-EOL" under "5.9".
   */
  const [newest, oldest] = useMemo(() => {
    const sorted = Array.from(
      new Set(devices.map((device) => device.version)),
    ).sort((a, b) => b.localeCompare(a, undefined, { numeric: true }))
    return [sorted[0], sorted[sorted.length - 1]]
  }, [devices])

  /**
   * Three pills, never a row that grows with the feed: All, the current release,
   * and the oldest one still receiving builds. `Latest` is a label, not a
   * version string — it resolves to `newest` at filter time, so it keeps
   * meaning "current" across releases without an edit here.
   */
  const versions = useMemo(() => {
    if (!newest) return [ALL]
    // One release in the feed: `Latest` and the version pill would be the same
    // filter under two names.
    return oldest && oldest !== newest ? [ALL, LATEST, oldest] : [ALL, LATEST]
  }, [newest, oldest])

  // A version that vanishes from the feed (last build of 5.9 pulled) would
  // otherwise leave a dead filter selected and an empty grid with no way back.
  useEffect(() => {
    if (version !== ALL && !versions.includes(version)) setVersion(ALL)
  }, [versions, version])

  useEffect(() => {
    if (brand !== ALL && !brands.includes(brand)) setBrand(ALL)
  }, [brands, brand])

  const results = useMemo(() => {
    const needle = query.trim().toLowerCase()
    const wanted = version === LATEST ? newest : version

    return devices
      .filter(
        (device) =>
          (brand === ALL || device.brand === brand) &&
          (version === ALL || device.version === wanted) &&
          // Codename is matched too: it is what people paste from a build zip.
          (needle === "" ||
            device.name.toLowerCase().includes(needle) ||
            device.codename.toLowerCase().includes(needle)),
      )
      .sort((a, b) => a.name.localeCompare(b.name))
  }, [devices, query, brand, version, newest])

  // A filter that survives its own result set reads as a broken page, so say so.
  const filtered = brand !== ALL || version !== ALL || query.trim() !== ""

  return (
    <main className="relative w-full overflow-x-clip pt-[120px] pb-[96px] sm:pt-[180px] sm:pb-[192px]">
      <div
        aria-hidden="true"
        className="border-hairline pointer-events-none absolute inset-y-0 right-[6.615%] left-[6.198%] hidden border-x sm:block"
      />

      <div className="relative px-6 sm:pr-[calc(6.615%+48px)] sm:pl-[calc(6.198%+55px)]">
        <motion.div
          {...inView}
          variants={stagger}
          className="flex flex-col items-center"
        >
          <motion.h1
            variants={riseIn}
            className="text-ink-faint mt-[40px] max-w-[900px] text-center text-[26px] leading-[1.2] font-semibold sm:mt-[72px] sm:text-[32px] lg:text-[35px]"
          >
            Search By Device Name or Codename
          </motion.h1>

          {/* No submit button: filtering is live on every keystroke, so a button
              would be a no-op. The form stays for Enter-key handling — without
              it, Enter in a lone text input reloads the page in some browsers —
              and for the search landmark. */}
          <motion.form
            variants={riseIn}
            onSubmit={(event) => event.preventDefault()}
            role="search"
            className="mt-[20px] w-full max-w-[758px] sm:mt-[28px]"
          >
            <div className="bg-surface-solid rounded-surface focus-within:ring-ink-muted flex h-[63px] min-w-0 items-center gap-[16px] px-[31px] focus-within:ring-1">
              {/* label, not div: the surface is 758px wide but only the <input>
                  took clicks, so the icon and the padding read as dead space.
                  Wrapping them makes the whole field focus the input, which is
                  what "works like any input field" actually means. */}
              <label className="flex min-w-0 flex-1 cursor-text items-center gap-[16px] self-stretch">
                <Search className="text-ink-nav" />
                <input
                  type="search"
                  name="q"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  // Native type="search" clears on Escape in WebKit only.
                  onKeyDown={(event) => {
                    if (event.key === "Escape") setQuery("")
                  }}
                  placeholder="Search for your device"
                  aria-label="Search for your device by name or codename"
                  // A codename is not a word. Left on, mobile keyboards
                  // capitalise "Miatoll" and autocorrect "veux" into "vex".
                  autoComplete="off"
                  autoCorrect="off"
                  autoCapitalize="off"
                  spellCheck={false}
                  enterKeyHint="search"
                  className="text-ink placeholder:text-ink-nav min-w-0 flex-1 bg-transparent text-[length:var(--text-body-sm)] leading-[1.2] font-medium outline-none [&::-webkit-search-cancel-button]:hidden"
                />
              </label>

              {/* Replaces the native cancel button, which is hidden above: its
                  UA styling is a dark glyph on a dark surface. */}
              {query ? (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  aria-label="Clear search"
                  className="text-ink-nav hover:text-ink ease-surface shrink-0 transition-colors duration-300"
                >
                  <svg
                    viewBox="0 0 20 20"
                    fill="none"
                    aria-hidden="true"
                    className="size-[18px]"
                  >
                    <path
                      d="M5.5 5.5l9 9m0-9l-9 9"
                      stroke="currentColor"
                      strokeWidth={1.75}
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
              ) : null}
            </div>
          </motion.form>

          {/* Both rows render only once the feed has answered — options derived
              from an empty list would flash a lone "All" pill and then reflow.
              justify-between pushes them to opposite edges once there is room;
              below xl they stack, where edge-to-edge would just look broken. */}
          {devices.length > 0 ? (
            <motion.div
              variants={riseIn}
              className="mt-[24px] flex w-full flex-col items-center gap-[16px] sm:mt-[32px] xl:flex-row xl:items-start xl:justify-between"
            >
              {brands.length > 1 ? (
                <FilterRow
                  label="Filter by brand"
                  options={brands}
                  value={brand}
                  onChange={setBrand}
                />
              ) : null}
              {versions.length > 1 ? (
                <FilterRow
                  label="Filter by VoltageOS version"
                  options={versions}
                  value={version}
                  onChange={setVersion}
                />
              ) : null}
            </motion.div>
          ) : null}
        </motion.div>

        <div
          aria-live="polite"
          aria-busy={loading}
          className="mt-[48px] grid grid-cols-1 gap-[24px] sm:mt-[64px] sm:gap-[37px] lg:grid-cols-2 xl:grid-cols-3"
        >
          {loading ? (
            Array.from({ length: SKELETONS }, (_, i) => (
              <DeviceCardSkeleton key={i} />
            ))
          ) : results.length > 0 ? (
            results.map((device, i) => (
              // Per-card initial/animate rather than variants: these mount when
              // the fetch resolves, so an inherited variant state is a timing
              // coin flip that can strand a card at opacity 0.
              <motion.div
                key={device.codename}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 1.2,
                  // Cap the cascade: card 30 must not wait 3.6s to appear.
                  delay: Math.min(i, 5) * 0.12,
                  ease: EASE,
                }}
                className="flex"
              >
                <DeviceCard {...device} />
              </motion.div>
            ))
          ) : (
            // col-span-full: without it the message sits in grid column 1 and
            // reads left-aligned no matter what text-center does.
            <p className="text-ink-muted col-span-full text-center text-[16px] leading-[1.2] font-normal sm:text-[length:var(--text-body-md)]">
              {filtered
                ? "No devices match that search."
                : error
                  ? "Build information is unavailable right now."
                  : "No builds published yet."}
            </p>
          )}
        </div>
      </div>
    </main>
  )
}

export default Devices
