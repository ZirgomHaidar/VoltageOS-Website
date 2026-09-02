import { useCallback, useEffect, useRef, useState } from "react"
import { animate, useMotionValue } from "motion/react"
import { GLIDE } from "./motion"

const EPSILON = 1
const FADE_PX = 140
const DIM = 0.4

export type CarouselControls = ReturnType<typeof useCarousel>

export const clampStops = (offsets: number[], max: number) => {
  const stops: number[] = []
  for (const offset of offsets) {
    const stop = Math.min(Math.max(offset, 0), max)
    if (!stops.some((s) => Math.abs(s - stop) <= EPSILON)) stops.push(stop)
  }
  return stops.sort((a, b) => a - b)
}

export const step = (stops: number[], from: number, direction: 1 | -1) =>
  direction === 1
    ? stops.find((s) => s > from + EPSILON)
    : stops.filter((s) => s < from - EPSILON).pop()

export const fade = (distance: number, span: number) =>
  DIM +
  (1 - DIM) * Math.min(1, distance / Math.max(1, Math.min(FADE_PX, span)))

if (import.meta.env.DEV) {
  const s = clampStops([0, 480, 960, 1440], 456.92)
  console.assert(s.length === 2, "unreachable stops should collapse", s)
  console.assert(step(s, 0, 1) === s[1], "next from start", s)
  console.assert(step(s, s[1], 1) === undefined, "no next at end", s)
  console.assert(step(s, s[1], -1) === 0, "prev returns to start", s)
  console.assert(step(s, 0, -1) === undefined, "no prev at start", s)
  console.assert(fade(0, 456.92) === DIM, "at the edge, dimmed")
  console.assert(fade(456.92, 456.92) === 1, "clear of the edge, lit")
  console.assert(Math.abs(fade(70, 140) - 0.7) < 1e-9, "half the window")
  console.assert(fade(0, 0) === DIM, "nothing to scroll, dimmed")
}

const measure = (el: HTMLElement) => {
  const base = el.getBoundingClientRect().left - el.scrollLeft
  return clampStops(
    Array.from(el.children, (c) => c.getBoundingClientRect().left - base),
    el.scrollWidth - el.clientWidth,
  )
}

export const useCarousel = () => {
  const trackRef = useRef<HTMLUListElement>(null)
  const glide = useRef<{ stop: () => void } | null>(null)
  const dest = useRef<number | null>(null)
  const stops = useRef<number[]>([])

  const [atStart, setAtStart] = useState(true)
  const [atEnd, setAtEnd] = useState(false)

  const prevFade = useMotionValue(DIM)
  const nextFade = useMotionValue(1)

  const mark = useCallback((from: number) => {
    setAtStart(step(stops.current, from, -1) === undefined)
    setAtEnd(step(stops.current, from, 1) === undefined)
  }, [])

  const paint = useCallback(
    (from: number) => {
      const el = trackRef.current
      if (!el) return
      const span = el.scrollWidth - el.clientWidth
      prevFade.set(fade(from, span))
      nextFade.set(fade(span - from, span))
    },
    [prevFade, nextFade],
  )

  const sync = useCallback(() => {
    const el = trackRef.current
    if (!el) return
    paint(el.scrollLeft)
    if (dest.current === null) mark(el.scrollLeft)
  }, [mark, paint])

  const refresh = useCallback(() => {
    const el = trackRef.current
    if (!el) return
    stops.current = measure(el)
    if (dest.current === null) {
      paint(el.scrollLeft)
      mark(el.scrollLeft)
    }
  }, [mark, paint])

  useEffect(() => {
    refresh()
    window.addEventListener("resize", refresh)
    return () => window.removeEventListener("resize", refresh)
  }, [refresh])

  useEffect(
    () => () => {
      glide.current?.stop()
      const el = trackRef.current
      if (el) el.style.scrollSnapType = ""
    },
    [],
  )

  const page = useCallback(
    (direction: 1 | -1) => {
      const el = trackRef.current
      if (!el) return

      stops.current = measure(el)
      const from = dest.current ?? el.scrollLeft
      const next = step(stops.current, from, direction)
      if (next === undefined) {
        mark(from)
        return
      }

      glide.current?.stop()
      dest.current = next
      mark(next) // hover/enabled state tracks where we're going, not where we are

      el.style.scrollSnapType = "none"

      glide.current = animate(el.scrollLeft, next, {
        ...GLIDE,
        onUpdate: (value) => {
          el.scrollLeft = value
          paint(value)
        },
        onComplete: () => {
          el.style.scrollSnapType = ""
          glide.current = null
          dest.current = null
          paint(el.scrollLeft)
          mark(el.scrollLeft)
        },
      })
    },
    [mark, paint],
  )

  const scrollPrev = useCallback(() => page(-1), [page])
  const scrollNext = useCallback(() => page(1), [page])

  return {
    trackRef,
    atStart,
    atEnd,
    sync,
    scrollPrev,
    scrollNext,
    prevFade,
    nextFade,
  }
}
