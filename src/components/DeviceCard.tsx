import {
  buildDate,
  buildSize,
  isoTimestamp,
  relativeTime,
  type Device,
} from "../lib/devices"
import { cn } from "../lib/utils"
import { cardShell } from "./FeatureCard"
import ArrowRight from "./ArrowRight"
import { buttonShell, ButtonWipe } from "./IconButton"

/**
 * SurfaceButton is not reused here: it renders a plain internal `<a>` with no
 * `target`/`rel`, and this control now leaves the site for a ~2 GB zip on
 * SourceForge. Same shell classes, so both states still read as one system.
 */
const controlShell =
  "flex h-[52px] w-full items-center justify-between pr-[22px] pl-[22px] sm:h-[63px] sm:pr-[29px] sm:pl-[30px]"

const controlFace = (label: string) => (
  <>
    <ButtonWipe />
    <span className="text-ink-muted group-hover:text-ink-invert ease-surface text-[length:var(--text-body-md)] font-semibold whitespace-nowrap transition-colors duration-[550ms]">
      {label}
    </span>
    <span className="text-ink-muted group-hover:text-ink-invert ease-surface flex items-center gap-[7px] transition-colors duration-[550ms]">
      <ArrowRight className="ease-surface transition-[translate] duration-[550ms] group-hover:translate-x-[3px]" />
    </span>
  </>
)

const DeviceCard = ({
  codename,
  name,
  maintainer,
  maintainerGitHub,
  version,
  md5,
  size,
  builtAt,
  download,
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

        <div className="mt-[10px] flex items-center gap-[10px]">
          {/* The circle is the fallback: a 404 avatar hides itself and leaves
              the surface behind it, so the row never collapses. github.com/<user>.png
              is used over api.github.com/users/<user> deliberately — the API caps
              unauthenticated callers at 60 req/hr, which one page of 25 cards
              would exhaust on a second visit. */}
          <span className="bg-surface-active size-[28px] shrink-0 overflow-clip rounded-full">
            {maintainerGitHub ? (
              <img
                src={`https://github.com/${maintainerGitHub}.png?size=56`}
                alt=""
                loading="lazy"
                decoding="async"
                referrerPolicy="no-referrer"
                onError={(event) => {
                  event.currentTarget.style.display = "none"
                }}
                className="size-full object-cover"
              />
            ) : null}
          </span>
          <p className="text-ink-muted truncate text-[15px] leading-[1.2] font-normal sm:text-[length:var(--text-body-md)]">
            {maintainer}
          </p>
        </div>

        {/* mt-auto pins the metadata block to the bottom so cards of differing
            title heights still line their dates up across a row. */}
        <p className="text-ink-muted mt-auto pt-[28px] text-[15px] leading-[1.2] font-normal sm:text-[length:var(--text-body-md)]">
          Build Date: {buildDate(builtAt)}
        </p>
        <p className="text-ink-muted mt-[8px] text-[15px] leading-[1.2] font-normal sm:text-[length:var(--text-body-md)]">
          Version: {version}
        </p>
        {size ? (
          <p className="text-ink-muted mt-[8px] text-[15px] leading-[1.2] font-normal sm:text-[length:var(--text-body-md)]">
            Size: {buildSize(size)}
          </p>
        ) : null}
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
        {/* No validated URL means no link: a card with a rejected or missing
            `download` renders a real disabled <button> rather than an <a> with
            a dead href, so it is still focusable-by-type and announces its own
            state instead of lying about being a link. */}
        {download ? (
          <a
            href={download}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Download ${name} build (opens in a new tab)`}
            className={cn(buttonShell, controlShell)}
          >
            {controlFace("Download")}
          </a>
        ) : (
          <button
            type="button"
            disabled
            aria-label={`Download unavailable for ${name}`}
            className={cn(
              buttonShell,
              controlShell,
              "disabled:pointer-events-none disabled:opacity-40",
            )}
          >
            {controlFace("Download Unavailable")}
          </button>
        )}
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
