import { Link } from "react-router"
import { motion } from "motion/react"

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
    },
  },
}

const item = {
  hidden: { opacity: 0 },
  show: { opacity: 1 },
}

function Maintainership() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.2 } }}
    >
      <div className="mb-14 items-center space-y-2 text-center lg:mb-28">
        <h1 className="mb-8 font-bold tracking-wide">Maintainership</h1>
        <h3>Can"t Find Your Device? Apply for your device and Join us</h3>
        <h6>
          Fore more info join{" "}
          <Link to="https://t.me/VoltageOSSupport">
            <b className="underline-offset-8 transition-all hover:text-xl hover:underline">
              VoltageOS Support
            </b>
          </Link>
        </h6>
      </div>

      <div className="bg-Voltage-bgComponent text-Voltage-textSecondary border-Voltage-borderComponent rounded-4xl border-3 px-10 py-5 lg:mx-8">
        <h2>Basic criteria for application are:</h2>
        <motion.ul
          className="markerstyle mt-6 list-inside space-y-4 lg:text-xl"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {Rules.map((Rule, index) => (
            <motion.li key={index} variants={item}>
              {Rule}
            </motion.li>
          ))}
        </motion.ul>
        <div className="mt-6 flex">
          <Link
            to="https://forms.gle/eSNQrRzi2SrKqV9Y7"
            className="grow text-center text-xl"
          >
            <motion.button
              className="buttonPrimary w-full cursor-pointer py-16"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.96 }}
            >
              Maintainers Form
            </motion.button>
          </Link>
        </div>
      </div>
    </motion.div>
  )
}

export default Maintainership

const Rules = [
  "Applicants are permitted to maintain only one custom ROM, whether it is official or unofficial, in conjunction with VoltageOS.",
  "A fundamental understanding of Git is essential for all applicants.",
  "Candidates should possess the ability to independently troubleshoot and resolve device-related issues and bugs that may arise.",
  "It is required that applicants own the specific device for which they are submitting their application.",
  "Additionally, applicants must have maintained an unofficial VoltageOS build for a minimum of 2 months, ensuring that regular monthly updates are provided throughout that period.",
]
