import { buildDate, relativeTime, type Device } from "../lib/devices"
import { cn } from "../lib/utils"
import { cardShell } from "./FeatureCard"
import SurfaceButton from "./SurfaceButton"

const DeviceCard = ({
  codename,
  name,
  maintainer,
  md5,
  builtAt,
  image,
  className,
}: Device & { className?: string }) => {
  return (
    <article className={cn(cardShell, "p-[24px] sm:p-[26px]", className)}>
      {image ? (
        <img
          src={image}
          alt=""
          loading="lazy"
          decoding="async"
          className="aspect-[452/322] w-full shrink-0 rounded-[10px] object-contain"
        />
      ) : (
        // ponytail: drop src/assets/devices/<codename>.png to replace this.
        <div
          aria-hidden="true"
          className="bg-surface-active aspect-[452/322] w-full shrink-0 rounded-[10px]"
        />
      )}

      <div className="flex flex-1 flex-col px-[8px]">
        <p className="text-ink-muted mt-[28px] text-[14px] leading-[1.2] font-normal sm:mt-[34px] sm:text-[length:var(--text-meta)]">
          Updated{" "}
          <time dateTime={new Date(builtAt * 1000).toISOString()}>
            {relativeTime(builtAt)}
          </time>
        </p>

        <div className="mt-[18px] flex items-start gap-[9px]">
          <h3 className="text-ink text-[22px] leading-[1.2] font-bold sm:text-[length:var(--text-h3)]">
            {name}
          </h3>
          <span className="bg-surface-active text-ink-muted mt-[3px] shrink-0 rounded-[3.905px] px-[9px] py-[5px] text-[13px] leading-[1.2] font-normal">
            {codename}
          </span>
        </div>

        <p className="text-ink-muted mt-[8px] text-[15px] leading-[1.2] font-normal sm:text-[length:var(--text-body-md)]">
          {maintainer}
        </p>
        <p className="text-ink-muted mt-[28px] text-[15px] leading-[1.2] font-normal sm:text-[length:var(--text-body-md)]">
          Build Date: {buildDate(builtAt)}
        </p>
        {/* The OTA feed publishes md5 only — there is no sha256 field. */}
        <p
          title={md5}
          className="text-ink-muted mt-[8px] truncate text-[15px] leading-[1.2] font-normal sm:text-[length:var(--text-body-md)]"
        >
          MD5: {md5}
        </p>
      </div>

      <div className="mt-[32px] sm:mt-[40px]">
        <SurfaceButton
          title="View Details"
          href={`/devices/download/${codename}`}
          ariaLabel={`View details for ${name}`}
        />
      </div>
    </article>
  )
}

/** Holds the grid's height on first paint so the reveal has nothing to shift. */
export const DeviceCardSkeleton = () => (
  <div
    aria-hidden="true"
    className={cn(
      cardShell,
      "min-h-[560px] animate-pulse p-[24px] sm:min-h-[620px] sm:p-[26px]",
    )}
  >
    <div className="bg-surface-active aspect-[452/322] w-full rounded-[10px]" />
  </div>
)

export default DeviceCard
