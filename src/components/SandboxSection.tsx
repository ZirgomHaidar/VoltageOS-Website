import { motion } from "motion/react"
import SurfaceButton from "./SurfaceButton"
import { inView, riseIn, scaleIn, stagger } from "../lib/motion"
import frame from "../assets/sandbox/frame.png"

// ponytail: the illustration is one 3x PNG export of Figma 664:2 — bezel,
// blurred glass, camera cutout, dashed rail and both icon cards are baked in,
// so only the copy and the button are live DOM. Every overlay offset and font
// size is a percentage / cqw of the image's own width, so text and artwork
// scale as one unit instead of drifting apart.
// Upgrade path: AVIF or WebP behind <picture> cuts ~75% of the 466 KB.

// The export is 1674x1036 design px (3x -> 5022x3108). It runs 30px taller than
// the 1006px frame because the centered 15px bezel stroke grows the export
// bounds, so content sits 15px lower here than in Figma's frame space:
//   eyebrow top   y=505  -> 505/1674 = 30.17%  padding-top
//   h2 45px              ->  45/1674 = 2.688cqw
//   eyebrow/body 22px    ->  22/1674 = 1.314cqw
//   text column 762px    -> 45.52%
//   button 418px         -> 24.97%
const SandboxSection = () => {
  return (
    <section className="relative w-full overflow-x-clip py-[96px] sm:py-[192px]">
      {/* z-10 keeps these above the artwork. The PNG carries an opaque #151515
          backdrop (Figma bakes it in because the glass samples it for
          backdrop-blur), so at lg it would otherwise paint straight over them.
          Lifted, they run the section's full height as in the design and the
          dashed rail terminates exactly on them. */}
      <div
        aria-hidden="true"
        className="border-hairline pointer-events-none absolute inset-y-0 right-[6.615%] left-[6.198%] z-10 hidden border-x sm:block"
      />

      {/* Text-only band (sm..lg) gets the same inset as Features/Foundation so
          the copy lines up with them; at lg the image needs the full flush
          width between the hairlines, so the extra inset is dropped. */}
      <div className="px-6 sm:pr-[calc(6.615%+48px)] sm:pl-[calc(6.198%+55px)] lg:pr-[6.615%] lg:pl-[6.198%]">
        <motion.div
          {...inView}
          variants={stagger}
          className="@container relative mx-auto w-full max-w-[1674px]"
        >
          {/* In flow, so the width/height attrs give the box the asset's exact
              ratio for the overlay to fill — no hardcoded aspect to drift. */}
          <motion.img
            variants={scaleIn}
            src={frame}
            alt=""
            width={5022}
            height={3108}
            draggable={false}
            loading="lazy"
            decoding="async"
            className="hidden w-full select-none lg:block"
          />

          {/* Below lg the proportional copy would hit its readable floor and
              overflow the bezel, so the art is off and this falls back to a
              plain left-aligned stack, matching Features/Foundation. */}
          <div className="flex max-w-[762px] flex-col items-start text-left lg:max-w-none lg:absolute lg:inset-0 lg:items-center lg:pt-[30.17%] lg:text-center">
            <motion.p
              variants={riseIn}
              className="text-ink-faint text-[17px] leading-[1.2] font-semibold sm:text-[length:var(--text-body-lg)] lg:text-[1.314cqw]"
            >
              Google Play, with more control
            </motion.p>

            <motion.h2
              variants={riseIn}
              className="text-ink-faint mt-[18px] text-[28px] leading-[1.39] font-semibold capitalize sm:text-[38px] lg:mt-[1.08%] lg:text-[2.688cqw]"
            >
              Keep the apps you <span className="text-ink">need</span>
              <br />
              Limit what they can <span className="text-ink">access</span>
            </motion.h2>

            <motion.p
              variants={riseIn}
              className="text-ink-muted mt-[24px] max-w-[762px] text-[16px] leading-[1.2] font-normal tracking-[var(--tracking-body)] sm:text-[18px] lg:mt-[0.84%] lg:max-w-[45.52%] lg:text-[1.314cqw]"
            >
              VoltageOS provides a sandboxed Google Play environment designed to
              preserve broad app compatibility while limiting unnecessary access
              and privileges.
            </motion.p>

            {/* Fixed 63px tall by design; kept fixed so the hit target stays
                tappable rather than shrinking with the artwork. */}
            <motion.div
              variants={riseIn}
              className="mt-[32px] w-full max-w-[418px] lg:mt-[3.82%] lg:w-[24.97%] lg:max-w-none"
            >
              <SurfaceButton title="Learn more about privacy" href="/privacy" />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default SandboxSection
