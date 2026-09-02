import type { Variants } from "motion/react"

export const EASE: [number, number, number, number] = [0.33, 1, 0.68, 1]

export const GLIDE = {
  type: "spring",
  visualDuration: 1,
  bounce: 0,
} as const

export const riseIn: Variants = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 1.3, ease: EASE } },
}

export const riseInSm: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 1.1, ease: EASE } },
}

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  show: { opacity: 1, scale: 1, transition: { duration: 1.2, ease: EASE } },
}

export const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.18 } },
}

export const staggerFast: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
}

export const inView = {
  initial: "hidden",
  whileInView: "show",
  viewport: { once: true, amount: 0.35, margin: "0px 0px -10% 0px" },
} as const

export const rise = (delay = 0) => ({
  initial: { opacity: 0, y: 22 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 1.1, delay, ease: EASE },
})
