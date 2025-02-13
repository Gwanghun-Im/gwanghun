"use client"
import React, {
  createContext,
  useContext,
  useCallback,
  useState,
  useEffect,
} from "react"
import { useToast } from "@/components/atoms/toast/use-toast"
import { cn } from "@/lib/utils"

// Types
interface KeywordDefinition {
  description: string
  category?: string
  examples?: string[]
  related?: string[]
  style?: KeywordStyle
}

interface KeywordStyle {
  backgroundColor?: string
  textColor?: string
  borderRadius?: string
  padding?: string
}

interface DetectPopConfig {
  defaultStyle?: KeywordStyle
  toastPosition?: "top" | "bottom"
  toastDuration?: number
}

interface TextSegment {
  type: "text" | "keyword"
  content: string
}

// Context for dictionary management
const DictionaryContext = createContext<{
  dictionary: Record<string, KeywordDefinition>
  addKeyword: (key: string, definition: KeywordDefinition) => void
  removeKeyword: (key: string) => void
  updateKeyword: (key: string, definition: Partial<KeywordDefinition>) => void
}>({
  dictionary: {},
  addKeyword: () => {},
  removeKeyword: () => {},
  updateKeyword: () => {},
})

// Dictionary Provider Component
export const DictionaryProvider: React.FC<{
  children: React.ReactNode
  initial?: Record<string, KeywordDefinition>
}> = ({ children, initial = {} }) => {
  const [dictionary, setDictionary] = useState(initial)

  const addKeyword = useCallback(
    (key: string, definition: KeywordDefinition) => {
      setDictionary((prev) => ({ ...prev, [key]: definition }))
    },
    []
  )

  const removeKeyword = useCallback((key: string) => {
    setDictionary((prev) => {
      const newDict = { ...prev }
      delete newDict[key]
      return newDict
    })
  }, [])

  const updateKeyword = useCallback(
    (key: string, definition: Partial<KeywordDefinition>) => {
      setDictionary((prev) => ({
        ...prev,
        [key]: { ...prev[key], ...definition },
      }))
    },
    []
  )

  return (
    <DictionaryContext.Provider
      value={{ dictionary, addKeyword, removeKeyword, updateKeyword }}
    >
      {children}
    </DictionaryContext.Provider>
  )
}

// Custom hook for dictionary management
export const useDictionary = () => {
  const context = useContext(DictionaryContext)
  if (!context) {
    throw new Error("useDictionary must be used within a DictionaryProvider")
  }
  return context
}

// Main DetectPop component
export const DetectPop: React.FC<{
  children: React.ReactNode
  config?: DetectPopConfig
  className?: string
}> = ({ children, config = {}, className }) => {
  const { dictionary } = useDictionary()
  const { toast } = useToast()
  const [processedText, setProcessedText] = useState<
    Array<{
      type: "text" | "keyword"
      content: string
    }>
  >([])

  const {
    defaultStyle = {
      backgroundColor: "bg-blue-100",
      textColor: "text-blue-900",
      borderRadius: "rounded",
      padding: "px-1",
    },
    toastPosition = "bottom",
    toastDuration = 3000,
  } = config

  // 텍스트 처리 함수
  const processText = useCallback(
    (text: string) => {
      if (!text || typeof text !== "string") return []

      const keywords = Object.keys(dictionary).sort(
        (a, b) => b.length - a.length
      ) // 긴 키워드부터 처리

      let segments: Array<{ type: "text" | "keyword"; content: string }> = [
        {
          type: "text",
          content: text,
        },
      ]

      keywords.forEach((keyword) => {
        segments = segments.flatMap((segment): TextSegment[] => {
          if (segment.type === "text") {
            const parts = segment.content.split(new RegExp(`(${keyword})`, "g"))
            return parts
              .map(
                (part): TextSegment => ({
                  type: part === keyword ? "keyword" : "text",
                  content: part,
                })
              )
              .filter((part): part is TextSegment => Boolean(part.content))
          }
          return [segment]
        })
      })

      return segments
    },
    [dictionary]
  )

  // children이 변경될 때마다 텍스트 처리
  useEffect(() => {
    const text = children?.toString() || ""
    const processed = processText(text)
    setProcessedText(processed)
  }, [children, processText])

  const handleKeywordClick = (keyword: string) => {
    const definition = dictionary[keyword]
    toast({
      title: keyword,
      description: (
        <div className="space-y-2">
          <p>{definition.description}</p>
          {definition.examples && (
            <div className="text-sm">
              <strong>Examples:</strong> {definition.examples.join(", ")}
            </div>
          )}
        </div>
      ),
      duration: toastDuration,
    })
  }

  const renderKeyword = (keyword: string) => {
    const definition = dictionary[keyword]
    const style = { ...defaultStyle, ...definition.style }

    return (
      <button
        key={keyword}
        onClick={() => handleKeywordClick(keyword)}
        className={cn(
          style.backgroundColor,
          style.textColor,
          style.borderRadius,
          style.padding,
          "transition-colors duration-200 hover:opacity-80"
        )}
      >
        {keyword}
      </button>
    )
  }

  return (
    <div className={className}>
      {processedText.map((segment, index) => (
        <React.Fragment key={index}>
          {segment.type === "keyword"
            ? renderKeyword(segment.content)
            : segment.content}
        </React.Fragment>
      ))}
    </div>
  )
}

// 사용 예시
export const Example = () => {
  return (
    <DictionaryProvider
      initial={{
        react: {
          description: "쩐다~!",
          examples: ["리액트 훅스", "컴포넌트"],
          style: {
            backgroundColor: "bg-indigo-100",
            textColor: "text-indigo-900",
          },
        },
        hooks: {
          description: "리액트의 강력한 기능",
          examples: ["useState", "useEffect"],
          style: {
            backgroundColor: "bg-green-100",
            textColor: "text-green-900",
          },
        },
      }}
    >
      <DetectPop
        config={{
          toastPosition: "bottom",
          toastDuration: 5000, // 5초
        }}
      >
        react와 hooks를 사용하면 정말 멋진 앱을 만들 수 있습니다.
      </DetectPop>
    </DictionaryProvider>
  )
}

export default Example
