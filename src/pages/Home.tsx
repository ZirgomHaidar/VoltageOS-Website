import star from "../assets/star.svg"
import voltage from "../assets/voltage.svg"
import device from "../assets/device.svg"
import visual from "../assets/visual.svg"
import { Link } from "react-router"
import Card from "../components/Card"
import Counter from "../components/Counter"
import Carousel from "../components/Carousel"

function Home() {
  return (
    <>
      {/* <div className="flex items-center justify-center">
        <div className="relative flex items-center justify-center">
          <div className="circular-gradient absolute size-130 animate-pulse"></div>
          <img src={visual} alt="mobile visual" className="z-10" />
        </div>
        <div className="relative flex flex-col items-center justify-center">
          <div
            className="font-quantum text-Voltage-textPrimary/10 absolute z-0 text-center text-[400px] xl:text-[450px]"
            style={{
              letterSpacing: navigator.userAgent.includes("Firefox")
                ? "-90px"
                : "0px",
            }}
          >
            <Counte value={4.1} />
          </div>
          <div className="z-20 ml-6 space-y-6">
            <h2 className="text-4xl font-medium text-stone-400 uppercase">
              Welcome to the
              <img src={voltage} alt="voltage" className="mt-3 h-12" />
            </h2>
            <Link to="/devices" className="">
              <button className="bg-Voltage-primary w-fit cursor-pointer rounded-full px-6 py-2 font-medium text-black shadow-[4px_4px_0px_#464646] transition-all hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-none">
                Get voltage OS
              </button>
            </Link>
          </div>
        </div>
      </div> */}

      <div
        className="relative my-64 flex items-center justify-center"
        style={{ height: "calc(100vh - 42rem)" }}
      >
        <Counter
          className="font-quantum text-Voltage-textPrimary/10 absolute z-0 text-center text-[400px] xl:text-[450px]"
          value={4.1}
        />
        <div className="z-20 space-y-6">
          <h2 className="text-4xl font-medium text-stone-400 uppercase">
            Welcome to the
            <img src={voltage} alt="voltage" className="mt-3 h-12" />
          </h2>
          <Link to="/devices" className="">
            <button className="bg-Voltage-primary w-fit cursor-pointer rounded-full px-6 py-2 font-medium text-black shadow-[6px_6px_0px_#565656] transition-all hover:translate-x-[6px] hover:translate-y-[6px] hover:shadow-none">
              Get voltage OS
            </button>
          </Link>
        </div>
      </div>

      <div className="bg-Voltage-bgComponent mb-28 flex items-center justify-between rounded-4xl px-24 py-14">
        <div className="flex flex-col space-y-4">
          <h1 className="font-semibold">
            Experienced <br />
            maintainers for each <br />
            supported devices
          </h1>
          <div className="flex space-x-4">
            <Link to="/devices" className="buttonPrimary">
              View Devices
            </Link>
            <Link to="/maintainership" className="buttonSecondary">
              Apply for Maintainership
            </Link>
          </div>
        </div>
        <img src={device} alt="device maintainer" />
      </div>

      <div className="space-y-6">
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
    </>
  )
}

export default Home
