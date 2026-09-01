import SurfaceButton from "../components/SurfaceButton"
import DevicesSection from "../components/DevicesSection"
import FeaturesSection from "../components/FeaturesSection"

/**
 * Figma 594:164 "Hero Section" (1920x1080).
 *
 * Hairlines, insets and the y=854 bottom anchor are unchanged from 582:104.
 * What changed: H1 copy + leading 1.1 + 604px wrap width, the subheading
 * became a Regular-weight body paragraph at 598px, and the second button
 * reads "Get VoltageOS".
 *
 * Note 594:169's box (y=652 h=202) is STALE — its children sit at relTop
 * -307 / -229 / +86, so real content spans y=345 to y=854. Layout is derived
 * from the children, not that box.
 */
function Home() {
  return (
    <>
      <section className="relative h-[100dvh] min-h-[720px] w-full overflow-x-clip">
      {/* Four INDEPENDENT full-bleed lines, not a box: verticals x=119/1793
          span the full height, horizontals y=119/954 span 1932px on a 1920
          frame and deliberately overflow. One bordered element can only draw
          a box, so they are split into two crossing elements. */}
      <div
        aria-hidden="true"
        className="border-hairline pointer-events-none absolute inset-x-0 top-[11.019%] bottom-[11.667%] border-y"
      />
      <div
        aria-hidden="true"
        className="border-hairline pointer-events-none absolute inset-y-0 right-[6.615%] left-[6.198%] hidden border-x sm:block"
      />

      {/* Content bottom = y854 = 226/1080 = 20.93% from the bottom.
          Percentage `bottom` resolves against height; percentage padding
          would resolve against WIDTH, so the 46px inset (165-119) is fixed. */}
      <div className="absolute inset-x-0 bottom-[20.93%] px-6 sm:right-[6.615%] sm:left-[6.198%] sm:px-[46px]">
        <div className="flex flex-col items-start justify-between gap-10 2xl:flex-row 2xl:items-end">
          <div className="flex max-w-[604px] flex-col">
            <p className="text-ink-faint text-[17px] leading-[1.2] font-semibold whitespace-nowrap sm:text-[length:var(--text-body-lg)]">
              100% Secured . 100% Open Source
            </p>
            {/* leading 1.1 is the only non-1.2 leading in the design.
                Gap: tagline bottom 373.93 -> h1 top 423 = 49px. */}
            <h1 className="text-ink mt-[29px] text-[36px] leading-[1.1] font-semibold sm:mt-[49px] sm:text-[52px] lg:text-[68px] 2xl:text-[length:var(--text-hero)]">
              Android, with your privacy in mind.
            </h1>
            {/* Regular 400, and the only node tracking -0.024em rather than
                -0.03em. Gap: h1 bottom 713.84 (3 lines) -> body top 738. */}
            <p className="text-ink-muted mt-[16px] max-w-[598px] text-[16px] leading-[1.2] font-normal tracking-[var(--tracking-body)] sm:mt-[24px] sm:text-[18px] 2xl:text-[length:var(--text-body-lg)]">
              VoltageOS is an open source Android operating system built for
              people who want more control over their devices, with a clean
              experience, privacy focused features and regular security
              updates.
            </p>
          </div>

          <div className="flex w-full max-w-[418px] flex-col gap-[14px] 2xl:w-[418px] 2xl:max-w-none">
            <SurfaceButton title="What's New?" meta="Android 17 is out" />
            <SurfaceButton title="Get VoltageOS" href="/devices" />
          </div>
        </div>
      </div>
      </section>

      <DevicesSection />
      <FeaturesSection />
    </>
  )
}

export default Home
