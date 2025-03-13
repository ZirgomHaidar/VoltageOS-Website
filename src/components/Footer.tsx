import voltage from "../assets/voltage.svg"
import github from "../assets/githubicon.svg"
import telegram from "../assets/telegramico.svg"
import { Link } from "react-router"

function Footer() {
  return (
    <footer className="bg-Voltage-bgComponent mx-4 my-8 flex flex-col items-center justify-between gap-4 rounded-4xl p-8 md:flex-row lg:mx-10 lg:p-14">
      <div className="space-y-4">
        <img src={voltage} alt="voltage with Quantum Font" className="" />
        <h6>© 2021 - 2024 VoltageOS</h6>
        <span className="flex justify-center space-x-4 **:transition-transform **:hover:scale-105 **:focus:scale-90 md:justify-start">
          <Link to="https://github.com/VoltageOS">
            <img src={github} alt="github" className="size-8" />
          </Link>
          <Link to="https://t.me/voltageos">
            <img src={telegram} alt="github" className="size-8" />
          </Link>
        </span>
      </div>
      <div className="">
        <div className="items-center space-y-2 *:flex *:items-center *:gap-10">
          <span className="">
            <h6>VoltageOS Announcement</h6>
            <Button href="https://t.me/voltageosannouncements" />
          </span>
          <span className="justify-between">
            <h6>VoltageOS Support</h6>
            <Button href="https://t.me/voltageos" />
          </span>
        </div>
      </div>
    </footer>
  )
}

export default Footer

const Button = ({ href }: { href: string }) => {
  return (
    <Link
      to={href}
      className="bg-Voltage-buttonPrimary rounded-xl px-4 py-2 text-black uppercase transition-transform hover:scale-105 focus:scale-95"
    >
      Join
    </Link>
  )
}
