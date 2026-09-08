import { motion } from "motion/react"
import SurfaceButton from "../components/SurfaceButton"
import { inView, riseIn, stagger } from "../lib/motion"

const privacyPoints = [
  {
    title: "Sandboxed Google Services",
    body: "Run Google Play services inside an isolated sandbox with restricted privileges, preventing privileged system-level access to your personal files and device telemetry.",
  },
  {
    title: "Zero Analytics or Telemetry",
    body: "VoltageOS contains no baked-in analytics, user tracking, or advertising identifiers. Network calls are only initiated by your apps and explicit system update checks.",
  },
  {
    title: "Granular Permission Revocation",
    body: "Network access, sensor access, clipboard read gates, and fine-grained storage scopes can be toggled per app directly from system settings.",
  },
  {
    title: "Auditable Open Source Base",
    body: "The entire operating system source tree and build configurations are publicly available on GitHub for anyone to audit, reproduce, and build.",
  },
]

const Privacy = () => {
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
          className="flex max-w-[762px] flex-col"
        >
          <motion.p
            variants={riseIn}
            className="text-ink-faint text-[17px] leading-[1.2] font-semibold whitespace-nowrap sm:text-[length:var(--text-body-lg)]"
          >
            Privacy First
          </motion.p>

          <motion.h1
            variants={riseIn}
            className="text-ink-faint mt-[18px] text-[32px] leading-[1.39] font-semibold sm:text-[42px] lg:text-[length:var(--text-h2)]"
          >
            Your device. <span className="text-ink">Your data</span>.
          </motion.h1>

          <motion.p
            variants={riseIn}
            className="text-ink-muted mt-[14px] text-[16px] leading-[1.2] font-normal tracking-[var(--tracking-body)] sm:text-[18px] lg:text-[length:var(--text-body-lg)]"
          >
            VoltageOS is engineered from the ground up to respect user sovereignty.
            We strip away tracking frameworks and give you granular control over what
            applications can access.
          </motion.p>

          <div className="mt-[36px] flex flex-col gap-[28px] sm:mt-[48px]">
            {privacyPoints.map((point) => (
              <motion.div key={point.title} variants={riseIn} className="flex flex-col">
                <h2 className="text-ink text-[19px] leading-[1.2] font-bold sm:text-[length:var(--text-body-lg)]">
                  {point.title}
                </h2>
                <p className="text-ink-muted mt-[8px] text-[16px] leading-[1.3] font-normal tracking-[var(--tracking-body)] sm:text-[18px]">
                  {point.body}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div
            variants={riseIn}
            className="mt-[36px] w-full max-w-[418px] sm:mt-[48px]"
          >
            <SurfaceButton title="Explore Supported Devices" href="/devices" />
          </motion.div>
        </motion.div>
      </div>
    </main>
  )
}

export default Privacy
