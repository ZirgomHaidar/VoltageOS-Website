import HeroBG from "../assets/HeroBG.png"
import voltage from "../assets/voltage.svg"
import visual from "../assets/visual.svg"
import { Link } from "react-router"
import Card from "../components/Card"
import maintainers from "../assets/maintainers.png"
import { InfiniteMovingCards } from "../components/ui/infinite-moving-cards"
import HorizontalScrollCarousel from "../components/Carousel"

function Home() {
  return (
    <>
      <div className="relative mb-28 flex items-center justify-between">
        <img
          src={HeroBG}
          alt="HeroBG"
          className="absolute z-0 hidden max-h-screen w-full object-cover lg:block"
        />
        <div className="z-10 flex items-center justify-center">
          <img src={visual} alt="mobile visual" className="h-150" />
        </div>
        <div className="z-10 ml-6 flex flex-col items-end space-y-6 text-end">
          <h2 className="text-Voltage-200 text-4xl font-medium uppercase">
            Welcome to the
          </h2>
          <img src={voltage} alt="voltage" className="h-12" />
          <h5>Powering Your Devices with Performance & Simplicity</h5>
          <Link to="/devices" className="">
            <button className="text-Voltage-primary border-Voltage-200 w-fit cursor-pointer rounded-full border-2 px-6 py-2 font-medium">
              Get voltage OS
            </button>
          </Link>
        </div>
      </div>

      <HorizontalScrollCarousel />

      <div className="bg-Voltage-bgComponent mb-28 flex items-center justify-between px-12 py-14 md:px-24">
        <div className="flex flex-col space-y-5">
          <h2 className="text-Voltage-textPrimary">Join Us as a Maintainer!</h2>
          <h5 className="text-Voltage-textSecondary max-w-150 leading-8">
            We’re always looking for passionate developers to help us grow
            VoltageOS. Whether you’re experienced or just starting out, we
            welcome contributions from all skill levels. Together, let’s build
            something amazing!
          </h5>
          <div className="flex flex-col gap-3 md:flex-row">
            <Link to="/devices" className="buttonPrimary">
              View Devices
            </Link>
            <Link to="/maintainership" className="buttonSecondary">
              Apply for Maintainership
            </Link>
          </div>
        </div>
        <img
          src={maintainers}
          alt="device maintainer"
          className="hidden md:block"
        />
      </div>

      <div className="mb-28 space-y-6">
        <div className="space-y-2 text-center">
          <h2 className="text-Voltage-textPrimary font-semibold">
            Latest added devices
          </h2>
          <h5>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Non
            voluptatem, nihil sit ducimus consequatur inventore veniam ipsum.
          </h5>
        </div>
        <div className="flex items-center justify-center">
          <div className="grid grid-cols-1 gap-9 md:grid-cols-2 xl:grid-cols-3">
            <Card />
            <Card />
            <Card />
          </div>
        </div>
      </div>

      <div className="mb-28 space-y-4">
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

      <div className="bg-Voltage-bgComponent flex flex-col items-center justify-evenly gap-4 rounded-4xl p-12 min-[960px]:mx-10 md:flex-row">
        <h2 className="max-w-100 font-bold tracking-wide">
          Support VoltageOS Help Us Keep Innovating!
        </h2>
        <div className="flex max-w-100 flex-col space-y-4">
          <span>
            VoltageOS is a passion project built by enthusiasts like you. While
            we don’t push for donations, even a small contribution helps us
            cover server costs and keep the project alive. Every bit counts!
          </span>
          <span className="">
            <Link to="#" className="">
              <button className="text-Voltage-primary w-fit cursor-pointer rounded-full px-6 py-2 font-medium">
                Donate Now
              </button>
            </Link>
            <Link to="#" className="">
              <button className="text-Voltage-primary border-Voltage-200 w-fit cursor-pointer rounded-full border-2 px-6 py-2 font-medium">
                Join Our Community
              </button>
            </Link>
          </span>
        </div>
      </div>
    </>
  )
}

const testimonials = [
  {
    quote:
      "I was skeptical at first, but VoltageOS turned my old phone into a beast! Highly recommend!",
    name: "Lorenzo",
    desc: "Voltage OS users since 2018",
  },
  {
    quote:
      "As someone who isn’t tech-savvy, I was worried about installing a custom ROM. But VoltageOS made the process so easy, and the results are amazing!",
    name: "William",
    desc: "Voltage OS users since 2021",
  },
  {
    quote:
      "VoltageOS completely changed my perception of custom ROMs. It’s stable, fast, and packed with features I didn’t even know I needed!",
    name: "Edgar",
    desc: "Voltage OS users since 2022",
  },
]

export default Home
