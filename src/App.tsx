import { useEffect } from "react"
import Lenis from "lenis"
import { MotionConfig } from "motion/react"
import { Route, Routes } from "react-router"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import Home from "./pages/Home"
import Devices from "./pages/Devices"
import Maintainership from "./pages/Maintainership"

function App() {
  useEffect(() => {
    const lenis = new Lenis({
      autoRaf: true,
      lerp: 0.11,
      anchors: true,
      // Smooth-scroll hijacking is a vestibular trigger, so the visitor's OS
      // setting wins. Lenis reads its media query per frame rather than once at
      // construction, so toggling the preference mid-session takes effect.
      respectReducedMotion: true,
    })

    return () => lenis.destroy()
  }, [])

  return (
    // motion does not consult prefers-reduced-motion unless asked, and every
    // variant in lib/motion.ts animates y or scale. "user" drops those
    // transforms while leaving opacity fades, which is the accessible reading
    // of the design rather than an unanimated one — and it covers all 14
    // animated components without touching them.
    <MotionConfig reducedMotion="user">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/devices" element={<Devices />} />
        <Route path="/maintainership" element={<Maintainership />} />
      </Routes>
      <Footer />
    </MotionConfig>
  )
}

export default App
