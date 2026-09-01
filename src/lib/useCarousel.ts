import { useCallback, useEffect, useRef, useState } from "react"

/** Track gap, in px — matches gap-[15px] on the carousel <ul>. */
const GAP = 15

export type CarouselControls = ReturnType<typeof useCarousel>

/**
 * Scroll state for a snap carousel, kept OUTSIDE the track component.
 *
 * Figma puts the nav pair beside the section header (609:364 at y=239) while
 * the track sits at y=549 — different DOM subtrees, so the state has to live
 * above both. Owning it inside CardCarousel is what left the header buttons
 * inert: they were a second, unconnected pair.
 */
export const useCarousel = () => {
  const trackRef = useRef<HTMLUListElement>(null)
  const [atStart, setAtStart] = useState(true)
  const [atEnd, setAtEnd] = useState(false)

  const sync = useCallback(() => {
    const el = trackRef.current
    if (!el) return
    // 1px tolerance: fractional scroll offsets never land exactly on 0 or max.
    setAtStart(el.scrollLeft <= 1)
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 1)
  }, [])

  useEffect(() => {
    sync()
    // The reachable range changes with viewport width, so re-derive on resize.
    window.addEventListener("resize", sync)
    return () => window.removeEventListener("resize", sync)
  }, [sync])

  const page = useCallback((direction: 1 | -1) => {
    const el = trackRef.current
    if (!el) return
    const first = el.firstElementChild as HTMLElement | null
    // Pitch read from the rendered card, so it stays correct as the cards
    // step 300 -> 400 -> 465px across breakpoints (Figma pitch is 465+15=480).
    const pitch = first ? first.offsetWidth + GAP : el.clientWidth
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    el.scrollBy({
      left: direction * pitch,
      behavior: reduce ? "auto" : "smooth",
    })
  }, [])

  const scrollPrev = useCallback(() => page(-1), [page])
  const scrollNext = useCallback(() => page(1), [page])

  return { trackRef, atStart, atEnd, sync, scrollPrev, scrollNext }
}
