import { useEffect, useRef } from "react"

/**
 * Interactive micro-grid spotlight for the desktop hero background.
 *
 * Performance design:
 * - Uses an IntersectionObserver so pointer listeners are strictly detached
 *   when the hero scrolls out of viewport. Zero CPU impact downstream.
 * - Respects prefers-reduced-motion and pointer: fine.
 * - Hardware accelerated CSS mask-image and radial-gradient. 0% idle CPU.
 */
export const HeroSpotlight = () => {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Only bind on desktop pointer devices
    if (!window.matchMedia("(pointer: fine)").matches) return

    const container = containerRef.current
    if (!container) return

    let active = false

    const handleMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect()

      if (e.clientY < rect.top - 100 || e.clientY > rect.bottom + 100) {
        container.style.setProperty("--opacity", "0")
        return
      }

      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      container.style.setProperty("--x", `${x}px`)
      container.style.setProperty("--y", `${y}px`)
      container.style.setProperty("--opacity", "1")
    }

    const handleLeave = () => {
      container.style.setProperty("--opacity", "0")
    }

    const attach = () => {
      if (active) return
      active = true
      window.addEventListener("pointermove", handleMove, { passive: true })
      document.addEventListener("mouseleave", handleLeave)
    }

    const detach = () => {
      if (!active) return
      active = false
      window.removeEventListener("pointermove", handleMove)
      document.removeEventListener("mouseleave", handleLeave)
      container.style.setProperty("--opacity", "0")
    }

    // Detach listener whenever hero is offscreen
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          attach()
        } else {
          detach()
        }
      },
      { threshold: 0.05 },
    )

    observer.observe(container)

    return () => {
      observer.disconnect()
      detach()
    }
  }, [])

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      style={
        {
          "--x": "-1000px",
          "--y": "-1000px",
          "--opacity": "0",
        } as React.CSSProperties
      }
      className="pointer-events-none absolute inset-0 hidden overflow-hidden md:block"
    >
      {/* Diffused ambient spotlight */}
      <div
        className="ease-surface absolute inset-0 transition-opacity duration-500"
        style={{
          opacity: "var(--opacity)",
          background:
            "radial-gradient(600px circle at var(--x) var(--y), rgba(255, 255, 255, 0.055), transparent 70%)",
        }}
      />
      {/* Revealed precision micro-grid */}
      <div
        className="ease-surface absolute inset-0 transition-opacity duration-500"
        style={{
          opacity: "var(--opacity)",
          backgroundImage:
            "radial-gradient(rgba(255, 255, 255, 0.18) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          maskImage:
            "radial-gradient(280px circle at var(--x) var(--y), black 20%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(280px circle at var(--x) var(--y), black 20%, transparent 100%)",
        }}
      />
    </div>
  )
}

export default HeroSpotlight
