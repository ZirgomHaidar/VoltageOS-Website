import { Link } from "react-router"
import { MdOutlineFileDownload } from "react-icons/md"
import { LuNotepadText } from "react-icons/lu"
import { DeviceInfo } from "./services/VoltageDevices"
import { motion } from "motion/react"

function Card({ deviceData }: { deviceData: DeviceInfo }) {
  return (
    <div className="bg-Voltage-bgComponent flex min-h-full w-[22rem] flex-col rounded-[32px] p-2 shadow-xl">
      <figure className="bg-Voltage-imgContainer flex items-center justify-center rounded-[22px] px-4 py-10">
        <img
          src={`https://github.com/VoltageOS/Website-Resource/blob/master/${deviceData.codename}.png?raw=true`}
          alt="Device Preview"
          className="h-52 object-cover"
        />
      </figure>
      <div className="flex grow flex-col justify-evenly px-4 py-4">
        <div className="space-y-2 pb-6">
          <h4 className="text-Voltage-textPrimary">
            {deviceData.oem + " " + deviceData.device}
          </h4>
          <h6>{deviceData.codename}</h6>
        </div>
        <div className="text-Voltage-text space-y-2 text-base">
          <h6>
            Version:{" "}
            <span className="text-Voltage-textInfo">{deviceData.version}</span>
          </h6>
          <h6>
            Maintainer:{" "}
            <span className="text-Voltage-textInfo">
              {deviceData.maintainer}
            </span>
          </h6>
          <h6>
            Build date:{" "}
            <span className="text-Voltage-textInfo">
              {new Date(deviceData.timestamp! * 1000).toString().slice(4, 24)}
            </span>
          </h6>
        </div>
        <motion.div
          className="*:text-Voltage-primary flex gap-4 pt-6 *:flex *:grow *:items-center *:justify-center *:gap-2 *:transition-transform *:hover:scale-105 *:active:scale-95"
          whileInView={
            window.innerWidth < 768
              ? { scale: 1.05, transition: { delay: 0.3 } }
              : {}
          }
        >
          <Link
            to={`https://raw.githubusercontent.com/VoltageOS/android_vendor_voltageota/refs/heads/15-qpr1/changelog_${deviceData.codename}.txt`}
            className=""
          >
            <LuNotepadText /> Changelogs
          </Link>
          <Link to={`/devices/download/:${deviceData.codename}`} className="">
            <MdOutlineFileDownload />
            Download
          </Link>
        </motion.div>
      </div>
    </div>
  )
}

export default Card
