import { cn } from "../lib/utils"
import ArrowRight from "./ArrowRight"

type SurfaceButtonProps = {
  title: string
  meta?: string
  href?: string
  className?: string
}

/**
 * Figma 584:447 (default) / 584:453 (hovered).
 *
 * Hover is a left-anchored width wipe, not a background swap: the white
 * child goes w-0 -> w-full behind the container's overflow-clip, and the
 * label colours invert on top of it.
 */
const SurfaceButton = ({ title, meta, href, className }: SurfaceButtonProps) => {
  return (
    <a
      href={href ?? "#"}
      className={cn(
        "group bg-surface rounded-surface relative isolate flex h-[52px] w-full max-w-[418px] items-center justify-between overflow-clip pr-[22px] pl-[22px] backdrop-blur-[10px] sm:h-[63px] sm:pr-[29px] sm:pl-[30px]",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className="rounded-surface-inner absolute inset-y-0 left-0 -z-10 w-0 bg-white transition-[width] duration-300 ease-out group-hover:w-full"
      />

      <span className="text-ink-muted group-hover:text-ink-invert text-[19px] font-semibold whitespace-nowrap transition-colors duration-300 sm:text-[length:var(--text-title)]">
        {title}
      </span>

      <span className="text-ink-muted group-hover:text-ink-invert flex items-center gap-[7px] transition-colors duration-300">
        {meta ? (
          <span className="hidden text-[length:var(--text-meta)] font-medium whitespace-nowrap sm:inline">
            {meta}
          </span>
        ) : null}
        <ArrowRight />
      </span>
    </a>
  )
}

export default SurfaceButton
