import { Link, useLocation, useParams } from "react-router"
import { MdArrowOutward } from "react-icons/md"
import { useEffect, useState } from "react"
import {
  DeviceInfo,
  fetchDeviceData,
} from "../components/services/VoltageDevices"
import { motion } from "motion/react"

function Download() {
  const [data, setData] = useState<DeviceInfo>()
  const location = useLocation()
  const params = useParams()

  useEffect(() => {
    window.scrollTo(0, 0)
    const loadDeviceData = async (): Promise<void> => {
      try {
        const deviceData = await fetchDeviceData(params.codename as string)
        setData(deviceData)
      } catch {
        console.error("Failed to fetch device list. Please try again later.")
      }
    }
    loadDeviceData()
  }, [params.codename, location])
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.2 } }}
    >
      <div className="bg-Voltage-bgComponent border-Voltage-borderComponent flex justify-between gap-12 rounded-4xl border-4 p-12 max-[830px]:flex-col">
        {/* left */}
        <img
          src={`https://github.com/VoltageOS/Website-Resource/blob/master/${data?.codename}.png?raw=true`}
          alt="device picture"
          className="hidden max-w-72 object-contain min-[1180px]:block"
        />
        {/* middle */}
        <div className="flex grow flex-col items-start justify-between space-y-8 py-2">
          <div className="space-y-6 **:[&_h5]:text-[#969696]">
            <div className="">
              <h5>Device</h5>
              <h2>{data?.oem + " " + data?.device}</h2>
            </div>
            <div className="">
              <h5>Codename</h5>
              <h2>{data?.codename}</h2>
            </div>
            <div className="">
              <h5>Maintainer</h5>
              <h2>{data?.maintainer}</h2>
            </div>
            <div className="">
              <h5>Version</h5>
              <h2>{data?.version}</h2>
            </div>
            <div className="">
              <h5>Size</h5>
              <h2>{((data?.size || 0) / 1024 / 1024 / 1024).toFixed(2)} GB</h2>
            </div>
          </div>
        </div>
        {/* right */}
        <div className="flex flex-wrap justify-center gap-4 min-[830px]:flex-col">
          <BuildCard
            href={data?.download || "404"}
            version={Number(data?.version) || 0}
            buildDate={data?.timestamp || 0}
          />
          <BuildCard
            href={`https://sourceforge.net/projects/voltage-os/files/${data?.codename}/`}
            prev={true}
          />
        </div>
      </div>
    </motion.div>
  )
}

export default Download

const BuildCard = ({
  href,
  prev,
  version,
  buildDate,
}: {
  href: string
  prev?: boolean
  version?: number
  buildDate?: number
}) => {
  return (
    <motion.div
      className="w-full rounded-3xl bg-[#1E1D18] p-4 min-[643px]:size-60"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Link to={href} className="flex flex-col">
        <motion.div
          className="flex size-10 items-center justify-center self-end rounded-full border-3"
          initial={{ rotate: 0 }}
          whileInView={{ rotate: 45, transition: { delay: 1 } }}
        >
          <MdArrowOutward className="size-6" />
        </motion.div>
        <div className="mt-6 [&_p]:tracking-wide">
          <h3 className="mb-6">{prev ? "Previous builds" : "Latest Build"}</h3>
          {!prev ? (
            <div className="">
              <p>Latest Version: {version}</p>
              <p>
                Build Date:{" "}
                {new Date((buildDate || 0) * 1000)
                  .toISOString()
                  .toString()
                  .slice(0, 10)}
              </p>
            </div>
          ) : (
            "Check in SourceForge"
          )}
        </div>
      </Link>
    </motion.div>
  )
}
