"use client"
import { useState, useEffect, Suspense } from "react"
import { ErrorBoundary } from "react-error-boundary"

export const GreedFearIndexTemplate = () => {
  const [fearGreedIndex, setFearGreedIndex] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  const getFearGreedIndex = async () => {
    try {
      const response = await fetch("https://api.alternative.me/fng/")
      const data = await response.json()
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setIsLoading(false)
      return data
    } catch (error) {
      console.error("Error:", error)
    }
  }

  useEffect(() => {
    const fetchFearGreedIndex = async () => {
      const data = await getFearGreedIndex()
      console.log(data)
      setFearGreedIndex(data.data[0].value_classification)
    }
    fetchFearGreedIndex()
  }, [])

  return (
    <ErrorBoundary fallback={<div>Error</div>}>
      <Suspense
        fallback={
          <div className="text-center text-2xl font-bold text-white text-opacity-50 flex items-center justify-center bg-blue-900">
            Loading...
          </div>
        }
      >
        <div
          className={
            "text-center text-2xl font-bold text-white text-opacity-50 flex items-center justify-center" +
            (isLoading
              ? " bg-gray-900"
              : fearGreedIndex === "Fear"
              ? " bg-red-500"
              : " bg-green-500")
          }
        >
          {isLoading ? (
            "Loading..."
          ) : (
            <>Check today&apos;s greed and fear index: {fearGreedIndex}</>
          )}
        </div>
      </Suspense>
    </ErrorBoundary>
  )
}
