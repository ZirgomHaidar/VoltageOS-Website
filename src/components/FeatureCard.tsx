import { cn } from "../lib/utils"

export type Feature = {
  title: string
  description: string
  icon: string
}

/**
 * Figma 594:272 / 600:19 / 600:34 / 600:79 — "Card", 465x423.
 *
 * Vertical stack closes exactly on the body's authored y=294:
 *   51 (pt) + 100 (icon) + 58 (gap) + 85 (title block) = 294
 * so the title gets a RESERVED 85px block rather than pushing the body down.
 * Body starts at the same y in all four cards regardless of title length —
 * that is deliberate, and it is why min-h-[85px] is on the title.
 *
 * min-h rather than h on the card: bodies run 156-196 chars (4-5 lines at
 * 403px), and a fixed height combined with overflow-clip would clip the
 * longest one — certainly so on reuse with different copy.
 *
 * Title widths vary per card in Figma (289 / 256 / 218 / 198) but are
 * manually sized boxes all producing 2 lines, so a uniform max-w-[290px]
 * reproduces card 1 exactly and holds 2 lines on the rest.
 */
const FeatureCard = ({
  title,
  description,
  icon,
  className,
}: Feature & { className?: string }) => {
  return (
    <article
      className={cn(
        "bg-surface-card rounded-surface flex min-h-[360px] w-full flex-col overflow-clip p-[24px] backdrop-blur-[10px] sm:min-h-[423px] sm:p-[31px] sm:pt-[51px]",
        className,
      )}
    >
      <img
        src={icon}
        alt=""
        loading="lazy"
        decoding="async"
        className="size-[80px] shrink-0 object-contain sm:size-[100px]"
      />

      <h3 className="text-ink mt-[40px] max-w-[290px] text-[22px] leading-[1.2] font-bold sm:mt-[58px] sm:min-h-[85px] sm:text-[length:var(--text-h3)]">
        {title}
      </h3>

      <p className="text-ink-muted mt-[16px] max-w-[403px] text-[16px] leading-[1.2] font-normal sm:mt-0 sm:text-[length:var(--text-body-md)]">
        {description}
      </p>
    </article>
  )
}

export default FeatureCard
