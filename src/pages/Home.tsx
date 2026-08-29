import SurfaceButton from "../components/SurfaceButton"

/**
 * Figma 582:104 "Hero Section" (1920x1080).
 *
 * The four Line nodes (x=119 / x=1793, y=119 / y=954) are #333333 1px
 * strokes, rebuilt as CSS borders so they scale instead of shipping
 * fixed-width SVGs. Content sits 46px inside that frame and the text
 * block plus button stack are both bottom-aligned at y=854.
 */
function Home() {
  return (
    <section className="relative h-[100dvh] min-h-[600px] w-full overflow-clip">
      {/* Hairlines are four INDEPENDENT full-bleed lines, not a box:
          verticals x=119/x=1793 span y 0->1080 (full height), horizontals
          y=119/y=954 span the full width (authored 1932px on a 1920 frame,
          so they overflow slightly). One bordered element can't do that —
          its top border would stop at the left/right insets — so they are
          split into two crossing elements. */}
      <div
        aria-hidden="true"
        className="border-hairline pointer-events-none absolute inset-x-0 top-[11.019%] bottom-[11.667%] border-y"
      />
      <div
        aria-hidden="true"
        className="border-hairline pointer-events-none absolute inset-y-0 right-[6.615%] left-[6.198%] hidden border-x sm:block"
      />

      {/* Content bottom = y854, i.e. 100px above the lower hairline (y954) =
          226/1080 = 20.93% from the bottom. Percentage `bottom` resolves
          against height; percentage padding would resolve against WIDTH, so
          the inset is fixed px measured from the hairlines (165-119 = 46). */}
      <div className="absolute inset-x-0 bottom-[20.93%] px-6 sm:right-[6.615%] sm:left-[6.198%] sm:px-[46px]">
        <div className="flex flex-col items-start justify-between gap-10 xl:flex-row xl:items-end">
          <div className="flex flex-col">
            <p className="text-ink-faint text-[17px] font-semibold whitespace-nowrap sm:text-[length:var(--text-title)]">
              100% Secured . 100% Open Source
            </p>
            <h1 className="text-ink mt-[29px] text-[52px] font-semibold sm:text-[68px] xl:text-[length:var(--text-hero)]">
              Voltage OS
            </h1>
            <p className="text-ink-muted mt-[9px] text-[17px] font-semibold whitespace-nowrap sm:text-[length:var(--text-title)]">
              Secured . Private . Open
            </p>
          </div>

          <div className="flex w-full max-w-[418px] flex-col gap-[14px] xl:w-[418px] xl:max-w-none">
            <SurfaceButton title="What's New?" meta="Android 17 is out" />
            <SurfaceButton title="Download for my device" href="/devices" />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Home
