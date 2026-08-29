import { Route, Routes } from "react-router"
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import Devices from "./pages/Devices"
import Maintainership from "./pages/Maintainership"

function App() {
  return (
    <>
      <Navbar />
      <main className="pt-[100px] sm:pt-[170px]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/devices" element={<Devices />} />
          <Route path="/devices/download/:codename" element={<Devices />} />
          <Route path="/maintainership" element={<Maintainership />} />
        </Routes>
      </main>
    </>
  )
}

export default App
