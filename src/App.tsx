import { Route, Routes } from "react-router"
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import Devices from "./pages/Devices"
import Maintainership from "./pages/Maintainership"

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/devices" element={<Devices />} />
        <Route path="/devices/download/:codename" element={<Devices />} />
        <Route path="/maintainership" element={<Maintainership />} />
      </Routes>
    </>
  )
}

export default App
