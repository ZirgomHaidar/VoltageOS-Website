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
    <section className="relative min-h-[100dvh] w-full overflow-clip">
      {/* hairline frame: 119/1793 of 1920 = 6.198%, 119/1080 = 11.019% */}
      <div
        aria-hidden="true"
        className="border-hairline pointer-events-none absolute inset-x-[-1px] top-[11.019%] bottom-[11.667%] border-y sm:inset-x-[6.198%] sm:border-x"
      />

      <div className="absolute inset-x-0 bottom-[11.667%] px-6 sm:px-[10.573%]">
        <div className="mx-auto flex w-full max-w-[1440px] flex-col items-start justify-between gap-12 pb-[9.26%] lg:flex-row lg:items-end lg:gap-8">
          <div className="flex flex-col">
            <p className="text-ink-faint text-[17px] font-semibold whitespace-nowrap sm:text-[length:var(--text-title)]">
              100% Secured . 100% Open Source
            </p>
            <h1 className="text-ink mt-[29px] text-[52px] font-semibold sm:text-[68px] lg:text-[length:var(--text-hero)]">
              Voltage OS
            </h1>
            <p className="text-ink-muted mt-[9px] text-[17px] font-semibold whitespace-nowrap sm:text-[length:var(--text-title)]">
              Secured . Private . Open
            </p>
          </div>

          <div className="flex w-full flex-col gap-[14px] lg:w-auto lg:items-end">
            <SurfaceButton title="What's New?" meta="Android 17 is out" />
            <SurfaceButton title="Download for my device" href="/devices" />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Home
