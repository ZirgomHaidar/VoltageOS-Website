import { useLayoutEffect, useRef } from "react"
import { AnimatePresence, MotionConfig, motion } from "motion/react"
import { cn } from "../lib/utils"
import { EASE } from "../lib/motion"
import { cardShell } from "./FeatureCard"
import { buttonShell, ButtonWipe } from "./IconButton"

/**
 * EASE reflected through the diagonal — the same cubic, accelerating away
 * instead of decelerating in. An exit that reuses the entrance's ease-out
 * spends its last frames in sub-pixel crawl, which reads as a stall.
 */
const EASE_IN: [number, number, number, number] = [0.32, 0, 0.67, 0]

type WhatsNewOverlayProps = {
  open: boolean
  onClose: () => void
}

const WhatsNewOverlay = ({ open, onClose }: WhatsNewOverlayProps) => {
  const dialog = useRef<HTMLDialogElement>(null)

  // showModal() is what buys the top layer, the inert background, Esc, and
  // focus return to the trigger — none of which a positioned <div> gets for
  // free. The UA also blocks document scroll for a modal dialog, but Lenis
  // scrolls from its own wheel listener rather than the UA's, so the page still
  // creeps behind the overlay; clipping the root is what actually stops it.
  //
  // Layout effect, not passive: `hidden open:grid` means the dialog is
  // `display: none` until the `open` attribute lands. A passive effect fires
  // after paint, so motion would start ticking the entrance inside a
  // display-none subtree and the first frames would elapse unseen.
  //
  // `open` guard: StrictMode re-runs this effect, and showModal() on an
  // already-open dialog throws InvalidStateError.
  useLayoutEffect(() => {
    if (!open) return

    if (!dialog.current?.open) dialog.current?.showModal()
    document.documentElement.style.overflow = "hidden"

    return () => {
      document.documentElement.style.overflow = ""
    }
  }, [open])

  return (
    // Preflight zeroes margin/padding/border, but the UA's `background: canvas`,
    // `width: fit-content` and `max-width: calc(100% - 6px - 2em)` survive it —
    // that max-width would otherwise clamp the box off-centre against inset-0.
    // `hidden open:grid` rather than a bare `grid`: any author `display` beats
    // the UA's `dialog:not([open]) { display: none }` regardless of specificity,
    // so a bare `grid` would leave the closed dialog painted over the page.
    // The scrim is drawn as a child rather than in ::backdrop so motion can
    // animate it; ::backdrop's own tint is cleared.
    <dialog
      ref={dialog}
      onClose={onClose}
      // Esc closes the dialog synchronously, which would pop it out of the top
      // layer with no exit animation. Cancelling the default and routing
      // through state lets AnimatePresence play out, then close() below.
      onCancel={(event) => {
        event.preventDefault()
        onClose()
      }}
      aria-labelledby="whats-new-title"
      className="fixed inset-0 hidden h-auto max-h-none w-auto max-w-none place-items-center bg-transparent p-4 backdrop:bg-transparent open:grid sm:p-6"
    >
      {/* A bounded 20% scale on a small centred dialog is not the vestibular
          trigger the app-level `reducedMotion="user"` guards against — that is
          there for the full-viewport scroll reveals. But it strips EVERY
          `scale`/`y` transform site-wide, which silently reduced this overlay
          to a plain crossfade no matter what curve or duration was set here.
          Scoping an override to this subtree restores the intended motion; the
          14 scroll-reveal components still honour the OS setting. */}
      <MotionConfig reducedMotion="never">
        <AnimatePresence
          // Guarded: a fast close→open would otherwise let the previous exit's
          // completion fire after the dialog is legitimately open again and
          // close() it out from under the new entrance.
          onExitComplete={() => {
            if (!open) dialog.current?.close()
          }}
        >
          {open && (
            <motion.div
              key="scrim"
              onClick={onClose}
              aria-hidden="true"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.3, ease: EASE } }}
              transition={{ duration: 0.45, ease: EASE }}
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            />
          )}
          {open && (
            <motion.div
              key="panel"
              // Lenis swallows wheel events site-wide; this opts the panel back
              // out so a long post scrolls natively inside the overlay.
              data-lenis-prevent
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              // EASE_IN, not EASE: an exit reusing the entrance's ease-out
              // spends its final frames in sub-pixel crawl, which reads as the
              // shrink stalling before the card vanishes.
              exit={{
                opacity: 0,
                scale: 0.8,
                transition: { duration: 0.32, ease: EASE_IN },
              }}
              transition={{ duration: 0.5, ease: EASE }}
              className={cn(
                cardShell,
                "border-hairline relative z-10 max-h-[86dvh] w-[min(92vw,720px)] transform-gpu overflow-y-auto border p-6 sm:p-[31px]",
              )}
            >
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close"
                  className={cn(
                    buttonShell,
                    "flex size-[44px] shrink-0 items-center justify-center sm:size-[52px]",
                  )}
                >
                  <ButtonWipe />
                  <svg
                    viewBox="0 0 18 18"
                    fill="none"
                    aria-hidden="true"
                    className="text-ink-muted group-hover:text-ink-invert ease-surface size-[18px] shrink-0 transition-colors duration-[550ms]"
                  >
                    <path
                      d="M4.5 4.5l9 9M13.5 4.5l-9 9"
                      stroke="currentColor"
                      strokeWidth={1.5}
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
              </div>

              <img
                alt="VoltageOS Android 17 preview"
                width={1280}
                height={675}
                loading="lazy"
                decoding="async"
                className="rounded-surface mt-[18px] aspect-[1280/675] w-full shrink-0 object-cover"
                src="/images/whats-new-hero.webp"
              />

              <h2
                id="whats-new-title"
                className="text-ink mt-[24px] text-[24px] leading-[1.2] font-semibold sm:mt-[31px] sm:text-[length:var(--text-h3)]"
              >
                Android 17 is out
              </h2>

              <p className="mt-[14px] flex flex-wrap items-center gap-x-[10px] gap-y-[4px]">
                <span className="text-ink text-[length:var(--text-body-sm)] font-semibold">
                  VoltageOS Team
                </span>
                <span
                  aria-hidden="true"
                  className="bg-ink-faint size-[4px] rounded-full"
                />
                <span className="text-ink-muted text-[length:var(--text-meta)] font-medium tracking-[var(--tracking-body)]">
                  Core Maintainers
                </span>
              </p>

              <div className="text-ink-muted mt-[18px] flex flex-col gap-[12px] text-[15px] leading-[1.4] font-normal tracking-[var(--tracking-body)] sm:text-[16px]">
                <p>
                  VoltageOS 6.0 based on Android 17 brings refined sandboxed Google Play support, improved power management profiles, and the latest upstream security patches.
                </p>
                <p>
                  Built for security and privacy without sacrificing speed or compatibility. Check the Devices section for initial branch-17 builds.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </MotionConfig>
    </dialog>
  )
}

export default WhatsNewOverlay
