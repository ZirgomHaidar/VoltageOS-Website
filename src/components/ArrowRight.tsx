import { cn } from "../lib/utils"

const ArrowRight = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 18 18"
    fill="none"
    aria-hidden="true"
    className={cn("size-[18px] shrink-0", className)}
  >
    <path
      d="M3.75 9h10.5M9 14.25 14.25 9 9 3.75"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export default ArrowRight
