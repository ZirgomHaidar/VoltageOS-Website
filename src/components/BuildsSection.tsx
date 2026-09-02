import { motion } from "motion/react"
import { inView, riseIn, scaleIn, stagger, staggerFast } from "../lib/motion"
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
        <motion.div {...inView} variants={stagger} className="flex flex-col">
          <div className="flex flex-col gap-[32px] xl:flex-row xl:items-end xl:justify-between">
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
          </div>

          {/* Live region so the grid swapping under a screen reader is announced. */}
          <div
            aria-live="polite"
            aria-busy={loading}
            className="mt-[48px] sm:mt-[64px]"
          >
            {loading ? (
              <ul className="grid grid-cols-1 gap-[24px] sm:gap-[37px] lg:grid-cols-2 xl:grid-cols-3">
                {Array.from({ length: TEASE }, (_, i) => (
                  <li key={i} className="flex">
                    <DeviceCardSkeleton />
                  </li>
                ))}
              </ul>
            ) : latest.length > 0 ? (
              <motion.ul
                variants={staggerFast}
                className="grid grid-cols-1 gap-[24px] sm:gap-[37px] lg:grid-cols-2 xl:grid-cols-3"
              >
                {latest.map((device) => (
                  <motion.li
                    key={device.codename}
                    variants={scaleIn}
                    className="flex"
                  >
                    <DeviceCard {...device} />
                  </motion.li>
                ))}
              </motion.ul>
            ) : (
              <p className="text-ink-muted text-[16px] leading-[1.2] font-normal sm:text-[length:var(--text-body-md)]">
                {error
                  ? "Build information is unavailable right now."
                  : "No builds published yet."}
              </p>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default BuildsSection
