import { Link } from "react-router"
import barbet from "../assets/barbet.png"

function Card() {
  return (
    <div className="bg-Voltage-bgComponent flex min-h-full w-[22rem] flex-col rounded-2xl p-7 shadow-xl">
      <figure className="flex items-center justify-center rounded-2xl pb-8">
        <img src={barbet} alt="Card Preview" className="rounded-t-2xl" />
      </figure>
      <div className="flex flex-col">
        <div className="pb-6">
          <h4 className="text-Voltage-textPrimary">Google Pixel 9 pro</h4>
          <h6>Caiman</h6>
        </div>
        <div className="text-Voltage-text text-base">
          <h6>Maintainer: whoever</h6>
          <h6>Build date: 06/2/2024</h6>
        </div>
        <div className="flex gap-4 pt-6">
          <Link to="#" className="buttonSecondary grow active:scale-95">
            Changelog
          </Link>
          <Link
            to="/device/download/:codename"
            className="buttonPrimary grow active:scale-95"
          >
            Get Now
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Card
