import React, {
  FC,
  ReactNode,
  Fragment,
  useCallback,
  useState,
  useEffect,
} from "react"
import { useToast } from "@/components/atoms/toast/use-toast"
import { cn } from "@/lib/utils"
import { useDictionary } from "@/contexts/dictionary/DictionaryContext"
import type { KeywordStyle } from "@/contexts/dictionary/DictionaryContext"

interface DetectPopConfig {
  defaultStyle?: KeywordStyle
  toastPosition?: "top" | "bottom"
  toastDuration?: number
}

interface TextSegment {
  type: "text" | "keyword"
  content: string
}

export const DetectPop: FC<{
  children: ReactNode
  config?: DetectPopConfig
  className?: string
}> = ({ children, config = {}, className }) => {
  const { dictionary } = useDictionary()
  const { toast } = useToast()
  const [processedText, setProcessedText] = useState<TextSegment[]>([])

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

  const handleKeywordClick = useCallback(
    (keyword: string) => {
      const definition = dictionary[keyword]
      if (definition) {
        toast({
          title: keyword,
          description: (
            <div className="space-y-2">
              <p>{definition.description}</p>
              {definition.examples && (
                <div className="text-sm">
                  <strong>예시:</strong> {definition.examples.join(", ")}
                </div>
              )}
              {definition.related && (
                <div className="text-sm">
                  <strong>관련 키워드:</strong> {definition.related.join(", ")}
                </div>
              )}
            </div>
          ),
          duration: toastDuration,
        })
      }
    },
    [dictionary, toast, toastDuration]
  )

  const processText = useCallback(() => {
    if (typeof children !== "string") {
      console.warn("DetectPop: children must be a string")
      return
    }

    const keywords = Object.keys(dictionary)
    const segments: TextSegment[] = []
    let remainingText = children

    while (remainingText.length > 0) {
      let earliestIndex = remainingText.length
      let foundKeyword = ""

      // 가장 먼저 나타나는 키워드 찾기
      for (const keyword of keywords) {
        const index = remainingText.toLowerCase().indexOf(keyword.toLowerCase())
        if (index !== -1 && index < earliestIndex) {
          earliestIndex = index
          foundKeyword = keyword
        }
      }

      if (foundKeyword) {
        // 키워드 이전의 텍스트 추가
        if (earliestIndex > 0) {
          segments.push({
            type: "text",
            content: remainingText.substring(0, earliestIndex),
          })
        }

        // 키워드 추가
        segments.push({
          type: "keyword",
          content: remainingText.substring(
            earliestIndex,
            earliestIndex + foundKeyword.length
          ),
        })

        // 남은 텍스트 업데이트
        remainingText = remainingText.substring(
          earliestIndex + foundKeyword.length
        )
      } else {
        // 키워드가 더 이상 없으면 남은 텍스트 전체를 추가
        segments.push({
          type: "text",
          content: remainingText,
        })
        break
      }
    }

    setProcessedText(segments)
  }, [children, dictionary])

  useEffect(() => {
    processText()
  }, [processText])

  if (typeof children !== "string") {
    return <div className={cn(className)}>{children}</div>
  }

  return (
    <div className={cn(className)}>
      {processedText.map((segment, index) => (
        <Fragment key={index}>
          {segment.type === "keyword" ? (
            <span
              className={cn(
                "cursor-pointer transition-colors hover:opacity-80",
                dictionary[segment.content]?.style?.backgroundColor ||
                  defaultStyle.backgroundColor,
                dictionary[segment.content]?.style?.textColor ||
                  defaultStyle.textColor,
                dictionary[segment.content]?.style?.borderRadius ||
                  defaultStyle.borderRadius,
                dictionary[segment.content]?.style?.padding ||
                  defaultStyle.padding
              )}
              onClick={() => handleKeywordClick(segment.content)}
            >
              {segment.content}
            </span>
          ) : (
            segment.content
          )}
        </Fragment>
      ))}
    </div>
  )
}
