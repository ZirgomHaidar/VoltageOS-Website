import { Link } from "react-router"
import Card from "../components/Card"
import { useEffect, useState, ChangeEvent } from "react"
import {
  DeviceInfo,
  fetchAllDevicesData,
} from "../components/services/VoltageDevices"
import { motion } from "motion/react"
import SpringModal from "../components/ui/SpringModal"

function Devices() {
  const [devices, setDevices] = useState<DeviceInfo[]>([])
  const [filteredDevices, setFilteredDevices] = useState<DeviceInfo[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState<string>("")
  const [isOpen, setIsOpen] = useState(false)
  const [codename, setcodename] = useState<string>("")

  useEffect(() => {
    const loadDeviceData = async (): Promise<void> => {
      try {
        const data = await fetchAllDevicesData()
        setDevices(data)
        setFilteredDevices(data)
        setLoading(false)
      } catch {
        setError("Failed to fetch device list. Please try again later.")
        setLoading(false)
      }
    }

    loadDeviceData()
  }, [])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }
  }, [isOpen])

  // Handle search input changes
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const term = e.target.value.toLowerCase()
    setSearchTerm(term)

    if (term.trim() === "") {
      setFilteredDevices(devices)
    } else {
      const filtered = devices.filter(
        (device: DeviceInfo) =>
          device.device?.toLowerCase().includes(term) ||
          device.oem?.toLowerCase().includes(term) ||
          device.codename?.toLowerCase().includes(term),
      )
      setFilteredDevices(filtered)
    }
  }

  if (error) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="text-xl font-semibold text-red-500">{error}</div>
      </div>
    )
  }

  // Debug info to check values
  console.log("Total devices:", devices.length)
  console.log("Filtered devices:", filteredDevices.length)

  const handleButtonClick = (value: string) => {
    setcodename(value)
    setIsOpen(true)
    console.log("Button clicked with value:", value)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.2 } }}
    >
      <div className="mb-14 items-center space-y-2 text-center lg:mb-28">
        <h1 className="mb-8 font-bold tracking-wide">Devices</h1>
        <h3>Checkout list of devices here and download it for your device</h3>
        <h6>
          For more info join{" "}
          <Link to="https://t.me/voltageos">
            <b className="underline-offset-8 transition-all hover:text-xl hover:underline">
              VoltageOS Support
            </b>
          </Link>
        </h6>
        <input
          type="search"
          placeholder="Search by codename or device name...."
          value={searchTerm}
          onChange={handleSearchChange}
          className="focus:border-Voltage-borderComponent bg-Voltage-bgComponent mt-8 w-full rounded-full border-2 border-white/20 px-6 py-4 placeholder-gray-500 backdrop-blur-md transition-all duration-300 hover:border-white/30 focus:outline-none"
        />
      </div>

      {loading ? (
        <div className="flex h-64 items-center justify-center">
          <div className="text-xl font-semibold">Loading device data...</div>
        </div>
      ) : (
        <div className="flex items-center justify-center">
          <motion.div
            className="grid place-items-center gap-9 md:grid-cols-2 xl:grid-cols-3"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            {filteredDevices.map((deviceData, index) => (
              <Card
                key={index}
                deviceData={deviceData}
                onButtonClick={handleButtonClick}
              />
            ))}
          </motion.div>
        </div>
      )}

      {filteredDevices.length === 0 && (
        <div className="mt-8 text-center text-gray-600">
          {devices.length === 0
            ? "No device data available."
            : "No devices match your search."}
        </div>
      )}

      <div className="mt-10 text-center text-gray-500">
        Showing {filteredDevices.length} of {devices.length} devices
      </div>

      <SpringModal isOpen={isOpen} setIsOpen={setIsOpen} codename={codename} />
    </motion.div>
  )
}

export default Devices
