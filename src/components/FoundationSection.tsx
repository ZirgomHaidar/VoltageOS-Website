import { motion } from "motion/react"
import SurfaceButton from "./SurfaceButton"
import LetterReveal from "./LetterReveal"
import { inView, riseIn, scaleIn, stagger } from "../lib/motion"
import androidLogo from "../assets/android-17-logo.svg"

const FoundationSection = () => {
  return (
    <section className="relative w-full overflow-x-clip py-[96px] sm:py-[192px]">
      <div
        aria-hidden="true"
        className="border-hairline pointer-events-none absolute inset-y-0 right-[6.615%] left-[6.198%] hidden border-x sm:block"
      />

      <div className="relative px-6 sm:pr-[calc(6.615%+48px)] sm:pl-[calc(6.198%+55px)]">
        <motion.div
          {...inView}
          variants={stagger}
          className="flex flex-col gap-[40px] xl:flex-row xl:items-center xl:justify-between"
        >
          <motion.div variants={stagger} className="flex max-w-[762px] flex-col">
            <LetterReveal
              as="p"
              text="The Foundation"
              delay={0.06}
              staggerDelay={0.02}
              className="text-ink-faint text-[17px] leading-[1.2] font-semibold whitespace-nowrap sm:text-[length:var(--text-body-lg)]"
            />

            <LetterReveal
              as="h2"
              delay={0.2}
              staggerDelay={0.022}
              className="text-ink-faint mt-[18px] text-[32px] leading-[1.39] font-semibold sm:text-[42px] lg:text-[length:var(--text-h2)]"
              segments={[
                { text: "Built on " },
                { text: "Android", className: "text-ink" },
                { text: "\nOpen to " },
                { text: "Everyone", className: "text-ink" },
              ]}
            />

            <motion.p
              variants={riseIn}
              className="text-ink-muted mt-[14px] text-[16px] leading-[1.2] font-normal tracking-[var(--tracking-body)] sm:text-[18px] lg:text-[length:var(--text-body-lg)]"
            >
              VoltageOS is built on the Android Open Source Project, giving the
              system an open foundation that developers can inspect, modify and
              contribute to.
            </motion.p>

            <motion.p
              variants={riseIn}
              className="text-ink-muted mt-[24px] text-[16px] leading-[1.2] font-normal tracking-[var(--tracking-body)] sm:text-[18px] lg:text-[length:var(--text-body-lg)]"
            >
              No unnecessary layers. No locked-down product vision. Just a clean
              Android foundation with the freedom to evolve.
            </motion.p>

            <motion.div
              variants={riseIn}
              className="mt-[32px] w-full max-w-[418px] sm:mt-[48px]"
            >
              <SurfaceButton
                title="Explore on Github"
                href="https://github.com/VoltageOS"
              />
            </motion.div>
          </motion.div>

          <motion.img
            variants={scaleIn}
            src={androidLogo}
            alt=""
            loading="lazy"
            decoding="async"
            className="hidden h-auto w-[380px] shrink-0 object-contain xl:block xl:w-[489px]"
          />
        </motion.div>
      </div>
    </section>
  )
}

export default FoundationSection
