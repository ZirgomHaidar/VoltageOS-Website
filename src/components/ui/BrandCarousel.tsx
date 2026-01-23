import { cn } from "../../../libs/utils"
import asus from "../../assets/asus_logo.svg"
import google from "../../assets/google_logo.svg"
import lenovo from "../../assets/lenovo_logo.svg"
import realme from "../../assets/realme_logo.svg"
import samsung from "../../assets/samsung_logo.svg"
import xiaomi from "../../assets/xiaomi_logo.svg"
import poco from "../../assets/poco_logo.svg"
import nothing from "../../assets/nothing_logo.svg"

export const BrandCarousel = ({
  direction = "right",
  speed = "slow",
  pauseOnHover = true,
  className,
}: {
  direction?: "left" | "right"
  speed?: "fast" | "normal" | "slow"
  pauseOnHover?: boolean
  className?: string
}) => {
  const brands = [
    { src: asus, name: "Asus" },
    { src: google, name: "Google" },
    { src: lenovo, name: "Lenovo" },
    { src: realme, name: "Realme" },
    { src: samsung, name: "Samsung" },
    { src: xiaomi, name: "Xiaomi" },
    { src: poco, name: "Poco" },
    { src: nothing, name: "Nothing" },
  ]

  const repeatedBrands = Array(8).fill(brands).flat()

  const duration = speed === "fast" ? 15 : speed === "normal" ? 30 : 60

  return (
    <div
      className={cn(
        "relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
        className,
      )}
    >
      <div
        className={cn(
          "flex w-max min-w-full shrink-0 items-center gap-8 py-4",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
        style={{
          animation: `scroll-brand-${direction} ${duration}s linear infinite`
        }}
      >
        {repeatedBrands.map((brand, idx) => (
          <div
            className="relative flex-shrink-0"
            key={`${brand.name}-${idx}`}
          >
            <img
              src={brand.src}
              alt={brand.name}
              className="h-14 w-24 opacity-70 transition-opacity hover:opacity-100"
            />
          </div>
        ))}
      </div>
    </div>
  )
}
