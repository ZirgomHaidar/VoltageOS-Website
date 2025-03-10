import { Link } from "react-router"
import barbet from "../assets/barbet.png"
import { MdOutlineFileDownload } from "react-icons/md"
import { LuNotepadText } from "react-icons/lu"

function Card() {
  return (
    <div className="bg-Voltage-bgComponent flex min-h-full w-[22rem] flex-col rounded-[32px] p-2 shadow-xl">
      <figure className="bg-Voltage-imgContainer flex items-center justify-center rounded-[22px] px-4 py-10">
        <img src={barbet} alt="Card Preview" className="" />
      </figure>
      <div className="flex flex-col px-4 py-4">
        <div className="space-y-2 pb-6">
          <h4 className="text-Voltage-textPrimary">Google Pixel 9 pro</h4>
          <h6>Caiman</h6>
        </div>
        <div className="text-Voltage-text space-y-2 text-base">
          <h6>
            Maintainer: <span className="text-Voltage-textInfo">whoever</span>
          </h6>
          <h6>
            Build date:{" "}
            <span className="text-Voltage-textInfo">06/02/2025</span>
          </h6>
        </div>
        <div className="*:text-Voltage-primary flex gap-4 pt-6 *:flex *:grow *:items-center *:justify-center *:gap-2 *:active:scale-95">
          <Link to="#" className="">
            <LuNotepadText /> Changelogs
          </Link>
          <Link to="/devices/download/:codename" className="">
            <MdOutlineFileDownload />
            Download
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Card
