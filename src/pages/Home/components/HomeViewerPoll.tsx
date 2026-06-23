import { useState } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { pb } from "@/components/pocketbase"
// import { X } from "lucide-react"

interface HomeViewerPollProps {
  onClose: () => void
}
const colorMap = [
  { color: "red", hex: "#FA2C36" },
  { color: "orange", hex: "#FF6800" },
  { color: "yellow", hex: "#F0B100" },
  { color: "green", hex: "#016631" },
  { color: "blue", hex: "#2B7FFF" },
  { color: "purple", hex: "#AD46FF" },
]
const advancedColors = [
  { color: "pink", hex: "#F6339A" },
  { color: "cyan", hex: "#00B8DB" },
  { color: "sky", hex: "#00A5F4" },
  { color: "emerald", hex: "#00BC7D" },
  { color: "fuchsia", hex: "#E12AFB" },
  { color: "lime", hex: "#7CCE00" },
  { color: "rose", hex: "#FF2056" },
]
interface voteType {
  color: string
  hex: string
  country: string
  colorblind: boolean
}
function getTimezone() {
  return Intl.DateTimeFormat().resolvedOptions().timeZone
}
export default function HomeViewerPoll({ onClose }: HomeViewerPollProps) {
  // hasVoted should be a dictionary
  // something like
  // {[poll:"color",vote:"green",timestamp:"8764326789"]}
  // const [lastVote, setLastVote] = useState<pollAnswer[]>(() => {
  //   const saved = localStorage.getItem("color-poll")
  //   return saved ? JSON.parse(saved) : []
  // })
  const [chosenColorHex, setChosenColorHex] = useState<string>()
  const [chosenColor, setChosenColor] = useState<string>()
  const [isColorblind, setIsColorblind] = useState(false)
  const [vote, setVote] = useState<voteType>()
  const [showThanks, setShowThanks] = useState(false)
  function selectColor(color: string) {
    const selectedColor = [...colorMap, ...advancedColors].find(
      (c) => c.color === color
    )
    if (selectedColor) {
      setChosenColorHex(selectedColor.hex)
      setChosenColor(selectedColor.color)
    }
    setVote({
      color: selectedColor?.color ?? "",
      hex: selectedColor?.hex ?? "",
      country: "N/A",
      colorblind: isColorblind,
    })
  }
  void vote
  function submitAnswer(color: string) {
    const selectedColor = [...colorMap, ...advancedColors].find(
      (c) => c.color === color
    )
    if (selectedColor) {
      setChosenColorHex(selectedColor.hex)
      setChosenColor(selectedColor.color)
    }
    const votePayload: voteType = {
      color: selectedColor?.color ?? "",
      hex: selectedColor?.hex ?? "",
      country: getTimezone(),
      colorblind: isColorblind,
    }
    setVote(votePayload)
    localStorage.setItem("color-poll", JSON.stringify(votePayload))
    pb.collection("poll_colors")
      .create(votePayload)
      .then((e) => {
        console.log("Vote submitted:", e)
      })
      .catch((e) => {
        console.error("Error submitting vote:", e)
      })
    setShowThanks(true)

    setTimeout(() => {
      onClose()
    }, 2000)
  }
  const doGrayscale = isColorblind ? "grayscale(0.9)" : "grayscale(0)"
  function dontAnswer() {
    onClose()
  }
  return (
    <div
      className="absolute top-0 right-0 m-2 flex flex-col border-4 bg-surface-1 p-2"
      style={{ filter: doGrayscale }}
    >
      {!showThanks && (
        <div className="w-60">
          <span className="flex font-heading font-bold">
            Hey! Mind a quick vote?
          </span>
          <span>What's your favourite color?</span>
          <div className="mt-2 grid grid-cols-2 gap-2">
            {colorMap.map((color) => (
              <button
                onClick={() => selectColor(color.color)}
                className="flex items-center justify-center py-1 text-center hover:cursor-pointer hover:underline"
                style={{ backgroundColor: color.hex }}
              >
                {color.color}
              </button>
            ))}
          </div>
          <span className="py-2 text-sm">Fancy more colors?</span>
          <div className="grid grid-cols-2 gap-2">
            {advancedColors.map((color) => (
              <button
                onClick={() => selectColor(color.color)}
                className="flex items-center justify-center py-1 text-center hover:cursor-pointer hover:underline"
                style={{ backgroundColor: color.hex }}
              >
                {color.color}
              </button>
            ))}
          </div>
          <span className="my-2 flex items-center gap-2">
            <Checkbox
              checked={isColorblind}
              onCheckedChange={(checked) => setIsColorblind(checked === true)}
            />
            I am colorblind
          </span>

          <button
            style={{ backgroundColor: chosenColorHex ?? "indigo" }}
            className="w-full transition-all hover:cursor-pointer hover:underline"
            onClick={() => submitAnswer(chosenColor ?? "")}
          >
            Submit!
          </button>
          <button
            className="mt-2 w-full bg-red-700 transition-all hover:cursor-pointer hover:underline"
            onClick={() => dontAnswer()}
          >
            No thanks (close)
          </button>
        </div>
      )}
      {showThanks && (
        <div className="w-60">
          <span>Thank you!</span>
        </div>
      )}
    </div>
  )
}
