import { Route, Routes, useLocation } from "react-router"
import Home from "./pages/Home"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import Devices from "./pages/Devices"
import Maintainership from "./pages/Maintainership"
import Download from "./pages/Download"
import { AnimatePresence } from "motion/react"

function App() {
  const location = useLocation()
  return (
    <>
      <Navbar />
      <main
        className={`mx-4 my-10 min-h-screen md:my-6 lg:my-8 xl:my-16 ${
          navigator.userAgent.includes("Firefox")
            ? "xl:mx-20"
            : "xl:mx-10 2xl:mx-64"
        }`}
      >
        <AnimatePresence>
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/devices" element={<Devices />} />
            <Route path="/devices/download/:codename" element={<Download />} />
            <Route path="/maintainership" element={<Maintainership />} />
          </Routes>
        </AnimatePresence>
      </main>
      <Footer />
    </>
  )
}

export default App
