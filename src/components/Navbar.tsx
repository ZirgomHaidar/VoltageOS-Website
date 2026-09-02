import { motion } from "motion/react"
import { NavLink } from "react-router"
import { cn } from "../lib/utils"
import { EASE } from "../lib/motion"

const navigation = [
  { name: "Devices", href: "/devices" },
  { name: "Maintainership", href: "/maintainership" },
]

const Navbar = () => {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.2, ease: EASE }}
      className="fixed inset-x-0 top-4 z-50 px-4 sm:top-[74px]"
    >
      <div className="bg-surface rounded-surface font-inter mx-auto flex h-[64px] w-full max-w-[852px] items-center justify-between pr-3 pl-4 backdrop-blur-[10px] sm:h-[78.966px] sm:pr-[24px] sm:pl-[28.26px]">
        <NavLink
          to="/"
          className="text-ink text-[15px] font-bold whitespace-nowrap sm:text-[length:var(--text-body-sm)]"
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
                  "inline-flex h-[34px] items-center rounded-full px-3 text-[14px] font-medium whitespace-nowrap transition-colors sm:h-[38px] sm:px-4 sm:text-[length:var(--text-body-sm)]",
                  isActive
                    ? "bg-surface-active text-ink"
                    : "text-ink-nav hover:text-ink",
                )
              }
            >
              {item.name}
            </NavLink>
          ))}
        </div>
      </div>
    </motion.nav>
  )
}

export default Navbar
