import { Suspense } from "react"
import { ErrorBoundary } from "react-error-boundary"
import { FearGreedIndex } from "@/components/organisms/FearGreedIndex"
export const GreedFearIndexTemplate = () => {
  return (
    <ErrorBoundary fallback={<div>Error</div>}>
      <Suspense
        fallback={
          <div className="text-center text-2xl font-bold text-white text-opacity-50 flex items-center justify-center bg-gray-900">
            Loading...
          </div>
        }
      >
        <FearGreedIndex />
      </Suspense>
    </ErrorBoundary>
  )
}
