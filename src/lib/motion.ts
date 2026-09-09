import type { Variants } from "motion/react"

export const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]

export const GLIDE = {
  type: "spring",
  visualDuration: 1,
  bounce: 0,
} as const

export const riseIn: Variants = {
  hidden: { opacity: 0, y: 16, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 1.1, ease: EASE },
  },
}

export const riseInSm: Variants = {
  hidden: { opacity: 0, y: 10, filter: "blur(4px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.95, ease: EASE },
  },
}

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.97, filter: "blur(4px)" },
  show: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 1.0, ease: EASE },
  },
}

export const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.2, delayChildren: 0.04 } },
}

export const staggerFast: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.04 } },
}

export const inView = {
  initial: "hidden",
  whileInView: "show",
  viewport: { once: true, amount: 0.15, margin: "0px 0px -5% 0px" },
} as const

export const rise = (delay = 0) => ({
  initial: { opacity: 0, y: 18, filter: "blur(6px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  transition: { duration: 1.15, delay, ease: EASE },
})
