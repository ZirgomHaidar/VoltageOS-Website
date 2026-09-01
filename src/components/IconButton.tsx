import { cn } from "../lib/utils"
import ArrowRight from "./ArrowRight"

/**
 * Shared shell for every button surface in the design: the #212121 fill, the
 * 16.624px radius, the clip that contains the hover wipe, and the blur that
 * the frames declare even though the fill is opaque.
 *
 * SurfaceButton and IconButton both consume this. They stay separate
 * components rather than one `variant` prop because they differ
 * semantically — SurfaceButton is a link, IconButton is a control.
 */
export const buttonShell =
  "group bg-surface-solid rounded-surface relative isolate overflow-clip backdrop-blur-[10px]"

/**
 * The hover wipe: a white child that grows w-0 -> w-full from the left,
 * clipped by the shell. Figma authors this at left-[-342px] (418 - 76,
 * left over from resizing the wide button down), which would render the
 * whole wipe offscreen — it must be left-0.
 */
export const ButtonWipe = () => (
  <span
    aria-hidden="true"
    className="rounded-surface-inner absolute inset-y-0 left-0 -z-10 w-0 bg-white transition-[width] duration-300 ease-out group-hover:w-full motion-reduce:transition-none"
  />
)

type IconButtonProps = {
  label: string
  direction?: "left" | "right"
  onClick?: () => void
  disabled?: boolean
  className?: string
}

/**
 * Figma 600:94 (next) / 600:100 (prev), 76x63.
 *
 * Inherits the SurfaceButton shell exactly — same fill, radius, blur and
 * hover wipe — and drops the label, so the arrow sits centred:
 * 29 + 18 + 29 = 76.
 *
 * The prev button is not a second asset: Figma wraps the same node in
 * rotate-180 + -scale-y-100, which composes to a horizontal flip. One
 * ArrowRight with rotate-180 reproduces it.
 *
 * Icon-only, so `label` is required and drives aria-label.
 */
const IconButton = ({
  label,
  direction = "right",
  onClick,
  disabled,
  className,
}: IconButtonProps) => {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      disabled={disabled}
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
          "text-ink-muted group-hover:text-ink-invert transition-colors duration-300 motion-reduce:transition-none",
          direction === "left" && "rotate-180",
        )}
      />
    </button>
  )
}

export default IconButton
