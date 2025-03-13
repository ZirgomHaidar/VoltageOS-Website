import { useState } from "react"
import { Link, useLocation } from "react-router"
import { IoMdClose } from "react-icons/io"
import { HiMenuAlt3 } from "react-icons/hi"
import voltage from "../assets/voltage.svg"

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()

  const navigation = [
    { name: "Devices", href: "/devices" },
    { name: "Maintainership", href: "/maintainership" },
  ]

  const isActive = (path: string) => location.pathname === path

  return (
    <nav className="z-50 lg:my-4">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo Section */}
          <Link
            to="/"
            className="flex items-center transition-opacity duration-200 hover:opacity-80"
            aria-label="Home"
            onClick={() => setIsOpen(false)}
          >
            <img src={voltage} alt="VoltageOS" className="w-40 lg:w-fit" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center space-x-4 md:flex">
            {navigation.map((item) => ( 
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center rounded-full px-4 py-2 text-xl transition-all duration-200 ${
                  isActive(item.href)
                    ? "bg-Voltage-buttonPrimary text-black"
                    : "text-Voltage-textPrimary hover:bg-Voltage-buttonPrimary hover:text-black"
                } `}
                aria-current={isActive(item.href) ? "page" : undefined}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="hover:bg-Voltage-borderComponent inline-flex items-center justify-center rounded-md p-2 text-gray-700 focus:outline-none focus:ring-inset md:hidden"
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            aria-label="Main menu"
          >
            <span className="sr-only">Open main menu</span>
            {isOpen ? (
              <IoMdClose
                className="fill-Voltage-primary block size-8"
                aria-hidden="true"
              />
            ) : (
              <HiMenuAlt3
                className="fill-Voltage-primary block size-8"
                aria-hidden="true"
              />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`transition-all duration-300 ease-in-out md:hidden ${
          isOpen ? "max-h-64 opacity-100" : "max-h-0 overflow-hidden opacity-0"
        }`}
        id="mobile-menu"
      >
        <div className="space-y-1 px-2 pt-2 pb-3">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              onClick={() => setIsOpen(false)}
              className={`flex w-full items-center rounded-lg px-3 py-2 text-base transition-all duration-200 ${
                isActive(item.href)
                  ? "bg-Voltage-buttonPrimary text-black"
                  : "text-Voltage-textPrimary hover:bg-Voltage-buttonPrimary hover:text-black"
              } `}
              aria-current={isActive(item.href) ? "page" : undefined}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
