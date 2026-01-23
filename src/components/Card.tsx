import { Link } from "react-router"
import { MdVerified } from "react-icons/md"
import { HiMiniDocumentText, HiMiniArchiveBoxArrowDown } from "react-icons/hi2"
import { DeviceInfo } from "./services/VoltageDevices"

interface CardProps {
  onButtonClick: (value: string) => void
  deviceData: DeviceInfo
}

const Card: React.FC<CardProps> = ({ deviceData, onButtonClick }) => {
  const buildDate = new Date(deviceData.timestamp! * 1000)
    .toLocaleDateString("en-GB")
    .replace(/\//g, "/")

  return (
    <div className="bg-Voltage-bgComponent border-Voltage-borderComponent/50 flex w-full min-w-[368px] max-w-[22rem] flex-col rounded-[32px] border-2 sm:max-w-[24rem]">
      <figure className="bg-Voltage-imgContainer flex h-54 justify-center overflow-hidden rounded-t-[30px] px-4 pt-10">
        <img
          src={`https://github.com/VoltageOS/Website-Resource/blob/master/${deviceData.codename}.png?raw=true`}
          alt={`${deviceData.oem} ${deviceData.device}`}
          className="h-52 object-contain"
        />
      </figure>

      <div className="flex flex-1 flex-col p-6">
        <div className="mb-6 space-y-1">
          <div className="flex items-center gap-2">
            <h3 className="text-white text-2xl font-bold sm:text-3xl">
              {deviceData.oem} {deviceData.device}
            </h3>
            <MdVerified className="text-Voltage-primary shrink-0 text-2xl" />
          </div>
          <h5 className="text-Voltage-primary font-medium uppercase tracking-wide">
            {deviceData.codename}
          </h5>
        </div>

        <div className="mb-8 space-y-2 text-base sm:text-lg">
          <p className="text-white font-medium">
            Maintainer:{" "}
            <span className="text-Voltage-textInfo font-normal">
              {deviceData.maintainer}
            </span>
          </p>
          <p className="text-white font-medium">
            Build Date:{" "}
            <span className="text-Voltage-textInfo font-normal">
              {buildDate}
            </span>
          </p>
        </div>

        <div className="mt-auto flex items-center justify-between gap-2">
          <button
            onClick={() => onButtonClick(deviceData.codename)}
            className="text-Voltage-primary flex cursor-pointer items-center gap-1 text-base font-semibold transition-transform hover:scale-105 active:scale-95 sm:gap-2 sm:text-lg"
          >
            Changelogs <HiMiniDocumentText className="text-xl sm:text-2xl" />
          </button>
          <Link
            to={`/devices/download/${deviceData.codename}`}
            className="bg-Voltage-primary flex items-center gap-1 rounded-full px-4 py-2 text-base font-bold text-black transition-transform hover:scale-105 active:scale-95 sm:gap-2 sm:px-6 sm:py-3 sm:text-lg"
          >
            Download <HiMiniArchiveBoxArrowDown className="text-xl sm:text-2xl" />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Card
