import { Link } from "react-router"

function Maintainership() {
  return (
    <>
      <div className="mb-28 items-center space-y-2 text-center">
        <h1 style={{ fontSize: 70 }} className="mb-8 font-bold">
          Maintainership
        </h1>
        <h3>Can"t Find Your Device? Apply for your device and Join us</h3>
        <h6>
          Fore more info join{" "}
          <Link to="#">
            <b>VoltageOS Support</b>
          </Link>
        </h6>
      </div>

      <div className="bg-Voltage-bgComponent text-Voltage-textSecondary border-Voltage-borderComponent mx-8 rounded-4xl border-3 px-10 py-5">
        <h2>Basic criteria for application are:</h2>
        <ul className="mt-6 list-inside space-y-4 text-xl">
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
