import { motion } from "motion/react"
import CardCarousel from "../components/CardCarousel"
import { useCarousel } from "../lib/useCarousel"
import IconButton from "../components/IconButton"
import type { Feature } from "../components/FeatureCard"
import { inView, riseIn, stagger } from "../lib/motion"
import card1 from "../assets/features/card1.png"
import card2 from "../assets/features/card2.png"
import card3 from "../assets/features/card3.png"
import card4 from "../assets/features/card4.png"

const features: Feature[] = [
  {
    title: "Make Android work the way you want.",
    description:
      "VoltageOS adds useful customization without turning your phone into a complicated collection of tweaks. Personalize your experience while keeping the interface clean, familiar and fast.",
    icon: card1,
  },
  {
    title: "Your device should work for you.",
    description:
      "VoltageOS puts privacy at the center of the experience, giving you greater visibility and control over how apps and system services interact with your data.",
    icon: card2,
  },
  {
    title: "Stay current. Stay protected.",
    description:
      "Security is part of the foundation. Supported devices receive regular security updates, while VoltageOS continues to improve the privacy and security controls built into the Android experience.",
    icon: card3,
  },
  {
    title: "Less bloat. More Android.",
    description:
      "Built on the Android Open Source Project, VoltageOS keeps the experience clean and focused, without unnecessary manufacturer layers getting in the way.",
    icon: card4,
  },
]

const FeaturesSection = () => {
  const carousel = useCarousel()

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
          className="flex flex-col gap-[40px] xl:flex-row xl:items-start xl:justify-between"
        >
          <div className="flex max-w-[762px] flex-col">
            <motion.p
              variants={riseIn}
              className="text-ink-faint text-[17px] leading-[1.2] font-semibold whitespace-nowrap sm:text-[length:var(--text-body-lg)]"
            >
              Why VoltageOS?
            </motion.p>

            <motion.h2
              variants={riseIn}
              className="text-ink-faint mt-[18px] text-[32px] leading-[1.39] font-semibold sm:text-[42px] lg:text-[length:var(--text-h2)]"
            >
              More <span className="text-ink">Control</span> Over The{" "}
              <span className="text-ink">Android</span>{" "}
              <br className="hidden lg:inline" />
              You Use Every Day.
            </motion.h2>

            <motion.p
              variants={riseIn}
              className="text-ink-muted mt-[14px] text-[16px] leading-[1.2] font-normal tracking-[var(--tracking-body)] sm:text-[18px] lg:text-[length:var(--text-body-lg)]"
            >
              VoltageOS starts with the open source Android platform and builds
              on it with a focused set of features designed around privacy,
              security, performance and everyday usability.
            </motion.p>
          </div>

          <motion.div
            variants={riseIn}
            className="flex justify-end gap-[12px] xl:pt-[47px]"
          >
            <IconButton
              label="Previous feature"
              direction="left"
              onClick={carousel.scrollPrev}
              disabled={carousel.atStart}
              opacity={carousel.prevFade}
            />
            <IconButton
              label="Next feature"
              onClick={carousel.scrollNext}
              disabled={carousel.atEnd}
              opacity={carousel.nextFade}
            />
          </motion.div>
        </motion.div>

        <div className="mt-[48px] sm:mt-[59px]">
          <CardCarousel items={features} controls={carousel} />
        </div>
      </div>
    </section>
  )
}

export default FeaturesSection
