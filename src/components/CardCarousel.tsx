import { motion } from "motion/react"
import FeatureCard, { type Feature } from "./FeatureCard"
import type { CarouselControls } from "../lib/useCarousel"
import { inView, scaleIn, staggerFast } from "../lib/motion"

const CardCarousel = ({
  items,
  controls,
}: {
  items: Feature[]
  controls: CarouselControls
}) => {
  return (
    <motion.ul
      ref={controls.trackRef}
      onScroll={controls.sync}
      data-lenis-prevent
      {...inView}
      variants={staggerFast}
      className="no-scrollbar flex snap-x snap-mandatory gap-[15px] overflow-x-auto overscroll-x-contain"
    >
      {items.map((item) => (
        <motion.li
          key={item.title}
          variants={scaleIn}
          className="w-[300px] shrink-0 snap-start sm:w-[400px] lg:w-[465px]"
        >
          <FeatureCard {...item} />
        </motion.li>
      ))}
    </motion.ul>
  )
}

export default CardCarousel
