import { motion } from "motion/react"
import asus from "../assets/brands/slot1.png"
import brand2 from "../assets/brands/slot2.png"
import brand3 from "../assets/brands/slot3.png"
import brand4 from "../assets/brands/slot4.png"
import brand5 from "../assets/brands/slot5.png"
import brand6 from "../assets/brands/slot6.png"
import { inView, riseIn, riseInSm, stagger, staggerFast } from "../lib/motion"

const brands = [asus, brand2, brand3, brand4, brand5, brand6]

const DevicesSection = () => {
  return (
    <section className="relative flex min-h-[280px] w-full items-center overflow-x-clip py-16 sm:min-h-[350px]">
      <div
        aria-hidden="true"
        className="border-hairline pointer-events-none absolute inset-y-0 right-[6.615%] left-[6.198%] hidden border-x sm:block"
      />

      <motion.div
        {...inView}
        variants={stagger}
        className="relative mx-auto flex w-full max-w-[1468px] flex-col items-center px-6"
      >
        <motion.p
          variants={riseIn}
          className="text-ink-faint text-center text-[17px] leading-[1.2] font-semibold sm:whitespace-nowrap sm:text-[length:var(--text-body-lg)]"
        >
          Supported over 10+ devices
        </motion.p>

        <motion.ul
          variants={staggerFast}
          className="mt-[24px] flex w-full flex-wrap items-center justify-center gap-x-[40px] gap-y-[24px] sm:mt-[32px] xl:flex-nowrap xl:gap-[80px]"
        >
          {brands.map((src, i) => (
            <motion.li
              key={i}
              variants={riseInSm}
              className="flex h-[64px] w-[114px] shrink-0 items-center justify-center sm:h-[80px] sm:w-[142px] xl:h-[100px] xl:w-[178px]"
            >
              <img
                src={src}
                alt=""
                loading="lazy"
                decoding="async"
                className="h-full w-full object-contain"
              />
            </motion.li>
          ))}
        </motion.ul>
      </motion.div>
    </section>
  )
}

export default DevicesSection
