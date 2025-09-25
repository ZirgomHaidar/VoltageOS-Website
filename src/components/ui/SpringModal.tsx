import { AnimatePresence, motion } from "framer-motion"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import Markdown from "react-markdown"

const SpringModal = ({
  isOpen,
  setIsOpen,
  codename,
}: {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
  codename: string
}) => {
  const [changelog, setChangelog] = useState<string>("")
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      await fetchChangelog()
      setIsLoading(false)
    }
    fetchData()
  }, [codename])

  useEffect(() => {
    const handleKeyEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false)
      }
    }
    if (isOpen) {
      window.addEventListener("keydown", handleKeyEscape)
    }
    return () => {
      window.removeEventListener("keydown", handleKeyEscape)
    }
  }, [isOpen, setIsOpen])

  const fetchChangelog = async () => {
    try {
      const response = await fetch(
        `https://raw.githubusercontent.com/VoltageOS/android_vendor_voltageota/refs/heads/16/changelog_${codename}.txt`,
      )
      if (!response.ok) {
        throw new Error("Network response was not ok")
      }
      const data = await response.text()
      console.log(data)
      setChangelog(data)
    } catch (error) {
      console.error("Error fetching changelog:", error)
      setChangelog("**Error fetching changelog**")
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-50 flex cursor-pointer items-center justify-center overflow-y-scroll bg-slate-900/20 px-8 py-4 backdrop-brightness-20"
        >
          <motion.div
            initial={{ scale: 0, rotate: "12.5deg" }}
            animate={{ scale: 1, rotate: "0deg" }}
            exit={{ scale: 0, rotate: "0deg" }}
            onClick={(e) => e.stopPropagation()}
            className="bg-Voltage-bgComponent border-Voltage-borderComponent/50 relative flex max-h-[40rem] w-full max-w-4xl cursor-default flex-col gap-10 overflow-y-scroll rounded-3xl border p-8 text-white"
          >
            <div className="markdown flex flex-col gap-6">
              <h2 className="decoration-Voltage-textPrimary text-2xl leading-14 underline decoration-2 underline-offset-14">
                Changelogs for{" "}
                <span className="text-Voltage-textPrimary">{codename}</span>
              </h2>
              {isLoading ? "Loading..." : <Markdown>{changelog}</Markdown>}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setIsOpen(false)}
                className="bg-Voltage-buttonPrimary w-full rounded-full py-2 font-semibold text-black transition-colors hover:bg-yellow-100"
              >
                Understood!
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default SpringModal
