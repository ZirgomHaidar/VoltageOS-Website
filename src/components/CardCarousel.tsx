import FeatureCard, { type Feature } from "./FeatureCard"
import type { CarouselControls } from "../lib/useCarousel"

/**
 * Figma 609:363 "Features Card Carousel", 1571x423 clipping a 1905px track
 * (4 x 465 + 3 x 15).
 *
 * Native overflow-x-auto + scroll-snap rather than a JS transform: touch,
 * trackpad and keyboard scrolling come free. The bar is hidden via
 * no-scrollbar, so the IconButton pair is the affordance.
 *
 * Scroll state lives in useCarousel, above this component — the nav pair sits
 * beside the section header (609:364 at y=239) while the track is at y=549,
 * so it cannot be owned here.
 */
const CardCarousel = ({
  items,
  controls,
}: {
  items: Feature[]
  controls: CarouselControls
}) => {
  return (
    <ul
      ref={controls.trackRef}
      onScroll={controls.sync}
      className="no-scrollbar flex snap-x snap-mandatory gap-[15px] overflow-x-auto overscroll-x-contain"
    >
      {items.map((item) => (
        <li
          key={item.title}
          className="w-[300px] shrink-0 snap-start sm:w-[400px] lg:w-[465px]"
        >
          <FeatureCard {...item} />
        </li>
      ))}
    </ul>
  )
}

export default CardCarousel
