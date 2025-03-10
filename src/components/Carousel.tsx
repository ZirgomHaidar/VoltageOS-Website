import { motion, useTransform, useScroll } from "framer-motion"
import { useRef } from "react"
import selinux from "../assets/InfoGraphics.png"
import sandbox from "../assets/sandbox.png"
import aosp from "../assets/aosp.png"
import { MdAndroid } from "react-icons/md"
import { SiGrapheneos } from "react-icons/si"

const HorizontalScrollCarousel = () => {
  const targetRef = useRef<HTMLDivElement | null>(null)
  const { scrollYProgress } = useScroll({
    target: targetRef,
  })

  const x = useTransform(scrollYProgress, [0, 1], ["1%", "-65%"])

  return (
    <section ref={targetRef} className="relative mb-28 h-[200vh]">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div style={{ x }} className="flex gap-4">
          {cards.map((card) => {
            return <Card card={card} key={card.id} />
          })}
        </motion.div>
      </div>
    </section>
  )
}

export default HorizontalScrollCarousel

const Card = ({ card }: { card: CardType }) => {
  return (
    <div
      key={card.id}
      className="bg-Voltage-bgComponent relative flex flex-col-reverse items-center justify-between gap-8 overflow-hidden p-6 lg:w-220 lg:flex-row lg:p-10 xl:w-300"
    >
      <img src={card.picSrc} alt="pic" className="w-fit lg:w-100" />
      <div className="w-65 space-y-10 lg:w-130">
        <h2 className="text-Voltage-textPrimary">{card.title}</h2>
        <h5 className="text-Voltage-textSecondary">{card.desc}</h5>
        <div className="w-fit rounded-2xl bg-black px-4 py-2">
          <span className="text-base">Powered By</span>
          <span className="flex gap-3 text-3xl">
            {card.Poweredby}{" "}
            {card.Poweredby === "android" ? (
              <MdAndroid className="size-10 fill-green-400" />
            ) : (
              <SiGrapheneos className="size-10" />
            )}
          </span>
        </div>
      </div>
    </div>
  )
}

type CardType = {
  title: string
  id: number
  picSrc: string
  desc: string
  Poweredby: string
}

const cards: CardType[] = [
  {
    title: "Security",
    id: 1,
    picSrc: selinux,
    desc: "Your data, your rules. Along with monthly security updates to every supported device, we enhance existing privacy touchpoints around the OS and keep you informed of how the system shares your data.",
    Poweredby: "android",
  },
  {
    title: "SandBox",
    id: 2,
    picSrc: sandbox,
    desc: "VoltageOS provides a sandboxed Google Play environment, restricting its access and privileges. This ensures near-complete compatibility with the Google Play ecosystem while prioritizing user privacy and security. ",
    Poweredby: "GrapheneOS",
  },
  {
    title: "Based On AOSP",
    id: 3,
    picSrc: aosp,
    desc: "built on the open-source Android Open Source Project. AOSP offers a pure Android experience, free from bloatware and vendor customizations, ensuring a smooth, secure, and customizable operating system.",
    Poweredby: "android",
  },
]
