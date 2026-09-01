import CardCarousel from "../components/CardCarousel"
import { useCarousel } from "../lib/useCarousel"
import IconButton from "../components/IconButton"
import type { Feature } from "../components/FeatureCard"
import card1 from "../assets/features/card1.png"
import card2 from "../assets/features/card2.png"
import card3 from "../assets/features/card3.png"
import card4 from "../assets/features/card4.png"

/**
 * Figma 582:104 "Features Section" (1920x1164).
 *
 * Content height, not 100dvh. Vertical padding is symmetric at 192px: header
 * starts y=192, carousel ends y=972, section is 1164 tall.
 *
 * Insets are 55px left / 48px right, NOT the hero's 46/46 — header and
 * carousel both sit at x=174 (hairline 119 -> 55) and both right edges land
 * at 1745 (hairline 1793 -> 48).
 *
 * The H2 is five separate text nodes in Figma because it cannot do inline
 * colour spans: "More" (faint) / "Control" (white) / "Over The" (faint) /
 * "Android" (white) / "You Use Every Day." (faint). Sequential x positions
 * confirm normal inline flow, so it rebuilds as one heading with two spans.
 *
 * H2 line spacing is 75px, not the base 1.2 leading: 122 - 47 = 75 against
 * 53.944 x 1.2 = 64.7, ratio 1.39. Manual placement, so leading-[1.39].
 */
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
        <div className="flex flex-col gap-[40px] xl:flex-row xl:items-start xl:justify-between">
          <div className="flex max-w-[762px] flex-col">
            <p className="text-ink-faint text-[17px] leading-[1.2] font-semibold whitespace-nowrap sm:text-[length:var(--text-body-lg)]">
              Why VoltageOS?
            </p>

            <h2 className="text-ink-faint mt-[20px] text-[32px] leading-[1.39] font-semibold sm:mt-[23px] sm:text-[42px] lg:text-[length:var(--text-h2)]">
              More <span className="text-ink">Control</span> Over The{" "}
              <span className="text-ink">Android</span> You Use Every Day.
            </h2>

            <p className="text-ink-muted mt-[24px] max-w-[762px] text-[16px] leading-[1.2] font-normal tracking-[var(--tracking-body)] sm:mt-[42px] sm:text-[18px] lg:text-[length:var(--text-body-lg)]">
              VoltageOS starts with the open source Android platform and builds
              on it with a focused set of features designed around privacy,
              security, performance and everyday usability.
            </p>
          </div>

          {/* Figma 609:364 — nav pair at y=239, beside the header. Rendered at
              every breakpoint, not xl only: the scrollbar is hidden and the
              cards hold no focusable content, so these are the sole affordance
              for reaching cards 3 and 4. */}
          <div className="flex justify-end gap-[12px] xl:pt-[47px]">
            <IconButton
              label="Previous feature"
              direction="left"
              onClick={carousel.scrollPrev}
              disabled={carousel.atStart}
            />
            <IconButton
              label="Next feature"
              onClick={carousel.scrollNext}
              disabled={carousel.atEnd}
            />
          </div>
        </div>

        <div className="mt-[48px] sm:mt-[59px]">
          <CardCarousel items={features} controls={carousel} />
        </div>
      </div>
    </section>
  )
}

export default FeaturesSection
