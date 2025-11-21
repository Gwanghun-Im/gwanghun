"use client"
import { useEffect, useState } from "react"

interface FearGreedData {
  data: Array<{
    value: string
    value_classification: string
    timestamp: string
    time_until_update: string
  }>
}

export function FearGreedIndex() {
  const [data, setData] = useState<FearGreedData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch("https://api.alternative.me/fng/")
      .then((response) => response.json())
      .then((result: FearGreedData) => {
        setData(result)
        setIsLoading(false)
      })
      .catch((err) => {
        console.error("Error:", err)
        setError("Failed to load data")
        setIsLoading(false)
      })
  }, [])

  if (isLoading) {
    return (
      <div className="text-center text-2xl font-bold text-opacity-50 flex items-center justify-center py-10">
        Loading...
      </div>
    )
  }

  if (error || !data) {
    return (
      <div className="text-center text-2xl font-bold text-opacity-50 flex items-center justify-center py-10">
        Error loading data
      </div>
    )
  }

  const fearGreedIndex = data.data[0].value_classification
  const fearGreedValue = data.data[0].value

  const getColorClass = (classification: string) => {
    switch (classification) {
      case "Extreme Fear":
        return "bg-red-600"
      case "Fear":
        return "bg-orange-500"
      case "Neutral":
        return "bg-yellow-500"
      case "Greed":
        return "bg-lime-500"
      case "Extreme Greed":
        return "bg-green-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <div
      className={`text-center text-2xl font-bold text-white flex flex-col items-center justify-center py-10 rounded-lg ${getColorClass(fearGreedIndex)}`}
    >
      <div className="text-3xl mb-2">{fearGreedValue}</div>
      <div>Check today&apos;s greed and fear index: {fearGreedIndex}</div>
    </div>
  )
}
