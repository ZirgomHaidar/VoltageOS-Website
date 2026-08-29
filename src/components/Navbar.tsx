import { NavLink } from "react-router"
import { cn } from "../lib/utils"

const navigation = [
  { name: "Devices", href: "/devices" },
  { name: "Maintainership", href: "/maintainership" },
]

const Navbar = () => {
  return (
    <nav className="fixed inset-x-0 top-4 z-50 px-4 sm:top-[74px]">
      <div className="bg-nav-surface rounded-nav mx-auto flex h-[64px] w-full max-w-[852px] items-center justify-between pr-3 pl-4 sm:h-[78.966px] sm:pr-[24px] sm:pl-[28.26px]">
        <NavLink
          to="/"
          className="text-nav-text-active text-[15px] leading-[1.2] font-bold tracking-[-0.03em] whitespace-nowrap sm:text-[16.629px]"
        >
          Voltage OS
        </NavLink>

        <div className="flex items-center gap-[5px]">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive }) =>
                cn(
                  "inline-flex h-[34px] items-center rounded-full px-3 text-[14px] leading-[1.2] font-medium tracking-[-0.03em] whitespace-nowrap transition-colors sm:h-[38px] sm:px-4 sm:text-[16.629px]",
                  isActive
                    ? "bg-nav-pill text-nav-text-active"
                    : "text-nav-text hover:text-nav-text-active",
                )
              }
            >
              {item.name}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
