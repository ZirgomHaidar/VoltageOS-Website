import { Route, Routes } from "react-router"
import Home from "./pages/Home"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import Devices from "./pages/Devices"
import Maintainership from "./pages/Maintainership"
import Download from "./pages/Download"

function App() {
  return (
    <>
      <Navbar />
      <main
        className={`mx-4 min-h-screen md:my-6 lg:my-8 xl:my-16 ${
          navigator.userAgent.includes("Firefox")
            ? "xl:mx-20"
            : "xl:mx-10 2xl:mx-64"
        }`}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/devices" element={<Devices />} />
          <Route path="/devices/download/:codename" element={<Download />} />
          <Route path="/maintainership" element={<Maintainership />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}

export default App
