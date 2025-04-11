import selinux from "../assets/InfoGraphics.png"
import sandbox from "../assets/sandbox.png"
import aosp from "../assets/aosp.png"
import { MdAndroid } from "react-icons/md"
import { SiGrapheneos } from "react-icons/si"
import { cn } from "../../libs/utils"

const HorizontalScrollCarousel = () => {
  return (
    <section className="mb-28">
      <div className="flex flex-col justify-center gap-4">
        {cards.map((card) => {
          return <Card card={card} key={card.id} />
        })}
      </div>
    </section>
  )
}

export default HorizontalScrollCarousel

const Card = ({ card }: { card: CardType }) => {
  return (
    <div
      key={card.id}
      className={cn(
        "bg-Voltage-bgComponent border-Voltage-borderComponent l flex flex-col-reverse items-center justify-between gap-8 overflow-hidden rounded-2xl border-4 p-4 md:p-8 lg:flex-row lg:p-10",
        card.id === 2 ? "lg:flex-row-reverse" : "lg:flex-row",
      )}
    >
      <img src={card.picSrc} alt="pic" className="w-50 md:w-80" />
      <div className="space-y-6">
        <h2 className="text-Voltage-textPrimary">{card.title}</h2>
        <h6 className="text-Voltage-textSecondary">{card.desc}</h6>
        <div className="w-fit rounded-2xl bg-black px-4 py-2">
          <span className="text-base">Powered By</span>
          <span className="flex items-center gap-3 md:text-3xl">
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
