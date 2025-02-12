import voltage from "../assets/voltage.svg"
import github from "../assets/githubicon.svg"
import telegram from "../assets/telegramico.svg"

function Footer() {
  return (
    <footer className="bg-Voltage-bgComponent mx-16 my-8 flex items-center justify-between rounded-4xl p-14">
      <div className="space-y-4">
        <img src={voltage} alt="voltage with Quantum Font" className="" />
        <h6>© 2021 - 2024 VoltageOS</h6>
        <span className="flex space-x-4">
          <img src={github} alt="github" className="size-8" />
          <img src={telegram} alt="github" className="size-8" />
        </span>
      </div>
      <div className="">
        <div className="items-center space-y-2 *:flex *:items-center *:gap-10">
          <span className="">
            <h6>VoltageOS Announcement</h6>
            <Button />
          </span>
          <span className="justify-between">
            <h6>VoltageOS Support</h6>
            <Button />
          </span>
        </div>
      </div>
    </footer>
  )
}

export default Footer

const Button = () => {
  return (
    <button className="bg-Voltage-buttonPrimary text-Voltage-textPrimary rounded-xl px-4 py-2 uppercase">
      Join
    </button>
  )
}
