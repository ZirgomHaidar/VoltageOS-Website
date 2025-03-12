import { Link } from "react-router"
import Card from "../components/Card"

function Devices() {
  return (
    <>
      <div className="mb-14 items-center space-y-2 text-center lg:mb-28">
        <h1 className="mb-8 font-bold tracking-wide">Devices</h1>
        <h3>Checkout list of devices here and download it for your device</h3>
        <h6>
          Fore more info join{" "}
          <Link to="#">
            <b>VoltageOS Support</b>
          </Link>
        </h6>
        <input
          type="search"
          placeholder="Search by codename or device name...."
          className="focus:border-Voltage-borderComponent bg-Voltage-bgComponent mt-8 w-full rounded-full border-2 border-white/20 px-6 py-4 placeholder-gray-500 backdrop-blur-md transition-all duration-300 hover:border-white/30 focus:outline-none"
        />
      </div>

      <div className="flex items-center justify-center">
        <div className="grid place-items-center gap-9 md:grid-cols-2 xl:grid-cols-3">
          {[...Array(9)].map((_, index) => (
            <Card key={index} />
          ))}
        </div>
      </div>
    </>
  )
}

export default Devices
