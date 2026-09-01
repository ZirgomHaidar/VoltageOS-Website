import asus from "../assets/brands/slot1.png"
import brand2 from "../assets/brands/slot2.png"
import brand3 from "../assets/brands/slot3.png"
import brand4 from "../assets/brands/slot4.png"
import brand5 from "../assets/brands/slot5.png"
import brand6 from "../assets/brands/slot6.png"

/**
 * Figma 617:110 "Supported Devices Section" (1920x350).
 *
 * Two hairlines only, both VERTICAL (617:170 x=119, 617:174 x=1793) spanning
 * the full 350px height — no horizontals, since the hero's y=954 rule already
 * closes that edge. Same x as the hero, so the percentages carry over.
 *
 * The logo strip (637:158, 1468x100 at x=226) is CENTERED, not hairline-inset
 * like the hero: (1920 - 1468) / 2 = 226 exactly. Slot arithmetic closes on
 * content — 6 x 178 + 5 x 80 = 1468 — so gap-[80px] reproduces the 258px pitch
 * without hardcoded coordinates.
 *
 * Content is vertically centered in the band, not padded: tagline bottom
 * 123.93 -> strip top 156 is a 32px gap, total 161px, (350 - 161) / 2 = 94.5
 * against the authored 95 above / 94 below.
 *
 * alt="" throughout: these logos are supplementary to the tagline, which
 * carries the information. Naming them would need brand identity Figma does
 * not provide (nodes are "image 4"-"image 9").
 */
const brands = [asus, brand2, brand3, brand4, brand5, brand6]

const DevicesSection = () => {
  return (
    <section className="relative flex min-h-[280px] w-full items-center overflow-x-clip py-16 sm:min-h-[350px]">
      <div
        aria-hidden="true"
        className="border-hairline pointer-events-none absolute inset-y-0 right-[6.615%] left-[6.198%] hidden border-x sm:block"
      />

      <div className="relative mx-auto flex w-full max-w-[1468px] flex-col items-center px-6">
        <p className="text-ink-faint text-center text-[17px] leading-[1.2] font-semibold sm:whitespace-nowrap sm:text-[length:var(--text-body-lg)]">
          Supported over 10+ devices
        </p>

        <ul className="mt-[24px] flex w-full flex-wrap items-center justify-center gap-x-[40px] gap-y-[24px] sm:mt-[32px] xl:flex-nowrap xl:gap-[80px]">
          {brands.map((src, i) => (
            <li
              key={i}
              className="flex h-[64px] w-[114px] shrink-0 items-center justify-center sm:h-[80px] sm:w-[142px] xl:h-[100px] xl:w-[178px]"
            >
              <img
                src={src}
                alt=""
                loading="lazy"
                decoding="async"
                className="h-full w-full object-contain"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default DevicesSection
