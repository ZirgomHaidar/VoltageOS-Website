import { cn } from "../lib/utils"

export type Feature = {
  title: string
  description: string
  icon: string
}

const FeatureCard = ({
  title,
  description,
  icon,
  className,
}: Feature & { className?: string }) => {
  return (
    <article
      className={cn(
        "bg-surface-card rounded-surface flex min-h-[360px] w-full flex-col overflow-clip p-[24px] sm:min-h-[423px] sm:p-[31px] sm:pt-[51px]",
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
