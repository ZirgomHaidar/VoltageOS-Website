import { Link, useLocation } from "react-router"
import { FaDonate } from "react-icons/fa"
import { FaTelegram } from "react-icons/fa6"
import { IoLogoGithub } from "react-icons/io"
import { MdArrowOutward } from "react-icons/md"
import { useEffect } from "react"

function Download() {
  const location = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location])
  return (
    <>
      <div className="bg-Voltage-bgComponent flex justify-between gap-12 rounded-4xl p-12">
        {/* left */}
        <div className="border-Voltage-borderComponent w-60 rounded-3xl border-3 bg-black"></div>
        {/* middle */}
        <div className="flex grow flex-col items-start justify-between space-y-8 py-2">
          <div className="">
            <div className="bg-Voltage-primary w-fit rounded-full px-4 py-2 text-black">
              Android 15
            </div>
          </div>
          <div className="space-y-6 **:[&_h5]:text-[#969696]">
            <div className="">
              <h5>Device</h5>
              <h2>Pixel 9 Pro</h2>
            </div>
            <div className="">
              <h5>Codename</h5>
              <h2>Caiman</h2>
            </div>
            <div className="">
              <h5>Build Date</h5>
              <h2>12/02/25</h2>
            </div>
          </div>
          <div className="bg-Voltage-borderComponent inline-flex w-full items-center justify-between gap-4 rounded-2xl p-4">
            <img src="" alt="MP" className="size-14 rounded-full bg-white" />
            <h3>Maintainers Name</h3>
            <div className="inline-flex gap-2">
              <Link to="#">
                <FaTelegram className="size-12" />
              </Link>
              <Link to="#">
                <IoLogoGithub className="size-12" />
              </Link>
              <Link to="#">
                <FaDonate className="size-12" />
              </Link>
            </div>
          </div>
        </div>
        {/* right */}
        <div className="flex flex-col justify-center gap-4">
          <BuildCard />
          <BuildCard />
        </div>
      </div>
    </>
  )
}

export default Download

// add props to the BuildCard component
const BuildCard = () => {
  return (
    <div className="group flex size-60 flex-col rounded-3xl bg-[#1E1D18] p-4">
      <div className="flex size-10 items-center justify-center self-end rounded-full border-3 transition-transform not-hover:rotate-0 group-hover:scale-105 group-hover:rotate-45">
        <MdArrowOutward className="size-6" />
      </div>
      <div className="mt-6 [&_p]:tracking-wide">
        <h3 className="mb-6">Latest Build</h3>
        <p>Latest Version: 4.1</p>
        <p>Build Date: 14/02/24</p>
      </div>
    </div>
  )
}
