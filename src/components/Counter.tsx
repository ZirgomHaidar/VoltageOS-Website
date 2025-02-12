import { useEffect, useRef } from "react"
import { useInView, useMotionValue, useSpring } from "motion/react"

interface CounterProps {
  value: number
  direction?: "up" | "down"
  className?: string
}

function Counter({ value, direction = "up", className }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const motionValue = useMotionValue(direction === "down" ? value : 0)
  const springValue = useSpring(motionValue, {
    damping: 100,
    stiffness: 100,
  })
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  useEffect(() => {
    if (isInView) {
      motionValue.set(direction === "down" ? 0 : value)
    }
  }, [motionValue, isInView])

  useEffect(
    () =>
      springValue.on("change", (latest) => {
        if (ref.current) {
          ref.current.textContent = latest.toFixed(1)
        }
      }),
    [springValue],
  )

  return <span className={className} ref={ref} />
}

export default Counter
