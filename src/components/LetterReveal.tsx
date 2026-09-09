import { motion, type Variants } from "motion/react"
import React from "react"
import { EASE } from "../lib/motion"

export interface TextSegment {
  text: string
  className?: string
}

interface LetterRevealProps {
  /** Single string to split into letters */
  text?: string
  /** Structured segments for text with highlighted spans */
  segments?: TextSegment[]
  as?: "h1" | "h2" | "p" | "span" | "div"
  className?: string
  delay?: number
  staggerDelay?: number
}

const letterVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 14,
    filter: "blur(5px)",
  },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.45,
      ease: EASE,
    },
  },
}

export const LetterReveal: React.FC<LetterRevealProps> = ({
  text,
  segments,
  as = "p",
  className = "",
  delay = 0,
  staggerDelay = 0.022,
}) => {
  const Component = motion[as]

  const containerVariants: Variants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: delay,
      },
    },
  }

  // Normalize into segment list
  const normalizedSegments: TextSegment[] = segments || (text ? [{ text }] : [])
  const fullText = normalizedSegments.map((s) => s.text).join("")

  return (
    <Component
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
      aria-label={fullText}
      className={className}
    >
      {normalizedSegments.map((segment, segIdx) => {
        // Split by lines first for explicit <br /> breaks
        const lines = segment.text.split("\n")

        return (
          <span key={segIdx} className={segment.className}>
            {lines.map((line, lineIdx) => {
              const words = line.split(" ")

              return (
                <React.Fragment key={lineIdx}>
                  {lineIdx > 0 && <br />}
                  {words.map((word, wordIdx) => (
                    <span
                      key={wordIdx}
                      className="inline-block whitespace-nowrap"
                      aria-hidden="true"
                    >
                      {Array.from(word).map((char, charIdx) => (
                        <motion.span
                          key={charIdx}
                          variants={letterVariants}
                          className="inline-block [text-transform:none]"
                        >
                          {char}
                        </motion.span>
                      ))}
                      {wordIdx < words.length - 1 && (
                        <span className="inline-block">&nbsp;</span>
                      )}
                    </span>
                  ))}
                </React.Fragment>
              )
            })}
          </span>
        )
      })}
    </Component>
  )
}

export default LetterReveal
