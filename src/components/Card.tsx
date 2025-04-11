import { Link } from "react-router"
import { MdOutlineFileDownload } from "react-icons/md"
import { LuNotepadText } from "react-icons/lu"
import { DeviceInfo } from "./services/VoltageDevices"
import { motion } from "motion/react"

interface CardProps {
  onButtonClick: (value: string) => void
  deviceData: DeviceInfo
}

const Card: React.FC<CardProps> = ({ deviceData, onButtonClick }) => {
  return (
    <div className="bg-Voltage-bgComponent border-Voltage-borderComponent/50 flex min-h-full flex-col rounded-[32px] border-2 p-2 min-[420px]:w-[22rem] md:w-[22rem]">
      <figure className="bg-Voltage-imgContainer flex items-center justify-center rounded-[22px] px-4 py-10">
        <img
          src={`https://github.com/VoltageOS/Website-Resource/blob/master/${deviceData.codename}.png?raw=true`}
          alt="Device Preview"
          className="h-52 max-w-[20rem] object-cover"
        />
      </figure>
      <div className="flex grow flex-col justify-between px-4 py-4">
        <div className="space-y-2 pb-6">
          <h4 className="text-Voltage-textPrimary w-[16rem]">
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
          className="*:text-Voltage-primary flex gap-4 pt-6 *:flex *:grow *:cursor-pointer *:items-center *:justify-center *:gap-2 *:transition-transform *:hover:scale-105 *:active:scale-95"
          whileInView={
            window.innerWidth < 768
              ? { scale: 1.05, transition: { delay: 0.3 } }
              : {}
          }
        >
          <button onClick={() => onButtonClick(deviceData.codename)}>
            <LuNotepadText /> Changelogs
          </button>
          <Link to={`/devices/download/${deviceData.codename}`}>
            <MdOutlineFileDownload />
            Download
          </Link>
        </motion.div>
      </div>
    </div>
  )
}

export default Card
