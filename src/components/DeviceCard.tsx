import {
  buildDate,
  isoTimestamp,
  relativeTime,
  type Device,
} from "../lib/devices"
import { cn } from "../lib/utils"
import { cardShell } from "./FeatureCard"
import SurfaceButton from "./SurfaceButton"

const DeviceCard = ({
  codename,
  name,
  maintainer,
  version,
  md5,
  builtAt,
  image,
  className,
}: Device & { className?: string }) => {
  return (
    <article
      className={cn(
        cardShell,
        // min-h keeps a 1-line title card the same height as a 2-line one,
        // so a row never renders ragged while the grid fills in.
        "min-h-[560px] p-[24px] sm:min-h-[620px] sm:p-[26px]",
        className,
      )}
    >
      {image ? (
        <img
          src={image}
          alt=""
          loading="lazy"
          decoding="async"
          className="bg-surface-active aspect-[452/322] w-full shrink-0 rounded-[10px] object-contain"
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
          <time dateTime={isoTimestamp(builtAt)}>{relativeTime(builtAt)}</time>
        </p>

        {/* No flex-1 on the title: growing it to fill the row would push the
            pill to the far right and the gap would never apply. min-w-0 keeps
            the default shrink, so a long title still wraps rather than
            forcing the pill out of the card. */}
        <div className="mt-[18px] flex items-start gap-[8px]">
          <h3 className="text-ink min-w-0 text-[22px] leading-[1.2] font-bold break-words sm:text-[length:var(--text-h3)]">
            {name}
          </h3>
          <span className="bg-surface-active text-ink-muted mt-[3px] max-w-[40%] shrink-0 truncate rounded-[3.905px] px-[9px] py-[5px] text-[13px] leading-[1.2] font-normal">
            {codename}
          </span>
        </div>

        <p className="text-ink-muted mt-[8px] truncate text-[15px] leading-[1.2] font-normal sm:text-[length:var(--text-body-md)]">
          {maintainer}
        </p>

        {/* mt-auto pins the metadata block to the bottom so cards of differing
            title heights still line their dates up across a row. */}
        <p className="text-ink-muted mt-auto pt-[28px] text-[15px] leading-[1.2] font-normal sm:text-[length:var(--text-body-md)]">
          Build Date: {buildDate(builtAt)}
        </p>
        <p className="text-ink-muted mt-[8px] text-[15px] leading-[1.2] font-normal sm:text-[length:var(--text-body-md)]">
          Version: {version}
        </p>
        {/* The OTA feed publishes md5 only — there is no sha256 field. */}
        {md5 ? (
          <p
            title={md5}
            className="text-ink-muted mt-[8px] truncate text-[15px] leading-[1.2] font-normal sm:text-[length:var(--text-body-md)]"
          >
            MD5: {md5}
          </p>
        ) : null}
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
