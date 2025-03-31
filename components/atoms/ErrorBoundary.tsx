"use client"

import { Component, ErrorInfo, ReactNode } from "react"

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo)
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-[200px] p-4">
          <h2 className="text-xl font-bold mb-2">문제가 발생했습니다</h2>
          <p className="text-gray-600 mb-4">잠시 후 다시 시도해주세요.</p>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={() => this.setState({ hasError: false })}
          >
            다시 시도
          </button>
        </div>
      )
    }

    return this.props.children
  }
}
