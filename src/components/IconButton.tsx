import { motion, type MotionValue } from "motion/react"
import { cn } from "../lib/utils"
import ArrowRight from "./ArrowRight"

export const buttonShell =
  "group bg-surface-solid rounded-surface relative isolate overflow-clip"

export const ButtonWipe = () => (
  <span
    aria-hidden="true"
    className="ease-surface absolute inset-y-0 left-0 -z-10 w-full origin-left scale-x-0 bg-white transition-transform duration-[550ms] group-hover:scale-x-100"
  />
)

type IconButtonProps = {
  label: string
  direction?: "left" | "right"
  onClick?: () => void
  disabled?: boolean
  opacity?: MotionValue<number>
  className?: string
}

const IconButton = ({
  label,
  direction = "right",
  onClick,
  disabled,
  opacity,
  className,
}: IconButtonProps) => {
  return (
    <motion.button
      type="button"
      aria-label={label}
      onClick={onClick}
      disabled={disabled}
      style={{ opacity }}
      whileTap={{ scale: 0.96 }}
      className={cn(
        buttonShell,
        "flex h-[52px] w-[64px] shrink-0 items-center justify-center sm:h-[63px] sm:w-[76px]",
        "disabled:pointer-events-none disabled:opacity-40",
        className,
      )}
    >
      <ButtonWipe />
      <ArrowRight
        className={cn(
          "text-ink-muted group-hover:text-ink-invert ease-surface transition-[color,translate] duration-[550ms]",
          direction === "left"
            ? "rotate-180 group-hover:-translate-x-[3px]"
            : "group-hover:translate-x-[3px]",
        )}
      />
    </motion.button>
  )
}

export default IconButton
