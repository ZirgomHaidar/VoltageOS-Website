import { lazy, Suspense, useEffect } from "react"
import Lenis from "lenis"
import { MotionConfig } from "motion/react"
import { Route, Routes } from "react-router"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import ScrollToTop from "./components/ScrollToTop"
import Home from "./pages/Home"

const Devices = lazy(() => import("./pages/Devices"))
const Maintainership = lazy(() => import("./pages/Maintainership"))
const Privacy = lazy(() => import("./pages/Privacy"))

function App() {
  useEffect(() => {
    // Touch/mobile devices have native 120Hz momentum scrolling; bypassing
    // Lenis saves battery, CPU, and prevents frame drops on mobile.
    if (window.matchMedia("(pointer: coarse)").matches) return

    const lenis = new Lenis({
      autoRaf: true,
      lerp: 0.11,
      anchors: true,
      respectReducedMotion: true,
    })

    return () => lenis.destroy()
  }, [])

  return (
    <MotionConfig reducedMotion="never">
      <ScrollToTop />
      <Navbar />
      <Suspense fallback={<div className="min-h-screen" />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/devices" element={<Devices />} />
          <Route path="/maintainership" element={<Maintainership />} />
          <Route path="/privacy" element={<Privacy />} />
        </Routes>
      </Suspense>
      <Footer />
    </MotionConfig>
  )
}

export default App
