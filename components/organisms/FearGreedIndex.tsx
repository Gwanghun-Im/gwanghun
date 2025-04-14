"use client"
import { use } from "react"

const getFearGreedIndex = fetch("https://api.alternative.me/fng/")
  .then((response) => response.json())
  .catch((error) => {
    console.error("Error:", error)
  })

export function FearGreedIndex() {
  const data = use(getFearGreedIndex)
  const fearGreedIndex = data.data[0].value_classification
  return (
    <div
      className={
        "text-center text-2xl font-bold text-white text-opacity-50 flex items-center justify-center" +
        (fearGreedIndex === "Fear" ? " bg-red-500" : " bg-green-500")
      }
    >
      Check today&apos;s greed and fear index: {fearGreedIndex}
    </div>
  )
}
