import { NavLink, Link } from "react-router"
import voltage from "../assets/voltage.svg"

function Navbar() {
  return (
    <nav className="z-20 flex items-center justify-between px-20 py-10">
      <Link to="/">
        <img src={voltage} alt="voltage with Quantum Font" className="" />
      </Link>
      <span className="flex space-x-4 text-xl capitalize">
        <NavLink
          to="/devices"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          devices
        </NavLink>
        <NavLink
          to="/maintainership"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          maintainership
        </NavLink>
      </span>
    </nav>
  )
}

export default Navbar
