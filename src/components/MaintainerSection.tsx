import { motion } from "motion/react"
import SurfaceButton from "./SurfaceButton"
import { inView, riseIn, stagger } from "../lib/motion"

/**
 * Blur (626:119). Figma draws a #252525 circle of r 960 inside a 1920px box at
 * top 68px, then blurs it at stdDeviation 250. That 250px bleed grows the
 * export canvas to 2920px — 500px per side — so the art's true top edge is
 * 68 - 500 = -432px. Against the design's 1920px canvas that is a 152.083vw
 * square at top -22.5vw, which holds the proportions at any viewport width.
 *
 * Drawn as a gradient rather than the exported asset. Blurring a hard edge
 * gives an error-function falloff, so the stops below are Phi(distance)
 * sampled at half-sigma steps; with r 960 against sigma 250 the disc's
 * curvature makes that a close fit rather than an identity, and at this scale
 * the two are indistinguishable. It also beats any raster here: the ramp spans
 * #252525 to #151515 — 16 levels of grey — which 8-bit PNG quantises into
 * visible concentric rings, whereas the compositor dithers a gradient.
 */
const blur =
  "radial-gradient(circle closest-side," +
  "rgba(37,37,37,1) 0%," +
  "rgba(37,37,37,0.98) 31%," +
  "rgba(37,37,37,0.84) 49%," +
  "rgba(37,37,37,0.5) 66%," +
  "rgba(37,37,37,0.31) 74%," +
  "rgba(37,37,37,0.16) 83%," +
  "rgba(37,37,37,0.07) 91%," +
  "rgba(37,37,37,0) 100%)"

const MaintainerSection = () => {
  return (
    // `overflow-x-clip` stops the 2920px-wide glow raising a horizontal
    // scrollbar while leaving the block axis visible — `clip` is the one
    // overflow value that composes with `visible` on the other axis — so the
    // glow still bleeds up into BuildsSection with no seam at the boundary.
    // Upward overflow is free: the scrollable overflow region only grows in
    // the block-end/inline-end directions, so a negative `top` adds no scroll.
    <section className="relative w-full overflow-x-clip py-[96px] sm:py-[160px]">
      {/* `bottom-0` ends the box at the section's bottom edge so nothing hangs
          past it into the footer — an oversized box here would add ~1190px of
          dead scroll after the last element on the page. The gradient keeps its
          full square geometry via `backgroundSize`, so `closest-side` resolves
          to the same circle as before and the visible glow is unchanged; the
          background is simply clipped to the box, and backgrounds never
          contribute to scrollable overflow. The hard cut lands exactly where
          the footer's opaque `bg-surface-card` begins, matching the design,
          where the glow is likewise brightest right at the footer's top edge
          and hidden behind it. */}
      <div
        aria-hidden="true"
        style={{
          backgroundImage: blur,
          backgroundSize: "152.083vw 152.083vw",
          backgroundPosition: "center top",
          backgroundRepeat: "no-repeat",
        }}
        className="pointer-events-none absolute top-[-22.5vw] bottom-0 left-1/2 -z-10 w-[152.083vw] -translate-x-1/2"
      />

      <div
        aria-hidden="true"
        className="border-hairline pointer-events-none absolute inset-y-0 right-[6.615%] left-[6.198%] hidden border-x sm:block"
      />

      <div className="relative px-6 sm:pr-[calc(6.615%+48px)] sm:pl-[calc(6.198%+55px)]">
        <motion.div
          {...inView}
          variants={stagger}
          className="mx-auto flex max-w-[762px] flex-col items-center text-center"
        >
          <motion.p
            variants={riseIn}
            className="text-ink-faint text-[17px] leading-[1.2] font-semibold whitespace-nowrap sm:text-[length:var(--text-body-lg)]"
          >
            Build With Us
          </motion.p>

          <motion.h2
            variants={riseIn}
            className="text-ink-faint mt-[18px] text-[32px] leading-[1.39] font-semibold sm:text-[42px] lg:text-[length:var(--text-h2)]"
          >
            Bring <span className="text-ink">VoltageOS</span>
            <br />
            to more devices.
          </motion.h2>

          <motion.p
            variants={riseIn}
            className="text-ink-muted mt-[14px] text-[16px] leading-[1.2] font-normal tracking-[var(--tracking-body)] sm:text-[18px] lg:text-[length:var(--text-body-lg)]"
          >
            VoltageOS grows through developers and maintainers who help bring a
            clean, secure and open Android experience to more devices.
          </motion.p>

          <motion.p
            variants={riseIn}
            className="text-ink-muted mt-[24px] text-[16px] leading-[1.2] font-normal tracking-[var(--tracking-body)] sm:text-[18px] lg:text-[length:var(--text-body-lg)]"
          >
            Have a supported device in mind? Become a maintainer and help us
            build it.
          </motion.p>

          <motion.div
            variants={riseIn}
            className="mt-[32px] w-full max-w-[418px] sm:mt-[48px]"
          >
            <SurfaceButton
              title="Apply for Maintainership"
              href="/maintainership"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default MaintainerSection
