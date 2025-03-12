import { Link } from "react-router"

function Maintainership() {
  return (
    <>
      <div className="mb-14 items-center space-y-2 text-center lg:mb-28">
        <h1 className="mb-8 font-bold tracking-wide">Maintainership</h1>
        <h3>Can"t Find Your Device? Apply for your device and Join us</h3>
        <h6>
          Fore more info join{" "}
          <Link to="#">
            <b>VoltageOS Support</b>
          </Link>
        </h6>
      </div>

      <div className="bg-Voltage-bgComponent text-Voltage-textSecondary border-Voltage-borderComponent rounded-4xl border-3 px-10 py-5 lg:mx-8">
        <h2>Basic criteria for application are:</h2>
        <ul className="markerstyle mt-6 list-inside space-y-4 lg:text-xl">
          <li>
            Applicants are permitted to maintain only one custom ROM, whether it
            is official or unofficial, in conjunction with VoltageOS.
          </li>
          <li>
            A fundamental understanding of Git is essential for all applicants.
          </li>
          <li>
            Candidates should possess the ability to independently troubleshoot
            and resolve device-related issues and bugs that may arise.
          </li>
          <li>
            It is required that applicants own the specific device for which
            they are submitting their application.
          </li>
          <li>
            Additionally, applicants must have maintained an unofficial
            VoltageOS build for a minimum of 2 months, ensuring that regular
            monthly updates are provided throughout that period.
          </li>
        </ul>
        <div className="mt-6 flex">
          <Link to="#" className="buttonPrimary grow py-16 text-center text-xl">
            Maintainer Form
          </Link>
        </div>
      </div>
    </>
  )
}

export default Maintainership
