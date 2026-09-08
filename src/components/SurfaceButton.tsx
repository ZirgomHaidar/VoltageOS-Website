import { cn } from "../lib/utils"
import ArrowRight from "./ArrowRight"
import { buttonShell, ButtonWipe } from "./IconButton"
import { Link } from "react-router"

type SurfaceButtonProps = {
  title: string
  meta?: string
  href?: string
  /** Override the link's accessible name when `title` repeats across a list. */
  ariaLabel?: string
  /** Ignored when `href` is set — a link navigates, it does not act. */
  onClick?: () => void
  className?: string
}

const SurfaceButton = ({
  title,
  meta,
  href,
  ariaLabel,
  onClick,
  className,
}: SurfaceButtonProps) => {
  const shell = cn(
    buttonShell,
    "flex h-[52px] w-full items-center justify-between pr-[22px] pl-[22px] sm:h-[63px] sm:pr-[29px] sm:pl-[30px]",
    className,
  )

  const content = (
    <>
      <ButtonWipe />

      <span className="text-ink-muted group-hover:text-ink-invert ease-surface text-[length:var(--text-body-md)] font-semibold whitespace-nowrap transition-colors duration-[550ms]">
        {title}
      </span>

      <span className="text-ink-muted group-hover:text-ink-invert ease-surface flex items-center gap-[7px] transition-colors duration-[550ms]">
        {meta ? (
          <span className="hidden text-[length:var(--text-meta)] font-medium whitespace-nowrap sm:inline">
            {meta}
          </span>
        ) : null}
        <ArrowRight className="ease-surface transition-[translate] duration-[550ms] group-hover:translate-x-[3px]" />
      </span>
    </>
  )

  if (!href) {
    return (
      <button
        type="button"
        aria-label={ariaLabel}
        onClick={onClick}
        className={shell}
      >
        {content}
      </button>
    )
  }

  if (/^https?:\/\//i.test(href)) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={ariaLabel}
        className={shell}
      >
        {content}
      </a>
    )
  }

  return (
    <Link to={href} aria-label={ariaLabel} className={shell}>
      {content}
    </Link>
  )
}

export default SurfaceButton
