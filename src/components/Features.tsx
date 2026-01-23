import secure from "../assets/secure_vector.svg"
import safe from "../assets/safe_vector.svg"
import aosp from "../assets/aosp_vector.svg"
import { cn } from "../../libs/utils"

const Features = () => {
  return (
    <section className="mb-28">
      <div className="flex flex-col justify-center gap-4 rounded-3xl p-6 bg-radial from-[#34322D] from-0% to-[#141310] to-50%">
        {cards.map((card) => {
          return <Card card={card} key={card.id} />
        })}
      </div>
    </section>
  )
}

export default Features

const Card = ({ card }: { card: CardType }) => {
  return (
    <div
      key={card.id}
      className={cn(
        "flex flex-col-reverse items-center justify-center gap-12 overflow-hidden p-4 md:p-8 lg:flex-row lg:p-10",
        card.id === 2 ? "lg:flex-row-reverse" : "lg:flex-row",
      )}
    >
      <img src={card.picSrc} alt="pic" className="w-100 md:w-140" />
      <div className="sm:w-100 space-y-6">
        <h2 className="text-Voltage-textPrimary">{card.title}</h2>
        <h6 className="text-Voltage-textSecondary">{card.desc}</h6>
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
    title: "Stay Safe, Stay Smart",
    id: 1,
    picSrc: safe,
    desc: "VoltageOS provides a sandboxed Google Play environment, restricting its access and privileges. This ensures near-complete compatibility with the Google Play ecosystem while prioritizing user privacy and security.",
    Poweredby: "GrapheneOS",
  },
  {
    title: "Secure Your Data in a Sandbox",
    id: 2,
    picSrc: secure,
    desc: "Your data, your rules. Along with monthly security updates to every supported device, we enhance existing privacy touchpoints around the OS and keep you informed of how the system shares your data.",
    Poweredby: "android",
  },
  {
    title: "Based On AOSP",
    id: 3,
    picSrc: aosp,
    desc: "Built on the open-source Android Open Source Project. AOSP offers a pure Android experience, free from bloatware and vendor customizations, ensuring a smooth, secure, and customizable operating system.",
    Poweredby: "android",
  },
]
