import { motion } from "motion/react"
import { EASE, inView, riseIn, stagger } from "../lib/motion"
import { useLatestBuilds } from "../lib/useLatestBuilds"
import DeviceCard, { DeviceCardSkeleton } from "./DeviceCard"
import SurfaceButton from "./SurfaceButton"

/** The homepage teases the newest three; /devices lists them all. */
const TEASE = 3

const BuildsSection = () => {
  const { devices, loading, error } = useLatestBuilds()
  const latest = devices.slice(0, TEASE)

  return (
    <section className="relative w-full overflow-x-clip py-[96px] sm:py-[192px]">
      <div
        aria-hidden="true"
        className="border-hairline pointer-events-none absolute inset-y-0 right-[6.615%] left-[6.198%] hidden border-x sm:block"
      />

      <div className="relative px-6 sm:pr-[calc(6.615%+48px)] sm:pl-[calc(6.198%+55px)]">
        <div className="flex flex-col">
          {/* The scroll gate covers the header ONLY. It used to wrap the grid
              too, which is what hid the cards on refresh: a restored scroll
              position fires the observer immediately, it detaches (once: true)
              while only skeletons exist, and the real cards mount afterwards
              with no trigger left to move them off `hidden`. */}
          <motion.div
            {...inView}
            variants={stagger}
            className="flex flex-col gap-[32px] xl:flex-row xl:items-end xl:justify-between"
          >
            <div className="flex max-w-[762px] flex-col">
              <motion.p
                variants={riseIn}
                className="text-ink-faint text-[17px] leading-[1.2] font-semibold whitespace-nowrap sm:text-[length:var(--text-body-lg)]"
              >
                Latest Builds
              </motion.p>

              <motion.h2
                variants={riseIn}
                className="text-ink-faint mt-[18px] text-[32px] leading-[1.39] font-semibold sm:text-[42px] lg:text-[length:var(--text-h2)]"
              >
                <span className="text-ink">Fresh</span> Builds
                <br />
                Ready For Your <span className="text-ink">Device</span>
              </motion.h2>

              <motion.p
                variants={riseIn}
                className="text-ink-muted mt-[14px] text-[16px] leading-[1.2] font-normal tracking-[var(--tracking-body)] sm:text-[18px] lg:text-[length:var(--text-body-lg)]"
              >
                Explore the latest VoltageOS builds for supported devices, with
                release details, maintainers and download options.
              </motion.p>
            </div>

            <motion.div
              variants={riseIn}
              className="w-full max-w-[418px] shrink-0"
            >
              <SurfaceButton title="Download for your device" href="/devices" />
            </motion.div>
          </motion.div>

          {/* Live region so the grid swapping under a screen reader is announced. */}
          <div
            aria-live="polite"
            aria-busy={loading}
            className="mt-[48px] grid grid-cols-1 gap-[24px] sm:mt-[64px] sm:gap-[37px] lg:grid-cols-2 xl:grid-cols-3"
          >
            {loading ? (
              Array.from({ length: TEASE }, (_, i) => (
                <DeviceCardSkeleton key={i} />
              ))
            ) : latest.length > 0 ? (
              latest.map((device, i) => (
                // Explicit initial/animate with a computed delay — deliberately
                // NOT variants. These cards mount when the fetch resolves, so
                // any inherited variant state is a coin flip on timing; per-card
                // props resolve from nothing but themselves and cannot get
                // stranded at opacity 0.
                <motion.div
                  key={device.codename}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1.2, delay: i * 0.12, ease: EASE }}
                  className="flex"
                >
                  <DeviceCard {...device} />
                </motion.div>
              ))
            ) : (
              <p className="text-ink-muted text-[16px] leading-[1.2] font-normal sm:text-[length:var(--text-body-md)]">
                {error
                  ? "Build information is unavailable right now."
                  : "No builds published yet."}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default BuildsSection
