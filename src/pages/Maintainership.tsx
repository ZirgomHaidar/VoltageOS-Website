import { motion } from "motion/react"
import SurfaceButton from "../components/SurfaceButton"
import { inView, riseIn, stagger } from "../lib/motion"

const requirements = [
  "Access to the device you want to maintain, as your daily driver or a test unit.",
  "Ability to build VoltageOS from source and verify the build boots and works.",
  "Responsiveness to bug reports from people running your builds.",
  "Agreement to follow the project's code of conduct.",
]

const Maintainership = () => {
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
            Build With Us
          </motion.p>

          <motion.h1
            variants={riseIn}
            className="text-ink-faint mt-[18px] text-[32px] leading-[1.39] font-semibold sm:text-[42px] lg:text-[length:var(--text-h2)]"
          >
            Become a <span className="text-ink">maintainer</span>.
          </motion.h1>

          <motion.p
            variants={riseIn}
            className="text-ink-muted mt-[14px] text-[16px] leading-[1.2] font-normal tracking-[var(--tracking-body)] sm:text-[18px] lg:text-[length:var(--text-body-lg)]"
          >
            Every device VoltageOS supports is there because someone volunteered
            to build and look after it. If your device is missing — or its builds
            need a new owner — you can pick it up.
          </motion.p>

          <motion.h2
            variants={riseIn}
            className="text-ink mt-[32px] text-[19px] leading-[1.2] font-bold sm:mt-[48px] sm:text-[length:var(--text-body-lg)]"
          >
            What we ask
          </motion.h2>

          <motion.ul
            variants={riseIn}
            className="text-ink-muted mt-[20px] flex list-disc flex-col gap-[14px] pl-[22px] text-[16px] leading-[1.4] font-normal tracking-[var(--tracking-body)] sm:text-[18px] lg:text-[length:var(--text-body-lg)]"
          >
            {requirements.map((requirement) => (
              <li key={requirement}>{requirement}</li>
            ))}
          </motion.ul>

          <motion.p
            variants={riseIn}
            className="text-ink-muted mt-[24px] text-[16px] leading-[1.2] font-normal tracking-[var(--tracking-body)] sm:text-[18px] lg:text-[length:var(--text-body-lg)]"
          >
            Applications and the full requirements live in the maintainership
            repository on GitHub.
          </motion.p>

          <motion.div
            variants={riseIn}
            className="mt-[32px] w-full max-w-[418px] sm:mt-[48px]"
          >
            <SurfaceButton
              title="Apply on GitHub"
              href="https://github.com/VoltageOS/maintainership"
            />
          </motion.div>
        </motion.div>
      </div>
    </main>
  )
}

export default Maintainership
