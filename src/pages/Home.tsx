import { motion } from "motion/react"
import SurfaceButton from "../components/SurfaceButton"
import DevicesSection from "../components/DevicesSection"
import FeaturesSection from "../components/FeaturesSection"
import { rise } from "../lib/motion"

function Home() {
  return (
    <>
      <section className="relative h-[100dvh] min-h-[720px] w-full overflow-x-clip">
      <div
        aria-hidden="true"
        className="border-hairline pointer-events-none absolute inset-x-0 top-[11.019%] bottom-[11.667%] border-y"
      />
      <div
        aria-hidden="true"
        className="border-hairline pointer-events-none absolute inset-y-0 right-[6.615%] left-[6.198%] hidden border-x sm:block"
      />

      <div className="absolute inset-x-0 bottom-[20.93%] px-6 sm:right-[6.615%] sm:left-[6.198%] sm:px-[46px]">
        <div className="flex flex-col items-start justify-between gap-10 2xl:flex-row 2xl:items-end">
          <div className="flex max-w-[604px] flex-col">
            <motion.p
              {...rise(0)}
              className="text-ink-faint text-[17px] leading-[1.2] font-semibold whitespace-nowrap sm:text-[length:var(--text-body-lg)]"
            >
              100% Secured . 100% Open Source
            </motion.p>
            <motion.h1
              {...rise(0.14)}
              className="text-ink mt-[29px] text-[36px] leading-[1.1] font-semibold sm:mt-[49px] sm:text-[52px] lg:text-[68px] 2xl:text-[length:var(--text-hero)]"
            >
              Android, with your privacy in mind.
            </motion.h1>
            <motion.p
              {...rise(0.28)}
              className="text-ink-muted mt-[16px] max-w-[598px] text-[16px] leading-[1.2] font-normal tracking-[var(--tracking-body)] sm:mt-[24px] sm:text-[18px] 2xl:text-[length:var(--text-body-lg)]"
            >
              VoltageOS is an open source Android operating system built for
              people who want more control over their devices, with a clean
              experience, privacy focused features and regular security
              updates.
            </motion.p>
          </div>

          <motion.div
            {...rise(0.42)}
            className="flex w-full max-w-[418px] flex-col gap-[14px] 2xl:w-[418px] 2xl:max-w-none"
          >
            <SurfaceButton title="What's New?" meta="Android 17 is out" />
            <SurfaceButton title="Get VoltageOS" href="/devices" />
          </motion.div>
        </div>
      </div>
      </section>

      <DevicesSection />
      <FeaturesSection />
    </>
  )
}

export default Home
