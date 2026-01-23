import voltage from "../assets/voltage.svg"
import { Link } from "react-router"
import Card from "../components/Card"
import maintainers from "../assets/maintainers.svg"
import { InfiniteMovingCards } from "../components/ui/infinite-moving-cards"
import { useEffect, useState } from "react"
import {
  DeviceInfo,
  fetchAllDevicesData,
} from "../components/services/VoltageDevices"
import { motion } from "motion/react"
import SpringModal from "../components/ui/SpringModal"
import Features from "../components/Features"
import DeviceCarousel from "../components/DeviceCarousel"
import { BrandCarousel } from "../components/ui/BrandCarousel"
import { AiOutlineArrowRight } from "react-icons/ai"
import { BiLogoTelegram } from "react-icons/bi"
import { SiSourceforge } from "react-icons/si"
import SF_Award from "../assets/award_sf.svg"

function Home() {
  const [latestDevices, setLatestDevices] = useState<DeviceInfo[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [codename, setcodename] = useState<string>("")

  useEffect(() => {
    const loadLatestDevices = async (): Promise<void> => {
      try {
        const data = await fetchAllDevicesData()
        setLatestDevices(data)
      } catch (err) {
        console.error("Failed to fetch latest devices:", err)
      }
    }
    loadLatestDevices()
  }, [])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }
  }, [isOpen])

  const handleButtonClick = (value: string) => {
    setcodename(value)
    setIsOpen(true)
    console.log("Button clicked with value:", value)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.2 } }}
    >
      <div
        className="mb-28 flex flex-col items-center justify-between gap-10"
      >
        <div className="flex justify-center items-center gap-2 w-fit cursor-pointer rounded-full px-6 py-3 transition-transform hover:scale-105 bg-radial from-[#34322D] from-0% to-[#141310]to-60% border-2 border-Voltage-100/20"><img src={SF_Award}></img>100,000+ Downloads</div>
        <div className="z-10 flex flex-col items-center space-y-8 text-center">
          <h2 className="text-Voltage-200 text-4xl font-medium">
            Welcome to the
          </h2>
          <img src={voltage} alt="voltage" className="h-12" />
          <h5>Powering Your Devices with Performance & Simplicity</h5>
          <Link to="/devices" className="">
            <button className="bg-Voltage-primary flex justify-center items-center gap-2 w-fit cursor-pointer rounded-full px-6 py-3 font-medium text-black transition-transform hover:scale-105">
              Get VoltageOS <SiSourceforge className="text-2xl" />
            </button>
          </Link>
        </div>
        <DeviceCarousel />
        <div className="text-center mx-6 text-neutral-500">We've got your back with all the big manufacturers brands!</div>
        <BrandCarousel />

      </div>


      <Features />

      <div className="mb-28 flex items-center gap-10 justify-center rounded-4xl px-12 py-14 md:px-24">
        <div className="flex flex-col space-y-5">
          <h2 className="text-Voltage-textPrimary">Join Us as a Maintainer!</h2>
          <h5 className="text-Voltage-textSecondary leading-8 xl:max-w-120">
            We’re always looking for passionate developers to help us grow
            VoltageOS. Whether you’re experienced or just starting out, we
            welcome contributions from all skill levels. Together, let’s build
            something amazing!
          </h5>
          <Link to="/maintainership" className="buttonSecondary flex justify-center items-center gap-3 sm:max-w-70">
            Apply for Maintainership <AiOutlineArrowRight />
          </Link>
        </div>
        <img
          src={maintainers}
          alt="device maintainer"
          className="hidden lg:block md:w-120 xl:w-150"
        />
      </div>

      <div className="mb-28 space-y-6">
        <div className="space-y-2 text-center">
          <h2 className="text-Voltage-textPrimary font-semibold">
            Latest Releases
          </h2>
          <h5>Check out the latest releases</h5>
        </div>
        <div className="flex flex-wrap justify-center gap-9">
          {latestDevices.slice(0, 3).map((deviceData, index) => (
            <Card
              key={index}
              deviceData={deviceData}
              onButtonClick={handleButtonClick}
            />
          ))}
        </div>
      </div>

      <div className="testimonials mb-28 space-y-4">
        <div className="space-y-2 text-center">
          <h2 className="text-Voltage-textPrimary font-semibold">
            Testimonials
          </h2>
          <h5>What Our Users Say About VoltageOS</h5>
        </div>

        <InfiniteMovingCards
          items={testimonials}
          direction="right"
          speed="slow"
        />

        <InfiniteMovingCards
          items={testimonials}
          direction="left"
          speed="slow"
        />
      </div>

      <div className="flex flex-col items-center justify-evenly gap-4 rounded-4xl p-12 text-center min-[960px]:mx-10 md:text-left">
        <h2 className="font-bold tracking-wide text-center">
          Support VoltageOS – Help Us Keep Innovating!
        </h2>
        <div className="flex flex-col w-max-200 space-y-4 text-center">
          <span>
            VoltageOS is a passion project built by enthusiasts like you. While we don’t push for donations, even a small contribution helps us cover server costs and keep the project alive. Every bit counts!
          </span>
          <span className="flex items-center justify-center flex-col sm:flex-row gap-6">
            {/* <Link to="https://t.me/voltageos"> */}
            {/*   <button className="flex items-center gap-2 text-Voltage-primary w-fit cursor-pointer rounded-full px-6 py-2 font-medium transition-transform hover:scale-105"> */}
            {/*     Donate Now <BiSolidDonateHeart className="text-xl" /> */}
            {/*   </button> */}
            {/* </Link> */}
            <Link to="https://t.me/voltageos">
              <button className="flex items-center gap-2 bg-Voltage-buttonPrimary text-black w-fit cursor-pointer rounded-full px-6 py-2 font-medium transition-transform hover:scale-105">
                Join Our Community <BiLogoTelegram />
              </button>
            </Link>
          </span>
        </div>
      </div>

      <SpringModal isOpen={isOpen} setIsOpen={setIsOpen} codename={codename} />
    </motion.div>
  )
}

const testimonials = [
  {
    quote:
      "I was skeptical at first, but VoltageOS turned my old phone into a beast! Highly recommend!",
    name: "Lorenzo",
    desc: "VoltageOS user since 2023",
  },
  {
    quote:
      "As someone who isn’t tech-savvy, I was worried about installing a custom ROM. But VoltageOS made the process so easy, and the results are amazing!",
    name: "William",
    desc: "VoltageOS user since 2021",
  },
  {
    quote:
      "VoltageOS completely changed my perception of custom ROMs. It’s stable, fast, and packed with features I didn’t even know I needed!",
    name: "Edgar",
    desc: "VoltageOS user since 2022",
  },
]

export default Home
