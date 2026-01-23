import { useState, useEffect } from "react"
import { motion } from "motion/react"
import frame1 from "../assets/Frame 342.png"
import frame2 from "../assets/Frame 341.png"
import frame3 from "../assets/Frame 338.png"
import frame4 from "../assets/Frame 340.png"
import frame5 from "../assets/Frame 339.png"

const frames = [frame1, frame2, frame3, frame4, frame5]

export default function DeviceCarousel() {
  const [activeIndex, setActiveIndex] = useState(2)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev - 1 + frames.length) % frames.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const getPosition = (index: number) => {
    const diff = (index - activeIndex + frames.length) % frames.length
    if (diff === 3) return -2
    if (diff === 4) return -1
    return diff
  }

  const getStyle = (position: number) => {
    const frameWidth = isMobile ? 7.6 : 14
    const gap = 1.875 // 30px gap

    let x = 0
    let scale = 1
    let zIndex = 10
    let opacity = 1

    switch (position) {
      case 0:
        x = 0
        scale = 1
        zIndex = 50
        opacity = 1
        break
      case 1:
        // Center-to-center: (W*0.5) + gap + (0.8W*0.5) = 0.9W + gap
        x = 0.9 * frameWidth + gap
        scale = 0.8
        zIndex = 30
        opacity = 0.9
        break
      case -1:
        x = -(0.9 * frameWidth + gap)
        scale = 0.8
        zIndex = 30
        opacity = 0.9
        break
      case 2:
        // Center-to-center: (W*0.5) + (0.8W) + gap*2 + (0.6W*0.5) = 1.6W + 2*gap
        x = 1.6 * frameWidth + 2 * gap
        scale = 0.6
        zIndex = 10
        opacity = 0.7
        break
      case -2:
        x = -(1.6 * frameWidth + 2 * gap)
        scale = 0.6
        zIndex = 10
        opacity = 0.7
        break
    }

    return { x: `${x}rem`, scale, zIndex, opacity }
  }

  return (
    <div className="relative flex h-[24rem] w-full items-center justify-center overflow-hidden py-4 md:h-[40rem] md:py-10">
      {frames.map((frame, index) => {
        const position = getPosition(index)
        const style = getStyle(position)

        return (
          <motion.img
            key={index}
            src={frame}
            alt={`Device Frame ${index + 1}`}
            initial={false}
            animate={{
              x: style.x,
              scale: style.scale,
              zIndex: style.zIndex,
              opacity: style.opacity,
            }}
            transition={{
              duration: 0.6,
              ease: "easeInOut",
            }}
            className="absolute h-[17rem] w-auto object-contain md:h-[26rem] lg:h-[31rem]"
          />
        )
      })}
    </div>
  )
}
