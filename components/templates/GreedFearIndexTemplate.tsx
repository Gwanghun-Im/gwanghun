import { Suspense } from "react"
import { ErrorBoundary } from "@/components/atoms/ErrorBoundary"
import { FearGreedIndex } from "@/components/organisms/FearGreedIndex"

export const GreedFearIndexTemplate = () => {
  return (
    <ErrorBoundary
      fallback={
        <div className="text-center text-2xl font-bold text-opacity-50 flex items-center justify-center">
          Error loading data
        </div>
      }
    >
      <Suspense
        fallback={
          <div className="text-center text-2xl font-bold text-opacity-50 flex items-center justify-center">
            Loading...
          </div>
        }
      >
        <FearGreedIndex />
      </Suspense>
    </ErrorBoundary>
  )
}
